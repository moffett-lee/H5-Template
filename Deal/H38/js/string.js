// 此字符串函数集无需依赖jquery，可适用于所有场合

/**
 * 消除字符串前后的空格
 */
String.prototype.Trim = String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, ""); 
}

/**
 * 返回按宽字符计算的长度，中日文字符宽度为英文字符的2倍
 */
String.prototype.wideLength = function() {
	var length = 0;
	for (var i = 0; i < this.length; i++) {
		// double size for wide char
		length += (this.isWideChar() ? 2 : 1);
	}
    return length;
}

/**
 * 判断字符串中的第index个字符是否宽字符
 */
String.prototype.isWideChar = function(index) {
	return (this.charCodeAt(index) > 255 || this.charCodeAt(index) < 0);
}

/**
 * 返回宽为length的字符串的前段内容
 */
String.prototype.wideLeft = function(length) {
	var filled = 0;
	var result = "";
	for (var i = 0; i < this.length; i++) {
		// double size for wide char
		filled += ((this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0) ? 2 : 1);
		if (filled > length) {
			break;
		} else {
			result += this.charAt(i);
		}
	}
	return result;
}

/**
 * 截断宽于length的字符串，并追加postfix后缀，postfix后缀默认为“...”
 */
String.prototype.wideCut = function(length, postfix) {
	if (typeof postfix == 'undefined') {
		postfix = '...';
	}
	return this.wideLength() > length ? this.wideLeft(length - postfix.wideLength()) + postfix : this.toString();
}
