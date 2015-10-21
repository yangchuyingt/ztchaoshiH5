function changetabs() {
	//document.querySelector('#setdefult-address').className='defult-image-select2';
	if (beforposition != currentposition) {
		loadtabsmsg();
		console.log('buxiangdeng');
		document.querySelector('#tab' + beforposition).className = 'img' + beforposition + '2';
		document.querySelector('#text' + beforposition).className = 'text-not-select';
		document.querySelector('#tab' + currentposition).className = 'img' + currentposition;
		document.querySelector('#text' + currentposition).className = 'bootom-item-text';
		beforposition = currentposition;
		
	} else {
		//console.log('xiangdeng'+beforposition+','+currentposition);
	}
}

function loadtabsmsg() {
	//console.log("hhhhh" + currentposition);
	switch (currentposition+'') {
		case '0':
			break;
		case '1':
			// console.log('分类');
			getcatfromdatabase();
			loadcategory();
			break;
		case '2':
		 //  console.log('走了，，');
			loadshopcartmsg();
			break;
		case '3':
			loadUserCouponmsg();
			loadUserordermsg();
			break;
			default:
			console.log("哪个位置也不是");
			break;
	}
	befor_left_item='0';
}

function loadcategory() {
	var url = "http://app.teambuy.com.cn/apnc/m/temai/a/gettmlb";
	$.post(url, {}, function(result) {
		putResultTodb(result);
		showleftfromnet(result);
		//console.log("ttt:"+JSON.stringify(result));
	}, "json");
}

function putResultTodb(results) {
		//console.log("put result to db");
		//create table tm_category ( _id integer primary key AUTOINCREMENT,  _cpsl varchar(5),  _cup varchar(5), _icon varchar(20), _lbname varchar(20))';
		var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
		var deletesql = 'DELETE FROM tm_category';
		var insert_sql = 'insert into tm_category(_id ,_cpsl,_cup,_icon, _lbname,_spsl) VALUES(?,?,?,?,?,?)';
		db.transaction(function(tx) {
			tx.executeSql(deletesql, [], function(tx, result) {
				//console.log("delete success!"+JSON.stringify(result));
				for (var i = 0; i < results.data.length; i++) {
					tx.executeSql(insert_sql, [results.data[i].lbid, results.data[i].cpsl, results.data[i].cup, results.data[i].icon, results.data[i].lbname, results.data[i].spsl], function(tx, result) {
						//Sconsole.log("ycy"+JSON.stringify(result));
					});
				}
			}, function(tx, result) {
				console.log("shanchu:" + JSON.stringify(result));
			})

		});

	}
	/*
	 *从数据库获取分类然后显示出来
	 * //$("#table-product-list ").empty();
	 * $("#table-product-list").append(result);
	 * */

function getcatfromdatabase() {
		//console.log("从数据库获取分类然后显示出来");
		var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
		var left_sql = "select _id,_lbname from tm_category where _cup=0";
		db.transaction(function(tx) {
			tx.executeSql(left_sql, [], function(tx, reslut) {
				showleftview(reslut);
			}, function(tx, result) {
				console.log("category:" + JSON.stringify(result));
			});
		});

	}
	/*
	 *
	 * 从网上获取的数据显示在左边的菜单
	 *
	 */

function showleftfromnet(data) {
	var flag;
	var ht = '';
	var j = 0;
	for (var i = 0; i < data.data.length; i++) {
		if (data.data[i].cup != '0') {
			continue;
		}
		if (!flag) {
			category_big = data.data[i].lbid;
			currentcup=category_big;
			flag = true;
		}
		ht += '<div id ="' + j + '" value="' + data.data[i].lbid + '" class="category-left-menu-item">' + data.data[i].lbname + '</div>';
		j++;
	}
	//console.log("netht:" + ht);
	$("#left-menu").empty();
	$("#left-menu").append(ht);
	$("#left-menu").children('div').eq(0).removeClass('category-left-menu-item');
	$("#left-menu").children('div').eq(0).addClass('category-left-menu-item2');
	showrightfromnet(data); //从网上加载数据以后了，显示右边的，分类
}

