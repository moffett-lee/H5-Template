if($.browser.mozilla||$.browser.opera){document.removeEventListener("DOMContentLoaded",$.ready,false);document.addEventListener("DOMContentLoaded",function(){$.ready()},false)}$.event.remove(window,"load",$.ready);$.event.add( window,"load",function(){$.ready()});$.extend({includeStates:{},include:function(url,callback,dependency){if(typeof callback!='function'&&!dependency){dependency=callback;callback=null}url=url.replace('\n','');$.includeStates[url]=false;var script=document.createElement('script');script.type='text/javascript';script.onload=function(){$.includeStates[url]=true;if(callback)callback.call(script)};script.onreadystatechange=function(){if(this.readyState!="complete"&&this.readyState!="loaded")return;$.includeStates[url]=true;if(callback)callback.call(script)};script.src=url;if(dependency){if(dependency.constructor!=Array)dependency=[dependency];setTimeout(function(){var valid=true;$.each(dependency,function(k,v){if(!v()){valid=false;return false}});if(valid)document.getElementsByTagName('head')[0].appendChild(script);else setTimeout(arguments.callee,10)},10)}else document.getElementsByTagName('head')[0].appendChild(script);return function(){return $.includeStates[url]}},readyOld:$.ready,ready:function(){if($.isReady) return;imReady=true;$.each($.includeStates,function(url,state){if(!state)return imReady=false});if(imReady){$.readyOld.apply($,arguments)}else{setTimeout(arguments.callee,10)}}});
$.include('js/jquery.easing.1.3.js')
/*======= Navigation =======*/
$.include('js/jquery.responsivemenu.js')
$.include('js/superfish.js')
$.include('js/nav-small.js')
/*======= Sliders =======*/
$.include('js/jquery.flexslider-min.js')
$.include('js/jquery.elastislide.js')
/*======= Responsive Script =======*/
$.include('js/script.js')
/*======= Form =======*/
$.include('js/forms.js')
/*======= Hover Effect =======*/
$.include('js/hover.js')
$.include('js/hover-image.js')
/*======= Tooltip =======*/
$.include('js/jquery.tipsy.js')
$.include('js/jquery.ui.totop.js')
/*======= PrettyPhoto =======*/
$.include('js/jquery.prettyPhoto.js')
/*======= Fancybox =======*/
$.include('js/jquery.fancybox-1.3.4.js')
/*======= Portfolio =======*/
$.include('js/jquery.quicksand.js')
$.include('js/filter_setting.js')
/*======= Accordion =======*/
$.include('js/accordion.js')
/*======= Tabs =======*/
$.include('js/tabs.js')
$.include('js/addthis.widget.js')
/*======= Flickr =======*/
$.include('js/flickrfeed.min.js')
$.include('js/flickrsetup.js')

/*=========================================================================
 Flex Slider
========================================================================= */

$(function(){$('.flexslider .slides > li').addClass('dnone');$('.flexslider').flexslider({animation:"fade",slideshow:true,slideshowSpeed:7000,animationDuration:600,prevText:"Previous",nextText:"Next",controlNav:true,})}) 

/*=========================================================================
 Feature box Fade effect
========================================================================= */

jQuery(".features").delegate(".features ul li li", "mouseout mouseover", function(m) {
	if (m.type == 'mouseover') {
		jQuery(".features ul li li").not(this).dequeue().animate({opacity: 0.3}, 400);
	} else {
		jQuery(".features ul li li").not(this).dequeue().animate({opacity: 1}, 400);}
});

/*=========================================================================
 Flickr Fade effect
========================================================================= */

jQuery(".flickr").delegate("#fbox li a img", "mouseout mouseover", function(m) {
	if (m.type == 'mouseover') {
		jQuery("#fbox li a img").not(this).dequeue().animate({opacity: 0.5}, 400);
	} else {
		jQuery("#fbox li a img").not(this).dequeue().animate({opacity: 1}, 400);}
});

/*=========================================================================
 prettyPhoto
========================================================================= */

		$(function(){
			//	Initialize Pretty Photo
			$("a[data-gal^='prettyPhoto']").prettyPhoto({theme:'facebook'});	
		})
		
/*=========================================================================
 Social icon Tooltip
========================================================================= */

	$(function() {    
		$('.sociable li a img').tipsy({gravity: 's'});		
	});

/*=========================================================================
 Accordion
========================================================================= */

jQuery().ready(function(){
		jQuery('#accordion').accordion({
			autoheight: false
		});
	});

/*=========================================================================
 Close Message box
========================================================================= */

$('.message-box').find('.closemsg').click(function() {
        $(this).parent('.message-box').slideUp(500);
    });

/*=========================================================================
 Tweets
========================================================================= */

    function urlToLink(text) {
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(exp, "<a href='$1'>$1</a>");
    }
    function relTime(time_value) {
        time_value = time_value.replace(/(\+[0-9]{4}\s)/ig, "");
        var parsed_date = Date.parse(time_value);
        var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
        var timeago = parseInt((relative_to.getTime() - parsed_date) / 1000);
        if (timeago < 60) return 'less than a minute ago';
        else if (timeago < 120) return 'about a minute ago';
        else if (timeago < (45 * 60)) return (parseInt(timeago / 60)).toString() + ' minutes ago';
        else if (timeago < (90 * 60)) return 'about an hour ago';
        else if (timeago < (24 * 60 * 60)) return 'about ' + (parseInt(timeago / 3600)).toString() + ' hours ago';
        else if (timeago < (48 * 60 * 60)) return '1 day ago';
        else return (parseInt(timeago / 86400)).toString() + ' days ago';
    }

    $('#tweet-list').hide();
    var user = 'envato'; // Set your twitter id
    var count = '3'; // How many feeds do you want. Recommended Max 10 Twitter Api

    $.getJSON('../../../../twitter.com/statuses/user_timeline.json@screen_name=' + user + '&count=' + count + '&callback=?',
    function(tweetdata) {
        var tl = $("#tweet-list");
        $.each(tweetdata,
        function(i, tweet) {
            tl.append("<li>&ldquo;" + urlToLink(tweet.text) + "&rdquo;&ndash; " + relTime(tweet.created_at) + "</li>");
        });
    });

    setTimeout(function() {
        $('.tweets p').hide();
        $('#tweet-list').show();

    },
    1000);

/*=========================================================================
 Blog Addthis Widet
========================================================================= */

$(function() {    
var addthis_config = {"data_track_addressbar":true};
    });


/*=========================================================================
 Caption portfolio hover
========================================================================= */

/* ---- Portfolio 4 column --- */

			$('.portfolio-4column li').hover(function(){
				$(".cover", this).stop().animate({bottom:'5px'},{queue:false,duration:580});
			}, function() {
				$(".cover", this).stop().animate({bottom:'-70px'},{queue:false,duration:580});
			});

/* ---- Portfolio 3 column --- */

			$('.portfolio-3column li').hover(function(){
				$(".cover", this).stop().animate({bottom:'4px'},{queue:false,duration:580});
			}, function() {
				$(".cover", this).stop().animate({bottom:'-115px'},{queue:false,duration:580});
			});
	
/* ---- Portfolio 2 column --- */
	
			$('.portfolio-2column li').hover(function(){
				$(".cover", this).stop().animate({bottom:'-28px'},{queue:false,duration:580});
			}, function() {
				$(".cover", this).stop().animate({bottom:'-147px'},{queue:false,duration:580});
			});

