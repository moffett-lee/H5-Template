// JavaScript Document
//image upload
//usage: var obj = new imageUpload(file-input selector, tips appendTo selector, max images count);
//then ~ do nothing
function imageUpload(fileInput, appendTo, max){
	this.input = $(fileInput);
	this.div = $(appendTo).hide();
	this.max = max || 5, this.cur = 0, this._eTimer;
	this.init();
	/*
	var that = this;
	this.input.bind("click.uploadInit", function(e){
		that.init();
		that.input.unbind("click.uploadInit");
	});
	*/
	
};
imageUpload.prototype = {
	_buildPreview: function(){
		var that = this;
		that.div.append('<div class="imgagePreview">'+
			'<div class="error"></div>'+
			'<div class="uploadList"></div>'+
		'</div>').on("click", ".d", function(){
			$(this).closest(".w").remove();
			that.cur--;
			that.cur <= 0 && that.div.hide();
		});
		that.error = that.div.find(".error");
	},
	_previewItem: function(src, id){
		var item = '<span id="'+id+'" class="w"><span class="h"></span><img class="i" src="'+src+'" /><span class="h"></span><em class="d" title="删除"></em></span>';
		this.div.find(".uploadList").append(item);
	},
	_setError: function(txt, removeIndex, cb){
		var that = this;
		that.error.html(txt);
		clearTimeout(that._eTimer);
		//有个两秒的操作BUG，暂时不解决
		that._eTimer = setTimeout(function(){
			that.error.html('');
			if(typeof removeIndex == "number"){
				that.div.find(".w").eq(removeIndex).find(".d").click();
			}
			cb && cb();
		}, 2000);
	},
	init: function(){
		//event listen
		if(window.File && window.FileList && window.FileReader){
			var that = this, elem = that.input.get(0);
			if(!elem)return;
			//构建上传图片的FORM
			var form = $("<form></form>"), iframeId = "upload_iframe_" + new Date/1;
			//创建回调函数
			window[iframeId+"Func"] = function(data){};
			form.attr({
				//等待大神给action...
				action: "../../uploadImageJsp.action@v="+new Date/1, 
				method: "post",
				enctype: "multipart/form-data",
				target: iframeId
			});
			that.input.eq(0).wrap(form);
			form.append('<input type="hidden" name="callback" value="' + iframeId + 'Func" />');
			form.append('<input type="hidden" name="index" value="0" />');
			form.append('<input name="filename" type="text" value="test.jpg"/>');
			//顺便构建隐藏的提交iframe
			function buildIframe(){
				$("body").append('<iframe id="@id" name="@id" class="upload_iframe"></iframe>'.replace(/@id/g, iframeId));
				window[iframeId+"Func"] = function(data){
					that.fire("uploadFinished", data);
					var url = data.url;
					//console.log(data);
					if(data.allUrls){
						url = data.allUrls["CP_90_120_TINY"];
					}
					if(url){
						//uploadSuccess
						var img = $("#" + data.index).find(".i");
						img.attr("src", url);
						img.attr("rsrc", data.allUrls["CP_600_800_MIDDLE"]);
						that.fire("uploadSuccess", data);
					}else{
						//uploadFail
						that._setError("上传失败，请重试", data.index, function(){
							that.cur--;
							that.cur < 0 && (that.cur = 0);
						});
						that.fire("uploadFail", data);
					}
				};
				function before(){
					//beforeSubmit
					var id = "uploadItem_" + new Date / 1;
					that._previewItem('../../../my.100bt.com/album/style/img_s/loading.gif', id);
					return id;
				};
				buildIframe = before;
				return before();
			};
			//标识当前操作的索引
			function setIndex(o){
				form.find("[name=index]").val(o);
			}
			//监听file的change事件
			that.input.get(0).addEventListener('change', function(e){
				var frameId = buildIframe();
				that.div.show();
				if(that.cur >= that.max){
					that._setError("最多只能上传" + that.max + "张图哦~");
				}else{
					setIndex(frameId);
					that.cur++;
					var val = $(this).val(), i = val.lastIndexOf(".");
					form.find("[name=filename]").val(val.slice(i-1));
					form.submit();
				}
			}, false);
			that._buildPreview();
		}else{
			this.input.bind('click', function(e){
				alert('您的浏览器不支持File Api');
				return false;
			});
		}
	},
	clear: function(){
		this.cur = 0;
		this.div.hide().find(".uploadList").empty();
	},
	getHtml: function(real){
		var html = [], list = this.div.find(".i");
		list.each(function(i, v){
			var $v = $(v);
			html.push("<img src='" + ($v.attr(real ? "rsrc" : "src") || $v.attr("src")) + "' /> ");
		});
		return list.size() > 0 ? (html.unshift("<p>"), html.push("</p>"), html.join("")) : "";
	},
	listen: function(evt, func){
		this.input.bind(evt, func);
		return this;
	},
	fire: function(evt, data){
		this.input.trigger(evt, [data]);
		return this;
	}
};