var SQ = SQ || {};
/**
 * 随机数输出
 * @method
 * @name SQ.generate
 * @example
 * Sq.generate.uniqueId();
 * Sq.generate.randomInt(0, 9);
 * Sq.generate.randomArr([1,2,3]);
 */
SQ.generate = {
    randomInt: function (min, max) {
        if (typeof min === "number" && typeof max === "number" && min < max) {
            return parseInt(Math.random() * (max - min + 1) + min, 10);
        }
        return false;
    },
    randomArr: function (arr) {
        return arr.sort(function () {
            return Math.random() - 0.5;
        });
    }
};

/**
 * 更新提醒页面显示大家更新
 * @method
 * @name showUpdateTopList
 */
function showUpdateTopList() {
    var $updateTop = $(".J_updateTop");
    var $updateMore = $(".J_updateMore");

    if (updateTopList !== 'undefined') {
        var DS = updateTopList.list;
        var len = DS.length;
        var list = '<ul>';
        for (var i = 0; i < len; i++) {
            var item = DS[i];

            list += '<li><a href="'+ item.url +'"><div class="icon"><img src="'+ item.icon +'" /></div><p class="tit">'+ item.appName +'</p><p class="up-it">'+ item.updateTimes +'次</p></a></li>';

        }
        list += '</ul>';
        $updateTop.append(list);
        $updateMore.attr("href",updateTopList.moreURL)
    }
}


