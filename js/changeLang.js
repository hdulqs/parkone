$(document).ready(function() {
    loadNav();
    $("#time").text(getLocalTime(8));
    setInterval(function(){
        $("#time").text(getLocalTime(8));
    },1000)
    $.cookie('baserateen', 1 ,{ expires: 7, path: '/' });
	$.cookie('baseratetcn', 6.62 ,{ expires: 7, path: '/' });
	$.cookie('baseratescn', 6.62,{ expires: 7, path: '/' });
    $("#ul-language li").click(function () {
        var urls = window.location.pathname;
        var translation="";
        var newlang = $(this).prop('id');
        changeLanInfo(newlang);
        if(urls.indexOf(".html")>0){
            translation=urls.substring(urls.lastIndexOf("/")).replace("/","").replace(".html","");
        }else{
            translation="index";
        }
        $(".ul-select").removeClass("animation-select");
        $(".icon-down").removeClass("icon-down-open");
        i18n.init({
               ns: {
                namespaces: ['common',translation],
                defaultNs: translation   //默认使用的，不指定namespace时；
            },
            lng : newlang,
            fallbackLng : false,
            localStorageExpirationTime:86400000
        }, function(err,t) {
            // i18n est maintenant initialisé

            $('html').i18n();
        });
        //隐藏下拉中当前语言，显示其它未选语言
        $(this).hide();
        $(this).siblings().css("display","block");
        //var newlang=$(this).attr('id');
        $.cookie('newlang', newlang ,{ expires: 7, path: '/' });
        //console.log(newlang)
        /*if(newlang=="en"){
            $(".tips__text").text("Fit puzzle to unlock");
        }else if(newlang=="scn"){
            $(".tips__text").text("向右滑动滑块完成拼图");
        }else if(newlang=="tcn"){
            $(".tips__text").text("向右滑動滑塊完成拼圖");
        }*/
        if($(".btn-again").val()=="再次获取" || $(".btn-again").val()=="再次獲取" || $(".btn-again").val()=="Send Again"){
            if(newlang=="en"){
                $(".btn-again").val("Send Again");
            }else if(newlang=="scn"){
                $(".btn-again").val("再次获取");
            }else if(newlang=="tcn"){
                $(".btn-again").val("再次獲取");
            }
        }
        //切换语言时重置页面有关汇率的数值
        changeBaseRate();
    })
    initLang();
});
//获取RMBUSD汇率
function getUSDCNYRate(){
	callServie("getRMB","/api/account/nologin/asset/USDCNYRate",{});
}
function getRMBCallBack(d){
	$.cookie('baseratescn', d.data ,{ expires: 7, path: '/' });
	$.cookie('baseratetcn', d.data ,{ expires: 7, path: '/' });
	changeBaseRate();
}
function changeBaseRate(){
	//预定义切换语言时汇率的数值
};
function initLang() {
    var urls = window.location.pathname;
    var translation="";
    if(urls.indexOf(".html")>0){
        translation=urls.substring(urls.lastIndexOf("/")).replace("/","").replace(".html","");
    }else{
        translation="index";
    }
    var lang = $.cookie('newlang');
    var language="";
    if(typeof(lang)=="undefined"){
        language="scn";
    }else {
        language=lang;
    }
    changeLanInfo(language);
    $.cookie('newlang', language ,{ expires: 7, path: '/' });
    i18n.init({
        resGetPath: '../../locales/__lng__/__ns__.json',
        ns: {
            namespaces: ['common',translation],
            defaultNs: translation   //默认使用的，不指定namespace时；
        },
        lng : language,
        fallbackLng : false,
        localStorageExpirationTime:86400000
    }, function(err,t) {
        // i18n est maintenant initialisé
        $('html').i18n();
        var activelang=$("#active-language p i").text();
        if(activelang=="English"){
            $("#en").hide();
            $("#en").siblings().css("display","block");
        }else if(activelang=="中文简体"){
            $("#scn").hide();
            $("#scn").siblings().css("display","block");
        }else if(activelang=="中文繁体"){
            $("#tcn").hide();
            $("#tcn").siblings().css("display","block");
        }
    });
}
function changeLanInfo(_id){
    if(!_id) return false;
    var _lanImg = $("#"+_id+" img").attr("src");
    var _lanText = $("#"+_id).text();
    $("#"+_id).hide();
    $("#"+_id).siblings().css("display","block");
    $(".change-lan .lanage .img-language").attr("src",_lanImg);
    $(".change-lan .lanage span").html(_lanText);
}

