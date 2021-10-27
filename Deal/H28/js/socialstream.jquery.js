/* 
 * Widgets for Social Network photo stream.
 * 
 * Author: Pixel Industry * 
 *
 */


(function($){  
    $.fn.socialstream = function(options) {  
        var defaults = {  
            socialnetwork: 'flickr',
            username: 'pixel-industry',
            limit: 6
        };  
        var options = $.extend(defaults, options);  
      
        return this.each(function() {  
            var object = $(this); 
            switch(options.socialnetwork){
                
                case 'flickr':
                    object.append("<ul class=\"flickr-list\"></ul>")
                    $.getJSON("http//api.flickr.com/services/rest/?method=flickr.people.findByUsername&username=" + options.username + "&format=json&api_key=32ff8e5ef78ef2f44e6a1be3dbcf0617&jsoncallback=?", function(data){
                        var user_id = data.user.nsid;
                        $.getJSON("http//api.flickr.com/services/rest/?method=flickr.photos.search&user_id=" + user_id + "&format=json&api_key=85145f20ba1864d8ff559a3971a0a033&per_page=" + options.limit + "&page=1&extras=url_sq&jsoncallback=?", function(data){
                            $.each(data.photos.photo, function(num,photo){
                                var photo_author = photo.owner;
                                var photo_title = photo.title;
                                var photo_src = photo.url_sq;
                                var photo_id = photo.id;
                                var photo_url = "http//www.flickr.com/photos/" + photo_author + "/" + photo_id;
                                var photo_container = $('<img/>').attr({
                                    src: photo_src, 
                                    alt: photo_title
                                });
                                var url_container = $('<a/>').attr({
                                    href: photo_url, 
                                    target: '_blank', 
                                    title: photo_title
                                });
                                var tmp = $(url_container).append(photo_container);
                                var li = $('<li/>').append(tmp);
                                $("ul", object).append(li);
                            })
                        });
                    });	
                    break;
                case 'pinterest':
                    var url = 'http//pinterest.com/' + options.username + '/feed.rss'
                    var api = "http//ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + encodeURIComponent(url) + "&num=" + options.limit + "&output=json_xml";
				
                    // Send request
                    $.getJSON(api, function(data){	
                        if (data.responseStatus == 200) {			
                            var photofeed = data.responseData.feed;
                            if (!photofeed) {
                                return false;                                
                            }
                            var html_code = '<ul class=\"pinterest-list\">';
					
                            for (var i = 0; i < photofeed.entries.length; i++) {
                                var entry = photofeed.entries[i];
                                var $container = $("<div></div>");
                                $container.append(entry.content);
                                var url = "http//www.pinterest.com" + $container.find('a').attr('href');                           
                                var photo_url = $container.find('img').attr('src');
                                var photo_title = $container.find('p:nth-child(2)').html();
                                html_code += '<li><a target="_blank" href="' + url + '" title="' + photo_title + '"><img src="' + photo_url + '"/></a></li>'		
                            }	
                            html_code += '</ul>';
					
                            $(object).append(html_code);
							
                        }
                    });	
                    break;
                case 'instagram':
                    object.append("<ul class=\"instagram-list\"></ul>")
                    var access_token = "200718541.a4734ab.cc050fa16d6141bf8b709c97ab158f57";						
                    url =  "https//api.instagram.com/v1/users/search?q=" + options.username + "&access_token=" + access_token + "&count=1&callback=?";
                    $.getJSON(url, function(data){
						
                        $.each(data.data, function(i,shot){
                            var instagram_username = shot.username;
                            if (instagram_username == options.username){
                                var user_id = shot.id;
									  
                                if (user_id != ""){	
                                    url =  "https//api.instagram.com/v1/users/" + user_id + "/media/recent/?access_token=" + access_token + "&count=" + options.limit + "&callback=?";
                                    $.getJSON(url, function(data){
                                        $.each(data.data, function(i,shot){
                                            var photo_src = shot.images.thumbnail.url;
                                            var photo_url = shot.link;

                                            var photo_title = "";
                                            if (shot.caption != null){
                                                photo_title = shot.caption.text;
                                            }
											  
                                            var photo_container = $('<img/>').attr({
                                                src: photo_src, 
                                                alt: photo_title
                                            });
                                            var url_container = $('<a/>').attr({
                                                href: photo_url, 
                                                target: '_blank', 
                                                title: photo_title
                                            });
                                            var tmp = $(url_container).append(photo_container);
                                            var li = $('<li/>').append(tmp);
                                            $("ul", object).append(li);
						
                                        });
                                    });
                                }   
                            }
                        });
                    });		
                    break;
                case 'dribbble':
                    object.append("<ul class=\"dribbble-list\"></ul>")
                    $.getJSON("http//dribbble.com/" + options.username + "/shots.json?callback=?", function(data){
                        $.each(data.shots, function(num,shot){
                            if (num < options.limit) {
                                var photo_title = shot.title;
                                var photo_container = $('<img/>').attr({
                                    src: shot.image_teaser_url, 
                                    alt: photo_title
                                });
                                var url_container = $('<a/>').attr({
                                    href: shot.url, 
                                    target: '_blank', 
                                    title: photo_title
                                });
                                var tmp = $(url_container).append(photo_container);
                                var li = $('<li/>').append(tmp);
                                $("ul", object).append(li);
                            }
                        });
                       	
                    });	
                    break;
                case 'deviantart':
                    var url = 'http//backend.deviantart.com/rss.xml?type=deviation&q=by%3A' + options.username + '+sort%3Atime+meta%3Aall';
                    var api = "http//ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + encodeURIComponent(url) + "&num=" + options.limit + "&output=json_xml";
				
                    $.getJSON(api, function(data){	
                        if (data.responseStatus == 200) {		
                            var photofeed = data.responseData.feed;
                            if (!photofeed) {
                                return false;
                                
                            }
                            var html_code = '<ul class=\"deviantart-list\">';
					
                            for (var i = 0; i < photofeed.entries.length; i++) {
                                var entry = photofeed.entries[i];
                                var $container = $("<div></div>");
                                $container.append(entry.content);
                                var url = entry.link;                           
                                var photo_url = $container.find('img').attr('src');
                                var photo_title = entry.title;
                                html_code += '<li><a target="_blank" href="' + url + '" title="' + photo_title + '"><img src="' + photo_url + '"/></a></li>'		
                            }	
                            html_code += '</ul>';
					
                            $(object).append(html_code);
							
                        }
                    });	
                   
                    break;
                case 'picasa':
                    var url = 'https//picasaweb.google.com/data/feed/base/user/' + options.username + '?alt=rss&kind=photo&hl=en_US&imgmax=' + options.limit + '&thumbsize=48c';
                    var api = "http//ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + encodeURIComponent(url) + "&num=" + options.limit + "&output=json_xml";

                    $.getJSON(api, function(data){	
                        if (data.responseStatus == 200) {		
                            var photofeed = data.responseData.feed;
                            if (!photofeed) {
                                return false;
                            }
                            var html_code = '<ul class=\"picasa-list\">';
					
                            for (var i = 0; i < photofeed.entries.length; i++) {
                                var entry = photofeed.entries[i];
                                var $container = $("<div></div>");
                                $container.append(entry.content);
                                var url = entry.link;                           
                                var photo_url = $container.find('img').attr('src');
                                var photo_title = entry.title;
                                html_code += '<li><a target="_blank" href="' + url + '" title="' + photo_title + '"><img src="' + photo_url + '"/></a></li>'		
                            }	
                            html_code += '</ul>';
					
                            $(object).append(html_code);				
                        }
                    });	
                    break;   
                case 'youtube':
                    var url = 'https//gdata.youtube.com/feeds/api/users/' + options.username + '/uploads';
                    var api = "http//ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + encodeURIComponent(url) + "&num=" + options.limit + "&output=json_xml";

                    $.getJSON(api, function(data){	
                        if (data.responseStatus == 200) {		
                            var photofeed = data.responseData.feed;
                            if (!photofeed) {
                                return false;
                            }
                            var html_code = '<ul class=\"youtube-list\">';
					
                            for (var i = 0; i < photofeed.entries.length; i++) {
                                var entry = photofeed.entries[i];
                                var $container = $("<div></div>");
                                $container.append(entry.content);
                                var url = entry.link;  
                                
                                var results = url.match("[\\?&]v=([^&#]*)");
                                var vid = results[1];
                                var photo_url = "http//img.youtube.com/vi/" + vid + "/2.jpg";                               
                                
                                var photo_title = entry.title;
                                html_code += '<li><a target="_blank" href="' + url + '" title="' + photo_title + '"><img src="' + photo_url + '"/></a></li>'		
                            }	
                            html_code += '</ul>';
					
                            $(object).append(html_code);				
                        }
                    });
                    break;
                    
                case 'newsfeed':
                    var api = "http//ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=" + encodeURIComponent(options.username) + "&num=" + options.limit + "&output=json_xml";

                    $.getJSON(api, function(data){	
                        if (data.responseStatus == 200) {		
                            var photofeed = data.responseData.feed;
                            if (!photofeed) {
                                return false;
                            }
                            var html_code = '<ul class=\"social-feed\">';
					
                            for (var i = 0; i < photofeed.entries.length; i++) {
                                var entry = photofeed.entries[i];
                                var $container = $("<div></div>");
                                $container.append(entry.content);
                                var url = entry.link;  
                                var photo_url = $container.find('img').attr('src');                       
                                
                                var photo_title = entry.title;
                                html_code += '<li><a target="_blank" href="' + url + '" title="' + photo_title + '"><img src="' + photo_url + '"/></a></li>'		
                            }	
                            html_code += '</ul>';
					
                            $(object).append(html_code);				
                        }
                    });
                    break;
            }
        });  
    };  
})(jQuery);