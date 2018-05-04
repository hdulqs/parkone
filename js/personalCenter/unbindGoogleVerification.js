/*var loginPwd="";*/
var code="";

function validatCode(obj) {
    code = $(obj).val();
    if(code==""){/*验证码为空*/
        $("#warning-code").html('<i class="icon-exclamation-circle"></i><i data-i18n="[text]unbindGoogleVerification.warning2"></i>');
        $("#warning-code").fadeIn(50);
        $(obj).addClass("input-warning");
        $("#btn-submit").removeClass("btn-active");
    }else{/*验证码不为空*/
        $("#warning-code").fadeOut(50);
        $(obj).removeClass("input-warning");
        $("#btn-submit").addClass("btn-active");
    }
    initLang();
}

function validatCodeKeyUp(obj) {
    code = $(obj).val();
    if(!code==""){/*验证码不为空*/
        $(obj).removeClass("input-warning");
        $("#btn-submit").addClass("btn-active");
    }else{
        $(obj).addClass("input-warning");
        $("#btn-submit").removeClass("btn-active");
    }
}

/*解绑谷歌验证*/
function unbindGoogle(obj) {
    if($(obj).hasClass("btn-active")){
        callServieOther("unbindGoogle","/api/user/google/unbind",{
            code:$("#code").val()
        });
    }
}

function unbindGoogleCallBack(r) {
    if(r.success){
        var mobileStatus=$.cookie("mobileStatus");
    	if(mobileStatus==0 )$.cookie("twoValid", 0, {expires: 30, path: '/'});
        $.cookie("googleStatus", 0, {expires: 30, path: '/'});
       window.location.href="personalCenter.html";
    }else{
        alert(r.error.detail);
        return false;
    }
}