(function ($, window) {
    /**
     * Construct LoadMore
     * @name LoadMore
     * @classdesc
     * @constructor
     * @param {config} 加载更多设置
     * @example var appList = new SQ.LoadMore({
            eventType : "scroll",
            triggerTarget : window,
            ajaxBox : ".J_ajaxWrap",
            stateBox : ".J_scrollLoadMore",
            stateStyle : "load-btn",
            startPageIndex: 2,
            scrollMaxPage : 3,
            loadingTip : "正在加载请稍后...",
            initTips : "滑动加载更多内容",
            clickTips : "点击加载更多",
            loadedError : "加载错误请重试"
        });
     * @version 1.0.0
     */
    function LoadMore(config) {
        var me = this;
        me.config = config;
        me.$triggerTarget = $(me.config.triggerTarget); // 触发元素
        me.$ajaxBox = $(me.config.ajaxBox); // 数据展示元素
        me.$stateBox = $(me.config.stateBox).addClass(me.config.stateStyle).text(me.config.initTips);   // 状态展示元素
        me.api = me.$stateBox.attr("data-api");
        me.page = me.config.startPageIndex || 0;
        me.maxPage = me.config.scrollMaxPage + me.page;
        me.currentState = "none";
        me._init();
    }
    LoadMore.prototype =  {
        construtor: LoadMore,
        /**
         * @name _init
         * @desc 初始化方法，当判定必要元素存在时就执行事件绑定操作。
         */
        _init : function () {
            var me = this;
            // 触发元素、数据展示元素、状态展示元素必须都存在
            if (me.$triggerTarget.length > 0 && me.$ajaxBox.length > 0 && me.$stateBox.length > 0) {
                me._bind(me.$triggerTarget, me.config.eventType);
            }
        },
        /**
         * @name _getHeight
         * @desc 获取页面高度方法。
         * @param {$el} jQuert 或 Zepto 元素包装集
         */
        _getHeight : function ($el) {
            if ($el.get) {
                $el = $el.get(0);
            }
            if (!$el) {
                return 0;
            }
            if ($el.getBoundingClientRect) {
                return $el.getBoundingClientRect().height;
            }
            return Math.max($el.clientHeight, $el.offsetHeight, $el.scrollHeight);
        },
        /**
         * @name _bind
         * @desc 事件绑定方法。
         * @param {$el} jQuert 或 Zepto 元素包装集
         * @param {eventType} 事件类型，"scroll" 或 "click"
         */
        _bind : function ($el, eventType) {
            var me = this;
            $el.bind(eventType, function () {
                me._trigger(eventType);
            });
        },
        /**
         * @name _unbind
         * @desc 解除事件绑定方法。
         * @param {$el} jQuert 或 Zepto 元素包装集
         * @param {eventType} 事件类型，"scroll" 或 "click"
         */
        _unbind : function ($el, eventType) {
            $el.unbind(eventType);
        },
        /**
         * @name _trigger
         * @desc 触发事件方法，但满足绑定事件条件时或满足指定触发条件的情况下调用触发方法，
         *       该方法用于集中处理触发事件，判定是否需要加载数据或者更新 UI 显示。
         * @param {eventType} 事件类型，"scroll" 或 "click"
         */
        _trigger : function (eventType) {
            var me = this;
            //var connector = me.api.indexOf("?") === -1 ? "?" : "&";
			//分类页通过___构造传多个参数，解决CI框架单个参数的限制
			var urlArr = window.location.href.split("/");
			var connector = me.api.indexOf("___") === -1 ? "default.htm" : "./" + urlArr[urlArr.length - 1] + "@";
            var isLoading = me.$stateBox.hasClass("J_loading");
            var isNoMore = me.$stateBox.hasClass("J_noMore");

            if (isLoading && isNoMore) {
                return;
            }

            if (eventType === "scroll") {
                if (me.page < me.maxPage) {
                    var contentHeight = me._getHeight($("body"));
                    var winHeight = window.innerHeight;
                    if (me.$triggerTarget.scrollTop() >= contentHeight - winHeight * (1 + 2.5) && !isLoading && !isNoMore) {
						//alert(me.$triggerTarget.scrollTop() + '-' + contentHeight + '-' + winHeight);
                        //me._loadData(me.api + connector + "page=" + me.page);
						//alert(me.api + connector + me.page);
						me._loadData(me.api + connector + me.page);
                    }
                }
                if (me.page === me.maxPage) {
                    me._changeState("scrollEnd");
                }
            }

            if (eventType === "click") {
                //me._loadData(me.api + connector + "page=" + me.page);
				me._loadData(me.api + connector + me.page);
            }
        },
        /**
         * @name _changeState
         * @desc 状态变更方法，该方法用于记录程序运行状态，并针对不同状态做出 UI 更新及事件重新绑定等操作。
         * @param {state} 运行状态，值包括：loading、loaded、scrollEnd、noMore、loadedError、unknownError
         */
        _changeState : function (state) {
            var me = this;
            // 当预执行状态与程序当前运行状态相同时，退出状态变更方法，以避免多次重复操作。
            if (me.currentState === state) {
                return;
            }
            me.currentState = state;

            if (me.config.eventType === "scroll") {
                switch (state) {
                case "loading":   //正在加载阶段，添加 J_loading 标识，更新提示文字
                    me.$stateBox.addClass("J_loading").show().text(me.config.loadingTip);
                    break;
                case "loaded":   //加载完成
                    me.$stateBox.removeClass("J_loading").hide().text("");
                    me.page += 1;
                    break;
                case "scrollEnd":   //滑动加载次数已达到上限
                    me._unbind(me.$triggerTarget, me.config.eventType); //解除绑定
                    me.$triggerTarget = me.$stateBox;   //变更触发目标，并将加载触发方式更改为 click
                    me.config.eventType = "click";
                    me._bind(me.$triggerTarget, me.config.eventType);   //重新绑定
                    me.$stateBox.show().addClass("click-state").text(me.config.clickTips);
                    break;
                }
            }

            if (me.config.eventType === "click") {
                switch (state) {
                case "loading":   //正在加载阶段，添加 J_loading 标识，更新提示文字
                    me.$stateBox.addClass("J_loading").show().text(me.config.loadingTip);
                    break;
                case "loaded":   //加载完成
                    me.$stateBox.removeClass("J_loading").text(me.config.clickTips);
                    me.page += 1;
                    break;
                }
            }

            //公共状态
            switch (state) {
            case "noMore":   //无下页数据
                me.$stateBox.addClass("J_noMore").hide();
                break;
            case "loadedError": //加载错误提示
                me.$stateBox.removeClass("J_loading").text(me.config.loadedError);
                break;
            case "unknownError":
                me.$stateBox.removeClass("J_loading").text("未知错误，请重试");
                break;
            }
        },
        /**
         * @name _loadData
         * @desc 数据加载方法，用于发起 AJAX 请求加载数据。
         * @param {api} 请求数据的 API 接口
         */
        _loadData : function (api) {
            var me = this;
            me._changeState("loading");

            var XHR = $.ajax({
                type: "POST",
                url: api,
                timeout: 5000,
                success: function (data) {
                    me._render(data);
                },
                error: function () {
                    me._changeState("loadedError");
                }
            });
        },
        /**
         * @name _render
         * @desc 数据渲染方法，用于将请求的数据渲染到页面中。
         * @param {data} 服务器返回的数据。
         */
        _render : function (data) {
            var me = this;
			////如果 data 是 JSON 字符串, 必须通过$.parseJSON(data)将它转换为对象字面量
            var jsonData = typeof data === "string" ? $.parseJSON(data) : data;
            var code = parseInt(jsonData['code'], 10);
            switch (code) {
            case 200:   //成功加载
				var str = "";
				for(i = 0; i < jsonData['data'].length; i++)
				{
					str += '<li><div class="icon"><img alt="' + jsonData['data'][i]['TITLE'] + '" src="../image.feeliu.com/'+ jsonData['data'][i]['LOGO'] +'" /><i class="'+ 'rec' +'"></i></div>		<div class="info"><h2>'+ jsonData['data'][i]['REIT_NAME'] +'</h2><p class="txt">'+ jsonData['data'][i]['REIT_DOWNLOADCOUNT_BASE'] +'人推荐</p><p class="txt">'+ jsonData['data'][i]['NAMEKEY'] +' | '+ jsonData['data'][i]['REIT_SIZE'] +'</p><div class="down-btn free"><a title="' + jsonData['data'][i]['TITLE'] +'" href="../dl05.feiliu.com/' + jsonData['data'][i]['REIT_TRUEDOWNLOADURL'] + '">免费下载</a></div></div>		<a href="../game.feiliu.com/newwap/android/detail/app/' + jsonData['data'][i]['FK_ELEMENT_ID'] +'" class="down-area"></a></li>';
				}
                me.$ajaxBox.append(str);
                me._changeState("loaded");
                break;
            case 900:   //无下页数据
				var str = "";
				for(i = 0; i < jsonData['data'].length; i++)
				{
					/*str += '<li><div class="icon"><img src="../image.feeliu.com/'+ jsonData[i]['LOGO'] +'" /><i class="'+ 'rec' +'"></i></div><div class="info"><h2>'+ jsonData[i]['TITLE'] +'</h2><p class="txt">'+ jsonData[i]['REIT_DOWNLOADCOUNT_BASE'] +'人推荐</p><p class="txt">'+ jsonData[i]['NAMEKEY'] +' | '+ jsonData[i]['REIT_SIZE'] +'</p><div class="down-btn free"><a href="../dl05.feiliu.com/'+ jsonData[i]['REIT_TRUEDOWNLOADURL'] + app +'">免费下载</a></div></div><a href="../game.feiliu.com/newwap/android/detail/app/'+ jsonData[i]['FK_ELEMENT_ID'] + app +'" class="down-area"></a></li>';*/
					str += '<li><div class="icon"><img alt="' + jsonData['data'][i]['TITLE'] + '" src="../image.feeliu.com/'+ jsonData['data'][i]['LOGO'] +'" /><i class="'+ 'rec' +'"></i></div>		<div class="info"><h2>'+ jsonData['data'][i]['REIT_NAME'] +'</h2><p class="txt">'+ jsonData['data'][i]['REIT_DOWNLOADCOUNT_BASE'] +'人推荐</p><p class="txt">'+ jsonData['data'][i]['NAMEKEY'] +' | '+ jsonData['data'][i]['REIT_SIZE'] +'</p><div class="down-btn free"><a title="' + jsonData['data'][i]['TITLE'] +'" href="../dl05.feiliu.com/' + jsonData['data'][i]['REIT_TRUEDOWNLOADURL'] + '">免费下载</a></div></div>		<a href="../game.feiliu.com/newwap/android/detail/app/' + jsonData['data'][i]['FK_ELEMENT_ID'] +'" class="down-area"></a></li>';
				}
                me.$ajaxBox.append(str);
                me._changeState("noMore");
                break;
			case 1200:	//专题成功加载数据
				var str = "";
				for(i = 0; i < jsonData['data'].length; i++)
				{
					str += '<li><div class="pic"><img alt="' + jsonData['data'][i]['TITLE'] + '" src="../image.feeliu.com/' + jsonData['data'][i]['LOGO'] + '" /></div><div class="info"><h2>' + jsonData['data'][i]['TITLE'] + '</h2><p class="txt">' + jsonData['data'][i]['EL_DESC'] + '</p></div><div class="attr-right"></div><a title="' + jsonData['data'][i]['TITLE'] +'" href="../game.feiliu.com/newwap/android/detail/app/' + jsonData['data'][i]['ID'] + '" class="down-area"></a></li>';
				}
                me.$ajaxBox.append(str);
                me._changeState("loaded");
                break;			
			case 1900:	//专题无下页数据
				var str = "";
				for(i = 0; i < jsonData['data'].length; i++)
				{
					str += '<li><div class="pic"><img alt="' + jsonData['data'][i]['TITLE'] + '" src="../image.feeliu.com/' + jsonData['data'][i]['LOGO'] + '" /></div><div class="info"><h2>' + jsonData['data'][i]['TITLE'] + '</h2><p class="txt">' + jsonData['data'][i]['EL_DESC'] + '</p></div><div class="attr-right"></div><a title="' + jsonData['data'][i]['TITLE'] +'" href="../game.feiliu.com/newwap/android/detail/app/' + jsonData['data'][i]['ID'] + '" class="down-area"></a></li>';
				}
                me.$ajaxBox.append(str);
                me._changeState("noMore");
            default:
                me._changeState("unknownError");
            }

            //测试无下页数据状态
            /*console.log(me.page);
             if (me.page === 1) {
             console.log("测试无下页数据状态");
             me._changeState("noMore");
             }*/
        }

    };
    SQ.LoadMore = LoadMore;
}(jQuery, window));

