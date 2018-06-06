var isNotThroughs = [true,true,true,true,true];
var isNotThrough1 = [true,true,true,true,true];
var isCheck = "";
 var  isCheck1 ="";
var validate="";
var token="";
var winH = document.body.clientHeight;
var winW = document.body.clientHeight;
var borType = getOs();
getPhontData();

$(document).ready(function(){
	var userToken = $.cookie("userToken");
	if(userToken && userToken != 'undefinde'){
		window.location.href = "../personalCenter/personalCenter.html";
	}
	var utm_source = getUrlParam("utm_source");
    sessionStorage.setItem("utm_source",utm_source);
	initYunD();
    initYunD1();
    $("#btn-submit").click(function(){
        alert("即将上线，敬请期待");
        return;
        var mail = $("#mail").val();
        var fPsw = $("#firstpassword").val();
        var sPsw = $("#secondpassword").val();
        if($(this).hasClass("btn-active")){
            loadbgloading();
            $("#bgloading").show();
            callServie("register",'/api/user/nologin/register',{
                "username":mail,
                "password":fPsw,
                "captchaId":token,
                "validate":validate,
                "confirmPwd":sPsw,
                "inviteCode":""
            });
        }else{
            validatemail("#mail");
            validatfirstpassword("#firstpassword");
            validatsecondpassword("#secondpassword");
        }
    });
    $("#btn-check,#font-agree").click(function () {
        if($("#btn-check").hasClass("icon-checkbox-checked")){
            $("#btn-check").removeClass("icon-checkbox-checked");
            $("#btn-check").addClass("icon-checkbox-unchecked");
            isNotThroughs[4] = true;
            $("#btn-submit").removeClass("btn-active");
        }else{
            $("#btn-check").removeClass("icon-checkbox-unchecked");
            $("#btn-check").addClass("icon-checkbox-checked");
            isNotThroughs[4] = false;
            isCheck = isNotThroughs.toString();
            if(isCheck.indexOf("true") < 0){//全部信息填写正确
                $("#btn-submit").addClass("btn-active");
            }else{ //全部信息填写其中有误
                $("#btn-submit").removeClass("btn-active");
            }
        }
    })
    $("#btn-submit1").click(function(){
        alert("即将上线，敬请期待");
        return;
        var mail = $("#mail1").val();
        var fPsw = $("#firstpassword1").val();
        var code = $("#code").val();

        if($(this).hasClass("btn-active")){
            loadbgloading();
            $("#bgloading").show();
            callServie("register2",'/api/user/nologin/register',{
                "username":mail,
                "password":fPsw,
                "captchaId":token,
                "validate":validate,
                "smsCode":code,
                "inviteCode":""
            });
        }else{
            validatemail("#mail1");
            validatfirstpassword("#firstpassword1");
            validatsecondpassword("#code");
        }
    });
    
     $("#btn-check1,#font-agree1").click(function () {
        if($("#btn-check1").hasClass("icon-checkbox-checked")){
            $("#btn-check1").removeClass("icon-checkbox-checked");
            $("#btn-check1").addClass("icon-checkbox-unchecked");
            isNotThrough1[4] = true;
            $("#btn-submit1").removeClass("btn-active");
        }else{
            $("#btn-check1").removeClass("icon-checkbox-unchecked");
            $("#btn-check1").addClass("icon-checkbox-checked");
            isNotThrough1[4] = false;
            isCheck1 = isNotThrough1.toString();
            if(isCheck1.indexOf("true") < 0){//全部信息填写正确
                $("#btn-submit1").addClass("btn-active");
            }else{ //全部信息填写其中有误
                $("#btn-submit1").removeClass("btn-active");
            }
        }
    })
    initLang();
})


