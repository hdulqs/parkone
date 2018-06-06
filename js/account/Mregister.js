var validate="";
var token = "";
function initYunD(){
    /*initNECaptcha({
        captchaId: 'ef66943670784abc95366cd936c20f9d',
        element: '#emailcodeCheck',
        width: 'auto',
        mode: "float",
        onReady: function (instance) {
           
        },
        onVerify: function (err, data) {
            if(data){
                validate = data.validate;
                token = data.token;
            }
        }
    }, function onload (instance) {
    }, function onerror (err) {
    });*/
    initNECaptcha({
        captchaId: 'ef66943670784abc95366cd936c20f9d',
        element: '#phonecodeCheck',
        width: 'auto',
        mode: "float",
        onReady: function (instance) {
           
        },
        onVerify: function (err, data) {
            if(data){
                validate = data.validate;
                token = data.token;
            }
        }
    }, function onload (instance) {
    }, function onerror (err) {
    });
}
$("#Emailebtn-check,#phonebtn-check").click(function () {
    if($(this).hasClass("icon-checkbox-checked")){
        $(this).removeClass("icon-checkbox-checked");
        $(this).addClass("icon-checkbox-unchecked");
    }else{
        $(this).removeClass("icon-checkbox-unchecked");
        $(this).addClass("icon-checkbox-checked");
    }
})
$(".tab span").on("click",function(){
    $(this).addClass("active").siblings().removeClass("active");
    var el=$(this).attr("data-role");
    $(".Zone").hide();
    $("#"+el+"Zone").show();
})
var  wait=60;
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
function getUnbindMobile(obj){
    if($("#phoneNumber").val()==""){
       $(".phoneN").html("手机号不能为空");
    }else{
        $(".phoneN").html("");
        callServieOther("getBindMobile","/api/user/nologin/send-mobile-regcode",{
            mobile:$("#phoneNumber").val(),
            regionCode: $("#phone").attr("regionCode")
        });
        time(obj);
    }
}
function getBindMobileCallBack(r){
    
}
function time(o) {
    if (wait == 0) {
        o.style.color="#13b2b1";
        o.removeAttribute("disabled");
        o.value="再次获取";
        wait=60; 
    } else {
        o.style.color="#999";
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
function callServie(serviceName,urlPath,param,loadParam){
    $.ajax({
        url:urlPath+'?lang=zh_CN',
        type:"post",
        data:JSON.stringify(param),
        crossDomain: true,
        xhrFields: {  
            withCredentials: true  
        },
        beforeSend: function (xhr) {   //beforeSend定义全局变量
            xhr.setRequestHeader("Referer", "http://cointobe.com/account/Mregister.html");
        },
        contentType:"application/json",
        headers: {
              "Accept": "application/json;charset=UTF-8",
        },
        success:function(data){
            return serviceNameCallBack(serviceName,data);
        }
    })
}
function callServieOther(serviceName,urlPath,param,loadParam) {
    var loadParam = loadParam||{};
    var url=urlPath+'?lang=zh_CN';
    var param=param||{};
    $.ajax({
        url: url,
        type: "POST",
        data: param,
        crossDomain: true,
        dataType: "json",
        xhrFields: {  
            withCredentials: true  
        },
        beforeSend: function (xhr) {   //beforeSend定义全局变量
            xhr.setRequestHeader("Referer", "http://cointobe.com/account/Mregister.html");
        },
        success: function (data) {
            return serviceNameCallBack(serviceName, data);
        }
    })
}
function serviceNameCallBack(serviceName,r){
    var fun=eval(serviceName+'CallBack');
    return fun(r);

}
$("#Emailebtn-submit1").on("click",function(){
    if(location.hostname=="www.park.one"){
        alert("即将上线，敬请期待");
        return;
    }
    callServie("register",'/api/user/nologin/register',{
        "username":$("#email").val(),
        "password":$("#Emailpassword").val(),
        "captchaId":token,
        "validate":validate,
        "confirmPwd":$("#EmailSecpassword").val(),
        "inviteCode":""
    });
})
function registerCallBack(r){
    var mail = $("#email").val();
    if(r.success){
        $.cookie("checkUserMail",mail);
        window.location.href = "../account/sendEmail.html";
    }else{
        alert(r.error.detail);
    }
}
$("#phonePassword").on("blur",function(){
    var value=$(this).val();
    var re =/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if(!re.test(value)){
        $("#phonePasswordErrorMsg").html("密码至少8-20个字符，必须包含大写字母和数字");
        return;
    }
    else{
        $("#phonePasswordErrorMsg").html("");
    }
})
$("#code").on("blur",function(){
    if($(this).val()==""){
         $("#codeErrorMsg").html("验证码不能为空");
    }else{
        $("#codeErrorMsg").html("");
    }
})
$("#phonebtn-submit1").on("click",function(){
    if(location.hostname=="www.park.one"){
        alert("即将上线，敬请期待");
        return;
    }
    if($("#phonePasswordErrorMsg").html()!=""||$("#codeErrorMsg").html()!=""){
        return;
    }
    if(validate==""){
        alert("请滑动验证码到正确位置");
        return;
    }
    callServie("register2",'/api/user/nologin/register',{
        "username":$("#phoneNumber").val(),
        "password":$("#phonePassword").val(),
        "captchaId":token,
        "validate":validate,
        "smsCode":$("#code").val(),
        "inviteCode":""
    });
})
function register2CallBack(r){
    if(r.success){
        window.location.href = "../account/login.html";
    }else{
		alert(r.error.detail);
	}
}

getPhontData();
initYunD();