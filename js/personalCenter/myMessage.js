$(document).ready(function(){
	var userToken = $.cookie("userToken");
	if(!userToken || userToken == 'undefinde'){
		window.location.href = "../account/login.html";
		return false;
	}
	userNews(1,20,0);
	$(".ready-all-message").click(function(){
		callServieOther("ReadAllNews","/api/user/news/read-all",{});
	});
	$(".clear-all-message").click(function(){
		callServieOther("clearNews","/api/user/news/clear",{});
	});
})
function userNews(pageNo,pageSize){
	var where = {"pageNo":pageNo,"pageSize":pageSize};
	callServieOther("news","/api/user/news",where);
}
function newsCallBack(d){
	var strs = '';
	if(d.data.data.list.length > 0){
		$.each(d.data.data.list,function(k,v){
			var pointR = '',
				cTime = getFulldateFormate(v.createtime);
			if(v.is_read != 1 ){
				pointR = '<i class="font-point">.</i>';
			}
			strs += '<div class="list" data-id="'+v.id+'">'+
						'<p class="clearfix"><img src="../../images/icon-msg'+v.type+'.png" class="img-icon">'+pointR+'<span data-i18n="myMessage.titleType'+v.type+'"></span><i class="pull-right font-date">'+cTime+'</i></p>'+
						'<p class="clearfix"><i class="font1">'+v.content+'</i><a class="delete-msg" data-i18n="myMessage.deleteBtn"></a></p>'+
					'</div>';		
		})
		$("#userMessageList").html(strs);
		$("#userMessageList .list,.delete-msg").click(function(){
			var id = $(this).data("id");
			callServieOther("readNews",'/api/user/news/read',{
				"id":id
			});
		})
		if(isNaN(d.data.total)) d.data.total = 0;
		$(".nav-box .font-tip .message-number").html(d.data.no_read);
		var prePages = d.data.prePage;
		var nexPages = d.data.nextPage;
		if(d.data.prePage <1){
			prePages = 1;
		};
		if(d.data.nextPage > d.data.pages || d.data.nextPage === 0){
			nexPages = d.data.pages;
		};
		var pageStr = '<li onClick="userNews('+prePages+','+d.data.pageSize+');"><a><i class="icon-chevron-thin-left"></i></a></li>';
		var activePage;
		for(var i=1;i<=d.data.pages;i++){
			activePage = '';
			if(i == d.data.pageNum){
				activePage = 'class="active"';
			}
			pageStr += '<li onClick="userNews('+i+','+d.data.pageSize+');"><a '+activePage+'>'+i+'</a></li>';
		}
		$("#pages .pagination").html(pageStr+'<li><a href="javascript:userNews('+nexPages+','+d.data.pageSize+');"><i class="icon-chevron-thin-right"></i></a></li>');
	}else{
		$(".no-data-msg").show();
	}
	initLang();
}
function ReadAllNewsCallBack(d){
	window.location.reload();return false;
};
function clearNewsCallBack(d){
	window.location.reload();return false;
};
function readNewsCallBack(d){
	window.location.reload();return false;
};