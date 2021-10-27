;(function($){
jQuery.jqueryTagBox = function(id,time) {

var $ctrlItem = $(id+" .ctrl > div");
var $doorList = $(id+" .doorList");
var $doorItem = $(id+" .doorList .item");
var $dotItem = $(id+" center .item");
var currentId = 0;
var lock=0;
var currentHeight;


$ctrlItem.eq(currentId).addClass("current");
$dotItem.eq(currentId).addClass("current");
$doorItem.eq(currentId).show().addClass("current");
$doorList.height($doorItem.eq(currentId).height());

$ctrlItem.click(function(){
	fnPlay($(this).index());
});
$dotItem.click(function(){
	fnPlay($(this).index());
});


function fnPlay(id){
	if(currentId != id && lock==0){
		lock=1;
		currentId = id;
		currentHeight = $doorItem.eq(currentId).height();
		$ctrlItem.removeClass("current");
		$ctrlItem.eq(currentId).addClass("current");
		$dotItem.eq(currentId).addClass("current").siblings().removeClass("current");
		$doorItem.hide();
		$doorItem.eq(currentId).fadeIn(time).addClass("current");
		$doorList.delay(time/2).css({height:currentHeight});
		setTimeout(function(){lock=0},time*1.5);
	}
}


};
})(jQuery);
