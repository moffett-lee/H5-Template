
function imghover(){

$("a.zoom_hover img,a.video_hover img").mouseover(function(){
	$(this).stop(true,true);
	$(this).fadeTo(300, 0.4);
});
$("a.zoom_hover img,a.video_hover img").mouseout(function(){
	$(this).fadeTo(400, 1.0);
});

}


$(window).load(function() {

/* Menu */


ddsmoothmenu.init({
	mainmenuid: "main_nav", //menu DIV id
	orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
	classname: 'ddsmoothmenu', //class added to menu's outer DIV
	//customtheme: ["#1c5a80", "#18374a"],
	contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
})




/* Contact Form */
	$('#errors').hide();
	$('#mail_sucess').hide();
	$('#mail_fail').hide();
	$('#send_message').click(function(e){
	
        e.preventDefault();
        var error = false;
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();
	
        if(name.length == 0){
                error = true;
                $('#name_error').fadeIn(500);
            }else{
                $('#name_error').fadeOut(500);
            }
            if(email.length == 0 || email.indexOf('@') == '-1'){
                error = true;
                $('#email_error').fadeIn(500);
            }else{  
				
                $('#email_error').fadeOut(500);
            }
            if(message.length == 0){
                error = true;
                $('#message_error').fadeIn(500);
            }else{                   
                $('#message_error').fadeOut(500);
            }
			
			if(error == true)
			{
				$('#errors').show();
				$('#mail_sucess').hide();
				$('#mail_fail').hide();
			}
			
            
        if(error == false){
			$('#send_message').attr({'disabled' : 'true', 'value' : 'wait' });

            /* using the jquery's post(ajax) function and a lifesaver
            function serialize() which gets all the data from the form
            we submit it to send_email.php */
            $.post("js/send_email.php", $("#contact_form").serialize(),function(result){
				if(result == 'sent'){
					$('#errors').hide();
					$('#send_message').remove();
                    $('#mail_success').fadeIn(500);
					$('#mail_fail').hide();
                }else{
					$('#mail_fail').fadeIn(500);
					$('#errors').hide();
                    $('#send_message').removeAttr('disabled').attr('value', 'Sent');
                }
            });
        }
    });

	


/*toogle*/

$(".toggle_container").hide(); 

$(".toggle_trigger").click(function(){
	$(this).toggleClass("toggle_active").next().slideToggle("fast");
	return false;
});




/* Tabs */

$(".tab_content").hide(); //Hide all content
$("ul.tabs li:first").addClass("active").show(); //Activate first tab

$(".tab_content").filter(':first').show(); //Show first tab content


$("ul.tabs li").click(function() {

	$("ul.tabs li").removeClass("active"); //Remove any "active" class
	$(this).addClass("active"); //Add "active" class to selected tab
	$(".tab_content").hide(); //Hide all tab content

	var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
	$(activeTab).fadeIn(); //Fade in the active ID content
	return false;
});


/*fancybox*/
	function fancy(){
	$("a.fancy,.port>a").fancybox({
	'titleShow'     : false,
	'showCloseButton': true,
	'transitionIn'	: 'elastic',
	'transitionOut'	: 'elastic',
	'easingIn'      : 'easeOutBack',
	'easingOut'     : 'easeInBack'
	}); 

	}
	
	fancy();
	imghover();
	
	/* tool tips */
	
	$('.social img').tipsy({
			delayIn :200,
			delayOut :200,
			fade : false,
			gravity: 'n',
			title : 'alt'
	
	});
	
$('#mycarousel').jcarousel({wrap :'circular'});
$('#carusol-widget>ul').jcarousel({wrap :'circular',scroll : 1});


	
/*
quick sand jquery 
-----------------------------------*/

// Custom sorting plugin
	// bind radiobuttons in the form
	var $filterType = jQuery('#filter a');
	// get the first collection
	var $list = jQuery('#portfolio-sorting');
	// clone applications to get a second collection
	var $data = $list.clone();
	
	$filterType.click(function(event) {

		if (jQuery(this).attr('class') == 'every') {
		  var $sortedData = $data.find('li');
		} else {
			var $sortedData = $data.find('.'+ jQuery(this).attr('class'));
		}	
		jQuery('#filter a').removeClass('current_link');
		jQuery(this).addClass('current_link');
			
		$list.quicksand($sortedData, {
		  attribute: 'id',
		  duration: 800,
		  easing: 'easeInOutQuad',
		  useScaling: 'false',
		   adjustHeight: 'auto'
		   },function(){
		   	fancy()

		   });

		   return false;

		});
});	