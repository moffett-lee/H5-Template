
$(document).ready(function(){ 
	
/*=========================================================================
 Quicksand
========================================================================= */

	$clientsHolder = $('#stage');
	$clientsClone = $clientsHolder.clone(); 
 
	$('#filter a').click(function(e) {
		e.preventDefault();
	 
		$filterClass = $(this).attr('class');
	 
		$('#filter li').removeClass('active');
		$(this).parent().addClass('active');
	 
		if($filterClass == 'all'){
			$filters = $clientsClone.find('li');
		} else {
			$filters = $clientsClone.find('li[data-type~='+ $filterClass +']');
		}
	 
	   $clientsHolder.quicksand( $filters, {
			duration: 1000,
			easing: 'easeInOutQuint'
		}, function(){
			
/*=========================================================================
 Start image Hover
========================================================================= */
						
/* ---- Portfolio 4 column --- */

	$(document).ready(function(){
		$('.portfolio-4column li').hover(function(){
	    	$(".cover", this).stop().animate({bottom:'5px'},{queue:false,duration:580});
	    }, function() {
	        $(".cover", this).stop().animate({bottom:'-70px'},{queue:false,duration:580});
	    });
	});	

/* ---- Portfolio 3 column --- */

	$(document).ready(function(){
	    $('.portfolio-3column li').hover(function(){
	        $(".cover", this).stop().animate({bottom:'4px'},{queue:false,duration:580});
	    }, function() {
	        $(".cover", this).stop().animate({bottom:'-115px'},{queue:false,duration:580});
	    });
	});					
								
/* ---- Portfolio 2 column --- */
								
	$(document).ready(function(){
		$('.portfolio-2column li').hover(function(){
			$(".cover", this).stop().animate({bottom:'-28px'},{queue:false,duration:580});
		}, function() {
			$(".cover", this).stop().animate({bottom:'-147px'},{queue:false,duration:580});
		});
	});		
							
						
/*=========================================================================
 Start prettyPhoto
========================================================================= */
						
$(document).ready(function(){
	$("a[data-gal^='prettyPhoto']").prettyPhoto();
								
	$(".pp_gal_1:first a[data-gal^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'pp_default',slideshow:3000, autoplay_slideshow: false});
	$(".pp_gal_1:gt(0) a[data-gal^='prettyPhoto']").prettyPhoto({animation_speed:'fast',slideshow:10000, hideflash: true});
						
	$("#custom_content a[data-gal^='prettyPhoto']:first").prettyPhoto({
		custom_markup: '<div id="map_canvas" style="width:260px; height:265px"></div>',
		changepicturecallback: function(){ initialize(); }
	});

	$("#custom_content a[data-gal^='prettyPhoto']:last").prettyPhoto({
		custom_markup: '<div id="bsap_1259344" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6"></div><div id="bsap_1237859" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6" style="height:260px"></div><div id="bsap_1251710" class="bsarocks bsap_d49a0984d0f377271ccbf01a33f2b6d6"></div>',
		changepicturecallback: function(){ _bsap.exec(); }
		});
	});
	});
	});
});


