var isEnd=false;

function getNews(field,value){
	if(isEnd)return;
	var more=document.getElementById("more");
	$("#more").html('信息正在加载中..');
	var page = $("#page").text();
	page     =  parseInt(page)+1;
	$("#page").html(page);
	var sid = getSid();
	var url = "/HdFilm/filmList/"+field+"/"+value+"/json/json/page/"+page+sid;

	$.getJSON(url, function(data){
		var str = '';	
		if(data==null || data==false){
			isEnd=true;
			more.innerHTML="没有符合条件的电影!";
			$("#more").click(function(){
				return false;
			});
		}else{
			var dlength = data.length; 		
			for(i=0;i<dlength;i++){
				var img   = "<div class='movieList'><a href='"+data[i].linkurl+"')}'><img src="+data[i].thumb+" /></div>"
				
				var title = "<div class='movieTitle'><a href='"+data[i].linkurl+"'>"+data[i].title+"</a></div>";
				if(data[i].title==''){var title='';}
				
				var bofang = "<a hr";
				bofang =bofang+"ef="+data[i].video_url+" class='movieListPlay'>播放</a>";
				if(data[i].video_url==''){var bofang='';}
				
				var direct = '<p>导演:<span>'+data[i].direct+'</span></p>';
				if(data[i].direct==''){var direct='';}
				
				var starring = '<p>主演:<span>'+data[i].starring+'</span></p>';
				if(data[i].starring==''){var starring='';}

				var vmtype = '<p>类型:<span>'+data[i].vmtype+'</span></p>';
				if(data[i].vmtype==''){var vmtype='';}
				
				var produceyear = "<p>时间:<span>"+data[i].produceyear+"</span></p>";		
				if(data[i].produceyear==''){var produceyear='';}
				
				var hits = "<p>播放:<span>"+data[i].hits+"</span>次</p>";
				if(data[i].hits==''){var hits='';}
		
				var str = str+"<div class='movieBlock'>"+img+"<div class='movieDetail float'>"+title+bofang+"<div class='movieDetails'>"+direct+starring+vmtype+produceyear+hits+"</div></div></div>";
	
			}
			
			$("#content").append(str);

			if(dlength < 10){isEnd=true;}

			if(!isEnd){
				more.innerHTML="加载更多";
			}else{
				more.innerHTML="已经显示完全部内容!";
				$("#more").click(function(){
					return false;
				});  
			}
		}
	});
}