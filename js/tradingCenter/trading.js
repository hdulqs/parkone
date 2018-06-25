var userToken = $.cookie("userToken");
if (!userToken && userToken != 'undefined') {
} else {
    callServieaSync("AssetMsg", "/api/account/asset");
}

//交易买卖
var buyAndSell = new Vue({
    el: "#buyAndSell",
    data: {
        isLogin: (!userToken && userToken != 'undefined') ? true : false,
        TransactionPair: 1,
        TransactionPairList: {},
        buyAndCoin: "ETH",
        market: "BTC",
        buyPrice: "",//买入价格
        buyVolume: 0,//买入数量
        sellPrice: "",//卖出价格
        sellvolume: 0,//卖出数量
        shijiabuy: "",//市价买入
        shijiasell: "",//市价卖出,
        SellTop10List: [],
        BuyTop10List: [],
        totalM: 0,
        totalS: 0,
        iWidth: 140,
        RateMoney: 1,
        minute: 5,
        availableAmount: 0,
        assetList: {
            "BTC": 0,
            "ETH": 0,
            "LTC": 0,
            "PK":0
        },
        Rate: {},
        newList: {},
        AllNewst: {},
        tradeData: [],
        tradeDataRecent: [],
        showTradeData: false,
        transactionTit: {
            marketBTC: true,
            marketETH: false,
            marketPK: false,
        },
		ChangeMoenyType : '',
        isCNY: true,
        marketCheck: {
            BTC: 0,
            ETH: null
        },
        sell_maxQuantity: false,
        tradeDataKey: "BTC",
        consignationDataList: {},//最新成交  市场
        consignationDataListMy: {},//最新成交  我的
		changeToMarketTrade: true,  //最新成交   市场 默认加载
        changeToMyTrade: false,  //最新成交   我的
		MarketShowNoData: false,  //最新成交   显示暂无数据
		refreshMyTime:0,  //最新成交   我的刷新时间
		refreshMarketTime:0,  //最新成交   市场刷新时间
        recentData: [],//最近浏览
        recent: false,
        consult:{
            buyShow: true,   //盘口卖 显示隐藏
            buyShowMax: false,
            offShow: true,    //盘口买  显示隐藏
            offShowMax: false
        },
        minHeight: true,//盘口买卖高度
        max: 10,  //盘口 显示条数
        currentType: 0,  //当前点击的按钮  1,2,3
        currentFlag: -1,// 默认倒叙
        currentOpen: false, //默认为false，点击时为true
        search: '',//按币种查询
        newIndex:0,
    },
    created: function () {
    	//获取币币交易列表对
        callServie("listCurrencies","/api/trade/nologin/listTradePairInfo",{},{"isLoading":true,"elm":".transaction-box .topo-loading"});
		resizebody();
	},
    mounted: function () {
    	//滑块设置 开始
        var clickInput1 = document.querySelector('.js-check-click1');
        var _this = this;
        initClickInput1 = new Powerange(clickInput1, {
            callback: function () {
                _this.buyVolume = Number(clickInput1.value)
            }, min: 0, max: 100, decimal: true, hideRange: false, decimalStep: 4
        });
        var clickInput2 = document.querySelector('.js-check-click2');
        initClickInput2 = new Powerange(clickInput2, {
            callback: function () {
                _this.sellvolume = clickInput2.value
            }, min: 0, max: 100, decimal: true, hideRange: false, decimalStep: 4
        });
        var clickInput3 = document.querySelector('.js-check-click3');
        initClickInput3 = new Powerange(clickInput3, {
            callback: function () {
                _this.shijiabuy = clickInput3.value
            }, min: 0, max: 100, decimal: true, hideRange: false, decimalStep: 6
        });
        var clickInput4 = document.querySelector('.js-check-click4');
        initClickInput4 = new Powerange(clickInput4, {
            callback: function () {
                _this.shijiasell = clickInput4.value
            }, min: 0, max: 100, decimal: true, hideRange: false, decimalStep: 4
        });
        setTimeout(function () {
            buyAndSell.buyVolume = 0;
            buyAndSell.sellvolume = 0;
            buyAndSell.shijiabuy = 0;
            buyAndSell.shijiasell = 0;
        }, 0)
        //滑块设置 结束
    },
    methods: {
        LastMarket:function(){	//最新成交————市场
            if(this.changeToMarketTrade) return true;
			this.changeToMarketTrade = true;
			this.changeToMyTrade = false;
			this.MarketShowNoData = false;
            this.consignationDataList = {};
            refreshNewTread(true);
        },
        LastMy: function () {	//最新成交————我的
			if(this.changeToMyTrade) return;
            this.changeToMyTrade = true;
			this.changeToMarketTrade= false;
			this.MarketShowNoData = false;
            this.consignationDataListMy = {};
            this.newIndex++;
            var bizType;
            if (!sessionStorage.getItem('sessionInd')) {
                bizType = this.TransactionPair
            } else {
                bizType = sessionStorage.getItem('sessionInd')
            }
			callServieOther('listOrderSetDataEnd', "/api/trade/listOrder", {
				pageNo: 1,
				pageSize: 50,
				bizType: bizType  //已成交
			},{"isLoading":true,"elm":".new-trades .topo-loading"})
        },
        compareAsce: function (property) {	//升序
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        },
        compareDesc: function (property) {	//降序
            return function (b, a) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        },
        comparePairAsce: function (property) {	//字母排序
            return function (b, a) {
                var value1 = a[property];
                var value2 = b[property];
                return value1.charAt(0).localeCompare(value2.charAt(0))
            }
        },
        comparePairDeac: function (property) {	//字母排序
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1.charAt(0).localeCompare(value2.charAt(0))
            }
        },
        pairSort: function () {	//市场————币种 排序
            if (this.currentType != 1) {
                this.currentOpen = false;  //第一次点击时变为false
                this.currentType = 1;//按钮
            }
            if (this.transactionTit['recent']) {
                if (this.currentOpen) {
                    this.tradeDataRecent.sort(this.comparePairAsce('pair'));
                } else {
                    this.tradeDataRecent.sort(this.comparePairDeac('pair'))
                }
            } else {
                if (this.currentOpen) {
                    this.tradeData[this.tradeDataKey].sort(this.comparePairAsce('pair'));
                } else {
                    this.tradeData[this.tradeDataKey].sort(this.comparePairDeac('pair'))
                }
            }

            this.currentOpen = !this.currentOpen;
        },
        lastprice: function () { //市场————最新价  排序
            if (this.currentType != 2) {
                this.currentOpen = false;  //第一次点击时变为false
                this.currentType = 2; //按钮
            }
            if (this.transactionTit['recent']) {
                if (this.currentOpen) {
                    this.tradeDataRecent.sort(this.compareAsce('new'));
                } else {
                    this.tradeDataRecent.sort(this.compareDesc('new'));
                }
            } else {
                if (this.currentOpen) {
                    this.tradeData[this.tradeDataKey].sort(this.compareAsce('new'));
                } else {
                    this.tradeData[this.tradeDataKey].sort(this.compareDesc('new'));
                }
            }

            this.currentOpen = !this.currentOpen;
        },
        hSort: function () { //市场————24h涨跌
            if (this.currentType != 3) {
                this.currentOpen = false;  //第一次点击时变为false
                this.currentType = 3; //按钮
            }
            if (this.transactionTit['recent']) {
                if (this.currentOpen) {
                    this.tradeDataRecent.sort(this.compareAsce('increase'));
                } else {
                    this.tradeDataRecent.sort(this.compareDesc('increase'));
                }
            } else {
                if (this.currentOpen) {
                    this.tradeData[this.tradeDataKey].sort(this.compareAsce('increase'));
                } else {
                    this.tradeData[this.tradeDataKey].sort(this.compareDesc('increase'));
                }
            }

            this.currentOpen = !this.currentOpen;
        },
		logCNYChange: function (){
			this.ChangeMoenyType;
		},
        consultInit: function () {	//盘口  切换成买卖
            this.max = 10;
            getBuyAndSellDataList(true);
			$(".pankou-info .pankou-buy,.pankou-info .pankou-sell").removeClass("hide-on").removeClass("hide-off");
			this.consult = {
                buyShow : true,
                offShow :true,
                buyShowMax : false,
                offShowMax :false
            }
        },
        consultBuy: function () {	//盘口 切换成买
            this.max = 20;
            getBuyDataList(true);	//盘口买数据
			$(".pankou-info .pankou-buy").removeClass("hide-on").addClass("hide-off");
			$(".pankou-info .pankou-sell").addClass("hide-on");
			this.consult = {
                buyShow : false,
                offShow :false,
                buyShowMax : false,
                offShowMax :true
            }
        },
        consultOfftake: function () {	//盘口 切换成卖
            this.max = 20;
            getSellDataList(true);	//盘口卖数据
			$(".pankou-info .pankou-sell").removeClass("hide-on").addClass("hide-off");
			$(".pankou-info .pankou-buy").addClass("hide-on");
			this.consult = {
                buyShow : false,
                offShow :false,
                buyShowMax : true,
                offShowMax :false
            }
        },
        recentBrowse: function () { //市场————最近浏览  开始
            this.recent = true
            this.transactionTit = {
                marketBTC: false,
                marketETH: false,
                marketLTC: false,
                marketPK: false,
                recent: true,
            }
            this.tradeDataRecent = JSON.parse(sessionStorage.getItem("recentBrowse"));
        },
        marketCheckout: function (B) {
            this.recent = false
            this.transactionTit = {
                marketBTC: false,
                marketETH: false,
                marketLTC: false,
                marketPK: false
            }
            this.transactionTit[B] = true;
            sessionStorage.setItem("sessionTit", B);
        },
        marketActive: function (B) {
            this.tradeDataKey = B;
			listOrderLog.tradeDataKey = B;
			consignationList.tradeDataKey = B;
            sessionStorage.setItem("sessionCont", B)
        },

        //市场————添加最近浏览
        addRecentBrowse: function (pair, news, increase, key) {
            this.recentData = this.recentData.filter(function (item) {
                return item.pair !== pair;
            })
            this.recentData.unshift({pair: pair, new: news, increase: increase, key: key});
            sessionStorage.setItem("recentBrowse", JSON.stringify(this.recentData));
        },
        TransactionPairFun: function (pair, ind) {	//市场————切换交易对
			if(typeof(ind) == "undefined"){
				ind = this.TransactionPair;
			}
			if(typeof(pair) == "undefined"){
				pair = this.buyAndCoin+'/'+this.market;
			}
            sessionStorage.setItem("sessionPair", pair);
            sessionStorage.setItem("sessionInd", ind);
            this.TransactionPair = ind;
            this.buyAndCoin = pair.split("/")[0];
            this.market = pair.split("/")[1];
            //获取当前交易对最新价格
            getNewst();
			this.changeToMarketTrade = false;
			this.MarketShowNoData = false;
			this.LastMarket();	//最新成交————市场
            getBuyAndSellDataList(true);
            this.BuyTop10List={};
            this.SellTop10List={};
            this.assetList[this.buyAndCoin] = isNaN(this.assetList[this.buyAndCoin]) ? 0 : this.assetList[this.buyAndCoin];
            $("#kline").html("");
            refreshElement();
            setTimeout(function () {
                first = true;
                newArray = [];
                kline.draw();
				setKlineWidths();
                var NewD = $("#buyAndSell .newList-box .font-pair").html();
                kline.setSymbol(NewD, NewD);
                if ($.cookie('newlang')== 'scn') {
                    chart_switch_language('zh-cn');
                } else if ($.cookie('newlang') == 'en') {
                    chart_switch_language('en-us');
                } else if ($.cookie('newlang')== 'tcn') {
                    chart_switch_language('zh-tw');
                }
            },0)
            
        },
        FixedPriceBuyCoin: function () {//限价买入
            var lang = $.cookie('newlang');
            var bizType = this.TransactionPair;
            var consignationPrice = this.buyPrice;
            var consignationCount = this.buyVolume;
            var isCheckTrue = true;
            if (consignationPrice.length <= 0) {
                TransactionAlert('emptyPrice', '.xianjia-buy .inputprice-wrap');
                //"请输入价格"
                isCheckTrue = false;
            }
            if (consignationCount.length <= 0) {
                TransactionAlert('emptyNumber', '.xianjia-buy .inputnum-wrap');
                //"请输入数量"
                isCheckTrue = false;
            }
            if (isNaN(consignationPrice) || consignationPrice == 0) {
                TransactionAlert('notPrice', '.xianjia-buy .inputprice-wrap');
                //"请输入正确的价格"
                isCheckTrue = false;
            }
            if (isNaN(consignationCount) || consignationCount == 0) {
                TransactionAlert('notNumber', '.xianjia-buy .inputnum-wrap');
                //"请输入正确的数字"
                isCheckTrue = false;
            }
            //Insufficient Balance
            if (consignationPrice * consignationCount > this.assetList[this.market]) {
                TransactionAlert('inBalace', '.xianjia-buy .dealnum-wrap');
                //"余额不足"
                isCheckTrue = false;
            }
            //
            if (consignationPrice * consignationCount < 0.000005) {
                TransactionAlert('beLess', '.xianjia-buy .dealnum-wrap');
                //"交易额最小不能低于0.000005"
                isCheckTrue = false;
            }
            if (!isCheckTrue) return;
            $(".bgloading").show();
            $(".loading").show();
            callServieOther("limitPriceBuyConsignation", "/api/trade/limitPriceBuyConsignation", {
                bizType: bizType,
                consignationPrice: consignationPrice,
                consignationCount: consignationCount
            },{"isLoading":true,"elm":"#check-price .topo-loading"})
        },
        FixedPriceSellCoin: function () {//限价卖出
            var lang = $.cookie('newlang');
            var bizType = this.TransactionPair;
            var consignationPrice = this.sellPrice;
            var consignationCount = this.sellvolume;
            var isCheckTrue = true;
            if (consignationPrice.length <= 0) {
                TransactionAlert('emptyPrice', '.xianjia-sell .inputprice-wrap');
                //"请输入价格"
                isCheckTrue = false;
            }
            if (consignationCount.length <= 0) {
                TransactionAlert('emptyNumber', '.xianjia-sell .inputnum-wrap');
                //"请输入数量"
                isCheckTrue = false;
            }
            if (isNaN(consignationPrice) || consignationPrice == 0) {
                TransactionAlert('notPrice', '.xianjia-sell .inputprice-wrap');
                //"请输入正确的价格"
                isCheckTrue = false;
            }
            if (isNaN(consignationCount) || consignationCount == 0) {
                TransactionAlert('notNumber', '.xianjia-sell .inputnum-wrap');
                //"请输入正确的数字"
                isCheckTrue = false;
            }
            //Insufficient Balance
            if (consignationCount > this.assetList[this.buyAndCoin]) {
                TransactionAlert('inBalace', '.xianjia-sell .dealnum-wrap');
                //"余额不足"
                isCheckTrue = false;
            }
            //
            if (consignationPrice * consignationCount < 0.000005) {
                TransactionAlert('beLess', '.xianjia-sell .dealnum-wrap');
                //"交易额最小不能低于0.000005"
                isCheckTrue = false;
            }
            if (!isCheckTrue) return;

            $(".bgloading").show();
            $(".loading").show();
            callServieOther("limitPriceSellConsignation", "/api/trade/limitPriceSellConsignation", {
                bizType: bizType,
                consignationPrice: consignationPrice,
                consignationCount: consignationCount
            },{"isLoading":true,"elm":"#check-price .topo-loading"})
        },
        shijiamairu: function () {//市价买入
            var lang = $.cookie('newlang');
            var bizType = this.TransactionPair;
            var shijiabuy = this.shijiabuy;
            var isCheckTrue = true;
            if (shijiabuy.length <= 0) {
                TransactionAlert('emptyNumber', '.shijia-buy .inputnum-wrap');
                //"请输入数量"
                isCheckTrue = false;
            }
            if (isNaN(shijiabuy) || shijiabuy == 0) {
                TransactionAlert('notNumber', '.shijia-buy .inputnum-wrap');
                //"请输入正确的数字"
                isCheckTrue = false;
            }
            if (shijiabuy > this.assetList[this.market]) {
                TransactionAlert('inBalace', '.shijia-buy .dealnum-wrap');
                //"余额不足"
                isCheckTrue = false;
            }
            if (shijiabuy < 0.000005) {
                TransactionAlert('beLess', '.shijia-buy .dealnum-wrap');
                //"交易额最小不能低于0.000005"
                isCheckTrue = false;
            }
            if (!isCheckTrue) return;

            $(".bgloading").show();
            $(".loading").show();
            callServieOther("marketPriceBuyConsignation", "/api/trade/marketPriceBuyConsignation", {
                bizType: bizType,
                consignationCount: shijiabuy
            },{"isLoading":true,"elm":"#market-price .topo-loading"})
        },
        shijiamaichu: function () {//市价卖出
            var lang = $.cookie('newlang');
            var bizType = this.TransactionPair;
            var shijiasell = this.shijiasell;

            var isCheckTrue = true;
            if (shijiasell.length <= 0) {
                TransactionAlert('emptyNumber', '.shijia-sell .inputnum-wrap');
                //"请输入数量"
                isCheckTrue = false;
            }
            if (isNaN(shijiasell) || shijiasell == 0) {
                TransactionAlert('notNumber', '.shijia-sell .inputnum-wrap');
                //"请输入正确的数字"
                isCheckTrue = false;
            }
            if (shijiasell > this.assetList[this.buyAndCoin]) {
                TransactionAlert('inBalace', '.shijia-sell .dealnum-wrap');
                //"余额不足"
                isCheckTrue = false;
            }
            if (shijiasell < 0.000005) {
                TransactionAlert('beLess', '.shijia-sell .dealnum-wrap');
                //"交易额最小不能低于0.000005"
                isCheckTrue = false;
            }
            if (!isCheckTrue) return;
            $(".bgloading").show();
            $(".loading").show();
            callServieOther("marketPriceSellConsignation", "/api/trade/marketPriceSellConsignation", {
                bizType: bizType,
                consignationCount: shijiasell
            },{"isLoading":true,"elm":"#market-price .topo-loading"})
        },
        swith: function (min) {
            this.minute = min;
            inputNewest(); //获取最新价格填入到买卖价框中
            kline.draw();
			setKlineWidths();
        },
        inputBuyFiled: function (money, index,newNumber) {
            var totalVolume = 0;
            /*if (typeof(newNumber) != "undefined" && newNumber >= 0) {
				totalVolume = newNumber;
			}else if (typeof(index) != "undefined" && index >= 0) {
	            for (var i = 0; i <= index; i++) {
	                totalVolume = totalVolume + Number(formatNumber((this.BuyTop10List[i]['count']), 4));
	            }
                
            }*/
            totalVolume=newNumber;
            if(index!=""){

                  $(".xianjia-sell .inputprice-wrap input,.xianjia-sell .inputnum-wrap input").addClass("animation-actives");
                setTimeout(function(){
                    $(".xianjia-sell .inputprice-wrap input,.xianjia-sell .inputnum-wrap input").removeClass("animation-actives");
                },2000);  
            }
            this.buyPrice = money;
            this.sellPrice = money;
            this.buyVolume = formatNumber(totalVolume, 4);
            this.sellvolume = formatNumber(totalVolume, 4);
        },
        inputSellFiled: function (money, index,newNumber) {
            var totalVolume = 0;
			/*if (typeof(newNumber) != "undefined" && newNumber >= 0) {
				totalVolume = newNumber;
			}else if (typeof(index) != "undefined" && index >= 0) {
				var sellData = this.SellTop10List;
				for (var i = Number(index); i < sellData.length; i++){
					var sellDataU = sellData[i].count;
					totalVolume = totalVolume + Number(formatNumber(Number(sellDataU),4));
				}
                totalVolume=newNumber;
                $(".xianjia-buy .inputprice-wrap input,.xianjia-buy .inputnum-wrap input").addClass("animation-actives");
                setTimeout(function(){
                    $(".xianjia-buy .inputprice-wrap input,.xianjia-buy .inputnum-wrap input").removeClass("animation-actives");
                },2000);
			}*/
            totalVolume=newNumber;

            if(index!=""){
                
                $(".xianjia-buy .inputprice-wrap input,.xianjia-buy .inputnum-wrap input").addClass("animation-actives");
                setTimeout(function(){
                    $(".xianjia-buy .inputprice-wrap input,.xianjia-buy .inputnum-wrap input").removeClass("animation-actives");
                },2000);
            }
            
            this.buyPrice = money;
            this.sellPrice = money;
            this.buyVolume = formatNumber(totalVolume, 4);
            this.sellvolume = formatNumber(totalVolume, 4);

        },
        checkFloat6: function (e) {
            checkFloat6(e.currentTarget);
        },
        checkFloat4: function (e) {
            checkFloat4(e.currentTarget);
        },
        toggleWindowTrade: function () {
            this.showTradeData = !this.showTradeData;
        },
        toggleIsCNY: function () {
            this.isCNY = !this.isCNY;
            sessionStorage.setItem("sessionIsCny", this.isCNY);
        },
        toggleMarketBg: function (b, index) {
            this.marketCheck = {
                BTC: null,
                ETH: null
            }
            this.marketCheck[b] = index;
            sessionStorage.setItem("sessionCont", b);
            sessionStorage.setItem("sessionIndex", index);
        }
        , checkFocusIn: function (obj, code) {
            this[code] = this[code] === "0" || this[code] === 0 ? "" : this[code];
        }
        , showPriceNum: function (obj, t) {
			this.hideTradDealnumWrap();
            var codeN = '';
            if (t == 3) codeN = 'yuedengyu';
            if (t == 2) codeN = 'maxSell';
            if (t == 1) codeN = 'maxBuy';
            if (codeN.length > 0) {
                TransactionMsg(codeN, obj);
            } else {
                $(obj).find("input").addClass("msg-prompt");
                $(obj).find(".input-prompt").addClass("msg-input-prompt").removeClass("dn");
            }
        }
        , hidePriceNum: function (obj) {
			this.hideTradDealnumWrap();
			$(obj).find("input").removeClass("msg-prompt").removeClass("error-prompt");
            $(obj).find(".input-prompt").removeClass("error-input-prompt").removeClass("msg-input-prompt").addClass("dn");
            $(obj + " .input-prompt .ip-text").html("");
            $(obj + " .input-prompt .ip-value").addClass("dn");
            $(obj + " .input-prompt .ip-unit").addClass("dn");
        }
		, hideTradDealnumWrap: function(){
			$(".dealnum-wrap .input-prompt").removeClass('error-input-prompt').removeClass("msg-input-prompt").addClass("dn");
			$(".dealnum-wrap .dealnum-input").removeClass('error-prompt').removeClass("msg-prompt");

			$(".deal-info").find("input.error-prompt").removeClass("error-prompt");
            $(".deal-info").find(".input-prompt.error-input-prompt").removeClass("error-input-prompt").addClass("dn");
            $(".deal-info .input-prompt.error-input-prompt .ip-text").html("");
            $(".deal-info .input-prompt.error-input-prompt .ip-value").addClass("dn");
            $(".deal-info .input-prompt.error-input-prompt .ip-unit").addClass("dn");
		}
        , setMaxTradNum: function (elm, k) {//市价、限价  点击最大值
            this[k] = $(elm + " .ip-value").html();
            this.checkKeyUpPoint(k);
        }
        , checkKeyUpPoint: function (code) { //市价、限价  输入框输入值时
            if (this[code] == "0" || this[code] == ".") {
                this[code] = this[code] == "." ? "0." : this[code];
            }
            var clickKey = {
                "buyPriceKey": initClickInput1,//买入价格
                "buyVolumeKey": initClickInput1,//买入数量
                "sellPriceKey": "",//卖出价格
                "sellvolumeKey": initClickInput2,//卖出数量
                "shijiabuyKey": initClickInput3,//市价买入
                "shijiasellKey": initClickInput4,//市价卖出,
            };
            var maxV = this.assetList[this.market];
            var starV = this[code];
            initChangeInput = clickKey[code + "Key"];

            if (code == "buyPrice" || code == "buyVolume") {
                maxV = this.assetList[this.market] / this.buyPrice;
                starV = "" + this.buyVolume;
            } else if (code == "sellvolume") {
                maxV = this.assetList[this.buyAndCoin];
            } else if (code == "shijiabuy") {
                maxV = this.assetList[this.market];
            } else if (code == "shijiasell") {
                maxV = this.assetList[this.buyAndCoin];
            } else {
                return false;
            }
            refreshPowerange(initChangeInput, maxV, starV);

        }
    },
    computed: {
        computeTradeData:function(){
            var data = {}
            var _this = this;
            for (var i in this.tradeData){
                var result = this.tradeData[i].filter(function(item){
                    return item.pair.toLowerCase().indexOf(_this.search.toLocaleLowerCase())>-1
                });
                data[i] = result;
            }
            return data;
        },
        computeTradeDataRecent:function(){
            var _this = this;
            var data = [];
            if(this.tradeDataRecent){
                var data = this.tradeDataRecent.filter(function(item){
                    return item.pair.toLowerCase().indexOf(_this.search.toLocaleLowerCase())>-1;
                })
                return data;
            }
        }
    },
    watch:{
        buyPrice:function(val,oldVal){
            val=""+val;
            val=val.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符     
            val= val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的     
            val= val.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
            val = val.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d).*$/,'$1$2.$3');//保留小数点后8位       
            if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额    
                val= parseFloat(val);    
            } 
            this.buyPrice=val; 
        },
        sellPrice:function(val,oldVal){
            val=""+val;
            val=val.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符     
            val= val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的     
            val= val.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
            val = val.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d).*$/,'$1$2.$3');//保留小数点后8位       
            if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额    
                val= parseFloat(val);    
            } 
            this.sellPrice=val; 
        },
        shijiabuy:function(val,oldVal){
            val=""+val;
            val=val.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符     
            val= val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的     
            val= val.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
            val = val.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d).*$/,'$1$2.$3');//保留小数点后8位       
            if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额    
                val= parseFloat(val);    
            } 
            this.sellPrice=val; 
        },
        buyVolume:function(val){
            val=""+val;
            val=val.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符     
            val= val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的     
            val= val.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
            val = val.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d).*$/,'$1$2.$3');//保留小数点后6位       
            if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额    
                val= parseFloat(val);    
            } 
            this.buyVolume=val;
        },
        sellvolume:function(val){
            val=""+val;
            val=val.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符     
            val= val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的     
            val= val.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
            val = val.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d).*$/,'$1$2.$3');//保留小数点后6位       
            if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额    
                val= parseFloat(val);    
            } 
            this.sellvolume=val;
        },
        shijiasell:function(val){
            val=""+val;
            val=val.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符     
            val= val.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的     
            val= val.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
            val = val.replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d).*$/,'$1$2.$3');//保留小数点后6位       
            if(val.indexOf(".")< 0 && val !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额    
                val= parseFloat(val);    
            } 
            this.shijiasell=val;
        }
    }
})

