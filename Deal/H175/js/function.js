/*

Last UpDate 2010-05-25

*/

$(function(){
	//現在居るファイル名	   
	var currentFile = location.href.split('/').pop();
	
	//ua取得
	var ua = navigator.userAgent;

	/* ウィンク効果 */
	$("#sidecolumn a img").hover(function(){
		$(this).css("opacity", "0.2");
		$(this).css("filter", "alpha(opacity=20)");
		$(this).fadeTo("slow", 1.0);
	});
	
	//fancybox(lightbox)
	try{
		$("div a").fancybox({
			'zoomOpacity' : true,'overlayShow' : false,'zoomSpeedIn' : 500,'zoomSpeedOut' : 500});
	}catch(e){}


	//ゼブラテーブル（しましまのテーブル）実装時に使用してください
	//classが、'list'で終わるulの、偶数の要素に、'even'クラスを付ける
	$('ul[class$="list"] li:nth-child(even)').addClass('even');
	//classが、'table'で終わるテーブルの、偶数trに、'even'クラスを付ける
	$('table[class$="table"] tr:nth-child(even)').addClass('even');
	
	
	//rollover
	$('a img').each(function(){
		var imgSrc = $(this).attr('src');
		//smartRollover
		if(imgSrc.match(/(.*)_off(\..*)/)){
			var repSrc = RegExp.$1+'_on'+RegExp.$2;
			$('<img />').attr('src',repSrc);
			$(this).hover(function(){
				$(this).attr('src',repSrc);
				$(this).css({opacity: '1',filter: 'alpha(opacity=100)'});
			},function(){
				$(this).attr('src',imgSrc);
			});
		//ロールオーバーが無い場合は、透明度80%
		}else if(!$(this).hasClass('not')){
			$(this).hover(function(){
					$(this).css({
						opacity: '0.8',
						filter: 'alpha(opacity=80)'
					});
			},function(){
					$(this).css({
						opacity: '1',
						filter: 'alpha(opacity=100)'
					});
			}
			
			);
		}
	});

	/* 
	お問い合わせフォームの送信ボタンで、ロールオーバーやウィンク、とpngに指示があった場合に
	ご利用ください。使わない方は”削除”してください
	*/
	
	//タイプ1.submit押した感 & smartrollover
	$('form p.submit input').mousedown(function(){
		$(this).css({position:'relative',top:'1px',left:'1px'});
	}).mouseup(function(){
		$(this).css({position:'static'});
	}).mouseout(function(){
		$(this).css({position:'static'});
	})
	  .hover(function(){
		$(this).attr('src',$(this).attr('src').replace(/^(.*)_off.(.*)$/,'$1_on.$2'));
	},function(){
		$(this).attr('src',$(this).attr('src').replace(/^(.*)_on.(.*)$/,'$1_off.$2'));
	});
	
	/* ←使う際は、このコメントを削除してください
	//タイプ2.submit押した感 & ウィンク
	$('form p.submit input').mousedown(function(){
		$(this).css({position:'relative',top:'1px',left:'1px'});
	}).mouseup(function(){
		$(this).css({position:'static'});
	}).mouseout(function(){
		$(this).css({position:'static'});
	})
	  .hover(function(){
		$(this).css({opacity:0.2});
		$(this).fadeTo('slow',1.0);
	});
	*/
	
});