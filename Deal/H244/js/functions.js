$(function() {
	$('.sidebar .widget ul li:first-child').addClass('first');
	$('#navigation ul li:first-child').addClass('first');
	$('#navigation ul li:last-child').addClass('last');
	$('.footer-nav ul li:first-child').addClass('first');

	$('a.popup').colorbox({
		onComplete: function(){
			$.colorbox.resize();
		}
	})
});