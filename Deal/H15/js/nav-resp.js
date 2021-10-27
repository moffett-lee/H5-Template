jQuery(document).ready(function($){

	/* prepend menu icon */
	$('#nav-wrap').prepend('<div id="menu-icon">Menu - <span class="mn-clk">Navigation</span></div>');
	
	/* toggle nav */
	$("#menu-icon").on("click", function(){
		$("#nav").slideToggle();
		$(this).toggleClass("active");
	});

});