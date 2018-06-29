/**
 * Created by Cindy on 2017/10/24.
 */
$(function(){
	var userToken = $.cookie("userToken");
	if(!userToken || userToken == 'undefinde'){
		window.location.href = "../account/login.html";
		return false;
	}

    $("body").on("mouseover",".platform-box .list-info",function () {
        $(this).addClass("tr-current");
    });

    $("body").on("mouseleave",".platform-box .list-info",function () {
        $(this).removeClass("tr-current");
    });
})
var app = new Vue({
    el: '#orderBox',
    data: {
        listTrade: {},
        getOrderList: {},  //列表
        curPage:0,
        all: 0, //总页数
        cur: 1,//当前页码,
        pageSize:10,//每页显示条数
        bizType:0,  //对
        status:1 ,//状态 按钮的状态
        selectedIndex1:1,
        show:false,
        // userToken:''
        statusIndex:1 ,//点击按钮对应的索引
        statusIndexClass:'btn-nav',
        statusIndexClassActive:'btn-nav btn-nav-active',
        url:'/api/',
        selectValue:"ETH/BTC",
        showWindow:false,
        showOther:false,
        showAll:true
    },

    watch: {
        cur: function(oldValue , newValue){
            console.log(arguments);
        }
    },
    mounted: function () {

        //获取交易对
        callServieGetOther("listTradePairInfo","/api/trade/nologin/listTradePairInfo")

        // Vue.http.interceptors.push(function(request, next) {
        //     request.headers.set('token', app.userToken); //setting request.headers
        //     next(function(response) {
        //         return response
        //     })
        // })
        //默认加载列表
        callServieOther("getBuySellOrder","/api/trade/getBuySellOrder",{
            pageNo: this.cur,
            pageSize: this.pageSize,
            consignationStatus: 1,
            bizType:this.bizType
        });
        

    },
    methods: {
        selectOnchang: function (it,ind) {
                if(ind==0){
                    ind=''
                }
                this.selectValue=it;
                this.selectedIndex1 = ind;
                this.bizType = this.selectedIndex1;
                if(this.statusIndex!=3){
                    this.setData1(this.selectedIndex1,1)
                }else{
                    this.setDataEnd(1)
                }
        },

        toggle:function(flag){
            var f=flag;
            this.showWindow = !this.showWindow;
            if(f==0){
                this.showAll = true;
                this.showOther = false;
            }else if(f==1){
                this.showAll = false;
                this.showOther = true;
            }
        },

        btnClick: function(data){//页码点击事件
            if(data != this.cur){
                this.cur = data;
                if(this.statusIndex!=3){
                    this.setData(this.status)
                }else{
                    this.setDataEnd()
                }
            }
        },
        pageClick: function(){
            if(this.statusIndex!=3){
                this.setData(this.status)
            }else{
                this.setDataEnd()
            }
        },

        //委托中，已撤销列表
        setData:function(status,cur){
            if(cur){
                this.cur = cur
            }
            // this.statusIndex = this.statusIndex
            this.status = status;
            callServieOther('getBuySellOrderSetData',"/api/trade/getBuySellOrder",{
                pageNo: this.cur,
                pageSize:this.pageSize,
                consignationStatus: status,
                bizType:this.bizType
            })
        },

        //已成交
        setDataEnd:function(cur){

            if(cur){
                this.cur = cur
            }
            this.statusIndex = 3
            callServieOther('listOrderSetDataEnd',"/api/trade/listOrder",{
                pageNo: this.cur,
                pageSize:this.pageSize,
                bizType:this.bizType
            })
        },

        //点击委托中、已撤销按钮
        setData1:function(bizType,cur){
            if(cur){
                this.cur = cur
            }
            this.bizType = bizType
            callServieOther('getBuySellOrderSetData1',"/api/trade/getBuySellOrder",{
                pageNo: this.cur,
                pageSize: this.pageSize,
                consignationStatus: this.status,
                bizType:this.bizType
            })
        },


        //撤单
        revokeOrder:function(orderNo){
            callServieOther('revokeOrder',"/api/trade/revokeOrder",{consignationNo: orderNo})

        }
    },


    computed: {
        //获取cookie
        userToken: function () {
            var name = "userToken=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) != -1) {
                    return c.substring(name.length, c.length);
                }
            }
            // c = c.substring(c.indexOf("=")+1)
            // return c;
        },
        newlang: function () {
            var name = "newlang=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) != -1) {
                    return parmLng[c.substring(name.length, c.length)];
                }
            }
            // c = c.substring(c.indexOf("=")+1)
            // return c;
        },
        indexs: function(){
            var left = 1;
            var right = this.all;
            var ar = [];
            if(this.all>= 5){
                if(this.cur > 3 && this.cur < this.all-2){
                    left = this.cur - 2
                    right = this.cur + 2
                }else{
                    if(this.cur<=3){
                        left = 1
                        right = 5
                    }else{
                        right = this.all
                        left = this.all -4
                    }
                }
            }
            while (left <= right){
                ar.push(left)
                left ++
            }
            return ar
        }

    },
    filters:{
        time:function(value) {
            var date = new Date(value);
            Y = date.getFullYear(),
                m = date.getMonth() + 1,
                d = date.getDate(),
                H = date.getHours(),
                i = date.getMinutes(),
                s = date.getSeconds();
            if (m < 10) {
                m = '0' + m;
            }
            if (d < 10) {
                d = '0' + d;
            }
            if (H < 10) {
                H = '0' + H;
            }
            if (i < 10) {
                i = '0' + i;
            }
            if (s < 10) {
                s = '0' + s;
            }
            var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s;
            return t;
        }
    }

})




