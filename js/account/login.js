var isNotThrough = [true, true, true];
/*var winH = document.body.clientHeight;
var winW = document.body.clientHeight;*/
var yunDValue = '';
var passUrl = [
	"index",
	"resetSucess",
	"verificationSuccessful",
	"modifyLoginPassword",
	"resetPassword",
  "Mregister",
  "activityRegister",
	"authenticationProgress",
	"getBackPassword",
	"sendEmail"
];
//兼容 firefox
var borType = getOs();
var isHackFirsFox = true;
var maxtime;
var str;
var num1;
var num2;
var timer;

$(document).ready(function () {
    var userToken = deviceType == 1 ? $.cookie("userToken") : localStorage.userToken;
    if (!userToken || userToken == 'undefinde') {
        $("#orderBtn").hide();
        $("#assetBtn").hide();
        $("#AccountBtn").hide();
        
    } else {
        window.location.href = "../personalCenter/personalCenter.html";
    }
    
    setTimeout(function(){
        $("input").val("");
    	initYunD();
    },0);
})
window.addEventListener("resize",initPage);
function initPage(){
    if(borType != "Firefox"){
		var conH = $(".bg-register").height();
		if(conH <= 0) conH = 528;
		var winH = (document.documentElement.scrollHeight >document.documentElement.clientHeight) ? document.documentElement.scrollHeight : document.documentElement.clientHeight;     
		var pT = (winH-conH-200)/2;
		if(pT <= 0) pT = pT*(-1);
		$(".warp-box").css("margin-top",pT+"px");  	
    }
	resizebody();
}

$("#btn-submit").on("click", function () {
    var isCheck = isNotThrough.toString();
    if (isCheck.indexOf("true") < 0) {//全部信息填写正确
        loadbgloading();
        $("#bgloading").show();
        callServie("login", '/api/user/nologin/login', {
            username: $("#mail").val(),
            password: $("#firstpassword").val(),
            captchaId: "ef66943670784abc95366cd936c20f9d",
            validate: yunDValue
        })
    }
})

function initYunD(){
	$("#captcha").css("height","40px").html("");
	initNECaptcha({
	    captchaId: 'ef66943670784abc95366cd936c20f9d',
	    element: '#captcha',
	    mode: "float",
	    width: 338,
	    onReady: function (instance) {
	        // 验证码一切准备就绪，此时可正常使用验证码的相关功能
	       $("#captcha .yidun_refresh").attr("title","");
	       $("#captcha .yidun_loadtext").css({"text-indent":"200000px","opacity":0}).html("");
	       $("#captcha .yidun_tips .tips__text,#captcha .yidun_tips__text").attr("data-i18n","error.cue7");
	    },
	    onVerify: function (err, data) {

	        if (err) {
	        	$("#captcha .yidun_tips .tips__text,#captcha .yidun_tips__text").hide();
	        	setTimeout(function(){
		 	    	$("#captcha .yidun_refresh").attr("title","");
			        $("#captcha .yidun_loadtext").css({"text-indent":"200000px","opacity":0}).html("");
			        $("#captcha .yidun_tips .tips__text,#captcha .yidun_tips__text").attr("data-i18n","error.cue7").show();
					initLang();	
	        	},1000);
	        } else {
	        	$("#captcha .yidun_tips .tips__text,#captcha .yidun_tips__text").hide();
	            if (data.validate) {
	                isNotThrough[2] = false;
	                validatemail("#mail");
	                validatfirstpassword("#firstpassword");
	                // 点击登录按钮后可调用服务端接口，以下为伪代码，仅作示例用
	                yunDValue = data.validate;
	            }
	        }
	    }
	}, function onload(instance) {
	    // 初始化成功
	   
	    //instance.refresh();
	}, function onerror(err) {
	
	    // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
	});
}
function loginCallBack(r) {
    $("#bgloading").hide();
    if (!r.success) {
        isNotThrough[2] = true; /*设置图形验证码是否通过标志*/
        setSubmitStyle();
    	initYunD();
    	if (r.error.code == 1003) {/*用户未激活,跳到邮箱激活页面，并需主动发送一次激活邮件*/
            $.cookie("checkUserMail", $("#mail").val());
            window.location.href = "../account/sendEmail.html";
            return;
        }else if(r.error.code == 1032){
            str=r.error.detail;
            var str1=str.indexOf(":");
            num1=str1-2;
            num2=str1+6;
            var str2=str.substring(num1,num2);
            var time=str2.substring(0,2)*3600+str2.substring(3,5)*60+str2.substring(6)*1;
            maxtime = time; //按秒计算
            clearInterval(timer);
            CountDown();
            timer = setInterval("CountDown()", 1000);
        }else{
            alert(r.error.detail);
        }      
    } else {
        $.cookie("twoValid", r.data.twoValid, {expires: 30, path: '/'});
        $.cookie("googleStatus", r.data.googleStatus, {expires: 30, path: '/'});
        $.cookie("mobileStatus", r.data.mobileStatus, {expires: 30, path: '/'});
        $.cookie("lastVerfiyType", r.data.lastVerfiyType, {expires: 30, path: '/'});
        sessionStorage.setItem("userid",r.data.id)
        sessionStorage.setItem("userName",r.data.username)
        localStorage.twoValid = r.data.twoValid;
        localStorage.googleStatus = r.data.googleStatus;
        localStorage.mobileStatus = r.data.mobileStatus;
        localStorage.lastVerfiyType = r.data.lastVerfiyType;

        sessionStorage.setItem("haveLogin", true);
        $.cookie("userToken", r.data.token, {expires: 30, path: '/'});
        $.cookie("userEmail", $("#mail").val(), {expires: 30, path: '/'});
        localStorage.userToken = r.data.token;
        localStorage.userEmail = $("#mail").val();

        var isJump = true;
        var reffer = document.referrer;
        for(var i = 0; i<=(passUrl.length-1); i++){
            if(reffer.indexOf(passUrl[i]) > -1){
                window.location.href = "../personalCenter/personalCenter.html";
                return false;
            };
            if(i==passUrl.length-1){
                window.location.href = reffer;
                return true;
            }
        }
    }
}

