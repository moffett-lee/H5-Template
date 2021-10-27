/*
ʹ�÷���:
 $('#smallLay').popdiv(
{
    closeobj: "#pop_til_close",//�رղ�����
    isbodybg: true,//�Ƿ���������
    isclose: true,//�Ƿ��Զ��رյ�����
    closetime: 4000,//�Զ��رյ�������ʱ������
    isfade:true//�Ƿ�ʹ�ùر���Ч
});  
*/
(function ($) {
    var methods = {
        bingId:"bodybg",
        init: function ($this,isbodybg) {
            if (isbodybg) {
                var new_bodybg = $("<div>");
                new_bodybg.attr({ id: methods.bingId, style: "width:100%;position:absolute;top:0px;left:0px;z-index: 999999998;background:#000;filter:progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=60);opacity:0.6;height:" + $(document).height() + "px" });
                $("body").append(new_bodybg);
            };
            $this.css({
                "position": !($.browser.msie && $.browser.version == '6.0') ? "fixed" : "absolute",
                "z-index": 999999999
            }).show();
            $(window).resize(function () {
                methods.changeSize($this);
            });
            if (($.browser.msie && $.browser.version == '6.0')) {
                window.onscroll = function () {
                    if ($this.css("display") == "block" && $($this)[0])
                        methods.changeSize($this);
                }
            };
        },
        divClose: function ($this, opts)
        {
            $(window).unbind("resize");
            var bingDiv = $("#" + methods.bingId);
            if (opts != undefined && opts.isfade) {
                if (bingDiv[0]) {
                    bingDiv.fadeOut("fast", function () {
                        $(this).remove();
                    });
                    $this.fadeOut();
                }
            }
            else {
                if (bingDiv[0]) {
                    bingDiv.remove();
                }
                $this.hide();
            }
        },
        changeSize: function ($this)
        {
            if (!($.browser.msie && $.browser.version == '6.0')) {
                $this.css({
                    "top": (($(window).height() - $this.height()) / 2) + "px",
                    "left": (($(window).width() - $this.width()) / 2) + "px"
                });
            }
            else {
                $this.css({
                    "top": ((document.documentElement.clientHeight - $this.height()) / 2 + $(document).scrollTop()) + "px",
                    "left": ((document.documentElement.clientWidth - $this.width()) / 2) + "px"
                });
            }
            if ($("#" + methods.bingId)[0]) {
                $("#" + methods.bingId).css({ width: "100%", height: $(document).height() });
            }
        }
    };
    $.fn.popdiv = function (options) {
        var defaults = {
            closeobj: '',
            isbodybg: true,
            isclose: false,
            closetime: 4000,
            isfade: false
        };
        var opts = $.extend(defaults, options);
        var $this = $(this);
        methods.init($this, opts.isbodybg);
        methods.changeSize($this);
        $(opts.closeobj).bind('click', function () {
            methods.divClose($this, opts);
        });
        if (opts.isclose) {
            var showtime;
            $this.hover(
            function () {
                clearTimeout(showtime);
            },
            function () {
                showtime = setTimeout(function () {
                    methods.divClose($this, opts);
                }, opts.closetime / 2);
            }
            );
            showtime = setTimeout(function () {
                methods.divClose($this, opts);
            }, opts.closetime);
        };
    };
    $.fn.closediv = function () {
        var $this = $(this);
        methods.divClose($this);
    }
    $.fn.changeSize = function () {
        var $this = $(this);
        methods.changeSize($this);
    }
})(jQuery)  