function getBuySellOrderCallBack(r){
    if(!r.success){
        alert(r.error.detail);
        return;
    }
    app.getOrderList=r.data.list;
    app.all=r.data.pages;
    if(r.data.list.length>0){
        app.show = false;
    }else{
        app.show = true;
    }
    initLang();
    setTimeout(function(){resizebody();},0);
}

function listTradePairInfoCallBack(r){
    if(!r.success){
        alert(r.error.detail);
        return;
    }
    app.listTrade = r.data;
    initLang();
    setTimeout(function(){resizebody();},0);
}

function getBuySellOrderSetDataCallBack(r){
    if(!r.success){
        alert(r.error.detail);
        return;
    }
    app.getOrderList = r.data.list;
    app.all = r.data.pages;
    if(r.data.list.length>0){
        app.show = false;
    }else{
        app.show = true;
    }
    initLang();
    setTimeout(function(){resizebody();},0);
}

function listOrderSetDataEndCallBack(r){
    if(!r.success){
        alert(r.error.detail);
        return;
    }
    app.getOrderList = r.data.list;
    app.all = r.data.pages
    if(r.data.list.length>0){
        app.show = false;
    }else{
        app.show = true;
    }
    initLang();
    setTimeout(function(){resizebody();},0);
}

function getBuySellOrderSetData1CallBack(r){
    if(!r.success){
        alert(r.error.detail);
        return;
    }
    app.getOrderList = r.data.list;
    app.all = r.data.pages
    if(r.data.list.length>0){
        app.show = false;
    }else{
        app.show = true;
    }
    initLang();
    setTimeout(function(){resizebody();},0);
}

function revokeOrderCallBack(r){
    if(!r.success){
        alert(r.error.detail);
        return;
    }
    var lang=$.cookie('newlang');
    if(typeof(lang)=="undefined"){
        msg("success");
    }else if(lang=="scn"||lang=="tcn"){
        msg("操作成功");
    }else if(lang=="en") {
        msg("success");
    }
    window.setTimeout(function(){
        callServieOther('getBuySellOrderRevoke',"/api/trade/getBuySellOrder",{
            pageNo: app.cur,
            pageSize: app.pageSize,
            consignationStatus: app.statusIndex,
            bizType:app.bizType
        })
    },500)
}

function getBuySellOrderRevokeCallBack(r){
    if(!r.success){
        alert(r.error.detail);
        return;
    }
    app.getOrderList = r.data.list;
    app.all = r.data.pages;
    if(r.data.list.length>0){
        app.show = false;
    }else{
        app.show = true;
    }
    initLang();
    setTimeout(function(){resizebody();},0);
}