    $(document).ready(function(){
        $("input[type=text],input[type=password]").val("");
        initLang();
        windowOnresize();
    })
    getPhontData();
	initYunD();
	initYunD1();
    var email=false;
    var mobileV=false;
    var codeV=false;
    var captcha=false;
    var captcha1=false;
    var validate1="";
    var captchaParameter ={};
    var winH = document.body.clientHeight;
    var winW = document.body.clientHeight;
    function windowOnresize() {
        if (winH < 660) {
            $(".top-box,.bottom-box,.bg-register div.content-wrap").css({
                "position": "relative",
                "top": "initial",
                "left": "initial",
                "margin": "0 auto",
                "-webkit-transform": "translate3d(0,0,0)",
                "-moz-transform": "translate3d(0,0,0)",
                "-ms-transform": "translate3d(0,0,0)",
                "-o-transform": "translate3d(0,0,0)",
                "transform": "translate3d(0,0,0)"
            });
            $(".bg-register div.content-wrap").css("padding-top", "30px");
            $(".bg-register").css({
                "height": "auto",
                "overflow": "hidden"
            });
            $(".loaded").css("height", "initial");
            $(".register").css("overflow", "initial");
        }
        ;
    }

    /*验证邮箱*/
    function validatEmail(obj) {
        var mail=$(obj).val();
        if(mail==""){
            $("#warning-mail").html('<i class="icon-exclamation-circle"></i><i data-i18n="error.cue1"></i>');
            $(obj).addClass("input-warning");
        }else{
            $("#warning-mail").html("");
            if (mail.indexOf("@")==-1) {
                $("#warning-mail").html('<i class="icon-exclamation-circle"></i><i data-i18n="error.cue2"></i>');
                $(obj).addClass("input-warning");
                $("#btn-submit").removeClass("btn-active");
            }else{
                if($(obj).hasClass("input-warign")){}
                email=true;
                $("#warning-mail").html("");
                $(obj).removeClass("input-warning");
                email=true;
                if(captcha){
                    $("#btn-submit").addClass("btn-active");
                }
            }
        }
        
        initLang();
    }

    function validatEmailKeyUp(obj) {
        var mail=$(obj).val();
        if(!mail==""){
            $(obj).removeClass("input-warning");
            email=true;
            if(captcha){
                $("#btn-submit").addClass("btn-active");
            }
        }else{
            $(obj).addClass("input-warning");
            email=false;
            $("#btn-submit").removeClass("btn-active");
        }
    }

    /*提交表单，发送修改密码邮件*/
    function submitCallBack(obj) {
      if($(obj).hasClass("btn-active")){
              loadbgloading();
              $("#bgloading").show();
            localStorage.email=$("#mail").val();
            $.cookie("checkUserMail",$("#mail").val());
            var sendForgetpwdEmailP={};
            sendForgetpwdEmailP=captchaParameter;
            sendForgetpwdEmailP.username=$("#mail").val();
            callServie("sendForgetpwdEmail","/api/user/nologin/forgetpwd",sendForgetpwdEmailP);
       }                                     
    }

    function sendForgetpwdEmailCallBack(r) {
        $("#bgloading").hide();
        if(!r.success){
            captcha=false;
            initYunD();
            if(r.error.code == 1023){ //邮箱未注册
                email=false;
                $("#warning-mail").html('<i class="icon-exclamation-circle"></i><i>'+r.error.detail+'</i>');
                $("#mail").addClass("input-warning");
                $("#btn-submit").removeClass("btn-active");
            }else{
                alert(r.error.detail);
            }
        }else{
            window.location.href = 'sendEmailFindPwd.html';
        }
    };

    //验证手机号是否注册


    /*验证手机号*/
    function validatemobile(obj) {
        var mobile=$(obj).val();
        if(mobile==""){
            $("#warning-mobile").html('<i class="icon-exclamation-circle"></i><i data-i18n="error.cue6"></i>');
        }else{
            $("#warning-mobile").html("");
            $("#phone").removeClass("input-warning");
            mobileV=true;
            if(captcha1){
                $("#btn-submit1").addClass("btn-active");
            }
        }
        initLang();
    }

    function validatemobileKeyUp(obj) {
        var mobile=$(obj).val();
        if(!mobile==""){
            $("#phone").removeClass("input-warning");
            mobileV=true;
            if(captcha1){
                $("#btn-submit1").addClass("btn-active");
            }
        }else{
            mobileV=false;
            $("#btn-submit1").removeClass("btn-active");
        }
    }

	function initYunD(){
		initNECaptcha({
	        captchaId: 'ef66943670784abc95366cd936c20f9d',
	        element: '#captcha',
	        mode: "float",
	        width: 338,
	        onReady: function (instance) {
	            // 验证码一切准备就绪，此时可正常使用验证码的相关功能
	           $("#captcha .yidun_refresh").attr("title","");
	           $("#captcha .yidun_loadtext").css({"text-indent":"200000px","opacity":0}).html("");
	           $("#captcha .yidun_tips .tips__text,#captcha .yidun_tips__text").attr("data-i18n","error.cue5");
	           initLang();
	        },
	        onVerify: function (err, data) {
	            if (err) {
	                $("#captcha .yidun_tips .tips__text,#captcha .yidun_tips__text").hide();
	                setTimeout(function(){
	                    $("#captcha .yidun_refresh").attr("title","");
	                    $("#captcha .yidun_loadtext").css({"text-indent":"200000px","opacity":0}).html("");
	                    $("#captcha .yidun_tips .tips__text,#captcha .yidun_tips__text").attr("data-i18n","error.cue5").show();
	                    initLang(); 
	                },1000);
	            }
	            if(data){
	            	$("#captcha .yidun_tips .tips__text,#captcha .yidun_tips__text").hide();
	                captchaParameter={
	                    validate: data.validate,
	                }
	                captcha=true;
	                if(email){
	                    $("#btn-submit").addClass("btn-active");
	                }
	            }
	                initLang(); 
	
	        }
	
	    }, function onload (instance) {
	        // 初始化成功
	    }, function onerror (err) {
	        // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
	    })
	}
	function initYunD1(){
		initNECaptcha({
	        captchaId: 'ef66943670784abc95366cd936c20f9d',
	        element: '#captcha1',
	        mode: "float",
	        width: 338,
	        onReady: function (instance) {
	            // 验证码一切准备就绪，此时可正常使用验证码的相关功能
	           $("#captcha1 .yidun_refresh").attr("title","");
	           $("#captcha1 .yidun_loadtext").css({"text-indent":"200000px","opacity":0}).html("");
	           $("#captcha1 .yidun_tips .tips__text,#captcha1 .yidun_tips__text").attr("data-i18n","error.cue5");
	           initLang();
	        },
	        onVerify: function (err, data) {
	            if (err) {
	                $("#captcha1 .yidun_tips .tips__text").hide();
	                setTimeout(function(){
	                    $("#captcha1 .yidun_refresh").attr("title","");
	                    $("#captcha1 .yidun_loadtext").css({"text-indent":"200000px","opacity":0}).html("");
	                    $("#captcha1 .yidun_tips .tips__text,#captcha1 .yidun_tips__text").attr("data-i18n","error.cue5").show();
	                    initLang(); 
	                },1000);
	            }
	            if(data){
	                validate1= data.validate;
	                captcha1=true;
	                if(mobileV){
	                    $("#btn-submit1").addClass("btn-active");
	                }
	            }
	                initLang(); 
	
	        }
	
	    }, function onload (instance) {
	        // 初始化成功
	    }, function onerror (err) {
	        // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
	    })
	}
    function submitMobileFirst(obj) {
        if($(obj).hasClass("btn-active")){
            loadbgloading();
            $("#bgloading").show();
            var sendForgetpwdEmailP={
                username:$("#mobile").val(),
                regiconCode:$("#phone").attr("regionCode"),
                validate:validate1
            };
            callServie("submitMobileFirst","/api/user/nologin/forgetpwd",sendForgetpwdEmailP);
       }
    }
    function submitMobileFirstCallBack(r) {
        $("#bgloading").hide();
        if(r.success){
            $(".form-box").hide()
            $(".form-box").eq(2).show();
            $("#mobile1").val($("#mobile").val());
            time(document.querySelector(".btn-gain"));
        }else{
            initYunD1();
            $("#warning-mobile").html('<i class="icon-exclamation-circle"></i><i>'+r.error.detail+'</i>');
            $("#mobile1").addClass("input-warning");
            $("#btn-submit1").removeClass("btn-active");
        }
    };


    //发送验证码
    function getUnbindMobile(obj) {
        if($("#mobile1").val()==""){
            $("#warning-mobile1").html('<i class="icon-exclamation-circle"></i><i></i>');
            $("#mobile1").addClass("input-warning");
        }else{
            time(obj);
            callServieOther("getBindMobile","/api/user/nologin/resend-forgetpwd-sms",{
                mobile:$("#mobile1").val(),
                regionCode: $("#phone").attr("regionCode")
            });

        }
        initLang();
    }

    function getBindMobileCallBack(r){
        if(r.success){
        }else{
        	initYunD();
            alert(r.error.detail);
            return false;
        }
    }

    /*验证验证码是否为空*/
    function validatCode11(obj) {
        var code=$(obj).val();
        if(code==""){
            $("#warning-code").html('<i class="icon-exclamation-circle"></i><i data-i18n="tip3"></i>');
            $(obj).addClass("input-warning");
        }else{
            $("#warning-code").html("");
            $(obj).removeClass("input-warning");
            $("#btn-submit2").addClass("btn-active");
        }
        initLang();
    }

    //提交找回密码
    function submitMobileLast(obj){
        var code=$("#code").val();
        var mobile=$("#mobile").val();
        if($(obj).hasClass("btn-active")){
            loadbgloading();
            $("#bgloading").show();
            callServieOther("submitMobileLast",'/api/user/nologin/sms-forgetpwd',{
                "mobile":mobile,
                "smsCode":code,
            });

       }
        
    }
    function submitMobileLastCallBack(r){
        $("#bgloading").hide();
        if(r.success){
            var lang=$.cookie('newlang');
            if(typeof(lang)=="undefined"||lang=="en"){
                alert("Resetting password successfully. New password has been sent to your phone.");
            }else if(lang=="tcn"){
                alert("密碼重置成功，新密碼已通過短信發送到您手機。");
            }else if(lang=="scn") {
                alert("密码重置成功，新密码已通过短信发送到您手机。");
            }
            $("body").on("click",".layui-layer-btn0",function () {
                window.location.href = "../account/login.html";
            })
        }else{
            $("#btn-submit2").removeClass("btn-active");
            if(r.error.code == 1017){
                $("#warning-code").html('<i class="icon-exclamation-circle"></i><i>'+r.error.detail+'</i>');
            }
        }

    }
    function time(o) {
        $(".btn-again").removeAttr("data-i18n");
        if (wait == 0) {
            o.style.color="#13b5b1";
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
    

    $(function(){
        $(".register-switch span").click(function(){
            //initYunD1();
            $(".register-switch span").removeClass("active");
            $(this).addClass("active");
            var index=$(this).index();
            $(".form-box").hide();
            $(".form-box").eq(index).show();
            $("#warning-mobile").html("");
            $("#phone").removeClass("input-warning");
            if($("#mail").val()==""){
                $("#warning-mail").html("");
                $("#mail").removeClass("input-warning");
            }
        })
    })

