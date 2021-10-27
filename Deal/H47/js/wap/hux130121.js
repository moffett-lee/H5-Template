var pageurl=getUrl();
function getUrl()
{
    var pageurl=window.location.href;
    var reg=new RegExp("/iphone/([0-9]+)/index([0-9]*).html","g");
    if(reg.test(pageurl)==true){
	    pageurl=pageurl.replace(reg,"../../iphone/$1/index{n}.html");
	    return pageurl;
    }
    if(pageurl.indexOf("page=")>0)
    {
        reg=new RegExp("page=([0-9]+)","g");
        pageurl=pageurl.replace(reg,"page={n}");
    }
    else
        pageurl+=(pageurl.indexOf("?")>0)?"&page={n}":"@page={n}";
    return pageurl;
}

function $(id){return document.getElementById(id);}
function ShowMsg(t)
{
    $("jsmsgT").innerHTML = t;
    $("jsmsg").style.display="block";
    setTimeout("$('jsmsg').style.display='none'",2000);
}
function gofrist(){
if(pageindex==1)
    ShowMsg("已是第一页");
else
    window.location.href=pageurl.replace("{n}","1");}
function goend(){
if(pageindex>=pagecount)
    ShowMsg("已是最后一页");
else
    window.location.href=pageurl.replace("{n}",pagecount);
}
function gopage(i)
{
    var _mypage=0;
    if(i<0)
    {
        if(pageindex==1)
            ShowMsg("已是第一页");
        else if((pageindex+i)<0)
            _mypage=1;
        else
            _mypage=(pageindex+i);
    }
    else
    {
        if(pageindex>=pagecount)
            ShowMsg("已是最后一页");
        else if((pageindex+i)<0)
            _mypage=pagecount;
        else
            _mypage=(pageindex+i);
    }
    if(_mypage>0)
        window.location.href=window.location.href=pageurl.replace("{n}",_mypage);
}
function toppxpage(v)
{
    var u=window.location.href;
    var reg=new RegExp("/([0-9]+)([\_]{0,1})([0-9]*)/index.html","g");
    if(reg.test(u)==true)
        u=u.replace(reg,"../../"+v+"$2$3/index.html");
    reg=new RegExp("px=([0-9]+)","g");
    if(reg.test(u)==true)
        u=u.replace(reg,"px="+v);
    window.location.href=u;
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
function getContent()
{
    try{
        var xmlhttp = Ajax();
        xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4) 
        { 
            $("jsjj").innerHTML = xmlhttp.responseText;
        }
        }//function
        xmlhttp.open("GET","ajaxcontent.html",true);
        xmlhttp.setRequestHeader("Content-type", "text/html;charset=utf-8");
        xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xmlhttp.send(null);
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
function getHis(aid)
{
	var _history = getCookie("ReadHistory");
	if(_history=="")
		return null;
	_history=unescape(_history);
	var o = eval(_history);
	for(i=0;i<o.length;i++)
	{
		if(o[i].aid==aid)
		{
			$("jshis").innerHTML = "上次读到：<a href='../"+aid+"/"+o[i].bid+".html'>"+o[i].title+"</a>";
			return;
		}//if
	}//for
	$("jshis").style.display="none";
}
//页面底部要执行的操作
function bottomfun()
{
    if($("jsplform")!=null)
    {
        $("jsplform").style.display="block";
        if(getCookie("21rednet")=="")
        {
            $("jsbtm").value="请登录后发表评论";
            $("jsbtm").onclick=function()
            {
                window.location.href="../../../login.sns.huanxia.com/waploginhux.aspx@url="+encodeURI(window.location.href);
            }
        }
        else
        {
            $("jsbtm").onclick=function()
            {
                if($("htmlCmtContent").value=="")
                    alert("亲，请输入评论内容");
                else
                    $("plform").submit();
            }
        }//if
    }//if
    
}
