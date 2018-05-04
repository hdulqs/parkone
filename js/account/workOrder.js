var isSubB = false;
var isChectT = [0,0];
var rootUrl = '/wwworder/test/';
function initPage(){
	var initZC = new ZClssApi();
	initZC.init.access_token = $.cookie("access_token");
	var userToken = $.cookie("userToken");
	if(userToken){
		$("#userEmail").val($.cookie("userEmail"));
	}
	
	/*
	*	获取焦点判断是否为
	*
	*/
	$('#userEmail').on("focusin",function(){
		checkEmail(this,8);
	});
	$('#userEmail').on("blur focusout",function(){
		checkEmail(this,1);
	});
	$('#ticketTitle').on("focusin",function(){
		checkTitle(this,8);
	});
	$('#ticketTitle').on("blur focusout",function(){
		checkTitle(this,1);
	});
	$("input").on("keyup",function(){
		checkEmail("#userEmail",2);
		checkTitle("#ticketTitle",2);
		submitStyle();
	})
    $(".btn").on("click",function(){
    	checkEmail($("#userEmail"),1);
		checkTitle($("#ticketTitle"),1);
    	var isSubB = submitStyle();
    	if(isSubB) submitCheckData(initZC.init.access_token);
    });
    //上传图片
    AllImgExt = '.png|.jpg|.jpeg|.pdf|.doc|.docx|.xls|.xlsx|.zip|.rar|';
    $("input[name=file]").change(function () {
		var fileObj = $(this).get(0).files[0];
        if(Number(fileObj["size"]) > 20971520)  
        {  
        	$(this).val("");
            alert($(".uploadSizeError").html());
            return false;
        }
        
		var fileName = fileObj["name"];
        var extName = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
        if(AllImgExt.indexOf(extName+"|")==-1)          
        {
        	$(this).val("");
            alert($(".uploadTypeError").html());
            return false;
        } 	
        var obj = $(this).closest(".upload-file");
        $("#loading,.fff-mask").show();
        var url = 'https://www.sobot.com/ws-open/ticket/customerUploadFile';
        initZC.uploadFile(url,obj,rusultUpload);
    });
    $(".closeUp").click(function(){
        $(".upload-success-box").addClass("dn");
    	$(".upload-success-box p").html("");
    })
}
/*
*	1：为空
* 	2：不为空
* 	8：缺省获取焦点中，不处理不校验
* 	9：正确
*/
function checkEmail(obj,isS){
	var _this = $(obj);
	_this.checkFormat({
		callback : function(result){
			if(result.emptyNbsp && isS == 1){
				_this.formatWarning($(".userEmail-warn span"),{"_k":"data-i18n","_v":"workOrder.warning1"},initLang);
				$(".userEmail-warn").removeClass("opt-dn");
				isChectT[0] = 1;
			}else if(!result.email && isS == 1){
				_this.formatWarning($(".userEmail-warn span"),{"_k":"data-i18n","_v":"workOrder.warning3"},initLang);
				$(".userEmail-warn").removeClass("opt-dn");
				isChectT[0] = 2;
			}else if(isS == 2){
				isChectT[0] = result.length >=1 ? 2:1;
			}else if(isS == 8){
				$(".userEmail-warn span").html("");
				$(".userEmail-warn").addClass("opt-dn");
				isChectT[0] = 8;
			}else{
				$(".userEmail-warn span").html("");
				$(".userEmail-warn").addClass("opt-dn");
				_this.formatWarning($(".userEmail-warn span"),{"_k":"data-i18n","_v":""},false);
				isChectT[0] = 9;
				return true;
			}
			return false;
		}
	});
}
function checkTitle(obj,isS){
	var _this = $(obj);
	_this.checkFormat({
		callback : function(result){
			if(_this.val() == "" && isS == 1){
				_this.formatWarning($(".ticketTitle-warn span"),{"_k":"data-i18n","_v":"workOrder.warning2"},initLang);
				$(".ticketTitle-warn").removeClass("opt-dn");
				isChectT[1] = 1;
			}else if(result.length > 100 && isS == 1){
				_this.formatWarning($(".ticketTitle-warn span"),{"_k":"data-i18n","_v":"workOrder.warning4"},initLang);
				$(".ticketTitle-warn").removeClass("opt-dn");
				isChectT[1] = 2;
			}else if(isS == 2){
				isChectT[1] = result.length >=1 ? 2:1;
			}else if(isS == 8){
				$(".ticketTitle-warn span").html("");
				$(".ticketTitle-warn").addClass("opt-dn");
				isChectT[1] = 8;
			}else{
				$(".ticketTitle-warn span").html("");
				$(".ticketTitle-warn").addClass("opt-dn");
				_this.formatWarning($(".ticketTitle-warn span"),{"_k":"data-i18n","_v":""},false);
				$(".ticketTitle-warn").addClass("opt-dn");
				isChectT[1] = 9;
				return true;
			}
			return false;
		}
	});
}
function submitStyle(){
	if(isChectT[1] == 9 && isChectT[0] == 9){
		//不为空且格式正确
		$(".btn").addClass("btn-active");
		return true;
	}else if((isChectT[1] == 2 || isChectT[1] == 9) && (isChectT[0] == 2 || isChectT[0] == 9)){
		//不为空
		$(".btn").addClass("btn-active");
		return false;
	}else{
		//为空或格式不正确
		$(".btn").removeClass("btn-active");
		return false;
	}
}
function rusultUpload(data){
    $("#loading,.fff-mask").hide();
    var codeV = data.code;
    if(codeV.indexOf("1000") == -1){
    	alert("图片错误");
    	return false;
    }else{   	
		$.each(data,function(k,v){
	        if(v.fileUrl){
	            $("#imgURL").val(v.fileUrl);
	            var _len = v.fileUrl.lastIndexOf("/");
	            $(".upload-success-box p").html(v.fileUrl.substring(_len+1));
	            $(".upload-success-box").removeClass("dn");
	            return ;
	        }
	   });
    }
}

