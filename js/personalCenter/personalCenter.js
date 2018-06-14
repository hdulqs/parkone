var isCenter = false;
$(document).ready(function(){
	var userToken = $.cookie("userToken");
	if(!userToken || userToken == 'undefinde'){
		window.location.href = "../account/login.html";
		return false;
	}
	$(".li-btn,#toggle").hide();
	$(".set-wrap").removeClass("dn");
	userInfor();
	$(".open-check-user").click(function(){
		callServieOther("openCheck","/api/user/open-second-valid",{});
	});

    loadTwoVerifyGoogle();
    loadTwoVerifyMobile();
    initLang();
});
//CallBack: 用户信息
function userInfor(){
	callServie("userInfor","/api/user/user",{});
}
function userInforCallBack (d){
	if(d.success){
		var btnIsBind = ['blindBtn','unhitch'];
		var btnStyle = ['','btn-unbundling'];
		var mobileUrl = ['../personalCenter/bindMobileVerification.html','../personalCenter/unbindMobileVerification.html'];
		var googleUrl = ['../personalCenter/bindGoogleVerification.html','../personalCenter/unbindGoogleVerification.html'];
		var isAuthUrl = ['../personalCenter/authenticationOther.html','../personalCenter/authenticationProgress.html','../personalCenter/authenticationProgress.html','../personalCenter/authenticationOther.html'];
		var lever = 1;
		//安全等级	1默认->2开启二次验证->3设置资金密码&身份认证
		if(d.data.twoValid){
			lever = 2;
			if(d.data.isAuth === 2 && d.data.payPwd){
				lever = 3;
			}
		};
		if(d.data.failureReason && d.data.failureReason!=""){
			$("#reason").show();
			$("#failReason").html(d.data.failureReason);
		}
		if(d.data.username){
			$(".grade-wrap").removeClass("dn");
			$("#dataUserAct").closest(".dn").removeClass("dn");
		}
		$("#userId").html(d.data.username);
		var dataUA = d.data.email;
		if(dataUA && d.data.phone) dataUA = dataUA + '/';
		$("#dataUserAct").html(dataUA+d.data.phone);
		if(d.data.isAuth){
			$(".grade-wrap").removeClass("dn");
			$("#userIsAuth").closest(".dn").removeClass("dn");
		}
		$("#userIsAuth").attr("href",isAuthUrl[d.data.isAuth]).attr("data-i18n","personalCenter.accountStatusVal"+d.data.isAuth);
		$(".data-user-lever").attr("data-i18n","personalCenter.LeverVal"+lever).addClass("lever-color"+lever);
		var address = d.data.lastLoginAdd;
		if(!address || address == null){
			address = '';
		}
		if(d.data.lastLoginTime){
			$(".grade-wrap").removeClass("dn");
			$("#userLastLoginTime").closest(".dn").removeClass("dn");
		}
		$("#userLastLoginTime").html(d.data.lastLoginTime+" "+address);
		if(mobileUrl[d.data.mobile]){
			$(".mobile-bind-btn,.btn-revise").closest(".li-btn").show();
		}
		if(googleUrl[d.data.google]){
			$(".google-bind-btn").closest(".li-btn").show();
		}
		if(d.data.email){
			$(".mobile-bind-btn").attr("href",mobileUrl[d.data.mobile]).attr("data-i18n","personalCenter."+btnIsBind[d.data.mobile]).addClass(btnStyle[d.data.mobile]);		
		}else{
			$(".mobile-bind-btn").attr("href","javascipt:void(0);").attr("data-i18n","personalCenter."+btnIsBind[d.data.mobile]).addClass(btnStyle[d.data.mobile]);		
			$(".mobile-bind-btn").on("click",function(){
				alert($(".disUnbind").html());
				return false;
			})
		}
		$(".google-bind-btn").attr("href",googleUrl[d.data.google]).attr("data-i18n","personalCenter."+btnIsBind[d.data.google]).addClass(btnStyle[d.data.google]);
		//是否设置资金密码
		if(d.data.payPwd == 1){
			$("#setPayPwd").hide();
			$("#editPayPwd").show();
			$(".edit-fund-pwd").closest(".li-btn").show();
		}else{
			$("#setPayPwd").show();
			$("#editPayPwd").hide();
			$(".set-fund-pwd").closest(".li-btn").show();
		}
		
		$("body").append('<ipnut type="hidden" id="isMobileCheck" value="'+d.data.mobile+'"/><ipnut type="hidden" id="isGoogleCheck" value="'+d.data.google+'"/>');
		if(d.data.google === 0 && d.data.mobile === 0){
			$("#toggle").hide();
		}else{
			$("#toggle").show();
		}
		if(d.data.google === 0 && (d.data.isAuth === 0 || d.data.payPwd === 0) && d.data.mobile === 0){
			//没有谷歌验证  没有身份认证  没有资金密码  没有手机验证
			$(".personalSetCtrl1,.personalSetCtrl10").removeClass("dn").show();
			$(".personalSetCtrl2,.personalSetCtrl3,.personalSetCtrl11,.personalSetCtrl4").hide();
			$(".not-check-item").removeClass("dn");
		}else{
			if(d.data.twoValid === 0){
				if(d.data.google === 0 && d.data.mobile === 0){
					//没有谷歌验证  没有身份认证  没有资金密码  没有手机验证
					$(".personalSetCtrl1,.personalSetCtrl10").removeClass("dn").show();
					$(".personalSetCtrl2,.personalSetCtrl3,.personalSetCtrl11,.personalSetCtrl4").hide();
					$(".not-check-item").removeClass("dn");
				}else{				
					//没有开启二次验证
					$(".personalSetCtrl1,.personalSetCtrl11").removeClass("dn").show();
					$(".personalSetCtrl2,.personalSetCtrl3,.personalSetCtrl10,.personalSetCtrl4").hide();
					$(".not-check-item").removeClass("dn");
				}
			}else{
				//is 身份认证
				if(d.data.isAuth === 0){ //未认证			
					$(".personalSetCtrl3").removeClass("dn").show();
					$(".personalSetCtrl1,.personalSetCtrl2,.personalSetCtrl10,.personalSetCtrl11,.personalSetCtrl4").hide();
				}else if(d.data.isAuth === 2 || d.data.isAuth === 1){ //认证成功
					$(".personalSetCtrl1,.personalSetCtrl2,.personalSetCtrl10,.personalSetCtrl11,.personalSetCtrl3,.personalSetCtrl4").hide();
				}
				//is 设置资金密码
				if(d.data.payPwd === 0){
					$(".personalSetCtrl2").removeClass("dn").show();
					$(".personalSetCtrl1,.personalSetCtrl3,.personalSetCtrl10,.personalSetCtrl11,.personalSetCtrl1,.personalSetCtrl4").hide();			
				}else if(d.data.payPwd === 1){
					$(".personalSetCtrl1,.personalSetCtrl2,.personalSetCtrl10,.personalSetCtrl11,.personalSetCtrl4").hide();
					if(d.data.isAuth === 0){
						$(".personalSetCtrl3").removeClass("dn").show();
					}
				}
				if(d.data.isAuth != 0 && d.data.payPwd != 0){
					$(".personalSetCtrl4").removeClass("dn").show();
					$(".personalSetCtrl1,.personalSetCtrl3,.personalSetCtrl10,.personalSetCtrl11,.personalSetCtrl1").hide();
				}
				$(".not-check-item").removeClass("dn");
			}
		}
		if(d.data.twoValid === 0){
			toggleOCStatus("on");
		}else{
			toggleOCStatus("off");
		}
		$.cookie("userPhone",d.data.phone,{ expires: 100000, path: '/' });
		$("#toggle").click(function(){
			var thisStatus = $("#toggle").attr("data-status");
			if(thisStatus == "off"){
				callServieOther("openCheck","/api/user/open-second-valid",{})
			}else{
				var googleStatus = $("#isGoogleCheck").attr("value");
		        var mobileStatus = $("#isMobileCheck").attr("value");
		        var lastVerfiyType=$.cookie("lastVerfiyType");
		        $.cookie("isCenter", true, {expires: 30, path: '/'});
				isCenter = true;
				initLang();
		        if(googleStatus == 1){
		        	$("#btn-googleValidate").click();
		    	}else if(mobileStatus == 1){
		    		$("#btn-mobileValidate").click();
		        }
		    	setTimeout(function(){$("#googleValidate .close-m,#twoTypeValidate .close-m,#mobileValidate .close-m").removeClass("dn")},300);
				
			}
		});
		initLang();
		resizebody();
	}
}
//关闭二次————谷歌验证
function googleCodeValidCallBack(d){
	if(!d.success){
	    $("#bgloading").remove();
		$(".warning-googlecode").html('<i class="icon-exclamation-circle"></i><i>'+d.error.detail+'</i>');
        $(".warning-googlecode").fadeIn(50);
        $(".googleCode").addClass("input-warning");
        $(".btn-submit-googlecode").removeClass("btn-active");
  	}else{
   		if(isCenter){
	    	callServieOther("closeCheck","/api/user/close-second-valid",{
	    		"verifyType":1,
				"verifyCode":$('#gooleCode').val()
	    	});
	    }else{
	    	window.location.reload();
	    }
    }
    initLang();
}

//CallBack: 开启二次验证
function openCheckCallBack(d){
	if(d.success){
		$.cookie("twoValid", 0, {expires: 30, path: '/'});
		toggleOCStatus("off");
		window.location.reload();
		return false;
	}
}
//CallBack: 关闭二次验证
function closeCheckCallBack(d){
	$("#bgloading").remove();
	if(!d.success){
		alert(d.error.detail);
	}
	if(d.success){
		$.cookie("twoValid", 0, {expires: 30, path: '/'});
		toggleOCStatus("on");
		window.location.reload();
		return false;
	}
}
//开关
function toggleOCStatus(thisStatus){
	if(!thisStatus){
		thisStatus = $(".ui-switch").attr("status");
	}
	if(thisStatus == "off"){
		$("#toggle").attr("data-status","on").addClass("activeB");
    	}else{
		$("#toggle").attr("data-status","off").removeClass("activeB");
     }
}
