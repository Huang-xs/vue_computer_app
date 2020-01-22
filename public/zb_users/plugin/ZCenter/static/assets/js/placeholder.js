$(document).ready(function(){
	
	$('.login-form input[type="text"], .registration-form input[type="password"]').each(function() {
		$(this).val( $(this).attr('placeholder') );
    });
	
});