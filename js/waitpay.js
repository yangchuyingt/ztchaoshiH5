function showtitlenme() {
		console.log("df:" + pagestatus)
		switch (pagestatus) {
			case '0':
				console.log(0);
				$('.me-header-title').text("全部订单");
				break;
			case '1':
				console.log(1);
				$('.me-header-title').text("待付款");
				break;
			case '2':
				console.log(2);
				$('.me-header-title').text("待收货");
				break;
			case '3':
				console.log(3);
				$('.me-header-title').text("待评价");
				break;
			case '4':
				console.log(4);
				$('.me-header-title').text("售后");
				break;
		}
	}
	/**
	 * 显示所有的订单
	 * */

function displayorder() {
	//console.log('number1');
	//console.log('recode:' + retcode + ",pagefrom:" + pagefrom);
	if (retcode.length == 0 || pagefrom.length == 0) {
		return;
	} else {
		if (retcode == '-2') {

		} else if (retcode == '1') {
			console.log('number2')
			if (pagefrom == '0') { //来自全部订单页面
				showallorders();
			} else if (pagefrom == '1') { //代付款的订单
				showWaitOrders();
				console.log('go there');
			} else if (pagefrom == '2') {
				showWaitReceiveOrders();
			} else if (pagefrom == '3') {
				showWaitEvaluteOrders();
			} else if (pagefrom == '4') {
				showSellAfterOrders();
			}
		}
	}
}

function showallorders() {
		var strs = '';
		var orderstatus = '';
		var dj = '0';
		for (var key in allorders) {
			orderstatus = dealorderstatus(allorders[key].ordzt);
			dj = getdj(allorders[key]);
			//console.log(allorders[key].cpmx.length);
			if (allorders[key].cpmx.length == 1) {
				strs += '<div class="order-msg-items"><div class="orderstatus"><div class="order-number">' + key + '</div><div class="order-status-text">' + orderstatus + '</div> </div><div class="divide-line-without-margin"></div><div class="order-img-one"><div class="imgs-product"></div><div class="right-prodcut-msg">' + allorders[key].fcpmc + '</div><div class="singe-price-num"> ￥' + dj + ' &nbsp;&nbsp;X ' + allorders[key].ordsl + '</div></div><div class="divide-line-without-margin"> </div><div class="price-show"><div class="real-pay">实付款：￥' + allorders[key].payje + '</div></div></div>';
			} else { // 从购物车下单里边有很多商品的时候
				orderstatus = dealorderstatus(allorders[key].ordzt);
				var imgpic = '';
				for (var j = 0; j < allorders[key].cpmx.length; j++) {
					imgpic += '<div class="imgs-product"></div>';
				}
				strs += '<div class="order-msg-items"><div class="orderstatus"><div class="order-number">' + key + '</div><div class="order-status-text">' + orderstatus + '</div></div><div class="divide-line-without-margin"></div><div class="order-img-show">' + imgpic + '</div><div class="divide-line-without-margin"></div><div class="price-show"><div class="real-pay">实付款：￥' + allorders[key].payje + '</div></div></div>';
			}
		}
		console.log("strs:" + strs)
		console.log('wrong:' + $('.parent-add'));
		$('.parent-add').empty();
		$('.parent-add').append(strs);
		loadpictures();
	}
	/**
	 * 带支付订单
	 */

