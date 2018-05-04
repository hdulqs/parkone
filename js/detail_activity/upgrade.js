$(function () {

    var MWidth=1000;

    if(isPC == 1) {
        $('#headerNav').hide();
        $('#footerNav').hide();
        $('body').removeAttr('style');// 解决移动端滑动问题
    }
    if(isPC == 2) {
        $('#moblieNav').hide();
    }

    // 1.首先判断当前是否登录；
    var userToken = deviceType == 1 ? $.cookie("userToken") : localStorage.userToken;
    if (!userToken && userToken != 'undefined') {// 未登录状态

    } else {
        // 去掉立即登录
        $('.loginview').css('display', 'none');
        $('#myrecords').css('opacity', 1);
        $('#recordsView').css('min-height','auto');
        // 显示link连接按钮
        $('.link').show();
        // 去充值按钮
        // $('.disablelink').removeClass('disablelink').addClass('link').attr('href','../asset/assetManage.html');

        // 去交易更换
        $('.linktrading').attr('href','../tradingCenter/trading.html').text('去交易');
        callServie("userInfor","/api/user/user",{});
    }
    // 获取交易排行榜
    fetchTopData();


    $(".lottery-star").rotate({
        bind: {
            click: function () {
                // 判断是否能抽奖
                if ($('#lotteryBtn').attr('src').indexOf('disabledhand.png') > -1) {
                    if(!userToken && userToken != 'undefined'){
                        layer.msg("请登录，再抽奖",{maxWidth:MWidth});
                    }else{
                        layer.msg("您的抽奖次数为0",{maxWidth:MWidth});
                    }
                }else{

                    var UID=sessionStorage.getItem('userName');
                    // var UID = 'C1727800201';
                    $.ajax({
                        url: '/wheelsurf/draw/'+UID,
                        type: "GET",//请求方式为get
                        dataType: "json", //返回数据格式为json
                        success: function (data) {
                            if(data.status==='success'){
                                $('.lottery-star').stopRotate();
                                var angle=60*Math.random();
                                if(data.result.type==='BTC'){
                                    angle=angle+318.97;
                                }else if(data.result.type==='ETH'){
                                    angle=angle+18.97;
                                }else if(data.result.type==='LTC'){
                                    angle=angle+78.97;
                                }else if(data.result.type==='OMG'){
                                    angle=angle+138.97;
                                }else if(data.result.type==='SANC'){
                                    angle=angle+198.97;
                                }else{
                                    angle=angle+258.97;
                                }

                                $(".lottery-star").rotate({
                                    angle: 0,
                                    duration: 5000,
                                    animateTo: angle + 1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
                                    callback: function () {
                                        layer.msg('恭喜您抽到'+data.result.reward + '个' + data.result.type,{maxWidth:MWidth});
                                        refreshData();
                                    }
                                });
                            }
                        }
                    });
                }
            }
        }
    });
    // 图片响应屏幕变化
    if(screen.availWidth<800){
        // $('.backimg').each(function (o,n){
        //     if(n.src.indexOf('/mupgrade/')===-1)n.src=n.src.replace('/images/upgrade/','/images/mupgrade/');
        // });
        $('.backimg').css('display','none');
        $('.mbackimg').css('display','block');
        $('#bannerupgrade').attr('src','/images/mupgrade/banner.png');
        MWidth=screen.availWidth;
    }

    // 滚动显示中奖人
    function roall(lf){
        if(lf===0){
            $("#maincontent").scrollLeft(0);
        }
        var rto=lf+50;
        $("#maincontent").animate({
            "scrollLeft": lf+50
        }, 1000,"linear",function (){
            roall(rto);
        });
    }

    $.ajax({
        url: '/json/road.json',
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) {

            document.getElementById('ul1').innerHTML=data.map(function (o,i){
                return "<li>"+o+"</li>" ;
            }).join('');
            roall(0);

        }
    });


});
function refreshData(){
    fetchTopData();
    fetchMyVolume();
    getMyNum();
    getMyPrizes();
}

