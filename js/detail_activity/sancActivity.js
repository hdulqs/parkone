var isLogin=false;
var isGain=false;/*由giveSanc.rechargeGiveSanc的值是否为null得到*/
var isOpen=sessionStorage.getItem("isOpen");
var platform;
var bodyWidth=$("body").width();
var lang=$.cookie('newlang');
var isShowed=false;
isShowed=sessionStorage.getItem("isShowed");

$(function(){
    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true
        });
        wow.init();
    };
    browserRedirect();

    $("#part1").height(bodyWidth*610/1920+"px");
    $(".part4 .chart-box table tr:odd").addClass("bg-even");
    $(".part4 .chart-box table tr:even").addClass("bg-odd");
    $(".part5 table tr:even").addClass("bg-even");
    $(".part5 table tr:odd").addClass("bg-odd");

    if(platform==0){ /*判断为pc平台*/
        $("#part6 .rule-box").css("width","41%");
        $("#part6 .font-risk1").css("width","41%");
        $("#part6 .font-risk2").css("width","41%");
        $("#part6 .font-risk3").css("width","41%");
        $("#part1").css({"background":'url("../../images/bg1-s.jpg") no-repeat center',"background-size":"100% 100%"});
        if(lang=="en"){
            $("#part7 .img-cue").css("width","420px");
            $("#img-slogan").css("margin","0 auto 246px auto");
            $("#font-come").hide();
        }else if(lang=="scn"){
            $("#img-slogan").css("margin","0 auto 280px auto");
            $("#part7 .img-cue").css("width","365px;");
        }else{
            $("#img-slogan").css("margin","0 auto 280px auto");
            $("#part7 .img-cue").css("width","710px");
        }
    }else{/*判断为移动平台*/
        $("#headerNav").hide();
        $("#part1").removeAttr("style");
        $("#part6 .rule-box").css("width","76%");
        $("#part6 .font-risk1").css("width","76%");
        $("#part6 .font-risk2").css("width","76%");
        $("#part6 .font-risk3").css("width","76%");
        $("#part1").css({"background":'url("../../images/bg1-sm.jpg") no-repeat center',"background-size":"100% 100%"});
        if(lang=="en"){
            $("#img-slogan").css("margin","0 auto 194px auto");
            $("#part7 .img-cue").css("width","75%");
            $("#font-come").hide();
        }else if(lang=="scn"){
            $("#img-slogan").css("margin","0 auto 217px auto");
            $("#part7 .img-cue").css("width","60%");
        }else{
            $("#img-slogan").css("margin","0 auto 217px auto");
            $("#part7 .img-cue").css("width","95%");
        }
    }

    if($.cookie("userToken")){
        isLogin=true;
    }
    if(isLogin){//已登陆
        callServieaSync("HaveLogingetSanc","/api/trade/activity/give/sanc/status");
        getHistory(1,10);
        if(!isShowed){
            callServieOther("firstLoginStatus","/api/trade/activity/give/sanc/firstLoginStatus");
        }
        var rechargeGiveSanc=sancActivity.giveSanc.rechargeGiveSanc;
        if(!rechargeGiveSanc && typeof(rechargeGiveSanc)!="undefined" && rechargeGiveSanc!=0){
            isGain=false;
        }else{
            isGain=true;
        }

        /*登陆享豪礼*/
        $("#after-login").fadeIn(300);
        $("#btn-login").fadeOut(300);
        /*充值赚更多*/
         if(isGain){
             $("#before-recharge").hide();
             $("#package-box").hide();
             $("#after-recharge").fadeIn(300);
         }else{
             $("#after-recharge").hide();
             $("#before-recharge").hide();
             $("#package-box").fadeIn(300);
         }
        /*我的奖励专区*/
        $("#hint-box").fadeOut(300);
        $("#data-box").fadeIn(300);
    }else{//未登陆
        /*登陆享豪礼*/
        $("#after-login").fadeOut(300);
        $("#btn-login").fadeIn(300);
        /*充值赚更多*/
        $("#before-recharge").fadeOut(300);
        $("#after-recharge").fadeOut(300);
        $("#package-box").fadeIn(300);
        /*我的奖励专区*/
        $("#hint-box").fadeIn(300);
        $("#data-box").fadeOut(300);
    }

    $("body").on("click","#ul-language li",function () {
        var lang=$(this).prop('id');
        if(lang=="en"){
            if(platform==0){/*判断为pc平台*/
                $("#img-slogan").css("margin","0 auto 246px auto");
                $(".img-cue").css("width","420px");
                $("#font-come").hide();
            }else{
                $("#img-slogan").css("margin","0 auto 194px auto");
                $(".img-cue").css("width","75%");
                $("#font-come").hide();
            }
        }else if(lang=="scn"){
            if(platform==0){/*判断为pc平台*/
                $("#img-slogan").css("margin","0 auto 280px auto");
                $(".img-cue").css("width","365px")
                $("#font-come").show();
            }else{
                $("#img-slogan").css("margin","0 auto 217px auto");
                $("#font-come").show();
            }
        }else{
            if(platform==0){/*判断为pc平台*/
                $("#img-slogan").css("margin","0 auto 280px auto");
                $(".img-cue").css("width","710px");
                $("#font-come").show();
            }else{
                $("#img-slogan").css("margin","0 auto 217px auto");
                $("#font-come").show();
            }
    }
    });

    $('#btn-close').click(function(){
        $('#detail-box').fadeOut(300);
        $('#chart-box').fadeIn(300);
    });
    $('#btn-detail').click(function(){
        $('#chart-box').fadeOut(300);
        $('#detail-box').fadeIn(300);
    });
    $('#btn-package').click(function(){
        $('#package-box').fadeOut(20);
        $('#after-recharge').fadeOut(20);
        $('#before-recharge').fadeIn(300);
        sessionStorage.setItem("isOpen",true);
    });

    $('#btn-recharge').click(function(){
        if(isLogin){
            window.location.href="/html/asset/assetManage.html";
            return;
        }
        window.location.href="/html/account/login.html";
    });
})

