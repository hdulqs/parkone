$(function(){
	readJsonFile(updateQes);
	$("#ul-language li a").click(function(){
		setTimeout(function(){		
			readJsonFile(updateQes);
		},1);
	});
});
//读取文案json
function readJsonFile(callback){ 
	var lan = $.cookie('newlang');
	var isR = false;
	var source = "../../locales/"+lan+"/helpCenterDetail.json";
    var xhr = new XMLHttpRequest;  
    xhr.open("GET", source);  
    xhr.onreadystatechange = function() {  
        if (xhr.readyState == XMLHttpRequest.DONE) {  
            var doc = xhr.responseText;
            var json = JSON.parse(doc);
			callback(json);
			return;
        }  
    }  
   xhr.send();  
}
function updateQes(d){
	var langBodyDataA = new Array();
	var langBodyDataB = new Array();
	var others = new Array();
	$.each(d['langBodyData'],function(k,v){
		if(k%2 == 0){
			langBodyDataA.push(v);
		}else{
			langBodyDataB.push(v);
		};
	});
	helpContent.langBodyDataA=langBodyDataA;
	helpContent.langBodyDataB=langBodyDataB;
	helpContent.others =d.others;
	resizebody();
}
var helpContent = new Vue({
		el: "#helpContent",
		data:{
			langBodyDataA:{},
			langBodyDataB:{},
			others:{},
			htmleSpi:"<br>",
			step:1,
		}
	});