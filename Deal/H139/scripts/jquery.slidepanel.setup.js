$(document).ready(function() {
	
	// Expand Panel
	$("#slideit").click(function(){
		$("div#slidepanel").slideDown("slow");
	
	});	
	
	// Collapse Panel
	$("#closeit").click(function(){
		$("div#slidepanel").slideUp("slow");	
	});		
	
	// Switch buttons from "Log In | Register" to "Close Panel" on click
	$("#toggle a").click(function () {
		$("#toggle a").toggle();
	});		
		
});