function isDiv(n) {
    var i = $("#list_" + n).next(),
    t;
    return i.length > 0 ? (t = i.get(0), t.nodeName.toLowerCase() == "div" ? t.id : !1) : !1
}

function addSlider(n) {
    var r = $("#slide_" + n),
    i = r.find(".slides_control"),
    t;
    i.vcycle({
        timeout: 0,
        next: ".vNext",
        prev: ".vPrev",
        after: function (n, t) {
            t = t = $(t).find("img").get(0);
            var u = t.getAttribute("data-number"),
            r = t.getAttribute("src");
            r.indexOf("load.gif") > -1 && (t.onload = function () {
                t.style.display = "none",
                t.style.display = "block"
            },
            t.setAttribute("src", t.getAttribute("data-original")))
        }
    }),
    i.children().length == 1 && (t = i.find("img"), t.attr("src").indexOf("load.gif") > -1 && typeof t.data("original") != "undefined" && t.attr("src", t.data("original")))
}
function ProductPicSlide() {
    var n = $(".product_slide");
    n.find(".slides_control").vcycle({
        timeout: 0,
        next: "vNext",
        prev: "vPrev",
        after: function (n, t) {
            var u = t.getAttribute("data-number"),
            r = t.getAttribute("src");
            r.indexOf("load.gif") > -1 && t.setAttribute("src", t.getAttribute("data-original"))
        }
    })
}
function showSize(n, t) {
    $("#productsizes>.current").removeClass("current"),
    $("#size_" + n).addClass("current"),
    $("#clotheCode" + t).val(n)
}
function buycount(n, t) {
    var r = $("#buycount" + n),
    i = parseInt(r.val(), 10);
    if (t == "+") {
        if (i >= 999) return;
        r.val(++i)
    } else t == "-" && i > 1 ? r.val(--i) : !isNaN(t) && $.trim(t) != "" && parseInt(t, 10) > 0 && parseInt(t, 10) <= 999 ? r.val(t) : r.val(1);
    i <= 1 ? visibleBtn("reduction_n.png", "plus.png") : i >= 999 ? visibleBtn("reduction.png", "plus_n.png") : visibleBtn("reduction.png", "plus.png")
}
function visibleBtn(n, t) {
    $(".reduction_n").css("background-image", "url(images/" + n + ")"),
    $(".plus").css("background-image", "url(images/" + t + ")")
}
function showBig(n) {
    var u, r, o, e;
    showBigCode = n,
    u = $(".picture"),
    u.length == 0 ? ($("body").append(BigImg()), $(".picture").bind("touchmove",
    function (n) {
        n.preventDefault()
    })) : u.show(0);
    var f = getBigImg(),
    s = $(window),
    h = s.height() - 100,
    t = s.width(),
    i = [];
    for (t = h > t ? t : h, i.push('<ul id="i' + Math.random() + '" style="width:' + t * f.length + 'px">'), r = 0, o = f.length; r < o; r++) e = f[r],
    i.push('<li style="width:' + t + 'px;text-align:center">'),
    i.push('<img src="' + e.src + '"   data-index="' + r + '" data-number="' + (r + 1) + '"  style="height:' + t + 'px;width:' + t + 'px;"/>'),
    i.push("</li>");
    i.push("</ul>"),
    $(".picture_con").html(i.join("")),
    setWidth()
}
function getBigImg() {
    var t, u;
    if (typeof showBigImgs["bigImg_" + showBigCode] == "undefined") {
        var e = $("#slide_" + showBigCode).find("img"),
        f = e.length > 0 ? e : $("#slideProductPic").find("img"),
        s = $(window),
        o = s.height() - 100,
        n = s.width(),
        r = [];
        for (n = o > n ? n : o, t = 0, u = f.length; t < u; t++) {
            var i = $(f[t]),
            c = i.attr("data-original") || i.attr("src"),
            h = c.replace(/\/\d{3}\//, "/" + n + "/");
            r.push({
                src: "http//image.jianke.com/mobile/images/load.gif",
                original: h
            })
        }
        showBigImgs["bigImg_" + showBigCode] = r
    }
    return showBigImgs["bigImg_" + showBigCode]
}
function setWidth() {
    var i = $(window),
    t = i.height() - 100,
    n = i.width(),
    u = $(".picture_con").find("ul"),
    r;
    n = t > n ? n : t,
    r = {
        width: n + "px",
        height: t + "px"
    },
    u.css({
        width: n + "px",
        height: n + "px"
    }),
    $(".picture_con").css(r),
    $(".picture").css({
        height: t + 80 + 100 + "px",
        width: i.width() + "px"
    }),
    BigSlider()
}
function BigImg() {
    var t = $(window),
    i = t.height(),
    r = t.width(),
    n = [];
    return n.push('<div class="picture" style=" height:' + (i + 50) + 'px">'),
    n.push('<div class="picture_top"><a href="javascript:void(0)"  onclick="closeBig()"></a></div>'),
    n.push('<div class="picture_con">'),
    n.push("</div>"),
    n.push('<span class="serial"></span>'),
    n.push("</div>"),
    n.join("")
}
function BigSlider() {
    var r = $(".serial"),
    n = $(".picture_con").find("ul"),
    t,
    i;
    if (n.children().length == 1) {
        t = n.find("img"),
        t.attr("src").indexOf("load.gif") > -1 && t.hide(0).attr("src", showBigImgs["bigImg_" + showBigCode][0].original).show(0),
        r.html("1 / 1");
        return
    }
    i = n.css("position"),
    i == "absolute" && (n = ReSlider()),
    n.vcycle({
        timeout: 0,
        after: function (n, t, i) {
            var u = $(t).find("img"),
            e = u.attr("data-number"),
            f;
            src = u.attr("src"),
            src.indexOf("load.gif") > -1 && (f = 200, setTimeout(function () {
                var t = showBigImgs["bigImg_" + showBigCode][e - 1],
                n = t.original;
                typeof n != "undefined" && (t.src = n, u.bind("load",
                function () {
                    u.hide(0),
                    u.show(0),
                    delete t.original
                }).attr("src", n))
            },
            f)),
            r.html(e + " / " + i.slideCount)
        }
    },
    !0),
    n.css("position", "absolute")
}
function ReSlider() {
    var n = $(".picture_con").find("ul"),
    t = imgs(n);
    return $(".picture_con").html('<ul id="i' + Math.random() + '" style="width:' + n.width() + "px;height:" + n.height() + 'px;">' + t + "</ul>"),
    n.remove(),
    $(".picture_con").find("ul")
}
function imgs(n) {
    for (var s = n.find("img"), l = $(".serial").html(), o = parseInt(n.find("img:visible").attr("data-index")), r = [], c = $(window), h = c.height() - 100, i = c.width(), u = 0, i = h > i ? i : h, u = 0, f = function (n) {
        var t = s.eq(n),
        e = t.attr("src"),
        f = t.attr("data-number");
        r.push("<li  style='width:" + i + "px;height:" + i + "px;text-align:center'>"),
        r.push("<img  src='" + e + "' style='height:" + i + "px' data-index='" + u + "' data-number='" + f + "' />"),
        r.push("</li>"),
        u++
    },
    t = o, e = s.length; t < e; t++) f(t);
    for (t = 0; t < o; t++) f(t);
    return r.join("")
}
function closeBig() {
    $(".picture").hide()
}
var showBigCode = 0,
showBigImgs = {};
window.onresize = function () {
    $(".picture:visible").length > 0 && setWidth()
},
function (n) {
    function o(t, r, u, e) {
        var o = {
            data: e || (r ? r.data : {}),
            _wrap: r ? r._wrap : null,
            tmpl: null,
            parent: r || null,
            nodes: [],
            calls: tt,
            nest: d,
            wrap: nt,
            html: g,
            update: rt
        };
        return t && n.extend(o, t, {
            nodes: [],
            parent: r
        }),
        u && (o.tmpl = u, o._ctnt = o._ctnt || o.tmpl(n, o), o.key = ++f, (a.length ? s : i)[f] = o),
        o
    }
    function e(t, i, r) {
        var f, o = r ? n.map(r,
        function (n) {
            return typeof n == "string" ? t.key ? n.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + u + '="' + t.key + '" $2') : n : e(n, t, n._ctnt)
        }) : t;
        return i ? o : (o = o.join(""), o.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,
        function (t, i, r, u) {
            f = n(r).get(),
            v(f),
            i && (f = l(i).concat(f)),
            u && (f = f.concat(l(u)))
        }), f ? f : l(o))
    }
    function l(t) {
        var i = document.createElement("div");
        return i.innerHTML = t,
        n.makeArray(i.childNodes)
    }
    function y(t) {
        return new Function("jQuery", "$item", "var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('" + n.trim(t).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
        function (t, i, r, u, f, e, o) {
            var l = n.tmpl.tag[r],
            a,
            s,
            h;
            if (!l) throw "Template command not found: " + r;
            return a = l._default || [],
            e && !/\w$/.test(f) && (f += e, e = ""),
            f ? (f = c(f), o = o ? "," + c(o) + ")" : e ? ")" : "", s = e ? f.indexOf(".") > -1 ? f + e : "(" + f + ").call($item" + o : f, h = e ? s : "(typeof(" + f + ")==='function'?(" + f + ").call($item):(" + f + "))") : h = s = a.$1 || "null",
            u = c(u),
            "');" + l[i ? "close" : "open"].split("$notnull_1").join(f ? "typeof(" + f + ")!=='undefined' && (" + f + ")!=null" : "true").split("$1a").join(h).split("$1").join(s).split("$2").join(u ? u.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g,
            function (n, t, i, r) {
                return r = r ? "," + r + ")" : i ? ")" : "",
                r ? "(" + t + ").call($item" + r : n
            }) : a.$2 || "") + "_.push('"
        }) + "');}return _;")
    }
    function p(t, i) {
        t._wrap = e(t, !0, n.isArray(i) ? i : [w.test(i) ? i : n(i).html()]).join("")
    }
    function c(n) {
        return n ? n.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
    }
    function it(n) {
        var t = document.createElement("div");
        return t.appendChild(n.cloneNode(!0)),
        t.innerHTML
    }
    function v(t) {
        function a(t) {
            function a(n) {
                n = n + y,
                e = p[n] = p[n] || o(e, i[e.parent.key + y] || e.parent, null, !0)
            }
            var v, h = t,
            c, e, l;
            if (l = t.getAttribute(u)) {
                while (h.parentNode && (h = h.parentNode).nodeType === 1 && !(v = h.getAttribute(u)));
                v !== l && (h = h.parentNode ? h.nodeType === 11 ? 0 : h.getAttribute(u) || 0 : 0, (e = i[l]) || (e = s[l], e = o(e, i[h] || s[h], null, !0), e.key = ++f, i[f] = e), r && a(l)),
                t.removeAttribute(u)
            } else r && (e = n.data(t, "tmplItem")) && (a(e.key), i[e.key] = e, h = n.data(t.parentNode, "tmplItem"), h = h ? h.key : 0);
            if (e) {
                for (c = e; c && c.key != h;) c.nodes.push(t),
                c = c.parent;
                delete e._ctnt,
                delete e._wrap,
                n.data(t, "tmplItem", e)
            }
        }
        for (var y = "_" + r,
        c, l, p = {},
        e, h = 0,
        v = t.length; h < v; h++) if ((c = t[h]).nodeType === 1) {
            for (l = c.getElementsByTagName("*"), e = l.length - 1; e >= 0; e--) a(l[e]);
            a(c)
        }
    }
    function tt(n, t, i, r) {
        if (!n) return a.pop();
        a.push({
            _: n,
            tmpl: t,
            item: this,
            data: i,
            options: r
        })
    }
    function d(t, i, r) {
        return n.tmpl(n.template(t), i, r, this)
    }
    function nt(t, i) {
        var r = t.options || {};
        return r.wrapped = i,
        n.tmpl(n.template(t.tmpl), t.data, r, t.item)
    }
    function g(t, i) {
        var r = this._wrap;
        return n.map(n(n.isArray(r) ? r.join("") : r).filter(t || "*"),
        function (n) {
            return i ? n.innerText || n.textContent : n.outerHTML || it(n)
        })
    }
    function rt() {
        var t = this.nodes;
        n.tmpl(null, null, null, this).insertBefore(t[0]),
        n(t).remove()
    }
    var k = n.fn.domManip,
    u = "_tmplitem",
    w = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
    i = {},
    s = {},
    h, b = {
        key: 0,
        data: {}
    },
    f = 0,
    r = 0,
    a = [];
    n.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    },
    function (t, u) {
        n.fn[t] = function (f) {
            var o = [],
            s = n(f),
            l,
            e,
            a,
            v,
            c = this.length === 1 && this[0].parentNode;
            if (h = i || {},
            c && c.nodeType === 11 && c.childNodes.length === 1 && s.length === 1) s[u](this[0]),
            o = this;
            else {
                for (e = 0, a = s.length; e < a; e++) r = e,
                l = (e > 0 ? this.clone(!0) : this).get(),
                n.fn[u].apply(n(s[e]), l),
                o = o.concat(l);
                r = 0,
                o = this.pushStack(o, t, s.selector)
            }
            return v = h,
            h = null,
            n.tmpl.complete(v),
            o
        }
    }),
    n.fn.extend({
        tmpl: function (t, i, r) {
            return n.tmpl(this[0], t, i, r)
        },
        tmplItem: function () {
            return n.tmplItem(this[0])
        },
        template: function (t) {
            return n.template(t, this[0])
        },
        domManip: function (t, u, f) {
            if (t[0] && t[0].nodeType) {
                for (var o = n.makeArray(arguments), l = t.length, c = 0, s; c < l && !(s = n.data(t[c++], "tmplItem")) ;);
                l > 1 && (o[0] = [n.makeArray(t)]),
                s && r && (o[2] = function (t) {
                    n.tmpl.afterManip(this, t, f)
                }),
                k.apply(this, o)
            } else k.apply(this, arguments);
            return r = 0,
            h || n.tmpl.complete(i),
            this
        }
    }),
    n.extend({
        tmpl: function (t, r, u, f) {
            var h, c = !f;
            if (c) f = b,
            t = n.template[t] || n.template(null, t),
            s = {};
            else if (!t) return t = f.tmpl,
            i[f.key] = f,
            f.nodes = [],
            f.wrapped && p(f, f.wrapped),
            n(e(f, null, f.tmpl(n, f)));
            return t ? (typeof r == "function" && (r = r.call(f || {})), u && u.wrapped && p(u, u.wrapped), h = n.isArray(r) ? n.map(r,
            function (n) {
                return n ? o(u, f, t, n) : null
            }) : [o(u, f, t, r)], c ? n(e(f, null, h)) : h) : []
        },
        tmplItem: function (t) {
            var i;
            for (t instanceof n && (t = t[0]) ; t && t.nodeType === 1 && !(i = n.data(t, "tmplItem")) && (t = t.parentNode) ;);
            return i || b
        },
        template: function (t, i) {
            return i ? (typeof i == "string" ? i = y(i) : i instanceof n && (i = i[0] || {}), i.nodeType && (i = n.data(i, "tmpl") || n.data(i, "tmpl", y(i.innerHTML))), typeof t == "string" ? n.template[t] = i : i) : t ? typeof t != "string" ? n.template(null, t) : n.template[t] || n.template(null, w.test(t) ? t : n(t)) : null
        },
        encode: function (n) {
            return ("" + n).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
        }
    }),
    n.extend(n.tmpl, {
        tag: {
            tmpl: {
                _default: {
                    $2: "null"
                },
                open: "if($notnull_1){_=_.concat($item.nest($1,$2));}"
            },
            wrap: {
                _default: {
                    $2: "null"
                },
                open: "$item.calls(_,$1,$2);_=[];",
                close: "call=$item.calls();_=call._.concat($item.wrap(call,_));"
            },
            each: {
                _default: {
                    $2: "$index, $value"
                },
                open: "if($notnull_1){$.each($1a,function($2){with(this){",
                close: "}});}"
            },
            "if": {
                open: "if(($notnull_1) && $1a){",
                close: "}"
            },
            "else": {
                _default: {
                    $1: "true"
                },
                open: "}else if(($notnull_1) && $1a){"
            },
            html: {
                open: "if($notnull_1){_.push($1a);}"
            },
            "=": {
                _default: {
                    $1: "$data"
                },
                open: "if($notnull_1){_.push($.encode($1a));}"
            },
            "!": {
                open: ""
            }
        },
        complete: function () {
            i = {}
        },
        afterManip: function (t, i, u) {
            var f = i.nodeType === 11 ? n.makeArray(i.childNodes) : i.nodeType === 1 ? [i] : [];
            u.call(t, i),
            v(f),
            r++
        }
    })
}(jQuery);