window.addEventListener("resize",initPage);
function initPage(){
    $("input[type=text],input[type=password]").attr("autoComplete","off").val("");
    if(borType != "Firefox"){
		var conH = $(".bg-register").height();
		if(conH <= 0) conH = 578;
		var winH = (document.documentElement.scrollHeight >document.documentElement.clientHeight) ? document.documentElement.scrollHeight : document.documentElement.clientHeight;     
		var pT = (winH-conH-200)/2;
		if(pT <= 0) pT = pT*(-1);
		$(".warp-box").css("margin-top",pT+"px");
	}
	resizebody();
}
function initYunD1(){
	$("#codeCheck1").css("height","40px").html("");
	initNECaptcha({
            captchaId: 'ef66943670784abc95366cd936c20f9d',
            element: '#codeCheck1',
            width: 370,
            mode: "float",
            onReady: function (instance) {
                $("#codeCheck1 .yidun_refresh").attr("title","");
                $("#codeCheck1 .yidun_loadtext").css({"text-indent":"200000px","opacity":0}).html("");
                $("#codeCheck1 .yidun_tips .tips__text,#codeCheck1 .yidun_tips__text").attr("data-i18n","error.cue8");
                initLang();
            },
            onVerify: function (err, data) {
                if(err){
                    $("#codeCheck1 .yidun_tips .tips__text,#codeCheck1 .yidun_tips__text").hide();
                    setTimeout(function(){
                        $("#codeCheck1 .yidun_refresh").attr("title","");
                        $("#codeCheck1 .yidun_loadtext").css({"text-indent":"200000px","opacity":0}).html("");
                        $("#codeCheck1 .yidun_tips .tips__text,#codeCheck1 .yidun_tips__text").attr("data-i18n","error.cue8").show();
                        initLang(); 
                    },1000);
                }
                if(data){
                    isNotThrough1[3] = false;
                    validate = data.validate;
                    token = data.token;
                    isCheck1 = isNotThrough1.toString();
                    if(isCheck1.indexOf("true") < 0 ){//全部信息填写正确
                        $("#btn-submit1").addClass("btn-active");
                    }else{ //全部信息填写其中有误
                        $("#btn-submit1").removeClass("btn-active");
                    }
                }
            }
        }, function onload (instance) {
        }, function onerror (err) {
    });
}
function initYunD(){
	initNECaptcha({
            captchaId: 'ef66943670784abc95366cd936c20f9d',
            element: '#codeCheck',
            width: 338,
            mode: "float",
            onReady: function (instance) {
                $("#codeCheck .yidun_refresh").attr("title","");
		        $("#codeCheck .yidun_loadtext").css({"text-indent":"200000px","opacity":0}).html("");
		        $("#codeCheck .yidun_tips .tips__text,#codeCheck .yidun_tips__text").attr("data-i18n","error.cue8");
		        initLang();
            },
            onVerify: function (err, data) {
            	if(err){
            		$("#codeCheck .yidun_tips .tips__text,#codeCheck .yidun_tips__text").hide();
		        	setTimeout(function(){
			 	    	$("#codeCheck .yidun_refresh").attr("title","");
				        $("#codeCheck .yidun_loadtext").css({"text-indent":"200000px","opacity":0}).html("");
				        $("#codeCheck .yidun_tips .tips__text,#codeCheck .yidun_tips__text").attr("data-i18n","error.cue8").show();
						initLang();	
		        	},1000);
            	}
                if(data){
                	$("#codeCheck .yidun_tips .tips__text,#codeCheck .yidun_tips__text").hide();
                    isNotThroughs[3] = false;
                    validate = data.validate;
                    token = data.token;
                    isCheck = isNotThroughs.toString();
                    if(isCheck.indexOf("true") < 0 ){//全部信息填写正确
                        $("#btn-submit").addClass("btn-active");
                    }else{ //全部信息填写其中有误
                        $("#btn-submit").removeClass("btn-active");
                    }
                }
            }
        }, function onload (instance) {
        }, function onerror (err) {
    });
}
//CallBack: 注册提交
function registerCallBack(d){
    $("#bgloading").hide();
    var mail = $("#mail").val();
    if(d.success){
        $.cookie("checkUserMail",mail);
        window.location.href = "../account/sendEmail.html";
    }else{
        initYunD();
        alert(d.error.detail);
       // $("#serviceError span").html(d.error.detail);
        $("#serviceError").removeClass("opt-dn");
        $("#btn-submit").removeClass("btn-active");
        $("input").val("");
        if(d.error.code == 1017){
            window.location.reload();
        }
        //_instance.refresh();// 调用实例refresh方法刷新图形验证码
    }
}

