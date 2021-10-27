(function() {

	'use strict';

	// some dummy data to play with..
	var allImages = {
		page1 : ['<a href="#"><img src="images/feat1.jpg" alt="img01"/></a>','<a href="#"><img src="images/feat2.jpg" alt="img02"/></a>','<a href="#"><img src="images/feat3.jpg" alt="img03"/></a>','<a href="#"><img src="images/feat4.jpg" alt="img04"/></a>','<a href="#"><img src="images/feat5.jpg" alt="img05"/></a>','<a href="#"><img src="images/feat6.jpg" alt="img06"/></a>'],
		page2 : ['<a href="#"><img src="images/feat7.jpg" alt="img07"/></a>','<a href="#"><img src="images/feat8.jpg" alt="img08"/></a>','<a href="#"><img src="images/feat9.jpg" alt="img09"/></a>','<a href="#"><img src="images/feat10.jpg" alt="img10"/></a>','<a href="#"><img src="images/feat11.jpg" alt="img11"/></a>','<a href="#"><img src="images/feat12.jpg" alt="img12"/></a>'],
		page3 : ['<a href="#"><img src="images/feat13.jpg" alt="img013"/></a>','<a href="#"><img src="images/feat14.jpg" alt="img14"/></a>','<a href="#"><img src="images/feat15.jpg" alt="img15"/></a>','<a href="#"><img src="images/feat16.jpg" alt="img16"/></a>','<a href="#"><img src="images/feat17.jpg" alt="img17"/></a>','<a href="#"><img src="images/feat18.jpg" alt="img18"/></a>'],
		page4 : ['<a href="#"><img src="images/feat19.jpg" alt="img19"/></a>','<a href="#"><img src="images/feat20.jpg" alt="img20"/></a>']
	};

	// http//coveroverflow.com/a/11381730/989439
	function mobilecheck() {
		var check = false;
		(function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	}

	var animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		// event type (if mobile use touch events)
		eventtype = mobilecheck() ? 'touchstart' : 'click',
		// support for css animations
		support = Modernizr.cssanimations;

	function onAnimationEnd( elems, len, callback ) {
		var finished = 0,
			onEndFn = function() {
				this.removeEventListener( animEndEventName, onEndFn );
				++finished;
				if( finished === len ) {
					callback.call();
				}
			};

		elems.forEach( function( el,i ) { el.querySelector('a').addEventListener( animEndEventName, onEndFn ); } );
	}

	function init() {
		[].forEach.call( document.querySelectorAll( '.tt-grid-wrapper' ), function( el ) {

			var grid = el.querySelector( '.tt-grid' ),
				items = [].slice.call( grid.querySelectorAll( 'li' ) ),
				navDots = [].slice.call( el.querySelectorAll( 'nav > a' ) ),
				isAnimating = false,
				current = 0;

			navDots.forEach( function( el, i ) {
				el.addEventListener( eventtype, function( ev ) {
					if( isAnimating || current === i ) return false;
					ev.preventDefault();
					isAnimating = true;
					updateCurrent( i );
					loadNewSet( i );
				} );
			} );

			function updateCurrent( set ) {
				classie.remove( navDots[ current ], 'tt-current' );
				classie.add( navDots[ set ], 'tt-current' );
				current = set;
			}

			// this is just a way we can test this. You would probably get your images with an AJAX request...
			function loadNewSet( set ) {
				var newImages = allImages.page1;
				switch( set ) {
					case 1 : newImages = allImages.page2; break;
					case 2 : newImages = allImages.page3; break;
					case 3 : newImages = allImages.page4; break;
					default : newImages = allImages.page1; break;
				};

				items.forEach( function( el ) {
					var itemChild = el.querySelector( 'a' );
					// add class "tt-old" to the elements/images that are going to get removed
					if( itemChild ) {
						classie.add( itemChild, 'tt-old' );
					}
				} );

				// apply effect
				setTimeout( function() {
					
					// append new elements
					[].forEach.call( newImages, function( el, i ) { items[ i ].innerHTML += el; } );

					// add "effect" class to the grid
					classie.add( grid, 'tt-effect-active' );
					
					// wait that animations end
					var onEndAnimFn = function() {
						// remove old elements
						items.forEach( function( el ) {
							// remove old elems
							var old = el.querySelector( 'a.tt-old' );
							if( old ) { el.removeChild( old ); }
							// remove class "tt-empty" from the empty items
							classie.remove( el, 'tt-empty' );
							// now apply that same class to the items that got no children (special case)
							if ( !el.hasChildNodes() ) {
								classie.add( el, 'tt-empty' );
							};
						} );
						// remove the "effect" class
						classie.remove( grid, 'tt-effect-active' );
						isAnimating = false;
					};
					if( support ) {
						onAnimationEnd( items, items.length, onEndAnimFn );
					}
					else {
						onEndAnimFn.call();
					}

				}, 25 );
				
			}

		} );
	}
	
	init();

})();