/**
 * 获取交易排行榜
 */
function fetchTopData() {
    var coms = document.getElementById('dataTbody');
    coms.innerHTML = '<tr><td colspan="3" style="text-align:center;"><img src="/images/layer-loading-2.gif" style="width:1rem;"/> 正在加载数据...</td></tr>';
    $.ajax({
        url: '/wheelsurf/volume/top10',
        type: "GET",//请求方式为get
        dataType: "json", //返回数据格式为json
        success: function (data) {
            if (data.status === 'success') {
                coms.innerHTML = data.result.map(function (o, i) {
                    return "<tr><td>第" + (i + 1) + "名</td><td>" + o.username + "</td><td>" + Number(o.volume).toFixed(8) + "</td></tr>";
                }).join('');
            } else {
                coms.innerHTML = '<tr><td colspan="3" style="text-align:center;">没有相关的数据</td></tr>';
            }
        }
    });
}

/**
 * 获取我的交易量
 */
function fetchMyVolume() {
    var UID=sessionStorage.getItem('userName');
    // var UID = 'C1727800201';
    if (UID) {
        $.ajax({
            url: '/wheelsurf/volume/' + UID,
            type: "GET",
            dataType: "json",
            success: function (data) {
                // 如果抽奖次数大于0
                if (data.status === 'success') {
                    $('#myVolume').text(data.result + 'BTC');
                }
            }
        });
    }
}

/**
 * 获取我的抽奖次数
 */
function getMyNum() {
    var UID=sessionStorage.getItem('userName');
    // var UID = 'C1727800201';
    if (UID) {
        $.ajax({
            url: '/wheelsurf/chance/left/' + UID,
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (data.result === 2 || data.result >2) {
                    $('#lotteryBtn').attr('src', '/images/hand.png');
                }else if (data.result===1){
                    $('#lotteryBtn').attr('src', '/images/handone.png');
                }else{
                    $('#lotteryBtn').attr('src', '/images/disabledhand.png');
                }
            }
        });
    }
}

/**
 * 获得我的奖品记录
 */
function getMyPrizes() {
    var UID=sessionStorage.getItem('userName');
    // var UID = 'C1727800201';
    var coms = document.getElementById('dataTbodyPrizes');
    coms.innerHTML = '<tr><td colspan="3" style="text-align:center;"><img src="/images/layer-loading-2.gif" style="width:1rem;"/> 正在加载数据...</td></tr>';
    if (UID) {
        $.ajax({
            url: '/wheelsurf/reward/' + UID,
            type: "GET",
            dataType: "json",
            success: function (data) {

                if (data.status === 'success' && data.result.length>0) {
                    coms.innerHTML = data.result.map(function (o, i) {
                        return "<tr><td>" + getCdateFormate(o.create_date)+ "</td><td>幸运大转盘</td><td>" + o.actual_asset + o.coin_name + "</td></tr>";
                    }).join('');
                } else {
                    coms.innerHTML = '<tr><td colspan="3" style="text-align:center;">您还没有获奖记录哦，赶紧去抽奖吧！</td></tr>';
                }
            }
        });
    }
}

function getCdateFormate(str){
    if(!str){
        return;
    }
    var time=new Date(str);
    var year=time.getFullYear();
    var month=time.getMonth()+1;
    var day=time.getDate();
    if(month<10){
        month="0"+month;
    }
    if(day<10){
        day="0"+day;
    }
    return year+"年"+month+"月"+day+"日";
}

function userInforCallBack (d) {
    if (d.success) {
        sessionStorage.setItem('userName',d.data.username);
        //获取抽奖次数
        getMyNum();
        // 获取我的获奖记录
        getMyPrizes();
        // 获取我的交易量
        fetchMyVolume();
    }else{
        sessionStorage.setItem('userName',null);
    }
}
