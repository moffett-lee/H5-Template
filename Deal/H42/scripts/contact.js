jQuery(function() {
  jQuery('.error').hide();
  jQuery(".contactButton").click(function() {
		// validate and process form
		// first hide any error messages
    jQuery('.error').hide();
		
	  var name = jQuery("input#contactName").val();
		if (name == "" || name == "Your Name") {
      jQuery("span#nameError").show();
      jQuery("input#contactName").focus();
      return false;
    }
	  var email = jQuery("input#contactEmail").val();
	  if (email == "" || email == "Your Email Address") {
      jQuery("span#emailError").show();
      jQuery("input#contactEmail").focus();
      return false;
    }
	
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	if(!emailReg.test(email)) {
	jQuery("span#emailError2").show();
    jQuery("input#contactEmail").focus();
      return false;
	}
	
	  var msg = jQuery("textarea#contactMessage").val();
	  if (msg == "" || msg =="Your Message Here") {
	  jQuery("span#messageError").show();
	  jQuery("textarea#contactMessage").focus();
	  return false;
    }
		
		var dataString = 'name='+ name + '&email=' + email + '&msg=' + msg;
		//alert (dataString);return false;
		
	  jQuery.ajax({
      type: "POST",
      url: "php/mail.php",
      data: dataString,
      success: function() {
		 jQuery('#contactForm').html("<div id='contactForm' style='display:none;'></div>");
        jQuery('#contactForm').html("<div id='successMessage'></div>");
        jQuery('#successMessage').html("<strong style='color:#5b5b5b; float:left; margin-top:3px;'>Message Has Been Sent!</strong><br/><br/>")
        .append("<p style='float:left; padding-bottom:30px;'>We'll get back to you shortly! Please be patient!</p>")
        .hide()
        .fadeIn(1500, function() {
          jQuery('#successMessage');
        });
      }
     });
    return false;
	});
});

