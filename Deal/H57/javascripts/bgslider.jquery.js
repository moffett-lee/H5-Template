(function( window, $, undefined ) {
	// gets the image size and position in order to make it fullscreen and centered.
	getImageDim			= function( img, wrapper ) {
		var $img    = new Image();
		$img.src    = img;
		
		var $win	= $( window ),
		w_w		= $(wrapper).width(),
		w_h		= $(wrapper).height(),
		r_w		= w_h / w_w,
		i_w		= $img.width,
		i_h		= $img.height,
		r_i		= i_h / i_w,
		new_w, new_h, new_left, new_top;
		
		if( r_w > r_i ) {
			new_h	= w_h;
			new_w	= w_h / r_i;
		}
		else {
			new_h = w_w * r_i;
			new_w = w_w;
		}
		return {
			width : new_w,
			height : new_h,
			left : ( w_w - new_w ) / 2,
			top	: ( w_h - new_h ) / 2
		};
	}
	
	$.fn.BGImage	= function(element) {
		var hsWrapper = element,
		// loading status to show while preloading images
		hsLoading		= hsWrapper+' div.hs-loading',
		// container for the bg images and respective canvas
		hsContainer		= hsWrapper+' .hs-container',
		// total number of bg images
		hsImgs			= $(hsWrapper).find('img'),
		// slide's content hook
		content			= '.hs-content';
		
			$(hsWrapper+" "+content+":first").show();
			// preload all images
			var loaded = 0;
			hsImgs.each( function(i) {
				var hsimg	= $(hsImgs);
				// check image
				$('<img />').load(function() {
					var $img	= $(this),
					// size of image to be fullscreen and centered
					dim		= getImageDim( $img.attr('src'), hsWrapper ),
					pos		= $img.data( 'pos' );
					
					++loaded;
					// all images loaded
					if( loaded === 1 ) {
						// center the bg image
						centerImage();
						// hide loading status
						$(hsLoading).hide();
						// single init
						SingleInitEvents();
					}
				}).attr( 'src', hsimg.attr('src') );
			});
					
		// single image Init
		SingleInitEvents = function() {
			$( window ).on('resize', function( event ) {
				// update bg image position
				centerImage();
				return false;
			});
		}
		// update position of bg image
		centerImage	= function() {
			hsImgs.each( function(i) {
				var hsimg	= $(this),
				dim			= getImageDim( hsimg.attr('src'), hsWrapper ),
				styleCSS	= {
					width	: dim.width,
					height	: dim.height,
					left	: dim.left,
					top		: dim.top
				};
				hsimg.stop(false,true).css( styleCSS );	
					hsimg.show();
			});
		}
	}

	$.fn.BGSlider = function(element) {
		var hsWrapper = element,
		// speed of the animation
		speed				= 1800,
		// interval between slides
		interval			= 2200+speed,
		// loading status to show while preloading images
		hsLoading		= hsWrapper+' div.hs-loading',
		// container for the bg images and respective canvas
		hsContainer		= hsWrapper+' .hs-container',
		// the nav container
		navContainer	= hsWrapper+' div.hs-nav',
		// the bullets container
		bulletsContainer	= hsWrapper+' div.hs-bullets',
		// total number of bg images
		hsContent			= $(hsContainer).find('.hs-content'),
		// total number of bg images
		hsImgs			= $(hsContainer).find('img.bg'),
		// total number of bg images
		hsSlidesCount	= $(hsImgs).length,
		// slide's content hook
		content			= '.hs-content',
		// current image's index
		current			= 0,
		// control if currently animating
		isAnim			= false,
		slideshowTime;
		
			// mark the first slide as current
			$(hsContent).eq(0).wrap('<div class="outerC"><div class="middleC">').addClass('hs-current');
			// show the content
			hsContent.eq(0).show();
			
			// preload all images
			var loaded = 0;
			hsImgs.each( function(i) {
				var hsimg	= $(hsImgs);
				//create the bullets
				$(bulletsContainer).append('<a href="#"></a>');
				// check image
				$('<img />').load(function() {
					var $img	= $(this),
					// size of image to be fullscreen and centered
					dim		= getImageDim( $img.attr('src'), hsWrapper ),
					pos		= $img.data( 'pos' );
					
					++loaded;
					// all images loaded
					if( loaded === hsSlidesCount ) {					
						// center the bg image
						centerImage();
						// hide loading status
						$(hsLoading).fadeOut(700, function() {
							// initialize events
							initEvents();
							// start slideshow
							startSlideshow();
						});
					}
				}).attr( 'src', hsimg.attr('src') );
			});
		
		// init function
		startSlideshow	= function() {
			clearTimeout(slideshowTime);
			slideshowTime = setTimeout( function() {
				if( !isAnim ) {
					var pos = current;
					( pos < hsSlidesCount - 1 ) ? ++pos : pos = 0;
					// show the bg image
					showImage( pos );
					startSlideshow();
				}
			}, interval );
		},
		// initialize the events
		initEvents = function() {
			$( window ).on('resize', function( event ) {
				// restart slideshow
				startSlideshow();
				// update bg image position
				centerImage();
				return false;
			});
			
			$(bulletsContainer+" a:first").eq(0).addClass('hs-bullets-current');
			
			// clicking on a bullet shows the respective bg image			
			$(bulletsContainer+" a").click(function( event ) {
				var $bullet = $(this),
				pos	= $bullet.index();
				if( !isAnim && pos !== current ) {
					// show the bg image
					showImage( pos );
					// start slideshow
					startSlideshow();
				}
				return false;	
			});					
			
			// clicking on a nav button shows the respective bg image
			$(navContainer+' a').click(function( event ) {
				if( !isAnim ) {
				var tpos = current;
					// show the bg image
					tpos = ($(this).attr("class") === "prev") ? tpos - 1 : tpos + 1;
					( tpos < -1) ? tpos = hsSlidesCount : false;
					( tpos > hsSlidesCount - 1 ) ? tpos = 0 : false;
					showImage( tpos );
					// start slideshow
					startSlideshow();
				}
			});
		},
		// update position of bg image
		centerImage	= function() {
			hsImgs.each( function(i) {
				var hsimg	= $(this),
				dim			= getImageDim( hsimg.attr('src'), hsWrapper ),
				styleCSS	= {
					width	: dim.width,
					height	: dim.height,
					left	: dim.left,
					top		: dim.top
				};
				hsimg.stop(false,true).css( styleCSS );
				if( i === current )	
					hsimg.show();
			});
		},
		// shows & animates the image at position "pos"
		showImage = function( pos ) {
			isAnim = true;
			
			// current image 
			var hsImage	= hsImgs.eq( current ),
			// next image to show
			hsNextImage	= $(hsImgs).eq( pos );
			
			$(bulletsContainer+" a").removeClass('hs-bullets-current').eq(pos).addClass('hs-bullets-current');
			
			// hide content
			hsContent.eq( current ).fadeOut(speed/2, function(){ $(this).unwrap('<div class="outerC"><div class="middleC">'); });
			
			// Change current slide
			$(hsContent).removeClass('hs-current').eq(pos).addClass('hs-current');
			
			// show content
			hsContent.eq( pos ).wrap('<div class="outerC"><div class="middleC">').fadeIn(speed);
			
			//save the pos of next image
			var nimgw = $(hsNextImage).width();
			var nimgh = $(hsNextImage).height();
			var nimgl = parseInt($(hsNextImage).css("left"));
			var nimgt = parseInt($(hsNextImage).css("top"));
			
			// apply css & increase size of next image
			hsNextImage.css( {'z-index': '100', 'display': 'block', 'left': nimgl-(nimgw/10), 'top': nimgt-(nimgh/10), 'width': nimgw+(nimgw/5), 'height': nimgh+(nimgh/5) } );
			
			// hide current image
			hsImage.fadeOut(speed-speed/3);
			
			// animate next image to original size
			hsNextImage.animate( {'left': nimgl, 'top': nimgt, 'width': nimgw, 'height': nimgh }, speed, function() {
				current = pos;
				hsNextImage.css( {'left': nimgl, 'top': nimgt, 'width': nimgw, 'height': nimgh} );
				hsImage.hide();
				$(this).css( 'z-index', 101 );
				isAnim = false;
			});
		};
	}
})( window, jQuery );