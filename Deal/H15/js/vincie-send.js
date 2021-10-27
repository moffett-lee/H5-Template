$(function(){

$("#btnSend").click(function(){

$.ajax({type:'POST', url: './php/contact.php', data:$('#frmContact').serialize(), success: function(response) {
$("#spanMessage").html('Please Wait...');


	 if(parseInt(response)>0)
	   {
		 $("#spanMessage").html('Successfully sent...');
	   }
	   else{
		 alert(response);
		 $("#spanMessage").html('Somthing wrong. Send again');
	   }
	   
		 
}});


});


$("#btnSubscribe").click(function(){

$.ajax({type:'POST', url: './php/subscribe.php', data:$('#frmSubscribe').serialize(), success: function(response) {



	 if(parseInt(response)>0)
	   {
		 alert('Successfully sent...');
	   }
	   else{
		 alert(response);
		
	   }
	   
		 
}});


});





$('.boxlike').each(function(index){

var likebtnID = $(this).attr('id');
var likebtnArray = likebtnID.split('-');
var pageID = likebtnArray[1];


$.ajax({type:'GET', url: './php/get-likes.php', data:{'pageid':pageID}, success: function(response) {
		 
		   $('#boxlike-'+pageID).html(response);
		 
		 }
		 });
});

$(".likebtn").click(function(){

var likebtn = $(this);
var likebtnID = $(likebtn).attr('id');
var likebtnArray = likebtnID.split('-');
var pageID = likebtnArray[1];
$.ajax({type:'GET', url: './php/like.php', data:{'pageid':pageID}, success: function(response) {

	 if(parseInt(response)>0)
	   {
		 $.ajax({type:'GET', url: './php/get-likes.php', data:{'pageid':pageID}, success: function(response) {
		 
		   $('#boxlike-'+pageID).html(response);
		 
		 }
		 });
	   }
	   else{
		 alert(response);
		
	   } 	 
}
});

});

});