function showrightfromnet(data) {
	var ht = '';
	for (var i = 0; i < data.data.length; i++) {

		if (data.data[i].cup == category_big) {
			
			
			ht += '<div value="' + data.data[i].lbid + '" class="right-cat-item"><img class="right-catgory-img" src="' + data.data[i].icon + '"/><div class="right-catgory-text">' + data.data[i].lbname + '</div></div>';
		}

	}
	$("#right-catagory").empty();
	$("#right-catagory").append(ht);


}

function showleftview(data) { //results.rows.item(i).name
		var ht = '';
		var flag;
		//console.log("分类的长度："+data.rows.length);
		for (var i = 0; i < data.rows.length; i++) { //<div class="category-left-menu-item">女装</div>
			if (!flag) {
				category_big = data.rows.item(i)._id;
				currentcup=category_big;
				flag = true;
			}
			ht += '<div id="' + i + '" value="' + data.rows.item(i)._id + '" class="category-left-menu-item">' + data.rows.item(i)._lbname + '</div>';
		}
		console.log("dbht:" + ht);
		$("#left-menu").empty();
		$("#left-menu").append(ht);
		$("#left-menu").children('div').eq(0).removeClass('category-left-menu-item');
		$("#left-menu").children('div').eq(0).addClass('category-left-menu-item2');
		//console.log("category_big"+category_big);
		getRightCatFromDb(category_big);

	}
	/*
	 * 从数据库获取又不的分类；
	 *
	 *
	 */

function getRightCatFromDb(cup) {
		//console.log("right-category");
		var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
		var right_sql = 'select _id,_lbname,_icon from tm_category where _cup=' + cup;
		db.transaction(function(tx) {
			tx.executeSql(right_sql, [], function(tx, result) {
				var rightHt = '';
				//console.log('rightlength:' + result.rows.length + 'cup:' + cup);
				for (var i = 0; i < result.rows.length; i++) {
					rightHt += '<div value="' + result.rows.item(i)._id + '" class="right-cat-item"><img class="right-catgory-img" src="' + result.rows.item(i)._icon + '"/><div class="right-catgory-text">' + result.rows.item(i)._lbname + '</div></div>';
				}
				//Sconsole.log('rightht:' + rightHt);
				$("#right-catagory").empty();
				$("#right-catagory").append(rightHt);
			}, function(tx, result) {
				console.log("category:" + JSON.stringify(result));
			});
		});

	}
	/**
	 * 此方法是跳转到产品列表的页面
	 *
	 */

function toCategorylist(lbid) {
	console.log("类别id有：" + lbid);
	productlistPage.show();
	var page = plus.webview.getWebviewById("production_list");
	mui.fire(page, 'postlbid', {
		"lbid": lbid,
		"cup":category_big
	})
}

function changeleftcss() {
	//document.querySelector('#left-menu').className =''
	//console.log(nowposition==beforepostion);
	if (current_left_item != befor_left_item) {
		$("#left-menu").children('div').eq(Number(befor_left_item)).removeClass('category-left-menu-item2');
		$("#left-menu").children('div').eq(Number(befor_left_item)).addClass('category-left-menu-item');
		$("#left-menu").children('div').eq(Number(current_left_item)).removeClass('category-left-menu-item');
		$("#left-menu").children('div').eq(Number(current_left_item)).addClass('category-left-menu-item2');
		// console.log($('#left-menu').children()[1].text()); 
		befor_left_item = current_left_item;
		//console.log("hehe:"+current_left_item+','+befor_left_item);
	}
}

function showUserMsgInMe() {
	var avator = plus.storage.getItem("avatar");
	//$("#img" + i).css("background-image", "url(" + url + ")");
	$('#user-protrait').css('background-image', "url(" + avator + ")");

}

