var x = {};
x.getAbsoluteLocation = function (id) {
    var temp = document.getElementById(id);
    var curleft = curtop = 0;
    if (temp.offsetParent) {
        curleft = temp.offsetLeft;
        curtop = temp.offsetTop;
        while (temp = temp.offsetParent) {
            curleft += temp.offsetLeft;
            curtop += temp.offsetTop;
        }
    }
    return { left: curleft, top: curtop };
};
// Functions to create xmlhttpRequest
function createStandardXHR() {
    try {
        return new window.XMLHttpRequest();
    } catch (e) { }
}
function createActiveXHR() {
    try {
        return new window.ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) { }
}
x.createHttpRequest = window.ActiveXObject ? function () { return !this.isLocal && createStandardXHR() || createActiveXHR(); } : createStandardXHR;
x.WebRequest = function (config) {
    var thisObj = this;
    var method = config.method == "get" ? "GET" : "POST";
    var url = config.url;
    var xhr = new x.createHttpRequest();
    xhr.onreadystatechange = callback;
    xhr.open(method, url);
    if (method == "POST") {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    }
    this.send = function (postData) {
        try {
            xhr.send(postData);
        }
        catch (e) {
            if (thisObj.onException) {
                thisObj.onException(e);
            }
        }
    };
    function callback() {

        if (xhr.readyState != 4) {
            return;
        }

        if (xhr.status == 200) {
            if (thisObj.onSuccess) {
                thisObj.onSuccess(xhr.responseText, xhr.responseXML);
            }
        }
        else {
            if (thisObj.onFailure && (xhr.status.toString().indexOf("4") == 0 || xhr.status.toString().indexOf("5") == 0)) {
                thisObj.onFailure(xhr.status);
            }
        }
    }
};