// JavaScript Document

//表情初始化
//发布事件[smileClick:表情被点击(e,表情名),]
function smileFactory(){
	this.init();
	this.constructor = smileFactory;
};
smileFactory.prototype = {
	_max:36,
	_per:12, //一页多少数据
	_row:2, //每页多少行
	_y:-24,
	_path:'<img src="../../../qq.100bt.com/ueditor/dialogs/emotion/images/normal/c-${i}.gif" />',
	_map:{"狂汗":"01","撅嘴":"02","傻乐":"03","哭死":"04","装可怜":"05","无奈":"06","围观":"07","贱笑":"08","傲娇":"09","要哭了":"010","奸诈":"11","感人":"12","猥琐":"13","暴汗":"14","逗你玩":"15","小汗":"16","激动":"17","鄙视":"18","擦汗":"19","大哭":"20","生气":"21","鼓掌":"22","害羞":"23","大笑":"24","左哼哼":"25","坏笑":"26","惊恐":"27","可爱":"28","可怜":"29","挖鼻":"30","打击":"31","衰":"32","吐":"33","疑问":"34","阴险":"35","抓狂":"36","呲牙":"37"},
	_list:[],
	_config: {enableClass:"on"},
	_getPoint: function(ev){
		var evt = ev.touches ? ev.touches.length ? ev.touches[0] : ev : ev;
		return {
			x: evt.clientX || evt.pageX || evt.x || 0, 
			y: evt.clientY || evt.pageY || evt.y || 0
		};
	},
	init: function(){
		//构建表情div
		this.pageCount = Math.ceil(this._max / this._per);
		for(var i in this._map){
			this._list.push(i);
		}
		var html = [], id = "smile_" + new Date() / 1;
		html.push('<div id="'+ id +'" class="smile_wrap">');
		html.push('<div class="smile_list">');
		html.push(this._getSmileHtml());
		html.push('</div  >');
		html.push('<div class="smlie_slide_aim">');
		html.push(this._getAimHtml());
		html.push('</div>');
		html.push('</div>');
		$("body").append(html.join(''));
		this.bindUI(id);
	},
	bindUI: function(id){
		var root = $("#" + id), that = this, enableClass = that._config.enableClass;
		var touchX1 = touchX2 = 0;
		//处理li和dot的事件
		function mEvnent($T){
			$(".smile_list table", root).eq($T.index()).show().siblings("table").hide();
			$T.addClass(enableClass).siblings("." + enableClass).removeClass(enableClass);
		};
		//绑定事件
		root.on("click.smile", ".smile_list a", function(){
			var data = $(this).data("smile");
			that.fire("smileClick", [data]);
		}).on("click.tab", ".smlie_slide_aim a", function(){
			mEvnent($(this));
		}).on("touchstart.smile", function(e) {
            touchX1 = that._getPoint(e).x;
		}).on("touchmove.smile", function(e){
			touchX2 = that._getPoint(e).x;
			//保证点击事件能触发，只要阻止它就够了
			e.preventDefault();
		}).on("touchend.smile touchcancel.smile", function(e) {
			//如果没有移动，则触发默认事件
			if(touchX2 == 0)return true;
			var list = $(".smlie_slide_aim a", root), cur = list.filter(".on");
			var curIndex = cur.index(), max = that.pageCount;
			if(touchX2 - touchX1 > 10){
				curIndex--;
			}else if(touchX2 - touchX1 < -10){
				curIndex++;
			}
			if(curIndex >= 0){
				if(curIndex < max){
					mEvnent(list.eq(curIndex));
				}
			};
			touchX1 = touchX2 = 0;
			e.preventDefault();
		});
		that.listen = function(evt, func){
			root.bind(evt, func);
			return this;
		};
	    that.fire = function(evt, args){
			root.trigger(evt, args);
			return this;
		};
		that.show = function(){root.show();this.visible = true;return this;}
		that.hide = function(){root.hide();this.visible = false;return this;}
		that.toggle = function(){
			that.visible ? that.hide() : that.show();
		}
		that.getElem = function(){return root;}
		that.root = root;
	},
	_getAimHtml: function(){
		var max = this.pageCount, html = [];
		html.push('<a class="on" href="javascript:;"></a>');
		for(var i = 1; i < max; i++){
			html.push('<a href="javascript:;"></a>');
		}
		return html.join('');
	},
	_getSmileHtml: function(){
		var page = this.pageCount, //一共多少页
			max = this._max, //最多ITEM数
			per = this._per / this._row, //每行多少数据
			y = this._y, //每次背景移动多少
			list = this._list, html = [];
		
		var l = 0; //记录当前到哪个背景
		for(var i = 0; i < page; i++){
			html.push('<table'+ (i ? ' style="display:none"' : "") +'>');
			for(var j = 0; j < this._row; j++){
				html.push("<tr>");
				for(var k = 0; k < per; k++, l++){
					html.push('<td class="t'+k+'"><a href="javascript:;" data-smile="'+ (list[l] ? "["+list[l]+"]" : "") +'"><span class="smile_pop" style="background-position-y:'+ (l * y)  +'px;"></span></a></td>');
				}
				html.push("</tr>");
			}
			html.push('</table>');
		}		
		return html.join('');
	}
};

var smileTool = {
	//smileFactory的window绑定事件
	clickInit: function(smile, textarea){
		if(!smile || smile.constructor !== smileFactory)return;
		var that = this;
		//检测点击
		$(window).on("click.smlieshow", function(){
			smile.hide();
		}).on("click.smliehide", ".smile_wrap", function(){
			smile.show();
		});
	},
	//在textarea中插入数据
	insertText: function(textarea, text){
		//火狐/谷歌 浏览器
		if (textarea.selectionStart || textarea.selectionStart == '0'){
			//得到光标前的位置
			var startPos = textarea.selectionStart;
			//得到光标后的位置
			var endPos = textarea.selectionEnd;
			// 在加入数据之前获得滚动条的高度
			var restoreTop = textarea.scrollTop;
			//赋值
			textarea.value = textarea.value.substring(0, startPos) + text + textarea.value.substring(endPos, textarea.value.length);
		   //如果滚动条高度大于0
			if (restoreTop > 0) {
				// 返回
				textarea.scrollTop = restoreTop;
			}
		   textarea.focus();
		   textarea.selectionStart = startPos + text.length;
		   textarea.selectionEnd = startPos + text.length;
		}
		else {
			textarea.value += text;
			textarea.focus();
		}
	},
	//把表情转为image
	turnImage: function(html){
		var map = smileFactory.prototype._map, path = smileFactory.prototype._path;
		return html.replace(/\[([^\]]*)\]/gm, function(a, b, c){
			if(map[b]){
				return path.replace("${i}", map[b]);
			}
			return "";
		});
	},
}
