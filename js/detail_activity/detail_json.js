var ValD = {
	"codeCheck":"validate",
	"codeCheck2":"validate",
	"codeCheck1":"validate2",
	"codeCheck3":"validate2",
	"codeCheck5":"validate",
	"codeCheck6":"validate2"
};

var btc = new Vue({
    el: "#btc-eth",
    data: {
        validate:"",
        validate2:"",
        btcList: {},
        ethList: {},
        step0:true,
        step1:false,
        step2:false,
        step22:false,
        step3:false,
        step00:true,
        step4:false,
        step5:false,
        step52:false,
        step6:false,
        step7:false,
        smsCode:"",
        smsCode1:"",
        BTCAmount:0,
        ETHAmount:0,
        spareMoney:[],
        phone:"",
        phone1:"",
        password:"",
        password2:"",
        left:"",
        right:[]
    },
     methods:{  
        doThis:function(e){
            $(".bgloading").show();
            $(".loading").show();
            var lineTime=new Date("2017/12/06 10:00:00").getTime();
            var nowTime=new Date().getTime();
            if(nowTime>lineTime){
                callServieOther("qiangBTC",'/api/trade/nologin/activity/free/coin/',{
                    coinName:'BTC'
                }) 
            }
           
        },
        soonGet:function(){
            $(".bgloading").show();
            $(".loading").show();
            var username=this.phone;
            var validate=this.validate;
            if(isNaN(username) || username.length != 11){
                alert("手机号码格式不正确!");
                return false;
            }
            if(!username || !validate) return false;
            callServieOther("SoonGet",'/api/user/nologin/v2/check-user',{
                username:username,
                validate:validate
            })
             
        },
        lingBTC:function(){
            $(".bgloading").show();
            $(".loading").show();
            var smsCode=this.smsCode;
            var username=this.phone;
            var validate=this.validate;
            callServie("lingBTC",'/api/user/nologin/register',{
                    smsCode:smsCode,
                    username:username,
                    validate:validate
                })
        },
        lingETH:function(e){
            $(".bgloading").show();
            $(".loading").show();
            var lineTime=new Date("2017/12/06 10:00:00").getTime();
            var nowTime=new Date().getTime();
            if(nowTime>lineTime){
                callServieOther("qiangETH",'/api/trade/nologin/activity/free/coin/',{
                    coinName:'ETH'
                })
            }
			    btc.step00=false;
			    btc.step4=true;
            },
        SOONlingETH:function(){
            $(".bgloading").show();
            $(".loading").show();
            var username=this.phone1;
            var validate=this.validate2;
            if(isNaN(username) || username.length != 11){
                alert("手机号码格式不正确!");
                return false;
            }
            if(!username || !validate) return false;
            callServieOther("SOONlingETH",'/api/user/nologin/v2/check-user',{
                    username:username,
                    validate:validate
              })
        },
        lingETHSe:function(){
            $(".bgloading").show();
            $(".loading").show();
            var smsCode=this.smsCode1;
            var username=this.phone1;
            var validate=this.validate2;
            callServie("lingBTC",'/api/user/nologin/register',{
                    smsCode:smsCode,
                    username:username,
                    validate:validate
                })
        },
        login:function(){
            $(".bgloading").show();
            $(".loading").show();
            var username=this.phone;
            var password=this.password;
            var validate=this.validate;
            callServie("login", '/api/user/nologin/login', {
                username: username,
                password: password,
                captchaId: "ef66943670784abc95366cd936c20f9d",
                validate: validate
            })
        },
        login1:function(){
            $(".bgloading").show();
            $(".loading").show();
            var username=this.phone1;
            var password=this.password2;
            var validate=this.validate2;
            callServie("login1", '/api/user/nologin/login', {
                username: username,
                password: password,
                captchaId: "ef66943670784abc95366cd936c20f9d",
                validate: validate
            })
        }       
    },
    created:function(){
    	//callServieOther("shengyuB",'/api/trade/nologin/activity/free/coin/left');
    	//setInterval(function(){
             //callServieOther("shengyuB",'/api/trade/nologin/activity/free/coin/left')
        //},5000)
        var userToken = $.cookie("userToken");
        if(!userToken || userToken == 'undefined') userToken = localStorage.userToken;
		if(userToken && userToken != 'undefined'){
			getData("getBTC",'/api/account/activity/coin/REGISTER');
	        getData("getETH",'/api/account/activity/coin/FIREST_RECHARGE_TRADE');
	        getData("getALL_TRADE",'/api/account/activity/coin/ALL_TRADE');
		}
		initYunDun("codeCheck");
		initYunDun("codeCheck2");
		initYunDun("codeCheck1");
		initYunDun("codeCheck3");
		initYunDun("codeCheck5");
		initYunDun("codeCheck6");
    }
})
function initPage(){
	var utm_source = getUrlParam("utm_source");
	sessionStorage.setItem("utm_source",utm_source);
}
function initYunDun(_id){
	var _w = 310;
	if(deviceId == "ms"){
		_w = ($("#mail1").width())+35;
	}
	initNECaptcha({
        captchaId: 'ef66943670784abc95366cd936c20f9d',
        element: "#"+_id,
        mode: "float",
        width: _w+"px",
        onReady: function (instance) {
			
        },
        onVerify: function (err, data) {
            if(data){
                btc[ValD[_id]]=data.validate;  
            }
         }
    }, function onload (instance) {
		setTimeout(function(){
			$(".ms .yidun.yidun--light").css("min-width","100%");
			$(".ms .yidun_tips__text").css("font-size","26px");
			$(".ms .yidun_panel").css("bottom","80px");
            $(".ms .yidun_control,.ms .yidun_slide_indicator").css("height","80px");
            $(".ms .yidun_tips").css("line-height","80px");
            $(".ms .yidun_slider").css("width","90px");
		},2)
    }, function onerror (err) {});
}
function qiangBTCCallBack(r){
    $(".bgloading").hide();
    $(".loading").hide();
    if(!r.success){
        alert(r.error.detail);
        return;
    }
   btc.BTCAmount=r.data.BTC_NUM;
   btc.step0=false;
   btc.step1=true;
}
function qiangETHCallBack(r){
    $(".bgloading").hide();
    $(".loading").hide();
    //if(!r.success){
        //alert(r.error.detail);
        //return;
    //}
    btc.ETCAmount=r.data.ETH_NUM;
    btc.step00=false;
    btc.step4=true;
}