$(document).ready(function(){

    var Dev = false;

//全局变量
    var appsTimeOut = 20000;
    var ajaxTimeOut = 10000;
    var ajaxSTO;
    var ajaxSTOTime = 10500;     //setTimeOut
    var $img = $("#detail-touchSlider").find("img");
    var HXRequest;
    var TG = "&uc_param_str=dnfrpfbivesscpmibtbmntnisiei";
    var ApiURL = "../tz.m.app.uc.cn/upremind/frontlog.php";

    var appList = new SQ.LoadMore({
        eventType : "scroll",
        triggerTarget : window,
        ajaxBox : ".J_ajaxWrap",
        stateBox : ".J_scrollLoadMore",
        stateStyle : "load-btn",
        startPageIndex: 2,
        scrollMaxPage : 3,
        loadingTip : "正在加载请稍后...",
        initTips : "滑动加载更多内容",
        clickTips : "点击加载更多",
        loadedError : "加载错误请重试"
    });

    $(".go-top").click(function(e){
        e.preventDefault();
        window.scrollTo(0,0);
    });

    //更新提醒页面，后端渲染情况，显示大家更新模块
    if ($(".J_updateTop").length > 0) {
        showUpdateTopList();
    }

    /**
     * 随机显示大家说
     * @method
     * @name randomTalk
     */
    (function randomTalk() {
        if (typeof msgList !== "undefined") {
            var $msgList = $(".J_msgList");
            var DS = msgList;
            var len = DS.length;
            var arr = [];
            var list = "";
            for (var i = 0; i < len; i++) {
                arr.push(i);
            }

            var rArr = SQ.generate.randomArr(arr);

            list = '<li><em>1.</em>'+ DS[rArr[0]].msg +'<span>一天前</span></li>' +
                '<li><em>2.</em>'+ DS[rArr[1]].msg +'<span>一天前</span></li>'
            $msgList.append(list);
        }
    }());

    /**
     * 随机显示热搜标签
     * @method
     * @name randomTag
     */
    (function randomTag() {

        if (typeof tagStore !== "undefined") {
            var $randomTagWrap = $(".J_randomTag");
            var DS = tagStore.hotTag;
            var len = DS.length;
            var arr = [];
            var list = "";
            for (var i = 0; i < len; i++) {
                arr.push(i);
            }

            var rArr = SQ.generate.randomArr(arr);

            for (var j = 0; j < 9; j++) {
                var item = DS[rArr[j]];
                var itemClass = rArr[j] > 9 ? SQ.generate.randomInt(0,9) : rArr[j];
                list += '<li><a href="'+ item.url +'" class="c'+ itemClass +'">'+ item.appName +'</a></li>';
            }
            $randomTagWrap.append(list);
        } else {
            $(".hot-tag").hide();
        }
    }());

    /**
     * 首页 Banner 自动切换
     * @method
     * @name slider
     */
    (function slider(){
        var M = Math;
        var $slider = $(".J_slider");
        var $img = $slider.find("a");
        var maxRandom = $img.length;
        var showIndex = M.floor(M.random() * maxRandom);

        $img.eq(showIndex).show();
    }());

    /**
     * @method searchToggle 搜索栏切换开关
     */
    (function searchToggle(){
        var $search = $(".J_search");
        var $goBtn = $(".J_goToSearch");
        var $backBtn = $(".J_returnLogo");
        var $tab1 = $(".tab-t1");
        var $tab2 = $(".tab-t2");
        $goBtn.click(function(){
            $tab1.addClass("hide");
            $tab2.removeClass(("hide"));
            $tab2.find(".input").focus();
            $search.val("");
        });
        $backBtn.click(function(e){
            e.preventDefault();
            $tab1.removeClass("hide");
            $tab2.addClass(("hide"));
        });
    }());

    /**
     * @method searchBtnToggle 搜索按钮切换开关
     */
    (function searchBtnToggle(){
        var $search = $(".J_search");
        var $submitBtn = $(".submit-btn");
        var $clearBtn = $(".J_clearInput");
        var $cancelBtn = $(".cancel-btn");
		var $topschBtn = $(".sch-mbtn");
        var inputListener;

        function showState1() {
            $submitBtn.show();
            $clearBtn.show();
            $cancelBtn.hide();
        };

        function showState2() {
            $submitBtn.hide();
            $clearBtn.hide();
            $cancelBtn.show();
        };

        $search.bind("focus", function(){
            var $me = $(this);
            inputListener = setInterval(function(){
                var val = $me.val().replace(/\s+/g,"");
                if (val.length >= 1) {
                    showState1();
                } else {
                    showState2();
                }
            },200);
        });
        $search.bind("blur", function(){
            clearInterval(inputListener);
        });
        $clearBtn.bind("click", function(){
            $search.val("");
            showState2();
        });
		//新增搜索重置URL功能2013-05-25
        $submitBtn.bind("click", function(){
			var $fm2 = $("#fm-2");
			var $actval = $fm2.attr('action');
			var $inputval =  $fm2.find("input:text").val();
			var $newval = encodeURI($actval + $inputval);
			$fm2.attr('action',$newval);
        });
		$topschBtn.bind("click", function(){
			var $fm1 = $("#fm-1");
			var $actval = $fm1.attr('action');
			var $inputval =  $fm1.find("input:text").val();
			var $newval = encodeURI($actval + $inputval);
			$fm1.attr('action',$newval);
        });
		
    }());

    /**
     * @ScrollLoader 滑动到底部加载更多
     */
    (function ScrollLoader (){
        var $loaderHandle = $(".J_loadMore_scroll");
        var $win = $(window);
        var $body = $("body");
        var winH = $win.height();
        var docH = $body.height() - 80;

        if ($loaderHandle.length > 0) {
            //$(document).bind("scroll touchstart touchmove touchend", function(){
            $(document).bind("scroll", function(){
                var isLoading = $loaderHandle.hasClass("loading");
                if ( winH + $(document).scrollTop() >= docH && !isLoading ) {
                    loadMore.call($loaderHandle);
                    $loaderHandle.addClass("load-more-scroll");
                    $loaderHandle.text("正在加载...请稍后");
                }
            });
        }
    }());

    /**
     * @method postReport 提交举报信息
     */
    $(".J_postReport").click(function(e){
        e.preventDefault();
        var $Tips = $("<div class='float-tips'></div>");
        var url ="http//" + location.host + $(this).attr("href");
        $.ajax({
            type: "GET",
            url: url,
            timeout: 3000,
            success: function( code ){
                if (code === "200") {
                    $Tips.text("已成功举报到12321！").addClass("ok");
                    showTips($Tips);
                }
                if (code === "301") {
                    $Tips.text("您已经举报过了！").addClass("err2");
                    showTips($Tips);
                }
            },
            error: function(){
                //alert("提交失败，请重试！");
            }
        });
    });

    /**
     * @method getUpdateList 获取更新应用列表
     */
    (function getUpdateList(){
        var failback = $(".ajax-wrap").attr("data-failback");
        var $userInfo = $(".ei");
        var ei = GetCookie("imei") || $userInfo.attr("data-ei");
        var sn = GetCookie("sn") || $userInfo.attr("data-sn");
        var api = $userInfo.attr("data-failback");
        var qu = $userInfo.attr("data-app");
        var app = "&app=" + $userInfo.attr("data-app");
        var type = "POST";
        var $resultTips = $(".J_resultTips");

        $resultTips.hide();
        //var f = "&f=8_0_0_0_0&uc_param_str=dnfrpfbivesscpmibtbmntnisiei";

        var appsInfo = "";
        //$("body").prepend("fb-1>")

        if ( failback === "true" ) {
            try{
                appsInfo = ucweb.startRequest("shell.appsInfo.all");
                //$("body").prepend("fb-2>")
            }catch(e){
                //$("body").prepend("fb-3>")
            }
            //test
            if (Dev) {
                type = "GET";
                appsInfo = "123";
                api = "json/update.json";
                ei = "ei";
                sn = "sn";
            }

            if ( appsInfo.length > 0 ) {
                var content = { "uid": ei, "sn": sn, "version": "1.0", "items": appsInfo };
                //$("body").prepend("fb-4>")
                //$(".ajax-wrap").append('<div class="no-result">正在获取升级应用列表</div>');
                $resultTips.text("正在获取升级应用列表").show();

                $.ajax({
                    type: type,
                    url: api,
                    dataType: "json",
                    data: content,
                    timeout: appsTimeOut,
                    success: function( data ){
                        $resultTips.hide();
                        renderList( data );
                        //$("body").prepend("fb-5>")
                    },
                    error: function(){
                        //XHR 出错
                        $resultTips.text("恭喜，您手机上没有可升级应用！").show();
                        $.get( ApiURL, { imei: ei, sn: sn, type: 1, app: qu});
                        //patch 1.1.4.0 
                        loadHotApps();
                        //patch 1.1.4.0 end
                        //$("body").prepend("fb-9>")
                    }
                });

                function renderList( JSON ){
                    if ( JSON.code !== 100 ){
                        //$("body").prepend("fb-7>")
                        $resultTips.text("恭喜，您手机上没有可升级应用！").show();
                        //patch 1.1.4.0 
                        loadHotApps();
                        //patch 1.1.4.0 end
                        return
                    }
                    var appListsData = JSON.data.apps;
                    var updateNum = appListsData.length;
                    var ignoreNum = JSON.context.ignore || 0;
                    var $ajaxWrap = $(".ajax-wrap");
                    var appLists = '<ul class="v-soft-list">';

                    if ( updateNum > 0 ){
                        if ( ei === "" || sn === "" ) {
                            var section = '';
                        } else {
                            var i = 0;
                            var section = '<div class="down-btn canle" data-idx="'+ appListsData[i].idx +'" data-name="'+ appListsData[i].packageName +'" data-state="1"><a href="#">忽 略</a></div>';
                        }
                        for ( var i = 0; i < updateNum; i++ ) {
                            appLists += '<li><div class="icon"><img src="'+ appListsData[i].icon +'" /><i class="'+ appListsData[i].mark +'"></i></div><div class="info"><h2>'+ appListsData[i].title +'</h2><p class="txt">'+ appListsData[i].versionold +' 更新到 '+ appListsData[i].versionname +'</p><p class="txt"> '+ appListsData[i].size +'</p><div class="down-btn up"><a href="'+ appListsData[i].packageURL + app +'">更 新</a></div>'+ section +'</div><a href="'+ appListsData[i].detailsURL + app +'" class="down-area"></a></li>';
                        }
                        appLists += '</ul>'
                        $ajaxWrap.empty().append( appLists );

                        //patch 1.1.4.0 
                        loadHotApps();
                        //patch 1.1.4.0 end

                        $(".sub-nav").find("em").eq(0).text( updateNum );
                        $(".sub-nav").find("em").eq(1).text( ignoreNum );
                        $(".sq-badge").show().text( updateNum );

                        var now = new Date();
                        var H = now.getHours();
                        setCookie( "updateNum", updateNum, "day", "default.htm" );
                        setCookie( "clock", H, "day", "default.htm" );
                        //$("body").prepend("fb-done>")
                    }
                }
            } else {
                //$(".ajax-wrap").append('<div class="no-result">恭喜，您手机上没有可升级应用！</div>');
                $resultTips.text("恭喜，您手机上没有可升级应用！").show();
                //patch 1.1.4.0 
                loadHotApps();
                //patch 1.1.4.0 end
            }
        } else {
            renderToggle(false);
        }
    })();

//patch 1.1.4.0 
    function loadHotApps(){

        renderToggle(true);

        var $userInfo = $(".ei");
        var api = "api/1/topic/hotapps.json";
        var type = "GET";
        var app = "&app=" + $userInfo.attr("data-app");
        //test
        if (Dev) {
            api = "json/hotapps.json";
        }
        $.ajax({
            type: type,
            url: api,
            dataType: "json",
            timeout: appsTimeOut,
            success: function( data ){
                renderList( data );
            },
            error: function(){
                //XHR 出错
            }
        });

        function renderList(JSON){
            var $ajaxWrap = $(".ajax-wrap");
            var hotAppListsData = JSON.data;
            var $hotApps = $("<div class='hot-list'></div>");
            var hotLists = '<h3><a href="#" class="fr J_updateMore">更多 &gt;</a>大家都在更新：</h3><div class="h-soft-list J_updateTop"></div><h3>热门下载应用</h3><ul class="v-soft-list">';
            var hasHotList = false;

            if (hotAppListsData){
                var hotAppNum = hotAppListsData.length;
                if (hotAppNum > 0){
                    for ( var i = 0; i < hotAppNum; i++ ) {
                        hotLists += '<li><div class="icon"><img src="'+ hotAppListsData[i].icon +'" /><i class="'+ hotAppListsData[i].mark +'"></i></div><div class="info"><h2>'+ hotAppListsData[i].title +'</h2><p class="txt">'+ hotAppListsData[i].ding +'人推荐下载</p><p class="txt">'+ hotAppListsData[i].category +' | '+ hotAppListsData[i].size +'</p><div class="down-btn free"><a href="'+ hotAppListsData[i].packageURL + app +'">免费下载</a></div></div><a href="'+ hotAppListsData[i].detailsURL + app +'" class="down-area"></a></li>';
                    }
                    hotLists += '</ul>';
                    hasHotList = true;
                    $hotApps.append(hotLists);
                }
                $ajaxWrap.append($hotApps);

                // 1.1.10
                showUpdateTopList();
            }
        }
    }
//patch 1.1.4.0 end

//patch 1.1.8.0
    function renderToggle(state){
        var $userInfo = $(".ei");
        var app = $userInfo.attr("data-app");
        var ucVersion = parseInt($userInfo.attr("data-version"));

        if (ucVersion < 9) {
            return
        }

        // state 为 true 时，表示前端渲染列表内容，需要前端渲染开关
        if (state) {
            var $ajaxWrap = $(".ajax-wrap");
            var toggle = '<div class="update-toggle">我的导航应用更新提醒设置<div class="J_toggle toggle"><span>已关闭</span><em class="t-bg"><i></i></em></div></div>';
            $ajaxWrap.append(toggle);
        }

        var $toggle = $(".J_toggle");
        var $text = $toggle.find("span");

        //读取 Ucweb Javascript API，更新按钮状态
        try {
            var state = window.ucweb.startRequest("shell.appUpdateNotice.myNavi", ["getValue"]);
            //alert(state);
            if (state === "1") {
                //alert("open")
                $toggle.addClass("on");
                $text.text("已开启");
            } else if (state === "0") {
                //alert("close")
                $toggle.removeClass("on");
                $text.text("已关闭");
            }
        } catch(e) {
            //读取API错误
        }

        //点击按钮触发操作
        $toggle.bind("click",function(){
            var $me = $(this);
            var url = "apk/index.php@system=interface&module=updatelog&app="+ app +"&switch=";	//统计 api

            //当关闭更新时：
            if ($me.hasClass("on")) {
                var $toggleTips = $("<div class='toggle-tips'><p>我的导航装机必备<br/>将不再提示可更新应用<br/>确定关闭？</p><div class='J_ok btn'>确定</div><div class='btn'>取消</div></div>");

                if ($(".toggle-tips").length === 0) {
                    var H = $(window).height();
                    var T = $(window).scrollTop();
                    $toggleTips.css({top:H/2-85+T});
                    $toggleTips.appendTo("body");
                }

                $(".toggle-tips .btn").bind("click",function(){
                    if ($(this).hasClass("J_ok")) {
                        try {
                            window.ucweb.startRequest("shell.appUpdateNotice.myNavi", ["setValue", "false"]);
                            $me.removeClass("on");
                            $text.text("已关闭");

                            url += 0; // switch开关: (0表示关闭, 1表示开启)
                            $.get(url);	//发送统计请求

                            //alert("去关闭")
                        } catch(e) {
                            //读取API错误
                        }
                    }
                    $(".toggle-tips").remove();
                    $(".toggle-tips .btn").unbind();
                });
            } else {
                try {
                    window.ucweb.startRequest("shell.appUpdateNotice.myNavi", ["setValue", "true"]);
                    $me.addClass("on");
                    $text.text("已开启");

                    url += 1;// switch开关: (0表示关闭, 1表示开启)
                    $.get(url);	//发送统计请求
                    //alert("去开启")
                } catch(e) {
                    //读取API错误
                }
            }
        });
    }
//patch 1.1.8.0 end

//应用信息展开&关闭
    $(".toggle-btn").bind("click",function(){
        var $toggleBtn = $(this);
        var $info = $toggleBtn.prev();
        var h = $info.height();
        toggleInfo( $info, $toggleBtn, h )
    });

//应用信息隐藏
    $(".J_info").each(function(){
        var $info = $(this);
        var h = $info.height();
        var $toggleBtn = $(this).next();
        toggleInfo( $info, $toggleBtn, h )
    })

//关闭更新提醒
    $(".remind").find("del").click(function(){
//    $(".remind").hide();
        $(".remind").stop().animate({top:"-40px"});
    })

//加载更多 isok
    $(".J_loadMore").bind("click",loadMore);
    $(".J_loadMores").live("click",loadMore);

    function loadMore(){
        var H = $(window).height();
        var T = $(window).scrollTop();
        var $btn = $(this);
        var $ajaxWrap = $btn.parents(".ajax-wrap");
        var $loadBox = $("<div class='load-box'>加载中...</div>").css({top:H/2-50+T});
        var url = $btn.attr("data-ajax");
        var $Tips = $("<div class='float-tips'></div>");

        if($(".float-tips").length > 0){ $(".float-tips").remove();}

        if( $btn.hasClass("loading") ){
            HXRequest.abort();
            $(".load-box").remove();
            clearTimeout(ajaxSTO);
        }
        if( url.length == 0 ){ return }

        $btn.addClass("loading");
        $loadBox.appendTo("body");

        ajaxSTO = setTimeout(function(){
            $Tips.text("抱歉！加载失败，请稍候再试。").addClass("err2");
            showTips($Tips);
            if ($btn.hasClass("J_loadMore_scroll")) {
                $btn.text("").removeClass("loading load-more-scroll");
            }
        },ajaxSTOTime);

        HXRequest = $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: "",
            timeout:ajaxTimeOut,
            success:function(data){
                var code = data.code,
                    data = data.data;
                loadMoreDone(data);
                clearTimeout(ajaxSTO);
            },
            error: function(){
                $loadBox.remove();
                if ($btn.hasClass("J_loadMore_scroll")) {
                    $btn.text("").removeClass("loading load-more-scroll");
                }
            }
        });
        function loadMoreDone(data){
            $ajaxWrap.append(data);
            $btn.remove();
            $loadBox.remove();
        }
    }

