jQuery(document).ready(function ($) {

	/* Superfish
       ================================================== */
	jQuery('ul.sf-menu').superfish({
		animation:	{height:'toggle'},   // an object equivalent to first parameter of jQuery’s .animate() method 
		speed:		'normal',           // speed of the animation. Equivalent to second parameter of jQuery’s .animate() method
		delay:		100,
		autoArrows:	false               // if true, arrow mark-up generated automatically = cleaner source code at expense of initialisatio
	});
	
	/* Dropdown Nav For Mobiles
       ================================================== */
	jQuery(document).ready(function($) {
		// Create the dropdown base
		$("<select />").appendTo("nav");
		// Create default option "Go to..."
		$("<option />", {
			"selected": "active",
			"value"   : "",
			"text"    : "Go to..."
		}).appendTo("nav select");
	
		// Populate dropdown with menu items
		$("nav a").each(function() {
			var el = $(this);
			$("<option />", {
				"value"   : el.attr("href"),
				"text"    : el.text()
		 	}).appendTo("nav select");
		 	var cu = "nav select option:last-child";
		 	$(el).parents("nav ul li li").each(function(){
				$(cu).text("- "+$(cu).text());
		 	});
		});
	
		$("nav select").change(function() {
			window.location = $(this).find("option:selected").val();
		});
	});
	
	/* Orbit
       ================================================== */
	$('.slider').orbit({
		 animation: 'vertical-push',// fade, horizontal-slide, vertical-slide, horizontal-push
		 animationSpeed: 600,		// how fast animtions are
		 timer: true,				// true or false to have the timer
		 advanceSpeed: 4000,		// if timer is enabled, time between transitions 
		 directionalNav: true,		// manual advancing directional navs
		 captions: true,			// do you want captions?
		 captionAnimation: 'fade',	// fade, slideOpen, none
		 captionAnimationSpeed: 600,// if so how quickly should they animate in
		 bullets: true,				// true or false to activate the bullet navigation
		 bulletThumbs: false,		// thumbnails for the bullets
		 fluid: true				// or set a aspect ratio for content slides (ex: '4x3') 
	});
	
	/* Icon Hovers
       ================================================== */
	jQuery(document).ready(function($) {  
		$('.transparency').each(function() {
			$(this).hover(
				function() {
					$(this).stop().animate({ opacity: 0.2 }, 200);
				},
			   function() {
				   $(this).stop().animate({ opacity: 1.0 }, 200);
			})
		});
	});

	/* jtwt
       ================================================== */
	jQuery(document).ready(function($) { 
		$('#tweets').jtwt({
			image_size : 20,  		// The size of your avatar. 0 means "no avatar". Recommend of 0 or 20, default is 48.
			count : 2,  			// # of tweets displaying
			username: 'envato', 	// enter your username here
			convert_links : 1, 		// Choose if the links and replies in your tweets to be converted in clickable links. 0 means no, 1 means yes
			loader_text : 'Loading new tweets...'		// The text which be displayed by loading the tweets.
		});   
	});	

	/* Flickr
       ================================================== */
	jQuery(document).ready(function($) {
		// Our jQuery JSON fucntion call to Flickr, gets details of the most recent images			   
		$.getJSON("http//api.flickr.com/services/feeds/photos_public.gne?id=26983529@N07&lang=en-us&format=json&jsoncallback=?", displayImages); //YOUR FLICKR IDGETTR URL HERE
		function displayImages(data) {
			var iStart = Math.floor(Math.random()*(0));
			var iCount = 1;
			var htmlString = "<ul>";
			$.each(data.items, function(i,item){
				// Let's only display 6 photos (a 2x3 grid), starting from a the first point in the feed				
				if (iCount > iStart && iCount < (iStart + 10)) {
					var sourceSquare = (item.media.m).replace("_m.jpg", "_s.jpg");		
					htmlString += '<li><a href="' + item.link + '" target="_blank">';
					htmlString += '<img src="' + sourceSquare + '" alt="' + item.title + '" title="' + item.title + '"/>';
					htmlString += '</a></li>';
				}
				iCount++;
			});
		$('#flickr').html(htmlString + "</ul>");
		}
	});

	jQuery(document).ready(function($) {  
		$('.transparency').each(function() {
			$(this).hover(
				function() {
					$(this).stop().animate({ opacity: 0.4 }, 200);
				},
				function() {
				   $(this).stop().animate({ opacity: 1.0 }, 300);
				})
			});
	});

	/* Tabs
       ================================================== */
	function activateTab($tab) {
		var $activeTab = $tab.closest('dl').find('a.active'),
				contentLocation = $tab.attr("href") + 'Tab';
				
		// Strip off the current url that IE adds
		contentLocation = contentLocation.replace(/^.+#/, '#');

		//Make Tab Active
		$activeTab.removeClass('active');
		$tab.addClass('active');

    	//Show Tab Content
		$(contentLocation).closest('.tabs-content').children('li').hide();
		$(contentLocation).css('display', 'block');
	}

	$('dl.tabs').each(function () {
		//Get all tabs
		var tabs = $(this).children('dd').children('a');
		tabs.click(function (e) {
			activateTab($(this));
		});
	});

	if (window.location.hash) {
		activateTab($('a[href="' + window.location.hash + '"]'));
		$.foundation.customForms.appendCustomMarkup();
	}

	/* ALERT BOXES ------------ */
	$(".alert-box").delegate("a.close", "click", function(event) {
    event.preventDefault();
	  $(this).closest(".alert-box").fadeOut(function(event){
	    $(this).remove();
	  });
	});

	/* PLACEHOLDER FOR FORMS ------------- */
	$('input, textarea').placeholder();

	/* TOOLTIPS ------------ */
	$(this).tooltips();
	
	/* Block Grids For IE/7/8. */
	$('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'left'});
	$('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'left'});
	$('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'left'});
	$('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'left'});
	
    $('.block-grid.two-up>div.block:nth-child(2n+1)').css({clear: 'left'});
    $('.block-grid.three-up>div.block:nth-child(3n+1)').css({clear: 'left'});
    $('.block-grid.four-up>div.block:nth-child(4n+1)').css({clear: 'left'});
    $('.block-grid.five-up>div.block:nth-child(5n+1)').css({clear: 'left'});

	/* Dropdown Nav
       ================================================== */
	var lockNavBar = false;
	$('.nav-bar a.flyout-toggle').live('click', function(e) {
		e.preventDefault();
		var flyout = $(this).siblings('.flyout');
		if (lockNavBar === false) {
			$('.nav-bar .flyout').not(flyout).slideUp(500);
			flyout.slideToggle(500, function(){
				lockNavBar = false;
			});
		}
		lockNavBar = true;
	});
  if (Modernizr.touch) {
    $('.nav-bar>li.has-flyout>a.main').css({
      'padding-right' : '75px'
    });
    $('.nav-bar>li.has-flyout>a.flyout-toggle').css({
      'border-left' : '1px dashed #eee'
    });
  } else {
    $('.nav-bar>li.has-flyout').hover(function() {
      $(this).children('.flyout').show();
    }, function() {
      $(this).children('.flyout').hide();
    })
  }

});