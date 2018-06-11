//同步接口
var stopflag=false;
var parmLng = {
    "en": "en_US",
    "fr": "",
    "de": "",
    "it": "",
    "ja": "",
    "ko": "",
    "zh": "",
    "scn": "zh_CN",
    "tcn": "zh_TW",
    "fr": "FR",
    "de": "DE",
    "it": "IT",
    "ja": "JP",
    "ko": "KR",
};
var ua = navigator.userAgent;
var isMobile = function(isLoad) {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
	    return 2;
	}else{
		return 1;
	}
}
var deviceType = isMobile(0);
var Path='';
var Path1='';

var gioHostId ={
		"www.cointobe.vip":"82119bb048cae2c7",
		"www.cointobe.tech":"bd6f2d29148ab7dc",
		"www.cointobe.online":"ba22377416040bad",
		"www.cointobe.ink":"9712d396b1402dc8",
		"www.cointobe.club":"a53a3e2c70064967",
		"www.cointobe2.com":"9af3935f57bda08a",
		"www.cointobe3.com":"913fbeea31de0db3",
		"www.cointobe6.com":"92a8975a2d8df9ac",
		"www.cointobe8.com":"a078f1f706674295",
		"www.cointoobe.com":"89c4aee1d4ced2d7"
};
var hostname = window.location.hostname;
var gioID = '85080f31a5d48e6a';
if(gioHostId[hostname] && gioHostId[hostname] != undefined){
	gioID = gioHostId[hostname];
};
//GIO统计
// var Dplus2 ='<script type="text/javascript">var _vds = _vds || [];window._vds = _vds;(function(){_vds.push(["setAccountId", "'+gioID+'"]);_vds.push(["setCS1","user_id", "'+sessionStorage.getItem("userid")+'"]);_vds.push(["setCS2","user_name", "'+ sessionStorage.getItem("userName")+'"]);(function() {var vds = document.createElement("script");vds.type="text/javascript";vds.async = true;vds.src = ("https:" == document.location.protocol ? "https://" : "http://") + "assets.growingio.com/vds.js";var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(vds, s);})();})();</script>';
// if(!sessionStorage.getItem("userid")){
//    Dplus2 ='<script type="text/javascript">var _vds = _vds || [];window._vds = _vds;(function(){_vds.push(["setAccountId", "'+gioID+'"]);(function() {var vds = document.createElement("script");vds.type="text/javascript";vds.async = true;vds.src = ("https:" == document.location.protocol ? "https://" : "http://") + "assets.growingio.com/vds.js";var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(vds, s);})();})();</script>'; 
// }
$("body").append("<script type='text/javascript' src='../../js/layer.js'></script>");
$("body").append("<script type='text/javascript' src='../../js/twoVerification.js'></script>");
/*$("body").append(Dplus2);*/
alert = function (msg) {
	var _t = $("#alertTitle .aTitle").html();
	var _b = $("#alertTitle .aBtn").html();
	if(_b&&_b.length <=0) _b = "OK";
    if(deviceType == 2){
    	layer.alert(msg,{title:_t,btn:_b});
    	$(".layui-layer-dialog").css({
    		"width":"80%",
    		"left":"10%"
    	});
    	$(".layui-layer-title").css({
    		"height": "50px",
		    "line-height": "50px",
		    "font-size": "20px",
    	});
    	$(".layui-layer-btn").css("padding","0 15px 20px");
    }else{
    	layer.alert(msg,{title:_t,btn:_b});
    }
};
alertCallBack = function(msg,callback){
	var _t = $("#alertTitle .aTitle").html();
	var _b = $("#alertTitle .aBtn").html();
	if(_b&&_b.length <=0) _b = "OK";
    if(deviceType == 2){
    	layer.alert(msg,{title:_t,btn:_b});
    	$(".layui-layer-dialog").css({
    		"width":"80%",
    		"left":"10%"
    	});
    	$(".layui-layer-title").css({
    		"height": "50px",
		    "line-height": "50px",
		    "font-size": "20px",
    	});
    	$(".layui-layer-btn").css("padding","0 15px 20px");
    }else{
    	layer.alert(msg,{title:_t,btn:_b},callback);
    }
}
confirm = function(msg,parmC,callback,callbackParem){
	layer.confirm(msg,parmC, function(index){
        callback(callbackParem)
        layer.close(index);
   });
}
msg=function(msg){
    layer.msg(msg,{
      time: 2000 //2秒关闭（如果不配置，默认是3秒）
    });  
}
//公共头部 header,尾部
function loadNav(){
    var metaS = '';
    var phoneWidth =  parseInt(window.screen.width);
    var design = 1050;
    var phoneScale = phoneWidth/design;
    var ua = navigator.userAgent;
    if (/Android (\d+\.\d+)/.test(ua)){
        var version = parseFloat(RegExp.$1);
        if(version>2.3){
            metaS = '<meta name="viewport" content="width='+design+', minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi">';
        }else{
            metaS = '<meta name="viewport" content="width='+design+', target-densitydpi=device-dpi">';
        }
    } else {
        metaS = '<meta name="viewport" content="width='+design+', user-scalable=yes, target-densitydpi=device-dpi">';
    }


    var H5_or_PC="";
    if(isMobile()==2){
        H5_or_PC='indexMobile.html';
    }else{
        H5_or_PC='index.html';
    }
    var headerHtml = '<ul class="clearfix nav-box">'+
            '<li class="nav-item logo"><a class="nav-logo" href="../index/'+H5_or_PC+'"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="图层_1" data-name="图层 1" viewBox="0 0 270 60"><defs><linearGradient id="未命名的渐变_10" x1="27.19" y1="55.79" x2="27.19" y2="8.58" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#00adef"/><stop offset="1" stop-color="#066bb6"/></linearGradient><linearGradient id="未命名的渐变_99" x1="44.81" y1="24.34" x2="18.92" y2="24.34" gradientUnits="userSpaceOnUse"><stop offset="0.03" stop-color="#07aabd"/><stop offset="1" stop-color="#b5d27b"/></linearGradient><linearGradient id="未命名的渐变_85" x1="14.54" y1="22.1" x2="51" y2="22.1" gradientUnits="userSpaceOnUse"><stop offset="0.02" stop-color="#0bb8ce"/><stop offset="1" stop-color="#97e0ff"/></linearGradient></defs><title>画板 1</title><path d="M26.33,39.14c-.47-.18-.94-.37-1.4-.59a18.46,18.46,0,0,1-4.11-2.69,15.13,15.13,0,0,0,5.51,2.46h0A14.76,14.76,0,0,1,22.89,37,6.11,6.11,0,0,1,26,25.27a6.51,6.51,0,0,1,.92.23A9.16,9.16,0,0,1,39.83,14.33a8.93,8.93,0,0,0-4-4.36c.37.17.73.34,1.09.53-.29-.16-.59-.31-.89-.46A15,15,0,0,0,14.58,22.47V49.21c0,.22,0,.44,0,.67a5.91,5.91,0,0,0,11.82,0c0-.23,0-.45,0-.67Z" style="fill:url(#未命名的渐变_10)"/><path d="M35.85,10a8.91,8.91,0,0,1-5.6,16.65,8.68,8.68,0,0,1-2.51-.8h0A5.91,5.91,0,0,0,26,25.27,6.11,6.11,0,0,0,22.89,37,15,15,0,1,0,35.85,10Z" style="fill:url(#未命名的渐变_99)"/><path d="M40.61,5.64a18.22,18.22,0,0,0-26,17.13A14.84,14.84,0,0,1,16,17.15a15,15,0,1,1,7.11,20.06,15.67,15.67,0,0,1-2.29-1.35,18.46,18.46,0,0,0,4.11,2.69A18.23,18.23,0,0,0,40.61,5.64Z" style="fill:url(#未命名的渐变_85)"/><path d="M62.8,44.11a.3.3,0,0,1-.31-.3V16.41a.31.31,0,0,1,.31-.31H73.93c6.26,0,9.43,2.75,9.43,8.17s-3.19,8.21-9.47,8.21H65.44V43.81a.3.3,0,0,1-.3.3Zm11-14.3a7.84,7.84,0,0,0,5.07-1.39,5.31,5.31,0,0,0,1.54-4.15,5.11,5.11,0,0,0-1.54-4.07,7.67,7.67,0,0,0-5.07-1.42H65.44v11Z" style="fill:#fff"/><path d="M73.93,16.41c6.06,0,9.13,2.61,9.13,7.86S80,32.18,73.89,32.18H65.14V43.81H62.8V16.41Zm-8.79,13.7h8.63A8,8,0,0,0,79,28.65a5.57,5.57,0,0,0,1.65-4.38A5.33,5.33,0,0,0,79,20a7.88,7.88,0,0,0-5.26-1.5H65.14Z" style="fill:#fff"/><path d="M106.47,44.11a.3.3,0,0,1-.28-.19l-3.11-8H90.29l-3.11,8a.3.3,0,0,1-.28.19H84.33a.3.3,0,0,1-.25-.13.28.28,0,0,1,0-.28L95,16.29a.32.32,0,0,1,.28-.19h2.77a.32.32,0,0,1,.28.19l11,27.41a.28.28,0,0,1,0,.28.3.3,0,0,1-.25.13Zm-4.39-10.77L96.7,19.61,91.29,33.34Z" style="fill:#fff"/><path d="M98.07,16.41l11,27.4h-2.57l-3.18-8.18H90.08L86.9,43.81H84.33l11-27.4Zm4.45,17.23-5.76-14.7h-.11l-5.8,14.7Z" style="fill:#fff"/><path d="M130.73,44.11a.3.3,0,0,1-.26-.14,9.11,9.11,0,0,1-1.12-3.85L129,36.35a4.4,4.4,0,0,0-1.75-3.42,7.08,7.08,0,0,0-4-1h-8.75V43.81a.3.3,0,0,1-.31.3h-2.34a.3.3,0,0,1-.3-.3V16.41a.31.31,0,0,1,.3-.31h11.59a9.83,9.83,0,0,1,6.57,2,7.28,7.28,0,0,1,2.45,5.83,7.42,7.42,0,0,1-1.36,4.36,6.59,6.59,0,0,1-3.16,2.27,5.6,5.6,0,0,1,3.94,5.08l.39,4.11a7.27,7.27,0,0,0,1.28,3.88.29.29,0,0,1,0,.31.29.29,0,0,1-.27.17ZM123.2,29.27a7.15,7.15,0,0,0,4.8-1.5A4.86,4.86,0,0,0,129.51,24,4.88,4.88,0,0,0,128,20.12c-1-.9-2.6-1.34-4.86-1.34h-8.68V29.27Z" style="fill:#fff"/><path d="M123.43,16.41a9.62,9.62,0,0,1,6.38,1.91,7,7,0,0,1,2.34,5.61,7,7,0,0,1-1.31,4.18A6.47,6.47,0,0,1,127,30.53v.08a5.39,5.39,0,0,1,4.6,5.06l.39,4.11a7.56,7.56,0,0,0,1.34,4h-2.57a8.76,8.76,0,0,1-1.08-3.72l-.34-3.76a4.71,4.71,0,0,0-1.88-3.65,7.35,7.35,0,0,0-4.19-1h-9.06V43.81h-2.34V16.41Zm-9.25,13.16h9a7.37,7.37,0,0,0,5-1.57,5.16,5.16,0,0,0,1.62-4,5.16,5.16,0,0,0-1.58-4.1c-1.07-1-2.76-1.42-5.06-1.42h-9Z" style="fill:#fff"/><path d="M157.32,44.11a.32.32,0,0,1-.22-.1L144.6,30,140,34.31v9.5a.3.3,0,0,1-.3.3h-2.35a.3.3,0,0,1-.3-.3V16.41a.31.31,0,0,1,.3-.31h2.35a.31.31,0,0,1,.3.31V30.75l15.46-14.56a.27.27,0,0,1,.2-.09h3.15a.32.32,0,0,1,.28.19.31.31,0,0,1-.08.34l-12.37,11.5,14.12,15.48a.29.29,0,0,1,0,.32.29.29,0,0,1-.27.18Z" style="fill:#fff"/><path d="M158.82,16.41l-12.59,11.7,14.32,15.7h-3.23l-12.7-14.2-4.91,4.57v9.63h-2.35V16.41h2.35v15l16-15Z" style="fill:#fff"/><path d="M165.5,44.19a2.16,2.16,0,0,1-1.6-.63,2.27,2.27,0,0,1-.66-1.63,2.19,2.19,0,0,1,.66-1.6,2.07,2.07,0,0,1,1.6-.66,2.18,2.18,0,0,1,1.59.66,2.21,2.21,0,0,1,.66,1.6,2.27,2.27,0,0,1-.66,1.63A2.31,2.31,0,0,1,165.5,44.19Z" style="fill:#fff"/><path d="M166.88,40.55a1.88,1.88,0,0,1,.57,1.38,2,2,0,0,1-.57,1.42,2,2,0,0,1-1.38.54,1.88,1.88,0,0,1-1.39-.54,2,2,0,0,1-.57-1.42,1.88,1.88,0,0,1,.57-1.38A1.77,1.77,0,0,1,165.5,40,1.88,1.88,0,0,1,166.88,40.55Z" style="fill:#fff"/><path d="M185.07,44.65a12.3,12.3,0,0,1-9.86-4.25,15.35,15.35,0,0,1-3.41-10.29,15.32,15.32,0,0,1,3.41-10.29,13.56,13.56,0,0,1,19.72,0,15.13,15.13,0,0,1,3.41,10.29,15.41,15.41,0,0,1-3.41,10.33A12.5,12.5,0,0,1,185.07,44.65Zm0-26.33a9.49,9.49,0,0,0-7.68,3.34,12.93,12.93,0,0,0-2.69,8.45c0,3.56.87,6.32,2.65,8.44a10.48,10.48,0,0,0,15.32,0,12.83,12.83,0,0,0,2.69-8.48,12.68,12.68,0,0,0-2.69-8.48A9.28,9.28,0,0,0,185.11,18.32Z" style="fill:#fff"/><path d="M194.7,20A15,15,0,0,1,198,30.11a15.05,15.05,0,0,1-3.34,10.13,12.1,12.1,0,0,1-9.63,4.11,12,12,0,0,1-9.63-4.15,15,15,0,0,1-3.34-10.09A15,15,0,0,1,175.44,20a13.27,13.27,0,0,1,19.26,0Zm-17.5,1.46a13.13,13.13,0,0,0-2.76,8.64,12.92,12.92,0,0,0,2.72,8.63,10.77,10.77,0,0,0,15.78,0,13,13,0,0,0,2.76-8.67,13,13,0,0,0-2.76-8.68A9.63,9.63,0,0,0,185.11,18,9.77,9.77,0,0,0,177.2,21.47Z" style="fill:#fff"/><path d="M221.61,44.11a.3.3,0,0,1-.25-.13L205.13,20.65V43.81a.29.29,0,0,1-.3.3h-2.34a.3.3,0,0,1-.3-.3V16.41a.31.31,0,0,1,.3-.31h2.65a.31.31,0,0,1,.25.13l16.15,23.14v-23a.3.3,0,0,1,.3-.31h2.38a.31.31,0,0,1,.3.31v27.4a.3.3,0,0,1-.3.3Z" style="fill:#fff"/><path d="M229.82,44.11a.29.29,0,0,1-.3-.3V16.41a.3.3,0,0,1,.3-.31h19.23a.31.31,0,0,1,.3.31v2.07a.31.31,0,0,1-.3.3H232.46v9.49h15.67a.31.31,0,0,1,.3.3v2.11a.3.3,0,0,1-.3.3H232.46V41.44H249.7a.29.29,0,0,1,.3.3v2.07a.29.29,0,0,1-.3.3Z" style="fill:#fff"/><path d="M249.05,16.41v2.07H232.16V28.57h16v2.11h-16V41.74H249.7v2.07H229.82V16.41Z" style="fill:#fff"/></svg></a></li>'+
            '<li class="nav-item nav-item1"><a id="trading" href="../tradingCenter/trading.html" class="nav" data-i18n="common:header.nav1">交易中心</a></li>'+
            '<li class="nav-item"><a id="announcementCenter" href="../announcement/announcementCenter.html" class="nav" data-i18n="common:header.nav4">公告</a></li>'+
            // '<li class="nav-item"><a id="helpCenter" href="../account/workOrder.html" class="nav" data-i18n="common:header.nav11">联系客服</a></li>'+
            '<div class="nav-right">'+
            '<li class="nav-item nav-item2" id="assetBtn"><a id="assetManage" href="../asset/assetManage.html" class="nav" data-i18n="common:header.nav2">资产</a></li>'+
            '<li class="nav-item" id="orderBtn"><a id="orderManage" href="../orderManage/orderManage.html" class="nav" data-i18n="common:header.nav3">订单</a></li>'+

            '<li class="nav-item nav-login" id="loginBtn"><a class="nav" href="../account/login.html" data-i18n="common:header.nav6">登录</a></li>'+
            '<li class="nav-item nav-register" id="registerBtn"><a class="nav" href="../account/register.html" data-i18n="common:header.nav7">注册</a></li>'+
            '<li class="nav-item ctrl-select" id="personalCenter">'+
                '<div class="user-center ul-select-wrap" id="AccountBtn">'+
                    '<a class="nav-select" href="javascript:void(0)"><svg class="icon" style="fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2001"><path d="M943.9744 1022.42816a23.28576 23.28576 0 0 0 23.33184-23.2704c0-62.55104-12.0064-123.22816-35.73248-180.40832a463.79008 463.79008 0 0 0-97.4336-147.4304c-41.7792-42.61888-90.51136-76.11904-144.7424-99.52256a450.62656 450.62656 0 0 0-52.95104-19.02592 288.78336 288.78336 0 0 0 81.44384-57.2928c54.77888-54.656 84.94592-127.3088 84.94592-204.60544 0-77.29152-30.18752-149.9648-84.9408-204.60544C663.13216 31.61088 590.27968 1.536 512.81408 1.536 435.34336 1.536 362.5216 31.63648 307.72736 86.27712 252.95872 140.92288 222.78144 213.59616 222.78144 290.88256c0 77.28128 30.17728 149.95456 84.94592 204.60544A290.51904 290.51904 0 0 0 388.5568 552.4992a447.0272 447.0272 0 0 0-53.96992 19.30752c-54.2208 23.42912-102.91712 56.87808-144.7424 99.52768a463.01184 463.01184 0 0 0-97.43872 147.4304c-23.70048 57.18016-35.712 117.87264-35.712 180.40832a23.296 23.296 0 0 0 23.30624 23.28064H943.9744v-0.0256z" p-id="2002"></path></svg></a>'+
                    '<ul class="ul-select">'+
                    	'<li><a href="../personalCenter/personalCenter.html"data-i18n="common:header.nav5"></a></li>'+
                        //'<li><a href="../personalCenter/myMessage.html" data-i18n="common:header.nav8">我的消息</a></li>'+
                        '<li><a id="loginOut" data-i18n="common:header.nav9">退出</a></li>'+
                    '</ul>'+
                '</div>'+
                '<div class="change-lan ul-select-wrap">'+
                    '<a class="lanage nav-select">'+
                        '<i class="icon-country"><img src="" class="img-language" ></i><span>中文简体</span><i class="icon-down"></i>'+
                    '</a>'+
                    '<ul class="ul-select" id="ul-language">'+
                        '<li id="scn" class="dn"><a><img src="../../images/china.png" class="img-language">中文(简体)</a></li>'+
                        '<li id="tcn"><a><img src="../../images/china.png" class="img-language">中文(繁体)</a></li>'+
                        '<li id="en"><a><img src="../../images/uk.png" class="img-language">English</a></li>'+
                    '</ul>'+
                '</div>'+
            '</li>'+
            '</div>'+
        '</ul>';
	var noticeHtml = '<ul class="list-inline">'+
						'<li class="titles"></li>'+
						'<li class="scroll-main">'+
							'<span data-i18n="common:header.nav4">公告</span>'+
							'<div class="scroll-body">'+
								'<marquee class="marquee" align="left" behavior="scroll" direction="left" loop="-1" scrollamount="5" scrolldelay="100" onmouseout="this.start()" onmouseover="this.stop()">'+
									'专业版币币交易平台将于2017年10月10日火爆上线，届时可享受XXXX好礼......'+
								'</marquee>'+  
							'</div>'+
						'</li>'+
						'<li class="annClose"></li>'+
					'</ul>';
        // var footerHtml ='<ul class="clearfix yqlj-box"><li class="pull-left yqljli" data-i18n="common:footer.links">友情链接：</li><li class="pull-left yqljli"><a href="http://valuebank.com" target="_blank">ValueBank</a></li><li class="pull-left yqljli"><a href="http://www.b20.io/" target="_blank">B20</a></li><li class="pull-left yqljli"><a href="https://www.coinwall.io/" target="_blank">CoinWall</a></li><li class="pull-left yqljli"><a href="http://www.jinse.com/" target="_blank" data-i18n="common:footer.Cointime">金色财经</a></li><li class="pull-left yqljli"><a href="http://www.8btc.com/" target="_blank" data-i18n="common:footer.8btc">巴比特</a></li><li class="pull-left yqljli"><a href="https://www.kcash.com/index-cn.html" target="_blank">KCASH</a></li><li class="pull-left yqljli"><a href="https://www.chainnews.com/" target="_blank" data-i18n="common:footer.CHAINNEWS">链闻</a></li><li class="pull-left yqljli"><a href="https://www.block123.com/" target="_blank" data-i18n="common:footer.Block123">区块链导航</a></li><li class="pull-left yqljli"><a href="https://www.yaofache.com/" target="_blank">要发车</a></li><li class="pull-left yqljli"><a href="http://www.jinniu.cn/" target="_blank" data-i18n="common:footer.jinniuFinance">要发车</a></li><li class="pull-left yqljli"><a href="http://www.chain.vip/" data-i18n="common:footer.vipchain" target="_blank">要发车</a></li><li class="pull-left yqljli"><a href="https://www.masterdax.com/" target="_blank" data-i18n="common:footer.masterdax"></a></li></ul>'+ 
        var footerHtml ='<ul>'+
                    '<li class="foo-nav foo-first"><a href="../account/aboutUs.html" data-i18n="common:footer.nav5">关于我们</a></li>'+'<li class="foo-nav"><a href="../account/termService.html" data-i18n="common:footer.nav1">服务条款</a></li>'+

                    '<li class="foo-nav"><a href="../account/privacyStatement.html" data-i18n="common:footer.nav4">隐私声明</a></li>'+
                    '<li class="foo-nav"><a href="../account/rateStandard.html" data-i18n="common:footer.nav2">费率声明</a></li>'+
                    '<li class="foo-nav"><a href="../account/helpCenter.html" data-i18n="common:footer.nav3">帮助中心</a></li>'+
                    // '<li class="foo-nav"><a href="../account/coinstandard.html" data-i18n="common:footer.coinList">上幣申請</a></li>'+
                    '<li class="foo-nav foo-nav-right">'+
                        '<a href="https://twitter.com/search?q=parkonenice" target="_blank"><i class="icon-twitter"></i></a>'+
                        '<a href="https://www.facebook.com/Parkoneexchange/?modal=admin_todo_tour" target="_blank"><i class="icon-facebook"></i></a>'+
                        '<a href="javascript:void(0)"><i class="icon-weixin"></i><span class="ewmto"><font><img src="../../images/weixin-dy.jpg" alt=""/><i data-i18n="common:footer.Subscriptions">微信订阅号</i></font></span></a>'+
                        '<a href="https://m.weibo.cn/u/6536442461" target="_blank"><i class="icon-sina"></i></a>'+
                        '<a style="line-height:0" href="javascript:void(0)"><img style="width:17px;margin-top:6.5px;" src="../../images/kefuicon.png" alt=""/><span class="ewmto"><font><img src="../../images/kefu.jpg" alt=""/><i data-i18n="common:footer.WechatService">微信订阅号</i></font></span></a>'+
                    '</li>'+
                '</ul>'+
                '<ul class="clearfix time-box">'+
                '            <li class="pull-left">©️2018 PARK.ONE All Rights Reserved</li>'+
                '            <li class="pull-right"><i class="icon-connect"></i><i data-i18n="common:footer.connectStatus"> 已连接</i></li>'+
                '            <li class="pull-right time-block"><i class="icon-time"></i><i id="time" class="time"></i><i>HKT</i></li>'+
                '        </ul>'+
                // '<div class="right-fixed">'+
                //     '<a href="../account/workOrder.html"><i><img src="../../images/about_work.png"></i><span data-i18n="common:footer.work">提交工单</span></a>'+
                //     '<a href="javascript:void(0)" class="returnTop"><i><img src="../../images/returnTop.png"></i></a>'+
                // '</div>'+
                '<div class="footerMoadl">'+
                            '<div class="popBox">'+
                                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
                                '<div class="popTitle"></div>'+
                                '<div class="popContent text-center">'+
                                    '<div class="popFirend">'+
                                        '<h4><img src="../../images/telegram.png" alt=""><i data-i18n="common:footer.cointobTele">PARK.ONE电报</i></h4>'+
                                        '<p>'+
                                            '<span data-i18n="common:footer.telegram">官网中文群：</span><a href="https://t.me/cointobe_chinese" target="_blank">https://t.me/cointobe_chinese</a>'+
                                        '</p>'+
                                        '<p>'+
                                            '<span data-i18n="common:footer.telegram1">官网英文群：</span><a href="https://t.me/cointobe_english" target="_blank">https://t.me/cointobe_english</a>'+
                                        '</p>'+
                                   '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
    var indexFooterHtml= '<ul>'+
                            '<li class="foo-nav foo-nav-right">'+
                                '<a href="https://twitter.com/ParkOneExchange?lang=zh-cn" target="_blank"><i class="icon-twitter"></i></a>'+
                                '<a href="https://www.facebook.com/Parkoneexchange/?modal=admin_todo_tour" target="_blank"><i class="icon-facebook"></i></a>'+
                                '<a href="javascript:void(0)"><i class="icon-weixin"></i><span class="ewmto"><font><img src="../../images/weixin-dy.jpg" alt=""/><i data-i18n="common:footer.Subscriptions">微信订阅号</i></font><font><img src="../../images/weixin-qr1.png" alt=""/><i data-i18n="common:footer.WechatNews">微信服务号</i></font><font><img src="../../images/weixin-qr2.png" alt="" /><i data-i18n="common:footer.WechatService">微信客服</i></font></span></a>'+
                                '<a href="https://m.weibo.cn/u/6536442461" target="_blank"><i class="icon-sina"></i><span><img src="../../images/weibo-qr.png" alt="" /></span></a>'+
                                '<a style="line-height:0" href="javascript:void(0)"><img style="width:17px;margin-top:6.5px;" src="../../images/kefuicon.png" alt=""/><span class="ewmto"><font><img src="../../images/kefu.jpg" alt=""/><i data-i18n="common:footer.WechatService">微信订阅号</i></font></span></a>'+
                            '</li>'+
                        '</ul>';
    var indexFooterModal = '<div class="footerMoadl" style="background:rgba(0,0,0,0)" >'+
                            '<div class="popBox">'+
                                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
                                '<div class="popTitle"></div>'+
                                '<div class="popContent text-center">'+
                                    '<div class="popFirend">'+
                                        '<h4><img src="../../images/telegram.png" alt="">PARK.ONE电报</h4>'+
                                        '<p>'+
                                            '<span data-i18n="common:footer.telegram">官网中文群：</span><a href="https://t.me/cointobe_chinese" target="_blank">https://t.me/cointobe_chinese</a>'+
                                        '</p>'+
                                        '<p>'+
                                            '<span data-i18n="common:footer.telegram">官网英文群：</span><a href="https://t.me/cointobe_english" target="_blank">https://t.me/cointobe_english</a>'+
                                        '</p>'+
                                   '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';                   
   	var hideAlert = '<div id="alertTitle"><i class="aTitle" data-i18n="common:commonMsg.alertTitle"></i><i class="aBtn" data-i18n="common:commonMsg.alertBtn"></i></div>';
	var bodyActive = '<div class="footer-active"><img src="../../images/footer-active-banner.png" onClick="activeJump()" /><a onClick="closeFooterActive()" class="footer-active-close"></a></div>';
	$("#topNotice").html(noticeHtml);
    $("#indexFooter").html(indexFooterHtml);
    $("#headerNav").html(headerHtml);
    $("#footerNav").html(footerHtml);
    $("#footerModal").html(indexFooterModal);
    $("body").append(hideAlert);
    
    var isShowFooterActive = sessionStorage.getItem("isShowFooterActive");
	if(isShowFooterActive != 3){
		sessionStorage.setItem("isShowFooterActive",2);
		//$("body").append(bodyActive);
	}
    
    //当前页面给class="nav"加 active-nav
    var urls11 = window.location.pathname;
    var translation="";
    if(urls11.indexOf(".html")>0){
        translation=urls11.substring(urls11.lastIndexOf("/")).replace("/","").replace(".html","");
    }else{
        translation="index";
    }
    
    if(translation == "personalCenter"){
    	$("#"+translation+" #AccountBtn .nav-select").addClass("active-nav");
    }else{
    	$("#"+translation).addClass("active-nav");
    }
    
    $("#loginOut").click(function(){
        //退出接口
        callServieOther("logout","/api/user/logout",{});
    });
    $('.ul-select-wrap').mouseenter(function(){
        var $this = $(this);
        $this
            .find('.ul-select')
            .addClass("animation-select")
            .parent()
            .find(".icon-down")
            .addClass("icon-down-open");
    }).mouseleave(function(){
        var $this = $(this);
        $this
            .find('.ul-select')
            .removeClass("animation-select")
            .parent()
            .find(".icon-down")
            .removeClass("icon-down-open");
    });


    //是否登录
    var userToken = deviceType == 1 ? $.cookie("userToken") : localStorage.userToken;
    if(!userToken && userToken != 'undefined'){
        $("#AccountBtn,#orderBtn,#assetBtn").hide();
        $("#loginBtn,#registerBtn").css("display","inline-block");
        var urls = window.location.pathname;
        if(urls.indexOf("login")>0 || urls.indexOf("register")>0){ 
            $("#loginBtn,#registerBtn").hide();
        }
    }else{
        $("#loginBtn,#registerBtn").hide();
        $("#AccountBtn").css("display","inline-block");
        $("#orderBtn,#assetBtn").show();
    }
    resizebody();
}
function activeJump(){
	$(".footer-active").remove();
	sessionStorage.setItem("isShowFooterActive",3);
	window.location.href = 'https://www.park.one/detail_activity/sancActivity.html';
}
function closeFooterActive(){
	sessionStorage.setItem("isShowFooterActive",3);
	$(".footer-active").remove();
}
window.onload = function () {
    $("#loading").hide();
    $("#loaded").show();    
    initPage();//用来避免 onload重写，的空方法
	resizebody();
	$('img').each(function(){
		var error = false;
		if (!this.complete) {
			error = true;
		}
		if (typeof this.naturalWidth != "undefined" && this.naturalWidth == 0) {
			error = true;
		}
		if(error){
			$(this).bind('error.replaceSrc',function(){
				this.style.display = none;
				$(this).unbind('error.replaceSrc');
			}).trigger('load');
		}
	});
}
window.addEventListener("resize",function(){
	resizebody();
});
function resizebody(){
	var footerH = $("#footerNav").height();
	var headerH = $("#headerNav").height();
    var adH = $(".head-banner").height();
    var notice = $("#topNotice").height();
	if(footerH <= 0) footerH = 60;
	if(headerH <= 0) headerH = 165;
	var othersH = headerH+footerH;
    if(adH) othersH = othersH+adH;
    if(notice) othersH = othersH+notice;
	var winW = document.body.clientWidth;
	var winH = $(window).height();	//頁面變化高度
	var contentH = $(".warp-box").height();	//頁面內容高度
	//if(winH <= 0 ) winH = (document.documentElement.scrollHeight >document.documentElement.clientHeight) ? document.documentElement.scrollHeight : document.documentElement.clientHeight;
	if(contentH <= 0) contentH = window.screen.availHeight;	//頁面內容高度
	if(winH > 0 && (winH-40) > (contentH+othersH)){
		$("#footerNav").addClass("posi-fix").removeClass("dn");
	}else{
		$("#footerNav").removeClass("posi-fix").removeClass("dn");
	}
}
function initPage(){
    //空方法 不要加东西
     resizebody();
}
$(function(){
	//公告滚动显示
	//$("#topNotice").show();
    
	//公告滚动隐藏 整体距头25PX
	$(".warp-box").css("padding-top","22px");
})
/*谷歌验证弹窗*/
function loadTwoVerifyGoogle(){
	$("#btn-googleValidate,#googleValidate").remove();
    var googleTypeHtml='<button class="btn btn-primary btn-lg dn"  id="btn-googleValidate" data-toggle="modal" data-target="#googleValidate">'+
        '                        谷歌验证弹窗'+
        '                    </button>'+
        '                    <div  data-backdrop="static" data-keyboard="false" class="modal fade" id="googleValidate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
        '						 <div class="modal-dialog">'+
        '                            <div class="modal-content">'+
        '                                <div class="modal-header">'+
		'									 <button type="button" class="close  close-m dn" data-dismiss="modal" aria-hidden="true">'+
        '                                        &times;'+
        '                                    </button>'+
        '                                    <h4 data-i18n="common:twoVerification.title1" class="modal-title text-center">'+
        '                                        谷歌验证'+
        '                                    </h4>'+
        '                                </div>'+
        '                                <div class="modal-body">'+
        '                                   <input type="text" style="display:none">'+
        '                                    <input type="text"   data-i18n="[placeholder]common:twoVerification.placeholder1"  placeholder="谷歌验证码" class="input-code googleCode" id="gooleCode" autocomplete="off" onkeyup="googleVerify(this)">'+
        '                                    <p  class="warning warning-googlecode"></p>'+
        '                                </div>'+
        '                                <div class="modal-footer">'+
        '                                    <button data-i18n="common:twoVerification.btnSubmit" type="button" class=" btn-primary btn-open btn-submit-google"  onclick="googleCodeValid()">'+
        '                                        提交更改'+
        '                                    </button>'+
        '                                </div>'+
        '                            </div>'+
        '                        </div>'+
        '                    </div>';
    $(".page").before(googleTypeHtml);
    initLang();
}
/*手机验证弹窗*/
function loadTwoVerifyMobile(){
	$("#btn-mobileValidate,#mobileValidate").remove();
    var mobileTypeHtml='<button class="btn btn-primary btn-lg dn" id="btn-mobileValidate" data-toggle="modal" data-target="#mobileValidate">'+
        '                        手机验证弹窗'+
        '                    </button>'+
        '                    <div  data-backdrop="static" data-keyboard="false" class="modal fade" id="mobileValidate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
        '						 <div class="modal-dialog">'+
        '                            <div class="modal-content">'+
        '                                <div class="modal-header">'+
        '                                    <button type="button" class="close close-m dn" data-dismiss="modal" aria-hidden="true">'+
        '                                        &times;'+
        '                                    </button>'+
        '                                    <h4 data-i18n="common:twoVerification.title2"  class="modal-title text-center">'+
        '                                        手机验证'+
        '                                    </h4>'+
        '                                </div>'+
        '                                <div class="modal-body">'+
        '                                    <div class="btn-wrap">'+
        '                                        <input type="text" placeholder="" data-i18n="[placeholder]common:twoVerification.placeholder2"  class="input-code mobileCode" id="mobileCode" onkeyup="mobileVerify(this)">'+
        '                                        <input type="button" value="" data-i18n="[value]common:twoVerification.btnSendCode"  class="btn-send" onclick="sendValidSms(this)">'+
        '                                    </div>'+
        '                                    <p class="warning warning-mobilecode" ></p>'+
        '                                </div>'+
        '                                <div class="modal-footer">'+
        '                                    <button data-i18n="common:twoVerification.btnSubmit"   type="button" class="btn-submit-mobile  btn-primary btn-open" onclick="mobileCodeVerify()">'+
        '                                        提交更改'+
        '                                    </button>'+
        '                                </div>'+
        '                            </div>'+
        '                        </div>'+
        '                    </div>';
    $(".page").before(mobileTypeHtml);
   	initLang();
}
/*谷歌及手机验证弹窗*/
function loadTwoVerify(){
	$("#btn-twoTypeValidate,#twoTypeValidate").remove();
    var TwoTypeHtml='<button class="btn btn-primary btn-lg  dn" id="btn-twoTypeValidate" data-toggle="modal" data-target="#twoTypeValidate">'+
        '                        两种弹窗'+
        '                    </button>'+
        '                    <div data-backdrop="static" data-keyboard="false" class="modal fade" id="twoTypeValidate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
        '                        <div class="modal-dialog">'+
        '                            <div class="modal-content">'+
        '                                <div class="modal-header">'+
        '                                    <button type="button" class="close close-m dn" data-dismiss="modal" aria-hidden="true">'+
        '                                        &times;'+
        '                                    </button>'+
        '                                    <h4 class="modal-title text-center" data-i18n="common:twoVerification.title3" >'+
        '                                        二次验证'+
        '                                    </h4>'+
        '                                </div>'+
        '                                <div class="modal-body">'+
        '                                    <ul id="myTab" class="nav nav-tabs text-center">'+
        '                                        <li id="btn-google" onclick="setBtn()"><a href="#google" data-toggle="tab" data-i18n="common:twoVerification.title1" >'+
        '                                            谷歌验证</a></li>'+
        '                                        <li id="btn-mobile"  onclick="setBtn()"><a href="#mobile" data-toggle="tab" data-i18n="common:twoVerification.title2">手机验证</a></li>'+
        '                                    </ul>'+
        '                                    <div id="myTabContent" class="tab-content">'+
        '                                        <div class="tab-pane fade" id="google">'+
        '                                            <input type="text" placeholder="谷歌验证码" data-i18n="[placeholder]common:twoVerification.placeholder1" class="input-code googleCode" id="TwoGoogleCode" onkeyup="googleVerify(this)">'+
        '                                            <p  class="warning warning-googlecode" ></p>'+
        '                                        </div>'+
        '                                        <div class="tab-pane fade" id="mobile">'+
        '                                            <div class="btn-wrap">'+
        '                                                <input type="text" placeholder="手机验证码" data-i18n="[placeholder]common:twoVerification.placeholder2" class="input-code mobileCode" id="TwoMobileCode" onkeyup="mobileVerify(this)">'+
        '                                                <input type="button" value="发送验证码" data-i18n="[value]common:twoVerification.btnSendCode" class="btn-send" onclick="sendValidSms(this)">'+
        '                                            </div>'+
        '                                            <p  class="warning warning-mobilecode" ></p>'+
        '                                        </div>'+
        '                                    </div>'+
        '                                </div>'+
        '                                <div class="modal-footer">'+
        '                                    <button type="button" data-i18n="common:twoVerification.btnSubmit"  id="gooleAndMobile" class=" btn-primary btn-open btn-submit-google btn-submit-mobile">'+
        '                                        提交更改'+
        '                                    </button>'+
        '                                </div>'+
        '                            </div>'+
        '                        </div>'+
        '                    </div>';
    $(".page").before(TwoTypeHtml);
    initLang();
}