function loadUserCouponmsg() {
	var url = "http://app.teambuy.com.cn/apnc/m/my/a/getmyinfo";
	var token = plus.storage.getItem("token");
	var sessid = plus.storage.getItem("sessid");
	$.post(url, {
		acctoken: token,
		"sessid": sessid
	}, function(result) {
		if (result.ret == 1) {
			$("#tuanbi-num").text(result.data.tbmoney);
			$('#coupon-num').text(result.data.quan);
		}
		//console.log("ttt:"+JSON.stringify(result));
	}, "json");
}

function setuserpatrait() {
	plus.gallery.pick(function(path) {
		console.log(path);
	}, function() {
		console.log("失败")
	}, {
		filter: "image"
	});
}

function loadshopcartmsg() {
	// console.log('从服务器端请求数据');
		var token = plus.storage.getItem("token");
		var sessid = plus.storage.getItem("sessid");
		var url = "http://app.teambuy.com.cn/apnc/m/tmord/a/getcart";
		$.post(url, {
				acctoken: token,
				"sessid": sessid
			},
			function(result) {
				if (result.ret == '1') {
					shopcartmsgjson = result.data;
					$('.shop-cart-content-without-order').hide();
					$('.shopcart-jie-suan').show();
					dealshopcartmsg();
				}
				console.log('shopcart:' + JSON.stringify(result));
			}, "json");
	}
	/*
	 * 处理购物车的显示
	 *
	 */

function dealshopcartmsg() {
		var str = "";
		if (shopcartmsgjson) {
			for (var i = 0; i < shopcartmsgjson.length; i++) {
				str += '<div  class="shop-cart-content-have-order-item"><div class="divide-line-without-margin"></div><div class="shopcart-shopname">' + shopcartmsgjson[i].shopname + '</div><div class="divide-line-without-margin"></div><div class="product-items"><div value="' + i + '" class="product-items-select"><img src="css/img/product_unselect.png"   class="img-select"/></div><div class="shopcart-product-img"></div><div calss="shopcart-product-msg"><div class="shopcart-production-text">' + shopcartmsgjson[i].cpmc + '</div><div class="px-13">￥' + shopcartmsgjson[i].je + '</div><div class="change-buy-num"><div value="' + shopcartmsgjson[i].ctid + "," + shopcartmsgjson[i].sl + '" class="shopcart-buy-num-sub"></div><div class="shopcart-buy-num-show">' + shopcartmsgjson[i].sl + '</div><div value="' + shopcartmsgjson[i].ctid + "," + shopcartmsgjson[i].sl + '" class="shopcart-buy-num-add"></div></div></div></div></div>';
			}
			//console.log(shopcartmsgjson.length + "," + str);
			$(".shop-cart-content-have-order").empty();
			$(".shop-cart-content-have-order").append(str);
             var  items= $('.shop-cart-content-have-order .shopcart-product-img');
             //console.log("items"+items);
            	 for(var i=0;i<shopcartmsgjson.length;i++){
            	 $('.shop-cart-content-have-order').find(items[i]).css('background-image', "url(" + shopcartmsgjson[i].cppic + ")");
            	  //console.log("item["+i+']'+ $('.shop-cart-content-have-order').find(items[i]).length);
            	 }
		} else {
			console.log("没数据");
		}
	}
	/**
	 * 判断数组中是否存在此位置
	 *
	 */

function contains(position) {

	for (var i = 0; i < shopcartpositlist.length; i++) {
		console.log("position:" + position + "shopcartpositlist[i]" + shopcartpositlist[i]);
		if (shopcartpositlist[i] == position) {
			return i;
		}
	}
}

function changebuynum(ctid, sl) {
	var token = plus.storage.getItem("token");
	var sessid = plus.storage.getItem("sessid");
	var url = "http://app.teambuy.com.cn/apnc/m/tmord/a/editcart";
	$.post(url, {
			"acctoken": token,
			"sessid": sessid,
			"ctid": ctid,
			"tmsl": sl
		},
		function(result) {
			console.log('changenum:' + JSON.stringify(result));
			if (result.ret == '1') {
				loadshopcartmsg();
			}
		}, "json");
}

