//用户是否有权限提现
function checkUserRole(){
    callServieOther('checkWithdraw',"/api/user/check-withdraw");
    return false;
}
checkUserRole()
function checkWithdrawCallBack(d){
    if(!d.success) return false;
    //二次验证
    if(d.data.twoValid === 0){
        $(".isC i").addClass("icon-error");
        $(".isC a").attr("href","../personalCenter/personalCenter.html");
    }
    else if(d.data.twoValid===1){
         $(".isC i").addClass("icon-ok");
         $(".isC a").hide();
    }
    //身份认证
    if(d.data.isAuth === 0 || d.data.isAuth === 3){
        $(".twoV i").addClass("icon-error");
        $(".twoV a").attr("href","../personalCenter/authenticationOther.html");
    }
    if(d.data.isAuth===1){
        $(".twoV i").addClass("icon-error");
        $(".twoV a").attr("href","../personalCenter/authenticationProgress.html");
    }
    if(d.data.isAuth===2){
        $(".twoV i").addClass("icon-ok");
        $(".twoV a").hide();
    }
    //资金密码
    if(d.data.payPwd === 0){
        $(".setF i").addClass("icon-error");
        $(".setF a").attr("href","../personalCenter/modifyFundPassword.html");
    }
    else{
        $(".setF i").addClass("icon-ok");
        $(".setF a").hide();
    }
}
