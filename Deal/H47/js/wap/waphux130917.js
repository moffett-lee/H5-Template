function G(id) {
    if (document.getElementById) { return document.getElementById(id); }
    else if (document.all) { return document.all[id]; }
    else if (document.layers) { return document.layers[id]; }
    else { return false; }
}
function GG(id) { return G(id).style; }
function getUA() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("iphone") > 0 && ua.indexOf("safari") > 0)
        return "IpSaf";
    else if (ua.indexOf("iphone") > 0 && ua.indexOf("qq") > 0)
        return "IpQq";
    else if (ua.indexOf("iphone") > 0)
        return "IpUnknow";
    else if (ua.indexOf("ipad") > 0 && ua.indexOf("safari") > 0)
        return "IdSaf";
    else if (ua.indexOf("ipad") > 0)
        return "IdUnknow";
    else if (ua.indexOf("windows") > 0 && ua.indexOf("msie 7.0") > 0)
        return "WinIe7";
    else if (ua.indexOf("windows") > 0)
        return "WinUnknow";
    else if (ua.indexOf("android") > 0 && ua.indexOf("opera") > 0)
        return "AnOpera";
    else if (ua.indexOf("ucweb") > 0 && ua.indexOf("linux") > 0)
        return "AnUC";
    else if (ua.indexOf("android") > 0 && ua.indexOf("qq") > 0)
        return "AnQQ";
    else if (ua.indexOf("android") > 0 && ua.indexOf("chrome") > 0)
        return "AnChrome";
    else if (ua.indexOf("android") > 0)
        return "AnUnknow";
    else
        return "Unknow";
}

//读取带键值的cookie
function getCookiesWithKey(key, c_name) {
    if (document.cookie.length > 0) {
        var k_start = document.cookie.indexOf(key + "=");
        if (k_start == -1)
            return "";
        k_start = k_start + key.length + 1
        var k_end = document.cookie.indexOf(";", k_start);
        if (k_end == -1) k_end = document.cookie.length;
        var cookiesWithKey = unescape(document.cookie.substring(k_start, k_end));
        if (c_name == "") return cookiesWithKey;
        var cookies = cookiesWithKey.split("&");
        for (var i = 0; i < cookies.length; i++) {
            if (cookies[i].split("=")[0] == c_name) {
                return cookies[i].split("=")[1];
            } //if
        } //for
    } //if
    return ""
}
//判断是否登陆
function IsLoginIn() {
    var uname = getCookiesWithKey("21rednet", "UserName");
    if (uname == null)
        return false;
    else if (uname == "")
        return false;
    else
        return true;
} //IsLoginIn
function dologin() {
    if (IsLoginIn() == true) {
        GG("jslogined").display = "block";
        GG("jsunlogin").display = "none";
        try {
            document.getElementById("jsuname").innerHTML = unescape(getCookiesWithKey("21rednet", "JSUserName"));
        } catch (e) { }
    }
    else {
        GG("jslogined").display = "none";
        GG("jsunlogin").display = "block";
    }
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function fromlinksite() {
    var siteid = getQueryString("siteid");
    if (siteid == null)
        return;
    var _siteurls = ["1001"];
    var _siteurlsdesc = ["waphux.baidu.browser"];
    for (i = 0; i < _siteurls.length; i++) {
        if (siteid.indexOf(_siteurls[i]) > -1)
        { document.cookie = "fromdomain=" + _siteurlsdesc[i] + ";domain=huanxia.com;path=/"; break; }
    }
}
function loginin() {
    var _url = top.location.href; _url = escape(_url); _url = "../login.sns.huanxia.com/waploginhux.aspx@url=" + _url; setTimeout("top.window.location='" + _url + "'", 0);
}
function userreg() {
    var _url = top.location.href; _url = escape(_url); _url = "../login.sns.huanxia.com/wapreghux.aspx@url=" + _url; setTimeout("top.window.location='" + _url + "'", 0);
}
function loginout() {
    var _url = top.location.href; _url = escape(_url); _url = "../login.sns.huanxia.com/comloginout.aspx@url=" + _url; setTimeout("window.location='" + _url + "'", 0);
}
function donewtips() {
    var ua = navigator.userAgent;
    var low = ua.toLowerCase();
    if (low.indexOf("baidu") > 0) {
        hiddentips();
    }
    else {
        if (low.indexOf("android") > 0) {
            GG("tip_download").display = "block";
            G("adownload").href = "download/huanxiaclient.apk";
        } else if (low.indexOf("iphone") > 0 && low.indexOf("safari") > 0) {
            GG("tip_download").display = "block";
            G("adownload").href = "../itunes.apple.com/us/app/huan-xia-xiao-shuo-cheng/id557849724@ls=1&mt=8";
        } 
    }
}

function hiddentips() {
    GG("tip_download").display = "none";
}

function checkfocus(div1, div2, div3) {

    GG(div1).display = "block";
    GG(div2).display = "none";
    GG(div3).display = "none";
}