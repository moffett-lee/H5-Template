// 兼容性设置，使用老版头部时不再重复计算PV
//if (typeof(gb_sso_decrypt) != 'function' && !/\.(beta|staging)\./.test(location.host)) {
if (typeof(gb_sso_decrypt) != 'function') {
	var _gaq = _gaq || [];
    if (/^m\./.test(location.host)) {
        _gaq.push(['_setAccount', 'UA-3253201-16']);
    } else {
        _gaq.push(['_setAccount', 'UA-3253201-1']);
    }
	_gaq.push(['_addOrganic', 'soso', 'w']);
	_gaq.push(['_addOrganic', 'youdao', 'q']);
	_gaq.push(['_addOrganic', 'sogou', 'query']);
	_gaq.push(['_setDomainName', '.goodbaby.com']);
	_gaq.push(['_trackPageview']);
}
var GB = GB || {};
$.extend(GB, {
	nickName: '游客', // 昵称
	isLogged: false, // 是否已登录
	isMember: false, // 是否会员
	babyChannel: 1 , // 宝宝年龄所属频道，0为备孕，1为怀孕，以此类推
	babyStage: 0, // 所属频道的时间计数
	babyStageUnit: '', // 所属频道的时间计数单位
	babySubChannel: 0, // 所属子频道
	babyChannelCatId: 0,// 所属子频道所对应的分类id
	babyChannelUrl: '',// 所属频道URL
	babyBirthday: -2, // 宝宝的生日，-1为未设置，-2为尚未初始化
	crmUserId: 0,
	inited: false,
	adPool: [],
	adLazyLoad: 0,
	currentAdId: 0,
	defaultBabyChannel: 0,
	babyConstants: {
		beiyun: 1047,
		huaiyun: new Array(1048, 1049, 1050, 1050, 1051, 1052, 1053, 1054, 1055, 
						   1056, 1057, 1058, 1059, 1060, 1061, 1062, 1063, 1064,
						   1065, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073,
						   1074, 1075, 1076, 1077, 1078, 1079, 1080, 1081, 1082,
						   1083, 1084, 1085, 1086, 1087),
		xinshenger: new Array(1088, 1089, 1090, 1091),
		yinger: new Array(1092, 1093, 1094, 1095),
		youer: new Array(1096, 1097, 1098),
		xuelingqian: new Array(1099, 1100, 1101)
	},
	
	/*
	 * 初始化操作，为页面提供必要的信息或设置
	 */
	init: function() {
		var account = this.getAccount();
		if (account) {
			this.crmUserId = account.crmuserid;
			this.isLogged = true;
			this.isMember = account.is_member;
			this.nickName = account.username;
		}
		this.getBabyChannel(); // 获取宝宝生日所属的频道信息
	},
	
	/**
	 * 页面完成载入后的操作
	 */
	onload: function() {
		$("#btnCustom").bind('click', myFun = function(){
			if (! GB.isLogged) {
				window.location.href = "http//m.goodbaby.com/sso/login.php";   
			}
		});
		$("#searchWords").keyup(function(event){
			if (event.keyCode == 13) {
				$("#searchBtn").click();
			}
		});
		$("#searchBtn").click(function(){
			var words = $("#searchWords").val();
			var searchChannel = $('#searchChannel').val();
			if(searchChannel=='' || searchChannel == 'undefined' || searchChannel == undefined)
				searchChannel = 'article';
			window.location.href = "http//m.goodbaby.com/sso/search.php?c="+searchChannel+"&k=" + encodeURIComponent(words);
		});
		
		// 启用click统计
		this.collectClickInfo();
		
        // 百度统计
        var baidu = document.createElement('script'); 
        baidu.type = 'text/javascript';
        baidu.src = unescape('http//hm.baidu.com/h.js%3F09d70af44d76cbd88ab7278d8e61d23b');
        var ss = document.getElementsByTagName('script')[0]; 
        ss.parentNode.insertBefore(baidu, ss); 
        
        // GA统计
        if (_gaq && _gaq.length) {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https//ssl' : 'http//www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[1]; s.parentNode.insertBefore(ga, s); 
        }
	},
	
	/**
	 * 获取用户的account信息，如昵称、是否会员等
	 */
	getAccount: function() {
		if ( ! this.account) {
			var c = $.cookie('NickNameForShow');
			var is_member = false;
			if (c) {
				c = c.split(':');
				is_member = ($.cookie('memberornot') == '1');
				this.account = {
					'username': unescape(c[0]),
					'crmuserid': c[1],
					'is_member': is_member
				};
			}
		}
		return this.account;
	}, 
	
	/**
	 * 显示右上角的账户信息
	 */
	showAccountInfo: function() {
		var path = arguments.length ? arguments[0] : "#accountInfo";
		if (this.isLogged) {
			$(path).html(
				'<span>欢迎您，<strong>' + this.nickName.wideCut(18) + '</strong>！</span>'
				+ '<span><a href="http//m.goodbaby.com/sso/logout.php" class="btn1">退出</a></span>'
			).show();
		} else {
			$(path).html(
				'<span>欢迎您，<strong>游客</strong>！</span>'
				+ '<span><a href="http//m.goodbaby.com/sso/login.php" class="btn1">登录</a></span>'
				+ '<span><a href="http//m.goodbaby.com/sso/register.php" class="btn2">注册</a></span>'
			).show();
		}
	},
	
	/**
	 * 显示个人贴士信息
	 */
	showTipsInfo: function() {
		var url = 'http//cms.goodbaby.com/_api/api.php?schema=get_articles_by_categoryid&limit=1&format=jsonp';
		if (this.isLogged && !$("#tipsInfo").html()) {
			$.getJSON(url + '&catid=' + this.babyChannelCatId + '&callback=?', function(data) {
			    var introtext = (typeof data[0] == 'undefined') ? '' : data[0].introtext;
				if (introtext) {
					$("#tipsInfo").html(
						'<a href="' + GB.babyChannelUrl + '">前往年龄段频道</a>'
					);
					if (GB.babyChannel == 0) {
						var baby_level = introtext.replace('<p>', '').replace('<\/p>', '');
					}
					else {
						var baby_level = '您的宝宝已经' + GB.babyStage + GB.babyStageUnit
					}
					$("#babyLevel").html(baby_level);
				}
			});	
		}
	},
	
	/**
	 * 显示金币数
	 */
	showGoldcoin: function() {
		var url = 'http//m.goodbaby.com/bbs/goldcoin.php?';
		if (this.isLogged && !$("#goldCoin").html()) {
			$.getJSON(url + '&callback=?', function(data) {
				var goldcoin = data[0].goldcoin ? data[0].goldcoin : 0;
				$('#goldCoin').html(goldcoin);
			});	
		}
	},
	
	/**
	 * 显示我的主题提醒数
	 */
	showNotice: function() {
		var url = 'http//m.goodbaby.com/bbs/notice.php?';
		if (this.isLogged && !$("#notice").html()) {
			$.getJSON(url + '&callback=?', function(data) {
				var notice = data[0].notice ? data[0].notice : '0';
				if (notice != '0') {
					$('#notice').html(notice);
					$('#notice').show();
				} else {
					$('#notice').html(notice);
					$('#notice').hide();
				}
			});	
		}
	},
	
	/**
	 * 获取宝宝生日所属的频道
	 */
	getBabyChannel: function() {
		if (this.babyBirthday != -2) {
			return this.babyChannel;
		}
		this.babyBirthday = $.cookie('babybirthday');
		if (this.babyBirthday) {
			var matchs = /^\s*([0-9]+)[\/-]([0-9]+)[\/-]([0-9]+)\s*$/.exec(this.babyBirthday);
			if (matchs) {
				var babyDate = new Date(matchs[1], matchs[2] - 1, matchs[3]);
				var now = new Date();
				var days =  Math.floor((now.getTime() - babyDate.getTime()) / (3600 * 24 * 1000));
				if (babyDate > now) {
					this.babyChannel = 1; // 怀孕
					this.babyStage = Math.ceil((280 - Math.abs(days)) / 7);
					this.babyStage = this.babyStage >= 1 ? this.babyStage : 1;
					this.babySubChannel = this.babyStage >= 29 ? 2 : (this.babyStage >= 12 ? 1 : 0);
					this.babyChannelCatId = this.babyConstants.huaiyun[this.babySubChannel];
					this.babyChannelUrl = 'http//m.goodbaby.com/huaiyun/';
					this.babyStageUnit = '周';
				} else {
					if (days >= 2190) {
						this.babyChannel = GB.defaultBabyChannel; // 超出学龄前范围，设置为默认值
						this.babyChannelCatId = this.babyConstants.beiyun;
						this.babyChannelUrl = 'http//m.goodbaby.com/beiyun/';
					} else if (days >= 1095) {
						this.babyChannel = 5; // 学龄前，按年计算，按年计算，分别为3-4,4-5,5-6
						this.babySubChannel = Math.floor(days / 365) - 3;
						this.babyStage = Math.floor(days / 365);
						this.babyChannelCatId = this.babyConstants.xuelingqian[this.babySubChannel];
						this.babyChannelUrl = 'http//m.goodbaby.com/xuelingqian/';
						this.babyStageUnit = '岁';
					} else if (days > 365) {
						this.babyChannel = 4; // 幼儿，分别为1-1.5,1.5-2,2-3
						var years = days / 365;
						this.babyStage = Math.floor(days / 365);
						this.babySubChannel = years >= 2 ? 2 : (years >= 1.5 ? 1 : 0);
						this.babyChannelCatId = this.babyConstants.youer[this.babySubChannel];
						this.babyChannelUrl = 'http//m.goodbaby.com/youer/';
						this.babyStageUnit = '岁';
					} else if (days > 28) {
						this.babyChannel = 3; // 婴儿，按3个月计算
						if (days <= 31) {
							this.babyStage = (now.getMonth() - babyDate.getMonth());
						}
						else {
							this.babyStage = (now.getYear() > babyDate.getYear() ? 12 : 0) + (now.getMonth() - babyDate.getMonth()) - (now.getDay() > babyDate.getDay() ? 1 : 0) - 1;
						}
						this.babySubChannel = Math.floor((this.babyStage) / 3);
						this.babyChannelCatId = this.babyConstants.yinger[this.babySubChannel];
						this.babyChannelUrl = 'http//m.goodbaby.com/yinger/';
						this.babyStageUnit = '个月';
					} else {
						this.babyChannel = 2; // 新生儿，按周计算
						this.babySubChannel = Math.floor(days / 7) - 1;
						this.babyStage = Math.floor(days / 7);
						this.babyChannelCatId = this.babyConstants.xinshenger[this.babySubChannel];
						this.babyChannelUrl = 'http//m.goodbaby.com/xinshenger/';
						this.babyStageUnit = '周';
					}
				}
			} else {
				this.babyChannel = GB.defaultBabyChannel;
				this.babyChannelCatId = this.babyConstants.beiyun;
				this.babyChannelUrl = 'http//m.goodbaby.com/beiyun/';
			}
		}
		return this.babyChannel;
	},
	
	/**
	 * 启用click统计的支持
	 */
	collectClickInfo: function() {
		if (_gaq && document.body.id && !$(document.body).data('collect_click_info')) {
			$('a[target="_blank"]').click(function() {
				var id = [];
				var label = 'click';
				var p = $(this).parents('[id!=""]');
				if (p.size()) {
					label += '_' + p.first().find('a').index(this);
				}
				p.each(function (index, item) {
					if (item.tagName == 'BODY' || item.tagName == 'HTML') {
						return;
					}
					id.push(item.id);
				});
				_gaq.push(['_trackEvent', 'Clicks: ' + document.body.id, id.reverse().join('_')], label);
				//alert(id.reverse().join('_'));
			});
			$(document.body).data('collect_click_info', true);
		}
	},
	
	/**
	 * 显示一个广告
	 */
	showAd: function(id) {
		if (id) {
			var interval = arguments.length  > 1 && arguments[1] ? parseInt(arguments[1]) : 5000;
			document.write('<div id="gb_ad_' + id + '" interval="' + interval + '"></div>');
			GB.adPool.push(id);
			if (GB.adLazyLoad == 0) {
				GB.adLazyLoad = setTimeout(GB.loadAdInPool, 500);
			}
		}
	},
	loadAdInPool: function() {
		/*
		if (typeof(jQuery.fn.jCarouselLite) != 'function') {
			GB.adLazyLoad = setTimeout(GB.loadAdInPool, 500);
			return;
		}
		*/
		GB.adLazyLoad = 0;
		var ids = GB.adPool.join(',');
		GB.adPool = [];
		var url = 'http//ad.goodbaby.com/multi.php?ids=' + ids + '&callback=?';
		$.getJSON(url, function(html) {
			for (var item in html) {
				if (item.substr(0, 3) == 'ad_') {
					GB.fillAdContent(item.substr(3), html[item]);
				}
			}
		});
	},
	/**
	 * 填充广告内容
	 */
	fillAdContent: function(aid, o) {
		if (!o) {
			return;
		}
		var id = '#gb_ad_' + aid;
		var html = [];
		var switchers = [];
		var extra_class = ' class="current"';
		for (var i = 0; i < o.length; i++) {
			//html.push('<li>' + o[i].imghref + '</li>');
			if (o[i].swf) {
				html.push(o[i].swf.replace(/<\/object>/i, '<param name="wmmode" value="transparent"></object>').replace(
					/<embed /i, '<embed wmmode="transparent" '));
			} else if (o[i].imghref) {
				html.push(o[i].imghref);
			} else {
				html.push('');
			}
			switchers.push('<li' + extra_class + ' id="gb_ad_sw_' + aid + '_' + (i + 1) + 
				'"><a href="javascript:void(0)" aid="' + aid + '" order="' + (i + 1) + '"></a></li>');
			extra_class = '';
		}
		//$(id).html('<ul>' + html.join("\n") + '</ul>');
		$(id).html(html.join("\n")).attr('ad_count', o.length).attr('ad_current', 1);
		if (o.length > 1) {
			$(id).append('<div class="ad_list"><ul>' + switchers.join('') + '</ul></div>');
			interval = parseInt($(id).attr('interval'));
			if (interval == 0) {
				interval = 5000;
			}
			var intervalId = setInterval(function() {
				if (GB.currentAdId == aid) {
					return;
				}
				var current = parseInt($(id).attr('ad_current'));
				var count = parseInt($(id).attr('ad_count'));
				$('#gb_ad_img_' + aid + '_' + current).hide();
				$('#gb_ad_sw_' + aid + '_' + current).removeClass('current');
				current++;
				if (current > count) {
					current = 1;
				}
				$('#gb_ad_img_' + aid + '_' + current).show();
				$('#gb_ad_sw_' + aid + '_' + current).addClass('current');
				$(id).attr('ad_current', current);
			}, interval);
			$(id).attr('interval_id', intervalId);
			$(id).mouseenter(function() {
				GB.currentAdId = aid;
			}).mouseleave(function() {
				GB.currentAdId = 0;
			});
			$(id + ' .ad_list a').click(function() {
				var current = parseInt($(id).attr('ad_current'));
				var order = parseInt($(this).attr('order'));
				var aid = parseInt($(this).attr('aid'));
				if (current != order) {
					$(id).attr('ad_current', order);
					$('#gb_ad_img_' + aid + '_' + current).hide();
					$('#gb_ad_sw_' + aid + '_' + current).removeClass('current');
					$('#gb_ad_img_' + aid + '_' + order).show();
					$('#gb_ad_sw_' + aid + '_' + order).addClass('current');
				}
			});
			/*
			$(id).jCarouselLite({
				visible: 1,
				auto: interval,
				speed: 0,
				circular: true,
				vertical: false,
				mouseOverStop: true,
				scroll: 1,
				start: 0,
			});
			*/
		}
	}
});
if ( ! GB.inited) { // 避免重复调用
	GB.init(); // 初始化
	GB.inited = true;
	$(document).ready(
		function() {GB.onload();}
	);
}
