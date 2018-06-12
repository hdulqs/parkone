var idcl="";
var isCheckGM = false;
var userToken = $.cookie("userToken");
//var tir = {
//	//提币汇率
//	"BTC":[0.05,20,0.002],
//	"ETH":[0.1,200,0.01],
//	"LTC":[0.1,2000,0.03],
//	"SANC":[10,0,3],
//	"OMG":[1,2500,0.3]
//};

if(!userToken && userToken != 'undefined'){               
}else{
    callServieaSync("AssetMsg","/api/account/asset");
}
if(!userToken || userToken == 'undefinde'){
	window.location.href = "../account/login.html";
}
function AssetMsgCallBack(r){}
var assetHAT = new Vue({
	el: "#assetHAT",
	data: {
		isCheckGM:false//提币时校验页面填写是否正确
		,idcl:""
		,RateMoney:Number($.cookie('baserate'+$.cookie("newlang")))>0 ? Number($.cookie('baserate'+$.cookie("newlang"))) : 1
		,tir:{	//提币汇率
			"BTC":[0.05,20,0.001],
			"ETH":[0.1,200,0.003],
			"LTC":[0.1,2000,0.003],
			"KNC":[1,10000,1]
		}
		,msgSuccess: ["",'DepositSuccess','WithdrawalSuccess','loginReward','tradeReward','freeReward']
		,msgSuccessOthers: ['','PendingDeposit','WithdrawalRequest']
		,msgAmount: ['','DepositAmount','WithdrawalAmount','DepositAmount','DepositAmount','DepositAmount']
		,msgAvaliable: ['','AvaliableMoney','AvaliableMoney2','AvaliableMoney','AvaliableMoney','AvaliableMoney']
		,totalDataList:[]
		,assetDataList:[]
		,showCurrencyType:''
		,showCurrencyName:''
		,historyDataList:[]
		,historyShowType:0
		,pageSize:5	//显示条数
        ,showItem:5 //显示页数
        ,totlepage:0 //总条数
        ,currPage:1 //当前页数
        ,show:false
        ,tibiAddressShow:false //提幣地址顯示
        ,tibiInputNumber:'' //用戶提幣數量
        ,tibiInputAddress:"" //用戶提幣輸入地址
        ,tibiInputPoundage:"" //用戶提幣對應匯率
        ,chongbiAddress: {}
        ,tixianAddress: {}
	}
	,created:function (){	
		totalNList();
		asset();
		
		historyList(this);
		getUSDCNYRate();
	}
	,mounted: function (){
	}
	,computed:{
        pages:function(){
        	var pag = [];
            if( this.currPage < this.showItem ){ //如果当前的激活的项 小于要显示的条数
            	//总页数和要显示的条数那个大就显示多少条
            	var i = Math.min(this.showItem,this.totlepage);
            	while(i){
                	pag.unshift(i--);
            	}
            }else{ //当前页数大于显示页数了
				var middle = this.currPage - Math.floor(this.showItem / 2 ),//从哪里开始
			    	i = this.showItem;
				if( middle >  (this.totlepage - this.showItem)  ){
			    	middle = (this.totlepage - this.showItem) + 1
				}
				while(i--){
			    	pag.push( middle++ );
				}
            }
            return pag
        }
    }
	,methods:{
	    assetHistory:function(assetType,index,remark){
	    	console.log(index)
	    	if(assetType == 4){
	    		if(remark == null ||  typeof(remark) == "undefined" || remark == ''){
	    			return assetType+'moren';
	    		}
	    		return assetType+remark;
	    	}

	    	if(assetType == 1 || assetType == 2){
	    		return assetType+"chargingMoney"+index;
	    	}
	    	return assetType+"chargingMoney";

	    },
        goto:function(index){
            if(index == this.currPage) return;
            this.currPage = index;
            historyList(this);
        }
        ,toggleCharge:function(_k){
        	$(".disabled-charge-warning.dischaw"+_k).removeClass("dn");
        }
        ,toggleWithdraw:function(_k){
        	$(".disabled-withdraw-warning.diswitw"+_k).removeClass("dn");
        }
        ,hideCW:function(){
        	$(".disabled-charge-warning,.disabled-withdraw-warning").addClass("dn");
        }
        ,changeHisType:function(index){
        	this.hidtoryListNoData = [];
        	this.totlepage = 0;
        	this.currPage = 1;
        	this.historyShowType = index;
			historyList(this);
        }
        ,copyEcod:function(des){
        	msg($(".aletSuccess").html());
			jsCopy();
			return true
        }
        ,tibiCtrl:function(currencyType,currencyName,k){
        	this.showCurrencyName = currencyName;
        	this.showCurrencyType = currencyType;
        	resetDialog();
			checkUserRole();
			$(".chongti-dialogs").not(".tixian-dialog:eq("+k+")").addClass("dn").removeClass("di").css("display","none");
        	$("#listView .btn").not(".tixian-btns:eq("+k+")").removeClass("btn-active");
        	$(".tixian-dialog").eq(k).addClass("di").removeClass("dn").css("display","block");
        	$(".tixian-btns").eq(k).addClass("btn-active");
        }
        ,delectAddress:function(_id,k){
        	confirm($(".deleteCon").html(),{title:$(".deleteTitle").html(),btn:[$(".deletebtn1").html(),$(".deletebtn2").html()]},deleteAddress,_id)
        	//$(".tixian-dialog.di .add-address-wrap>p").eq(k).attr("data-delete","on");
        	/*layer.confirm($(".deleteCon").html(),{title:$(".deleteTitle").html(),btn:[$(".deletebtn1").html(),$(".deletebtn2").html()]}, function(index){
		        callServieOther("deleteAddress","/api/account/withdraw/deleteAddress",{
					"id": _id
				});
		        layer.close(index);
		    });*/
        }
        ,toogleTibiAddress:function(){
        	this.tibiAddressShow = !this.tibiAddressShow;
        }
        ,copyTibiAddress:function(address){
        	this.tibiInputAddress = address;
        	this.tibiAddressShow = false;
        }
        ,tiBiAll:function(totalNum){
        	this.tibiInputNumber = totalNum;
        }
        ,checkFloat4:function(e){
            checkFloat4(e.currentTarget);
        }
        ,checkFloat8:function(e){
        	checkFloat8(e.currentTarget);
        }
        ,checkFloat6:function(e){
        	checkFloat6(e.currentTarget);
        }
        ,closeTiBiAddressList:function(k){
        	$(this).parent().fadeOut(50);
        }
        ,tibiTriangleDown:function(){
	        var lastaddress=$(".add-address-wrap p").length-1;
	        if($(".active-address").index()==lastaddress){
	            $(".add-address-wrap p").eq(0).addClass("active-address");
	            $(".add-address-wrap p").eq(lastaddress).removeClass("active-address");
	        }else{
	            $(".active-address").next("p").addClass("active-address");
	            $(".active-address:eq(0)").removeClass("active-address");
	        }
        }
        ,tibiTriangleUp:function(){
	        var lastaddress=$(".add-address-wrap p").length-1;
	        if($(".active-address").index()==0){
	            $(".add-address-wrap p").eq(lastaddress).addClass("active-address");
	            $(".active-address:eq(0)").removeClass("active-address");
	        }else{
	            $(".active-address").prev("p").addClass("active-address");
	            $(".active-address:eq(1)").removeClass("active-address");
	        }
        }
        ,tibiSubmitForm:function(){
        	$(".di.tixian-dialog .font-hint").addClass("dn");
			var isC = checkInputVal();
			var submitOk = true;
			var where = {};
			where.currencyType = this.showCurrencyType;
			where.address = this.tibiInputAddress;
			where.remark = $(".di.tixian-dialog .markAddress").val();
			where.amount = $(".di.tixian-dialog .withdrawalAmount").val();
			var theAccount = Number($(".di.tixian-dialog .theAccount").html());
			if(isNaN(theAccount)) theAccount = 0;
			where.password = $(".di.tixian-dialog .input-pwd").val();
			where.currencyName = this.showCurrencyTypeName;

			if(!where.remark){
				$(".di.tixian-dialog .markAddress").focus();
				$(".di.tixian-dialog .fh-warn0").removeClass("dn");
				submitOk = false;
			}
			if(!where.address){
				$(".di.tixian-dialog .withdrawalAddress").focus();
				$(".di.tixian-dialog .fh-warn0").removeClass("dn");
				submitOk = false;
			}
			if(!isC){
				submitOk = false;
			}
			if(!where.currencyType){
				where.currencyType = $(".di.tixian-dialog").parent().find(".btn").attr("data-currencyType");
			}
			if(where.amount <= 0 || Number(theAccount) <= 0){
				$(".di.tixian-dialog .withdrawalAmount").focus();
				submitOk = false;
			}
			if(!where.password){
				$(".di.tixian-dialog .input-pwd").focus();
				$(".di.tixian-dialog .fh-warn2").removeClass("dn");
				submitOk = false;
			}
			if(!submitOk){
				return false;
			}
			isCheckGM = true;
			var twoValid= $.cookie("twoValid");
            var googleStatus=$.cookie("googleStatus");
            var mobileStatus=$.cookie("mobileStatus");
            var lastVerfiyType=$.cookie("lastVerfiyType");
            
            setTimeout(function(){$("#googleValidate .close-m,#twoTypeValidate .close-m,#mobileValidate .close-m").removeClass("dn")},400);
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
                    $("#mobile").addClass("active");
                    $("#mobile").addClass("in");
                } else if (lastVerfiyType == "google" || lastVerfiyType == ""|| lastVerfiyType =="null") {
                    $("#btn-twoTypeValidate").click();
                    $("#myTab li:eq(0)").addClass("active");
                    $("#myTabContent #google").addClass("active");
                    $("#myTabContent #google").addClass("in");
                }
            }
        }
        ,getAddress:function(currencyType,currencyName,k){
        	this.showCurrencyName = currencyName;
        	this.showCurrencyType = currencyType;
        	$(".chongti-dialogs").not(".chongbi-dialog:eq("+k+")").addClass("dn").removeClass("di").css("display","none");
        	$("#listView .btn").not(".chongbi-btns:eq("+k+")").removeClass("btn-active");
        	$(".chongbi-dialog").eq(k).addClass("di").removeClass("dn").css("display","block");
        	$(".chongbi-btns").eq(k).addClass("btn-active");
			if(this.chongbiAddress[currencyName] == "" || this.chongbiAddress[currencyName] == "undefind"){
				getAddressApi(currencyType,currencyName)
			}else{
				var parms = {data: this.chongbiAddress[this.showCurrencyName], success: true};
				getAddressCallBack(parms)
			}
		}
        ,checkKeyup:function(elm,err,others){
        	//'withdrawalAddress','fh-warn0',markAddress
        	if(elm == "withdrawalAddress" || elm == "markAddress"){
        		var _vw = $(".tixian-dialog.di .withdrawalAddress").val();
        		var _vm = $(".tixian-dialog.di .markAddress").val();
	        	if(_vw && _vm) $(".tixian-dialog.di ."+err).addClass("dn");
        	}else{      		
	        	var _v = $(".tixian-dialog.di ."+elm).val();
	        	if(_v) $(".tixian-dialog.di ."+err).addClass("dn");
        	}
        }
    }
});
//获取充币地址
function getAddressApi(currencyType,currencyName){
	callServieOther("getAddress","/api/account/deposit/getAddress",{
		"currencyType":currencyType,
		"currencyName":currencyName
	})
}
function getAddressCallBack(d){
	if(d.success){
		assetHAT.chongbiAddress[assetHAT.showCurrencyName] = d.data;
		$(".di.chongbi-dialog .font-address .chongAddress").html(d.data);
		$(".di.chongbi-dialog .qrcode").empty();
		var qrcode = new QRCode($(".di.chongbi-dialog .qrcode")[0], {
			width : 150,
			height : 150
		});
		qrcode.clear();
		qrcode.makeCode(d.data);
		$(".di.chongbi-dialog .qrcode").css("display","block");
		$(".di.chongbi-dialog .qrcode").hover(function(){
			$(this).find("canvas").show();
		},function(){
			$(this).find("canvas").hide();
		});
		$(".copy-input-box").html("").remove();
		$("body").append('<div class="copy-input-box"><input type="text" id="addressContents" value="'+d.data+'"></div>');
	}
}
//用户是否有权限提现
function checkUserRole(){
	callServieaSync('checkWithdraw',"/api/user/check-withdraw");
	return false;
}
function checkWithdrawCallBack(d){
	if(!d.success) return false;
	if(d.data.twoValid != 1 || d.data.isAuth === 0 || d.data.isAuth === 1 || d.data.payPwd === 0 || d.data.isAuth === 3){
		window.location.href = "withdrawalRequirements.html";
		return false;
	}
	if(d.data.payPwd === 2){
		alertCallBack($(".alertNoRole").html(),function(){
			window.location.reload();
		});
		return false;
	}else{	
		$(".di.chongbi-dialog").removeAttr("style");
		$(".status-checkRole").addClass("btn-active");
		var currencyType = $(".status-checkRole").attr("data-currencytype");
		var currencyName = $(".status-checkRole").attr("data-currencyName");
		var thisWith = $(".status-checkRole").attr("data-with");
		$(".status-checkRole").removeClass("status-checkRole");
		addressList();
		poundage();
		$(".rowWithdrawal"+thisWith).removeClass("dn").addClass("di");	
	}
}
function reloadRefrdsh(){
	window.location.reload();
}
//提币地址列表
function addressList(){
	callServieOther("addressList","/api/account/withdraw/addressList",{
		"currencyType": assetHAT.showCurrencyType
	});
}
function addressListCallBack(d){
	var olds = $(".di.tixian-dialog .add-address-wrap").html();
	assetHAT.tixianAddress= d.data;
	
	if((d.data).length > 0){
		$(".di.tixian-dialog .select-wrap").css("display","block")
	}
}
function deleteAddress(_id){
	callServieOther("deleteAddress","/api/account/withdraw/deleteAddress",{
		"id": _id
	});
}
function deleteAddressCallBack(d){
	if(d.success){
		msg($(".deleteSuccess").html());
		addressList();
	}
	
}
//手续费
function poundage(){
	callServieOther("poundage","/api/account/asset/poundage",{
		"currencyName":assetHAT.showCurrencyName
	})
};
function poundageCallBack(d){
	assetHAT.tibiInputPoundage = d.success ? d.data : assetHAT.tir[assetHAT.showCurrencyName][2];
};

