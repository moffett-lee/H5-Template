$(document).ready(function(){
    
    /* Pretty photo */ 
    if(jQuery().prettyPhoto) {
        piPrettyphoto(); 
    }
    
    function piPrettyphoto(){
        $("a[data-gal^='prettyPhoto']").prettyPhoto();
    }    
    	
    // get the action filter option item on page load
    var $filterType = $('#portfolio-filter li.active a').attr('class');

    // get and assign the holder element to the
    // $holder varible for use later
    var $holder = $('ul#filter-item');

    // clone all items within the pre-assigned $holder element
    var $data = $holder.clone();

    // attempt to call Quicksand when a filter option
    // item is clicked
    $('#portfolio-filter li a').click(function(e) {
        // reset the active class on all the buttons
        $('#portfolio-filter li').removeClass('active');

        // assign the class of the clicked filter option
        // element to our $filterType variable
        var $filterType = $(this).attr('class');
        $(this).parent().addClass('active');
        if ($filterType == 'all') {
            // assign all li items to the $filteredData var when
            // the 'All' filter option is clicked
                       
            var $filteredData = $data.children('li');
        }
        else {
            // find all li elements that have our required $filterType
            // values for the data-type element
            var $filteredData = $data.find('li[data-type=' + $filterType + ']');
        }

        // call quicksand and assign transition parameters
        $holder.quicksand($filteredData, {
            duration: 800,
            easing: 'swing'
        },function() {
            // reload other plugins
            piSlidingTitle();
            piPrettyphoto();
        });
        return false;
    });
    
    piSlidingTitle();
             
});

function piSlidingTitle(){
    $('.sliding').off('mouseenter mouseleave');
    $('.sliding').on({
        mouseenter: function(){
            var width = $(this).find('.img-hover').width();
            $(this).find('.img-hover').css({
                left: -width
            }).show().animate({
                left:0
            },200);
        },
        mouseleave: function(){
            var width = $(this).find('.img-hover').width();
            $(this).find('.img-hover').animate({
                left: -width
            },200);
        }
    });
}