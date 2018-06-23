getPhontData();
$(document).ready(function(){
	var userToken = $.cookie("userToken");
	if(!userToken || userToken == 'undefinde'){
		window.location.href = "../account/login.html";
		return false;
	}
	callServieOther("identityInfo","/api/user/auth/identityInfo");
	
	$("input[type=text]").keyup(function(){
		checkInputStatus();
	})
	var lan,obj,initImg;
	var imgSqu = ["jpg","JPG","png","PNG"];
	$("input[name=file]").change(function () {
		var _endLenF = $(this).val().lastIndexOf("\\");
		var fileName = $(this).val().substring(_endLenF+1);
		var _endLenP = fileName.lastIndexOf(".");
		var fileType = fileName.substring(_endLenP+1);
		var fileObj = $(this).get(0).files[0];
		console.log(fileType,fileObj.size);
		if(imgSqu.toString().indexOf(fileType) > -1 && fileObj.size <=5242880){
			var imgF = new Image();

			obj = $(this).closest(".upload-file");
			obj.parent().find(".upload-warning").removeClass("error-msg");
			lan = parmLng[$.cookie('newlang')];
			obj.addClass("uploadFileIng");
			$("#loading,.fff-mask").show();

			obj.ajaxSubmit({
				url: Path+'/api/file/fileUpload?lang='+lan, 
				type: "POST", 
				dataType: "json",
				crossDomain: true,
				headers: {
					"Accept": "application/json;charset=UTF-8",
					'token': userToken,
				},
				success: function (data) {
					initImg = $(".uploadFileIng").attr("data-imgFile");
					$(".uploadFileIng").removeClass("uploadFileIng");
					$("#"+initImg).val(data.data);
					var resurl=data.data;
					$("."+initImg).html('<img width="300" src="'+resurl+'">');
					$("#loading,.fff-mask").hide();
					checkInputStatus();
					initLang();
				},
				error: function (error) {
					alert(data.error.detail);
					$("#loading").hide();
					return false;
				}
			});		
		}else{
			$(this).closest(".upload-file").parent().find(".upload-warning").addClass("error-msg");
			return false;
		}
	});

	$("input[type=radio]").change(function(){
		var _val = $(this).attr("data-val");
		if(_val == "chinaArea"){
			$(".otherArea-item").hide();
			$(".chinaArea-item").show();
			$("#selDriving,#selPassport").removeAttr("checked");
			$("input[name=checkType][value=1]").prop("checked","checked");
			$("#IDnumber").val("");
		}else if(_val == "otherArea"){
			$("#selDriving,#selPassport").removeAttr("checked");
			$(".chinaArea-item").hide();
			$(".otherArea-item").show();
			$("input[name=checkType][value=1]").prop("checked","checked");
			$("#IDnumber").val("");
		}
		changeRadio(".id");
	});

	$(".btn-submit").click(function(){
		var parms = checkInputStatus();
		if(parms) callServie("identityAuth","/api/user/auth/identityAuth",parms);
	})

})
function checkInputStatus(){
	var where = {};
	where.firstName = $("#firstName").val(),
	where.lastName = $("#lastName").val(),
	where.region = $("#country:selected").val(),
	where.cardId = $("#IDnumber").val(),
	where.imgFrontUrl = $("#imgFrontUrl").val(),
	where.imgBehindURL = $("#imgBehindURL").val(),
	where.imgHandheldUrl = $("#imgHandhelpCURL").val(), 
	where.regionType = $("input[name=area]:checked").val(),
	where.sex = $("input[name=sex]:checked").val(),
	where.cardType = $("input[name=checkType]:checked").val();
	var isAir = true;
	if(!where.firstName){
		 isAir = false;
	}
	if(!where.lastName){
		 isAir = false;
	}
	// if(!where.region && where.regionType > 0){

	// 	 isAir = false;
	// }
	if(!where.cardId){
		isAir = false;
	}
	if(!where.imgFrontUrl || !where.imgBehindURL || !where.imgHandheldUrl){
		isAir = false;
	}
	if(isAir){
		$(".btn-submit").addClass("btn-active");
		return where;
	}else{
		$(".btn-submit").removeClass("btn-active");
		return false;
	}
}
function identityAuthCallBack(d){
	if(d.success){
		window.location.href="../personalCenter/authenticationProgress.html";
	}else{
		alert(d.error.detail);
	}
}

function changeRadio(obj) {
    if(!$(obj).hasClass("btn-radio-checked")){
        if($(obj).hasClass("mainland")){
            $("#mainland").click();
            $(".other").removeClass("btn-radio-checked");
            $("#font-passport1").hide();
            $("#font-passport2").hide();
            $("#font-idcard1").show();
            $("#font-idcard2").show();
        }else if($(obj).hasClass("other")){
            $("#other").click();
            $(".mainland").removeClass("btn-radio-checked");
            $("#font-passport1").show();
            $("#font-passport2").show();
            $("#font-idcard1").hide();
            $("#font-idcard2").hide();
        }else if($(obj).hasClass("male")){
            $("#male").click();
            $(".female").removeClass("btn-radio-checked");
		}else if($(obj).hasClass("female")){
            $("#female").click();
            $(".male").removeClass("btn-radio-checked");
        }else if($(obj).hasClass("passport")){
            $("#passport").click();
            $(".id").removeClass("btn-radio-checked");
            $(".driver-license").removeClass("btn-radio-checked");
        }else if($(obj).hasClass("id")){
            $("#id").click();
            $(".passport").removeClass("btn-radio-checked");
            $(".driver-license").removeClass("btn-radio-checked");
        }else if($(obj).hasClass("driver-license")){
            $("#driver-license").click();
            $(".passport").removeClass("btn-radio-checked");
            $(".id").removeClass("btn-radio-checked");
        }
        $(obj).addClass("btn-radio-checked");
    }
}

function identityInfoCallBack(d){
//	/0 未认证 1 审核中 2已认证
	if(d.success){
		if(d.data.status == 1 || d.data.status == 2) window.location.href="authenticationProgress.html"
	}
}