sessionB();
//获取最新价格填入到买卖价框中
inputNewest();
function inputNewest() {
    callServieGetOther("inputNewest", '/api/market/nologin/realtime/index/' + buyAndSell.buyAndCoin + '/' + buyAndSell.market, {
        commodity: buyAndSell.buyAndCoin,
        money: buyAndSell.market
    })
}
function inputNewestCallBack(r) {
    if (!r.success) {
        return;
    }
    buyAndSell.buyPrice = r.data.new;
    buyAndSell.sellPrice = r.data.new;
    refreshPowerange(initClickInput1, buyAndSell.assetList[buyAndSell.market] / buyAndSell.buyPrice, 0);
}

function initPage() {
    var userToken = $.cookie("userToken");
    if (!userToken && userToken != 'undefined') {
        $(".black-shadow").show();
        
    } else {
        $("#havaLoginPersonal").show();
        $("#LastMarket,#myLast").show();
        $(".black-shadow").hide();
    }
	//K set width
	setKlineWidths();
}
function setKlineWidths(){
	var widths =  $('body').width();
	widths =(Number(widths)*0.732)-35;
	kline.width = widths;
	kline.onResize(widths,432);
	on_size(widths, 432);
}
$(document).ready(function () {
    $('.ul-select-wrap').mouseenter(function () {
        var $this = $(this);
        $this
            .find('ul')
            .addClass("animation-select")
            .parent()
            .find(".icon-down")
            .addClass("icon-down-open");
    }).mouseleave(function () {
        var $this = $(this);
        $this
            .find('ul')
            .removeClass("animation-select")
            .parent()
            .find(".icon-down")
            .removeClass("icon-down-open");
    });
    $(".ul-select li").click(function () {
        $(".ul-select").removeClass("animation-select");
        $(".icon-down").removeClass("icon-down-open");
        var odllanguage = $("#language").html();
        var newlanguage = $(this).html();
        $("#language").html(newlanguage);
        $(this).html(odllanguage);
    })
    $("#btn-remove").click(function () {
        $(this).parent().parent().parent().fadeOut(50);
    })
    $("#main-index-more").click(function () {
        if (!$(this).hasClass("active-main-index")) {
            $(this).addClass("active-main-index");
        }
    });

    $("body").on("mouseover", "table tbody tr,.window-pop .row", function () {
        $(this).addClass("tr-current");
    });

    $("body").on("mouseleave", "table tbody tr,.window-pop .row", function () {
        $(this).removeClass("tr-current");
    });

})

