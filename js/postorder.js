/*
 *显示定订单信息
 *
 * */
function showOrderProductMsg(result) {
		//$("#product-img" + i).css("background-image", "url(" + picturls[i].split("|")[0] + ")");
		//console.log("picturl:"+result.rows.item(0)._picurl+",title:"+result.rows.item(0)._title+",tmdj:"+result.rows.item(0)._tmdj)
		$("#order-msg-img").css("background-image", "url(" + result.rows.item(0)._picurl + ")");
		//console.log("picturl:"+result.rows.item(0)._picurl);
		$("#right-product-title").text(result.rows.item(0)._title);
		$("#order-price").text("价格：￥" + result.rows.item(0)._tmdj);
		$("#xiaoji").text("￥" + result.rows.item(0)._tmdj);
		$("#all-price").text("￥" + result.rows.item(0)._tmdj);
		$("#store-number").text("库存：" + result.rows.item(0)._kcsl + "件");
		//console.log(result.rows.item(0)._kcsl);

	}
	/*
	 *获取产品的库存数量
	 *
	 * */

function getkucunshuliang() {
		var num = $("#store-number").text();
		num = num.substring(3, num.length - 1);
		var kusl = Number(num);
		//console.log("kucun:" + kusl);
		return kusl;
	}
	/*
	 *增加购买数量
	 *
	 * */

function addbuynum(buynum, kucun) {

		if (buynum >= kucun) {
			return;
		} else {
			buynum++;
			$("#buy-number-show").text(buynum);

		}
		console.log("buynum:" + buynum);

	}
	/*
	 *
	 * 减少购买数量
	 * */

function subbuynum(buynum) {
	if (buynum <= 1) {
		return;
	} else {
		buynum--;
		$("#buy-number-show").text(buynum);
	}
	console.log("buynum:" + buynum);
}

function getsingleprice() {
	var text = $("#order-price").text();
	//console.log(text);
	text = text.substring(4, text.length);
	//console.log(text);
	var price = Number(text);
	//console.log("---"+price);
	return price;
}

function gotoaddresspage() {
		mui.openWindow({
			url: 'congsigneeaddress.html',
			id: 'congsigneeaddress',
			styles: {
				
			},
		});
	}
	/*
	 * 获取地址信息
	 *
	 *
	 * */

function loadaddressmsg(loginpage) {
		console.log("加载地址信息");
		//http://app.teambuy.com.cn/apnc/m/cpord/a/getaddress
		var url = "http://appd.teambuy.com.cn/apc/m/cpord/a/getaddress";
		//plus.storage.setItem("token", result.sessid);
		var token = plus.storage.getItem("token");
		var sessid = plus.storage.getItem("sessid");
		//console.log("token:"+token);
		$.post(url, {
			acctoken: token,
			"sessid": sessid
		}, function(result) {
			//plus.storage.setItem("token", result.sessid);
			//console.log(JSON.stringify(result));
			console.log(result.ret);
			if (result.ret == "-2") {
				loginpage.show();
				//setTimeout(openloginpage(),1000);
				/*console.log("hehe");
				mui.openWindow({
					url: '../me/login.html',
					id: 'login',
					styles: {},
					extras: {
						"pagenameid": "postorder",
					}
					
				});*/
			} else if (result.ret == "-1") {
				console.log("-1");
			} else {
				saveaddressmsg(result);
				dealAddressMsg(result);
			}
		}, "json");
	}
	/*
	 * 保存地址信息到数据库
	 * */

function saveaddressmsg(result) {
		var data = result.data;
		var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
		var sql = "insert into ADDRESS_MSG(_id ,_address ,_carea  , _city , _isdef ,_province ,_sendid ,_tel ,_truename ,_username ,_zipcode )values(?,?,?,?,?,?,?,?,?,?,?)";
		db.transaction(function(tx) {
			for (var i = 0; i < data.length; i++) {
				tx.executeSql(sql, [data[i].uaid, data[i].address, data[i].carea, data[i].city, data[i].isdef, data[i].province, data[i].sendid, data[i].tel, data[i].truename, data[i].username, data[i].zipcode]);
			}
		}, function() {
			console.log("地址插入数据库成功");
		}, function(tx, error) {
			console.log("error:" + error);
		});
	}
	/*
	 * 将默认地址信息显示到订单上
	 * @uaid true 选择指定的地址，false 选择默认地址
	 *
	 * */

