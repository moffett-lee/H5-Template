// JavaScript Document
qqAjax.script('../../../www.100bt.com/qq/zn/script/topic_reply.js');
(function(win, $){
	//表情
	var smile = new smileFactory();
	//楼中楼处理
	var lzl = {
		getItem: function(selector){
			return $(selector).closest(".lzl");
		},
		getTextarea: function(selector){
			return this.getItem(selector).find(".editor");
		},
		error: function(selector, html){
			this.getItem(selector).find(".error").html(html);
		},
		_textarea: {},
		_smileInit: function(text){
			var that = this;
			//window的绑定事件
			smileTool.clickInit(smile, text[0]);
			that._textarea = text;
			smile.listen("smileClick", function(e, f){
				smileTool.insertText(that._textarea[0], f);
			});
			that._smileInit = function(text){
				this._textarea = text;
			};
		},
		smile: function(face, textarea){
			//可见的时候，就隐藏掉吧
			if(smile.visible){smile.hide();}
			//把表情初始化在目标的下方
			var $T = $(face), offset = $T.offset();
			smile.show().root.css({top: offset.top + 30});
			var text = textarea || this.getTextarea(face);
			//输入框滚动到最顶部
			var elem = smile.getElem();
			header.scrollToBottom(elem, 120);
			text.unbind("focus.simle").bind("focus.simle", function(){
				setTimeout(function(){smile.hide()}, 30);
			});
			this._smileInit(text);
		}
	};
	
	//必须给最外层，加一个id
	var root = $("#ajaxList");
	//收起|展开回复
	root.on("click", ".lzl .cl", function(){
		lzl.getItem(this).hide();
		return false;
	}).on("click", ".tItem .rbt:not(.first)", function(){
		var LZ = $(this).siblings(".lzl");
		//点击刷新按钮
		if($(this).attr("notClick")){
			LZ.find(".llist").html('<li>努力加载中...</li>');
			$(LZ).find(".op .rf").click();
			$(this).removeAttr("notClick");
		}
		LZ.show();
		lzl.getTextarea(LZ).val("").attr("placeholder", "在这里输入你要发表的内容...");
		return false;
	}).on("click", ".lrp", function(){
		lzl.getTextarea(this).focus().attr("placeholder", "回复: "+ $(this).closest("li").find(".lname").text());
		return false;
	});
	//顶
	root.on("click", ".tItem .dbt", function(){
		var that = $(this);
		var param = {
			itemId: 1,//表态的第几个字段
			topicId: window.topicId //必须有topicId
		};
		if(!that.is("lock")){
			that.addClass("lock");
			$.getJSON("/SubmitTopicFavor.action?callback=?",param,function(data){
				if (data.resultCode.code===0) {
					//成功评分
					that.find(".num").html(function(i,v){
						return +v+1;
					});
				}
				else if(data.resultCode.code===-7) {
					//未登录
					alert(data.resultCode.detail);
				}
				else if(data.resultCode.code=== -6){
					//已经顶过
					alert("你已经顶过了");
				}
				that.removeClass("lock");
			});
		}
		return false;
	});
	
	//编辑框的操作
	$("#content").on("click", ".face", function(){
		lzl.smile(this, $(this).closest(".reply").find(".editor"));
		return false;
	});
	
	//帖子页操作
	$("#topic").on("click", ".bb", function(){
		var $T = $(this);
		$T.unbind("click").bind("click", function(){
			alert("正在处理中，请耐心等候");
		});
		$.getJSON("../../AddCollectTopic.action", {topicId: topicId, remindWhenUpdate:true}, function(data){
			var resultCode = data.resultCode;
			if(resultCode.code == 0){
				$T.removeClass("bb").addClass("grb").unbind("click").text("已收藏");
			}else{
				alert(resultCode.detail);
			}
			$T.unbind("click");
		});
		return false;
	});
	
	//分页按钮
	qqAjax.load({root:"#ajaxList", link: ".pager a",
		beforeClick: function(){
			cmTool.loadPage();
		},
		clickFunc: function(root){
			cmTool.hideLoadPage();
			//有导航栏的遮挡
			header.scrollTo(0, 0);
		}
	});
	
	//楼中楼分页按钮
	root.on("click", ".lpage a", function(){
		var $T = $(this), loadwp = $T.closest(".lzl").find(".llist"), url = $T.data("url");
		loadwp.html('<li>努力加载中...</li>');
		loadwp.load(url, function(){
			//返回到楼中楼的某个位置
		});
	});
	
	//楼中楼刷新按钮
	root.on("click", ".op .rf", function(){
		var $T = $(this), loadwp = $T.closest(".lzl").find(".llist"), url = $T.data("url");
		loadwp.load(url);
	});
	
	//查看大图
	//一定是： 先 大图 后 小图 的顺序
	var BigImage = {
		toggleShow: function($T, src){
			/*var reg_s = /(^.*)(_small)(\.[^.]*$)/g,
				reg_t = /(^.*)(_tiny)(\.[^.]*$)/g,
				reg_m = /(^.*)(_middle)(\.[^.]*$)/g;*/
			// 新版URL就用下面正则
			 var reg_s = /(?:\?|&)size=small(?:&|$)/,
			 reg_t = /(?:\?|&)size=tiny(?:&|$)/,
			 reg_m = /(?:\?|&)size=middle(?:&|$)/;
			var src = $T.attr("src");
			if(reg_s.test(src) || reg_t.test(src)){
				this.middle($T, src);
				return;
			}
			if(reg_m.test(src)){
				this.normal($T, src);
				return;
			}
		}
		,normal: function($T, src){
			var $d = $T.closest(".imageWrapper"), src = $d.data("src");
			var $l = $d.find(".loading");
			$l.show();
			$T.unbind("load").bind("load", function(){
				$l.remove();
				$T.unwrap(".imageWrapper");
			});
			$T.attr("src", src);
		}
		,middle: function($T, src){
			var $d = $('<div class="imageWrapper" data-src="'+src+'"></div>');
			$T.wrap($d);
			$d.append('<span class="loading"></span>');
			$T.unbind("load").bind("load", function(){
				$T.closest(".imageWrapper").find(".loading").hide();
			});
			/*var reg = /(^.*)(_tiny|_small)(\.[^.]*$)/;
			var nsrc = src.replace(reg,function(x,a,b,c){return a+"_middle"+c});*/
			//新版URL用这个正则
			var reg = /(^.+size=)(tiny|small)(.*$)/g
			var nsrc = src.replace(reg, function(a, b, c, d){return b  + "middle" + d;});
			$T.attr("src", nsrc);
		}
	};
	root.on("click", ".tmain img", function(){
		var $T = $(this), src = $T.attr("src").toLowerCase();
		BigImage.toggleShow($T, src);
	});
	
})(window, Zepto);