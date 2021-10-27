$(document).ready(function(){
	$.jqueryInputTips();
});

;(function ($){
jQuery.jqueryInputTips = function() {

	// 设置颜色值
	var colorNo = '#ccc';
	var colorYes = '#000';

	// 分别绑定方法
	$.each($('input[tips],textarea[tips]'),function(){
		$(this).css({color:colorNo});
		$(this).val($(this).attr('tips'));
		$(this).focus(focusIn);
		$(this).blur(focusOut);
	});
	
	// 鼠标移入方法
	function focusIn(){
		$(this).css({color:colorYes});
		if( $(this).val() == $(this).attr('tips') ) {
			$(this).val('');
		}
	}
	
	// 鼠标移出方法
	function focusOut(){
		if ( $(this).val() == '' || $(this).val() == null ) {
			$(this).css({color:colorNo}).val($(this).attr('tips'));
		}
	}
	
}; 
})(jQuery); 