//软件截图缩放
    if( $img.length > 0 ){
        for( var i = 0, len = $img.length; i < len; i++){
            $img[i].onload = function(){
                var imgW = $(this).width(),
                    imgH = $(this).height();

                if( imgW - imgH < 0 ){
                    $(this).addClass("zoom1");
                }else{
                    $(this).addClass("zoom2");
                }
            }
        }
    }

//软件推荐 isok
    $(".J_posDing").bind("click",function(e){
        e.preventDefault();
        var $parent = $(this).parents(".ding");
        var $num = $parent.find("em"),
            $span = $parent.find("span"),
            $up = $(".d-icon"),
            num = parseInt($num.text()),
            url = $(this).attr("href");

        if( $(".float-tips").length > 0 ){
            return
        }
        var $Tips = $("<div class='float-tips'></div>");

        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: "",
            timeout:ajaxTimeOut,
            success:function(data){
                var code = data.code,
                    data = data.data.toString();
                switch(data){
                case "1" :
                    if( num ){
                        $num.text( num + 1 );
                        $up.text( num + 1 +"人推荐下载");
                    }else{
                        $span.text("").append("已有<em>1</em>人推荐下载");
                        $up.text("1人推荐下载");
                    }
                    break;
                case "2" :
                    $Tips.text("您已经推荐过了").addClass("err2");
                    showTips($Tips)
                    break;
                case "3" :
                    $Tips.text("推荐失败").addClass("err2");
                    showTips($Tips)
                    break;
                };
            },
            error: function(){
                $Tips.text("抱歉！推荐失败，请稍候再试。").addClass("err2");
                showTips($Tips);
            }
        });
    })

