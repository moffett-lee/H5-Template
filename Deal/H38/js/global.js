$(function(){



var browserHeight = $(window).height();
var browserWidth = $(window).width();

fnResize();
$(window).bind("resize", fnResize);

//设置面面加载后地址栏收起
window.addEventListener('load', function() {
setTimeout(scrollTo, 0, 0, 1);
}, false);

//设置屏幕旋转后的操作
function fnResize(){
	browserWidth = $(window).width();
	if(browserWidth>320){
		$("body>header>span").hide();//功能提示隐藏
	}else{
		$("body>header>span").show();//功能提示显示
	}
}

//password
(function(){
	var $login_tips      = $('#login_tips');
	var $login_password  = $('#login_password');
	
	$login_tips.focus(function(){
		$(this).hide();
		$login_password.show().focus();
	});
	
	$login_password.blur(function(){
		if($(this).val().length==0){
			$(this).hide();
			$login_tips.show();	
		}
	});
	
})();

//for navAge
$("body .tools .btnNav").click(function(){
	$("body .tools").animate({height:233},500)
	$("body .tools .navAge").animate({height:232},500);
});
$("body .tools .navAge a.btnClose").click(function(){
	$("body .tools").animate({height:32},500)
	$("body .tools .navAge").animate({height:0},500);
});

//for navCustom
$("body .tools .btnCustom").click(function(){
	GB.showGoldcoin();
	GB.showNotice();
	$("body .tools").animate({height:$('body .tools nav.navCustom div.clearFix').innerHeight()+30},500)
	$("body .tools .navCustom").animate({height:$('body .tools nav.navCustom div.clearFix').innerHeight()+30},500);
});
$("body .tools .navCustom a.btnClose").click(function(){
	$("body .tools").animate({height:32},500)
	$("body .tools .navCustom").animate({height:0},500);
});



//for conC
$(".conC>section").click(function(e){
	if($(this).hasClass("current")){
		$(this).removeClass("current").find("ul").slideUp(500);
	}else if(!$(this).hasClass("null") && !$(this).hasClass("current")){
		$(this).addClass("current").find("ul").slideDown(500);
		$(this).siblings().removeClass("current").find("ul").slideUp(500);
	}
});


//for regBabyInfo
$("#babyInfo label").click(function(){
	if($(this).index()=="1"){
		$("#babyInfoSub").show().find("span").text("出生日期")
	}else if($(this).index()=="2"){
		$("#babyInfoSub").show().find("span").text("宝宝生日")
	}else if($(this).index()=="3"){
		$("#babyInfoSub").show().find("span").text("预产期")
	}else{
		$("#babyInfoSub").hide()
	}
});

//for week40
var week40Current=1;
var week40SelectHtml;
var $week40turnBtn=$("#week40 section a");
var $week40Select=$("#week40 header select");
var $week40Article=$("#week40>article");
fnSetEnd();
$week40turnBtn.click(function(){
	if($(this).hasClass("turnRight")&&week40Current<40){
		week40Current++;
		fnSetEnd();
	}
	if ($(this).hasClass("turnLeft")&&week40Current>1){
		week40Current--;
		fnSetEnd();
	}
	$week40Article.hide();
	$week40Article.eq(week40Current-1).show();
	$("#week40 section img").attr({src:$week40Article.eq(week40Current-1).attr('rel')});
	$("#week40 header select").val(week40Current);
});
for(i=1;i<41;i++){
	week40SelectHtml=week40SelectHtml+"<option>"+i+"</option>"
}
$week40Select.html(week40SelectHtml)
$week40Select.change(function(){
	week40Current=$(this).val();
	$week40Article.hide();
	$week40Article.eq(week40Current-1).show();
	$("#week40 section img").attr({src:$week40Article.eq(week40Current-1).attr('rel')});
	fnSetEnd();
});
function fnSetEnd(){
	$week40turnBtn.css({opacity:1});
	if(week40Current==40){
		$("#week40 section a.turnRight").css({opacity:0.4});
	}else if(week40Current==1){
		$("#week40 section a.turnLeft").css({opacity:0.4});
	}
}

//for month12
var month12Current=1;
var month12SelectHtml;
var $month12Select=$("#month12 header select");
var $month12Article=$("#month12>article");
for(i=1;i<13;i++){
	month12SelectHtml=month12SelectHtml+"<option>"+i+"</option>"
}
$month12Select.html(month12SelectHtml)
$month12Select.change(function(){
	month12Current=$(this).val();
	$month12Article.hide();
	$month12Article.eq(month12Current-1).show();
});

//for month36
var month36Current=1;
var month36SelectHtml;
var $month36Select=$("#month36 header select");
var $month36Article=$("#month36>article");
//for(i=1;i<$month36Article.length+1;i++){
	//month36SelectHtml=month36SelectHtml+"<option rel="+i+">"+$("#month36 header select").options[i].value+"</option>"
//}
$month36Select.html(month36SelectHtml)
$month36Select.change(function(){
	month36Current=$month36Select[0].selectedIndex+1;
	
	$month36Article.hide();
	$month36Article.eq(month36Current-1).show();
});


/**
	ADD BY DAVID
	FOR PAGE BEGIN
**/
$('.conD article.hide_conforJs:lt(5)').show().removeClass('hide_conforJs');
if($('.conD article.hide_conforJs').length==0) {
	$('html body section.showMore a span').before('<a href="javascript:void(0);"><strong>当前为最后一页</strong>');
	$('html body section.showMore strong').css({color:'#666'});
}
else {
	$('html body section.showMore a span').before('<a href="javascript:void(0);"><strong>显示下5条</strong>');
}
var $body_h;

$.fn.page = function(id, data){
	var ids = "#" + id;
	$(ids).before(data);
	if($('.conD article').length > 0){
		if($('.conD article.hide_conforJs').length==0){
			$('html body section.showMore a a').html('<a href="javascript:void(0);"><strong>当前为最后一页</strong>');
			$('html body section.showMore strong').css({color:'#666'});
			$("section.showMore").unbind("click");
		}
	}
}

//FOR PAGE END


$('.conD .showMore').bind('click',function(){
	if($('.conD article').length>5){
		$('.conD article.hide_conforJs:lt(5)').show().removeClass('hide_conforJs');
	}
});

/*
$('html body section.showMore span').html('共有'+$('.conD article').length+'条');
var show_num_n=Math.floor($('.pageChannelList article').length/5);
var show_num_p=$('.conD article').length%5;

if($('.conD article').length<5){
	$('.conD .showInformation_area').css({height:'auto'});
}

$('.conD .showMore').bind('click',function(){
	if($('.conD article').length>5){
		if(show_num_p==0){
			if(show_num_n-1>0){
				if(!$('.conD .showInformation_list').is(':animated')){
					$('.conD .showInformation_list').animate({marginTop:'-='+$('.conD .showInformation_area').height()},{queue:false, duration:500, easing: 'easeInQuad',complete:function(){
						show_num_n--;
						if(show_num_n==1){
							$('html body section.showMore strong').css({color:'#666'});	
						}
					}});
				}			
			}else{
				$('.conD .showMore').unbind("click");
			}	
		}else{
			if(show_num_n-1>=0){
				if(!$('.conD .showInformation_list').is(':animated')){
					$('.conD .showInformation_list').animate({marginTop:'-='+$('.conD .showInformation_area').height()},{queue:false, duration:500, easing: 'easeInQuad',complete:function(){
						show_num_n--;
						if(show_num_n==0){
							$('.conD .showInformation_area').css({height:'auto'});
							$('.conD .showInformation_area').css({height:67*show_num_p});
							$('html body section.showMore strong').css({color:'#666'});	
						}
					}});
				}			
			}else{
				$('.conD .showMore').unbind("click");
			}	
		}
	}
}); */


//检测屏幕旋转方向
//function fnSetFangxiang(){
//　　var contentType ="show_";
//　　switch(window.orientation){
//　　case 0:
//　　contentType += "normal";
//　　break;
//　　case -90:
//　　contentType += "right";
//　　break;
//　　case 90:
//　　contentType += "left";
//　　break;
//　　case 180:
//　　contentType += "flipped";
//　　break;
//　　}	
//document.getElementById("body").setAttribute("class", contentType);
//}

});
