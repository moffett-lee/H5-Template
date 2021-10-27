$(window).load(function() {

	/* Ajax Contact form validation and submit */
	jQuery('form#contactForm').submit(function() {
		jQuery(this).find('.error').remove();
		var hasError = false;
		jQuery(this).find('.requiredField').each(function() {
			if(jQuery.trim(jQuery(this).val()) == '') {
				if (jQuery(this).is('textarea')){
					jQuery(this).parent().addClass('input-error');
				} else {
					jQuery(this).addClass('input-error');
				}
				hasError = true;
			} else if(jQuery(this).hasClass('email')) {
				var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
				if(!emailReg.test(jQuery.trim(jQuery(this).val()))) {
					jQuery(this).addClass('input-error');
					hasError = true;
				}
			}
		});
		if(!hasError) {
			jQuery(this).find('#born-submit').fadeOut('normal', function() {
				jQuery(this).parent().parent().find('.sending-message').show('normal');
			});
			var formInput = jQuery(this).serialize();
			var contactForm = jQuery(this);
			jQuery.ajax({
				type: "POST",
				url: jQuery(this).attr('action'),
				data: formInput,
				success: function(data){
					contactForm.parent().fadeOut("normal", function() {
						jQuery(this).prev().prev().show('normal'); // Show success message
					});
				},
				error: function(data){
					contactForm.parent().fadeOut("normal", function() {
						jQuery(this).prev().show('normal');  // Show error message
					});
				}
			});
		}
		
		return false;
		
	});
	
	jQuery('.requiredField').blur(function() {
		if(jQuery.trim(jQuery(this).val()) != '' && !jQuery(this).hasClass('email')) {
			if (jQuery(this).is('textarea')){
				jQuery(this).parent().removeClass('input-error');
			} else {
				jQuery(this).removeClass('input-error');
			}
		} else {
			if (jQuery(this).is('textarea')){
				jQuery(this).parent().addClass('input-error');
			} else {
				jQuery(this).addClass('input-error');
			}
		}
	});
	
	jQuery('.email').blur(function() {
		var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		if(emailReg.test(jQuery.trim(jQuery(this).val())) && jQuery(this).val() != '') {
			jQuery(this).removeClass('input-error');
		} else {
			jQuery(this).addClass('input-error');
		} 
	});
	
	jQuery('.requiredField, .email').focus(function(){
		if (jQuery(this).is('textarea')){
			jQuery(this).parent().removeClass('input-error');
		} else {
			jQuery(this).removeClass('input-error');
		}
	});
	
});