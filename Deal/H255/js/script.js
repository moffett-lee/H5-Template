
$(document).ready(function(){
	//gallery 
	$(".scroll").jCarouselLite({
			btnNext: ".next",
		 	btnPrev: ".prev",
			visible: 1,
			speed: 600,
			vertical: true,
			circular: true,
        	mouseWheel: true,
			easing: 'easeOutCirc'
	});
	Cufon.now(); 
});
$(document).ready(function() {
	
	$('.next span, .prev span, .close span').css({opacity:'0'})
	
	$('.next, .prev, .close').hover(function(){
		$(this).find('span').stop().animate({opacity:'1'})							
	}, function(){
		$(this).find('span').stop().animate({opacity:'0'})							
	})
	
	//bg animate
	$('#bgSlider').bgSlider({
		duration:1000,
		pagination:'.pagination',
		preload:true,
		spinner:'.bg_spinner'
	})
		
 });