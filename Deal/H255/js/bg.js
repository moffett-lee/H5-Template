$(document).ready(function() {

	var w_img=1300, h_img=1080;
	var w,new_w,h, new_h, num;
	var h_cont=830;
	setWidth();
	setHeight();
	w=new_w;h=new_h;
	setSize();
	function setWidth(){
		new_w=$(window).width();
	}
	function setHeight(){
		new_h=$(window).height();
	}
	function setSize(){
		if ((w/w_img) > (h/h_img)) {
			w_img_new=w+20;
			h_img_new=~~((w+20)*h_img/w_img);
		} else {
			h_img_new=h+20;	
			w_img_new=~~((h+20)*w_img/h_img);
		}
		$('#bgSlider img').css({width:w_img_new, height:h_img_new});
		if (h>h_cont) {
			m_top=~~((h-h_cont)/2);
		} else m_top=0
		$('.box').stop().animate({marginTop:m_top},1000, 'easeOutCirc');
	}
	setInterval(setNew,1);
	function setNew(){
		setWidth();
		setHeight();
		if ((w!=new_w)|(h!=new_h)) {
			w=new_w;h=new_h;
			setSize();
		}
	}
})