var switchMinList = {
    5: "5MINUTES",
    15: "15MINUTES",
    30: "30MINUTES",
    60: "60MINUTES",
    1440: "1DAY",
    10000: "1WEEK",
    100000: "1MONTH",
    "minte": "REAL_TIME"
}

/* 当前委托列表操作开始 */
if (!userToken && userToken != 'undefined') {
} else {
    callServie("consignationList", "/api/trade/getUntradeBuySellOrder",{},{"isLoading":true,"elm":"#home1 .topo-loading"});
}
function consignationListCallBack(r) {
    $("#home1 .topo-loading").addClass("dn");
    if (!r.success) return;
    if (r.data.length <= 0) {
        consignationList.show = true;
        $("#footerNav").removeClass("posi-fix");
    } else {
        consignationList.show = false;
    }
    if (r.data.length > 0) {
        $("#allcancle").removeClass("dn");
    } else {
        $("#allcancle").addClass("dn");
    }
    consignationList.consignationDataList = r.data;
	initLang();
}
var consignationList = new Vue({
    el: '#home1',
    data: {
        consignationDataList: {},
        show: false,
        forEnd:false,
        RateMoney: buyAndSell.RateMoney,
        hideOtherPair: false,	//隐藏其他交易对
		Rate: buyAndSell.Rate,
		tradeDataKey:buyAndSell.tradeDataKey
    },
    methods: {
        revokeOrder: function (e) {
            $(".bgloading").show();
            $(".loading").show();
            callServieOther("revokeOrder", "/api/trade/revokeOrder", {
                consignationNo: e.target.dataset.id
            },{"isLoading":true,"elm":"#home1 .topo-loading"});
        },
        hideOtherTrand: function () {
            var objs = $("#home1 .handle-hide-other");
            if (this.hideOtherPair) {
                this.hideOtherPair = false;
                objs.removeClass("active");
            } else {
                this.hideOtherPair = true;
                objs.addClass("active");
            }
			this.hideNotOff();
        },
		hideNotOff: function () {
			var isT = this.hideOtherPair;
            var nowD = buyAndSell.buyAndCoin + "/" + buyAndSell.market;
            if (isT) {
                $("#home1 tbody tr").not("#home1 tr[data-biztypev='" + nowD + "']").addClass("zan-ide");
            } else {
                $("#home1 tbody tr").removeClass("zan-ide");
            }
        },
        cancleAll: function () {
            callServieOther("revokeOrderAll", "/api/trade/revokeAll",{},{"isLoading":true,"elm":"#home1 .topo-loading"});
        }
    }
})
function revokeOrderCallBack(r) {
    $(".bgloading").hide();
    $(".loading").hide();
    if (!r.success) {
		msg(r.error.detail);
        return;
    }
    var lang = $.cookie('newlang');
    if (typeof(lang) == "undefined") {
        msg("Success");
    } else if (lang == "scn" || lang == "tcn") {
        msg("撤单成功");
    } else if (lang == "en") {
        msg("Success");
    }
	consignationList.show = false;
    callServie("AssetMsg", "/api/account/asset");
    callServie("consignationList", "/api/trade/getUntradeBuySellOrder",{},{"isLoading":true,"elm":"#home1 .topo-loading"});
}
function revokeOrderAllCallBack(r) {
    var lang = $.cookie('newlang');
    $(".bgloading").hide();
    $(".loading").hide();
    if (!r.success) {
		msg(r.error.detail);
        return;
    }
    if (typeof(lang) == "undefined") {
        msg("Success");
    } else if (lang == "scn" || lang == "tcn") {
        msg("撤单成功");
    } else if (lang == "en") {
        msg("Success");
    }
	consignationList.show = false;
    callServie("AssetMsg", "/api/account/asset");
    callServie("consignationList", "/api/trade/getUntradeBuySellOrder",{},{"isLoading":true,"elm":"#home1 .topo-loading"});
}
/* 当前委托列表操作结束 */
/* 历史委托   开始 */
userToken = $.cookie("userToken");
if (!userToken && userToken != 'undefined') {
} else {
	//consignation/history?pageNo=0&pageSize=1&bizType=8
	///api/trade/listOrderLog
    //callServie("listOrderLog","/api/trade/consignation/history",{
		//pageNo:0,
		//pageSize:20,
		//bizType:""
	//},{"isLoading":true,"elm":"#my24 .topo-loading"});
}
function listOrderLogCallBack(r) {
	$("#my24 .topo-loading").addClass("dn");
    if (!r.success) return;
    if (r.data.list.length <= 0) {
        listOrderLog.show = true;
        $("#footerNav").removeClass("posi-fix");
    } else {
        listOrderLog.show = false;
    }
    listOrderLog.consignationDataList = r.data.list;
    initLang();
}

