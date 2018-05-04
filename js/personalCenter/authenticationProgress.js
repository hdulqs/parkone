$(function(){
	var userToken = $.cookie("userToken");
	if(!userToken || userToken == 'undefinde' || userToken == ""){
		window.location.href = "../account/login.html";
		return false;
	}
	callServieOther("identityInfo","/api/user/auth/identityInfo");
})
function identityInfoCallBack(d){
//	/0 未认证 1 审核中 2已认证
	if(d.success){
		if(d.data.status == 0){
			window.location.href="../personalCenter/authenticationOther.html";
			return false;
		}
		var statusCN = ['','waiting','success','fail'];
		var url = ['','../personalCenter/personalCenter.html','','../personalCenter/authenticationOther.html'];

		var xStr = d.data.cardId;
			/*sLen = xStr.length;
		var endStep = sLen,
			beginStep = 0;
			if(sLen > 6){
				endStep = sLen - 2;
				beginStep = 2;
			}
			var xxS = '';
			for(var i=beginStep;i<endStep;i++){
				xxS += '*';
			}
			xStr = xStr.substr(0, beginStep) + xxS + xStr.substr(endStep); */
		$(".result-des span").attr("data-i18n","authenticationProgress."+statusCN[d.data.status]+".des").attr("class",'authentication'+d.data.status);//.html('<img src="../../images/icon-authentication'+d.data.status+'.png" >');
		if(d.data.status === 2){
			var str = '<span data-i18n="authenticationProgress.fieldInfor"></span>'+
					  '<i><span data-i18n="authenticationProgress.fieldUserName"></span>：'+d.data.name+'</i>'+
					  '<i><span data-i18n="authenticationProgress.fieldType"></span>：'+d.data.typeName+'</i>'+
					  '<i class="last-i"><span data-i18n="authenticationProgress.fieldNumber"></span>：'+xStr+'</i>';
			$(".font-info").html(str).removeClass("dn");
		}
		if(d.data.status ==  1){
			var str = '<a href="'+url[d.data.status]+'" target="_self" class="links-node font-again" data-i18n="authenticationProgress.'+statusCN[d.data.status]+'.btnLink"></a>';
			$(".result-des").append(str);
		}
		if(d.data.status == 3){
			var str = '<a href="'+url[d.data.status]+'" target="_self" class="links-node font-again" data-i18n="authenticationProgress.'+statusCN[d.data.status]+'.btnLink"></a>';
			$(".result-des").append(str);
		}
		initLang();
	}else{
		if(d.error.code == 1030) {
			window.location.href="../personalCenter/authenticationOther.html"
		}else{
			window.location.href="../personalCenter/personalCenter.html";
		};
	}
}