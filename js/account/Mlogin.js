var validate="";
var token = "";
var passUrl = [
	"index",
	"resetSucess",
	"verificationSuccessful",
	"modifyLoginPassword",
	"resetPassword",
    "Mregister",
    "activityRegister",
	"authenticationProgress",
	"getBackPassword",
	"sendEmail"
];
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

$("#phonebtn-submit1").on("click",function(){
    if($("#phonePasswordErrorMsg").html()!=""){
        return;
    }
    if(validate==""){
        alert("请滑动验证码到正确位置");
        return;
    }
        callServie("login", '/api/user/nologin/login', {
            username: $("#phoneNumber").val(),
            password: $("#phonePassword").val(),
            captchaId: "ef66943670784abc95366cd936c20f9d",
            validate: validate
        })

})
function loginCallBack(r) {
    if (!r.success) {
        initYunD();
        alert(r.error.detail);   
    } else {
        $.cookie("twoValid", r.data.twoValid, {expires: 30, path: '/'});
        $.cookie("googleStatus", r.data.googleStatus, {expires: 30, path: '/'});
        $.cookie("mobileStatus", r.data.mobileStatus, {expires: 30, path: '/'});
        $.cookie("lastVerfiyType", r.data.lastVerfiyType, {expires: 30, path: '/'});
        sessionStorage.setItem("userid",r.data.id)
        sessionStorage.setItem("userName",r.data.username)
        localStorage.twoValid = r.data.twoValid;
        localStorage.googleStatus = r.data.googleStatus;
        localStorage.mobileStatus = r.data.mobileStatus;
        localStorage.lastVerfiyType = r.data.lastVerfiyType;

        sessionStorage.setItem("haveLogin", true);
        $.cookie("userToken", r.data.token, {expires: 30, path: '/'});
        $.cookie("userEmail", $("#phoneNumber").val(), {expires: 30, path: '/'});
        localStorage.userToken = r.data.token;
        localStorage.userEmail = $("#phoneNumber").val();

        var isJump = true;
        var reffer = document.referrer;
        for(var i = 0; i<=(passUrl.length-1); i++){
            if(reffer.indexOf(passUrl[i]) > -1){
                window.location.href = "../personalCenter/personalCenter.html";
                return false;
            };
            if(i==passUrl.length-1){
                window.location.href = reffer;
                return true;
            }
        }
    }
}
initYunD();