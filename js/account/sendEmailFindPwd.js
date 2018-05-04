var wait=60;
function time(o) {
    $.cookie("checkUserTimeWait",wait);
    if (wait == 0) {
        o.style.color="#13b2b1"
        o.removeAttribute("disabled");
        $("#font-time").hide();
        wait = 60;
    } else {
        o.style.color="#999";
        o.setAttribute("disabled", true);
        $("#font-time").show().text("("+wait+"s)");
        wait--;
        setTimeout(function() {
            time(o)
        },
        1000)
    }
}
var isCheckActive = false;
$(document).ready(function(){
    var registerMail = $.cookie("checkUserMail");
    if(!registerMail || registerMail == "undefind"){
        //window.location.href = goTo(-1);
    };
    var thisWait = $.cookie("checkUserTimeWait");
    if(thisWait>0 && thisWait<60){
        wait = thisWait;
        time(document.getElementById("btn-send"));
    }

    $("#btn-send").click(function(){
        callServieOther("sendActEmail",'/api/user/nologin/resend-forgetpwd-email',{
            "username":registerMail,
            "toUser":registerMail
        });
        time(document.getElementById("btn-send"));        
    });
    $("#registerMail").html(registerMail);

    $("#activeUser").click(function () {
        var uurl = gotoEmail(registerMail);
        if (uurl != "") {
            window.open("http://"+uurl);
        } else {
            var lang = $.cookie('newlang');
            if(typeof(lang)=="undefined" || lang=="en"){
                alert("Sorry, you need to login your email to check the activation link.");
                return false;
            }else if(lang=="scn"){
                alert("抱歉，未找到对应邮箱的登录地址，请自己登录邮箱查看！");
                return false;
            }else if(lang=="tcn"){
                alert("抱歉，未找到對應郵箱的登錄地址，請自己登錄郵箱查看！");
                return false;
            }
        }
    });
});
//CallBack: 再次发送邮件
function sendActEmailCallBack (d){
    if(d.success){
    }else{

    };
}
//功能：根据用户输入的Email跳转到相应的电子邮箱首页
function gotoEmail($mail) {
    $t = $mail.split('@')[1];
    $t = $t.toLowerCase();
    if ($t == '163.com') {
        return 'mail.163.com';
    } else if ($t == 'vip.163.com') {
        return 'vip.163.com';
    } else if ($t == '126.com') {
        return 'mail.126.com';
    } else if ($t == 'qq.com' || $t == 'vip.qq.com' || $t == 'foxmail.com') {
        return 'mail.qq.com';
    } else if ($t == 'gmail.com') {
        return 'mail.google.com';
    } else if ($t == 'sohu.com') {
        return 'mail.sohu.com';
    } else if ($t == 'tom.com') {
        return 'mail.tom.com';
    } else if ($t == 'vip.sina.com') {
        return 'vip.sina.com';
    } else if ($t == 'sina.com.cn' || $t == 'sina.com') {
        return 'mail.sina.com.cn';
    } else if ($t == 'tom.com') {
        return 'mail.tom.com';
    } else if ($t == 'yahoo.com.cn' || $t == 'yahoo.cn') {
        return 'mail.cn.yahoo.com';
    } else if ($t == 'tom.com') {
        return 'mail.tom.com';
    } else if ($t == 'yeah.net') {
        return 'www.yeah.net';
    } else if ($t == '21cn.com') {
        return 'mail.21cn.com';
    } else if ($t == 'hotmail.com') {
        return 'www.hotmail.com';
    } else if ($t == 'sogou.com') {
        return 'mail.sogou.com';
    } else if ($t == '188.com') {
        return 'www.188.com';
    } else if ($t == '139.com') {
        return 'mail.10086.cn';
    } else if ($t == '189.cn') {
        return 'webmail15.189.cn/webmail';
    } else if ($t == 'wo.com.cn') {
        return 'mail.wo.com.cn/smsmail';
    } else if ($t == '139.com') {
        return 'mail.10086.cn';
    } else {
        return '';
    }
}