// JavaScript Document
window.domain="100bt.com";

$(function(){
	//更多按钮
	qqAjax.load({root:"#ajaxList", link: ".jiazai a", appentTo:true,
		beforeClick: function(){
			cmTool.loadBts($(this));
		},
		clickFunc: function(){
			$(this).remove();
		}
	});
	
	//监听a标签
	$("#ajaxList,#dd_msg").on("click", ".msg a", function(){
		var div = $(this).closest("div");
		var sysMsgId = $(div).attr("sysMsgId");
		var msgSessionId = $(div).attr("msgSessionId");
		var linkUrl= $(this).attr("link-url");
		readSysMsg(sysMsgId,msgSessionId,linkUrl);
	});
});


//更新消息为已读URL
function readSysMsg(sysMsgId,msgSessionId,linkUrl){
	var param= {
		'model':1,
		'sysMsgId':sysMsgId,
		'msgSessionId':msgSessionId
	};
	if(msgSessionId && msgSessionId>0){
		var url = "http//my.100bt.com/ReadCombinedSysMsg.action?callback=?";
	}else{
		var url = "http//my.100bt.com/ReadUncombinedSysMsg.action?callback=?";
	}
	$.getJSON(url,param,function(data){
		window.location.href = linkUrl;
	})
};

//删除消息
function deleteSysMsg(that,sysMsgId,msgSessionId){
	var param= {
		'model':1,
		'sysMsgId':sysMsgId
	};
	if(msgSessionId && msgSessionId>0){
		var url = "http//my.100bt.com/RemoveCombinedSysMsg.action?callback=?";
	}else{
		var url = "http//my.100bt.com/RemoveUncombinedSysMsg.action?callback=?";
	}
	$.getJSON(url,param,function(data){
		if(data.resultCode.success){
			alert("删除成功");
		}else{
			alert(data.resultCode.detail);
		}
		$($(that).closest("li")).remove();
	});
};