function jisuanallprice() { //shopcartmsgjson
	 allprice = 0;
	 sl = 0;
	//console.log("shopca:"+shopcartpositlist)
	for (var i = 0; i < shopcartpositlist.length; i++) {
		if (shopcartpositlist[i] != -2) {
			sl++;
			//	console.log('i:'+i);
			//console.log('shopcartpositlist[]:'+shopcartpositlist[i]);
			//	console.log('obj:'+JSON.stringify(shopcartmsgjson[shopcartpositlist[i]]));
			allprice += Number(shopcartmsgjson[shopcartpositlist[i]].je);
		}
	}
	$('.heji-price').text('￥' + allprice);
	$('.jiesuan-bottom').text('结算（' + sl + '）');
	console.log('allprice:' + allprice);
}

function allProductInShopCart() {
		 allprice = 0;
		 sl = 0;
		if (!isseletallproduct) {
			isseletallproduct = true;
			$('#all-select-img').removeClass('img-unselect');
			$('#all-select-img').addClass('img-selected');
			//$('.shop-cart-content-have-order').find('img').src='css/img/product_selecet.png';
			$('.shop-cart-content-have-order').find('img').attr("src", "css/img/product_selecet.png");
			for (var i = 0; i < shopcartmsgjson.length; i++) {
				allprice += Number(shopcartmsgjson[i].je);
			}
			//console.log("changdu:" + shopcartmsgjson.length);
			sl = shopcartmsgjson.length;
			for(var i=0;i<shopcartmsgjson.length;i++){
				shopcartpositlist[i]=i;
			}
		} else {
			console.log('true');
			isseletallproduct = false;
			$('#all-select-img').removeClass('img-selected');
			$('#all-select-img').addClass('img-unselect'); //$("#img1").attr("src","Imges/test.jpg");
		
			$('.shop-cart-content-have-order').find('img').attr("src", "css/img/product_unselect.png") //src='css/img/product_unselecet.png';
			shopcartpositlist = new Array();
			sl = 0;
		}
		$('.heji-price').text('￥' + allprice);
		$('.jiesuan-bottom').text('结算（' + sl + '）');

	}
	/**
	 * *移除购物车内的产品
	 *
	 */

function removeshopcartproduct() {
	console.log('删除订单');
	var ctids = '';
	for (var i = 0; i < shopcartpositlist.length; i++) {
		if (shopcartpositlist[i] != -2) {
			ctids += shopcartmsgjson[shopcartpositlist[i]].ctid + ',';
			//allprice+=Number(shopcartmsgjson[shopcartpositlist[i]].je);
		}
		ctids = ctids.substr(0, ctids.length - 1);
	}
	var token = plus.storage.getItem("token");
	var sessid = plus.storage.getItem("sessid");
	var url = "http://app.teambuy.com.cn/apnc/m/tmord/a/delcart";
	$.post(url, {
			'acctoken': token,
			"sessid": sessid,
			"ctid": ctids,
		},
		function(result) {
			console.log('changenum:' + JSON.stringify(result));
			if (result.ret == '1') {
				shopcartpositlist = new Array();
				loadshopcartmsg();
				isseletallproduct = true;
				allProductInShopCart();
			}
		}, "json");
}

function gotojisuan() {
	mui.openWindow({
		url: 'examples/me/shopcartOrderMsg.html',
		id: 'shopcartOrderMsg',
		extras: {
			"ordermsg": shopcartmsgjson,
			"positionlist":shopcartpositlist,
			"je":allprice,
			"sl":sl
		},
	});
}
/*
 *加载用户订单信息
 * */
function loadUserordermsg(){
	console.log('zoule');
	var url="http://app.teambuy.com.cn/apnc/m/my/a/getmytmord";
	var token = plus.storage.getItem("token");
	var sessid = plus.storage.getItem("sessid");
	$.post(url,{
		'acctoken': token,
		"sessid": sessid
	},function(result){
		console.log("所有的订单："+JSON.stringify(result));
		page=plus.webview.getWebviewById('waitpay-sub');
			mui.fire(page,'getallorders',{
			   'orders':result
			});
	},'json');
}
