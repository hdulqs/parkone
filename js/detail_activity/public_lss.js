// 刷新图片
var phoneWidth = parseInt(window.screen.width);
var phoneScale = phoneWidth/750;
var ua = navigator.userAgent;
if (/Android (\d+\.\d+)/.test(ua)){
	var version = parseFloat(RegExp.$1);
	if(version>2.3){
		document.write('<meta name="viewport" content="width=750, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+'" target-densitydpi="device-dpi">');
	}else{
		document.write('<meta name="viewport" content="width=750" target-densitydpi="device-dpi">');
	}
} else {
	document.write('<meta name="viewport" content="width=750, user-scalable=no" target-densitydpi="device-dpi">');
}
var browserRedirect = function(isLoad) {
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
		$("body").attr("class","ms");
		$("#loadingH5").fadeIn();
	    return 0;
	} else {
		$("#loadingH5").fadeOut();
		$("body").attr("class","pc");
		return 1;
	}
}
var isPC = browserRedirect(0);

// index.js中的图片处理
var deviceId = "pc";
$(function(){
	if(isPC == 1){
		deviceId = "pc";
		$('body,html').animate({scrollTop:0},0);
	}else{
		deviceId = "ms";
		$("#headerNav,#footerNav").remove();
	}
	var divs = document.querySelectorAll('img');
	[].forEach.call(divs, function(div) {
		div.style.color = "red";
	});
	$("img[data-pc][data-ms]").each(function(k,v){
		$(this).attr("src",$(this).attr("data-"+deviceId));
	})
})

function initPage(){
	setTimeout(function(){
		$("#loadingH5").fadeOut();
		$(".opacitys").removeClass('opacitys');
	},3000)
}