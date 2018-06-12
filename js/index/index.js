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

    $('.carousel').carousel({
        interval: 2000
    })

    function swiperBox(){
        /*swper*/
        var ls = TransactionPair.AllNewst['BTC'].length>6
        if(TransactionPair.AllNewst['BTC'].length>2){
            setTimeout(function(){
                initareaChart()
            },2000)
        }
        // if(ls){
        //     var swiper = new Swiper('.swiper-container1', {
        //         loop:true,
        //         autoplay : 1000,
        //         autoplayDisableOnInteraction : false,
        //         slidesPerView: 7,
        //         initialSlide:0
        //     })

        //     $('.swiper-container1').mouseenter(function () {
        //        swiper.stopAutoplay();
        //     })
        //     $('.swiper-container1').mouseleave(function () {
        //        swiper.startAutoplay();
        //     })
            
        // }
        // else{
            
        //     $(".swiper-container1 .swiper-wrapper").removeClass("swiper-wrapper")
        //     $(".swiper-container1 .swiper-slide").removeClass("swiper-slide")
        //     $(".swiper-container1").removeClass("swiper-container1")
        // }
    }

    // var mySwiper = new Swiper('.swiper-container2', {
    //     direction: 'horizontal',
    //     loop: true,
    //     speed: 2000,
    //     autoplay: 2000,
    //     //切换效果，淡入淡出
    //     effect : 'fade',
    //     //手动滑动之后自动滑动
    //     autoplayDisableOnInteraction : false,
    //     // 如果需要分页器
    //     pagination: '.swiper-pagination',  
    //     paginationClickable: true,
    //     //如果需要前进后退按钮
    //     nextButton: '.swiper-button-next',
    //     prevButton: '.swiper-button-prev',
    //     // 如果需要滚动条
    //     scrollbar: '.swiper-scrollbar',
    // });


    var timeChartCanvas;//定时器
    var data=[],data1=[],data3=[],data2=[];//X轴数据
    var labels=[],labels1=[],labels2=[],labels3=[];
    for (var n=0;n<100;n++){
        if(n==0){
            data[n]=0
            data1[n]=0
            data2[n]=0
        }else{
            data[n]=getRandom1(70, 80)
            data1[n]=getRandom1(60, 70)
            data2[n]=getRandom1(50, 60)
        }
        labels[n]=n
        labels1[n]=n
        labels2[n]=n
    }
    var areaChartData =[
        {
            labels: labels,
            datasets: [
                {
                    label: "Digital Goods",
                    fillColor: "rgba(66,64,109,0.3)",
                    strokeColor: "rgba(60,141,188,0.8)",
                    pointColor: "#3b8bba",
                    pointStrokeColor: "rgba(60,141,188,1)",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(60,141,188,1)",
                    data: data
                }
            ]
        },
        {
            labels: labels1,
            datasets: [
                {
                    label: "Digital Goods",
                    fillColor: "rgba(66,64,109,0.3)",
                    strokeColor: "rgba(60,141,188,0.8)",
                    pointColor: "#3b8bba",
                    pointStrokeColor: "rgba(60,141,188,1)",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(60,141,188,1)",
                    data: data1
                }
            ]
        },
        {
            labels: labels2,
            datasets: [
                {
                    label: "Digital Goods",
                    fillColor: "rgba(66,64,109,0.3)",
                    strokeColor: "rgba(60,141,188,0.8)",
                    pointColor: "#3b8bba",
                    pointStrokeColor: "rgba(60,141,188,1)",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(60,141,188,1)",
                    data: data2,
                }
            ]
        }
    ] ;
    var areaChartOptions = {
      //Boolean - If we should show the scale at all
      showScale: true,
      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: false,
      //String - Colour of the grid lines
      scaleGridLineColor: "rgba(0,0,0,.05)",
      //Number - Width of the grid lines
      scaleGridLineWidth: 1,
      //Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: false,
      //Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines: false,
      //Boolean - Whether the line is curved between points
      bezierCurve: false,
      //Number - Tension of the bezier curve between points
      bezierCurveTension: 0.3,
      //Boolean - Whether to show a dot for each point
      pointDot: false,
      //Number - Radius of each point dot in pixels
      pointDotRadius: 4,
      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth: 1,
      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius: 20,
      //Boolean - Whether to show a stroke for datasets
      datasetStroke: false,
      //Number - Pixel width of dataset stroke
      datasetStrokeWidth: 2,
      //Boolean - Whether to fill the dataset with a color
      datasetFill: false,
      //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio: true,
      //Boolean - whether to make the chart responsive to window resizing
      responsive: true,
      animation : false, 
      scaleLineWidth:1,
      scaleSteps : 100,
      scaleStartValue : 1,
    };
    //Create the line chart
    
    function initareaChart(){
        var areaChartCanvas = $("#areaChart0").get(0).getContext("2d");
        var areaChartCanvas1 = $("#areaChart1").get(0).getContext("2d");
        var areaChartCanvas2 = $("#areaChart2").get(0).getContext("2d");
        // This will get the first returned node in the jQuery collection.
        var areaChart = new Chart(areaChartCanvas);
        var areaChart1 = new Chart(areaChartCanvas1);
        var areaChart2 = new Chart(areaChartCanvas2);
        areaChart.Line(areaChartData[0],areaChartOptions);
        areaChart1.Line(areaChartData[1], areaChartOptions);
        areaChart2.Line(areaChartData[2], areaChartOptions);
        setTimeout(function(){
            if(timeChartCanvas){
                window.clearTimeout(timeChartCanvas)
            }
            timeChartCanvas=setInterval(function(){
                areaChartData[0].datasets[0].data[99]=getRandom1(70, 80)
                areaChartData[1].datasets[0].data[99]=getRandom1(60, 70)
                areaChartData[2].datasets[0].data[99]=getRandom1(50, 60)
                for(var n=0;n<3;n++){
                    areaChartData[n].datasets[0].data.splice(0,1)
                    areaChartData[n].datasets[0].data[0]=0;
                }
                areaChart.Line(areaChartData[0],areaChartOptions);
                areaChart1.Line(areaChartData[1], areaChartOptions);
                areaChart2.Line(areaChartData[2], areaChartOptions);
            },1000)
        },2000)
    }
    function getRandom1(start, end) {
        var length = end - start;
        var num = parseInt(Math.random() * (length) + start);
        return num;
    }