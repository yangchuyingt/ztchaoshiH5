var page = 0; //页数
var productionarray = new Array();

function showlunbotu(topadv) {
	var result = "";
	var url;
	var test;
	for (var i = 0; i < topadv.length; i++) {
		result += '	<div class="mui-slider-item"><div id=' + '"' + 'img' + i + '"' + '  class=" item-logo lun-bo-tu-img"/></div>';
	}
	$("#lun-bo-tus").children("div").remove();
	$("#lun-bo-tus").append(result);
	for (var i = 0; i < topadv.length; i++) {
		url = topadv[i][0];
		$("#img" + i).css("background-image", "url(" + url + ")");
	}
	mui("#slider").slider({
		interval: 3000
	});
}

function showmidadv(midadv) {

	$("#mid-adv-img1").attr("src", midadv[0][0]);
	$("#mid-adv-text1").html(midadv[0][3]);
	$("#mid-adv-img2").attr("src", midadv[1][0]);
	$("#mid-adv-text2").html(midadv[1][3]);
	$("#mid-adv-img3").attr("src", midadv[2][0]);
	$("#mid-adv-text3").html(midadv[2][3]);
	$("#mid-adv-img4").attr("src", midadv[3][0]);
	$("#mid-adv-text4").html(midadv[3][3]);
}

function showbottom(botadv) {
	$("#buttom-adv-left").css("background-image", "url(" + botadv[0][0] + ")");
	$("#buttom-adv-right-top").css("background-image", "url(" + botadv[1][0] + ")");
	$("#buttom-adv-right-bottom-inner1").css("background-image", "url(" + botadv[2][0] + ")");
	$("#buttom-adv-right-bottom-inner2").css("background-image", "url(" + botadv[3][0] + ")");
}

function loadproduct(data, page, clear) {
		var result = "";
		var len;
		if ((data.length % 2) == 0) {
			len = data.length;
		} else {
			len = data.length - 1;
		}
		for (var i = 0; i < data.length; i += 2) {

			result += '<tr>' + '<td   value="' + data[i].tmid  + '"' + '>' + '<div  id="product-item' + (page * 10 + i) + '"' + 'class="td-product-item">' + '<div id="product-img-item' + (page * 10 + i) + '"' + 'class="td-product-item-img"></div>' + '<div class="td-product-item-title">' + data[i].title + '</div>' + '<div class="td-product-item-price">' + '<div class="td-product-item-nowprice">￥' + data[i].tmdj + '</div>' + '<div class="td-product-item-beforprice">￥' + data[i].dj0 + '</div>' + '</div>' + '</div>' + '</td>' + '<td value="' + data[i + 1].tmid + '"' + '>' + '<div id="product-item' + (page * 10 + i + 1) + '"' + 'class="td-product-item">' + '<div id="product-img-item' + (page * 10 + i + 1) + '"' + 'class="td-product-item-img"></div>' + '<div class="td-product-item-title">' + data[i + 1].title + '</div>' + '<div class="td-product-item-price">' + '<div class="td-product-item-nowprice">' + "￥" + data[i + 1].tmdj + '</div>' + '<div class="td-product-item-beforprice">' + "￥" + data[i + 1].dj0 + '</div>' + '</div>' + '</div>' + '</td>' + '</tr>'
				/*productionarray[page*10+i]=data[i];
				productionarray[page*10+i+1]=data[i+1];
				console.log(productionarray[page*10+i].xh);
				console.log(productionarray[page*10+i+1].xh);*/
		}
		//console.log("reslut:"+result);
		if (clear) {
			$("#table-product-list ").empty();
			//$("#table-product-list").children("tr").remove();
		    

		}
		$("#table-product-list").append(result);
		for (var i = 0; i < data.length; i++) {
			$("#product-img-item" + (page * 10 + i)).css("background-image", "url(" + data[i].picurl + ")");
			/* var item=document.getElementById("product-img-item" + (page * 10+i));
			 if(item){
			 	item.addEventListener("tap",function(event){
			 		
			 	},false);
			 }else{
			 	console.log("is null");
			 }*/
		}
	}
	/*
	 *
	 *获取广告栏的数据
	 * */

function getadv() {
		var url = "http://app.teambuy.com.cn/apnc/m/sys/a/getappadv";
		$.post(url, {}, function(result) {
			showlunbotu(result.data.adv.tmindex.topad);
			showmidadv(result.data.adv.tmindex.cxzad);
			showbottom(result.data.adv.tmindex.zspad);
		}, "json");
	}
	/*
	 * 获取产品列表
	 * page :页数
	 * clear:当为true的时候清楚列表中的所有的产品数据
	 * */

function getproduct(page, clear, ispullup) {
	//console.log("getmainpage");
	var url = "http://app.teambuy.com.cn/apnc/m/temai/a/gettemai";
	$.post(url, {
		"page": page
	}, function(result) {
		var ret;
		//console.log(JSON.stringify(result));
		if (result.ret == "1") {
			loadproduct(result.data, page, clear);
			ret = "1";
		} else {
			ret = result;
		}
		if (ispullup) {
			finishpullup(ret);
		}

	}, "json");
}

function pulldownRefresh() {
	getadv();
	getproduct(0, true);
	page = 0;
	mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
	console.log("下拉刷新结束！");
}

function pullupRefresh() {
	console.log("pullupRefresh 执行了");
	getproduct(page + 1, false, true);
	//console.log(result);
	this.endPullupToRefresh(false);


}

function finishpullup(ret) {

		if ((typeof(ret) == "string") && (ret.trim() == "1")) {
			page = page + 1;
			mui('#pullup-container').pullRefresh().endPullupToRefresh(false);
			mui('#pullup-container').pullRefresh().refresh(true);
			// mui('#pullup-container').pullRefresh().refresh(true);
			//console.log("ret=1");
		} else {
			mui('#pullup-container').pullRefresh().endPullupToRefresh(true);
			console.log(JSON.stringify(ret));
		}
		console.log("上拉加载更多结束！");
	}
	/*
	 
	 * 中间四个广告栏的的点击事件
	 * 
	 * */

function clickmiddleadv(position) {
		console.log("中间广告：" + position);
		alert("dooamc");
	}
	/*
	 
	 * 最下边四块广告栏的点击事件
	 * */

function bottonAdvClick(Position) {
	console.log("底部的广告：" + Position);
}
function addlistlistener(){
	mui("#table-product-list").on('tap','td',function(event){
		var tmid=this.getAttribute('value');
		//console.log("tmid:"+tmid);
		mui.openWindow({
			url: 'examples/mainpage/productDetial.html',
			id: 'productDetial',
			styles: {
			},
			extras: {
				"tmid": tmid,
			},
		});
	});
	}
/*
 *点击事件对ios没有用，
 * 
 * */
//function productItemClick(tmid) {
//	console.log(tmid);
//	mui.openWindow({
//			url: 'examples/mainpage/productDetial.html',
//			id: 'productDetial',
//			styles: {
//				
//			},
//			extras: {
//				"tmid": tmid,
//			},
//		}
//
//	);
//
//}