function showWaitOrders() {
		var strs = '';
		var orderstatus = '';
		var dj = '0';
		for (var key in allorders) {

			if (allorders[key].ordzt == '0') {
				console.log("订单状态：" + allorders[key].ordzt);
				orderstatus = dealorderstatus(allorders[key].ordzt);
				dj = getdj(allorders[key]);
				console.log(allorders[key].cpmx.length);
				if (allorders[key].cpmx.length == 1) {
					strs += '<div class="order-msg-items"><div class="orderstatus"><div class="order-number">' + key + '</div><div class="order-status-text">' + orderstatus + '</div> </div><div class="divide-line-without-margin"></div><div class="order-img-one"><div class="imgs-product"></div><div class="right-prodcut-msg">' + allorders[key].fcpmc + '</div><div class="singe-price-num"> ￥' + dj + ' &nbsp;&nbsp;X ' + allorders[key].ordsl + '</div></div><div class="divide-line-without-margin"> </div><div class="price-show"><div class="real-pay">实付款：￥' + allorders[key].payje + '</div><div  value="' + allorders[key].ordno + '" class="order-button1">付款</div><div  value="' + allorders[key].ordno + '" class="order-button2">取消订单</div></div></div>';
				} else { //从购物车下单里边有很多商品的时候
					orderstatus = dealorderstatus(allorders[key].ordzt);
					var imgpic = '';
					for (var j = 0; j < allorders[key].cpmx.length; j++) {
						imgpic += '<div class="imgs-product"></div>';
					}
					strs += '<div class="order-msg-items"><div class="orderstatus"><div class="order-number">' + key + '</div><div class="order-status-text">' + orderstatus + '</div></div><div class="divide-line-without-margin"></div><div class="order-img-show">' + imgpic + '</div><div class="divide-line-without-margin"></div><div class="price-show"><div class="real-pay">实付款：￥' + allorders[key].payje + '</div><div  value="' + allorders[key].ordno + '" class="order-button1">付款</div><div  value="' + allorders[key].ordno + '" class="order-button2">取消订单</div></div></div>';
				}
			}
		}
		console.log("strs:" + strs);
		console.log('wrong:' + $('.parent-add'));
		$('.parent-add').empty();
		$('.parent-add').append(strs);
		console.log("strs2:" + strs);
		loadwaitpaypictures();
	}
	/**
	 * 待收货订单
	 * */

function showWaitReceiveOrders() {
		var strs = '';
		var orderstatus = '';
		var dj = '0';
		for (var key in allorders) {
			if (allorders[key].ordzt == '1' || allorders[key].ordzt == '4') {
				console.log("订单状态：" + allorders[key].ordzt);
				orderstatus = dealorderstatus(allorders[key].ordzt);
				dj = getdj(allorders[key]);
				console.log(allorders[key].cpmx.length);
				if (allorders[key].cpmx.length == 1) {
					strs += '<div class="order-msg-items"><div class="orderstatus"><div class="order-number">' + key + '</div><div class="order-status-text">' + orderstatus + '</div> </div><div class="divide-line-without-margin"></div><div class="order-img-one"><div class="imgs-product"></div><div class="right-prodcut-msg">' + allorders[key].fcpmc + '</div><div class="singe-price-num"> ￥' + dj + ' &nbsp;&nbsp;X ' + allorders[key].ordsl + '</div></div><div class="divide-line-without-margin"> </div><div class="price-show"><div class="real-pay">实付款：￥' + allorders[key].payje + '</div><div  value="' + allorders[key].ordno + '" class="order-button1">确认收货</div><div  value="' + allorders[key].ordno + '" class="order-button2">查看物流</div></div></div>';
				} else { //从购物车下单里边有很多商品的时候
					orderstatus = dealorderstatus(allorders[key].ordzt);
					var imgpic = '';
					for (var j = 0; j < allorders[key].cpmx.length; j++) {
						imgpic += '<div class="imgs-product"></div>';
					}
					strs += '<div class="order-msg-items"><div class="orderstatus"><div class="order-number">' + key + '</div><div class="order-status-text">' + orderstatus + '</div></div><div class="divide-line-without-margin"></div><div class="order-img-show">' + imgpic + '</div><div class="divide-line-without-margin"></div><div class="price-show"><div class="real-pay">实付款：￥' + allorders[key].payje + '</div><div  value="' + allorders[key].ordno + '" class="order-button1">确认收货</div><div  value="' + allorders[key].ordno + '" class="order-button2">查看物流</div></div></div>';
				}
			}
		}
		//console.log("strs:" + strs)
		//console.log('wrong:' + $('.parent-add'));
		$('.parent-add').empty();
		$('.parent-add').append(strs);
		loadwaitreceivepictures();
		//console.log("strs2:" + strs);
	}
	/**待评价订单
	 *
	 * */

