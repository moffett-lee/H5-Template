/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


(function ($) {
    //define the tweetable plugin
    $.fn.tweetscroll = function (options) {
        //specify the plugins defauls
        var defaults = {
            limit: 5,                   //number of tweets to fetch
            visible_tweets: 2,           //number of tweets to be visible
            username: 'envatowebdesign', 	//@username tweets to display. can be multiple usernames e.g. [philipbeel, vmrkela]
            time: false,                //display date
            replies: false,		//filter out @replys
            position: 'append',		//append position
            date_format: 'style1',
            animation: 'slide_up'
        };
        //overwrite the defaults
        var options = $.extend(defaults, options);
        //loop through each instance
        return this.each(function (options) {
            //assign our initial vars
            var act = $(this);
            var $allTweets;
            var api = "http//api.twitter.com/1/statuses/user_timeline.json?screen_name=";
            
            //do a JSON request to twitters API
            if(jQuery.isArray(defaults.username)){
                var numOfUsers = defaults.username.length;
                var tweetsCount, $tweetList;              
                var restTweets = (defaults.limit - (Math.floor(defaults.limit / numOfUsers) * numOfUsers));
                var tweetsPerUser = Math.floor(defaults.limit / numOfUsers);
                $allTweets = $('<ul class="tweet-list">');   
                
                jQuery.each(defaults.username, function(index, val){
                    
                    if(restTweets > 0){
                        tweetsCount = tweetsPerUser + 1;
                        restTweets--;
                    }
                    else{
                        tweetsCount = tweetsPerUser;
                    }
                    
                    var requestURL = api + val + "&count=" + tweetsCount + "&callback=?";
                    $.getJSON(requestURL, act, function (data) {
                        $tweetList = createHtml(data);
                        $tweetList.find('li').appendTo($allTweets);
                        if(index == numOfUsers -1){
                            $($allTweets).appendTo(act);
                            setInitialListHeight();
                            setInterval(animateTweets, 6000);     
                        }
                    });
                    
                });
                
            }else{
                if(defaults.animation == false){
                    defaults.limit = defaults.visible_tweets;
                }
                var requestURL = api + defaults.username + "&count=" + defaults.limit + "&callback=?";
                $.getJSON(requestURL, act, function (data) {
                    $allTweets = createHtml(data);
                    $($allTweets).appendTo(act);
                    setInitialListHeight();
                    setInterval(animateTweets, 6000);     
                });   
            }
            
            function animateTweets() {
                switch(defaults.animation){
                    case 'slide_down':
                        var itemHeight = $('.tweet-list li').outerHeight();
                        var lastItemHeight = $('.tweet-list li:last').outerHeight();
                        var containerSize = 0;
                        var visibleItemsMax = defaults.visible_tweets + 1;
                        for(var i = 1; i < visibleItemsMax; i++){                   
                            var selector = ".tweet-list li:nth-child(" + i + ")";   
                            containerSize += $(selector).outerHeight();
                        }
                        var moveFactor = parseInt($('.tweet-list').css('top')) + itemHeight;
        
                        $('.tweet-list').css({
                            'height' : containerSize
                        });
                           
                        /* animate the carousel */
                        $('.tweet-list').animate(
                        {
                            'top' : moveFactor
                        }, 'slow', 'linear', function(){
                            /* put the last item before the first item */
                            $(".tweet-list li:first").before($(".tweet-list li:last"));

                            /* reset top position */              
                            $('.tweet-list').css({
                                'top' : -lastItemHeight
                            });
                        });
                        break;
                    case 'slide_up':
                        
                        var itemHeight = $('.tweet-list li').outerHeight();
                        var containerSize = 0;
                        var visibleItemsMax = defaults.visible_tweets + 2;
                        for(var i = 2; i < visibleItemsMax; i++){                   
                            var selector = ".tweet-list li:nth-child(" + i + ")";   
                            containerSize += $(selector).outerHeight();
                        }
                        var moveFactor = parseInt($('.tweet-list').css('top')) + itemHeight;
        
                        $('.tweet-list').css({
                            'height' : containerSize
                        });
                        if(isNaN(moveFactor)){
                            moveFactor = 0;
                        }
                        
                        /* animate the carousel */
                        $('.tweet-list').animate(
                        {
                            'top' : -moveFactor
                        }, 'slow', 'linear', function(){
                            /* put the last item before the first item */
                            $(".tweet-list li:last").after($(".tweet-list li:first"));

                            /* reset top position */              
                            $('.tweet-list').css({
                                'top' : 0
                            });
                        });
                        break;
                    case 'fade':
                        var itemHeight = $('.tweet-list li').outerHeight();
                        var containerSize = 0;
                        
                        var moveFactor = parseInt($('.tweet-list').css('top')) + itemHeight;
 
                        /* animate the carousel */
                        $('.tweet-list').animate(
                        {
                            'opacity' : 0
                        }, 'slow', 'linear', function(){
                            /* put the last item before the first item */
                            var selectorString = ".tweet-list li:lt(" + defaults.visible_tweets  + ")";                            
                            $(".tweet-list li:last").after($(selectorString));
                            for(var i = 1; i <= defaults.visible_tweets; i++){                   
                                var selector = ".tweet-list li:nth-child(" + i + ")";   
                                containerSize += $(selector).outerHeight();
                            }
                            
                            $('.tweet-list').css({
                                'height' : containerSize
                            });
                            
                            $('.tweet-list').animate({
                                opacity: 1
                            });
                            
                        });
                        break;
                }
            }
            
            function setInitialListHeight(){
                var containerSize = 0;

                if(defaults.animation == 'slide_down'){
                    var visibleItemsMax = defaults.visible_tweets + 2;
                    for(var i = 2; i < visibleItemsMax; i++){                   
                        var selector = ".tweet-list li:nth-child(" + i + ")"   
                        containerSize += $(selector).outerHeight();
                    }
                    var initialPosition = $('.tweet-list li').outerHeight();
                    $('.tweet-list').css({
                        'height' : containerSize,
                        'top': -initialPosition
                    });
                }else if(defaults.animation == 'slide_up'){
                    var visibleItemsMax = defaults.visible_tweets + 1;
                    for(var i = 1; i < visibleItemsMax; i++){                   
                        var selector = ".tweet-list li:nth-child(" + i + ")"   
                        containerSize += $(selector).outerHeight();
                    }
                    $('.tweet-list').css({
                        'height' : containerSize
                    });
                }else if(defaults.animation == 'fade'){
                    var visibleItemsMax = defaults.visible_tweets + 1;
                    for(var i = 1; i < visibleItemsMax; i++){                   
                        var selector = ".tweet-list li:nth-child(" + i + ")"   
                        containerSize += $(selector).outerHeight();
                    }
                    $('.tweet-list').css({
                        'height' : containerSize
                    });
                }
            }
            
        });
        
        function callTwitterAPI(requestURL, username, act){            
            $.getJSON(requestURL, act, function (data) {
                return createHtml(data);

            });
            
        }
        
        function createHtml(data){
            var $tweetList;
            var tweetMonth = '';
            var shortMonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            var allMonths = ["January","February","March","April","May","June","July","August","Septemper","October","November","December"];
            
            $.each(data, function (i, item) {
                
                //check for the first loop
                if(i == 0){
                    $tweetList = $('<ul class="tweet-list">');
                }
                //handle @reply filtering if required
                if (defaults.replies === false) {
                    if (item.in_reply_to_status_id === null) {
                        $tweetList.append('<li class="tweet_content_' + i + '"><p class="tweet_link_' + i + '">' + item.text.replace(/#(.*?)(\s|$)/g, '<span class="hash">#$1 </span>').replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$&">$&</a> ').replace(/@(.*?)(\s|\(|\)|$)/g, '<a href="http//twitter.com/$1">@$1 </a>$2')+'</p></li>');
                    }
                } else {
                    $tweetList.append('<li class="tweet_content_' + i + '"><p class="tweet_link_' + i + '">' + item.text.replace(/#(.*?)(\s|$)/g, '<span class="hash">#$1 </span>').replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$&">$&</a> ').replace(/@(.*?)(\s|\(|\)|$)/g, '<a href="http//twitter.com/$1">@$1 </a>$2') + '</p></li>');
                }
                //display the tiem of tweet if required
                if (defaults.time == true) {
                    var monthIndex = jQuery.inArray(item.created_at.substr(4, 3), shortMonths);
                        
                    if(defaults.date_format == 'style1'){
                        tweetMonth = monthIndex + 1;
                        if(tweetMonth < 10) {
                            tweetMonth = '0' + tweetMonth;
                        }
                        $tweetList.find('.tweet_link_' + i).append('<small> ' + item.created_at.substr(8, 2) + '/' + tweetMonth + '/' + item.created_at.substr(26,4) + ' ' + item.created_at.substr(11,8) + '</small>');
                    }else{
                        
                        tweetMonth = allMonths[monthIndex];
                        $tweetList.find('.tweet_link_' + i).append('<small> ' + tweetMonth + ' ' + item.created_at.substr(8, 2) + ' ' + item.created_at.substr(26,4) + ' ' + item.created_at.substr(11,8) + '</small>');
                    }
 
                }
  
            });
            
            return $tweetList;
        }
    }
})(jQuery);