var oldPwdVal="";
var newPwdVal="";
var confrimPwdVal="";
var modifyLoginPwdPa={};
var re2 =/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
var isNotThrough = [true,true,true];

var a=setInterval(function () {
    $("input").val("");
},0);

$("input").focus(function () {
    clearInterval(a);
})

function getPwdVal() {
    oldPwdVal=$("#oldPwd").val();
    newPwdVal=$("#newPwd").val();
    confrimPwdVal=$("#confrimPwd").val();
}

//旧密码验证
function validatoldPwd(obj) {
    getPwdVal();
    if(oldPwdVal == ""){/*旧登录密码为空*/
		isNotThrough[0] = true;
        $("#warning-oldPwd").html('<i class="icon-exclamation-circle"></i><i data-i18n="modifyLoginPassword.warning4"></i>').fadeIn(50);
        $("#oldPwd").addClass("input-warning");
    }else{
        if(oldPwdVal===newPwdVal){
            isNotThrough[1] = true;
            $("#warning-newPwd").html('<i class="icon-exclamation-circle"></i><i data-i18n="modifyLoginPassword.warning2"></i>').fadeIn(50);
            $("#newPwd").addClass("input-warning");
        }else{
            isNotThrough[0] = false;
            $("#warning-oldPwd").fadeOut(50);
            $(obj).removeClass("input-warning");
        }

    }
	setSubmitStyle();
    initLang();
}

function validatoldPwdKeyUp(obj) {
    getPwdVal();
    if (!oldPwdVal == "") {/*旧登录密码不为空*/
        isNotThrough[0] = false;
        $("#warning-oldPwd").fadeOut(50);
        $(obj).removeClass("input-warning");
    }else{
        isNotThrough[0] = true;
        $(obj).addClass("input-warning");
    }
    setSubmitStyle();
}
//新密码验证
function validatnewPwd(obj) {
    getPwdVal();
    if (newPwdVal == "") {
		isNotThrough[1] = true;
        $("#warning-newPwd").html('<i class="icon-exclamation-circle"></i><i data-i18n="modifyLoginPassword.warning5"></i>').fadeIn(50);
        $(obj).addClass("input-warning");
    } else {
		if(!re2.test(newPwdVal)){ //新登录密码格式错误
			isNotThrough[1] = true;
			$("#warning-newPwd").html('<i class="icon-exclamation-circle"></i><i data-i18n="[text]modifyLoginPassword.warning6"></i>').fadeIn(50);
			$(obj).addClass("input-warning");
		}else{
			if(newPwdVal==oldPwdVal){
                isNotThrough[1] = true;
                $("#warning-newPwd").html('<i class="icon-exclamation-circle"></i><i data-i18n="modifyLoginPassword.warning2"></i>').fadeIn(50);
                $(obj).addClass("input-warning");
                $("#warning-confrimPwd").fadeOut(50);
                $("#confrimPwd").removeClass("input-warning");
            }else{
                isNotThrough[1] = false;
                $("#warning-newPwd").fadeOut(50);
                $(obj).removeClass("input-warning");
                validatconfrimPwd("#confrimPwd");
            }
		}
	}
	setSubmitStyle();
	initLang();
}

    function validatnewPwdKeyUp(obj) {
        getPwdVal();
        if (!newPwdVal == "") {
            isNotThrough[1] = false;
            $("#warning-newPwd").fadeOut(50);
            $(obj).removeClass("input-warning");
        }else{
            isNotThrough[1] = true;
            $(obj).addClass("input-warning");
        }
        setSubmitStyle();
    }
//确认密码验证
function validatconfrimPwd(obj) {
    getPwdVal();
    if(confrimPwdVal==""){ /*确认密码为空*/
		isNotThrough[2] = true;
        $("#warning-confrimPwd").html('<i class="icon-exclamation-circle"></i><i data-i18n="modifyLoginPassword.warning7"></i>').fadeIn(50);
        $(obj).addClass("input-warning");
    }else{
		if(confrimPwdVal != newPwdVal){/*两次新密码不一致*/
			isNotThrough[2] = true;
            $("#warning-confrimPwd").html('<i class="icon-exclamation-circle"></i><i data-i18n="modifyLoginPassword.warning3"></i>').fadeIn(50);
            $(obj).addClass("input-warning");
        }else if(confrimPwdVal === oldPwdVal){
            isNotThrough[2] = true;
            $("#warning-confrimPwd").html('<i class="icon-exclamation-circle"></i><i data-i18n="modifyLoginPassword.warning2"></i>').fadeIn(50);
            $(obj).addClass("input-warning");
        }else{
            isNotThrough[2] = false;
            $("#warning-confrimPwd").fadeOut(50);
            $(obj).removeClass("input-warning");
        }
    }
    setSubmitStyle();
	initLang();
}

    function validatconfrimPwdKeyUp(obj) {
        getPwdVal();
        if(!confrimPwdVal==""){ /*确认密码为空*/
            isNotThrough[2] = false;
            $("#warning-confrimPwd").fadeOut(50);
            $(obj).removeClass("input-warning");
        }else{
            isNotThrough[2] = true;
            $(obj).addClass("input-warning");
        }
        setSubmitStyle();
    }
//提交按钮样式
function setSubmitStyle(){
    resizebody();
	var isCheck = isNotThrough.toString();
    if(isCheck.indexOf("true") < 0){
		$("#btn-submit").addClass("btn-active");	
	}else{	
		$("#btn-submit").removeClass("btn-active");
	}
}

/*修改登录密码*/
function modifyLoginPwd(obj) {
	var isCheck = isNotThrough.toString();

	if(isCheck.indexOf("true") < 0){
        loadbgloading();
        $("#bgloading").show();
		$("#btn-submit").addClass("btn-active");	
        modifyLoginPwdPa.oldPwd=oldPwdVal;
        modifyLoginPwdPa.newPwd=newPwdVal;
        modifyLoginPwdPa.confrimPwd=confrimPwdVal;
		callServieOther("loginPwd","/api/user/modify/loginpwd",modifyLoginPwdPa);
	}else{	
		$("#btn-submit").removeClass("btn-active");
	}
}

function loginPwdCallBack(r) {
    $("#bgloading").hide();
    if(r.success){
        $("#loginOut").click();
    }else{
        alert(r.error.detail);
        isNotThrough = [true,true,true];
        $("#btn-submit").removeClass("btn-active");
        $("input").val("");
        if(r.error.code==1012){
            //$("#warning-oldPwd").html('<i class="icon-exclamation-circle"></i><i  data-i18n="modifyLoginPassword.warning1"></i>').fadeIn(50);
            //$("#oldPwd").addClass("input-warning");
        }
    }
    initLang();
};