/*验证邮箱*/
function validatemail(obj) {
    var mail=$(obj).val();
    if(mail==""){
        isNotThroughs[0] = true;
        $("#warning-mail").html('<i class="icon-exclamation-circle"></i><i data-i18n="error.cue1"></i>');
        $(obj).addClass("input-warning");
    }else{
    	isNotThroughs[0] = false;
        $("#warning-mail").html("");
        if (mail.indexOf("@")==-1) {
            isNotThroughs[0] = true;
            $("#warning-mail").html('<i class="icon-exclamation-circle"></i><i data-i18n="error.cue2"></i>');
            $(obj).addClass("input-warning");
            $("#btn-submit").removeClass("btn-active");
        }
    }
	setSubmitStyle();
    initLang();
}

function validatemailKeyUp(obj) {
    var mail=$(obj).val();
    if(!mail==""){
        isNotThroughs[0] = false;
    }else{
        isNotThroughs[0] = true;
    }
    setSubmitStyle();
}
/*验证密码*/
function validatfirstpassword(obj) {
    var firstpassword=$(obj).val();
    var re2 =/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    
    if(firstpassword == ""){
        isNotThroughs[1] = true;
        $("#warning-firstpassword").html('<i class="icon-exclamation-circle"></i><i data-i18n="error.cue3"></i>');
        $(obj).addClass("input-warning");
        $("#btn-submit").removeClass("btn-active");
    }else{
        $("#warning-firstpassword").html("");
        if (!re2.test(firstpassword)) {
            isNotThroughs[1] = true;
            $("#warning-firstpassword").html('<i class="icon-exclamation-circle"></i><i data-i18n="error.cue4"></i>');
            $(obj).addClass("input-warning");
            $("#btn-submit").removeClass("btn-active");
        }else{
            isNotThroughs[1] = false;
            $("#warning-firstpassword").html("");
            $(obj).removeClass("input-warning");
        }
    }
    var lasePwd=$("#secondpassword").val();
    if(lasePwd!=""){
        validatsecondpassword("#secondpassword");
    }
    setSubmitStyle();
    initLang();
}

function validatfirstpasswordKeyUp(obj) {
    var firstpassword=$(obj).val();
    if(!firstpassword == ""){
        isNotThroughs[1] = false;
        $(obj).removeClass("input-warning");
    }else{
        isNotThroughs[1] = true;
        $(obj).addClass("input-warning");
    }
    setSubmitStyle();
}
/*验证重复密码*/
function validatsecondpassword(obj) {
    var firstpassword=$("#firstpassword").val();
    var secondpassword=$(obj).val();
    if(secondpassword == ""){
        isNotThroughs[2] = true;
        $("#warning-secondpassword").html('<i class="icon-exclamation-circle"></i><i data-i18n="error.cue6"></i>');
        $(obj).addClass("input-warning");
        $("#btn-submit").removeClass("btn-active");
    }else{
        if (firstpassword === secondpassword) {
            isNotThroughs[2] = false;
            $("#warning-secondpassword").html("");
            $(obj).removeClass("input-warning");
        }else{
            isNotThroughs[2] = true;
            $("#warning-secondpassword").html('<i class="icon-exclamation-circle"></i><i data-i18n="error.cue5"></i>');
            $(obj).addClass("input-warning");
            $("#btn-submit").removeClass("btn-active");
        }
    }
    setSubmitStyle();
    initLang();
}

