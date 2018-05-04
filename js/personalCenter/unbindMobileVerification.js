var code="";

$(function(){
    $("#mobile").val($.cookie("userPhone"));
})


function validatCode(obj) {
    code=$(obj).val();
    if(code==""){/*验证码为空*/
        $("#warning-code").html('<i class="icon-exclamation-circle"></i><i   data-i18n="[text]bindMobileVerification.warning5"></i>');
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
    code=$(obj).val();
    if(!code==""){/*验证码不为空*/
        $(obj).removeClass("input-warning");
        $("#btn-submit").addClass("btn-active");
    }else{
        $(obj).addClass("input-warning");
        $("#btn-submit").removeClass("btn-active");
    }
}
/*获取解绑手机验证码*/
function getUnbindMobile(obj) {
    callServieOther("getUnbindMobile","/api/user/send-unbind-mobile",{
        mobile:$("#mobile").val()
    });
    time(obj);
}

function getUnbindMobileCallBack(r) {

}

/*解绑手机*/
function unbindMobile(obj) {
    if($(obj).hasClass("btn-active")){
        callServieOther("unbindMobile","/api/user/mobile/unbind",{
            code:$("#code").val()
        });
    }
}

function unbindMobileCallBack(r) {
    if(r.success){
    	var googleStatus=$.cookie("googleStatus");
    	if(googleStatus==0 )$.cookie("twoValid", 0, {expires: 30, path: '/'});
        $.cookie("mobileStatus", 0, {expires: 30, path: '/'});
        window.location.href="personalCenter.html";
    }else{
        alert(r.error.detail);
        return false;
    }
}

var wait=60;
function time(o) {
    $(".btn-again").removeAttr("data-i18n");
    if (wait == 0) {
        o.removeAttribute("disabled");
        var lang=$.cookie('newlang');
        o.style.color="#13B5B1";
        if(typeof(lang)=="undefined"||lang=="en"){
            o.value="Send Again";
        }else if(lang=="tcn"){
            o.value="再次獲取";
        }else if(lang=="scn") {
            o.value="再次获取";
        }
        wait = 60;
    } else {
        o.style.color="#999";
        o.setAttribute("disabled", true);
        $(o).val(+wait+"s");
        wait--;
        setTimeout(function() {
                time(o)
            },
            1000)
    }
}