function loadbgloading() {
    var bgloadingHtml=' <div class="bgloading dn" id="bgloading">'+
        '            <div class="loading">'+
        '                <div class="double-bounce1"></div>'+
        '                <div class="double-bounce2"></div>'+
        '            </div>'+
        '        </div>';
    if($("#bgloading").length<0){
        $(".page").before(bgloadingHtml);
    }  
}
function callServieaSync(serviceName,urlPath,param,loadParam) {
    var loadParam = loadParam||{};
	if(loadParam.isLoading){
		$(loadParam.elm).removeClass("dn");
	}
    var lan = parmLng[$.cookie('newlang')];
    var userToken = deviceType == 1 ? $.cookie("userToken") : localStorage.userToken;
    var userFrom = sessionStorage.getItem("utm_source") ? sessionStorage.getItem("utm_source") : "";
    var url=Path+urlPath+'?lang='+lan;
    var param=param||{};
    if(!userToken || userToken == "undefinde"){
        userToken = '';
    }
    $.ajax({
        url:url,
        type:"post",
        data:JSON.stringify(param),
        crossDomain: true,
        async:false, 
        xhrFields: {  
            withCredentials: true  
        },
        contentType:"application/json",
        beforeSend: function(request) {
            request.setRequestHeader("token",userToken);
        },
        headers: {
              "Accept": "application/json;charset=UTF-8",
              'token': userToken,
              'x-access-channel': userFrom,
        },
        success:function(data){

            return serviceNameCallBack(serviceName,data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown){
                var errorCode=XMLHttpRequest.status;
                if(errorCode==401){/*如果返回401,即没登录，没token,则跳登录页面*/
                    clearAllCookie();
                    window.location.href="../account/login.html";
                }else{/*如果已登录，下面判断是否开启二次登录*/
                    if(errorCode==450) { /*如果返回450，即没二次验证，则跳二次验证页面*/
                        stopflag=true;
                        var twoValid = deviceType == 1 ? $.cookie("twoValid") : localStorage.twoValid;
                        var googleStatus = deviceType == 1 ? $.cookie("googleStatus") : localStorage.googleStatus;
                        var mobileStatus = deviceType == 1 ? $.cookie("mobileStatus") : localStorage.mobileStatus;
						var lastVerfiyType = deviceType == 1 ? $.cookie("lastVerfiyType") : localStorage.lastVerfiyType;
                        if(twoValid == 1){ /*开启了二次验证*/
                            if (googleStatus == 1 && mobileStatus == 0) {
                                
                                loadTwoVerifyGoogle();
                                $("#btn-googleValidate").click().hide();
                            } else if (googleStatus == 0 && mobileStatus == 1) {
                               
                                loadTwoVerifyMobile();
                                $("#btn-mobileValidate").click().hide();
                            } else if (googleStatus == 1 && mobileStatus == 1) {
                                loadTwoVerify();
                                if (lastVerfiyType == "sms") {
                                    
                                    $("#btn-twoTypeValidate").click().hide();
                                    $("#myTab li:eq(1)").addClass("active");
                                    $("#myTabContent #mobile").addClass("active");
                                    $("#myTabContent #mobile").addClass("in");
                                } else if (lastVerfiyType == "google" || lastVerfiyType == ""|| lastVerfiyType =="null") {
                                
                                    $("#btn-twoTypeValidate").click().hide();
                                    $("#myTab li:eq(0)").addClass("active");
                                    $("#myTabContent #google").addClass("active");
                                    $("#myTabContent #google").addClass("in");
                                }
                            }
                            initLang();
                        }
                    }
                }
                
        }
    })
}

function logoutCallBack(){
	clearAllCookie();
	sessionStorage.clear();
	window.location.href = "../account/login.html";
}
//访问后台接口公共部分
function callServie(serviceName,urlPath,param,loadParam) {

    if(stopflag){
        return;
    }
	var loadParam = loadParam||{};
	if(loadParam.isLoading){
		$(loadParam.elm).removeClass("dn");
	}
    var lan = parmLng[$.cookie('newlang')]?parmLng[$.cookie('newlang')]:'zh_CN';
	var userToken = deviceType == 1 ? $.cookie("userToken") : localStorage.userToken;
	var userFrom = sessionStorage.getItem("utm_source") ? sessionStorage.getItem("utm_source") : "";
	var url=Path+urlPath+'?lang='+lan;
	var param=param||{};
	if(!userToken || userToken == "undefinde"){
		userToken = '';
	}
	$.ajax({
		url:url,
		type:"post",
		data:JSON.stringify(param),
		crossDomain: true,
        xhrFields: {  
            withCredentials: true  
        },
        contentType:"application/json",
        beforeSend: function(request) {
			request.setRequestHeader("token",userToken);
        },
        headers: {
              "Accept": "application/json;charset=UTF-8",
			  'token': userToken,
			  'x-access-channel': userFrom,
        },
		success:function(data){
			return serviceNameCallBack(serviceName,data);
		},
		error: function (XMLHttpRequest, textStatus, errorThrown){
                var errorCode=XMLHttpRequest.status;
                if(errorCode==401){/*如果返回401,即没登录，没token,则跳登录页面*/
				    clearAllCookie();
                    window.location.href="../account/login.html";
                }else{/*如果已登录，下面判断是否开启二次登录*/
                    if(errorCode==450) { /*如果返回450，即没二次验证，则跳二次验证页面*/
                        var twoValid = deviceType == 1 ? $.cookie("twoValid") : localStorage.twoValid;
                        var googleStatus = deviceType == 1 ? $.cookie("googleStatus") : localStorage.googleStatus;
                        var mobileStatus = deviceType == 1 ? $.cookie("mobileStatus") : localStorage.mobileStatus;
						var lastVerfiyType = deviceType == 1 ? $.cookie("lastVerfiyType") : localStorage.lastVerfiyType;
                        if(twoValid == 1){ /*开启了二次验证*/
                            if (googleStatus == 1 && mobileStatus == 0) {
                    
                                loadTwoVerifyGoogle();
                                $("#btn-googleValidate").click().hide();
                            } else if (googleStatus == 0 && mobileStatus == 1) {
                            
                                loadTwoVerifyMobile();
                                $("#btn-mobileValidate").click().hide();
                            } else if (googleStatus == 1 && mobileStatus == 1) {
                                loadTwoVerify();
                                if (lastVerfiyType == "sms") {
                                  
                                    $("#btn-twoTypeValidate").click().hide();
                                    $("#myTab li:eq(1)").addClass("active");
                                    $("#myTabContent #mobile").addClass("active");
                                    $("#myTabContent #mobile").addClass("in");
                                } else if (lastVerfiyType == "google" || lastVerfiyType == ""|| lastVerfiyType =="null") {
                                    
                                    $("#btn-twoTypeValidate").click().hide();
                                    $("#myTab li:eq(0)").addClass("active");
                                    $("#myTabContent #google").addClass("active");
                                    $("#myTabContent #google").addClass("in");
                                }
                            }
                            initLang();
                        }
                    }else if(errorCode==500){
                        //window.location.href="../error/500.html";
                    }
                }
		}
	})
}
function callServieGet(serviceName,urlPath,param,loadParam) {
    if(stopflag){
        return;
    }
    var loadParam = loadParam||{};
	if(loadParam.isLoading){
		$(loadParam.elm).removeClass("dn");
	}
    var lan = parmLng[$.cookie('newlang')];
    var url=Path1+urlPath+'?lang='+lan;
    var userToken = deviceType == 1 ? $.cookie("userToken") : localStorage.userToken;
    $.ajax({
        url:url,
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success:function(data){
            return serviceNameCallBack(serviceName,data);
        }
    })
}
function callServieGetOther(serviceName,urlPath,param,loadParam) {
	var loadParam = loadParam||{};
	if(loadParam.isLoading){
		$(loadParam.elm).removeClass("dn");
	}
    var lan = parmLng[$.cookie('newlang')];
    var url=Path+urlPath+'?lang='+lan;
    var userToken = deviceType == 1 ? $.cookie("userToken") : localStorage.userToken;
    var param=param||{};
    $.ajax({
        url:url,
        type: "POST",//请求方式为get
        dataType: "json", //返回数据格式为json
        data:param,
        beforeSend: function (request) {
            request.setRequestHeader('token', userToken);
        },
        success:function(data){
            return serviceNameCallBack(serviceName,data);
        }
    })
}
function callServieOther(serviceName,urlPath,param,loadParam) {
    if(stopflag){
        return;
    }
    var loadParam = loadParam||{};
	if(loadParam.isLoading){
		$(loadParam.elm).removeClass("dn");
	}
    var lan = parmLng[$.cookie('newlang')];
	var userToken = deviceType == 1 ? $.cookie("userToken") : localStorage.userToken;
	var userFrom = sessionStorage.getItem("utm_source") ? sessionStorage.getItem("utm_source") : "";
    var url=Path+urlPath+'?lang='+lan;
    var param=param||{};
	if(!userToken || userToken == "undefinde"){
		userToken = '';
	}
    $.ajax({
        url: url,
        type: "POST",
        data: param,
		crossDomain: true,
        dataType: "json",
        xhrFields: {  
            withCredentials: true  
        },
        beforeSend: function (request) {
			request.setRequestHeader('token', userToken);
			request.setRequestHeader('x-access-channel',userFrom);
        },
        success: function (data) {
            return serviceNameCallBack(serviceName, data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown){
            var errorCode=XMLHttpRequest.status;
            if(errorCode==401){/*如果返回401,即没登录，没token,则跳登录页面*/
				clearAllCookie();
                window.location.href="../account/login.html";
            }else{/*如果已登录，下面判断是否开启二次登录*/
                if(errorCode==450) { /*如果返回450，即没二次验证，则跳二次验证页面*/
                    var twoValid = deviceType == 1 ? $.cookie("twoValid") : localStorage.twoValid;
                    var googleStatus = deviceType == 1 ? $.cookie("googleStatus") : localStorage.googleStatus;
                    var mobileStatus = deviceType == 1 ? $.cookie("mobileStatus") : localStorage.mobileStatus;
					var lastVerfiyType = deviceType == 1 ? $.cookie("lastVerfiyType") : localStorage.lastVerfiyType;
                    
                    if(twoValid == 1){ /*绑定了二次验证*/
                        if (googleStatus == 1 && mobileStatus == 0) {
                            
                            loadTwoVerifyGoogle();
                            $("#btn-googleValidate").click();
                        } else if (googleStatus == 0 && mobileStatus == 1) {
                          
                            loadTwoVerifyMobile();
                            $("#btn-mobileValidate").click();
                        } else if (googleStatus == 1 && mobileStatus == 1) {
                            loadTwoVerify();
                            if (lastVerfiyType == "sms") {
                                
                                $("#btn-twoTypeValidate").click();
                                $("#myTab li:eq(1)").addClass("active");
                                $("#myTabContent tab-pane:eq(1)").addClass("active");
                            } else if (lastVerfiyType == "google" || lastVerfiyType == ""|| lastVerfiyType =="null") {
                               
                                $("#btn-twoTypeValidate").click();
                                $("#myTab li:eq(0)").addClass("active");
                                $("#myTabContent #google").addClass("active");
                                $("#myTabContent #google").addClass("in");
                            }
                        }
                    }

                }else if(errorCode==500){
                    //window.location.href="../error/500.html";
                }
            }
    }
    })
}
function serviceNameCallBack(serviceName,r){
	var fun=eval(serviceName+'CallBack');
	return fun(r);

}
function getParam(name){
    var Locationurl;
    Locationurl =  location.href;
    var r = new RegExp('(\\?|#|&)' + name + '=([^&#]*)(&|#|$)');
    var m = Locationurl.match(r);
    return m ? decodeURIComponent(m[2]) : null;
}
function getUrlParam(name){
    var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
}
function getFulldateFormate(str){
    if(!str){
        return;
      }
      var time=new Date(str);
      var year=time.getFullYear();
      var month=time.getMonth()+1;
      var day=time.getDate();
      var hour=time.getHours();
      var min=time.getMinutes();
      var ss=time.getSeconds();
      if(month<10){
        month="0"+month;
      }
      if(day<10){
        day="0"+day;
      }
      if(min<10){
        min="0"+min;
      }
      if(ss<10){
        ss="0"+ss;
      }    
      return year+"-"+month+"-"+day+" "+hour+":"+min+":"+ss;
}
function clearAllCookie() {  
	$.removeCookie("userToken", { path: '/' });
	$.removeCookie("twoValid", { path: '/' });
    $.removeCookie("googleStatus", { path: '/' });
    $.removeCookie("mobileStatus", { path: '/' });
    $.removeCookie("lastVerfiyType", { path: '/' });
 	localStorage.clear(); 
	//newlang 语言
	//checkUserTimeWait	收邮件倒计时
	//checkUserMail	注册邮箱
	/*
	 * var userToken = deviceType == 1 ? $.cookie("userToken") : localStorage.userToken;
	var twoValid = deviceType == 1 ? $.cookie("twoValid") : localStorage.twoValid;
    var googleStatus = deviceType == 1 ? $.cookie("googleStatus") : localStorage.googleStatus;
    var mobileStatus = deviceType == 1 ? $.cookie("mobileStatus") : localStorage.mobileStatus;
	var lastVerfiyType = deviceType == 1 ? $.cookie("lastVerfiyType") : localStorage.lastVerfiyType;
    */
}  


function scientificToNumber(num){
    var str = num;
    var reg = /^(\d|.+)(e)([\-]?\d+)$/;
    var arr, len,
        zero = '';
        
   /*6e7或6e+7 都会自动转换数值*/
    if (!reg.test(str)) {
        return cutZero(num+"");
    } else {
        /*6e-7 需要手动转换*/
        arr = reg.exec(str);
        len = Math.abs(arr[3]) - 1;
        for (var i = 0; i < len; i++) {
            zero += '0';
        }
        var res=cutZero('0.' + zero + arr[1]);
        var res2=res.replace(/\.{2,}/g,"").replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        return res2;
    }
}
function scientificToNumber(num){
	var str = num;
    var reg = /^(\d|.+)(e)([\-]?\d+)$/;
    var arr, len,
        zero = '';
        
   /*6e7或6e+7 都会自动转换数值*/
    if (!reg.test(str)) {
        return cutZero(num+"");
    } else {
        /*6e-7 需要手动转换*/
        arr = reg.exec(str);
        len = Math.abs(arr[3]) - 1;
        for (var i = 0; i < len; i++) {
            zero += '0';
        }
        
        //现在有小数0.0000000001111111111111  arr[1]的值会为小数，最后出的数为1.1111111所以要去掉arr[1]
        arr[1] = Number(arr[1].toString().replace(".",""));
        var res=cutZero('0.' + zero + arr[1]);
        var res2=res.replace(/\.{2,}/g,"").replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        return res2;
    }
}
function cutZero(old){
    if(old==""||old=="undefined"){
        return "";
    } 
    //拷贝一份 返回去掉零的新串 
    newstr=old;  
    //循环变量 小数部分长度  
    var leng = old.length-old.indexOf(".")-1;
    //判断是否有效数  
    if(old.indexOf(".")>-1){  
        //循环小数部分  
        for(i=leng;i>0;i--){  
                //如果newstr末尾有0  
                if(newstr.lastIndexOf("0")>-1 && newstr.substr(newstr.length-1,1)==0){  
                    var k = newstr.lastIndexOf("0");  
                    //如果小数点后只有一个0 去掉小数点  
                    if(newstr.charAt(k-1)=="."){  
                        return  newstr.substring(0,k-1);  
                    }else{  
                    //否则 去掉一个0  
                        newstr=newstr.substring(0,k);  
                    }  
                }else{  
                //如果末尾没有0  
                    return newstr;  
                }  
            }  
        }  
        return old;  
  }
/*获取手机国际区号数据*/
function getPhontData() {
    $("#phone").attr("regionCode","86");
    var Phone;
    $.getJSON("../../json/phone.json", function (data){
        var itemsData =data;
        //存储数据的变量
        Phone = new Vue({
              el: '#phone',
              methods:{
                  toggle:function(){
                      this.isShow = !this.isShow;
                  },
                  getCountry:function (country,code) {
                      this.selectCountry=country;
                      this.code=code;
                      $("#phone").attr("regionCode",code);
                  }
              },
              data: {
                  isShow:false,
                  selectCountry:"cn",
                  code:"",
                  items: itemsData,
              }
          })
      })
}
/*关闭滚动显示的公告*/
function delNotice() {
    $(".notice-wrap").hide();
}
function checkFloat8(obj) {
      obj.value= obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符     
      obj.value= obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的     
      obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
      obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d).*$/,'$1$2.$3');//保留小数点后8位       
      if(obj.value.indexOf(".")< 0 && obj.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额    
         obj.value= parseFloat(obj.value);    
      }  
}
//得到标准时区的时间的函数
function getLocalTime(i) {
    //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
    if (typeof i !== 'number') return;
    var d = new Date();
    //得到1970年一月一日到现在的秒数
    var len = d.getTime();
    //本地时间与GMT时间的时间偏移差
    var offset = d.getTimezoneOffset() * 60000;
    //得到现在的格林尼治时间
    var utcTime = len + offset;
    var eastEightTime= new Date(utcTime + 3600000 * i);
    var timeString=eastEightTime.toString();
    var a=timeString.indexOf("GMT");
    var b=timeString.substring(0,a);
    b=getFulldateFormate(d);
    return b;
}

