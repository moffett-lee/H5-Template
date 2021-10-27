// Jquery with no conflict
jQuery(document).ready(function($) { 
  
  
	//##########################################
	// Nav menu
	//##########################################
	
	$("ul.sf-menu").superfish({ 
        animation: {height:'show'},   // slide-down effect without fade-in 
        delay:     400 ,              // 1.2 second delay on mouseout 
        autoArrows:  false,
        speed:         'normal'
    });
    
    //##########################################
	// Header nav
	//##########################################
	
    $(document).mousemove(function(e){
    	if((e.pageY) < 200){
			$("#headernav").fadeIn();
		}else{
			$("#headernav").fadeOut();
		}
   	}); 
	
	
	//##########################################
	// Tool tips
	//##########################################
	
    $('.poshytip').poshytip({
    	className: 'tip-twitter',
		showTimeout: 1,
		alignTo: 'target',
		alignX: 'center',
		offsetY: 5,
		allowTipHover: false
    });
    
    $('.form-poshytip').poshytip({
		className: 'tip-yellowsimple',
		showOn: 'focus',
		alignTo: 'target',
		alignX: 'right',
		alignY: 'center',
		offsetX: 5
	});
	
	//##########################################
	// Tweet feed
	//##########################################
	
	$("#tweets").tweet({
        count: 3,
        username: "ansimuz"
    });


	//##########################################
	// Front slides
	//##########################################

	$('#front-slides').slides({
		preload: true,
		generateNextPrev: false,
		slideSpeed: 500,
		animationStart: function(current){
			$slideCaption = $(".slides_container div.slide:eq("+ (current-1) +") .caption").text();
			$("#headline h6").text($slideCaption);
			
			if($slideCaption != ''){
				$("#headline").stop().hide().slideDown(600);
			}else{
				$("#headline").hide();
			}
		}
	});
	
	// default headline
	$firstCaption = $(".slides_container div.slide:eq(0) .caption").text();
	if($firstCaption != ''){
		$("#headline h6").text($firstCaption);
	}else{
		$("#headline").hide();
	}
	
	//##########################################
	// Reel slides
	//##########################################

	$('#reel').slides({
		preload: true,
		generateNextPrev: false,
		generatePagination: false,
		next: 'next',
		slideSpeed: 700
	});
	
	
	//##########################################
	// Rollovers
	//##########################################
	
	$('.featured-posts .thumb, .gallery-thumbs a, .work-thumbs a').live("mouseover mouseout", function(event){
			
		if ( event.type == "mouseover" ) {
			thiImage = $(this).children('img');
			thiImage.stop().animate({opacity:0.3},{queue:false,duration:200});
		}else{
			thiImage.stop().animate({opacity:1},{queue:false,duration:200});
		}
		
	});
	
	//##########################################
	// QUICKSAND FILTER
	//##########################################	
	
	// get the initial (full) list
	
	var $filterList = $('ul#portfolio-list');
		
	// Unique id 
	for(var i=0; i<$('ul#portfolio-list li').length; i++){
		$('ul#portfolio-list li:eq(' + i + ')').attr('id','unique_item' + i);
	}

	// clone list
	var $data = $filterList.clone();
	
	// Click
	$('#portfolio-filter a').click(function(e) {
	
		if($(this).attr('rel') == 'all') {
			// get a group of all items
			var $filteredData = $data.find('li');
		} else {
			// get a group of items of a particular class
			var $filteredData = $data.find('li.' + $(this).attr('rel'));
		}
		
		// call Quicksand
		$('ul#portfolio-list').quicksand($filteredData, {
			duration: 500,
			attribute: function(v) {
				// this is the unique id attribute we created above
				return $(v).attr('id');
			}
		}, function() {
	        // restart functions
	        galleryRestart();
		});
		// remove # link
		e.preventDefault();
			
	});

	
	// Gallery restart
	function galleryRestart(){
		
		// prettyPhoto restart
		$("a[rel^='prettyPhoto']").prettyPhoto();
		
		// preserve the status of the description
		$displayText = $(".gallery-filter .layout-notext").hasClass("active");
		//console.log($displayText);
		
		if($displayText){
			$filterList.find(".thumb-description").slideUp(0);
		}
			
	}
	
	galleryRestart();
	
	//##########################################
	// Gallery layout display
	//##########################################
	
	var $layout_text = $(".gallery-filter .layout-text");
	var $layout_notext = $(".gallery-filter .layout-notext");
	var $gallery = $filterList;
	
	// text button
	$layout_text.live('click', function(){
		if(!$(this).hasClass("active")){
			$(this).addClass("active");
			$layout_notext.removeClass("active");
			$gallery.find(".thumb-description").slideDown();
		}
	});
	
	// no text button
	$layout_notext.live('click', function(){
		if(!$(this).hasClass("active")){
			$(this).addClass("active");
			$layout_text.removeClass("active");
			$gallery.find(".thumb-description").slideUp();
		}
	});	
	
	
		
	//##########################################
	// Comments switcher
	//##########################################

	var $comments_switcher = $(".show-comments");
	var $comments_holder = $(".comments-switcher");
	
	$comments_switcher.click(function(){
		if($comments_holder.css("display") == "block"){
			$comments_switcher.children("span").text("click to show");		
		}else{
			$comments_switcher.children("span").text("click to hide");
		}
		$comments_holder.slideToggle();
	});
	
});

// search clearance	
function defaultInput(target){
	if((target).value == 'Search...'){(target).value=''}
}

function clearInput(target){
	if((target).value == ''){(target).value='Search...'}
}

