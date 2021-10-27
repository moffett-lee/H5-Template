var $ = jQuery.noConflict();

$(document).ready(function($) {
	/*-------------------------------------------------*/
	/* = Slider - Documentation: http//buildinternet.com/project/supersized/docs.html
	/*-------------------------------------------------*/
	$.supersized({
		// Functionality
		slide_interval	:   10000,		// Length between transitions
		transitions 	:   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed:	700,		// Speed of transition				   
		// Components							
		slide_links		:	'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
		slides 			:[			// Slideshow Images
							{image : 'upload/slider/1.jpg'},
							{image : 'upload/slider/2.jpg'},  
							{image : 'upload/slider/3.jpg'},
							{image : 'upload/slider/4.jpg'}
						]
	});

	/*-------------------------------------------------*/
	/* = Image Hover
	/*-------------------------------------------------*/
	$('div.img-staf a').each(function(){
		$(this).append('<span class="img-hover"></span>');
	});

	/*-------------------------------------------------*/
	/* = Image Click - Fancybox
	/*-------------------------------------------------*/
	try {
		$('div.img-staf a').fancybox({
			nextEffect	: 'elastic',
			prevEffect	: 'elastic',
			openEffect	: 'elastic',
	    	closeEffect	: 'elastic',
	          helpers: {
	              title : {
	                  type : 'float'
	              }
	          }
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  Fancybox Images & Video
	/*-------------------------------------------------*/
	try {
		$("#portfolio-scroll a.image").fancybox({
			nextEffect	: 'fade',
			prevEffect	: 'fade',
			openEffect	: 'fade',
	    	closeEffect	: 'fade',
	          helpers: {
	              title : {
	                  type : 'float'
	              }
	          }
		});

		$('#portfolio-scroll a.video').fancybox({
			maxWidth	: 800,
			maxHeight	: 600,
			fitToView	: false,
			width		: '75%',
			height		: '75%',
			type 		: 'iframe',
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'fade',
			closeEffect	: 'fade'
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* = Responsive
	/*-------------------------------------------------*/
	$(window).bind('resize', function(){
		if($(window).height() <= $('#container').height() + 20){
			if(!$('body').hasClass('small')){
				$('body').addClass('small');
			}
		} else {
			$('body').removeClass('small');
		}
	});

	/*-------------------------------------------------*/
	/* = Read More
	/*-------------------------------------------------*/
	$('a.read-more').live('click', function(e){
		e.preventDefault();

		$(this).parents('ul').addClass('active');
		$(this).parents('li').addClass('active');

		$('#services ul li:not(.active)').hide('slow');

		$(this).removeClass('read-more').addClass('back').text($(this).attr('data-back'));
	});

	$('a.back').live('click', function(e){
		e.preventDefault();

		$(this).parents('ul').removeClass('active');
		$(this).parents('li').removeClass('active');

		$('#services ul li').show('slow');
		
		$(this).removeClass('back').addClass('read-more').text($(this).attr('data-text'));
	});

	//Services
	var services = function() {
		$('#services ul').removeClass('active');
		$('#services ul li').removeClass('active');
		$('#services ul li').show();
		$('#services ul li > a').removeClass('back').addClass('read-more').text($('#services ul li a').attr('data-text'));
	}

	/*-------------------------------------------------*/
	/* = Menu Item Click
	/*-------------------------------------------------*/
	var is_animate = false;

	$('header nav a').on('click', function(e){
		e.preventDefault();

		if(!is_animate && !$(this).hasClass('active')){
			is_animate = true;

			var last_active = $('#menu nav a.active');
			$('#menu nav a').removeClass('active');
			$(this).addClass('active');

			var id = $(this).attr('href');

			if(id != '#home'){
				if(last_active.attr('href') == '#home'){
					$('#container').animate({'bottom': '50%', 'marginBottom': 0 - parseInt(parseInt(parseInt($('header').height()) + parseInt($('#content').height()) + 20) / 2)}, 400);

					$('#content').slideDown('slow', function(){
						$(id).delay(100).slideDown('slow', function(){
							create_map();
							services();
						});

						is_animate = false;
					});	
				} else {
					$(last_active.attr('href')).slideUp('slow', function(){
						$(id).slideDown('slow', function(){
							create_map();
							services();
						});

						is_animate = false;
					});
				}
			} else {
				$(last_active.attr('href')).slideUp('slow', function(){
					$('#content').delay(100).slideUp('slow');
					$('#container').delay(100).animate({'bottom': '10%', 'marginBottom': '0px'});
					is_animate = false;
				});
			}
		}
	});

	if($('header nav a.active').attr('href') != '#home'){
		is_animate = true;

		$('#container').css({'display': 'block'});
		$('#container').animate({'bottom': '50%', 'marginBottom': 0 - parseInt(parseInt(parseInt($('header').height()) + parseInt($('#content').height()) + 20) / 2)}, 400);

		var id = $('header nav a.active').attr('href');

		$('#content').slideDown('slow', function(){
			$(id).delay(100).slideDown('slow', function(){
				create_map();
			});

			is_animate = false;
		});	
	} else {
		$('#container').delay('1000').fadeIn();
	}
	
	/* ---------------------------------------------------------------------- */
	/*	Contact Map
	/* ---------------------------------------------------------------------- */
	var contact = {"lat":"42.672421", "lon":"21.16453899999999"}; //Change a map coordinate here!

	try {
		var create_map = function() {
			$('#map').remove();
			$('#contact .inner-content > #contact-form').before('<div id="map"></div>');

			$('#map').gmap3({
		        action: 'addMarker',
		        latLng: [contact.lat, contact.lon],
		        map:{
		        	center: [contact.lat, contact.lon],
		        	zoom: 14
		       		},
		        },
		        {action: 'setOptions', args:[{scrollwheel:true}]}
			);
		}
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */
	$('#submit').on('click', function(e){
		e.preventDefault();

		$this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact-form').serialize(),
			success: function(data) {

				if(data.info != 'error'){
					$this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
					$('#msg').hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					$('#msg').hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});
});
