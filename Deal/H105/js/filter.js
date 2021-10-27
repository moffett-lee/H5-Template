(function($){

// Shuffle function from: http//james.padolsey.com/javascript/shuffling-the-dom/
    
$.fn.shuffle = function() {

        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
            });
        
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
        
        return $(shuffled);
    };
})(jQuery);
   
$(function(){
	       
   $(".menu-item")
        .css("opacity","1")
       .hover(function(){
           $(this).css("opacity","1");
       }, function() {
           $(this).css("opacity","1");
       })
       /*.click(function(){
           location.href = $(this).attr("rel"); 
           return false;
       }) 
       
       UNCOMMENT THIS TO MAKE THE BLOCKS CLICKABLE TO THEIR REL ATTRIBUTES
       
       */;
       
   $("#allcat").click(function(){
       $(".menu-item").slideDown();
       $("#catpicker a").removeClass("current");
       $(this).addClass("current");
       return false;
   });
   
   $(".filter").click(function(){
        var thisFilter = $(this).attr("id");
        $(".menu-item").slideUp();
        $("."+ thisFilter).slideDown();
        $("#catpicker a").removeClass("current");
        $(this).addClass("current");
        return false;
   });
   
   $(".menu-item").shuffle();

});