function dealAddressMsg(uaid) {
	var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
	var sql1 = "select _id,_address,_tel,_truename from ADDRESS_MSG where _isdef=1";
	var sql2 = "select _address,_tel,_truename from ADDRESS_MSG where  _id=?"
	if (!uaid) {
		db.transaction(function(tx) {
			tx.executeSql(sql1, [], function(tx, result) {

				//results.rows.item(i).name
				if (result.rows.length <= 0) {
					return;
				} else {
					$("#no-defult-address").hide();
					$("#hava-defult-address").show();
				}


				$("#name-and-tell").text(result.rows.item(0)._truename + "  " + result.rows.item(0)._tel);
				$("#detial-address").text(result.rows.item(0)._address);
				addressid=result.rows.item(0)._id;
			}, function(tx, error) {
				$("#no-defult-address").show();
				$("#hava-defult-address").hide();
				console.log(error.message);
			}, null);
		});
	} else {
		db.transaction(function(tx) {
			tx.executeSql(sql2, [uaid], function(tx, result) { //results.rows.item(i).name
				$("#no-defult-address").hide();
				$("#hava-defult-address").show();
				$("#name-and-tell").text(result.rows.item(0)._truename + "  " + result.rows.item(0)._tel);
				$("#detial-address").text(result.rows.item(0)._address);
			}, function(tx, error) {
				$("#no-defult-address").show();
				$("#hava-defult-address").hide();
				console.log(error.message);
			}, null);
		});
	}
}

function showpaymoneypage(paymoneypage, allPrice,orderno) {
	var paymoneyPage = plus.webview.getWebviewById('paymoney');
	/* mui.openWindow({
				url: 'paymoney.html',
				id: 'paymoney',
				styles: {},
				extras: {
					"allPrice": allPrice,
				}
			});*/
	paymoneypage.show();
	mui.fire(paymoneyPage, 'getprice', {
		aa: allPrice,
		ordno:orderno
	});
}

function posterordermethod(id, sl, cm, addressid, sendm, shopmess, allPrice) {
	console.log("chima:"+sendm);
	var sql1 = "select * from PRODUCT_LIST where _id=?";
	var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
	db.transaction(function(tx) {
		tx.executeSql(sql1, [id], function(tx, result) { //results.rows.item(i).name
			var shopid = result.rows.item(0)._shopid;
			var cpmc = result.rows.item(0)._title;
			var cppic = result.rows.item(0)._picurl;
			var dj = result.rows.item(0)._tmdj;
			var cpmx = '{"'+shopid+'":{"'+id+'":{"cmpc":"'+ cpmc+'","cppic":"'+ cppic+'","dj": "'+dj+'","je":"'+ allPrice+'","cm":"'+ cm+'","sl":"'+ sl+'"}}}';
			console.log("cpmx:" + cpmx);
			var token = plus.storage.getItem("token");
		    var sessid = plus.storage.getItem("sessid");
		           //http://app.teambuy.com.cn/apnc/m/tmord/a/createtmorder
			var url="http://app.teambuy.com.cn/apnc/m/tmord/a/createtmorder"
			$.post(url, {
				"acctoken": token,
				"sessid": sessid,
				"addrid": addressid,
				"paym": "",
				"sendm": sendm,
				"fapiao": "",
				"lngo": "",
				"lato": "",
				"shopmess": shopmess,
				"shop": shopid,
				"cpmx":cpmx
			}, function(result) {
				console.log("result:" + JSON.stringify(result));
				if(result.ret==1){
				var orderno =result.data.ordno;
				showpaymoneypage(paymoneypage,allPrice,orderno);
				
				}else if(result.ret==-2){
					loginpage.show();
				}
			}, "json");
		}, function(tx, error) {
			console.log(error.message);
		}, null);
	});
}


/*function openloginpage(){
	     console.log("hehe");
			mui.openWindow({
				url: '../me/login.html',
				id: 'login',
				styles: {},
				extras: {
					"pagenameid": "postorder",
				}
				
			});
}*/