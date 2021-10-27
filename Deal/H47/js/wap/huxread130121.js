function $(id){
  if(document.getElementById) { return document.getElementById(id); }
  else { return false; }
}
function $$(id){
    try{
        return $(id).style;
    }catch(e){}
}
//获取cookie，合适 名=值类型的
function getCookie(key){
	if (document.cookie.length>0){
        var k_start = document.cookie.indexOf(key + "=");
        if(k_start == -1)
            return "";
        k_start = k_start + key.length+1 
        var k_end = document.cookie.indexOf(";",k_start);
        if(k_end == -1) k_end = document.cookie.length;
        return unescape(document.cookie.substring(k_start,k_end));
    }//if
    return ""
}

//写cookies
function SetCookie(n,v){
    var Then = new Date(2015,1,1); 
    document.cookie = n+"="+v+";expires="+ Then.toGMTString()+";domain=huanxia.com;path=/";
}//setCookie
function fsi(i)
{
    var o =$$("htmlContent");
    var s=16;
    if(o.fontSize!="")
        s=o.fontSize.replace("px","");
    if(s<12)s=12;
    else if(s>36)s=36;
    s=eval(s)+i;
    prisetSize(s);
    SetCookie("wapfsize",s)
}
function AutoStyle()
{
    var s=getCookie("wapfsize");
    prisetSize(s);
    s=getCookie("wapnight");
    prinight(s);
    $("jsbt").onclick=function(){prinight(0);}
    $("jshy").onclick=function(){prinight(1);}
    var o=$("htmlContent");
    o.ontouchstart=function(){touchstart()};
    o.ontouchend=function(){touchend()};
    o.ontouchmove=function(){touchmove()};
    o.oncopy=function(e){return   false;}//屏蔽复制
    o.oncut=function(e){return   false;}//屏蔽剪切
    o.onselectstart=function(e){return   false;}//屏蔽选择
    setReadHistory();
}
function prisetSize(s)
{
    if(s=="")return;
    var o =$$("htmlContent");
    o.fontSize=eval(s) + "px";
    o.lineHeight=eval(s*1.5) + "px";
    $("jszihao").innerHTML=o.fontSize;
}
function prinight(i)
{
    document.body.className=(i==1)?"night":"";
    $("jsbt").className=(i==0)?"cur1":"";
    $("jshy").className=(i==0)?"":"cur2";
    SetCookie("wapnight",i)
}
function Ajax(){
  var obj;
  try { obj = new XMLHttpRequest(); }
  catch(e) {
    var AjList = ["MSXML2.XMLHTTP","MSXML.XMLHTTP","Microsoft.XMLHTTP"];
    for(var i=0;i < AjList.length;i++) {
      try {
        obj = new ActiveXObject(AjList[i]);
        break;
      } catch(e) { }
    }
  }
  return obj;
}
function autoload()
{
try{
    var url=$("htmlxiazhang").href;
    if(url!="")
    {
        var xmlhttp = Ajax();
        xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4) 
        { 
            xmlhttp.responseText;
        }
        }//function
        xmlhttp.open("GET",url,true);
        xmlhttp.setRequestHeader("Content-type", "text/html;charset=utf-8");
        xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xmlhttp.send(null);
    }
}catch(e){}
}
//手指翻页start
var touchStartX=0;
var touchStartY=0;
var touchHref=0;
function getX(){return event.targetTouches[0].pageX}
function touchmove()
{
    if(getX()>(touchStartX+(screen.width/2)))
		touchHref=-1;
	else if(getX()<touchStartX-(screen.width/2))
        touchHref=1;
    else
        touchHref=0;
}
function touchstart()
{
    touchStartX = getX();
	touchStartY = document.body.scrollTop;
}
function touchend()
{
    var d = Math.abs(touchStartY-document.body.scrollTop);
    if(d<50)
    {
        if(touchHref==1)
            window.location.href=$("htmlxiazhangT").href;
        else if(touchHref==-1)
            window.location.href=$("htmlshangzhangT").href;
    }
}

///////////手机浏览器
function getOS()
{
	var ua = navigator.userAgent.toLowerCase();
	if(ua.indexOf("iphone")>0)
		return "iphone";
	else if(ua.indexOf("ipad")>0)
		return "ipad";
	else if(ua.indexOf("windows")>0)
		return "win";
	else if(ua.indexOf("android")>0)
		return "android";
	else
		return "unknow";
}


//最近阅读start
function setReadHistory()
{
	var _json = getReadHistory();
	if(_json==null)
	{
		SetCookie("ReadHistory","["+getHistoryStr(bookinfo.aid,bookinfo.bookname,bookinfo.bid,bookinfo.title)+"]");
		return;
	}
	var _has = false;
	for(i=0;i<_json.length;i++)
	{
		if(_json[i].aid==bookinfo.aid)
			_has=true;
	}//for
	var _jstr="[";
	if(_has==true) //已存在
	{
		for(i=0;i<_json.length;i++)
		{
			if(_json[i].aid==bookinfo.aid)
				_jstr += getHistoryStr(bookinfo.aid,bookinfo.bookname,bookinfo.bid,bookinfo.title);
			else
				_jstr += getHistoryStr(_json[i].aid,_json[i].name,_json[i].bid,_json[i].title);
			if(i<(_json.length-1))
				_jstr+=",";
		}//for
	}
	else
	{
		var _start=0;
		if(_json.length==6)
			_start=1;
		for(i=_start;i<_json.length;i++)//把现有的遍历完
		{
			_jstr += getHistoryStr(_json[i].aid,_json[i].name,_json[i].bid,_json[i].title);
			_jstr += ",";
		}//for
		_jstr += getHistoryStr(bookinfo.aid,bookinfo.bookname,bookinfo.bid,bookinfo.title);
	}//if
	_jstr+="]";
	SetCookie("ReadHistory",_jstr);
}//setReadHistory

function getHistoryStr(aid,bookname,bid,title)
{
	return "{\"aid\":"+aid+",\"name\":\""+escape(bookname)+"\",\"bid\":"+bid+",\"title\":\""+escape(title)+"\"}";
}
function getReadHistory()
{
	var _history = getCookie("ReadHistory");//getCookiesWithKey("ReadHistory","");
	if(_history=="")
		return null;
	_history=unescape(_history);
	return eval(_history);
}
//最近阅读end
document.oncopy=function(e){return   false;}//屏蔽复制
document.oncut=function(e){return   false;}//屏蔽剪切
document.onselectstart=function(e){return   false;}//屏蔽选择
