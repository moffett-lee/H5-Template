
function $_(id) {
	return document.getElementById(id);
}

//获取当前时间
function CurentTime(){ 
    var now = new Date();   
    var year = now.getFullYear();      
    var month = now.getMonth() + 1;     
    var day = now.getDate();            
    var hour = now.getHours();           
    var minute = now.getMinutes();  
   
    var clock = year + "-";   
    if(month < 10)
        clock += "0";   
    clock += month + "-";   
    if(day < 10)
        clock += "0";       
    clock += day + " ";   
    if(hour < 10)
        clock += "0";    
    clock += hour + ":";
    if (minute < 10) clock += "0"; 
    clock += minute; 
    return(clock); 
}
//cookie域名变量: Cookie_Domain
var host=window.location.host;
var arr = host.split('.');
var Cookie_Domain = '.' + arr[arr.length - 2] + '.' + arr[arr.length - 1];

//添加cookie
function setCookie(name,value,day){
	if(day){
		var Days = day;
	} else {
		var Days = 30;
	}
	var exp  = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ";path=/;";
}

//获取cookie
function getCookie(name){
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null) return unescape(arr[2]); return null;
}

//读取所有保存的cookie字符串
function allCookie(){
	var str = document.cookie;
	return str;
}

//删除cookie
function delCookie(name){
	var date = new Date();
	var val=getCookie(name);
	date.setTime(date.getTime() - 100);
	document.cookie = name + "="+val+"; expires=" + date.toGMTString();
}

/**
 * 对基本变量的处理和判断
 */
function undef(obj){
	// exception if obj is not an Object
	return (typeof obj == "undefined" || obj == null);
};

function def(obj){
	// exception if obj is not an Object
	return (typeof obj != "undefined" && obj != null);
};

function empty(obj){
	if(typeof(obj) == "undefined" || obj === 0 || obj == "0" || obj == null || obj === false || obj == ""){
		return true;
	}
}
/**
 * 字符串一些基本操作
 */
function left_trim(str){
	return str.replace( /^\s*/, "");
}
function right_trim(str){
	return str.replace( /\s*$/, "");
}
function trim_str(str){
	return right_trim(left_trim(str));
}

/**
 * @return: 返回str的字节数
 */
function bytes(str){
    if(typeof(str)!='string'){
        str = str.value;
    }
    var len = 0;
    for(var i = 0; i < str.length; i++){
        if(str.charCodeAt(i) > 127){
            len++;
        }
        len++;
    }
    return len;
}
/**
 *	判断输入是否是一个数字
 */
function is_numeric( mixed_var ) {
	return !isNaN( mixed_var );
}

function is_int(a){
    var re = /^[0-9]*[1-9][0-9]*$/;
    return re.test(a);
}

/**
 * 对url的处理函数
 */
function gotoURL(url) {
	window.location.href = url;
}

function goURL(url,t) {
    if(t){
        setTimeout("window.location.href ='"+url+"';", t);
    }else{
        setTimeout("window.location.href ='"+url+"';", 200);
    }
}
function refreshURL(){
	location.reload();
}
//计算文字字数
function strCount(str){
    str = trim_str(str);
    if(empty(str)){
        return 0;
    }
    str = str.replace(/\s|　/g,'');
    return str.length;
}

function getFooterHtml(){
	var fontSize = getCookie('fontsize');
	fontSize = parseInt(fontSize);
	if( !is_numeric(fontSize) || fontSize > 30 || fontSize < 9){
		fontSize = 16;
	}
	var html = '';
	html += '<form id="setting" action="" method="post" onsubmit="return setFontSize();">字体大小设置：<select name="fontsize"> <option value="12" ';
	if( fontSize == 12){
		html += ' selected';
	}
	html += '>小</option><option value="16" ';
	if( fontSize == 16){
		html += ' selected';
	}
	html += '>中</option><option value="20" ';
	if( fontSize == 20){
		html += ' selected';
	}
	html += '>大</option></select> <input type="submit" value="更改" /></form><br/>';
	return html;
}
function fontSizeIo(size){
	if(size){
		if( size > 30 || size < 9){
			return true;
		}
		setCookie("fontsize", size, 365);
		return true;
	}
	var fontSize = getCookie('fontsize');
	fontSize = parseInt(fontSize);
	if( fontSize > 30 || fontSize < 9){
		fontSize = 16;
	}
	return fontSize;
}

