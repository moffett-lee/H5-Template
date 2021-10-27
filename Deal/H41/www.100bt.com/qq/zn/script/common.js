// JavaScript Document
//公共操作
var cmTool = {
	resetDefault: function($input, isHolder){/*某个地方在用着，别删哦~*/}
	,loadBts: function($bt){
		$bt.html('<span>正在加载中</span> <img src="../www.100bt.com/qq/zn/style/img_s/loading.gif" style="width:15px;height:15px;" />');
	}
	,loadPage: function(){
		var id = "loading_page", $l = $("#" + id);
		if($l.size() > 0){
			$l.show();
		}else{
			$l = $('<img src="../www.100bt.com/qq/zn/style/img_s/loading.gif" />');
			$l.attr("id", id).css({
				width:30, height:30, 
				position:"fixed", top:"50%", left:"50%", margin:"-15px 0 0 -15px"
			});
			$l.appendTo("body");
			//修复fixed定位
			new Fix($l, {top:$(window).height() / 2,right:$(window).width() / 2 - 15});
		}
		return {
			hide: function(){$l.hide();}
		};
	}
	,hideLoadPage: function(){
		$("#loading_page").hide();
	}
};

var header = {
	_preTab: null,
	init: function(){
		this.bind();
		var self = this, bTop = $("#bTop").hide(), timer;
		bTop.click(function(){
			self.gotoHead(0);
			return false;
		});
		$(window).bind("scroll", function(){
			bTop.show();
			clearTimeout(timer);
			timer = setTimeout(function(){
				bTop.hide();
			}, 2000);
		});
	},
	bind: function(){
		var root = $("#header"), that = this;
		root.on("click", "a", function(){
			var $T = $(this), tab = $T.data("tab");
			if(tab){
				if(tab.slice(0,1) == "#"){
					that._preTab && $(that._preTab).hide();
					if(that._preTab == tab){
						that._preTab = null;
						$T.removeClass("on");
					}else{
						that._preTab = tab;
						$T.addClass("on").siblings(".on").removeClass("on");
						$(tab).show();
					}
					var url = $T.data("url"), cnt = $T.data("holder");
					//有待改进
					if(url){
						var loadWp = cnt ? $(tab).find(cnt) : $(tab);
						loadWp.load(url);
					}
				}else{
					window[tab] && window[tab]();
				}
				return false;
			}
		});
	},
	gotoHead: function(y){
		this.scrollTo(y || 0, 120);
	},
	scrollTo: function(y, time){
		var start = new Date, sy = window.scrollY;
		var timer = setInterval(function(){
			var end = +new Date - start;
			if(end > time){
				clearInterval(timer);
				window.scroll(0, y);
				return;
			}
			window.scroll(0, sy + (y - sy) * Math.floor(end / time * 100) / 100);
		}, 4);
	},
	scrollToBottom: function($E, time){
		var win = $(window), of = $E.offset();
		var win_h = win.height(), top = of.top, h = $E.height();
		var y = top - win_h + h;
		this.scrollTo(y, time);
	}
};