/*账户锁定倒计时开始*/
function CountDown() {
    if (maxtime >= 0) {
        var hours =  Math.floor(maxtime/3600);
        var minutes = Math.floor((maxtime-hours*3600)/60);
        var seconds = Math.floor(maxtime-hours*3600-minutes*60);
        var msg =hours+":"+minutes + ":" + seconds;
        $("#serviceError #time-box").html(msg);
        $("#serviceError").removeClass("opt-dn");
        --maxtime;
    } else{
        clearInterval(timer);
    }
}
/*账户锁定倒计时结束*/

//提交按钮样式
function setSubmitStyle() {
    clearInterval(timer);
	$("#serviceError").addClass("opt-dn");
    var isCheck = isNotThrough.toString();
    if (isCheck.indexOf("true") < 0) {
        $("#btn-submit").addClass("btn-active");
    } else {
        $("#btn-submit").removeClass("btn-active");
    }
}

/*验证邮箱是否正确*/
function validatemail(obj) {
    var mail = $(obj).val();
    if (mail == "") {
        isNotThrough[0] = true;
        $("#warning-mail").html('<i class="icon-exclamation-circle"></i><i data-i18n="error.cue1"></i>');
        $(obj).addClass("input-warning");
    } else {

        isNotThrough[0] = false;
        $("#warning-mail").html("");
        $(obj).removeClass("input-warning");
    }
    setSubmitStyle();
    initLang();
}

function validatemailKeyUp(obj) {
    var mail = $(obj).val();
    if (!mail == "") {
        isNotThrough[0] = false;
        $(obj).removeClass("input-warning");
    }else{
        isNotThrough[0] = true;
        $(obj).addClass("input-warning");
    }
    setSubmitStyle();
}
/*验证密码是否正确*/
function validatfirstpassword(obj) {
    var firstpassword = $(obj).val();
    if (firstpassword == "") {
        isNotThrough[1] = true;
        $("#warning-firstpassword").html('<i class="icon-exclamation-circle"></i><i data-i18n="error.cue3"></i>');
        $(obj).addClass("input-warning");
    } else {
            isNotThrough[1] = false;
            $("#warning-firstpassword").html("");
            $(obj).removeClass("input-warning");
    }
    setSubmitStyle();
    initLang();
}

function validatfirstpasswordKeyUp(obj) {
    var firstpassword = $(obj).val();
    if (!firstpassword == "") {
        isNotThrough[1] = false;
        $(obj).removeClass("input-warning");
    }else{
        isNotThrough[1] = true;
        $(obj).addClass("input-warning");
    }
    setSubmitStyle();
}

function getOs()  
{  
    var OsObject = "";  
   if(navigator.userAgent.indexOf("MSIE")>0) {  
        return "MSIE";  
   }  
   if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
        return "Firefox";  
   }  
   if(isSafari=navigator.userAgent.indexOf("Safari")>0) {  
        return "Safari";  
   }   
   if(isCamino=navigator.userAgent.indexOf("Camino")>0){  
        return "Camino";  
   }  
   if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){  
        return "Gecko";  
   }  
     
}  