function ZClssApi(){
	$.ajaxSetup({ 
	    async : false 
	});
	this.init = {
		"appId":'4c818ef49ea14d05b90fa1988577c28a',
		"appKey":'F3zY418sjs91HS',
		"serviceEmail": "michelle.liu@lifemenu.cc",
		"access_token": "",
		"fileNumKey":function(randomFlag, min, max){
		    var str = "",
		        range = min,
		        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
		 
		    // 随机产生
		    if(randomFlag){
		        range = Math.round(Math.random() * (max-min)) + min;
		    }
		    for(var i=0; i<range; i++){
		        pos = Math.round(Math.random() * (arr.length-1));
		        str += arr[pos];
		    }
		    return str;
		},
		"createTime":Date.parse(new Date()),
		"expire":24
	}
	//刷新Token
	var t = this.init;
	this.reFreshAccessToken = function(){
		var sign = hex_md5(t.appId+t.appKey+t.createTime)
		var params = 'appId='+t.appId+'&createTime='+t.createTime+'&serviceEmail='+t.serviceEmail+'&expire='+t.expire+'&sign='+sign;
	    $.get('https://www.sobot.com/ws-open/ticket/get_access_token?'+params,function(d){
	        var _d = JSON.parse(d);
	        $.cookie("access_token",_d.data.access_token);
	    });
	}
	this.reFreshAccessToken();
	//上传图片
	this.uploadFile = function(url,obj,callback){
		var fileNK = t.fileNumKey(true,36,36);
		$("#loading,.fff-mask").show();
		obj.ajaxSubmit({
            url: url+'?access_token='+t.access_token+'&fileNumKey='+fileNK, 
            type: "POST", 
            dataType: "json",
            crossDomain: true,
            contentType:"application/json",
            headers: {
                "Accept": "application/json;charset=UTF-8",
            },
            success: function (data) {
            	callback(data);
            },
            error: function (error) {
                $("#loading,.fff-mask").hide();
                return false;
            }
        });
	}
	this.getTicketApi = function (){
	    var where = {};
	    where.action = 'getCusFieldConfigInfoList';
	    where.access_token = t.access_token;
	    where.data = {
	        "openFlag":1,
	        "operateType":3
	    };
	    where.method = 'get';
	    $.ajax({
	    	url: rootUrl+'sobot?url=/ws-open/ticket/ticket_api',
	        type:'POST',
	        data: JSON.stringify(where),
	        crossDomain: true,
	        xhrFields: {  
	            withCredentials: true  
	        },
	        contentType:"application/json; charset=utf-8",
	        success: function(data) {
	        	var _d = $.parseJSON(JSON.parse(JSON.stringify(data)));	        	
	        },
	        error:function(){
	            
	        }
	    });
	}
}

//校验留言信息是否填写
function submitCheckData(access_token){
	var ticketTitle = $("#ticketTitle").val();
    var userEmail = $("#userEmail").val(),
    	userEmailP = $("#userEmail").attr("data-filedId"),
	    ticketContent = $("#ticketContent").val(),
	    fileUrl = $("#imgURL").val(),
	    hashAddress = $("#hashAddress").val(),
	    hashAddressP = $("#hashAddress").attr("data-filedId");
    var selectedType = $("#ticketTypeName option:selected");
    var selectedTypeP = $("#ticketTypeName").attr("data-filedId");
    var where = {
		"action" : "addCustomerTicket",
		"access_token" : access_token,
		"data"  : {
			"companyId":"4c818ef49ea14d05b90fa1988577c28a",
			"ticketTitle":ticketTitle,
			"customerId":"",
			"ticketContent":ticketContent,
			"customerEmail":userEmail,
			"customerPhone":"",
			"soruce":0,
			"ticketStartWay":1,
			"ticketStatus":0,
			"ticketLevel":1,
			"fileStr":fileUrl,
			"extendFields": [
				{
					"id":hashAddressP,
					"value":hashAddress
				},
				{
					"id":selectedTypeP,
					"value":selectedType.val()
				}
			]
		},
		"method":"post"
	};
	$.ajax({
    	url: rootUrl+'sobot?url=/ws-open/ticket/ticket_api',
        type:'POST',
        data: JSON.stringify(where),
        crossDomain: true,
        xhrFields: {  
            withCredentials: true  
        },
        contentType:"application/json; charset=utf-8",
        success: function(data) {
        	if(data.indexOf("true") > 0) {
	        	$("input,textarea").val("");
        		alert($(".success").html());
        		return true;
        	}
        },
        error:function(){
        }
    });
}