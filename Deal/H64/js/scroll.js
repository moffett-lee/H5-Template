	var posit,
		pos,
		div= 'html',
		amount = 6,//amount of pages
		q=[2,3,1,4,5,6],
		fl=true;
function open_page(page, speed){
	fl=false;
	destination = $(page).offset().top;
	if ($.browser.webkit) {div='body'}
	$(div).animate({ scrollTop: destination}, speed, function(){fl=true});
}
$(document).ready(function() {

	page=location.hash.slice(0,-1);
	if (page=='') {location.hash='#page_1/';page='#page_1';}
	open_page(page,0);

	$("a").click(function () {
		if ($(this).attr("href").substr($(this).attr("href").indexOf('#'),6)=='#page_') {
      		page = $(this).attr("href");
      		open_page(page,1000);
     		return false;
		} else {
			if ($(this).attr("href")=='#') {
				location.hash='/';
				return false;
			}
		}
    });
	var doc=0;
	setInterval(SetActBut,100)
	function SetActBut(){
		new_doc=$(div).attr('scrollTop');
		if ((new_doc!=doc)&&(fl)){
			doc=new_doc;
			for (var i=0; i<amount; i++) {
				elem='#page_'+q[i];
				pos=$(elem).offset().top;
				if ((pos-doc)<=500) {
					location.hash='#page_'+q[i]+'/';
				}
			}
		}
	}
});
$(window).load(function(){
	$(window).resize(function(){
		page=location.hash.slice(0,-1);
		open_page(page,0);
	})					
});