var pageRule = {
    "404": {
        "referrerUrl": "index",
        "title": "404",
        "links": "/error/"
    },
    "500": {
        "referrerUrl": "index",
        "title": "500",
        "links": "/error/"
    },
    "announcement": {
        "referrerUrl": "",
        "title": "公告",
        "links": "/account/"
    },
    "announcementCenter": {
        "referrerUrl": "",
        "title": "公告",
        "links": "/account/"
    },
    "announcementDetail": {
        "referrerUrl": "",
        "title": "公告详细",
        "links": "/account/"
    },
    "assetManage": {
        "referrerUrl": "",
        "title": "资产管理",
        "links": "/asset/"
    },
    "authenticationFail": {
        "referrerUrl": "personalCenter",
        "title": "身份认证失败",
        "links": "/personalCenter/"
    },
    "authenticationMainland": {
        "referrerUrl": "authenticationOther",
        "title": "身份认证",
        "links": "/personalCenter/"
    },
    "authenticationOther": {
        "referrerUrl": "",
        "title": "身份认证",
        "links": "/personalCenter/"
    },
    "authenticationPassed": {
        "referrerUrl": "personalCenter",
        "title": "身份认证2",
        "links": "/personalCenter/"
    },
    "authenticationReviewing": {
        "referrerUrl": "personalCenter",
        "title": "身份认证3",
        "links": "/personalCenter/"
    },
    "authenticationSuccess": {
        "referrerUrl": "personalCenter",
        "title": "身份认证4",
        "links": "/personalCenter/"
    },
    "bindGoogleVerification": {
        "referrerUrl": "personalCenter",
        "title": "绑定谷歌验证",
        "links": "/personalCenter/"
    },
    "bindMobileVerification": {
        "referrerUrl": "personalCenter",
        "title": "绑定手机验证",
        "links": "/personalCenter/"
    },
    "error": {
        "referrerUrl": "index",
        "title": "error",
        "links": "/error/"
    },
    "fundPasswordMailbox": {
        "referrerUrl": "index",
        "title": "未用",
        "links": "/account/"
    },
    "getBackPassword": {
        "referrerUrl": "personalCenter",
        "title": "找回密码",
        "links": "/account/"
    },
    "getBackPasswordEmail": {
        "referrerUrl": "personalCenter",
        "title": "重置密码确认",
        "links": "/account/"
    },
    "helpCenter": {
        "referrerUrl": "",
        "title": "帮助中心",
        "links": "/account/"
    },
    "helpCenterDetail": {
        "referrerUrl": "",
        "title": "帮助中心详情",
        "links": "/account/"
    },
    "index": {
        "referrerUrl": "",
        "title": "首页",
        "links": "/index/"
    },
    "login": {
        "referrerUrl": "index",
        "title": "登录",
        "links": "/account/"
    },
    "mailboxActivationValidate": {
        "referrerUrl": "index",
        "title": "未发现使用",
        "links": "/account/"
    },
    "mailboxActivationValidateEn": {
        "referrerUrl": "index",
        "title": "未发现使用",
        "links": "/account/"
    },
    "modifyFundPassword": {
        "referrerUrl": "personalCenter",
        "title": "设置资金密码",
        "links": "/personalCenter/"
    },
    "modifyLoginPassword": {
        "referrerUrl": "personalCenter",
        "title": "修改登录密码",
        "links": "/personalCenter/"
    },
    "myMessage": {
        "referrerUrl": "",
        "title": "我的消息",
        "links": "/personalCenter/"
    },
    "orderManage": {
        "referrerUrl": "",
        "title": "订单管理",
        "links": "/orderManage/"
    },
    "personalCenter": {
        "referrerUrl": "",
        "title": "个人中心",
        "links": "/personalCenter/"
    },
    "privacyStatement": {
        "referrerUrl": "",
        "title": "隐私政策",
        "links": "/account/"
    },
    "rateStandard": {
        "referrerUrl": "",
        "title": "费率标准",
        "links": "/account/"
    },
    "register": {
        "referrerUrl": "index",
        "title": "注册",
        "links": "/account/"
    },
    "resetPassword": {
        "referrerUrl": "index",
        "title": "未发现使用",
        "links": "/account/"
    },
    "resetPasswordEmail": {
        "referrerUrl": "index",
        "title": "重置密码确认",
        "links": "/account/"
    },
    "resetSucess": {
        "referrerUrl": "index",
        "title": "重置密码成功提示页",
        "links": "/account/"
    },
    "retrievePasswordValidate": {
        "referrerUrl": "index",
        "title": "未发现使用",
        "links": "/account/"
    },
    "retrievePasswordValidateEn": {
        "referrerUrl": "index",
        "title": "未发现使用",
        "links": "/account/"
    },
    "sendEmail": {
        "referrerUrl": "index",
        "title": "注册激活发邮件",
        "links": "/account/"
    },
    "sendEmailFindPwd": {
        "referrerUrl": "index",
        "title": "重置密码确认",
        "links": "/account/"
    },
    "setFundPassword": {
        "referrerUrl": "",
        "title": "修改资金密码",
        "links": "/personalCenter/"
    },
    "termService": {
        "referrerUrl": "",
        "title": "服务条款",
        "links": "/account/"
    },
    "trading": {
        "referrerUrl": "",
        "title": "交易中心",
        "links": "/tradingCenter/"
    },
    "unbindGoogleVerification": {
        "referrerUrl": "",
        "title": "解除谷歌验证",
        "links": "/personalCenter/"
    },
    "unbindMobileVerification": {
        "referrerUrl": "",
        "title": "解除手机验证",
        "links": "/personalCenter/"
    },
    "updateFundPassword": {
        "referrerUrl": "",
        "title": "修改资金密码",
        "links": "/personalCenter/"
    },
    "updatePassword": {
        "referrerUrl": "index",
        "title": "未发现使用",
        "links": "/account/"
    },
    "verificationSuccessful": {
        "referrerUrl": "index",
        "title": "邮箱验证",
        "links": "/account/"
    }
};