//加载代理:for 管理 ajax
var qqAjax = {
	//{root: 绑定事件的根元素, link: 连接选择器, cnt: 加载内容的选择器}
	//root 和 link 组成主键，防止重复绑定
	_loadMap:{},
	load: function(){
		var arg = arguments, len = arg.length;
		for(var i = 0; i < len; i++){
			var ob = arg[i];
			if(ob.root){
				if(this._loadMap[ob.root + ob.link])return;
				this._loadMap[ob.root + ob.link] = true;
				$(ob.root).on("click", ob.link, function(){
					var that = this;
					ob.beforeClick && ob.beforeClick.apply(that, [$(ob.root)]);
					$.get($(this).attr("data-url"), function(html){
						var prt = $(ob.cnt ? ob.cnt : ob.root);
						if(ob.appentTo){
							prt.append(html);
						}else{
							prt.html(html);
						}
						ob.clickFunc && ob.clickFunc.apply(that, [$(ob.root)]);
					}, "html");
					return false;
				});
			}
		}
		return this;
	},
	//统一代理，能干些奇怪的事情
	getJSON: function(url, param, cb){
		return $.getJSON(url, param, cb);
	},
	//异步加载脚本
	_scriptLoadedMap:{},
	script: function(src, func){
		var name = this._scriptLoadedMap[src];
		if(!name){
			name = "script_" + new Date / 1;
			var param = {path: src};
			this._scriptLoadedMap[src] = name;
			this.add(name, param);
		}
		this.use(name, func);
	},
	_script: function(src, cb){
		var script = document.createElement("script");
		script.src = src;
		script.async = true;
		script.type = "text/javascript";
		var _head = document.head || document.getElementsByTagName("head")[0];
		script.onload = script.onreadystatechange = function(){
			if(!this.readyState || this.readyState == "loaded" || this.readyState == "complete"){
				cb && cb();
				script.onload = script.onreadystatechange = null;
			}
		};
		script.onerror = function(){
			cb && cb();
			script.onerror = null;
		}
		_head.appendChild(script);
	},
	_scriptMap:{},
	//obj: {path:}
	add: function(name, obj){
		var map = this._scriptMap;
		if(map[name]){
			//console.log("重复定义模块:", name);
			return;
		}
		map[name] = obj;
		map[name]["loading"] = false;
		map[name]["loaded"] = false;
		map[name]["funcList"] = [];
	},
	use: function(name, cb){
		var map = this._scriptMap;
		if(!map[name]){
			//console.log("模块:" + name + " 不存在");
			cb && cb();
			return;
		}
		var item = map[name], 
			loaded = item.loaded, 
			loading = item.loading,
			funcList = item.funcList;
		//正在加载中...
		if(loading){
			cb && funcList.push(cb);
			return;
		};
		//已经加载完毕了
		if(loaded){
			cb && cb();
			return;
		};
		item.loading = true;
		cb && funcList.push(cb);
		this._script(item.path, function(){
			var func = funcList.shift();
			while(func){
				func();
				func = funcList.shift();
			};
			item.funcList = [];
			item.loaded = true;
			item.loading = false;
		});
	},
	//同步加载样式
	link: function(link){
		$("head").append('<link href="' + link + '" rel="Stylesheet" type="text/css" />');
	}
};

(function(win) {
    var canFix = (function() {
        if ($.os && $.os.ios && parseFloat($.os.version) < 5) {
            return false
        }
        if ($.os && $.os.android && (parseFloat($.os.version) < 2.1 || parseFloat($.os.version) == 2.3)) {
            return false
        }
        if (/M031/.test(navigator.userAgent)) {
            return false
        }
        return true
    })();
    function Fix(e, d) {
        this.$el = e;
        this.options = {};
        $.extend(this.options, d);
        if (canFix) {
            this._nativeFixed()
        } else {
            this._absoluteFixed()
        }
        this._initEvents()
    }
    Fix.prototype = {
		_setNativePosition: function(elem, param) {
            if (typeof param == "undefined") {
                elem.css({top: 0,left: 0})
            }
            if (typeof param.top == "undefined") {
                if (typeof param.bottom == "undefined") {
                    elem.css("top", 0)
                } else {
                    elem.css("bottom", param.bottom)
                }
            } else {
                elem.css("top", param.top)
            }
            if (typeof param.right == "undefined") {
                if (typeof param.left == "undefined") {
                    elem.css("right", 0)
                } else {
                    elem.css("left", param.left)
                }
            } else {
                elem.css("right", param.right)
            }
        },_setAbsolutePosition: function(e, d) {
            e.css({top: window.pageYOffset + (d.bottom !== undefined ? window.innerHeight - e.height() - d.bottom : (d.top || 0)),left: d.right !== undefined ? document.body.offsetWidth - e.width() - d.right : (d.left || 0)})
        },_absoluteFixed: function() {
            this.$el.css("position", "absolute");
            this._setAbsolutePosition(this.$el, this.options)
        },_nativeFixed: function() {
            this.$el.css("position", "fixed");
            this._setNativePosition(this.$el, this.options)
        },_initEvents: function() {
            var d = this;
            if (!canFix) {
                $(window).on("ortchange", function() {
                    d._absoluteFixed()
                });
                $(document).on("touchmove", function() {
                    d._absoluteFixed()
                });
                $(document).on("scroll", function() {
                    d._absoluteFixed()
                })
            }
        }
	};
    win.Fix = Fix;
	win.isSupportFix = function(){return canFix};
})(window);

$(function(){
	header.init();
	//回到顶部兼容一下低版本浏览器
	new Fix($("#bTop"), {bottom:5,right:0});
});