function setFontSize(){
	var fontObj = document.getElementsByName("fontsize")[0];
	var fontSize= fontObj.options[fontObj.options.selectedIndex].value;

	if( !is_numeric(fontSize) || fontSize > 30 || fontSize < 9){
		fontSize = 16;
	}
	fontSizeIo(fontSize);
	fontSize = parseInt(fontSizeIo(''));
	var lineHeight='120%';
	var css = "html,body{font-size:" + fontSize + "px;} div{ line-height:" + lineHeight +";} h1,h2,h3,h4,h5,h6{font-size:" + (fontSize + 2) + "px; line-height:" + (fontSize + 6) + "px;}";
	
	$_('fontSet').innerHTML = css;
	return false;
}

function lately_read_record( articleid, title, pagenum){
	if( !is_numeric(articleid) || !is_numeric(pagenum)){
		return;
	}
	var new_read_list = articleid + "_" + pagenum + "_" + title;
	var lately_read_list = getCookie("lately_read_list");
 	if( lately_read_list != null && lately_read_list.length > 0){
		var read_list_arr = lately_read_list.split(",");
		var p;
		var i_counter = 0;
		for( p in read_list_arr){
			if( read_list_arr[p].indexOf(articleid + "_") === 0){
				continue;
			}
			new_read_list += "," + read_list_arr[p];
			i_counter ++;
			if( i_counter > 10){
				break;
			}
		}
	}
 	setCookie("lately_read_list", new_read_list, 365);		
}

function lately_xudu_recode(articleid, pageNum){
	if( !is_numeric(articleid) || !is_numeric(pageNum)){
		return;
	}
 	var xudu_str = getCookie("xudu");
 	var xudu_new;
 	if( xudu_str != null && xudu_str.length > 0 ){
 		var xudu_str_n = xudu_str.substring(1, xudu_str.length-1);
	 	var pattern = '\"'+articleid+'\"\:\"(\\d{1,5})\"';
	 	var num = xudu_str_n.match(pattern);

	 	if( num != null && parseInt(num[1]) < parseInt(pageNum)){
	 		var xudu_s = xudu_str_n.replace('"'+articleid+'":"'+num[1]+'"','');
	 		xudu_s = xudu_s.replace(',,',',');
	 		if( xudu_s.indexOf(',') == 0){
	 			xudu_s = xudu_s.substring(1, xudu_s.length);
	 		}
	 		if( xudu_s.substring(xudu_s.length-1, xudu_s.length) == ','){
	 			xudu_s = xudu_s.substring(0, xudu_s.length-1);
	 		}
	 		if( xudu_s.length > 0){
	 			xudu_new = '{' + xudu_s + ',"'+ articleid +'":"'+ pageNum +'"}';
	 		}else {
	 			xudu_new = '{"'+ articleid +'":"'+ pageNum +'"}';
	 		}		
	 	}else {
	 		if( num == null){
	 			xudu_new = '{' + xudu_str_n + ',"'+ articleid +'":"'+ pageNum +'"}';
	 		}else {
	 			xudu_new = xudu_str;
	 		} 		
	 	}
 	}else {
 		xudu_new = '{"'+ articleid +'":"'+ pageNum +'"}'
 	}
	var xudu_arr = xudu_new.split(",");
	var max_num = 20;
	if( xudu_arr.length > max_num){
		var arr_length = xudu_arr.length - max_num;
		var xd;
		var sum_length = 0;
		for(xd in xudu_arr){
			if( xd < arr_length){
				sum_length += xudu_arr[xd].length;
			}else {
				break;
			}
		}
		xudu_new = '{'+ xudu_new.substring(sum_length+1, xudu_new.length);		
	}
 	setCookie("xudu", xudu_new, 365);
}
function is_pc(){
	var ua = navigator.userAgent.toLowerCase().match(/windows nt/);
	if( ua == null){
		return false;
	}else {
		return true;
	}
}

function is_login(){
	var userid = getCookie('pauserid');
	var username = getCookie('pausername');
	if( !is_numeric( userid) || empty(userid) || empty(username)){
		return false;
	}
	return true;
}