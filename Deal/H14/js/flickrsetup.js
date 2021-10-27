$(document).ready(function(){

	$('#fbox').jflickrfeed({
		limit: 8,
		qstrings: {
			id: '30373738@N06'
		},
		itemTemplate: '<li>'+
						'<a rel="photo_gallery" href="{{image}}" title="{{title}}">' +
							'<img src="{{image_s}}" alt="{{title}}" />' +
						'</a>' +
					  '</li>'
	}, function(data) {
		$('#fbox a').fancybox();
	});	
	
});