/*获取汇率*/
setInterval(function(){
    getUSDCNYRate();
},1000*60*10)
function changeBaseRate(){
	//预定义切换语言时汇率的数值
	var lans = $.cookie('newlang');
	baseRate = Number($.cookie('baserate'+lans)) > 0 ? Number($.cookie('baserate'+lans)) : 1;
	assetHAT.RateMoney = baseRate;
};
//获取资产总计接口
function totalNList(){
	callServieOther("totalN","/api/account/asset/total");
}
function totalNCallBack(d){
	if(d.success){	
		assetHAT.totalDataList = d.data;
		getUSDCNYRate();
	}
	initLang();
}
//资产管理列表
function historyList(_this){
	callServieOther("history","/api/account/asset/history",{
		"pageNo":_this.currPage
		,"pageSize":_this.pageSize
		,"type":_this.historyShowType
	});
}
function historyCallBack(d){
	if(!d.success) return;
	assetHAT.historyDataList = d.data.list;
	assetHAT.totlepage = d.data.pages;
	setTimeout(function(){ 
		resizebody();
		initLang();
	},3000);
}
//总资产列表
function asset(){
	callServieOther("asset","/api/account/asset")
}
function assetCallBack(d){
	$("#listView").html('');
	var strPin = '';
	if(!d.success) return;
	if(d.data.length > 0){
		assetHAT.assetDataList = d.data;
		$.each(d.data,function(k,v){
			d.data[k].chongAddress = '';
			assetHAT.chongbiAddress[v.currencyName] = '';
		});
	}else{
		$(".no-data-msg1").show();
	}
	setTimeout(function(){ 
		resizebody();
		initLang();
	},0);
}
//提交“提现”
function withdrawCallBack(d){
	if(d.success){
		window.location.reload();
	}else{
		$("#twoTypeValidate").modal('hide');
		$("#mobileValidate").modal('hide');
		$("#googleValidate").modal('hide');
		alert(d.error.detail);
		$(".loading").hide();
		// setTimeout(function(){
		// 	window.location.reload();
		// },3000)
	}
	return false;
}
function jsCopy(){ 
	var e=document.getElementById("addressContents");//对象是contents 
	e.select(); //选择对象 
	document.execCommand("Copy"); //执行浏览器复制命令
} 

