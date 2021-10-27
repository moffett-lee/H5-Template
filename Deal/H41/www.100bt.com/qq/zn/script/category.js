// JavaScript Document
$(function(){
	//UI绑定
	categoryUI.init();
});


var categoryUI = {
	slide: function(){
		var root = $("#op");
		root.on("click", ".sx", function(){
			$(this).siblings(".h2,.cnt").toggle();
			$(this).toggleClass("sx_up");
			return false;
		});
	},
	collect: function(){
		this._clickOnece("#qms .collect", function($T, data){
			var returnInfo = data.returnInfo;
			if(returnInfo){
				if(returnInfo.returnCode == 0){
					$T.hide().siblings(".b1").show();
				}else{
					alert(returnInfo.returnInfo);
				}
			}
		});
	},
	sign: function(){
		this._clickOnece("#qms .sign", function($T, data){
			var resultCode = data.resultCode;
			var checkInInfo = data.checkInInfo;
			console.log(data);
			if(resultCode){
				if(resultCode.code == 0){
					$T.addClass("signed").data("url", "");
					alert("连续签到"+ checkInInfo.checkInTimes +"天");
				}else{
					alert(resultCode.detail);
				}
			}
		});
	},
	_clickOnece: function(selector, postCb){
		$(selector).click(function(){
			var $T = $(this), url = $T.data("url");
			$T.unbind("click").bind("click", function(){
				alert("正在处理，请耐心等候");
			});
			$.post(url, function(data){
				postCb && postCb($T, data);
				$T.unbind("click");
			}, "json");
			return false;
		});
	},
	init: function(){
		this.slide();
		this.collect();
		this.sign();
		//分页按钮
		qqAjax.load({root:"#ajaxList", link: ".pager a",
			beforeClick: function(){
				cmTool.loadPage();
			},
			clickFunc: function(root){
				cmTool.hideLoadPage();
				//有导航栏的遮挡
				header.scrollTo(0, 0);
			}
		});
	}
};