//评论 isok
    $(".J_postCom").click(function(e){
        e.preventDefault();
        var $comment = $(this).prev();
        var $tips = $(".tips");
        var softID = $(".soft-id").attr("data-soft");
        var app = $(".soft-id").attr("data-app");
        var type = $(".soft-id").attr("data-type");
        var content = $comment.val().replace(/\s+/g,"").replace(/</g,"&lt;").replace(/>/g,"&gt;")

        $comment.bind("focus",function(){
            var tipsClear = setTimeout(function(){
                $tips.text("");
                clearTimeout(tipsClear)
            },500)
        })

        if( content == 0 ){
            $tips.text("您的评论还未填写！");
            return
        }

        $.ajax({
            type: "POST",
            url: "index.php@system="+ type +"&module=comment&action=post&id="+ softID +"&app=" + app + TG,
            dataType: "json",
            data: {content:content},
            timeout:ajaxTimeOut,
            success:function(data){
                var code = data.code,
                    data = data.data;

                switch(data){
                case "1" :
                    commentDone()
                    break;
                case "2" :
                    $tips.text("您说话太快了，请稍后再提交！");
                    break;
                case "3" :

                    break;
                };
            },
            error: function(){
                $tips.text("抱歉！提交失败，请稍候再试。");
            }
        });

        function commentDone(){
            var $commentList = $(".comment-list");
            var $firstLi = $commentList.find("li").first();
            var floor = 1;
            var tick = new Date(),
                year = tick.getFullYear(),
                month = tick.getMonth() + 1,
                day = tick.getDate(),
                hours = tick.getHours(),
                minutes = tick.getMinutes(),
                second = tick.getSeconds(),
                month = month < 10 ? "0" + month : month,
                day = day < 10 ? "0" + day : day,
                hours = hours < 10 ? "0" + hours : hours,
                minutes = minutes < 10 ? "0" + minutes : minutes,
                second = second < 10 ? "0" + second : second,
                time = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + second;

            //暂无评论
            if( $firstLi.hasClass("no-com") ){
                $firstLi.remove();
            }else{
                floor = parseInt($firstLi.find("i").text()) + 1
            }
            var $assemblyArea = $("<li><\i>"+ floor +"</i>楼友友 <em>"+ time + " 发表<\/em><p>"+ content +"</p></li>");

            $assemblyArea.prependTo($commentList);
            $tips.text("提交成功");
            $comment.val("");
        }
        //commentDone()
    })