function showWaitEvaluteOrders() {
		var strs = '';
		var orderstatus = '';
		var dj = '0';
		for (var key in allorders) {
			if (allorders[key].ordzt == '2' || allorders[key].ordzt == '7') {
				console.log("订单状态：" + allorders[key].ordzt);
				orderstatus = dealorderstatus(allorders[key].ordzt);
				dj = getdj(allorders[key]);
				console.log(allorders[key].cpmx.length);
				if (allorders[key].cpmx.length == 1) {
					strs += '<div class="order-msg-items"><div class="orderstatus"><div class="order-number">' + key + '</div><div class="order-status-text">' + orderstatus + '</div> </div><div class="divide-line-without-margin"></div><div class="order-img-one"><div class="imgs-product"></div><div class="right-prodcut-msg">' + allorders[key].fcpmc + '</div><div class="singe-price-num"> ￥' + dj + ' &nbsp;&nbsp;X ' + allorders[key].ordsl + '</div></div><div class="divide-line-without-margin"> </div><div class="price-show"><div class="real-pay">实付款：￥' + allorders[key].payje + '</div><div   value="' + allorders[key].ordno + '" class="order-button1">去评价</div></div></div>';
				} else { //从购物车下单里边有很多商品的时候
					orderstatus = dealorderstatus(allorders[key].ordzt);
					var imgpic = '';
					for (var j = 0; j < allorders[key].cpmx.length; j++) {
						imgpic += '<div class="imgs-product"></div>';
					}
					strs += '<div class="order-msg-items"><div class="orderstatus"><div class="order-number">' + key + '</div><div class="order-status-text">' + orderstatus + '</div></div><div class="divide-line-without-margin"></div><div class="order-img-show">' + imgpic + '</div><div class="divide-line-without-margin"></div><div class="price-show"><div class="real-pay">实付款：￥' + allorders[key].payje + '</div><div  value="' + allorders[key].ordno + '" class="order-button1">去评价</div></div></div>';
				}
			}
		}
		//console.log("strs:" + strs)
		//console.log('wrong:' + $('.parent-add'));
		$('.parent-add').empty();
		$('.parent-add').append(strs);
		loadwaitEvalutepictures();

	}
	/***
	 * *售后订单
	 *
	 */

function showSellAfterOrders() {
	var strs = '';
	var orderstatus = '';
	var dj = '0';
	for (var key in allorders) {
		if (allorders[key].ordzt == '1' || allorders[key].ordzt == '2' || allorders[key].ordzt == '4' || allorders[key].ordzt == '5' || allorders[key].ordzt == '6' || allorders[key].ordzt == '8' || allorders[key].ordzt == '9') {
			//console.log("订单状态：" + allorders[key].ordzt);
			orderstatus = dealorderstatus(allorders[key].ordzt);
			dj = getdj(allorders[key]);
			//console.log(allorders[key].cpmx.length);
			if (allorders[key].cpmx.length == 1) {
				strs += '<div class="order-msg-items"><div class="orderstatus"><div class="order-number">' + key + '</div><div class="order-status-text">' + orderstatus + '</div> </div><div class="divide-line-without-margin"></div><div class="order-img-one"><div class="imgs-product"></div><div class="right-prodcut-msg">' + allorders[key].fcpmc + '</div><div class="singe-price-num"> ￥' + dj + ' &nbsp;&nbsp;X ' + allorders[key].ordsl + '</div></div><div class="divide-line-without-margin"> </div><div class="price-show"><div class="real-pay">实付款：￥' + allorders[key].payje + '</div><div  value="' + allorders[key].ordno + '" class="order-button1">申请退款</div></div></div>';
			} else { //从购物车下单里边有很多商品的时候
				orderstatus = dealorderstatus(allorders[key].ordzt);
				var imgpic = '';
				for (var j = 0; j < allorders[key].cpmx.length; j++) {
					imgpic += '<div class="imgs-product"></div>';
				}
				strs += '<div class="order-msg-items"><div class="orderstatus"><div class="order-number">' + key + '</div><div class="order-status-text">' + orderstatus + '</div></div><div class="divide-line-without-margin"></div><div class="order-img-show">' + imgpic + '</div><div class="divide-line-without-margin"></div><div class="price-show"><div class="real-pay">实付款：￥' + allorders[key].payje + '</div><div  value="' + allorders[key].ordno + '" class="order-button1">申请退款</div></div></div>';
			}
		}
	}
	//console.log("strs:" + strs)
	//console.log('wrong:' + $('.parent-add'));
	$('.parent-add').empty();
	$('.parent-add').append(strs);
	loadsellafterpictures();
	controlbutoncolor();

}