var listOrderLog = new Vue({
    el: '#my24',
    data: {
        consignationDataList: {},
        show: false,
        forEnd:false,
        RateMoney: buyAndSell.RateMoney,
		Rate: buyAndSell.Rate,
		tradeDataKey:buyAndSell.tradeDataKey,
		hideOtherPair: false,	//隐藏其他交易对
    },
    methods: {
        hideOtherTrand: function () {
            var objs = $("#my24 .handle-hide-other");
            if (this.hideOtherPair) {
                this.hideOtherPair = false;
                objs.removeClass("active");
            } else {
                this.hideOtherPair = true;
                objs.addClass("active");
            }
			this.hideNotOff();
        },
		hideNotOff: function () {
			var isT = this.hideOtherPair;
            var nowD = buyAndSell.buyAndCoin + "/" + buyAndSell.market;
            if (isT) {
                $("#my24 tbody tr").not("#my24 tr[data-biztypev='" + nowD + "']").addClass("zan-ide");
            } else {
                $("#my24 tbody tr").removeClass("zan-ide");
            }
        }
    }
})
/* 历史委托   结束 */
//历史委托/当前委托 切换刷新
$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    if (e.currentTarget.hash == "#my24") {
    	listOrderLog.consignationDataList = {};
		listOrderLog.show = false;
        var bizType;
		if (!sessionStorage.getItem('sessionInd')) {
			bizType = buyAndSell.TransactionPair
		} else {
			bizType = sessionStorage.getItem('sessionInd')
		}
		
		callServieOther("listOrderLog","/api/trade/getBuySellOrder",{
			pageNo:0,
			pageSize:20,
            bizType:bizType,
            consignationStatus:0
		},{"isLoading":true,"elm":"#my24 .topo-loading"});
    }else if (e.currentTarget.hash == "#home1"){
		consignationList.consignationDataList = {};
		consignationList.show = false;
		callServie("consignationList", "/api/trade/getUntradeBuySellOrder",{},{"isLoading":true,"elm":"#home1 .topo-loading"});
    } else {
        //换切限价 市价交易时不访问接口
        //callServie("consignationList","/api/trade/getUntradeBuySellOrder");
    }
})