function SoonGetCallBack(r){
    $(".bgloading").hide();
    $(".loading").hide();
    if(!r.success){
    	initYunDun("codeCheck");
        if(r.error.code=="1001"){
		    callServieOther("givenBtcCheck",'/api/trade/nologin/activity/given/btc',{
		        phone:btc.phone
		    })
            btc.step22=true;
            btc.step1=false;
        }
        return false;
    }
    $(".grab_BTC .btn-gain").click();
    btc.step2=true;
    btc.step1=false;
}
function givenBtcCheckCallBack(r){
    if(r.success){
        $(".grab_BTC .in_grab_second h3").html('您已领取&nbsp;&nbsp;<span>'+r.data+'</span>&nbsp;&nbsp;BTC');       
        $(".grab_BTC .in_grab_thirdly p").html('您已领取&nbsp;&nbsp;<span>'+r.data+'</span>&nbsp;&nbsp;BTC');
    }
}
function SOONlingETHCallBack(r){
    $(".bgloading").hide();
    $(".loading").hide();
    if(!r.success){
    	initYunDun("codeCheck1");
        if(r.error.code=="1001"){
            btc.step52=true;
            btc.step4=false;
        }
        return;
    }
    $(".get_ETH .btn-gain").click();
    btc.step5=true;
    btc.step4=false;
}