function controlbutoncolor() {
	var i = 0;
	var imgs = $('.parent-add .order-button1');
	//console.log("imgs.length:"+imgs.length);
	for (var key in allorders) {
		if (allorders[key].ordzt == '1' || allorders[key].ordzt == '2' || allorders[key].ordzt == '4' || allorders[key].ordzt == '5' || allorders[key].ordzt == '6' || allorders[key].ordzt == '8' || allorders[key].ordzt == '9') {

			if (allorders[key].ordzt == '5' || allorders[key].ordzt == '6' || allorders[key].ordzt == '8' || allorders[key].ordzt == '9') {
				//console.log("变暗的订单："+allorders[key].ordno);
				$('.parent-add').find(imgs[i]).removeClass("order-button1");
				$('.parent-add').find(imgs[i]).addClass('order-button1-unvisiable');
			}
			i++;
		}
	}
}

function dealorderstatus(orderstatus) {
	switch (orderstatus) {
		case "0":
			return '待付款';
		case "1":
			return '已付款';
		case "2":
			return '已收货';
		case "3":
			return '已评价';
		case "4":
			return '已发货';
		case "5":
			return '申请退款中';
		case "6":
			return '同意退款';
		case "7":
			return '已签收';
		case "8":
			return '已退款';
		case "9":
			return '退款中';
		default:
			return '未知状态';
	}

}

function getdj(order) {
		var je = Number(order.ordje);
		var sl = Number(order.ordsl);
		return je / sl;
	}
	/*
	 * 加载所有订单的图片
	 */

function loadpictures() {
		var imgs = $(".parent-add .imgs-product");
		var i = 0;
		for (var key in allorders) {
			for (var j = 0; j < allorders[key].cpmx.length; j++) {
				$('.parent-add').find(imgs[i]).css('background-image', "url(" + allorders[key].cpmx[j].cppic + ")");
				i++
			}

		}
	}
	/*
	 *加载待支付的图片
	 * */

function loadwaitpaypictures() {
		var imgs = $(".parent-add .imgs-product");
		var i = 0;
		for (var key in allorders) {
			if (allorders[key].ordzt == '0') {
				for (var j = 0; j < allorders[key].cpmx.length; j++) {
					$('.parent-add').find(imgs[i]).css('background-image', "url(" + allorders[key].cpmx[j].cppic + ")");
					i++;
				}
			}
		}
	}
	/*
	 *加载待收货的图片
	 * */

function loadwaitreceivepictures() {
		var imgs = $(".parent-add .imgs-product");
		var i = 0;
		for (var key in allorders) {
			if (allorders[key].ordzt == '1' || allorders[key].ordzt == '4') {
				for (var j = 0; j < allorders[key].cpmx.length; j++) {
					$('.parent-add').find(imgs[i]).css('background-image', "url(" + allorders[key].cpmx[j].cppic + ")");
					i++;
				}
			}
		}
	}
	/**
	 * *加载待评价的图片
	 *
	 */