//意见反馈 isok
    $(".J_postSug").click(function(e){
        e.preventDefault();
        var $sug = $(".s1");
        var $contact = $(".s2");
        var $tips = $(".tips");
        var sug = $sug.val().replace(/\s+/g,"");
        var contact = $contact.val().replace(/\s+/g,"");

        $sug.bind("focus",function(){
            var tipsClear = setTimeout(function(){
                $tips.text("");
                clearTimeout(tipsClear)
            },500)
        })

        if( sug == 0 ){
            $tips.text("您的意见还未填写！");
            return
        }

        $.ajax({
            type: "POST",
            url: "index.php@system=advice&module=post"+ TG ,
            dataType: "json",
            data: { sug:sug, contact:contact },
            timeout:ajaxTimeOut,
            success:function(data){
                var code = data.code,
                    data = data.data.toString();

                switch(data){
                case "1" :
                    $sug.val("");
                    $contact.val("");
                    $tips.text("提交成功！")
                    break;
                case "2" :
                    $tips.text("您说话太快了，请稍后再提交！")
                    break;
                };
            },
            error: function(){
                $tips.text("抱歉！提交失败，请稍候再试。");
            }
        });
    })

//搜索
    $(".J_sch").click(function(){
        var sch = $(this).prev().find("input").val().replace(/\s+/g,"");
        if( sch == 0 ){
            return false
        }
    })

    $(".J_topsch").click(function(){
        var $that = $(this);
        var $input = $that.prev();
        if ( $input.val().replace(/\s+/g,"") === "" ) {
            return false
        }
    })

