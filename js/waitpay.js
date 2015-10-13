function showtitlenme() {
	console.log("df:" + pagestatus)
	switch (pagestatus) {
		case '0':
			console.log(0);
			$('.me-header-title').text("待付款");
			break;
		case '1':
			console.log(1);
			$('.me-header-title').text("待收货");
			break;
		case '2':
			console.log(2);
			$('.me-header-title').text("待评价");
			break;
		case '3':
			console.log(3);
			$('.me-header-title').text("售后");
			break;
	}
}

function displayorder() {
	if (retcode.length == 0 || pagefrom.length == 0) {
		return;
	} else {
		if (retcode == '-2') {

		} else if (retcode == '1') {
			if (pagefrom == '0') { //来自全部订单页面
				showallorders();
			}
		}
	}
}

function showallorders() {
	var strs = '';
	var orderstatus = '';
	var dj='0';
	var oneproduct = '<div class="order-msg-items"><div class="orderstatus"><div class="order-number">92501510132</div><div class="order-status-text">代付款</div> </div><div class="divide-line-without-margin"></div><div class="order-img-one"><div class="imgs-product"></div><div class="right-prodcut-msg">【盘小夫】全国首创吃喝二合一原味饼干奶茶，味饼干奶茶</div><div class="singe-price-num"> ￥68.00 &nbsp;&nbsp;X 1</div></div><div class="divide-line-without-margin"> </div><div class="price-show"><div class="real-pay">实付款：￥0</div></div></div>';
	var someproduct = '<div class="order-msg-items"><div class="orderstatus"><div class="order-number">92501510132</div><div class="order-status-text">代付款</div></div><div class="divide-line-without-margin"></div><div class="order-img-show"></div><div class="divide-line-without-margin"></div><div class="price-show"><div class="real-pay">实付款：￥0</div></div></div>';
	var productimg = '<div class="imgs-product"></div>';
	for (var key in allorders) {
		orderstatus=dealorderstatus(allorders[key].ordzt);
		dj=getdj(allorders[key]);
		if (allorders.cpmx.length == 1) {
			strs += '<div class="order-msg-items"><div class="orderstatus"><div class="order-number">' + key + '</div><div class="order-status-text">'+orderstatus+'</div> </div><div class="divide-line-without-margin"></div><div class="order-img-one"><div class="imgs-product"></div><div class="right-prodcut-msg">'+allorders[key].fcpmc+'</div><div class="singe-price-num"> ￥'+dj+' &nbsp;&nbsp;X '+allorders[key].ordsl+'</div></div><div class="divide-line-without-margin"> </div><div class="price-show"><div class="real-pay">实付款：￥'+allorders[key].payje+'</div></div></div>';
		} else {// 从购物车下单里边有很多商品的时候
			orderstatus=dealorderstatus(allorders[key].ordzt);
			var imgpic='';
			for(var j=0;j<allorders.cmpx.length;j++){
				imgpic+='<div class="imgs-product"></div>';
			}
          strs+='<div class="order-msg-items"><div class="orderstatus"><div class="order-number">'+key+'</div><div class="order-status-text">'+orderstatus+'</div></div><div class="divide-line-without-margin"></div><div class="order-img-show">'+imgpic+'</div><div class="divide-line-without-margin"></div><div class="price-show"><div class="real-pay">实付款：￥'+allorders[key].payje+'</div></div></div>';
		}
	}
	$('.parent-add').empty();
	$('.parent-add').append(strs);
}

function dealorderstatus(orderstatus) {
	switch (orderstatus) {
		case "0":
			return '代付款'；
		case "1":
			return '已付款'；
		case "2":
			return '已收货'；
		case "3":
			return '已评价'；
		case "4":
			return '已发货'；
		case "5":
			return '申请退款'；
		case "6":
			return '同意退款'；
		case "7":
			return '已签收'；
		case "8":
			return '已退款'；
		case "9":
			return '退款中'；
		default:
			return '未知状态'；

	}

}
function getdj(order){
	var je=Number(order.payje);
	var sl=Number(order.ordsl);
	return je/sl;
}