function validatsecondpasswordKeyUp(obj) {
    var secondpassword=$(obj).val();
    if(!secondpassword == ""){
        isNotThroughs[2] = false;
        $(obj).removeClass("input-warning");
        $("#btn-submit").addClass("btn-active");
    }else{
        isNotThroughs[2] = true;
        $(obj).addClass("input-warning");
        $("#btn-submit").removeClass("btn-active");
    }
    setSubmitStyle();
}
//提交按钮样式
function setSubmitStyle(){
    $("#serviceError").addClass("opt-dn");
    $("#serviceError span").html("");

    $("#serviceError1").addClass("opt-dn");
    $("#serviceError1 span").html("");
    isCheck = isNotThroughs.toString();
    isCheck1 = isNotThrough1.toString();
    if(isCheck.indexOf("true") < 0 ){//全部信息填写正确
        $("#warning-secondpassword,#warning-firstpassword").html("");
        $("#btn-submit").addClass("btn-active");
    }else{/*全部信息填写其中有误*/
        $("#btn-submit").removeClass("btn-active");
    }
    if(isCheck1.indexOf("true") < 0 ){//全部信息填写正确
        $("#warning-secondpassword1,#warning-firstpassword1").html("");
        $("#btn-submit1").addClass("btn-active");
    }else{/*全部信息填写其中有误*/
        $("#btn-submit1").removeClass("btn-active");
    }
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

/******手机注册开始******/

/*验证手机*/
function validatemail1(obj) {
    var re2 =/^1\d{10}$/;
    var mail=$(obj).val();
    if(mail==""||!re2.test(mail)){
        isNotThrough1[0] = true;
        var err_str=(!re2.test(mail)&&mail!="")?'<i class="icon-exclamation-circle"></i><i data-i18n="error.cue10"></i>':'<i class="icon-exclamation-circle"></i><i data-i18n="error.cue9"></i>'
        $("#warning-mail1").html(err_str);
        $(obj).addClass("input-warning");
    }else{
        isNotThrough1[0] = false;
        $("#warning-mail1").html("");
    }
    setSubmitStyle();
    initLang();
}

function validatemail1KeyUp(obj) {
    var mail=$(obj).val();
    obj.value=obj.value.replace(/[^\d]/g,"");
    if(!mail==""){
        isNotThrough1[0] = false;
    }else{
        isNotThrough1[0] = true;
    }
    setSubmitStyle();
}
/*验证密码*/
function validatfirstpassword1(obj) {
    var firstpassword=$(obj).val();
    var re2 =/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    
    if(firstpassword == ""){
        isNotThrough1[1] = true;
        $("#warning-firstpassword1").html('<i class="icon-exclamation-circle"></i><i data-i18n="error.cue3"></i>');
        $(obj).addClass("input-warning");
        $("#btn-submit1").removeClass("btn-active");
    }else{
        $("#warning-firstpassword1").html("");
        if (!re2.test(firstpassword)) {
            isNotThrough1[1] = true;
            $("#warning-firstpassword1").html('<i class="icon-exclamation-circle"></i><i data-i18n="error.cue4"></i>');
            $(obj).addClass("input-warning");
            $("#btn-submit1").removeClass("btn-active");
        }else{
            isNotThrough1[1] = false;
            $("#warning-firstpassword1").html("");
            $(obj).removeClass("input-warning");
        }
    }
    var lasePwd=$("#secondpassword1").val();
    setSubmitStyle();
    initLang();
}

function validatfirstpassword1KeyUp(obj) {
    var firstpassword=$(obj).val();
    if(!firstpassword == ""){
        isNotThrough1[1] = false;
        $(obj).removeClass("input-warning");
    }else{
        isNotThrough1[1] = true;
        $(obj).addClass("input-warning");
    }
    setSubmitStyle();
}
//
function validatCode11(obj) {
    var code=$("#code").val();
    if(code!=""){
        isNotThrough1[2]=false;
        var isCheck1 = isNotThrough1.toString();
            if(isCheck1.indexOf("true") < 0){//全部信息填写正确
                $("#btn-submit1").addClass("btn-active");
            }else{ //全部信息填写其中有误
                $("#btn-submit1").removeClass("btn-active");
            }
    }
    else{
        isNotThrough1[2]=true;

    }
}

function validatCode11KeyUp(obj) {
    var code=$("#code").val();
    if(code!=""){
        isNotThrough1[2]=false;
        var isCheck1 = isNotThrough1.toString();
        if(isCheck1.indexOf("true") < 0){//全部信息填写正确
            $("#btn-submit1").addClass("btn-active");
        }else{ //全部信息填写其中有误
            $("#btn-submit1").removeClass("btn-active");
        }
    }else{
        isNotThrough1[2]=true;
        $("#btn-submit1").removeClass("btn-active");
    }
}

/*获取手机验证码*/
function getUnbindMobile(obj) {
    var re2 =/^1\d{10}$/;
    var mail=$("#mail1").val();
    if(mail==""||!re2.test(mail)){
        isNotThrough1[0] = true;
        var err_str=(!re2.test(mail)&&mail!="")?'<i class="icon-exclamation-circle"></i><i data-i18n="error.cue10"></i>':'<i class="icon-exclamation-circle"></i><i data-i18n="error.cue9"></i>'
        $("#warning-mail1").html(err_str);
        $("#mail1").addClass("input-warning");
    }else{
    	time(obj);
    	callServieOther("getBindMobile","/api/user/nologin/send-mobile-regcode",{
            mobile:$("#mail1").val(),
            regionCode: $("#phone").attr("regionCode")
        });

    }
    initLang();
}

function getBindMobileCallBack(r) {
    if(r.success){

    }else{
    	alert(r.error.detail);
    	return false;
    }
}


function time(o) {
    $(".btn-again").removeAttr("data-i18n");
    if (wait == 0) {
        o.style.color="#13b2b1";
        o.removeAttribute("disabled");
        var lang=$.cookie('newlang');
        if(typeof(lang)=="undefined"||lang=="en"){
            o.value="Send Again";
        }else if(lang=="tcn"){
            o.value="再次獲取";
        }else if(lang=="scn") {
            o.value="再次获取";
        }
        wait=60;
    } else {
        o.style.color="#999";
        o.setAttribute("disabled", true);
        o.value=wait+"S";
        wait--;
        // clearTimeout(aa)
        setTimeout(function() {
            time(o)
        },
        1000)
    }

}

//CallBack: 手机注册提交
function register2CallBack(d){
    $("#bgloading").hide();
    if(d.success){
        $.cookie("checkUserMail",mail);
        window.location.href = "../account/login.html";
    }else{
        initYunD1();
        alert(d.error.detail);
        isNotThrough1[3]=true;
        $("#btn-submit1").removeClass("btn-active");
        if(d.error.code == 1017){
            $("#warning-secondpassword1").html('<i class="icon-exclamation-circle"></i><i>'+d.error.detail+'</i>');
        }
    }
}


//注册切换

$(function(){
    $(".register-switch span").click(function(){
        $(".register-switch span").removeClass("active");
        $(this).addClass("active");
        var index=$(this).index();
        $(".form-box").hide();
        $(".form-box").eq(index).show();
		initYunD();
		initYunD1();
    })
})

$(function(){
    $(".eye span").click(function(){
        $(".eye span").toggleClass("eye-close");
        if( $(".eye span").hasClass("eye-close")){
            $(".eye-box input").attr("type","text")
        }else{
            $(".eye-box input").attr("type","password")

        }
    })
})




