$(function($){
    /* ================ MAIN NAVIGATION ================ */
	
    function piMainmenu(){
        $(" #nav ul ").css({
            display: "none"
        }); // Opera Fix
        $(" #nav li").hover(function(){
            $(this).find('ul:first').css({
                visibility: "visible",
                display: "none"
            }).slideDown(250);
        },function(){
            $(this).find('ul:first').css({
                visibility: "hidden"
            });
        });
    }
    
    function piSelectMenu(){
        $('#nav-responsive').on('change', function() {
            window.location = $(this).val();
        }); 
    }
	
    /* ================ CONTENT TABS ================ */
    (function() {
        var $tabs    = $('.tabs'),
        $tabLis = $tabs.children('li'),
        $tabContent = $('.tab-content');

        $tabContent.hide();
        $tabLis.first().addClass('active').show();
        $tabContent.first().show();

        $tabLis.on('click', function(e) {
            var $this = $(this);

            $tabLis.removeClass('active');
            $this.addClass('active');
            $tabContent.hide();
			
            $( $this.find('a').attr('href') ).fadeIn();

            e.preventDefault();
        });

    })();
    
    /* ================ ACCORDION ================ */
    
    
    $('.accordion .title').click(function(event) {
        event.preventDefault();
        $(".accordion .title").removeClass("active")
        $('.accordion .content').slideUp('normal');
        if($(this).next().is(':hidden') == true) {
            $(this).next().slideDown('normal');
            $(this).addClass("active");
        }
    });
    $('.accordion .content').hide();
    $('.accordion .active').next().slideDown('normal');
    
    /* ================ TOGGLE ================ */
    
    $(".vertical-toggle .content").hide();
    $(".vertical-toggle .title").eq(2).addClass('active').next().slideDown();
    $(".vertical-toggle .title").toggle(function(){
        if($(this).hasClass('active')){
            $(this).removeClass("active");
        }else{
            $(this).addClass("active");
        }
        
    }, function () {
        if($(this).hasClass('active')){
            $(this).removeClass("active");
        }else{
            $(this).addClass("active");
        }
        
    });
    $(".vertical-toggle .title").click(function(){
        $(this).next(".vertical-toggle .content").slideToggle();
    });
    
    $(document).ready(function(){					
        piMainmenu();
        piSelectMenu();
	
        /* ================ SCROLLING PAGE TO TOP ================ */
        $('.to-top-link').on("click", function(){
            jQuery('html, body').animate( {
                scrollTop: 0
            }, 'slow' );
        });
       
        /* ================ STWEETS SCROLL ================ */
        $('.tweets-list-container').tweetscroll({
            username: 'envatowebdesign', 
            time: true, 
            limit: 11, 
            replies: true, 
            position: 'append',
            date_format: 'style2',
            animation: 'slide_up',
            visible_tweets: 2
        });
            
        /* ================ PINTEREST FEED ================ */
        $('.pinterest-feed').socialstream({
            socialnetwork: 'pinterest',
            limit: 15,
            username: 'vmrkela'
        });
        
        /* ================ PLACEHOLDER PLUGIN ================ */
        $('input[placeholder], textarea[placeholder]').placeholder();
        
    });
});


