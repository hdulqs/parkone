var carouselContent = new Swiper('.carousel-content',{});
var carouselList = new Swiper('.carousel-list',{
    slidesPerView : 3,
  	spaceBetween : 20,
  	touchRatio: 0.2,
  	slideToClickedSlide: true
});
carouselContent.params.control = carouselList;
carouselList.params.control = carouselContent;
//弹出侧边栏
var nd_nav_btn = document.getElementById('J_nav');
var nd_nav  = document.querySelector('.moblie-nav-list');
var nd_wrap = document.getElementById('J_wrap');
var body_scroll = document.getElementById('body_scroll');
nd_nav_btn.onclick = function(){
  	if(nd_nav.className.indexOf('nav-left') < 0){
    	nd_nav.classList.add('nav-left');
    	nd_wrap.classList.add('wrap-left');
  	}
};

// 点击侧面收回抽屉,并且禁止滚动条
$("#J_nav").on("click",function () {
    $("#cover").css("display","block");
    $("html").css({"height":"100%","overflow":"hidden"});
    $("body").css({"height":"100%","overflow":"hidden"});
});
$("#cover").on("click",function () {
    $("#cover").css("display","none");
    $("html").css({"overflow":"scroll","height":"auto"});
    $("body").css({"overflow":"scroll","height":"auto"});
    nd_nav.classList.remove('nav-left');
    nd_wrap.classList.remove('wrap-left');
});


// 动态效果
$('.block').smoove({
    offset: '30%'
});

// 按钮点击变色
// $(".moblie-nav-list ul li").on("click",function () {
//     for (var i = 0; i < li.length; i++) {
//       $(".moblie-nav-list ul li[i]").css("background","red");
//     }
// });

// 点击切换语言弹框
$("#change_language").on('click',function () {
    nd_nav.classList.remove('nav-left');
    nd_wrap.classList.remove('wrap-left');
    $("#J_wrap").addClass("motai");
    $(".change_language").addClass("change_language_show");
});

// 点击退出登录
$(".btn-reserve").on("click",function () {
    nd_nav.classList.remove('nav-left');
    nd_wrap.classList.remove('wrap-left');
    $("#H5_people_img").hide();
    $("#loginBtn,#registerBtn").show();
});


//CallBack: 用户信息




//公共头部 header,尾部
function loadNavA(){
    var ua = navigator.userAgent;
    var isMobile = function(isLoad) {
      var sUserAgent = navigator.userAgent.toLowerCase();
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
      var bIsAndroid = sUserAgent.match(/android/i) == "android";
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
      if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
          return 2;
      }else{
        return 1;
      }
    }
    var deviceType = isMobile(0);

    //当前页面给class="nav"加 active-nav
    var urls11 = window.location.pathname;
    var translation="";
    if(urls11.indexOf(".html")>0){
        translation=urls11.substring(urls11.lastIndexOf("/")).replace("/","").replace(".html","");
    }else{
        translation="index";
    }
    
    if(translation == "personalCenter"){
      $("#"+translation+" #AccountBtn .nav-select").addClass("active-nav");
    }else{
      $("#"+translation).addClass("active-nav");
    }
    
    $(".btn-reserve").click(function(){
        //退出接口
        callServieOther("logout","/api/user/logout/",{});
    });
    

    //是否登录
    var userToken = isMobile() == 1 ? $.cookie("userToken") : localStorage.userToken;
    if(!userToken && userToken != 'undefined'){
        $("#AccountBtn,#orderBtn,#assetBtn,.not_login").hide();
        $("#loginBtn,#registerBtn").css("display","inline-block");
        $("#H5_user_message").html("<a class='user_not_login' href='../account/login.html'>请登录</a>");
        var urls = window.location.pathname;
        if(urls.indexOf("login")>0 || urls.indexOf("register")>0){ 
            $("#loginBtn,#registerBtn").hide();
        }
    }else{
        $("#loginBtn,#registerBtn,#J_login span").hide();
    }
}
loadNavA();

var utm_source = getUrlParam("utm_source");
sessionStorage.setItem("utm_source",utm_source);

// 底部icon
$("#indexFooter").on('click','.tele',function(){
    $(".footerMoadl").fadeIn();
});
$("#footerModal").on('click','.footerMoadl .close',function(){
    $(".footerMoadl").fadeOut();

});


function getUrlParam(name){
    var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
}