function loadwaitEvalutepictures() {
		var imgs = $(".parent-add .imgs-product");
		var i = 0;
		for (var key in allorders) {
			if (allorders[key].ordzt == '2' || allorders[key].ordzt == '7') {
				for (var j = 0; j < allorders[key].cpmx.length; j++) {
					$('.parent-add').find(imgs[i]).css('background-image', "url(" + allorders[key].cpmx[j].cppic + ")");
					i++;
				}
			}
		}
	}
	/**
	 * *加载售后图片
	 *
	 */

function loadsellafterpictures() {
		var imgs = $(".parent-add .imgs-product");
		var i = 0;
		for (var key in allorders) {
			if (allorders[key].ordzt == '1' || allorders[key].ordzt == '2' || allorders[key].ordzt == '4' || allorders[key].ordzt == '5' || allorders[key].ordzt == '6' || allorders[key].ordzt == '8' || allorders[key].ordzt == '9') {
				for (var j = 0; j < allorders[key].cpmx.length; j++) {
					$('.parent-add').find(imgs[i]).css('background-image', "url(" + allorders[key].cpmx[j].cppic + ")");
					i++;
				}
			}
		}
	}
	/**
	 * 从左往右数第二个按钮被点击的时候的事件
	 * */

function onbotton2click(parentorder) {
		//allorderdeal.show();
		switch (pagefrom) {
			case "1": //付款
				showpaymoneypage(paymoneypage, allorders[parentorder].ordje, parentorder);
				break;
			case "2": //确认收获
				var allorderdealpage = plus.webview.getWebviewById('allorderdeal');
				var allorderdealsubpage = plus.webview.getWebviewById("allorderdeal-sub");
				var orderobj = allorders[parentorder];
				mui.fire(allorderdealpage, 'chengetitle', {
					"pagefromfunction": "ensurepackage"
				});
				mui.fire(allorderdealsubpage, "getshopcartorder", {
					"orderobj": orderobj,
					"pagefromfunction": "ensurepackage"
				});
				allorderdeal.show();
				break;
			case "3": //去评价
				var allorderdealpage = plus.webview.getWebviewById('allorderdeal');
				var allorderdealsubpage = plus.webview.getWebviewById("allorderdeal-sub");
				var orderobj = allorders[parentorder];
				mui.fire(allorderdealpage, 'chengetitle', {
					"pagefromfunction": "goevalute"
				});
				mui.fire(allorderdealsubpage, "getshopcartorder", {
					"orderobj": orderobj,
					"pagefromfunction": "goevalute"
				});
				allorderdeal.show();
				break;
			case "4":
				var allorderdealpage = plus.webview.getWebviewById('allorderdeal');
				var allorderdealsubpage = plus.webview.getWebviewById("allorderdeal-sub");
				var orderobj = allorders[parentorder];
				mui.fire(allorderdealpage, 'chengetitle', {
					"pagefromfunction": "applySellAfter"
				});
				mui.fire(allorderdealsubpage, "getshopcartorder", {
					"orderobj": orderobj,
					"pagefromfunction": "applySellAfter"
				});
				allorderdeal.show();
				break;

		}
	}
	/**
	 * *从左往右数第一个按钮被点击的时候的事件
	 * */

function onbotton1click(parentorder) {
		//allorderdeal.show();
		switch (pagefrom) {
			case "1": //取消订单
				//		var allorderdealpage=plus.webview.getWebviewById('allorderdeal');
				//		var allorderdealsubpage=plus.webview.getWebviewById("allorderdeal-sub");
				//		var orderobj=allorders[parentorder];
				//		mui.fire(allorderdealpage,'chengetitle',{
				//			"pagefromfunction":"concelOrder"
				//		});
				//		mui.fire(allorderdealsubpage,"getshopcartorder",{
				//			"orderobj":orderobj,
				//			"pagefromfunction":"concelOrder"
				//		});
				deleteorder(parentorder);
				break;
			case "2": //查看物流
				var allorderdealpage = plus.webview.getWebviewById('allorderdeal');
				var allorderdealsubpage = plus.webview.getWebviewById("allorderdeal-sub");
				var orderobj = allorders[parentorder];
				mui.fire(allorderdealpage, 'chengetitle', {
					"pagefromfunction": "lookforwuliu"
				});
				mui.fire(allorderdealsubpage, "getshopcartorder", {
					"orderobj": orderobj,
					"pagefromfunction": "lookforwuliu"
				});
				allorderdeal.show();
				getwuliuordermx(parentorder);
				break;

		}
	}