//============函数============

//TODO 软件说明显示&消失
    function toggleInfo( $info, $toggleBtn, h ){
        if( h > 67 ){
            hide();
        }else if( h == 67 ){
            $info.height( "auto" );
            $toggleBtn.text("收起").addClass("arr-d");
        }
        function hide(){
            $info.height("67px");
            $toggleBtn.text("展开").removeClass("arr-d");
            $toggleBtn.show();
        }
    }

//TODO 提示显示&消失
    function showTips($Tips){
        $Tips.appendTo("body");
        var tw = $Tips.width(),
            th = $Tips.height(),
            winW = $(window).width(),
            winH = $(window).height(),
            scroll = $("body").scrollTop();

        $Tips.css({ left: (winW-tw-45)/2, top: (winH - th -30)/2 + scroll } );

        var tipsClear = setTimeout(function(){
            $Tips.remove();
            clearTimeout(tipsClear);
        },2000);
    }

//==========Cookie函数==========//
//获得Cookie解码后的值
    function GetCookieVal(offset){
        var endstr = document.cookie.indexOf (";", offset);
        if (endstr == -1)
            endstr = document.cookie.length;
        return unescape(document.cookie.substring(offset, endstr));
    }
//设定Cookie值-将值保存在Cookie中
    function setCookie(name, value){
        var expdate = new Date();                      //获取当前日期

        var year = expdate.getFullYear();
        var month = expdate.getMonth();
        var date = expdate.getDate() + 1;

        var argv = setCookie.arguments;                //获取cookie的参数
        var argc = setCookie.arguments.length;         //cookie的长度
        var expires = (argc > 2) ? argv[2] : null;     //cookie有效期
        var path = (argc > 3) ? argv[3] : null;        //cookie路径
        var domain = (argc > 4) ? argv[4] : null;      //cookie所在的应用程序域
        var secure = (argc > 5) ? argv[5] : false;     //cookie的加密安全设置

        if( expires == "day" ){
            expdate.setYear(year);
            expdate.setMonth(month);
            expdate.setDate(date);
            expdate.setHours(8);    //补时差
            expdate.setMinutes(0);
            expdate.setSeconds(0);
        }

        if( expires!=null && expires != "day" ){
            expdate.setTime( expdate.getTime() + ( expires * 1000 + 8 * 3600 *1000 ) ); //8小时时差
        }

        document.cookie = name + "=" + escape (value) +((expires == null) ? "" : ("; expires="+ expdate.toGMTString()))
            +((path == null) ? "" : ("; path=" + path)) +((domain == null) ? "" : ("; domain=" + domain))
            +((secure == true) ? "; secure" : "");
    }
//删除指定的Cookie
    function DelCookie(name){
        var exp = new Date();
        exp.setTime (exp.getTime() - 1);
        var cval = GetCookie (name);                                           //获取当前cookie的值
        document.cookie = name + "=" + cval + "; expires="+ exp.toGMTString(); //将日期设置为过期时间
    }
