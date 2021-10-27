if($('optionsb')!=null){
	addEvent('optionsb','click',function(){
		boxToggle(this,'option_menu')
	});
}
if($('share_btn')!=null){
	addEvent('share_btn','click',function(){
		shareToggle('share_box','share_btn')
	});
}
if($('imgType')!=null){
	addEvent('imgType','click',function(){
		isPhoto(this)
	});
}
if($('like')!=null){
	addEvent('like','click',function(){
		var btn_style = this.getAttribute('class')
			,btn_style2 = $('no_like').getAttribute('class')
			,url = '../action_article_click';
		if(btn_style == 'action' || btn_style2 == 'action'){
			msgPoint('您已标记')
		}else{
			mPostData(this,url)
		}
	});
	addEvent('no_like','click',function(){
		var btn_style = this.getAttribute('class')
			,btn_style2 = $('like').getAttribute('class')
			,url = '../action_article_click';
		if(btn_style == 'action' || btn_style2 == 'action'){
			msgPoint('您已标记')
		}else{
			mPostData(this,url)
		}
	});
}
if($('favorite')!=null){
	addEvent('favorite','click',function(){
		var btn_style = this.getAttribute('class')
			,url = '../add_favorite';
		if(btn_style == 'action'){
			msgPoint('您已收藏')
		}else{
			mPostData(this,url)
		}
	});
}
if($('go_top')!=null){
	addEvent('go_top','click',function(){
		window.scrollTo(0,0);
	});
}
function mPostData(t,u){
	var aid = t.getAttribute('aid')
		,cid = (t.getAttribute('cid') == null) ? '' : t.getAttribute('cid')
		,stat = (t.getAttribute('stat') == null) ? '' : t.getAttribute('stat')
		,btn_style = (t.getAttribute('class') == null) ? '' : t.getAttribute('class')
		,url = !isUndefined(u) ? u : '../action_article_click'
		,data = '&aid='+aid+'&stat='+stat+'&cid='+cid
		,random = parseInt(Math.random()*10000),u = url + '@random=' + random,d = data;
	if(btn_style == 'action'){
		msgPoint('您已标记')
	}else{
		aj.post(u,{hxmdata:d},function(data){
			var data = eval('('+data+')');
			if(data.is_success=='1'){
				//成功
				t.className='action';
				msgPoint(data.hx_info)
				if(cid!==''){
					var mk = '',v;
					stat=='1' ? mk = 'up_' : mk = 'down_';
					$(mk+cid).innerText = parseInt($(mk+cid).innerText)+1;
				}
			}else{
				//失败
				msgPoint(data.hx_info)
			}
		})
	}
}
function msgPoint(msg){
	var box = $('msg_point'),time='2000';
	if(box.style.display!='block'){
		box.innerHTML = msg;
		box.style.display = 'block';
		setTimeout(function(){box.style.display = 'none'},time)
	}
}

function boxToggle(t,id){
	var boxId = $(id);
	if(boxId.style.opacity == '0' || boxId.style.height ==''){
		boxId.style.display = 'block';
		boxId.style.height = 'auto';
		boxId.style.opacity = '1';
		boxId.style.top = '0';
		t.className = 'active';
	}else {
		boxId.style.opacity = '0';
		boxId.style.top = '-20px';
		boxId.style.height = '0';
		boxId.style.display = 'none';
		t.className = '';
	}
}
function shareToggle(id,t){
	var boxId = $(id),tId=$(t);
	if(boxId.style.opacity == '0' || boxId.style.height ==''){
		tId.className = 'action';
		boxId.style.height = 'auto';
		boxId.style.width = 'auto';
		boxId.style.opacity = '1';
	}else {
		tId.className = '';
		boxId.style.height = '0';
		boxId.style.width = '0';
		boxId.style.opacity = '0';
	}
}
function boxHide(id){
	var boxId = $(id);
	boxId.style.opacity = '0';
	boxId.style.top = '-20px';
	boxId.style.height = '0';
}
function isPhoto(t){
    var tId=t.innerHTML;
    if(tId=='有图'){
      document.cookie = 'isphoto=yes;path=/';
    }else if (tId=='无图'){
      document.cookie = 'isphoto=no;path=/';
    }else{
        return false;
    }
    window.location.reload();
}

function $(id) {
	return !id ? null : document.getElementById(id);
}
function addEvent(obj,type,fun){
	obj=$(obj);
	if(obj.addEventListener){
		obj.addEventListener(type,fun);
		return true;
	}else if(obj.attachEvent){
		return obj.attachEvent("on"+type,fun);
	}else{
		return false;
	};
}
function isUndefined(variable) {
	return typeof variable == 'undefined' ? true : false;
}
var aj=new Object();
aj.request = function(){
	if(window.XMLHttpRequest) {
		var ajax = new XMLHttpRequest();
	}else if (window.ActiveXObject) { 
		try {
			var ajax = new ActiveXObject("Msxml2.XMLHTTP");
		}catch (e) {
			try {
				var ajax = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	if (!ajax) { 
	     window.alert("不能创建XMLHttpRequest对象<SPAN class=hilite2>实例</SPAN>.");
	     return false;
	}
 	return ajax;
}

aj.req=aj.request();
aj.Handle=function(callback){
	aj.req.onreadystatechange=function(){
		if(aj.req.readyState==4){
			if(aj.req.status==200){
				callback(aj.req.responseText);
			}
		}
	}
}
aj.cl=function(o){
	if(typeof(o)=='object'){
		var str='';
		for(a in o){
			str+=a+'='+o[a]+'&';
		}
		str=str.substr(0,str.length-1);
		return str;
	}else{
		return o;
	}
}
aj.get=function(url,callback){
	aj.req.open('get',url,true);
	aj.req.send(null);
	aj.Handle(callback);
}
aj.post=function(url,content,callback){
	aj.req.open('post',url,true);
	aj.req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	content=aj.cl(content);
	aj.req.send(content);
	aj.Handle(callback);
}
/*
*	上一页
*	小钟
*/
function goPre(){
	if(window.location.href==document.referrer){
		history.back();
	}
	window.location.href = '../default.htm';
}