var sancActivity=new Vue({
    el: "#sancActivity",
    data: {
        giveSanc: {},
        history:[],
        pageSize:10,
        totlepage:0,
        showItem:5,
        currPage:0,
    },
    computed:{
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
    },
    methods:{
        goto:function(index){
            if(index == this.currPage) return;
            this.currPage = index;
            callServieOther("getHistory","/api/trade/activity/give/sanc/history",{
                pageNo:this.currPage,
                pageSize:this.pageSize
            });
        }
    }
})

function HaveLogingetSancCallBack(r){
    if(r.success){
       sancActivity.giveSanc=r.data;
    }
}

function getHistory(pageNo,pageSize) { /!*每次点击分页获取数据*!/
    callServieOther("getHistory","/api/trade/activity/give/sanc/history", {
        pageNo: pageNo,
        pageSize:pageSize,//分页每页显示10条
    });
}

function getHistoryCallBack(r){
    if(r.success){
        sancActivity.history=r.data.list;
        sancActivity.totlepage=r.data.pages;
        initLang();
    }
}

function getDate(time){  /*处理日期*/
    var unixTimestamp = new Date( time ) ;
    Date.prototype.toLocaleString = function() {
        var  min=this.getMinutes();
        var second=this.getSeconds();
        if(min<10){
            min="0"+min;
        }
        if(second<10){
            second="0"+second;
        }
        return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + min + ":" + second;
    };
    commonTime = unixTimestamp.toLocaleString();
    return commonTime;
}

function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) { //判断为移动设备
        return platform=1;
    }else{
        return platform=0;
    }
}

function firstLoginStatusCallBack(r){
    if(r.success){
        firstLoginStatus=r.data;
        if(firstLoginStatus){//首次登陆
            callServieaSync("getSanc","/api/trade/activity/give/sanc/status");
        }
    }
}

function getSancCallBack(r){
    if(r.success){
        giveSanc=r.data.loginGiveSanc;
        $("#gain").html(r.data.loginGiveSanc);
        if(giveSanc > 0) { $("#giveRandomEmpty").addClass("dn");}else{ $("#giveRandomEmpty").removeClass("dn");}
        $("#window-bg").fadeIn(50);
        sessionStorage.setItem("isShowed",true)
    }
}

function closeWindow(obj) {
    $(obj).parent().parent(".window-bg").fadeOut(50);
}