//获得Cookie的值-name用来搜索Cookie的名字
    function GetCookie(name){
        var arg = name + "=";
        var argLen= arg.length;                  //指定Cookie名的长度
        var cookieLen= document.cookie.length;   //获取cookie的长度
        var i = 0;
        while (i < cookieLen){
            var j = i + argLen;
            if (document.cookie.substring(i, j) == arg)   //依次查找对应cookie名的值
                return GetCookieVal (j);
            i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0) break;
        }
        return null;
    }

    var upNum,igNum

    (function showNum(){
        var $update = $(".sub-nav").find("em").eq(0);
        var $ignore = $(".sub-nav").find("em").eq(1);
        upNum = parseInt( $update.text() );
        igNum = parseInt( $ignore.text() );
        var upNums = upNum > 99 ? "99+" : upNum;
        var igNums = igNum > 99 ? "99+" : igNum;
        if( !upNums && !igNums ){
            upNums = 0;
            igNums = 0;
        }
        $update.text(upNums);
        $ignore.text(igNums);
    })();

    $(".canle").live("click",changeState);

    /**
     * @method changeState 忽略 / 关注更新开关函数
     */
    function changeState(){
        var $that = $(this);
        var idx = $that.attr("data-idx");
        var name = $that.attr("data-name");
        var state = $that.attr("data-state");
        var ei = $(".ei").attr("data-ei");
        var sn = $(".ei").attr("data-sn");
        var url = $(".ei").attr("data-ignore");
        var $update = $(".sub-nav").find("em").eq(0);
        var $ignore = $(".sub-nav").find("em").eq(1);

        if( $that.hasClass("connectting") ){
            return
        }

        if( ei.length == 0 || sn.length == 0 || url.length == 0 ){
            return
        }

        $that.addClass("connectting");

        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: { idx:idx, packagename:name, state:state, imei:ei, sn:sn },
            timeout: 1500,
            success: function(data){
                data = data.RESULT.toString();
                switch(data){
                case "100" :
                    navDisplay();
                    break;
                };
            },
            error: function(){
                $that.removeClass("connectting");
            }
        });

        function navDisplay(){
            var upNums = 0, igNums = 0;
            if( $update.parent().hasClass("on") ){
                upNum -= 1;
                igNum += 1;
                upNums = upNum > 99 ? "99+" : upNum;
                upNums = upNums < 0 ? "0" : upNums;
                igNums = igNum > 99 ? "99+" : igNum;
            }else if( $ignore.parent().hasClass("on") ){
                upNum += 1;
                igNum -= 1;
                upNums = upNum > 99 ? "99+" : upNum;
                igNums = igNum  > 99 ? "99+" : igNum;
                igNums = igNums < 0 ? "0" : igNums;
            }
            $update.text(upNums);
            $ignore.text(igNums);
            $that.parents("li").remove();

            var $badge = $(".sq-badge");
            var updateNum = GetCookie("updateNum") || null;
            var _listLen = $(".v-soft-list").find("li").length;

            if (_listLen === 0) {
                $("<li class='no-result'></li>").text("恭喜，您手机上没有可升级应用！").appendTo(".v-soft-list");
            }

            if ( updateNum !== null && parseInt(updateNum) >= 0 ) {
                $badge.text( upNums ).show();
                setCookie( "updateNum", upNums, "day", "default.htm" );
                if( upNums === 0 ){
                    $badge.hide();
                }
            }
        }
        if (Dev){
            navDisplay();
        }
    }

    $(".save-btn").bind("click",upSetting);

    /**
     * @method upSetting 更新提醒开关
     */
    function upSetting(){
        var upstate = $("input[type=radio]").eq(0).is(":checked") ? 0 : 1;
        var ei = $(".ei").attr("data-ei");
        var sn = $(".ei").attr("data-sn");
        var url = $(".ei").attr("data-upstate");
        var $tips = $(".tips");

        if( ei.length == 0 || sn.length == 0 || url.length == 0 ){
            return
        }

        $tips.css({ visibility:"hidden" });

        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: {upstate:upstate, imei:ei, sn:sn },
            timeout:ajaxTimeOut,
            success:function(data){
                data = data.RESULT.toString();
                switch(data){
                case "100" :
                    $tips.css({ visibility:"visible" });
                    setTimeout(function(){
                        $tips.css({ visibility:"hidden" });
                    },1000);
                    break;
                };
            }
        });
    }
	/*
	window.onresize = function(){
	    var $win = $(window);
        var winW = $win.width();
        var $touchsliderItem = $(".touchslider-item");
        if ( $touchsliderItem.length > 0) {
            $touchsliderItem.each(function(){
                $(this).css({"width":winW});
            });
        };
	};
	*/
    /**
     * @method userBrowser  针对touchSlider插件不支持Opera Mobile browser的兼容做法
     */
	(function userBrowser(){  
		var browserName=navigator.userAgent.toLowerCase(); 
		$slidetogg = $(".slidetogg");
		if(/opera/i.test(browserName) ){ 
			$slidetogg.css("display","block");  
		}else { 
			$slidetogg.css("display","none");    
		}
	})();
    /**
     * @method 重绘窗口大小，使得Slider 保证图片居中显示
     */
	$(window).resize(function(){
	    var $win = $(window);
        var winW = $win.width();
        var $touchsliderItem = $(".touchslider-item");
        if ( $touchsliderItem.length > 0) {
            $touchsliderItem.each(function(){
                $(this).css({"width":winW});
            });
        };
	});
    /**
     * @method setSlider 初始化 Slider 的宽度
     */
    (function setSlider(){
        var $win = $(window);
        var winW = $win.width();
        var $touchsliderItem = $(".touchslider-item");
        if ( $touchsliderItem.length > 0) {
            $touchsliderItem.each(function(){
                $(this).css({"width":winW});
            });
        };
    })();

    /**
     * @method getUpdate 获取应用更新数
     */
    (function getUpdate(){
        var $userInfo = $(".ei");
        var $remind = $(".remind");
        var $softNum = $remind.find("em");
        var $badge = $(".sq-badge");
        var updateNum = GetCookie("updateNum") || null;
        var clock = parseInt(GetCookie("clock")) || null;

        var ei = GetCookie("imei") || $userInfo.attr("data-ei");
        var sn = GetCookie("sn") || $userInfo.attr("data-sn");

        var api = $userInfo.attr("data-url");
        var isSupported = $(".wrapper").hasClass("supported");
        var appsInfo = "";

//    $("body").prepend("cookie_ei====>"+GetCookie("imei")+"<br/>cookie_sn======>"+GetCookie("sn")+"<br/>");
//    $("body").prepend("tag_ei====>"+$userInfo.attr("data-ei")+"<br/>tag_sn======>"+$userInfo.attr("data-sn")+"<br/>");

        if ( !isSupported ) {
            //UC浏览器版本低于8.4
//        $("body").prepend("up-2>")
        }
        if ( clock !== null ) {
            //已成功设置一次整点范围
//        $("body").prepend("up-3>")
            var now = new Date();
            if ( now.getHours() === clock && updateNum !== null && parseInt(updateNum) === 0 ) {
                return
            }
            if ( now.getHours() === clock && updateNum !== null && parseInt(updateNum) > 0 ) {
                //在整点范围内、已有今日应用更新数、更新数大于 0
//            $("body").prepend("up-4>")
                $badge.show().text( updateNum );
                return
            }
        }

        if ( ei === undefined || sn === undefined || api === undefined || ei === "" || sn === "" || api === "" ) {
            //参数缺失
//        $("body").prepend("up-1>")
            return
        }

        try{
            //通过 ucweb API 读取用户应用数据
//        $("body").prepend("up-5>")
            appsInfo = ucweb.startRequest("shell.appsInfo.all");
            if ( appsInfo.length === 0 ) {
                //未成功返回用户应用数据
//            $("body").prepend("up-6>")
            }
        }catch(e){
            //读取 ucweb API 失败
//        $("body").prepend("up-7>")
//        $.get( "../dws.test.waptw.com_3A9091/upremind/frontlog.php",{ imei: ei, sn: sn });
            $.get( ApiURL, { imei: ei, sn: sn });
        }

        if ( appsInfo.length > 0 ) {
            var content = { "uid": ei, "sn": sn, "version": "1.0", "itemcount": 0, "items": appsInfo };
//        $("body").prepend("up-8>")
            $.ajax({
                type: "POST",
                url: api,
                dataType: "json",
                data: content,
                timeout:appsTimeOut,
                success:function(data){
                    var upcount = data.items.upcount;   //应用更新数
                    var RESULT = data.RESULT;   //code 信息
//                $("body").prepend("up-9>")
                    if ( RESULT === 100 ) {
                        apiDone( upcount );
//                    $("body").prepend("up-10>")
                    }
                },
                error: function(){
                    //XHR 出错
//                $("body").prepend("up-11>")
//                $.get( "../dws.test.waptw.com_3A9091/upremind/frontlog.php",{ imei: ei, sn: sn });
                    $.get( ApiURL, { imei: ei, sn: sn });
                }
            });
        }
        // test
//    apiDone( 4 );
        //`
        function apiDone( upcount ){
            var now = new Date();
            var H = now.getHours();

            if ( upcount > 0 ){
                upcount = upcount > 99 ? "99+" : upcount;
                $badge.show().text( upcount );

                if ( updateNum === null ) {
                    $softNum.text( upcount );   //蓝色气泡
                    $remind.fadeIn( 500 ).delay( 10000 ).fadeOut( 500 );
                    //            $("body").prepend("up-12>")
                }
            }
            setCookie( "updateNum", upcount, "day", "default.htm" );
            setCookie( "clock", H, "day", "default.htm" );
        }
    })();

});