function lingBTCCallBack(r){
    $(".bgloading").hide();
    $(".loading").hide();
    if(!r.success){
    	initYunDun("codeCheck2");
        alert(r.error.detail);
        return;
    }
    $.cookie("twoValid", r.data.twoValid, {expires: 30, path: '/'});
    $.cookie("googleStatus", r.data.googleStatus, {expires: 30, path: '/'});
    $.cookie("mobileStatus", r.data.mobileStatus, {expires: 30, path: '/'});
    $.cookie("lastVerfiyType", r.data.lastVerfiyType, {expires: 30, path: '/'});
    localStorage.twoValid = r.data.twoValid;
    localStorage.googleStatus = r.data.googleStatus;
    localStorage.mobileStatus = r.data.mobileStatus;
    localStorage.lastVerfiyType = r.data.lastVerfiyType;
    $.cookie("userToken", r.data.token, {expires: 30, path: '/'});
    $.cookie("userEmail", $("#mail").val(), {expires: 30, path: '/'});
    localStorage.userToken = r.data.token;
    localStorage.userEmail = $("#mail").val();
    sessionStorage.setItem("haveLogin", true);
    window.location.reload();
    //return true;
    if(deviceType !== 2){
        window.location.reload();
    }else{
        btc.step6=true;
        btc.step3=true;
        btc.step22=false;
        btc.step0=false;
        btc.step00=false;
        btc.step2=false;
        btc.step52=false;
    }
}
function lingETHSeCallBack(r){
    $(".bgloading").hide();
    $(".loading").hide();
    if(!r.success){
        alert(r.error.detail);
        return;
    }
    btc.step6=true;
    btc.step5=false;
}
function loginCallBack(r){
    $(".bgloading").hide();
    $(".loading").hide();
    if(!r.success){
    	initYunDun("codeCheck3");
    	initYunDun("codeCheck5");
        alert(r.error.detail);
        return;
    }
	$.cookie("twoValid", r.data.twoValid, {expires: 30, path: '/'});
    $.cookie("googleStatus", r.data.googleStatus, {expires: 30, path: '/'});
    $.cookie("mobileStatus", r.data.mobileStatus, {expires: 30, path: '/'});
    $.cookie("lastVerfiyType", r.data.lastVerfiyType, {expires: 30, path: '/'});
    localStorage.twoValid = r.data.twoValid;
    localStorage.googleStatus = r.data.googleStatus;
    localStorage.mobileStatus = r.data.mobileStatus;
    localStorage.lastVerfiyType = r.data.lastVerfiyType;
    $.cookie("userToken", r.data.token, {expires: 30, path: '/'});
    $.cookie("userEmail", $("#mail").val(), {expires: 30, path: '/'});
    localStorage.userToken = r.data.token;
    localStorage.userEmail = $("#mail").val();
    sessionStorage.setItem("haveLogin", true);
    window.location.reload();
    //return true;
    if(deviceType !== 2){
        window.location.reload();
    }else{
        btc.step6=true;
        btc.step3=true;
        btc.step22=false;
        btc.step00=false;
        btc.step0=false;
        btc.step2=false;
        btc.step52=false;
    }
}
function login1CallBack(r){
    $(".bgloading").hide();
    $(".loading").hide();
    if(!r.success){
    	initYunDun("codeCheck6");
        alert(r.error.detail);
        return;
    }
    $.cookie("twoValid", r.data.twoValid, {expires: 30, path: '/'});
    $.cookie("googleStatus", r.data.googleStatus, {expires: 30, path: '/'});
    $.cookie("mobileStatus", r.data.mobileStatus, {expires: 30, path: '/'});
    $.cookie("lastVerfiyType", r.data.lastVerfiyType, {expires: 30, path: '/'});
    localStorage.twoValid = r.data.twoValid;
    localStorage.googleStatus = r.data.googleStatus;
    localStorage.mobileStatus = r.data.mobileStatus;
    localStorage.lastVerfiyType = r.data.lastVerfiyType
    $.cookie("userToken", r.data.token, {expires: 30, path: '/'});
    $.cookie("userEmail", $("#mail").val(), {expires: 30, path: '/'});
    localStorage.userToken = r.data.token;
    localStorage.userEmail = $("#mail").val();
    sessionStorage.setItem("haveLogin", true);
    window.location.reload();
    //return true;
    if(deviceType !== 2){
        window.location.reload();
    }else{
        btc.step6=true;
        btc.step3=true;
        btc.step22=false;
        btc.step00=false;
        btc.step0=false;
        btc.step2=false;
        btc.step52=false;
    }
}
callServieGet('btc', '../../json/btc.json')