/*获取汇率*/
setInterval(function () {
    getExchangeRate();
    getUSDCNYRate();
}, 1000 * 60 * 10)
getExchangeRate();
getUSDCNYRate();

function getExchangeRate() {
    callServie("Rate", "/api/account/nologin/asset/exchangeRate");
}
function RateCallBack(r) {
    var RateList = {
        "ETH": r.data.ethRate,
        "BTC": r.data.btcRate
    };
    buyAndSell.Rate = RateList;
	listOrderLog.Rate = RateList;
	consignationList.Rate = RateList;
}

var tradList = {
    "1": "买",
    "2": "卖",
    "3": "买",
    "4": "卖"
}
/* 获取当前币种买卖实时数据（盘口数据） start */
getBuyAndSellDataList(true);
getNewst();
refreshNewTread(true);
setInterval(function () {
	//盘口数据
    getBuyAndSellDataList(false);
    //获取最新价格、交易对
    getNewst();
	//最新成交 市场
	refreshNewTread();
}, 5000)
//顶部当前交易对
function getNewst() {
    callServieGetOther("theNewest", '/api/market/nologin/realtime/index/' + buyAndSell.buyAndCoin + '/' + buyAndSell.market, {
        commodity: buyAndSell.buyAndCoin,
        money: buyAndSell.market
    })
    //左侧市场以及市场下的所有交易对
    callServieGetOther("theAllNewest", '/api/market/nologin/all/realtime/index')
}
function theAllNewestCallBack(r) {
    $('.transaction-box .topo-loading').addClass('dn')
    if (!r.success) {
        return;
    }
    buyAndSell.AllNewst = r.data;
    buyAndSell.tradeData = r.data;

    if (buyAndSell.currentType == 1) {
        if (buyAndSell.currentOpen) {
            buyAndSell.tradeData[buyAndSell.tradeDataKey].sort(buyAndSell.comparePairDeac('pair'))
        } else {
            buyAndSell.tradeData[buyAndSell.tradeDataKey].sort(buyAndSell.comparePairAsce('pair'))
        }
    }
    if (buyAndSell.currentType == 2) {
        if (buyAndSell.currentOpen) {
            buyAndSell.tradeData[buyAndSell.tradeDataKey].sort(buyAndSell.compareDesc('new'));
        } else {
            buyAndSell.tradeData[buyAndSell.tradeDataKey].sort(buyAndSell.compareAsce('new'))
        }
    }
    if (buyAndSell.currentType == 3) {
        if (buyAndSell.currentOpen) {
            buyAndSell.tradeData[buyAndSell.tradeDataKey].sort(buyAndSell.compareDesc('increase'));
        } else {
            buyAndSell.tradeData[buyAndSell.tradeDataKey].sort(buyAndSell.compareAsce('increase'))
        }
    }
}
function theNewestCallBack(r) {
    if (!r.success) {
        return;
    }
    buyAndSell.newList = r.data;
}
function getBuyAndSellDataList(isLoads) {
    var date = new Date(new Date(getLocalTime(8)).getTime() - 5000);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var time = "" + hour + minute + second;
    var marketAndprice = buyAndSell.buyAndCoin + "/" + buyAndSell.market;
	getBuyDataList(isLoads);	//盘口买数据
    getSellDataList(isLoads);	//盘口卖数据
}
//盘口买数据
function getBuyDataList(isLoads){
	var marketAndprice = buyAndSell.buyAndCoin + "/" + buyAndSell.market;
	var loadWhere = {};
	if(isLoads){
		loadWhere = {"isLoading":true,"elm":".pankou-info .topo-loading"};
	}
    callServieGetOther("REAL_AGENCY_BUY", "/api/market/nologin/realtime/buy/index/" + marketAndprice, {
        type: "buy",
        commodity: buyAndSell.buyAndCoin,
        money: buyAndSell.market,
        max: buyAndSell.max
    },loadWhere);
}
function REAL_AGENCY_BUYCallBack(r) {
	$(".pankou-info .topo-loading").addClass("dn");
    if (!r.success) {
        return;
    }
    var newdata = r.data;
    buyAndSell.BuyTop10List = r.data;
    buyAndSell.totalM = 0;
    $(r.data).each(function (k, v) {
        buyAndSell.totalM = buyAndSell.totalM + Number(v.count);
    });
	initLang();
}
//盘口卖数据
function getSellDataList(isLoads){
	var marketAndprice = buyAndSell.buyAndCoin + "/" + buyAndSell.market;
	var loadWhere = {};
	if(isLoads){
		loadWhere = {"isLoading":true,"elm":".pankou-info .topo-loading"};
	}
	callServieGetOther("REAL_AGENCY_SELL", "/api/market/nologin/realtime/sell/index/" + marketAndprice, {
        type: "sell",
        commodity: buyAndSell.buyAndCoin,
        money: buyAndSell.market,
        max: buyAndSell.max
    },isLoads);
}
function REAL_AGENCY_SELLCallBack(r) {
	$(".pankou-info .topo-loading").addClass("dn");
    if (!r.success) {
        return;
    }
    buyAndSell.SellTop10List = r.data.reverse();
    buyAndSell.totalS = 0;
    $(r.data).each(function (k, v) {
        buyAndSell.totalS = buyAndSell.totalS + Number(v.count);
    });
	initLang();
}
/* 获取当前币种买卖实时数据（盘口数据）  end*/

