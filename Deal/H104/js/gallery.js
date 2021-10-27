$(function() {
				$('#thumbs .thumb a').each(function(i) {
					$(this).addClass( 'itm'+i );
					$(this).click(function() {
						$('#images').trigger( 'slideTo', [i, 0, true] );
						return false;
					});
				});
				$('#thumbs a.itm0').addClass( 'selected' );
				
				$('#images').carouFredSel({
					direction: 'left',
					circular: true,
					infinite: false,
					items: 1,
					auto: false,
					scroll: {
						fx: 'directscroll',
						onBefore: function() {
							var pos = $(this).triggerHandler( 'currentPosition' );
							$('#thumbs a').removeClass( 'selected' );
							$('#thumbs a.itm'+pos).addClass( 'selected' );

							var page = Math.floor( pos / 3 );
							$('#thumbs').trigger( 'slideToPage', page );
						}
					}
				});
				$('#thumbs').carouFredSel({
					direction: 'left',
					circular: true,
					infinite: false,
					items: 7,
					align: false,
					auto: false,
					prev: '#prev',
					next: '#next'
				});
				
			});