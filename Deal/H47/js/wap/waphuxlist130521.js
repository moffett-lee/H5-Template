function $(id){return document.getElementById(id);}
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

function getUrl()
{
    var pageurl=window.location.href;
    var reg=new RegExp("([0-9]+)_([0-9]+)_([0-9]+).html","g");
    if(reg.test(pageurl)==true){
	    pageurl=pageurl.replace(reg,"$1_$2_{n}.html");
	    return pageurl;
    }
    reg=new RegExp("([0-9]+)_([0-9]+).html","g");
    if(reg.test(pageurl)==true){
        pageurl=pageurl.replace(reg,"$1_{n}.html");
        return pageurl;
    }
    reg=new RegExp("([0-9]+).html","g");
    if(reg.test(pageurl)==true){
        pageurl=pageurl.replace(reg,"$1_{n}.html");
        return pageurl;
    }
    
    reg=new RegExp("([list|top|qb]{1}).html","g");
    if(reg.test(pageurl)==true){
        pageurl=pageurl.replace(reg,"$1{0}_{n}.html");
        pageurl=pageurl.replace("{0}","0");
        return pageurl;
    }
    
    reg=new RegExp("/([0-9]+)/index.html","g");
    if(reg.test(pageurl)==true){
        pageurl=pageurl.replace(reg,"../$1_{n}/index.html");
        return pageurl;
    }
    reg=new RegExp("/([0-9]+)_([0-9]+)/index.html","g");
    if(reg.test(pageurl)==true){
        pageurl=pageurl.replace(reg,"../$1_{n}/index.html");
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

function loadmore(url)
{
    pageindex = pageindex+1;
    url = getUrl();
    url = url.replace(".aspx","_ajax.aspx");
    url = url.replace(".html","_ajax.html");
    url = url.replace("{n}",pageindex);
    var xmlhttp = Ajax();
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4) { 
        var getText = xmlhttp.responseText;
        $('ulist').innerHTML += getText;
        $("jsload").innerHTML="加载更多";
        }
        else
        {
            $("jsload").innerHTML="加载中...";
        }
  }//function
  xmlhttp.open("GET",url,true);
  xmlhttp.setRequestHeader("Content-type", "text/html;charset=utf-8");
  xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  xmlhttp.send(null);
}
function toppxpage(v)
{
    var u=window.location.href;
    u=u.replace("#","");
    var reg=new RegExp("/top([0-9]+).html","g");
    if(reg.test(u)==true)
        u=u.replace(reg,"../top"+v+".html");
    reg=new RegExp("px=([0-9]+)","g");
    if(reg.test(u)==true)
        u=u.replace(reg,"px="+v);

    window.location.href=u;
}
