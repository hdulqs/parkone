var helpContent = new Vue({
		el: "#helpContent",
		data:{
			title:"",
			time:"",
			ansData:"",
			quesData:""
		}
});
$(function(){
	readJsonFile(updateQes);
	$("body").on("click","#ul-language li",function(){
		setTimeout(function(){		
			readJsonFile(updateQes);
		},1);
	});
    $("li.yes-box").click(function(){
    	if(!$(this).children("i").hasClass("img-yes-active")){
            $(this).children("i").removeClass("img-yes").addClass("img-yes-active");
            $("li.no-box").children("i").removeClass("img-no-active").addClass("img-no");
		}else{
            $(this).children("i").removeClass("img-yes-active").addClass("img-yes");
		}
	});
    $("li.no-box").click(function(){
        if(!$(this).children("i").hasClass("img-no-active")){
            $(this).children("i").removeClass("img-no").addClass("img-no-active");
            $("li.yes-box").children("i").removeClass("img-yes-active").addClass("img-yes");
        }else{
            $(this).children("i").removeClass("img-no-active").addClass("img-no");
        }
    })
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
	var id = getUrlParam("id");
	var ansId = getUrlParam("ansId");
	var othersId = getUrlParam("othersId");
	console.log(othersId)
	if(!isNaN(othersId)){
		helpContent.title = d["others"]["title"];
	    helpContent.time = d["others"]["time"][othersId];
		helpContent.ansData = d["others"]["ans1"][othersId];
		helpContent.quesData = d["others"]["ques1"][othersId];
	}
	helpContent.title = d["langBodyData"][id-1]["title"];
    helpContent.time = d["langBodyData"][id-1]["time"][ansId];
	helpContent.ansData = d["langBodyData"][id-1]["ans"][ansId];
	helpContent.quesData = d["langBodyData"][id-1]["ques"][ansId];	
	setTimeout(function(){
		resizebody();
	},0)
	
	
}