/**
 * *获取物流订单的物流单号
 */
function getwuliuordermx(orderno){
	 var url="http://app.teambuy.com.cn/apnc/m/my/a/getmytmordmx";
	 var token = plus.storage.getItem("token");
	 var sessid = plus.storage.getItem("sessid");
	// var parentorder=parentorder
	 $.post(url,{
	 	"acctoken": token,
		"sessid": sessid,
		'ordno':orderno
	 },function(result){
	 	console.log("物流订单详情:"+JSON.stringify(result));
	 	var checkedwuliupage=plus.webview.getWebviewById("checkedwuliu-sub");
	 	mui.fire(checkedwuliupage,'getwuliumsg',{
	 		"wuliudanhao":result
	 	})
	 },'json');
	
}
	/**
	 *
	 *  删除订单
	 * */

function deleteorder(order) {
		mui.toast("请稍后"); //修改东西
		var url = "http://app.teambuy.com.cn/apnc/m/tmord/a/ordscancel";
		var token = plus.storage.getItem("token");
		var sessid = plus.storage.getItem("sessid");
		$.post(url, {
			"acctoken": token,
			"sessid": sessid,
			"ordnos": order
		}, function(result) {
			console.log("删除订单的结果:" + JSON.stringify(result) + ",order" + order);
			if (result.ret == "1") {
				var mainpage = plus.webview.getLaunchWebview();
				mui.fire(mainpage, "refreshmyOrder", {});
			} else if (result.ret == "-2") {
				mui.toast("未知错误");
			}
		}, "json");

	}
	/***
	 * *
	 * 订单二级页面的头
	 *
	 */

function changemidtitle() {
		switch (doWhat) {
			case "ensurepackage": //确认收货
				$('.me-header-title').text("待收货订单");
				break;
			case "goevalute":
				$('.me-header-title').text("待评价订单");
				break;
			case "applySellAfter":
				$('.me-header-title').text("退款订单");
				break;
			case "changemidtitle":
				$('.me-header-title').text("查看物流订单");
				break;

		}
	}
	/**
	 * *跳转到付款的页面
	 *
	 * */

function showpaymoneypage(paymoneypage, allPrice, orderno) {
		//var paymoneyPage = plus.webview.getWebviewById('paymoney');
		paymoneypage.show();
		mui.fire(paymoneypage, 'getprice', {
			aa: allPrice,
			ordno: orderno
		});
	}
	/**
	 * * 二级页面订单的显示
	 */

