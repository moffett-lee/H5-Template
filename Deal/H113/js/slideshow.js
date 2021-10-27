// jQuery Cycle script which powers the Slideshow: http//jquery.malsup.com/cycle/

var $j = jQuery.noConflict();

var $slidespeed = parseInt( meteorslidessettings.meteorslideshowspeed );

var $slidetimeout = parseInt( meteorslidessettings.meteorslideshowduration );

var $slideheight = parseInt( meteorslidessettings.meteorslideshowheight );

var $slidewidth = parseInt( meteorslidessettings.meteorslideshowwidth );

var $slidetransition = meteorslidessettings.meteorslideshowtransition;

$j(document).ready(function() {
	
	$j('.meteor-nav a,.slides').css('height', $slideheight);
		
	$j('.slide,.meteor-nav').css('width', $slidewidth);
	
	$j('.slides').css('overflow', 'visible');
		
	$j(".meteor-slides").hover(function() {
	
		$j("ul.meteor-nav").css('display', 'block');
		
	}, function() {
	
		$j("ul.meteor-nav").css('display', 'none');
		
	});
	
    $j('.slides').cycle({
	
		height: $slideheight,
		width: $slidewidth,
		fit: '1',
		fx: $slidetransition,
		speed: $slidespeed,
		timeout: $slidetimeout,
		pause: '1',
		prev:   '.prev', 
		next:   '.next',
		pager:  '.meteor-buttons', 
		pagerEvent: 'click'
		
	});

});