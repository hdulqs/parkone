// 刷新页面返回顶部
setTimeout(function(){window.scrollTo(0,0)},150);

// 向下闪烁
var pic2=document.getElementById('go_down');


// 返回闪烁
var pic = document.getElementById('go_top');  
var status = 1;  
function run()  
{
    if (status == 1) {   
        $("#go_down").fadeIn(800);
        $("#go_top").fadeIn(800);
        status = 0; 
    } else {
        $("#go_down").fadeOut(800);
        $("#go_top").fadeOut(800);
        status = 1; 
    }
}  
setInterval('run()',400);

// 向下移动
$(function () {
	var utm_source = getUrlParam("utm_source");
    sessionStorage.setItem("utm_source",utm_source);
    
    $("body").attr("class",deviceId);
    $(window).scroll(function () {
        if($(window).scrollTop() >= 100){
            $('.arrow_down').fadeIn(300); 
        }else{    
            $('.arrow_down').fadeOut(300);
        }
    });
    $('.arrow_down').click(function(){
    $('html,body').animate({scrollTop: '695px'}, 800);}); 
});

// 返回顶部
$(function(){
    $(window).scroll(function() {      
        if($(window).scrollTop() >= 100){
            $('.goTop_div').fadeIn(300); 
        }else{    
            $('.goTop_div').fadeOut(300);    
        }
    });
    $('.goTop_div').click(function(){
    $('html,body').animate({scrollTop: '0px'}, 800);});
});

// 动态效果
$('.block').smoove({
    offset: '30%'
});

var TransactionPair=new Vue({
    el: "#dynamic_data",
    data: {
        AllNewst: {},
        Rate:{},
        market:"BTC",
        RateMoney:1
    },
    created: function () {
        getTheAllNewestData();
    },
})
function getTheAllNewestData() {
    callServieGetOther("theAllNewest",'/api/market/nologin/all/realtime/index')
}
function theAllNewestCallBack(r){
    if(!r.success){
        return;
    }
    var array=[];
    var st="";
    var ob={};
    var json2=r.data;
    for(var js2 in json2){
        for(var i=0;i<json2[js2].length;i++){
            array.push(json2[js2][i]);
        }
    }
    st=JSON.stringify(array);
    ob=JSON.parse(st);
    TransactionPair.AllNewst=json2//ob;
    swiperBox()
}
setInterval(function(){
    getTheAllNewestData();
},5000)


function changeBaseRate(){
    //预定义切换语言时汇率的数值
    var lans = $.cookie('newlang');
    var baseRate = Number($.cookie('baserate'+lans)) > 0 ? Number($.cookie('baserate'+lans)) : 1;
    TransactionPair.RateMoney = baseRate;
};

/*获取汇率*/
setInterval(function(){
    getExchangeRate();
    getUSDCNYRate();
},1000*60*10)
getExchangeRate();
getUSDCNYRate();
function getExchangeRate(){
    callServie("Rate","/api/account/nologin/asset/exchangeRate");
}

function RateCallBack(r){
    var RateList={
        "ETH":r.data.ethRate,
        "BTC":r.data.btcRate
    };
    TransactionPair.Rate=RateList;
}


$("#indexFooter").on('click','.tele',function(){
        $(".footerMoadl").fadeIn();
    })
$("#footerModal").on('click','.footerMoadl .close',function(){
         $(".footerMoadl").fadeOut();
    })

