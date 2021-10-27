/*
* debouncedresize: special jQuery event that happens once after a window resize
*
* latest version and complete README available on Github:
* https//github.com/louisremi/jquery-smartresize/blob/master/jquery.debouncedresize.js
*
* Copyright 2011 @louis_remi
* Licensed under the MIT license.
*/
var $event = $.event,
$special,
resizeTimeout;

$special = $event.special.debouncedresize = {
	setup: function() {
		$( this ).on( "resize", $special.handler );
	},
	teardown: function() {
		$( this ).off( "resize", $special.handler );
	},
	handler: function( event, execAsap ) {
		// Save the context
		var context = this,
			args = arguments,
			dispatch = function() {
				// set correct event type
				event.type = "debouncedresize";
				$event.dispatch.apply( context, args );
			};

		if ( resizeTimeout ) {
			clearTimeout( resizeTimeout );
		}

		execAsap ?
			dispatch() :
			resizeTimeout = setTimeout( dispatch, $special.threshold );
	},
	threshold: 50
};

var Boxgrid = (function() {

	var $items = $( '#rb-grid > li' ),
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		// transition end event name
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		// window and body elements
		$window = $( window ),
		$body = $( 'BODY' ),
		// transitions support
		supportTransitions = Modernizr.csstransitions,
		// current item's index
		current = -1,
		// window width and height
		winsize = getWindowSize();

	function init( options ) {		
		// apply fittext plugin
		$items.find( 'div.rb-week > div span' ).fitText( 0.3 ).end().find( 'span.rb-city' ).fitText( 0.5 );
		initEvents();
	}

	function initEvents() {
		
		$items.each( function() {

			var $item = $( this ),
				$close = $item.find( 'span.rb-close' ),
				$overlay = $item.children( 'div.rb-overlay' );

			$item.on( 'click', function() {

				if( $item.data( 'isExpanded' ) ) {
					return false;
				}
				$item.data( 'isExpanded', true );
				// save current item's index
				current = $item.index();

				var layoutProp = getItemLayoutProp( $item ),
					clipPropFirst = 'rect(' + layoutProp.top + 'px ' + ( layoutProp.left + layoutProp.width ) + 'px ' + ( layoutProp.top + layoutProp.height ) + 'px ' + layoutProp.left + 'px)',
					clipPropLast = 'rect(0px ' + winsize.width + 'px ' + winsize.height + 'px 0px)';

				$overlay.css( {
					clip : supportTransitions ? clipPropFirst : clipPropLast,
					opacity : 1,
					zIndex: 9999,
					pointerEvents : 'auto'
				} );

				if( supportTransitions ) {
					$overlay.on( transEndEventName, function() {

						$overlay.off( transEndEventName );

						setTimeout( function() {
							$overlay.css( 'clip', clipPropLast ).on( transEndEventName, function() {
								$overlay.off( transEndEventName );
								$body.css( 'overflow-y', 'hidden' );
							} );
						}, 25 );

					} );
				}
				else {
					$body.css( 'overflow-y', 'hidden' );
				}

			} );

			$close.on( 'click', function() {

				$body.css( 'overflow-y', 'auto' );

				var layoutProp = getItemLayoutProp( $item ),
					clipPropFirst = 'rect(' + layoutProp.top + 'px ' + ( layoutProp.left + layoutProp.width ) + 'px ' + ( layoutProp.top + layoutProp.height ) + 'px ' + layoutProp.left + 'px)',
					clipPropLast = 'auto';

				// reset current
				current = -1;

				$overlay.css( {
					clip : supportTransitions ? clipPropFirst : clipPropLast,
					opacity : supportTransitions ? 1 : 0,
					pointerEvents : 'none'
				} );

				if( supportTransitions ) {
					$overlay.on( transEndEventName, function() {

						$overlay.off( transEndEventName );
						setTimeout( function() {
							$overlay.css( 'opacity', 0 ).on( transEndEventName, function() {
								$overlay.off( transEndEventName ).css( { clip : clipPropLast, zIndex: -1 } );
								$item.data( 'isExpanded', false );
							} );
						}, 25 );

					} );
				}
				else {
					$overlay.css( 'z-index', -1 );
					$item.data( 'isExpanded', false );
				}

				return false;

			} );

		} );

		$( window ).on( 'debouncedresize', function() { 
			winsize = getWindowSize();
			// todo : cache the current item
			if( current !== -1 ) {
				$items.eq( current ).children( 'div.rb-overlay' ).css( 'clip', 'rect(0px ' + winsize.width + 'px ' + winsize.height + 'px 0px)' );
			}
		} );

	}

	function getItemLayoutProp( $item ) {
		
		var scrollT = $window.scrollTop(),
			scrollL = $window.scrollLeft(),
			itemOffset = $item.offset();

		return {
			left : itemOffset.left - scrollL,
			top : itemOffset.top - scrollT,
			width : $item.outerWidth(),
			height : $item.outerHeight()
		};

	}

	function getWindowSize() {
		$body.css( 'overflow-y', 'hidden' );
		var w = $window.width(), h =  $window.height();
		if( current === -1 ) {
			$body.css( 'overflow-y', 'auto' );
		}
		return { width : w, height : h };
	}

	return { init : init };

})();