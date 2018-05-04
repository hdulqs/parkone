/**
 * Created by Lss on 2017/11/29. 输入框内容检测
*/
jQuery.fn.checkFormat = function(inputValParm){
	var initDefault = {
		callback:function(){}
	}
	jQuery.extend(initDefault,inputValParm);
	var result = new Object(),
		len = this.val().length;
	var regexp = {
		loginPwd: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/,	//登录密码
		fundPwd:/^\d{6}$/,	//资金密码
		china: /[\u4E00-\u9FA5]/, // 中文
		decimal: /^\d+(\.\d+)?$/, // 小数
		number: /^[0-9]*[1-9][0-9]*$/, //数字
		phone: /^1[3,5,7,8]\d{9}$/, // 手机号码
		email: /[@]/im,	//邮箱
		url: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/,
		nbsp: /\s/ //判断空格
	}
	result.loginPwd = regexp.loginPwd.test(this.val())  ? true : false;
	result.fundPwd = regexp.fundPwd.test(this.val())  ? true : false;
	result.china = regexp.china.test(this.val())  ? true : false;
	result.decimal = regexp.decimal.test(this.val())  ? true : false;
	result.number = regexp.number.test(this.val())  ? true : false;
	result.phone = regexp.phone.test(this.val()) ? true : false;
	result.email = regexp.email.test(this.val())  ? true : false;
	result.url = regexp.url.test(this.val())  ? true : false;
	result.nbsp = regexp.nbsp.test(this.val())  ? true : false;
	result.empty = (this.val() == "") ? true : false;
	result.length = len;
	result.emptyNbsp = (regexp.nbsp.test(this.val()) && len >= 1) || (this.val() == "") ? true : false;
	initDefault.callback(result);
}

jQuery.fn.formatWarning = function(obj,attrJson,callback){
	$(attrJson).each(function(k,v){
		$(obj).attr(v._k,v._v);
	});
	if(callback) callback();	
}