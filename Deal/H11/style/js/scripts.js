/*-----------------------------------------------------------------------------------*/
/*	RETINA.JS
/*-----------------------------------------------------------------------------------*/
(function() {
	function t(e) {
		this.path = e;
		var t = this.path.split("."),
			n = t.slice(0, t.length - 1).join("."),
			r = t[t.length - 1];
		this.at_2x_path = n + "@2x." + r
	}

	function n(e) {
		this.el = e, this.path = new t(this.el.getAttribute("src"));
		var n = this;
		this.path.check_2x_variant(function(e) {
			e && n.swap()
		})
	}
	var e = typeof exports == "undefined" ? window : exports;
	e.RetinaImagePath = t, t.confirmed_paths = [], t.prototype.is_external = function() {
		return !!this.path.match(/^https?\:/i) && !this.path.match("//" + document.domain)
	}, t.prototype.check_2x_variant = function(e) {
		var n, r = this;
		if (this.is_external()) return e(!1);
		if (this.at_2x_path in t.confirmed_paths) return e(!0);
		n = new XMLHttpRequest, n.open("HEAD", this.at_2x_path), n.onreadystatechange = function() {
			return n.readyState != 4 ? e(!1) : n.status >= 200 && n.status <= 399 ? (t.confirmed_paths.push(r.at_2x_path), e(!0)) : e(!1)
		}, n.send()
	}, e.RetinaImage = n, n.prototype.swap = function(e) {
		function n() {
			t.el.complete ? (t.el.setAttribute("width", t.el.offsetWidth), t.el.setAttribute("height", t.el.offsetHeight), t.el.setAttribute("src", e)) : setTimeout(n, 5)
		}
		typeof e == "undefined" && (e = this.path.at_2x_path);
		var t = this;
		n()
	}, e.devicePixelRatio > 1 && (window.onload = function() {
		var e = document.getElementsByTagName("img"),
			t = [],
			r, i;
		for (r = 0; r < e.length; r++) i = e[r], t.push(new n(i))
	})
})(); 
/*-----------------------------------------------------------------------------------*/
/*	FANCYBOX
/*-----------------------------------------------------------------------------------*/
$(document).ready(function() {
	$('.fancybox-media').attr('rel', 'media-gallery').fancybox({
		arrows: true,
		padding: 10,
		closeBtn: true,
		openEffect: 'fade',
		closeEffect: 'fade',
		prevEffect: 'fade',
		nextEffect: 'fade',
		helpers: {
			media: {},
			buttons: false,
			thumbs: {
				width: 50,
				height: 50
			},
			title: {
				type: 'outside'
			}
		},
		beforeLoad: function() {
			var el, id = $(this.element).data('title-id');
			if (id) {
				el = $('#' + id);
				if (el.length) {
					this.title = el.html();
				}
			}
		}
	});
}); 
/*-----------------------------------------------------------------------------------*/
/*	SLIDER
/*-----------------------------------------------------------------------------------*/
$(document).ready(function() {
	if ($.fn.cssOriginal != undefined) $.fn.css = $.fn.cssOriginal;
	$('.banner').revolution({
		delay: 9000,
		startheight: 550,
		startwidth: 1120,
		hideThumbs: 200,
		thumbWidth: 100,
		// Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
		thumbHeight: 50,
		thumbAmount: 5,
		navigationType: "bullet",
		// bullet, thumb, none
		navigationArrows: "verticalcentered",
		// nexttobullets, solo (old name verticalcentered), none
		navigationStyle: "round",
		// round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item), custom
		navigationHAlign: "center",
		// Vertical Align top,center,bottom
		navigationVAlign: "bottom",
		// Horizontal Align left,center,right
		navigationHOffset: 0,
		navigationVOffset: 20,
		soloArrowLeftHalign: "left",
		soloArrowLeftValign: "center",
		soloArrowLeftHOffset: 20,
		soloArrowLeftVOffset: 0,
		soloArrowRightHalign: "right",
		soloArrowRightValign: "center",
		soloArrowRightHOffset: 20,
		soloArrowRightVOffset: 0,
		touchenabled: "on",
		// Enable Swipe Function : on/off
		onHoverStop: "on",
		// Stop Banner Timet at Hover on Slide on/off
		stopAtSlide: -1,
		// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
		stopAfterLoops: -1,
		// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic
		hideCaptionAtLimit: 0,
		// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
		hideAllCaptionAtLilmit: 0,
		// Hide all The Captions if Width of Browser is less then this value
		hideSliderAtLimit: 0,
		// Hide the whole slider, and stop also functions if Width of Browser is less than this value
		shadow: 0,
		//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
		fullWidth: "off" // Turns On or Off the Fullwidth Image Centering in FullWidth Modus
	});
	$('.portfoliohalf-banner').revolution({
		delay: 9000,
		startheight: 450,
		startwidth: 700,
		hideThumbs: 200,
		thumbWidth: 100,
		// Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
		thumbHeight: 50,
		thumbAmount: 5,
		navigationType: "bullet",
		// bullet, thumb, none
		navigationArrows: "verticalcentered",
		// nexttobullets, solo (old name verticalcentered), none
		navigationStyle: "round",
		// round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item), custom
		navigationHAlign: "center",
		// Vertical Align top,center,bottom
		navigationVAlign: "bottom",
		// Horizontal Align left,center,right
		navigationHOffset: 0,
		navigationVOffset: 20,
		soloArrowLeftHalign: "left",
		soloArrowLeftValign: "center",
		soloArrowLeftHOffset: 20,
		soloArrowLeftVOffset: 0,
		soloArrowRightHalign: "right",
		soloArrowRightValign: "center",
		soloArrowRightHOffset: 20,
		soloArrowRightVOffset: 0,
		touchenabled: "on",
		// Enable Swipe Function : on/off
		onHoverStop: "on",
		// Stop Banner Timet at Hover on Slide on/off
		stopAtSlide: -1,
		// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
		stopAfterLoops: -1,
		// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic
		hideCaptionAtLimit: 0,
		// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
		hideAllCaptionAtLilmit: 0,
		// Hide all The Captions if Width of Browser is less then this value
		hideSliderAtLimit: 0,
		// Hide the whole slider, and stop also functions if Width of Browser is less than this value
		shadow: 0,
		//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
		fullWidth: "off" // Turns On or Off the Fullwidth Image Centering in FullWidth Modus
	});
	$('.portfoliowide-banner').revolution({
		delay: 9000,
		startheight: 550,
		startwidth: 1020,
		hideThumbs: 200,
		thumbWidth: 100,
		// Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
		thumbHeight: 50,
		thumbAmount: 5,
		navigationType: "bullet",
		// bullet, thumb, none
		navigationArrows: "verticalcentered",
		// nexttobullets, solo (old name verticalcentered), none
		navigationStyle: "round",
		// round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item), custom
		navigationHAlign: "center",
		// Vertical Align top,center,bottom
		navigationVAlign: "bottom",
		// Horizontal Align left,center,right
		navigationHOffset: 0,
		navigationVOffset: 20,
		soloArrowLeftHalign: "left",
		soloArrowLeftValign: "center",
		soloArrowLeftHOffset: 20,
		soloArrowLeftVOffset: 0,
		soloArrowRightHalign: "right",
		soloArrowRightValign: "center",
		soloArrowRightHOffset: 20,
		soloArrowRightVOffset: 0,
		touchenabled: "on",
		// Enable Swipe Function : on/off
		onHoverStop: "on",
		// Stop Banner Timet at Hover on Slide on/off
		stopAtSlide: -1,
		// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
		stopAfterLoops: -1,
		// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic
		hideCaptionAtLimit: 0,
		// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
		hideAllCaptionAtLilmit: 0,
		// Hide all The Captions if Width of Browser is less then this value
		hideSliderAtLimit: 0,
		// Hide the whole slider, and stop also functions if Width of Browser is less than this value
		shadow: 0,
		//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
		fullWidth: "off" // Turns On or Off the Fullwidth Image Centering in FullWidth Modus
	});
	$('.project1, .project2, .project3, .project4').each(function() {
		jQuery(this).revolution({
			delay: 9000,
			startheight: 450,
			startwidth: 700,
			hideThumbs: 200,
			thumbWidth: 100,
			// Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
			thumbHeight: 50,
			thumbAmount: 5,
			navigationType: "bullet",
			// bullet, thumb, none
			navigationArrows: "verticalcentered",
			// nexttobullets, solo (old name verticalcentered), none
			navigationStyle: "round",
			// round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item), custom
			navigationHAlign: "center",
			// Vertical Align top,center,bottom
			navigationVAlign: "bottom",
			// Horizontal Align left,center,right
			navigationHOffset: 0,
			navigationVOffset: 20,
			soloArrowLeftHalign: "left",
			soloArrowLeftValign: "center",
			soloArrowLeftHOffset: 20,
			soloArrowLeftVOffset: 0,
			soloArrowRightHalign: "right",
			soloArrowRightValign: "center",
			soloArrowRightHOffset: 20,
			soloArrowRightVOffset: 0,
			touchenabled: "on",
			// Enable Swipe Function : on/off
			onHoverStop: "on",
			// Stop Banner Timet at Hover on Slide on/off
			stopAtSlide: -1,
			// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
			stopAfterLoops: -1,
			// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic
			hideCaptionAtLimit: 0,
			// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
			hideAllCaptionAtLilmit: 0,
			// Hide all The Captions if Width of Browser is less then this value
			hideSliderAtLimit: 0,
			// Hide the whole slider, and stop also functions if Width of Browser is less than this value
			shadow: 0,
			//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
			fullWidth: "off" // Turns On or Off the Fullwidth Image Centering in FullWidth Modus
		});
	});
}); /*-----------------------------------------------------------------------------------*/
/*	ISOTOPE PORTFOLIO
/*-----------------------------------------------------------------------------------*/
$(window).load(function() {
	var $container = $('#portfolio .items');
	$container.imagesLoaded(function() {
		$container.isotope({
			itemSelector: '.item',
			layoutMode: 'fitRows'
		});
	});
	$('.filter li a').click(function() {
		$('.filter li a').removeClass('active');
		$(this).addClass('active');
		var selector = $(this).attr('data-filter');
		$container.isotope({
			filter: selector
		});
		return false;
	});
}); 
/*-----------------------------------------------------------------------------------*/
/*	FORM
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function($) {
	$('.forms').dcSlickForms();
});
$(document).ready(function() {
	$('.comment-form input[title], .comment-form textarea').each(function() {
		if ($(this).val() === '') {
			$(this).val($(this).attr('title'));
		}
		$(this).focus(function() {
			if ($(this).val() == $(this).attr('title')) {
				$(this).val('').addClass('focused');
			}
		});
		$(this).blur(function() {
			if ($(this).val() === '') {
				$(this).val($(this).attr('title')).removeClass('focused');
			}
		});
	});
}); 
/*-----------------------------------------------------------------------------------*/
/*	TWITTER
/*-----------------------------------------------------------------------------------*/
getTwitters('twitter', {
	id: 'elemisdesign',
	count: 2,
	enableLinks: true,
	ignoreReplies: false,
	template: '<span class="twitterPrefix"><span class="twitterStatus">%text%</span><em class="twitterTime"><a href="http//twitter.com/%user_screen_name%/statuses/%id_str%">%time%</a></em>',
	newwindow: true
}); 
/*-----------------------------------------------------------------------------------*/
/*	TABS
/*-----------------------------------------------------------------------------------*/
$(document).ready(function() {
	$('.tabs').easytabs({
		animationSpeed: 300,
		updateHash: false
	});
}); 
/*-----------------------------------------------------------------------------------*/
/*	TESTIMONIALS
/*-----------------------------------------------------------------------------------*/
$(document).ready(function() {
	$('#testimonials').easytabs({
		animationSpeed: 500,
		updateHash: false,
		cycle: 5000
	});
}); 
/*-----------------------------------------------------------------------------------*/
/*	TOGGLE
/*-----------------------------------------------------------------------------------*/
$(document).ready(function() {
	//Hide the tooglebox when page load
	$(".togglebox").hide();
	//slide up and down when click over heading 2
	$("h4").click(function() {
		// slide toggle effect set to slow you can set it to fast too.
		$(this).toggleClass("active").next(".togglebox").slideToggle("slow");
		return true;
	});
}); 
/*-----------------------------------------------------------------------------------*/
/*	VIDEO
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function() {
	jQuery('.video').fitVids();
}); 
/*-----------------------------------------------------------------------------------*/
/*	IMAGE HOVER
/*-----------------------------------------------------------------------------------*/
$(document).ready(function() {
	$('.overlay a').prepend('<span class="more"></span>');
});
$(document).ready(function() {
	$('.overlay').mouseenter(function(e) {
		$(this).children('a').children('span').fadeIn(300);
	}).mouseleave(function(e) {
		$(this).children('a').children('span').fadeOut(200);
	});
}); 
/*-----------------------------------------------------------------------------------*/
/*	SELECTNAV
/*-----------------------------------------------------------------------------------*/
$(document).ready(function() {
	selectnav('tiny', {
		label: '--- Navigation --- ',
		indent: '-'
	});
}); 
/*-----------------------------------------------------------------------------------*/
/*	HOVER OPACITY
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function($) {
	$("ul.client-list li").css("opacity", "0.70");
	$("ul.client-list li").hover(function() {
		$(this).stop().animate({
			opacity: 1.0
		}, "fast");
	}, function() {
		$(this).stop().animate({
			opacity: 0.70
		}, "fast");
	});
}); 
/*-----------------------------------------------------------------------------------*/
/*	MENU
/*-----------------------------------------------------------------------------------*/
ddsmoothmenu.init({
	mainmenuid: "menu",
	orientation: 'h',
	classname: 'menu',
	contentsource: "markup"
})