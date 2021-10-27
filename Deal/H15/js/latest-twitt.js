$(document).ready(function() {
  
    // set your twitter id
    var user = 'themestan';
      

$.getJSON("http//twitter.com/statuses/user_timeline.json?screen_name=themestan&count=1&callback=?", function(data) {
     
	 for(d in data)
	 $("#tweet2").append(data[d].text );
     
});

});
