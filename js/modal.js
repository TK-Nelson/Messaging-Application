function modal(error){
	//Disable button
	$('#modal-notif').text(error);
	$('#response').css('height','10%');
	setTimeout(function(){
		//Reenable button
        $('#login_response').css('height','0px');
    }, 250000);
};