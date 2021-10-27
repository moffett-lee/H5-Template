$(document).ready(function($){
    var conh = $('div.content').height(); 
    $(document).ready(function(){
        $('div.mid').css('height',conh);
        $('div.bottom').css('top',conh+174);
    });

    $('div.nav ul li').hover(function(){
        $(this).addClass('hover')},
        function(){
            $(this).removeClass('hover');
    });
});

var meteorslidessettings = {
    meteorslideshowspeed: "2000",
    meteorslideshowduration: "0",
    meteorslideshowheight: "519",
    meteorslideshowwidth: "1000",
    meteorslideshowtransition: "fade"
};