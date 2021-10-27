function think(inputBox,h)
{
    mo = this;
	if(typeof h=='undefined')
	{
		h = 32;
	}
	mo.h = h;
    mo.inputBox = inputBox;
    mo.init();
}
think.prototype.$ = function(n)
{
    return document.getElementById(n);
}
think.prototype.getElementPos=function(el) {
    var ua = navigator.userAgent.toLowerCase();
    var isOpera = (ua.indexOf('opera') != -1);
    var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
    if(el.parentNode === null || el.style.display == 'none') {
     return false;
    }      
    var parent = null;
    var pos = [];     
    var box;     
    if(el.getBoundingClientRect)    //IE
    {         
     box = el.getBoundingClientRect();
     var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
     var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
     return {x:box.left + scrollLeft, y:box.top + scrollTop};
    }else if(document.getBoxObjectFor)    // gecko    
    {
     box = document.getBoxObjectFor(el); 
     var borderLeft = (el.style.borderLeftWidth)?parseInt(el.style.borderLeftWidth):0; 
     var borderTop = (el.style.borderTopWidth)?parseInt(el.style.borderTopWidth):0; 
     pos = [box.x - borderLeft, box.y - borderTop];
    } else    // safari & opera    
    {
     pos = [el.offsetLeft, el.offsetTop];  
     parent = el.offsetParent;     
     if (parent != el) { 
      while (parent) {  
       pos[0] += parent.offsetLeft; 
       pos[1] += parent.offsetTop; 
       parent = parent.offsetParent;
      }  
     }   
     if (ua.indexOf('opera') != -1 || ( ua.indexOf('safari') != -1 && el.style.position == 'absolute' )) { 
      pos[0] -= document.body.offsetLeft;
      pos[1] -= document.body.offsetTop;         
     }    
    }              
    if (el.parentNode) { 
       parent = el.parentNode;
      } else {
       parent = null;
      }
    while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account for any scrolled ancestors
     pos[0] -= parent.scrollLeft;
     pos[1] -= parent.scrollTop;
     if (parent.parentNode) {
      parent = parent.parentNode;
     } else {
      parent = null;
     }
    }
    return {x:pos[0], y:pos[1]};
}
think.prototype.each = function(json)
{
    var s ='';
    for(var i in json['s'])
    {
        var kw = json['s'][i];
        s += '<li><a href="http//m.120ask.com/indexg/search?flag=14&keyword='+encodeURIComponent(kw)+'">'+kw.replace(json['q'],'<b>'+json['q']+'</b>')+'</a></li>'
    }
    if(s!='')
    {
        mo.$('ui-suggestion-content').innerHTML = s;
        mo.$('ui-input-mask').style.display = 'block';
        t1.setup();
        t1.scrollTo(0,0);
    }
    else
    {
        mo.$('ui-input-mask').style.display = 'none';
    }
}
think.prototype.init = function()
{
   window.sogou = {};
   window.sogou.sug = mo.each;
   if(mo.inputBox.indexOf('#')==0){
        mo.$(mo.inputBox).addEventListener('keyup',function(e){
             mo.jsonp(this.value);
        },false);
   }
   else if(mo.inputBox.indexOf('.')==0)
   {
       mo.inputBox = mo.inputBox.replace(/^\./,'');
       var box = document.getElementsByClassName(mo.inputBox);
       (function(){
            for(var i in box)
            {
                 try{
                     box[i].addEventListener('keyup',function(e){
                         if(mo.checkInput(this.value)){
                             var pos = mo.getElementPos(this);
                             pos.y+=mo.h;
                             mo.$('ui-input-mask').style.top = pos.y+'px';
                             mo.jsonp(this.value);
                         }
                         else
                         {
                            mo.$('ui-input-mask').style.display = 'none';
                         }
                     },false);
                     box[i].addEventListener('focus', function(e){
                        if(mo.checkInput(this.value)){
                             var pos = mo.getElementPos(this);
                             pos.y+=mo.h;
                             mo.$('ui-input-mask').style.top = pos.y+'px';
                             mo.jsonp(this.value);
                         }
                     }, false)
                 }catch(e){}
            }
       })();
   }
   mo.$('close-input-mask').addEventListener('click',function(e){
        mo.$('ui-input-mask').style.display = 'none';
   },false);
}
think.prototype.checkInput = function(str)
{
	return str.replace(/^\s+|\s+$/,'')!='' && (/[\u4E00-\u9FFF]{2,}/.test(str) || /.{6,}/.test(str));
}

think.prototype.jsonp = function(val)
{
    var url = "http//m.sogou.com/web/sugg.jsp?&kw="+encodeURIComponent(val)+"&t="+new Date().getTime();
    var script = document.createElement('script');
    script.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(script);
}