//数字四舍五入（保留n位小数）
 function getFloat(number, n) { 
  n = n ? parseInt(n) : 0; 

  if (n <= 0) return Math.floor(number);
  number = Math.floor(number * Math.pow(10, n)) / Math.pow(10, n); 
  if(number === 0){
  	if(n === 2 ){
  		var _W = '';
  		for(var i = 1; i<= n; i++){
  			_W = _W+'0';
  		}
  		number = number+"."+_W;
  	}
  }
  return scientificToNumber(number); 
};

function formatNumber(num,cent,isThousand) {
	num = num.toString().replace(/\$|\,/g,'');
	if(isNaN(num)) num = "0";
	sign = (num == (num = Math.abs(num)));

	num = scientificToNumber(num);
	var zhengshu = parseInt(num);
	var xiaoshu = num.toString().replace(zhengshu+".","");
	var dianLoca = num.toString().indexOf(".");
	var xiaoshu2 = num.toString().substring(dianLoca+1);
	if (num == zhengshu){
		return Number(num);
	}
	if(xiaoshu == xiaoshu2 && xiaoshu.length > 0){
		return scientificToNumber(Number(zhengshu+"."+xiaoshu.substring(0,cent)));
	}else{
		return scientificToNumber(Number(num));
	}	
}
//小数相乘
function decimalNum(bNum,cNum,mathType){
	var num1 = bNum,
		num2 = cNum;
	var bNLen = 0, cNLen = 0,z=1;
	if(bNum != parseInt(bNum) && !isNaN(bNum)){
		bNLen = (bNum.toString().replace(parseInt(bNum)+".","")).length;
		num1 = bNum.toString().replace(".","");
	}
	if(cNum != parseInt(cNum) && !isNaN(cNum)){
		cNLen = (cNum.toString().replace(parseInt(cNum)+".","")).length;
		num2 = cNum.toString().replace(".","");
	}
    if(bNLen > 0  || cNLen > 0){
        var xiaoshuW = bNLen+cNLen;
        z = "1";
        for(var i = 0 ; i<xiaoshuW; i++){
            z = z+"0";
        }
    }
    var resultNum = (Number(num1)*Number(num2))/Number(z);
	return resultNum;
}
//反回顶部
$(window).scroll(function(){  
    if($(window).scrollTop() > 100){
        $(".returnTop").fadeIn().css("display","block");
    }
    else{
        $(".returnTop").fadeOut();
    }
})

$("#footerNav").on('click','.returnTop',function(){
    $("html,body").stop().animate({scrollTop:0},500)
})
        
//底部moadl
$("#footerNav").on('click','.tele',function(){
        $(".footerMoadl").fadeIn();
    })
$("#footerNav").on('click','.footerMoadl .close',function(){
         $(".footerMoadl").fadeOut();
    })

/*
//用法示例：
alert(getFloat(2.085,2));
//得到2.09
*/