function changeBaseRate() {
    //预定义切换语言时汇率的数值
    var lans = $.cookie('newlang');
    var baseRate = Number($.cookie('baserate' + lans)) > 0 ? Number($.cookie('baserate' + lans)) : 1;
    buyAndSell.RateMoney = baseRate;
	consignationList.RateMoney = baseRate;
	listOrderLog.RateMoney = baseRate;
    if ($.cookie('newlang') == 'scn') {
        chart_switch_language('zh-cn');
    } else if ($.cookie('newlang') == 'en') {
        chart_switch_language('en-us');
    } else if ($.cookie('newlang') == 'tcn') {
        chart_switch_language('zh-tw');
    }
};
//获取资产列表
function AssetMsgCallBack(r) {
    var assetList = {};
    if (!r.success) {
        return;
    }
    $.each(r.data, function (i, item) {
        assetList[item.currencyName] = item.availableAmount;
    })
    setTimeout(function () {
        buyAndSell.assetList = assetList;
        refreshElement();
    }, 200)
}

//切换币时要刷新的模块
function refreshElement() {
	buyAndSell.buyVolume = 0,//买入数量
        buyAndSell.sellvolume = 0,//卖出数量
        buyAndSell.shijiasell = "",//市价卖出
        buyAndSell.shijiabuy = "",//市价卖出
        //刷新当前币的滑块最大值
    refreshPowerange(initClickInput1, formatNumber(buyAndSell.assetList[buyAndSell.market] / buyAndSell.newList.new, 4), 0);
    refreshPowerange(initClickInput2, formatNumber(buyAndSell.assetList[buyAndSell.buyAndCoin], 4), 0);
    refreshPowerange(initClickInput3, formatNumber(buyAndSell.assetList[buyAndSell.market], 4), 0);
    refreshPowerange(initClickInput4, formatNumber(buyAndSell.assetList[buyAndSell.buyAndCoin], 4), 0);
	
    //切换后立即获取最新价格填入到买卖价框中
    inputNewest();
}
function resetWeituor(){
	//当前/历史  委托隐藏其它交易对   重置
	listOrderLog.hideOtherPair = true;
	listOrderLog.hideOtherTrand();
	consignationList.hideOtherPair = true;
	consignationList.hideOtherTrand();
}
//重置滑块 默认值
function refreshPowerange(elm, m, s) {
    if (m) elm.options.max = formatNumber(Number(m), 4);
    elm.options.start = s;
    s = Number(s);
    m = Number(formatNumber(m, 4));
    var w = Number(elm.slider.offsetWidth);
    var _l = Number((w * s) / m);
    var prs = parseInt(Math.ceil(Number(s / m) * 100));
    prs = !isNaN(prs) ? (prs > 100 ? 100 : prs) : "";
    if (Math.abs(_l - w) <= 10 && _l > (w / 2)) _l = parseInt(_l - 10);

    elm.setPosition(s <= m ? _l : w);
    $(elm).find('.range-handVal').html( prs <= 0 ? "" : prs + "%");
    elm.element.value = !isNaN(s) ? s : "";
}