function showOneShopCartOrder() {
		var strs = '';
		var orderstatus;
		var dj;
		//console.log("订单"+JSON.stringify(orderobj));
		for (var i = 0; i < orderobj.cpmx.length; i++) {
			orderstatus = dealorderstatus(orderobj.cpmx[i].ordzt);
			dj = getdj2(orderobj, i);
			if (pagefromfunction == "ensurepackage") {
				strs += '<div class="order-msg-items"><div class="orderstatus"><div class="order-number">' + orderobj.cpmx[i].ordnox + '</div><div class="order-status-text">' + orderstatus + '</div> </div><div class="divide-line-without-margin"></div><div class="order-img-one"><div class="imgs-product"></div><div class="right-prodcut-msg">' + orderobj.fcpmc + '</div><div class="singe-price-num"> ￥' + dj + ' &nbsp;&nbsp;X ' + orderobj.cpmx[i].osl + '</div></div><div class="divide-line-without-margin"> </div><div class="price-show"><div class="real-pay">实付款：￥' + orderobj.payje + '</div><div  value="' + orderobj.ordno + "," + orderobj.cpmx[i].ordnox + '" class="order-button1">确认收货</div></div></div>';

			} else if (pagefromfunction == "goevalute") {
				strs += '<div class="order-msg-items"><div class="orderstatus"><div class="order-number">' + orderobj.cpmx[i].ordnox + '</div><div class="order-status-text">' + orderstatus + '</div> </div><div class="divide-line-without-margin"></div><div class="order-img-one"><div class="imgs-product"></div><div class="right-prodcut-msg">' + orderobj.fcpmc + '</div><div class="singe-price-num"> ￥' + dj + ' &nbsp;&nbsp;X ' + orderobj.cpmx[i].osl + '</div></div><div class="divide-line-without-margin"> </div><div class="price-show"><div class="real-pay">实付款：￥' + orderobj.payje + '</div><div  value="' + orderobj.ordno + "," + orderobj.cpmx[i].ordnox + '" class="order-button1">去评价</div></div></div>';
			} else if (pagefromfunction == "applySellAfter") {
				strs += '<div class="order-msg-items"><div class="orderstatus"><div class="order-number">' + orderobj.cpmx[i].ordnox + '</div><div class="order-status-text">' + orderstatus + '</div> </div><div class="divide-line-without-margin"></div><div class="order-img-one"><div class="imgs-product"></div><div class="right-prodcut-msg">' + orderobj.fcpmc + '</div><div class="singe-price-num"> ￥' + dj + ' &nbsp;&nbsp;X ' + orderobj.cpmx[i].osl + '</div></div><div class="divide-line-without-margin"> </div><div class="price-show"><div class="real-pay">实付款：￥' + orderobj.payje + '</div><div  value="' + orderobj.ordno + "," + orderobj.cpmx[i].ordnox + '" class="order-button1">申请售后</div></div></div>';
			} else if (pagefromfunction == "lookforwuliu") {
				strs += '<div class="order-msg-items"><div class="orderstatus"><div class="order-number">' + orderobj.cpmx[i].ordnox + '</div><div class="order-status-text">' + orderstatus + '</div> </div><div class="divide-line-without-margin"></div><div class="order-img-one"><div class="imgs-product"></div><div class="right-prodcut-msg">' + orderobj.fcpmc + '</div><div class="singe-price-num"> ￥' + dj + ' &nbsp;&nbsp;X ' + orderobj.cpmx[i].osl + '</div></div><div class="divide-line-without-margin"> </div><div class="price-show"><div class="real-pay">实付款：￥' + orderobj.payje + '</div><div  value="' + orderobj.ordno + "," + orderobj.cpmx[i].ordnox + '" class="order-button1">查看物流</div></div></div>';

			}
		}
		$('.parent-add').empty();
		$('.parent-add').append(strs);
		loadpicture2();
		if (pagefromfunction == "ensurepackage") {
			changebottomcolor();
		} else if (pagefromfunction == "applySellAfter") {
			changesaleaftercolor();
		}

	}
	/**
	 * * 个人中心退换和售后按钮的颜色
	 *
	 * */

function changesaleaftercolor() {
		var imgs = $('.parent-add .order-button1');
		for (var i = 0; i < orderobj.cpmx.length; i++) {
			//console.log("订单号：" + orderobj.cpmx[i].ordnox + " ，订单状态：" + orderobj.cpmx[i].ordzt);
			if (orderobj.cpmx[i].ordzt == 5 || orderobj.cpmx[i].ordzt == 6 || orderobj.cpmx[i].ordzt == 8 || orderobj.cpmx[i].ordzt == 9) {
				$('.parent-add').find(imgs[i]).removeClass("order-button1");
				$('.parent-add').find(imgs[i]).addClass('order-button1-unvisiable');
			}
		}
	}
	/**
	 * *如果这个产品已经收获了，则让他不可点
	 */

