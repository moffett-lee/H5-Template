$("#btnSubscribe").click(function(){

$.ajax({type:'POST', url: '../php/subscribe.php', data:$('#frmSubscribe').serialize(), success: function(response) {
	 if(parseInt(response)>0)
	   {
		 alert('Successfully sent...');
	   }
	   else{
		 alert(response);		
	   }  		 
}});
});