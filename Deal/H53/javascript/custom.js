/* 
   _____ _                            
  / ____| |                           
 | |    | | ___  __ _ _ __   ___  ___ 
 | |    | |/ _ \/ _` | '_ \ / _ \/ __|
 | |____| |  __/ (_| | | | |  __/\__ \
  \_____|_|\___|\__,_|_| |_|\___||___/


  Our portofolio:  http//themeforest.net/user/tagDiv/portfolio

*/
                                      
//from here we start all the js
$().ready(function() {
    new_portofolio();
    jquery_dropdown();
    portofolio();
    fancy_box();
    header_animation();
    content_tab();
    nice_scrollbar();
    
    sidebar_slider();
    blog_post_slider();             
   
    
});



/**
 * Used by the blog in the sidebar
 */
function sidebar_slider() {
     $('#slider1').bxSlider({
        auto:false,
        speed:200,
        nextImage:'images/page-blog/sidebar-next.png',
        prevImage:'images/page-blog/sidebar-prev.png'
    });
}

/**
 * the slider from the blog
 */
function blog_post_slider() {
    $('#slider').nivoSlider({
        effect: 'fade', // Specify sets like: 'fold,fade,sliceDown'
        animSpeed: 200, // Slide transition speed
        pauseTime: 4000, // How long each slide will show
        startSlide: 0, // Set starting Slide (0 index)
        directionNav: true, // Next & Prev navigation
        directionNavHide: false, // Only show on hover
        controlNav: false, // 1,2,3... navigation
        controlNavThumbs: false, // Use thumbnails for Control Nav
        controlNavThumbsFromRel: false, // Use image rel for thumbs
        controlNavThumbsSearch: '.jpg', // Replace this with...
        controlNavThumbsReplace: '_thumb.jpg', // ...this in thumb Image src
        keyboardNav: true, // Use left & right arrows
        pauseOnHover: true, // Stop animation while hovering
        manualAdvance: false, // Force manual transitions
        captionOpacity: 0.8, // Universal caption opacity
        prevText: 'Prev', // Prev directionNav text
        nextText: 'Next'
    });
}


/**
 * Nice scroll bar from index
 */
function nice_scrollbar() {
    $(".content-scroll").niceScroll({cursorborder:"", cursorcolor:"#A4A4A4", boxzoom:false, cursoropacitymin:0.2, cursoropacitymax:0.8,background:"#F6F6F6"}); // First scrollable DIV
}



/**
 * New portofolio
 */
function new_portofolio() {
    $('.portofolio-new-wrap').masonry({
        itemSelector: '.portofolio-box',
        columnWidth: 309,
        isAnimated: true,
        gutterWidth:6,
        isFitWidth: true
    });
    $(this).delay(200).queue(function(){ 
        $('.portofolio-new-wrap').masonry( 'reload' );
        $(this).dequeue(); 
    });
    $(this).delay(2000).queue(function(){ 
        $('.portofolio-new-wrap').masonry( 'reload' );
        $(this).dequeue(); 
    });
}



/**
 * Header animation
 */

function header_animation() {
    if ($(".js-header-animation")[0]){ //do animation only if we have at least one star layer
        var moveBg0 = {type: 'backgroundy', to: 20000, step: 1, delay: 80};
       


        

        background = $(".js-header-animation");

        $fx(background[0]).fxAdd(moveBg0).fxRun(null, -1);
        
    }
}

/**
 *  add fancybox
 */
function fancy_box() {
     $(".image-wrap a").fancybox({
            'overlayShow'	: true,
            'transitionIn'	: 'elastic',
            'transitionOut'	: 'elastic',
            'hideOnContentClick' : true,
            'padding' : '5px',
            'overlayColor' : 'white',
            'centerOnScroll': true,
            'speedIn':200,
            'speedOut':200
    });
    

}


/**
 * drop down menu
 */
function jquery_dropdown(){

    $("ul.js-jquery-dropdown li.sub_menu").hover(function(){
        
        var dropMenu = $('ul:first',this);
         
        
        dropMenu.fadeIn(100);
        
        
        var dropMenuOffset = dropMenu.offset(); 
        if ((dropMenuOffset.left + dropMenu.width()) > $(window).width() - 10) {
            // the menu is out of screen, reposition it
            dropMenu.addClass("dropdown-menu-moved");
        } 
        
        
        //add the hover class only after the main manu appeard, to prevent the shadow from showing up
        $(this).delay(50).queue(function(){ 
            $(this).addClass("hover"); 
            $(this).dequeue(); 
        });
    }, function(){
        $('ul:first',this).removeClass("dropdown-menu-moved"); //reposition the menu to it's default location'
        
        $(this).removeClass("hover"); //remove hover class
        $('ul:first',this).hide(); //hide the menu
        
    
        //double check that we don't have the hover class
        $(this).delay(100).queue(function(){ 
            $(this).removeClass("hover");
            $(this).dequeue(); 
        });
    });
    
    $("ul.js-jquery-dropdown li ul li:has(ul)").find("a:first").append(" &raquo; ");
};






function portofolio() {
    //click on a link
    $('.portofolio-filters a').click(function(event){
        event.preventDefault();
        $('.portofolio-filters a').removeClass('portofolio-filterSelected');
        $(this).addClass('portofolio-filterSelected');
        
        
        if ($(this).attr('id') == 'portofolio-all') {
            $('.portofolio-js .portofolio-item').show("clip");  
        } else {
            $('.portofolio-js .portofolio-item').not('.' + $(this).attr('id')).fadeOut(300);
            
            //delay for the slider for mobiles
            $(this).delay(300).queue(function(){ 
                $('.portofolio-js .' + $(this).attr('id')).show("clip");
                $(this).dequeue(); 
            });
           
        }
        
        
    });
}


function content_tab() {
    $(".tab-panel:not(:first-child)").hide();
    $(".tab-panel:first-child").addClass('tab-visible');
    
    //$(".tab-panel").hide();
    
    
    $('.content-tab a').click(function(event){
        event.preventDefault();

        $('.content-tab li').removeClass('tab-selected');
        $(this).parent().addClass('tab-selected');
        
        $(".tab-visible .video-content").attr("src",$('.video-content').attr('src')); //stop all youtube videos from the old visible tab
        
        //hide all tabs
        $(".tab-panel").hide();
        $(".tab-panel").removeClass('tab-visible'); //remove tab-visible
        
        //except the one clicked
        $('.' + $(this).parent().attr('id')).show();
        $('.' + $(this).parent().attr('id')).addClass('tab-visible'); //add the tab-visible
        
        //resize the nice scroll
        $(".content-scroll").getNiceScroll().resize();
        
        
    
    });
}


