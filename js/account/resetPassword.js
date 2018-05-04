var isNotThrough = [true,true];
//提交按钮样式
function setSubmitStyle() {
    var isCheck = isNotThrough.toString();
    if (isCheck.indexOf("true") < 0) {
        $("#btn-submit").addClass("btn-active");
    } else {
        $("#btn-submit").removeClass("btn-active");
    }
}
var clearVal=setInterval(function () {
    $("input").val("");
},0);

$("input").focus(function () {
    clearInterval(clearVal);
});
/*验证密码*/
function validatfirstpassword(obj) {
    var firstpassword=$(obj).val();
    var re1 = /^.{8,}$/;
    var re2 = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if(firstpassword==""){
        $("#warning-firstpassword").html('<i class="icon-exclamation-circle"></i><i data-i18n="error.cue1"></i>');
        $(obj).addClass("input-warning");
        isNotThrough[0]=true;
    }else{
        if (!re1.test(firstpassword) || !re2.test(firstpassword)) {
            $("#warning-firstpassword").html('<i class="icon-exclamation-circle"></i><i data-i18n="error.cue2"></i>');
            $(obj).addClass("input-warning");
            isNotThrough[0]=true;
        }else{
            $("#warning-firstpassword").html("");
            isNotThrough[0]=false;
        }
    }
    var lastPwd=$("#secondpassword").val();
    if(lastPwd!=""){
        validatsecondpassword("#secondpassword")
    }
    setSubmitStyle();
    initLang();
}

function validatfirstpasswordKeyUp(obj) {
    var firstpassword=$(obj).val();
    if(firstpassword==""){
        $(obj).addClass("input-warning");
        isNotThrough[0]=true;
    }else{
        $(obj).removeClass("input-warning");
        isNotThrough[0]=false;
    }
    setSubmitStyle();
}

/*验证重复密码*/
function validatsecondpassword(obj) {
    var firstpassword=$("#firstpassword").val();
    var secondpassword=$(obj).val();
    if(secondpassword==""){
        $("#warning-secondpassword").html('<i class="icon-exclamation-circle"></i><i data-i18n="error.cue1"></i>');
        $(obj).addClass("input-warning");
        isNotThrough[1]=true;
    }else{
        if (firstpassword === secondpassword) {
            $("#warning-secondpassword").html("");
            $(obj).removeClass("input-warning");
            isNotThrough[1]=false;
        }else{
            $("#warning-secondpassword").html('<i class="icon-exclamation-circle"></i><i data-i18n="error.cue3"></i>');
            $(obj).addClass("input-warning");
            isNotThrough[1]=true;
        }
    }
    setSubmitStyle();
    initLang();
}

function validatsecondpasswordKeyUp(obj) {
    var secondpassword=$(obj).val();
    if(secondpassword==""){
        $(obj).addClass("input-warning");
        isNotThrough[1]=true;
    }else{
        $(obj).removeClass("input-warning");
        isNotThrough[1]=false;
    }
    setSubmitStyle();
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
$(function(){
	var token = getQueryString('token');
	if(!token || token == 'null' || token == null){
		window.location.href="login.html";
	}
})
$("#btn-submit").on("click",function() {
	var token = getQueryString('token');
	if(!token){
        window.location.href = "../account/login.html";
	}
    var param = {
        "password":$('#firstpassword').val(),
        "confrimPwd":$('#secondpassword').val(),
		"token":token
    }
    loadbgloading();
    $("#bgloading").show();
    callServie("resetPwd",'/api/user/nologin/reset-pwd',param);
})
function resetPwdCallBack(d){
    $("#bgloading").hide();
	if(d.success){
		msg($(".resetSuccess").html());
		clearAllCookie();
        sessionStorage.clear();
        window.location.href = "../account/login.html";
	}else{
		$("#btn-submit").removeClass("btn-active");
        $("input").val("");
        return false;
	}		
};