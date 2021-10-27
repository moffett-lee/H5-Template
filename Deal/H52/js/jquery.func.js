$(function() {
	$(document).on('focusin', '.field, textarea', function() {
		if(this.title==this.value) {
			this.value = '';
		}
	}).on('focusout', '.field, textarea', function(){
		if(this.value=='') {
			this.value = this.title;
		}
	}).on('mouseenter', 'nav li', function() {
		$(this).find('.dropdown:first').show(200);
	}).on('mouseleave', 'nav li', function() {
		$(this).find('.dropdown:first').stop(true,true).hide(200);
	}).on('click', '#back-to-top', function() {
		$('html, body').animate({
			scrollTop: 0
		}, {
			duration: 900,
			easing: 'easeInOutQuint'
		});
		return false;
	})

	$('nav .dropdown').each(function() {
		$(this).parents('li:eq(0)').addClass('has-dd');
	});

	if($('#slider').length) {
		$('.image-slider li').each(function() {
			var bg_src = $(this).find('img').attr('src');
			$(this).css('background-image', 'url(' + bg_src + ')').find('img').hide();
		});
	}
	
	// Gallery & Calendar Filters
	var galleryItems = $('.gallery-items');
	var calendarItems = $('table.calendar');
	var allCalendarItems = calendarItems.find('.item');
	var filters = $('#filters');
	var height = 0; var thisHeight = 0;
	
	// Set Calendar Default Cell Height (based on tallest cell)
	calendarItems.find('td').each(function(){
		thisHeight = $(this).height();
		if (thisHeight > height){ height = thisHeight; }
	});
	
	calendarItems.find('td').height(thisHeight);
	
	filters.find('span').click(function(){
	
		var filterID = this.id;
		filters.find('span').removeClass('active');
		$(this).addClass('active');
			
		if (!filterID){
		
			// Display All Items
			galleryItems.animate({'opacity':0},300,function(){
				galleryItems.find('.item').removeClass('hidden');
				galleryItems.animate({'opacity':1},300);
			});
			allCalendarItems.removeClass('inactive');

			
		} else {
			// Display Filtered Items
			galleryItems.animate({'opacity':0},300,function(){
				galleryItems.find('.item').addClass('hidden');
				galleryItems.find('.'+filterID).removeClass('hidden');
				galleryItems.animate({'opacity':1},300);
			});
			calendarItems.find('.item').addClass('inactive');
			calendarItems.find('.'+filterID).removeClass('inactive');
		}
	
	});

	$(window).load(function() {
		if($('#slider').length) {
			$('#slider .image-slider').flexslider({
				slideshowSpeed: 8000,
				animationSpeed: 800,
				controlNav: false,
				animationLoop: true,
				prevText: '',
				nextText: '',
				keyboard: false,
				controlsContainer: '#slider',
				start: function(slider) {
					$('#slider .elements').delay(800).fadeIn(600, function() {
						var $this = $(this);
						$this.find('.white-box').delay(200).fadeIn(600, function() {
							$this.find('.top-corner').show().animate({
								top: 88,
								right: 390
							}, {
								duration: 300,
								easing: 'easeOutBack'
							});
							$this.find('.bottom-corner').show().animate({
								top: 380,
								right: 674
							}, {
								duration: 300,
								easing: 'easeOutBack'
							});

							$('.text-slider').find('li:eq(0)').delay(300).animate({
								marginTop: 0,
								marginLeft: 0
							}, {
								duration: 750,
								easing: 'easeInOutExpo'
							});

							$('.flex-direction-nav').delay(500).fadeIn(400);
							
							// Change the #slider height
							if ($('#slider .top-corner').is(':visible')){
								$('#slider').animate({height:'inherit'}, {
									duration: 750,
									easing: 'easeInOutExpo',
									queue: false
								});
							} else {
								var sliderLocation = $('.text-slider').css('top');
								sliderLocation = parseInt(sliderLocation.replace('px',''));
								var slideHeight = $('.text-slider li:first').height();
								var totalHeight = sliderLocation + slideHeight + 36;
			
								$('#slider').animate({height:totalHeight}, {
									duration: 750,
									easing: 'easeInOutExpo',
									queue: false
								});
							}
						});
					});
				},
				before: function(slider) {
					var curr_top = 0;
					var curr_left = 0;
					var next_top = 0;
					var next_left = 0;
					if(slider.animatingTo == slider.currentSlide + 1 || slider.currentSlide == slider.count - 1 && slider.animatingTo == 0) {
						curr_top = -420;
						curr_left = -428;
						next_top = 380;
						next_left = 388;
					} else if(slider.animatingTo == slider.currentSlide - 1 || slider.currentSlide == 0 && slider.animatingTo == slider.count - 1) {
						curr_top = 380;
						curr_left = 388;
						next_top = -420;
						next_left = -428;
					}

					// Change the #slider height
					if ($('#slider .top-corner').is(':visible')){
						$('#slider').removeAttr('style');
					} else {
						var sliderLocation = $('.text-slider').css('top');
						sliderLocation = parseInt(sliderLocation.replace('px',''));
						var slideHeight = $('.text-slider li').eq(slider.animatingTo).height();
						var totalHeight = sliderLocation + slideHeight + 36;
	
						$('#slider').animate({height:totalHeight}, {
							duration: 750,
							easing: 'easeInOutExpo',
							queue: false
						});
						$('#slider').animate({height:totalHeight}, {
							duration: 750,
							easing: 'easeInOutExpo',
							queue: false
						});
					}

					$('.text-slider li').eq(slider.currentSlide).animate({
						marginTop: curr_top,
						marginLeft: curr_left
					}, {
						duration: 750,
						easing: 'easeInOutExpo',
						queue: false
					});
					$('.text-slider li').eq(slider.animatingTo).css({
						marginTop: next_top,
						marginLeft: next_left
					}).animate({
						marginTop: 0,
						marginLeft: 0
					}, {
						duration: 750,
						easing: 'easeInOutExpo',
						queue: false
					});
				}
			})
		}

		if($('#testimonials').length) {
			$('#testimonials').flexslider({
				animation: 'slide',
				animationSpeed: 900,
				slideshow: false,
				controlNav: false,
				smoothHeight: true,
				prevText: '',
				nextText: '',
				keyboard: false
			});
		}

		if($('.recent-widget').length) {
			$('.recent-widget').append('<span class="prev" /><span class="next" />');

			$(".recent-widget .container > ul").carouFredSel({
				direction: "up",
				height: "variable",
				items: {
					visible: 2,
					minimum: 2,
					height: "variable"
				},
				scroll: {
					items: 1,
					easing: "easeInOutExpo"
				},
				auto: false,
				prev: ".recent-widget .prev",
				next: ".recent-widget .next"
			});
		}

		if($('.upcoming-widget').length) {
			$('.upcoming-widget').append('<span class="prev" /><span class="next" />');

			$(".upcoming-widget .container > ul").carouFredSel({
				direction: "up",
				height: "variable",
				items: {
					visible: 7,
					minimum: 7,
					height: "variable"
				},
				scroll: {
					items: 3,
					easing: "easeInOutExpo"
				},
				auto: false,
				prev: ".upcoming-widget .prev",
				next: ".upcoming-widget .next"
			});
		}

		if($('.tweets-widget').length) {
			$('.tweets-widget').each(function(){
			
				var tweetContainer = $(this);
				var twitterAccount = tweetContainer.attr('id');
				tweetContainer.find('.container').tweet({
					username: twitterAccount,
					count: 9,
					avatar_size: 0
				}).bind('loaded', function() {
					tweetContainer.append('<span class="prev" /><span class="next" />');
	
					tweetContainer.find(".container > ul").carouFredSel({
						direction: "up",
						height: "variable",
						items: {
							visible: 3,
							minimum: 3,
							height: "variable"
						},
						scroll: {
							items: 1,
							easing: "easeInOutExpo"
						},
						auto: false,
						prev: tweetContainer.find('.prev'),
						next: tweetContainer.find('.next')
					});
				});
			
			});
		}
		
		if ($('.mobile-nav-toggle').length) {
			$('.mobile-nav-toggle').click(function(){
				$(this).toggleClass('active');
				if($(this).hasClass('active')){ $(this).html('x'); } else { $(this).html('+'); }
				$('header #mobile-nav ul').slideToggle('fast');
			});
		}
	});
	
	// Required for the gallery lightboxing
	if ($('.gallery').length > 0){
		$('.gallery a').fancybox();
	}
	
	// Optional, only needed if you're using Fancybox somewhere other than the gallery
	$('.fancybox').fancybox();
	
});