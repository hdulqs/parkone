var googleAuth;
var loginPwd="";
var googleCode="";
var sk="";
var qrcode = new QRCode(document.getElementById("qrcode"), {
    width : 120,
    height : 120
});
var a=setInterval(function () {
    $("input").val("");
},0);
$("input").focus(function () {
    clearInterval(a);
});
getGoogleAuth();

function getGoogleAuth() {
    callServie("googleAuth","/api/user/googleauth","");
}

function googleAuthCallBack(r) {
    if(r.success){
        googleAuth=r.data.qrcode;
        sk=r.data.sk;
        $("#sk").text(sk);
	    makeCode();
    }else{
    	window.location.href = "personalCenter.html";
    	return false;
    }
}

function makeCode () {
    qrcode.makeCode(googleAuth);
}

function validatLoginPwd(obj) {
    loginPwd=$(obj).val();
    if(loginPwd==""){/*登录密码为空*/
        $("#warning-loginPwd").html('<i class="icon-exclamation-circle"></i><i data-i18n="[text]bindGoogleVerification.warningLoginPwd"></i>').fadeIn(50);
        $("#loginPwd").addClass("input-warning");
        $("#btn-submit").removeClass("btn-active");
    }else{/*登录密码不为空*/
        if(!googleCode==""){
            $("#warning-loginPwd").fadeOut(50);
            $(obj).removeClass("input-warning");
            $("#btn-submit").addClass("btn-active");
        }else{
            $("#warning-loginPwd").fadeOut(50);
            $(obj).removeClass("input-warning");
            $("#btn-submit").removeClass("btn-active");
        }
    }
    initLang();
}

function validatLoginPwdKeyUp(obj) {
    loginPwd=$(obj).val();
    if(!loginPwd==""){/*登录密码为空*/
        if(!googleCode==""){
            $(obj).removeClass("input-warning");
            $("#btn-submit").addClass("btn-active");
        }else{
            $(obj).removeClass("input-warning");
            $("#btn-submit").removeClass("btn-active");
        }
    }else{
        $("#btn-submit").removeClass("btn-active");
    }
}

function validatGoogleCode(obj) {
    googleCode=$(obj).val();
    if(googleCode==""){/*谷歌验证码为空*/
        $("#warning-googleCode").html('<i class="icon-exclamation-circle"></i><i data-i18n="[text]bindGoogleVerification.warningGoogleCode"></i>').fadeIn(50);
        $("#loginPwd").addClass("input-warning");
        $("#btn-submit").removeClass("btn-active");
    }else{/*谷歌验证码不为空*/
        if(!loginPwd==""){
            $("#warning-googleCode").fadeOut(50);
            $(obj).removeClass("input-warning");
            $("#btn-submit").addClass("btn-active");
        }else{
            $("#warning-googleCode").fadeOut(50);
            $(obj).removeClass("input-warning");
            $("#btn-submit").removeClass("btn-active");
        }
    }
    initLang();
}

function validatGoogleCodeKeyUp(obj) {
    googleCode=$(obj).val();
    if(!googleCode==""){/*谷歌验证码不为空*/
        if(!loginPwd==""){
            $(obj).removeClass("input-warning");
            $("#btn-submit").addClass("btn-active");
        }else{
            $(obj).removeClass("input-warning");
            $("#btn-submit").removeClass("btn-active");
        }
    }else{
        $("#btn-submit").removeClass("btn-active");
    }
}

function bindGoogle() {
    callServie("bindGoogle","/api/user/google/bind",{
        code:$("#googleCode").val(),
        password:$("#loginPwd").val()
    });
}

function bindGoogleCallBack(r) {
    if(r.success){
        var lang=$.cookie('newlang');
        if(typeof(lang)=="undefined"||lang=="en"){
            $("#btn-submit").next(".font-hint").html("success");
        }else if(lang=="tcn"){
           $("#btn-submit").next(".font-hint").html("綁定成功");
        }else if(lang=="scn") {
            $("#btn-submit").next(".font-hint").html("绑定成功");
        } 
        $("#btn-submit").next(".font-hint").css("display","inline-block");
        
        $.cookie("twoValid", 1, {expires: 30, path: '/'});
        $.cookie("googleStatus", 1, {expires: 30, path: '/'});
        
        setTimeout(function () {
            $("#btn-submit").next(".font-hint").hide();
            window.location.href="personalCenter.html";
        },1000);
    }else{
        if(r.error.code==1010){/*谷歌验证码错误*/
            $("#warning-googleCode").html('<i class="icon-exclamation-circle"></i><i   data-i18n="[text]bindGoogleVerification.warningGoogleCodeE"></i>').fadeIn(50);
            $("#googleCode").addClass("input-warning");
            $("#btn-submit").removeClass("btn-active");
        }else if(r.error.code==1012){/*登录密码错误*/
            $("#warning-loginPwd").html('<i class="icon-exclamation-circle"></i><i   data-i18n="[text]bindGoogleVerification.warningLoginPwdE"></i>').fadeIn(50);
            $("#loginPwd").addClass("input-warning");
            $("#btn-submit").removeClass("btn-active");
        }
    }
    initLang();
}
