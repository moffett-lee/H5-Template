$(document).ready(function() {
	$('#color-changer-box').styleSwitcher();
});


(function($) {
	$.fn.styleSwitcher = function(options){		
		var defaults = {	
			slidein: true, preview: true, container: this.selector, directory: "css/", useCookie: true, cookieExpires: 30, manageCookieLoad:true	
		};
		var opts = $.extend(defaults, options);
		// if using cookies and using JavaScript to load css
		if (opts.useCookie && opts.manageCookieLoad) {
			// check if css is set in cookie
			var isCookie = readCookie("style_selected")
			if(isCookie){
				var newStyle = opts.directory + isCookie + ".css";
				$("link[id=theme]").attr("href",newStyle);
				baseStyle = newStyle;
			}
			else{
				
			}
		}		
		// if using slidein
		if(opts.slidein){
			$(opts.container).slideDown("slow");
		}
		else{
			$(opts.container).show();
		}
		var baseStyle = $("link[id=theme]").attr("href");
		if(opts.preview){
			$(opts.container + " a").click(
				function () {
					var newStyle = opts.directory + this.id + ".css";
					$("link[id=theme]").attr("href",newStyle);
				}, 
				function () {
					$("link[id=theme]").attr("href",baseStyle);
				}
			);
		}
		
		$(opts.container + " a").click(
			function () {
				var newStyle = opts.directory + this.id + ".css";
				$("link[id=theme]").attr("href",newStyle);
				baseStyle = newStyle;
				if(opts.useCookie){
					createCookie("style_selected",this.id,opts.cookieExpires)
				}
			}
		);
		
	};
	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}	
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}	
	function eraseCookie(name) {
		createCookie(name,"",-1);
	}
})(jQuery);


jQuery(document).ready(function($) {
    
    $(".switcher").css('left', '-225px');
   	
	$(".switcher-trigger").click(function(){
	
        if ($('.switcher').hasClass('closeswitcher')){
			$('.switcher').animate({left:'-225px'}, 500, function(){
				$('.switcher').removeClass('closeswitcher');
			});
		} else {
			$('.switcher').animate({left:0}, 500, function(){
				$('.switcher').addClass('closeswitcher');
			});
		}
		return false;
    
	});
    
    
    $('#switcher-option-layout').change(function() {
    
        var switcheropLayout = $(this).val();
        
        if( switcheropLayout == 'layout-boxed' ) {
            $('body').removeClass('stretched');
        } else if( switcheropLayout == 'layout-full' ) {
            $('body').addClass('stretched');
        }
        
        $(window).resize();
    
    });
    
    
    $('#switcher-option-color li').click(function() {
    
        var switcheropColor = $(this).attr('data-color');
        
        var switcheropLayout = $('#switcher-option-layout').val();
        
        $('#swcolors-css').remove();
        
        $('head').append('<link id="swcolors-css" rel="stylesheet" href="css/colors.php?code=' + switcheropColor + '" type="text/css" />');
    
    });
    
    
    $('#switcher-option-pattern li').click(function() {
    
        var switcherPatternUrl = $(this).attr('data-url');
        
        var switcheropLayout = $('#switcher-option-layout').val();
        
        if( switcheropLayout == 'layout-full' ) {
            alert('Please select Boxed Layout to Preview Patterns.')
        } else {
            $('body').css( 'background-image', 'url("' + switcherPatternUrl + '")');
            $('body').css( 'background-size', 'auto auto');
            $('body').css( 'background-position', '0% 0%');
            $('body').css( 'background-repeat', 'repeat repeat');
        }
    
    });
    
    
    $('#switcher-option-bgimage li').click(function() {
    
        var switcherBgImageUrl = $(this).attr('data-url');
        
        var switcheropLayout = $('#switcher-option-layout').val();
        
        if( switcheropLayout == 'layout-full' ) {
            alert('Please select Boxed Layout to Preview Background Images.')
        } else {
            $('body').css( 'background-image', 'url("' + switcherBgImageUrl + '")');
            $('body').css( 'background-attachment', 'fixed');
            $('body').css( 'background-size', 'cover');
            $('body').css( 'background-position', '50% 50%');
            $('body').css( 'background-repeat', 'no-repeat no-repeat');
        }
    
    });
    
    
    $('#switcher-option-footer a').click(function() {
    
        var switcherFooColor = $(this).attr('data-color');
        
        $('#switcher-option-footer a').removeClass('swfooter-active');
        
        if( switcherFooColor == 'light' ) {
            $('#footer').removeClass('footer-dark');
            $('#copyrights').removeClass('footer-dark');
            $(this).addClass('swfooter-active');
        } else if( switcherFooColor == 'dark' ) {
            $('#footer').addClass('footer-dark');
            $('#copyrights').addClass('footer-dark');
            $(this).addClass('swfooter-active');
        }
        
        return false;
    
    });


});
