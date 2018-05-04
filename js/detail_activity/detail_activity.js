$(function(){
	$("body").attr("class",deviceId);
	if(isPC == 1){
		$("#headerNav,#footerNav ul,#footerNav .footerMoadl").remove();
		$("#footerNav").attr("id","").fadeIn();
	}else{
		$("#loadingH5").hide();
	}
	$("img[data-pc][data-ms]").each(function(k,v){
		$(this).attr("src",$(this).attr("data-"+deviceId));
	})
	setTimeout(function(){
		$("#loadingH5").hide();
	},3000)
})

// 闪烁箭头
var status = 1;
function run(){
    if (status == 1) {
        $("#go_down1").fadeIn(250);
        $("#go_down2").fadeIn(500);
        status = 0; 
    } else {
        $("#go_down1").fadeOut(750);
        $("#go_down2").fadeOut(1000);
        status = 1; 
    }
}
setInterval(function(){
    run();
},1000);

// 向下移动
$(window).scroll(function () {
    if($(window).scrollTop() > 100){
        $('.triangles').fadeIn(300);
    }else{    
        $('.triangles').fadeOut(300);
    }
});
$('.triangles').click(function(){
    $('html,body').animate({scrollTop: '1300px'}, 800);
}); 

// 雪花
var NUMBER_OF_LEAVES = 50;
function init(){
    var container = document.getElementById('leafContainer');  
    var container2 = document.getElementById('leafContainer2');  
    for (var i = 0; i < NUMBER_OF_LEAVES; i++) {

        container.appendChild(createALeaf());
        container2.appendChild(createALeaf());

    }

}
function randomInteger(low, high){

    return low + Math.floor(Math.random() * (high - low));

}



 

function randomFloat(low, high){

    return low + Math.random() * (high - low);

}



 

function pixelValue(value){

    return value + 'px';

}

 

function durationValue(value){

    return value + 's';

}

	 

function createALeaf(){
    var leafDiv = document.createElement('div');

    var image = document.createElement('img');

    image.src ='../../images/'+'snow' + randomInteger(1, 10) + '_gjx.png';

    leafDiv.style.top = "-10px";

    leafDiv.style.left = pixelValue(randomInteger(0, 1000));

    var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';


    leafDiv.style.webkitAnimationName = 'fade, drop';

    image.style.webkitAnimationName = spinAnimationName;

    var fadeAndDropDuration = durationValue(randomFloat(5, 11));

    var spinDuration = durationValue(randomFloat(4, 8));

    leafDiv.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

    var leafDelay = durationValue(randomFloat(0, 5));

    leafDiv.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;

    image.style.webkitAnimationDuration = spinDuration;

    leafDiv.appendChild(image);
 
    return leafDiv;

}
window.addEventListener('load', init);
$("body").on("click","#GetBTCSms",function(){
        console.log(this);
        time(this);
        callServieOther("getBindMobile","/api/user/nologin/send-mobile-regcode",{
            mobile:$("#mail1").val(),
            regionCode: "86"
        });
})

$("body").on("click","#GetETHSms",function(){
        time1(this);
        console.log(this);
        callServieOther("getBindMobile","/api/user/nologin/send-mobile-regcode",{
            mobile:$("#mail11").val(),
            regionCode: "86"
        });
})


function getBindMobileCallBack(r) {
    if(r.success){
		return true;
    }else{
        alert(r.error.detail);
        return false;
    }
}

var wait=60;
function time(o) {
    if (wait == 0) {
        o.style.color="#fff";
        o.style.backgroundColor="#13b2b1";
        o.removeAttribute("disabled");
        var lang=$.cookie('newlang');
        if(typeof(lang)=="undefined"||lang=="en"){
            o.value="Send Again";
        }else if(lang=="tcn"){
            o.value="再次獲取";
        }else if(lang=="scn") {
            o.value="再次获取";
        }
        wait=60;
    } else {
        o.style.color="#021035";
        o.style.backgroundColor="#ccc";
        o.setAttribute("disabled", true);
        o.value=wait+"S";
        wait--;
        setTimeout(function() {
            time(o)
        },
        1000)
    }

}
var wait1=60;
function time1(o) {
    if (wait1 == 0) {
        o.style.color="#fff";
        o.style.backgroundColor="#13b2b1";
        o.removeAttribute("disabled");
        var lang=$.cookie('newlang');
        if(typeof(lang)=="undefined"||lang=="en"){
            o.value="Send Again";
        }else if(lang=="tcn"){
            o.value="再次獲取";
        }else if(lang=="scn") {
            o.value="再次获取";
        }
        wait1=60;
    } else {
        o.style.color="#021035";
        o.style.backgroundColor="#ccc";
        o.setAttribute("disabled", true);
        o.value=wait1+"S";
        wait1--;
        setTimeout(function() {
            time1(o)
        },
        1000)
    }

}