function changebottomcolor() {
	var imgs = $('.parent-add .order-button1');
	for (var i = 0; i < orderobj.cpmx.length; i++) {
		console.log("订单号：" + orderobj.cpmx[i].ordnox + " ，订单状态：" + orderobj.cpmx[i].ordzt);
		if (orderobj.cpmx[i].ordzt == 2 || orderobj.cpmx[i].ordzt == 3) {
			$('.parent-add').find(imgs[i]).removeClass("order-button1");
			$('.parent-add').find(imgs[i]).addClass('order-button1-unvisiable');
		}
	}
}

function getdj2(orderobj, i) {
		var je = Number(orderobj.cpmx[i].oje);
		var sl = Number(orderobj.cpmx[i].osl);
		return je / sl;

	}
	/***
	 * 二级页面图片的加载
	 *
	 */

function loadpicture2() {
	var imgs = $(".parent-add .imgs-product");
	for (var j = 0; j < orderobj.cpmx.length; j++) {
		$('.parent-add').find(imgs[j]).css('background-image', "url(" + orderobj.cpmx[j].cppic + ")");
	}
}

function onclickButton1(orderno, element) {
    console.log("pagefromfunction:"+pagefromfunction);
	switch (pagefromfunction) {
		case "ensurepackage":
			var btnArray = ['确定', '取消'];
			mui.confirm("是否确认收货？", "提示", btnArray, function(e) {
				if (e.index == 0) {
					console.log("确认收货订单号：" + orderno);
					ensurGetPackage(orderno, element);
				} else if (e.index == 1) {

				}
			});
			break;
		case "goevalute": //去评价

			break;
		case "applySellAfter": //售后
			console.log("申请售后" + element);
			refundpage.show();
			var smallorder = orderno.split(",");
			console.log("smallorder:" + smallorder[1]);
			var refundobj;
			for (var i = 0; i < orderobj.cpmx.length; i++) {
				console.log("order1:" + orderobj.cpmx[i].ordnox + "order2:" + smallorder[1]);
				if (orderobj.cpmx[i].ordnox == smallorder[1]) {
					refundobj = orderobj.cpmx[i];
					break;
				}
			}
			var refundpages = plus.webview.getWebviewById("refund-sub");
			mui.fire(refundpages, "refundmsg", {
				"refundobj": refundobj,
				"orderno": orderno
			})
			console.log("heheeh:" + refundpages);
			break;
		case "lookforwuliu":
		   // getwuliuordermx();
			
			var smallorder = orderno.split(",");
			console.log("ggg:"+smallorder[1]);
			checkedwuliusubpage=plus.webview.getWebviewById("checkedwuliu-sub");
			mui.fire(checkedwuliusubpage,"postorderchild",{
				"smallorder":smallorder[1]
			});
			checkedwuliupage.show();
			break;
	}

}


function onclickButton2() {
	switch (pagefromfunction) {
		case lookforwuliu:
			window.open("http://app.teambuy.com.cn/webc/m/tmlog/id/114");
			break;
	}

}

function ensurGetPackage(orderno, elements) {
	console.log("gogo" + orderno);
	orderno = orderno.split(",");
	var bigOrdno = orderno[0];
	var smallOrdno = orderno[1];
	var token = plus.storage.getItem("token");
	var sessid = plus.storage.getItem("sessid");
	var url = "http://app.teambuy.com.cn/apnc/m/tmord/a/ordrecgoods";
	$.post(url, {
		"acctoken": token,
		"sessid": sessid,
		"ordno": bigOrdno,
		"onox": smallOrdno
	}, function(result) {
		console.log("确认收获：" + JSON.stringify(result));
		if (result.ret == '1') {
			mui.toast('确认收获成功');
			// console.log("this"+JSON.stringify(this));
			//this.style.display="none";
			// this.setAttribute("display","none");
			var mainpage = plus.webview.getLaunchWebview();
			elements.setAttribute("class", "order-button1-unvisiable");
			mui.fire(mainpage, "refreshmyOrder", {});
		}
	}, "json");
}