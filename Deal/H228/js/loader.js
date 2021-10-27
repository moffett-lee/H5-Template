$(function(){
	$(".loader").each(function(){
		var height = $(this).find("img").attr("height");
		var width = $(this).find("img").attr("width");
		$(this).css("height", height);
		$(this).css("width", width);
	});
	$(".loader img").css("display", "none");
});


$(window).load(function() { //fades in image and hides loading image
	$(".loader").css("background", "none");
	$(".loader img").fadeIn("fast");
	
	//fades slideOut items
	$(".main .item1, .main .item2, .main .item3, .main .item4").fadeIn("fast")
});