//校验提币值
function checkInputVal(){
	var _thisV = Number(assetHAT.tibiInputNumber);
	var allV = $(".di.tixian-dialog .allAmount").html();
		allV = Number(allV);
		if(isNaN(allV)) allV = 0;
	var _baseD = assetHAT.tir[assetHAT.showCurrencyName];
	$(".di.tixian-dialog .fh-warn1 span").html("");
	if(isNaN(_thisV) || _thisV == ""){
		$(".di.tixian-dialog .fh-warn1 i").attr("data-i18n","assetManage.warning11");
		$(".di.tixian-dialog .fh-warn1").removeClass("dn");
		initLang();
		return false;
	}
	if(_thisV === "" && _thisV != "."){
		assetHAT.tibiInputNumber = '';
		$(".di.tixian-dialog .fh-warn1 i").attr("data-i18n","assetManage.warning4");
		$(".di.tixian-dialog .fh-warn1").removeClass("dn");
		initLang();
		return false;
	}else if(_thisV > allV){
		//现有总
		assetHAT.tibiInputNumber = '';
		$(".di.tixian-dialog .fh-warn1 i").attr("data-i18n","assetManage.warning5");
		$(".di.tixian-dialog .fh-warn1").removeClass("dn");
		initLang();
		return false;
	}else if(_thisV > Number(_baseD[1]) && Number(_baseD[1]) > 0){
		//最多提
		assetHAT.tibiInputNumber = '';
		$(".di.tixian-dialog .fh-warn1 i").attr("data-i18n","assetManage.warning7");
		$(".di.tixian-dialog .fh-warn1 span").html(_baseD[1]);
		$(".di.tixian-dialog .fh-warn1").removeClass("dn");
		initLang();
		return false;
	}else if(_thisV < Number(_baseD[0]) || _thisV <= 0){
		//最少提
		$(".di.tixian-dialog .fh-warn1 i").attr("data-i18n","assetManage.warning6");
		if(_baseD[0]==_baseD[2]){
			$(".di.tixian-dialog .fh-warn1 span").html(">"+_baseD[0]);
		}else{
			$(".di.tixian-dialog .fh-warn1 span").html(_baseD[0]);
		}
		
		$(".di.tixian-dialog .fh-warn1").removeClass("dn");
		initLang();
		return false;
	}
	$(".di.tixian-dialog .fh-warn1").addClass("dn");
	return true;
}

