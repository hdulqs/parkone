$(document).ready(function(){
    var registerMail = $.cookie("checkUserMail");
    if(!registerMail && registerMail == "undefind"){
        window.location.href = "../account/register.html";
    };
    callServieOther("checkActive","/api/user/nologin/check-active",{
        "username":registerMail,
    })
    initLang();
})
//CallBack: 验证用户是否激活
function checkActiveCallBack(d){

    if(d.success){
        window.location.href = "../account/login.html"; 
    }else{
        var token = getUrlParam("token");
        callServieOther("activeUser","/api/user/nologin/active-user",{
            "token":token,
        })
    }
}
//激活用户
function activeUserCallBack(d){
    if(!d.success){
        return false;
    }
    //window.location.href = "../account/sendEmail.html"; 
}





