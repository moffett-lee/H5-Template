/*!
 * jQuery Cookie Plugin
 * https//github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http//www.opensource.org/licenses/mit-license.php
 * http//www.opensource.org/licenses/GPL-2.0
 */
(function($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
	/*global jQuery,setTimeout,location,setInterval,YT,clearInterval,clearTimeout,pixelentity */
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; (pair = pairs[i] && pairs[i].split('=')); i++) {
            if (decode(pair[0]) === key) {
				return decode(pair[1] || '');
			}
        }
        return null;
    };
}(jQuery));



(function ($) {
	/*jslint undef: false, browser: true, devel: false, eqeqeq: false, bitwise: false, white: false, plusplus: false, regexp: false, nomen: false */ 
	/*global jQuery,setTimeout,location,setInterval,YT,clearInterval,clearTimeout,pixelentity */
	
	$.pixelentity = $.pixelentity || {version: '1.0.0'};
	
	$.pixelentity.pePreviewOptions = {	
		conf: {
			api: false
		} 
	};
	
	
	function PePreviewOptions(target, conf) {
		var overlay,w,style,timer,over = false;
		
		function animate(active) {
			overlay.stop().animate({"margin-left": active ? -10 : 0-w },300,"easeOutQuad");			
		}
		
		function hide() {
			animate(false);
		}

		
		function show(active) {
			if (active) {
				animate(true);
			} else {
				timer = setTimeout(hide,500);
			}
		}

		function evHandler(e) {
			clearTimeout(timer);
			if (e.type === "mouseenter") {
				over = true;
				show(true);
			} else {
				over = false;
				show(false);
			}
		}
		
		function setSkin(skin) {
			if (!skin) {
				return;
			}
			if (!style) {
				style = $('head link[href*="skin"]');
				if (style.length === 0) {
					style=$('<link rel="stylesheet" type="text/css" />');
					$("head").append(style);
				}
			}
			style.attr("href",skin);
			$.cookie("skin", skin, { expires: 7 });
		}

		
		function chooseSkin(e) {
			setSkin(e.currentTarget.href);
			return false;
		}
		
		function makeActive() {
			if (!over) {
				show(false);			
			}
		}

		
		function loaded(sidebar) {
			overlay = $(sidebar);
			target.prepend(overlay);
			overlay = overlay.filter(".pePreviewOptions").fadeTo(0,0);
			w = overlay.outerWidth();
			w = 252;
			overlay.delegate("a","click",chooseSkin);
			if ($.cookie("shown")) {
				overlay.css("margin-left",0-w).fadeTo(200,1);
			} else {
				overlay.fadeTo(200,1);
				$.cookie("shown",1);
			}
			overlay.bind("mouseenter mouseleave",evHandler);
			//overlay.bind("click",evHandler);
			setTimeout(makeActive,1000);
		}

		
		// init function
		function start() {
			if ($.browser.msie && $.browser.version < 9) {
				return;
			}
			setSkin($.cookie("skin"));
			$.get("preview/sidebar.html", null, loaded);
		}
		
		$.extend(this, {
			// plublic API
			destroy: function() {
				target.data("pePreviewOptions", null);
				target = undefined;
			}
		});
		
		// initialize
		start();
	}
	
	// jQuery plugin implementation
	$.fn.pePreviewOptions = function(conf) {
		
		// return existing instance	
		var api = this.data("pePreviewOptions");
		
		if (api) { 
			return api; 
		}
		
		conf = $.extend(true, {}, $.pixelentity.pePreviewOptions.conf, conf);
		
		// install the plugin for each entry in jQuery object
		this.each(function() {
			var el = $(this);
			api = new PePreviewOptions(el, conf);
			el.data("pePreviewOptions", api); 
		});
		
		return conf.api ? api: this;		 
	};
	
}(jQuery));



jQuery(document).ready(function($) {
	$("body").pePreviewOptions();
});