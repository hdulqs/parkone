var isNotThrough = [true,true,true];
var re = new RegExp('^[0-9]{6}$');
$(function(){
	$("#loginpass").val("");
	$("#firstpassword").val("");
	$("#secondpassword").val("");
	$("#loginpass").focus();
	
	var a=setInterval(function () {
	    $("input").val("");
	},0);
	
	$("input").focus(function () {
	    clearInterval(a);
	});	
	$('#btn-submit').on('click',function(){
	    var isCheck = isNotThrough.toString();
		if(isCheck.indexOf("true") < 0){
			$("#btn-submit").addClass("btn-active");
	        loadbgloading();
	        $("#bgloading").show();
			callServie('modifypaypwd','/api/user/modify/paypwd',{
				oldPwd:$('#loginpass').val(),
				newPwd:$('#firstpassword').val(),
				confrimPwd:$('#secondpassword').val()
			})
		}else{	
			$("#btn-submit").removeClass("btn-active");
		}
	})

})

//验证旧密码
function validatlogin(obj) {
    var loginpass = $(obj).val();
    if (loginpass == "") {
		isNotThrough[0] = true;
        $("#warning-loginpass").html('<i class="icon-exclamation-circle"></i><i data-i18n="modifyFundPassword.warning1"></i>');
        $("#warning-loginpass").fadeIn(50);
        $(obj).addClass("input-warning");
    }else{
		$("#warning-loginpass").hide();
        if (!re.test(loginpass)) {
			isNotThrough[0] = true;
            $("#warning-loginpass").html('<i class="icon-exclamation-circle"></i><i data-i18n="modifyFundPassword.warning2"></i>');
            $("#warning-loginpass").fadeIn(50);
            $(obj).addClass("input-warning");
        }else{
			isNotThrough[0] = false;
			$(obj).removeClass("input-warning");
            $("#warning-loginpass").hide();
        }
    }
	setSubmitStyle();
    initLang();
}

function validatloginKeyUp(obj) {
    var loginpass = $(obj).val();
    if (!loginpass == "") {
        isNotThrough[0] = false;
        $(obj).removeClass("input-warning");
    }else{
        isNotThrough[0] = true;
        $(obj).addClass("input-warning");
    }
    setSubmitStyle();
}
/*验证新密码*/
function validatfirstpassword(obj) {
    var firstpassword = $(obj).val();
    if (firstpassword == "") {
		isNotThrough[1] = true;
        $("#warning-firstpassword").html('<i class="icon-exclamation-circle"></i><i data-i18n="modifyFundPassword.warning1"></i>');
        $("#warning-firstpassword").fadeIn(50);
        $(obj).addClass("input-warning");
    } else {
        $("#warning-firstpassword").hide();
        if (!re.test(firstpassword)) {
			isNotThrough[1] = true;
            $("#warning-firstpassword").html('<i class="icon-exclamation-circle"></i><i data-i18n="modifyFundPassword.warning2"></i>');
            $("#warning-firstpassword").fadeIn(50);
            $(obj).addClass("input-warning");
        }else{
            if($(obj).val() == $("#secondpassword").val()){
               isNotThrough[2] = false;
               $("#secondpassword").removeClass("input-warning");
               $("#warning-secondpassword").hide();
            }else if($(obj).val() == $("#loginpass").val()){
                isNotThrough[1] = true;
                $("#warning-firstpassword").html('<i class="icon-exclamation-circle"></i><i data-i18n="modifyFundPassword.warning6"></i>');
                $("#warning-firstpassword").fadeIn(50);
                $(obj).addClass("input-warning");
            }
            validatlogin("#loginpass");
            isNotThrough[1] = false;
            $(obj).removeClass("input-warning");
            $("#warning-firstpassword").hide();
        }
    }
    var secondPwd=$("#secondpassword").val();
    if(secondPwd!=""){
        validatsecondpassword("#secondpassword");
    }
	setSubmitStyle();
    initLang();
}

function validatfirstpasswordKeyUp(obj) {
    var firstpassword = $(obj).val();
    if (!firstpassword == "") {
        if($(obj).val() == $("#secondpassword").val()){
            isNotThrough[2] = false;
            $("#secondpassword").removeClass("input-warning");
        }
        isNotThrough[1] = false;
        $(obj).removeClass("input-warning");
    }else{
        isNotThrough[1] = true;
        $(obj).addClass("input-warning");
    }
    setSubmitStyle();
}
/*验证重复密码*/
function validatsecondpassword(obj) {
    var firstpassword = $("#firstpassword").val();
    var secondpassword = $(obj).val();
    if (secondpassword == "") {
		isNotThrough[2] = true;
        $("#warning-secondpassword").html('<i class="icon-exclamation-circle"></i><i data-i18n="modifyFundPassword.warning4"></i>');
        $("#warning-secondpassword").fadeIn(50);
        $(obj).addClass("input-warning");
    } else {
        if (firstpassword === secondpassword) {
            isNotThrough[2] = false;
            $(obj).removeClass("input-warning");
            $("#warning-secondpassword").hide();
        } else {
			isNotThrough[2] = true;
            $("#warning-secondpassword").html('<i class="icon-exclamation-circle"></i><i data-i18n="modifyFundPassword.warning3"></i>');
            $("#warning-secondpassword").fadeIn(50);
            $(obj).addClass("input-warning");
        }
    }
	setSubmitStyle();
    initLang();
}

function validatsecondpassword(obj) {
    var firstpassword = $("#firstpassword").val();
    var secondpassword = $(obj).val();
    if (secondpassword == "") {
        isNotThrough[2] = true;
        $("#warning-secondpassword").html('<i class="icon-exclamation-circle"></i><i data-i18n="modifyFundPassword.warning4"></i>');
        $("#warning-secondpassword").fadeIn(50);
        $(obj).addClass("input-warning");
    } else {
        if (firstpassword === secondpassword) {
            isNotThrough[2] = false;
            $(obj).removeClass("input-warning");
            $("#warning-secondpassword").hide();
        }else{
            isNotThrough[2] = true;
            $("#warning-secondpassword").html('<i class="icon-exclamation-circle"></i><i data-i18n="modifyFundPassword.warning3"></i>');
            $("#warning-secondpassword").fadeIn(50);
            $(obj).addClass("input-warning");
        }
    }
    setSubmitStyle();
    initLang();
}

function validatsecondpasswordKeyUp(obj) {
    var firstpassword = $("#firstpassword").val();
    var secondpassword = $(obj).val();
    if (!secondpassword == "") {
        isNotThrough[2] = false;
        $(obj).removeClass("input-warning");
    }else{
        isNotThrough[2] = true;
        $(obj).addClass("input-warning");
    }
    setSubmitStyle();
}

function setSubmitStyle(){
	var isCheck = isNotThrough.toString();
	if(isCheck.indexOf("true") < 0){
		$("#btn-submit").addClass("btn-active");
	}else{	
		$("#btn-submit").removeClass("btn-active");
	}
}
function modifypaypwdCallBack(r){
    $("#bgloading").hide();
    if(r.success){
		alert($(".submitSuccessMsg").html());
		setTimeout(function(){
            window.location.href='personalCenter.html';
		},2000);
    }else{
        alert(r.error.detail);
        $("#btn-submit").removeClass("btn-active");
        $("input").val("");
    }
}