
getPhontData();
var mobile="";
var code="";
var isNotThrough = [true,true];
var wait=60;

function validatMobile(obj) {
    mobile=$(obj).val();
    if(mobile==""){
        $("#warning-mobile").html('<i class="icon-exclamation-circle"></i><i data-i18n="bindMobileVerification.warning4"></i>');
        $("#warning-mobile").fadeIn(50);
        $(obj).addClass("input-warning");
        $(".btn-gain").attr("disabled", true);
        $(".btn-gain").css("cursor","not-allowed");
        initLang();
    }else{
        isNotThrough[0]=false;
        $("#warning-mobile").fadeOut(50);
        $(obj).removeClass("input-warning");
        $(".btn-gain").attr("disabled", false);
        $(".btn-gain").css("cursor","pointer");
    }
    setSubmitStyle();
}

function validatMobileKeyUp(obj) {
    mobile=$(obj).val();
    if(!mobile==""){
        isNotThrough[0]=false;
        $(obj).removeClass("input-warning");
        $(".btn-gain").attr("disabled", false);
        $(".btn-gain").css("cursor","pointer");
    }else{
        isNotThrough[0]=true;
        $(obj).addClass("input-warning");
        $(".btn-gain").attr("disabled", true);
        $(".btn-gain").css("cursor","default");
    }
    setSubmitStyle();
}

function validatCode(obj) {
    code=$(obj).val();
    if(code==""){/*验证码为空*/
        $("#warning-code").html('<i class="icon-exclamation-circle"></i><i data-i18n="[text]bindMobileVerification.warning5"></i>');
        $("#warning-code").fadeIn(50);
        $(obj).addClass("input-warning");
        initLang();
    }else{/*验证码不为空*/
        isNotThrough[1]=false;
        $("#warning-code").fadeOut(50);
        $(obj).removeClass("input-warning");
    }
    setSubmitStyle();
}

function validatCodeKeyUp(obj) {
    code=$(obj).val();
    if(!code==""){/*验证码不为空*/
        isNotThrough[1]=false;
        $(obj).removeClass("input-warning");
    }else{
        isNotThrough[1]=true;
        $(obj).addClass("input-warning");
    }
    setSubmitStyle();
}
/*获取手机验证码*/
function getBindMobile(obj) {
    if($("#mobile").val()==""){
        $("#warning-mobile").html('<i class="icon-exclamation-circle"></i><i data-i18n="bindMobileVerification.warning4"></i>');
        $("#warning-mobile").fadeIn(50);
        $("#mobile").addClass("input-warning");
    }else{
    	time(obj);
    	callServieOther("getBindMobile","/api/user/send-bind-mobile",{
            mobile:$("#mobile").val(),
            regionCode: $("#phone").attr("regionCode")
        });

    }

}

function getBindMobileCallBack(r) {
    if(r.success){

    }else{
    	alert(r.error.detail);
    	return false;
    }
}

/*绑定手机*/
function bindMobile(obj) {
    if($(obj).hasClass("btn-active")){
        callServieOther("bindMobile","/api/user/mobile/bind",{
            code:$("#code").val()
        });
    }
}

function bindMobileCallBack(r) {
    if(r.success){
    	$.cookie("twoValid", 1, {expires: 30, path: '/'});
        $.cookie("mobileStatus", 1, {expires: 30, path: '/'});
        window.location.href="personalCenter.html";
    }else{
        alert(r.error.detail);
    }
}

function time(o) {
    $(".btn-again").removeAttr("data-i18n");
    if (wait == 0) {
        $(o).removeClass("gray-btn");
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
        $(o).addClass("gray-btn");
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

//提交按钮样式
function setSubmitStyle(){
    isCheck = isNotThrough.toString();
    if(isCheck.indexOf("true") < 0 ){//全部信息填写正确
        $("#warning-mobile,#warning-code").hide();
        $("#btn-submit").addClass("btn-active");
    }else{/*全部信息填写其中有误*/
        $("#btn-submit").removeClass("btn-active");
    }
}