function btcCallBack(r) {
    btc.btcList = r;
    var num = 0;
    function goLeft() {
        if (num == -37500) {
            num = 0;
        }
        num -= 1;
        $(".roll_list").css({
            left: num
        })
    }

    //设置滚动速度
    var timer = setInterval(goLeft, 20);
    //设置鼠标经过时滚动停止
    $("#btc").hover(function () {
        clearInterval(timer);
    },
    function () {
        timer = setInterval(goLeft, 20);
    })

}
callServieGet('eth', '../../json/eth.json')

function ethCallBack(r) {

    btc.ethList = r;

    var num = 0;

    function goLeft() {
        if (num == -37500) {
            num = 0;
        }
        num -= 1;
        $(".roll_list1").css({
            left: num
        })
    }

    //设置滚动速度
    var timer2 = setInterval(goLeft, 20);
    //设置鼠标经过时滚动停止
    $("#eth").hover(function () {
            clearInterval(timer2);
        },
        function () {
            timer2 = setInterval(goLeft, 20);
        })

}
function getBTCCallBack(r){
    if(!r.success){
        return;
    }
    if(r.data.length <= 0){
    	r.data = [{currency_name: "BTC", actual_asset: 0}];
    }
    $.each(r.data,function(k,v){
    	r.data[k]["actual_asset"] = getFloat(scientificToNumber(v.actual_asset),8);
    })
    if(r.data.length > 0){   	
	    btc.BTCAmount=r.data[0].actual_asset;
	    btc.step0=false;
	    btc.step3=true;
    }
}
function getETHCallBack(r){
    if(!r.success){
        return;
    }
    if(r.data.length <= 0){
    	r.data = [{currency_name: "ETH", actual_asset: 0}];
    }
    $.each(r.data,function(k,v){
    	r.data[k]["actual_asset"] = getFloat(scientificToNumber(v.actual_asset),8);
    })
    btc.ETHAmount=r.data[0].actual_asset;
    btc.step00=false;
    btc.step6=true;
}
function getALL_TRADECallBack(r){
    if(!r.success){
        return;
    }
    if(r.data.length <= 0){
    	r.data = [{currency_name: "BTC", actual_asset: 0}];
    }
    $.each(r.data,function(k,v){
    	r.data[k]["actual_asset"] = getFloat(scientificToNumber(v.actual_asset),8);
    })
    btc.spareMoney=r.data;

    btc.step00=false;
    btc.step6=true;
    btc.step0=false;
    btc.step3=true;
    /*
     {,…}
data
[{currency_name: "BTC", actual_asset: 1.000000001}, {currency_name: "ETH", actual_asset: 1.00000001},…]
{currency_name: "BTC", actual_asset: 1.000000001}
{currency_name: "ETH", actual_asset: 1.00000001}
{currency_name: "LTC", actual_asset: 1.00000001}success:true
     * */
}

function getData(serviceName,url,param){
    var userToken = $.cookie("userToken");
    if(!userToken || userToken == 'undefined') userToken = localStorage.userToken;
    var param=param||{};
    $.ajax({
        url:url,
        type:"post",
        data:param,
        dataType:"json",
        crossDomain: true,
        xhrFields: {  
            withCredentials: true  
        },
         beforeSend: function (request) {
            request.setRequestHeader('token', userToken);
        },
        success:function(data){
            return serviceNameCallBack1(serviceName,data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown){
            var errorCode=XMLHttpRequest.status;
            if(errorCode==401){/*如果返回401,即没登录，没token,则跳登录页面*/
				if(deviceType !== 2){
			        clearAllCookie();
					window.location.reload();
			   }				
            }
        }
    })
}

function serviceNameCallBack1(serviceName,data){
      var fun =serviceName+"CallBack";
      var resfun=eval(fun);
      return resfun(data);
}


function shengyuBCallBack(r){
   if(!r.success){
    return;
   }
   var str=""+r.data;
   var left=str.split(".")[0];
   var right=str.split(".")[1];
   if(right == "undefined" || !right){
   	newArry = ["0",'0','0','0','0','0'];
   }else{
	   var newArry=[];
	   for(var i=0;i<right.length;i++){
	    newArry.push(right[i]);
	   }
	   if(right.length <6){
	    for(var j = 0; j<6-right.length;j++){
	        newArry.push("0");
	    }
	   }
   }
   btc.left=left;
   btc.right=newArry;
}