//重置输入框
function resetDialog(){
	assetHAT.tibiAddressShow = false;
    assetHAT.tibiInputNumber = '';
    assetHAT.tibiInputAddress = "";
    assetHAT.tibiInputPoundage = "";
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
	$(".loading").show();
  	if(isCheckGM){
    	subTBApi(1,gooleCode);
    }else{
	    callServieGetOther("googleCodeValid","/api/user/google-verify-code",{
	        "code": $("#gooleCode").val()
	    })
    }
 } 
}
/*谷歌验证码校验*/
function googleCodeValid2() {
    var TwoGoogleCode=$("#TwoGoogleCode").val();
    if(TwoGoogleCode==""){
        $(".warning-googlecode").html('<i class="icon-exclamation-circle"></i><i data-i18n="common:twoVerification.cue1">验证码不能为空</i>');
        $(".warning-googlecode").fadeIn(50);
        $(".btn-submit-google").removeClass("btn-active");
        initLang();
    }else {
		loadbgloading();
		$("#loading").show();
    	if(isCheckGM){
    		subTBApi(1,TwoGoogleCode);
    	}else{
    		callServieGetOther("googleCodeValid","/api/user/google-verify-code",{
		        "code": $("#TwoGoogleCode").val()
		    })
    	}
	      
   }
} 