//获取币币交易列表对回调
function listCurrenciesCallBack(r) {
    if (!r.success) {
        return;
    }
    var newV = {};
    $.each(r.data, function (k, v) {
        newV[v] = k;
    })
    buyAndSell.TransactionPairList = newV;
    sessionB()
}

//限价买入委托单回调
function limitPriceBuyConsignationCallBack(r) {
    $(".bgloading").hide();
    $(".loading").hide();
	$(".deal-info .topo-loading").addClass("dn");
    if (!r.success) {
        alert(r.error.detail);
        return;
    }
    var lang = $.cookie('newlang');
    if (typeof(lang) == "undefined") {
        msg("Success");
    } else if (lang == "scn" || lang == "tcn") {
        msg("委托成功");
    } else if (lang == "en") {
        msg("Success");
    }

    buyAndSell.buyPrice = "";
    buyAndSell.buyVolume = 0;
    getBuyAndSellDataList();
    callServie("AssetMsg", "/api/account/asset");
    callServie("consignationList", "/api/trade/getUntradeBuySellOrder",{},{"isLoading":true,"elm":"#home1 .topo-loading"});
}

//限价卖出委托单回调
function limitPriceSellConsignationCallBack(r) {
    $(".bgloading").hide();
    $(".loading").hide();
	$(".deal-info .topo-loading").addClass("dn");
    if (!r.success) {
        alert(r.error.detail);
        return;
    }
    var lang = $.cookie('newlang');
    if (typeof(lang) == "undefined") {
        msg("Success");
    } else if (lang == "scn" || lang == "tcn") {
        msg("委托成功");
    } else if (lang == "en") {
        msg("Success");
    }
    buyAndSell.sellPrice = "";
    buyAndSell.sellvolume = 0;
    getBuyAndSellDataList();
    callServie("AssetMsg", "/api/account/asset");
    callServie("consignationList", "/api/trade/getUntradeBuySellOrder",{},{"isLoading":true,"elm":"#home1 .topo-loading"});
}

//市价买入回调
function marketPriceBuyConsignationCallBack(r) {
    $(".bgloading").hide();
    $(".loading").hide();
	$(".deal-info .topo-loading").addClass("dn");
    if (!r.success) {
        alert(r.error.detail);
        return;
    }
    if(r.data.madeCount==0){
        alert("已成交数量为0");
        return;
    }
    buyAndSell.shijiabuy = "";
    var lang = $.cookie('newlang');
    if (typeof(lang) == "undefined") {
        msg("Success Count"+r.data.madeCount);
    } else if (lang == "scn" || lang == "tcn") {
        msg("委托成功"+r.data.madeCount+"个");
    } else if (lang == "en") {
        msg("Success Count"+r.data.madeCount);
    }
    getBuyAndSellDataList();
    callServie("AssetMsg", "/api/account/asset");
    callServie("consignationList", "/api/trade/getUntradeBuySellOrder",{},{"isLoading":true,"elm":"#home1 .topo-loading"});
}
//市价卖出回调
function marketPriceSellConsignationCallBack(r) {
    $(".bgloading").hide();
    $(".loading").hide();
	$(".deal-info .topo-loading").addClass("dn");
    if (!r.success) {
        alert(r.error.detail);
        return;
    }
    if(r.data.madeCount==0){
        alert("已成交数量为0");
        return;
    }
    var lang = $.cookie('newlang');
    if (typeof(lang) == "undefined") {
        msg("Success Count"+r.data.madeCount);
    } else if (lang == "scn" || lang == "tcn") {
        msg("委托成功"+r.data.madeCount+"个");
    } else if (lang == "en") {
        msg("Success Count"+r.data.madeCount);
    }
    buyAndSell.shijiasell = "";
    getBuyAndSellDataList();
    callServie("AssetMsg", "/api/account/asset");
    callServie("consignationList", "/api/trade/getUntradeBuySellOrder",{},{"isLoading":true,"elm":"#home1 .topo-loading"});
}

