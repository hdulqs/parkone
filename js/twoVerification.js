function setBtn() {
    $("#TwoGoogleCode").val("");
    $("#TwoMobileCode").val("");
    $("#myTabContent .warning-mobilecode,#myTabContent .warning-googlecode").html("");
    $(".btn-submit-google.btn-submit-mobile").removeClass("btn-active");
}

var wait = 60;
function time(o) {
    if (wait == 0) {
    	$("#mobile .btn-send").attr("data-i18n","[value]common:twoVerification.btnAgainSendCode");
        $(o).removeClass("gray-btn");
        o.removeAttribute("disabled");
        wait = 60;
        initLang();
    } else {
    	$("#mobile .btn-send").attr("data-i18n","");
        $(o).addClass("gray-btn");
        o.setAttribute("disabled", true);
        o.value=wait+"S";
        wait--;
        setTimeout(function() {
            time(o)
        },
        1000)
    }
}

$("body").on("click","#gooleAndMobile",function () {
  if($("#btn-mobile").hasClass("active")){
      mobileCodeVerify2();
  }else{
      googleCodeValid2();
  }
})
/*验证谷歌验证码是否为空*/
function googleVerify(obj) {
    var googleCode=$(obj).val();
    if(googleCode==""){/*验证码为空*/
        $(".warning-googlecode").html('<i class="icon-exclamation-circle"></i><i data-i18n="common:twoVerification.cue1"></i>');
        $(obj).addClass("input-warning");
        $(".btn-submit-google").removeClass("btn-active");
    }else{/*验证码不为空*/
        $(".warning-googlecode").html("");
        $(obj).removeClass("input-warning");
        $(".btn-submit-google").addClass("btn-active");
    }
    initLang();
}

/*谷歌验证码校验*/
function googleCodeValid() {
  var gooleCode=$("#gooleCode").val();
  if(gooleCode==""){
      $(".warning-googlecode").html('<i class="icon-exclamation-circle"></i><i data-i18n="common:twoVerification.cue1"></i>');
      $(".warning-googlecode").fadeIn(50);
      $(".btn-submit-google").removeClass("btn-active");
      initLang();
  }else {
  	loadbgloading();
	$("#bgloading").show();
    callServieGetOther("googleCodeValid","/api/user/google-verify-code",{
        "code": $("#gooleCode").val()
    })
 }
   
}
/*谷歌验证码校验*/
function googleCodeValid2() {
    var TwoGoogleCode=$("#TwoGoogleCode").val();
    if(TwoGoogleCode==""){
        $(".warning-googlecode").html('<i class="icon-exclamation-circle"></i><i data-i18n="common:twoVerification.cue1"></i>');
        $(".warning-googlecode").fadeIn(50);
        $(".btn-submit-google").removeClass("btn-active");
        initLang();
    }else {
		loadbgloading();
		$("#bgloading").show();
      	callServieGetOther("googleCodeValid","/api/user/google-verify-code",{
          "code": $("#TwoGoogleCode").val()
      })
   }
    
} 

function googleCodeValidCallBack(r) {
    $("#bgloading").hide();
    $("#bgloading").remove();
    if(!r.success){
            $(".warning-googlecode").html('<i class="icon-exclamation-circle"></i><i data-i18n="common:twoVerification.cue2"></i>');
            $(".warning-googlecode").fadeIn(50);
            $(".googleCode").addClass("input-warning");
            $(".btn-submit-googlecode").removeClass("btn-active");
             initLang();
    }else{
      location.reload();
    }
    
    
};

/*验证手机验证码是否为空*/
function mobileVerify(obj) {
    var mobileCode=$(obj).val();
    if(mobileCode==""){/*验证码为空*/
        $(".warning-mobilecode").html('<i class="icon-exclamation-circle"></i><i data-i18n="common:twoVerification.cue1"></i>');
        $(obj).addClass("input-warning");
        $(".btn-submit-mobile").removeClass("btn-active");
        initLang();
        wait=0;
    }else{/*验证码不为空*/
        $(".warning-mobilecode").html("");
        $(obj).removeClass("input-warning");
        $(".btn-submit-mobile").addClass("btn-active");
    }

}

/*发送手机二次验证码*/
function sendValidSms(obj) {
    callServieGetOther("sendValidSms","/api/user/send-second-valid-sms");
    time(obj);
}
function sendValidSmsCallBack(r) {};

/*手机二次验证码校验*/
function mobileCodeVerify() {
	
    var mobileCode=$("#mobileCode").val();
    if(mobileCode==""){
          $(".warning-mobilecode").html('<i class="icon-exclamation-circle"></i><i data-i18n="common:twoVerification.cue1"></i>');
          $(".warning-mobilecode").fadeIn(50);
          $(".btn-submit-mobile").removeClass("btn-active");
        initLang();
    }else {
    	loadbgloading();$("#bgloading").show();
	    var isCenter = $.cookie("isCenter");
        if(isCenter){
            callServieOther("closeCheck","/api/user/close-second-valid",{
                      "verifyType":0,
                      "verifyCode":$("#mobileCode").val()
            });
            $.removeCookie("isCenter", { path: '/' });
        }else{
          callServieGetOther("mobileCodeVerify","/api/user/sms-verify-code",{
            "code": $("#mobileCode").val(),
          })
        }
           
    }    
   
}

/*手机二次验证码校验*/
function mobileCodeVerify2() {
	
    var TwoMobileCode=$("#TwoMobileCode").val();
      if(TwoMobileCode==""){
            $(".warning-mobilecode").html('<i class="icon-exclamation-circle"></i><i data-i18n="common:twoVerification.cue1"></i>');
            $(".warning-mobilecode").fadeIn(50);
            $(".btn-submit-mobile").removeClass("btn-active");
          initLang();
      }else {
      	loadbgloading();$("#bgloading").show();
        var isCenter = $.cookie("isCenter");
        if(isCenter){
            callServieOther("closeCheck","/api/user/close-second-valid",{
                      "verifyType":0,
                      "verifyCode":$("#TwoMobileCode").val()
            });
            $.removeCookie("isCenter", { path: '/' });
        }else{
          callServieGetOther("mobileCodeVerify","/api/user/sms-verify-code",{
            "code": $("#TwoMobileCode").val(),
          })
        }     
    }
   
}

function mobileCodeVerifyCallBack(r) {
    $("#bgloading").hide();
	$("#bgloading").remove();
  	if(!r.success){
	     /*手机验证码错误*/
	     $(".warning-mobilecode").html('<i class="icon-exclamation-circle"></i><i   data-i18n="common:twoVerification.cue2"></i>');
	     $(".warning-mobilecode").fadeIn(50);
	     $(".mobileCode").addClass("input-warning");
	     $(".btn-submit-mobile").removeClass("btn-active");
	      initLang();
	}else{
	     location.reload();
	}
};
