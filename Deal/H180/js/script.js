function mycarousel_initCallback(a) {
	a.buttonNext.bind('click', function () {
		a.startAuto(0)
	});
	a.buttonPrev.bind('click', function () {
		a.startAuto(0)
	});
	$('#mycarousel .description').mouseenter(function () {
		a.stopAuto()
	});
	$('#mycarousel .description').mouseleave(function () {
		a.startAuto()
	})
};
$(document).ready(function () {
	var a = 'easeOutElastic';
	if ($('.main-menu li.current').length) {
		currentCheck = 1;
		default_left = Math.round($('.main-menu li.current').offset().left - $('.main-menu').offset().left - 5);
		default_top = Math.round($('.main-menu li.current').offset().top - $('.main-menu').offset().top);
		default_width = $('.main-menu li.current').width();
		default_height = $('.main-menu li.current').height()
	} else {
		currentCheck = 0;
		default_left = 0;
		default_top = 0;
		default_width = 0;
		default_height = 47;
		$('.main-menu li#lava-elm').css('opacity', '0')
	}
	$('.main-menu li#lava-elm').stop(false, true).animate({
		top: default_top,
		left: default_left,
		width: default_width,
		height: default_height
	},
	{
		duration: 10
	});
	$('.main-menu li').mouseenter(function () {
		if (!$(this).is('#lava-elm')) {
			elemTop = Math.round($(this).offset().top - $('.main-menu').offset().top);
			elemLeft = Math.round($(this).offset().left - $('.main-menu').offset().left - 5);
			width = $(this).width();
			height = $(this).height();
			$('#lava-elm').stop(false, false).animate({
				top: elemTop,
				left: elemLeft,
				width: width,
				height: height
			},
			{
				duration: 700,
				easing: a
			});
			if (currentCheck == 0) {
				$('.main-menu li#lava-elm').css('opacity', '100')
			}
		}
	});
	$('.main-menu').mouseleave(function () {
		if (currentCheck == 0) {
			$('.main-menu li#lava-elm').css('opacity', '0')
		}
		$('.main-menu li#lava-elm').stop(false, true).animate({
			top: default_top,
			left: default_left,
			width: default_width,
			height: default_height
		},
		{
			duration: 100
		})
	});
	var b = 'search...';
	var c = 'enter your e-mail address...';
	$('.top-nav input.search').val(b).bind('focus', function () {
		if (this.value == b) this.value = ''
	}).bind('blur', function () {
		if (this.value == '') this.value = b
	});
	$('footer .newsletter input[type=text]').val(c).bind('focus', function () {
		if (this.value == c) this.value = ''
	}).bind('blur', function () {
		if (this.value == '') this.value = c
	});
	$('#meals-of-the-day ul').jcarousel({
		wrap: 'both',
		itemFallbackDimension: 400
	});
	$('.featured-meals ul').jcarousel({
		wrap: 'both',
		scroll: 1,
		itemFallbackDimension: 215
	});
	$("#login-btn").click(function () {
		$("#popup-overlay").css('display', 'block');
		$("#popup-login").fadeIn()
	});
	$(".register-btn").click(function () {
		$('.popup').css('display', 'none');
		$("#popup-overlay").css('display', 'block');
		$("#popup-register").fadeIn()
	});
	$("#popup-overlay, .popup a.close").click(function () {
		$('.popup, #popup-overlay').css('display', 'none')
	})
});
$('#payment-methods ul li').click(function () {
	$('#payment-methods ul li .form-controls.checked').removeClass('checked');
	$('#payment-methods ul li input').attr('checked', false);
	$('.form-controls', this).addClass('checked');
	$('input', this).attr('checked', true)
});