//最新成交		定时刷新   市场
function refreshNewTread(isLoading){
	if (buyAndSell.changeToMarketTrade) {
		var ntApiBack = 'listRealTimeOrderLog1';
		var loadNumber = 50;
		var isL = {};
		if(isLoading) {
			ntApiBack = 'listRealTimeOrderLog';
			loadNumber = 100;
			isL = {"isLoading":true,"elm":".new-trades .topo-loading"};
		}
		callServieOther(ntApiBack, "/api/trade/nologin/listRealTimeOrderLog", {
			pageNo: 1,
			pageSize: loadNumber,
			bizType: buyAndSell.buyAndCoin + "/" + buyAndSell.market
		},isL);
	}
}
//最新成交     我的
function listOrderSetDataEndCallBack(r) {
    $('.new-trades .topo-loading').addClass('dn');
    if (!r.success) {
        return;
    }

    //最新成交价
    var list = r.data.list;
    buyAndSell.consignationDataListMy = list;
	if(buyAndSell.consignationDataListMy.length <= 0){
		buyAndSell.MarketShowNoData = true;
	}else{
		buyAndSell.refreshMyTime = list[0].create_time;
		buyAndSell.MarketShowNoData = false;
	}
    initLang();
}
function listOrderSetDataEnd1CallBack(r) {
	$('.new-trades .topo-loading').addClass('dn');
    if (!r.success) {
        return;
    }
    //最新成交价
    var list = r.data.list;

	var which = null;
    for (var i = 0; i < list.length; i++) {
        if (buyAndSell.refreshMyTime == list[i].create_time) {
            which = i;
        }
    }
    var newList = list.slice(0, which);
    buyAndSell.consignationDataListMy = newList.concat(buyAndSell.consignationDataListMy)
    buyAndSell.consignationDataListMy = buyAndSell.consignationDataListMy.slice(0, 50);
    if (buyAndSell.consignationDataListMy.length > 0) {
        buyAndSell.MarketShowNoDat = false;
		buyAndSell.refreshMyTime = list[0].create_time;
    }
    initLang();
}
//最新成交  市场
function listRealTimeOrderLogCallBack(r) {
    $('.new-trades .topo-loading').addClass('dn')
    if (!r.success) {
		return;
    }
    //最新成交价
    var list = r.data.list;
	buyAndSell.consignationDataList = list;

    if (buyAndSell.consignationDataList.length <= 0) {
        buyAndSell.MarketShowNoData = true;
    } else {
        buyAndSell.MarketShowNoDat = false;
		buyAndSell.refreshMarketTime = list[0].made_time;
    }
   
    initLang();
}
function listRealTimeOrderLog1CallBack(r) {
	$('.new-trades .topo-loading').addClass('dn');
    if (!r.success) {
		return;
    }
    //最新成交价
    var list = r.data.list;
    var which = null;
    for (var i = 0; i < list.length; i++) {
        if (buyAndSell.refreshMarketTime == list[i].made_time) {
            which = i;
        }
    }
    if(which==null){
        buyAndSell.consignationDataList = list;
    }else{
        var newList = list.slice(0, which);
        buyAndSell.consignationDataList = newList.concat(buyAndSell.consignationDataList)
        buyAndSell.consignationDataList = buyAndSell.consignationDataList.slice(0, 50);
    }
	if (buyAndSell.consignationDataList.length > 0) {
        buyAndSell.MarketShowNoDat = false;
		buyAndSell.refreshMarketTime = list[0].made_time;
    }
    initLang();
}


/*//开放交易倒计时
var daojishi=setInterval(function(){
    var nowTime=new Date().getTime();
    var endTime=new Date("2017/12/09 10:10:00").getTime();
    if(nowTime>endTime){
        $(".black-shadow1").hide();
        clearInterval(daojishi);
    }
},1000)*/

//刷新页面记录当前选择币种
function sessionB(){
    if(sessionStorage.getItem("sessionPair")){
        //显示当前记录币种的K线图和值
        buyAndSell.TransactionPairFun(sessionStorage.getItem("sessionPair"),sessionStorage.getItem("sessionInd"));
        buyAndSell.buyAndCoin=sessionStorage.getItem("sessionPair").split("/")[0];
        buyAndSell.market=sessionStorage.getItem("sessionPair").split("/")[1];
    }
    //显示当前记录币种
    buyAndSell.transactionTit={
        marketBTC:sessionStorage.getItem("sessionTit") ? (sessionStorage.getItem("sessionTit")=='marketBTC' ? true : false) : true,
        marketETH:sessionStorage.getItem("sessionTit") && sessionStorage.getItem("sessionTit")=='marketETH' ? true : false,
        marketPK:sessionStorage.getItem("sessionTit") && sessionStorage.getItem("sessionTit")=='marketPK' ? true : false
    }
    //显示当前记录币种分类
    buyAndSell.marketCheck={
        BTC:sessionStorage.getItem("sessionCont") ? (sessionStorage.getItem("sessionCont")=='BTC' ? sessionStorage.getItem("sessionIndex") : null) : 0,
        ETH:sessionStorage.getItem("sessionCont") && sessionStorage.getItem("sessionCont")=='ETH' ? sessionStorage.getItem("sessionIndex") : null,
        PK:sessionStorage.getItem("sessionCont") && sessionStorage.getItem("sessionCont")=='PK' ? sessionStorage.getItem("sessionIndex") : null
    }
    //记录当前市场
    buyAndSell.tradeDataKey=sessionStorage.getItem("sessionCont") ? sessionStorage.getItem("sessionCont") : "BTC";
    //记录法币类型
    buyAndSell.isCNY=sessionStorage.getItem("sessionIsCny") && (sessionStorage.getItem("sessionIsCny")=='false'||sessionStorage.getItem("sessionIsCny")=="null") ? true : false;
};
//重置限价、市价   交易验证提示内容
function resetTransactionInput() {
    $(".input-prompt").addClass("dn");
    $(".input-prompt .ip-text").html("");
    $(".input-prompt .ip-value").addClass("dn");
    $(".input-prompt .ip-unit").addClass("dn");
    $(".error-prompt").removeClass("error-prompt");
    $(".msg-prompt").removeClass("msg-prompt");
    $(".error-input-prompt").removeClass("error-input-prompt");
    $(".msg-input-prompt").removeClass("msg-input-prompt");
    $(elm + " input," + elm + " .input-check-warp").addClass("error-prompt");
    $(elm + " .input-prompt").addClass("error-input-prompt").removeClass("dn");
}

//限价、市价  交易验证警告
function TransactionMsg(errCode, elm) {
    var errorMsgText = errorMsgLan(errCode);
    $(elm + " .input-prompt .ip-text").html(errorMsgText);
    $(elm + " input").addClass("msg-prompt");
    $(elm + " .input-prompt").addClass("msg-input-prompt").removeClass("dn");
    $(elm + " .input-prompt .ip-value," + elm + " .input-prompt .ip-unit").removeClass("dn");
}

//限价、市价  交易验证错误提示
function TransactionAlert(errCode, elm) {
    var errorMsgText = errorMsgLan(errCode);
    $(elm + " .input-prompt .ip-text").html(errorMsgText);
    $(elm + " input," + elm + " .input-check-warp").addClass("error-prompt");
    $(elm + " .input-prompt").addClass("error-input-prompt").removeClass("dn");
}

//错误提示文字
function errorMsgLan(err) {
    var errorJson = $(".errorMsg").html();
    var json = (new Function("return " + errorJson))();
    return json[err];
}

/*
	typeV :
		默认 =>   18:09:09
		1   =>  1-3 18:09:09
		2	=> 2018-1-3 18:09:09
*/
function getDateFormate(str,typeV) {
    if (!str) {
        return;
    }
    var time = new Date(str);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hour = time.getHours();
    var min = time.getMinutes();
    var ss = time.getSeconds();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (ss < 10) {
        ss = "0" + ss;
    }
	if(typeV ==1 ){
		return month+'-'+day+' '+hour + ":" + min + ":" + ss;
	}else if(typeV ==2 ){
		return year+'-'+month+'-'+day+' '+hour + ":" + min + ":" + ss;
	}else{
		return hour + ":" + min + ":" + ss;
	}

}