/*手机二次验证码校验*/
function mobileCodeVerify() {
    var mobileCode=$("#mobileCode").val();
    if(mobileCode==""){
          $(".warning-mobilecode").html('<i class="icon-exclamation-circle"></i><i data-i18n="common:twoVerification.cue1"></i>');
          $(".warning-mobilecode").fadeIn(50);
          $(".btn-submit-mobile").removeClass("btn-active");
        initLang();
    }else {
		loadbgloading();
		$("#loading").show();
    	if(isCheckGM){	
    		subTBApi(0,mobileCode);
    	}else{
	    	callServieGetOther("mobileCodeVerify","/api/user/sms-verify-code",{
	            "code": $("#mobileCode").val(),
        	})
	    }
    }    
   
}
/*发送手机二次验证码*/
function sendValidSms(obj) {
	if(isCheckGM){
		callServieGetOther("sendValidSms","/api/user/send-withdraw");
	}else{
	    callServieGetOther("sendValidSms","/api/user/send-second-valid-sms");	
	}
	time(obj);
}
/*手机二次验证码校验*/
function mobileCodeVerify2() {
    var TwoMobileCode=$("#TwoMobileCode").val();
      if(TwoMobileCode==""){
            $(".warning-mobilecode").html('<i class="icon-exclamation-circle"></i><i data-i18n="common:twoVerification.cue1">验证码不能为空</i>');
            $(".warning-mobilecode").fadeIn(50);
            $(".btn-submit-mobile").removeClass("btn-active");
          initLang();
      }else {
		loadbgloading();
		$("#loading").show();
      	if(isCheckGM){
    		subTBApi(0,TwoMobileCode);
    	}else{
	        callServieGetOther("mobileCodeVerify","/api/user/sms-verify-code",{
	            "code": $("#TwoMobileCode").val(),
	        })
        }
     }
   
}
function subTBApi(verifyType,verifyCode){
	var	currencyType = $(".di.tixian-dialog").parent().find(".btn").attr("data-currencyType");
	var	currencyName = $(".di.tixian-dialog").parent().find(".btn").attr("data-currencyName");
	var where = {};
		where.currencyType = currencyType;
		where.address = $(".di.tixian-dialog .withdrawalAddress").val();
		where.remark = $(".di.tixian-dialog .markAddress").val();
		where.amount = $(".di.tixian-dialog .withdrawalAmount").val();
		where.password = $(".di.tixian-dialog .input-pwd").val();
		where.currencyName = currencyName;


		if(!where.remark){
			$(".di.tixian-dialog .markAddress").focus();
			return false;
		}
		if(!where.address){
			$(".di.tixian-dialog .withdrawalAddress").focus();
			return false;
		}
		if(!where.amount && where.amount != 0 ){
			$(".di.tixian-dialog .withdrawalAmount").focus();
			return false;
		}
		if(!where.password){
			$(".di.tixian-dialog .input-pwd").focus();
			return false;
		}
		where.verifyType = verifyType;
		where.verifyCode = verifyCode;
		callServieOther("withdraw","/api/account/withdraw",where);
}
function Trim(str,is_global)
{
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g,"");
    if(is_global.toLowerCase()=="g")
    {
    	result = result.replace(/\s/g,"");
    }
    return result;
}