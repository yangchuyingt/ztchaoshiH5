function changetabs() {
	//document.querySelector('#setdefult-address').className='defult-image-select2';
	if (beforposition != currentposition) {
		//console.log('buxiangdeng');
		document.querySelector('#tab' + beforposition).className = 'img' + beforposition + '2';
		document.querySelector('#text' + beforposition).className = 'text-not-select';
		document.querySelector('#tab' + currentposition).className = 'img' + currentposition;
		document.querySelector('#text' + currentposition).className = 'bootom-item-text';
		beforposition = currentposition;
		loadtabsmsg();
	} else {
		//console.log('xiangdeng'+beforposition+','+currentposition);
	}
}

function loadtabsmsg() {
	//console.log("hhhhh" + currentposition);
	switch (currentposition) {
		case '0':
			break;
		case '1':
			// console.log('分类');
			getcatfromdatabase();
			loadcategory();
			break;
		case '2':
			loadshopcartmsg();
			break;
		case '3':
			loadUserCouponmsg();
			break;
	}
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
				flag = true;
			}
			ht += '<div id="' + i + '" value="' + data.rows.item(i)._id + '" class="category-left-menu-item">' + data.rows.item(i)._lbname + '</div>';
		}
		console.log("dbht:" + ht);
		$("#left-menu").empty();
		$("#left-menu").append(ht);
		$("#left-menu").children('div').eq(0).removeClass('category-left-menu-item');
		$("#left-menu").children('div').eq(0).addClass('category-left-menu-item2');
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
		"lbid": lbid
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
	var str="";
	if (shopcartmsgjson) {
		for (var i = 0; i <shopcartmsgjson.length;i++) {
			str+= '<div  class="shop-cart-content-have-order-item"><div class="divide-line-without-margin"></div><div class="shopcart-shopname">' + shopcartmsgjson[i].shopname + '</div><div class="divide-line-without-margin"></div><div class="product-items"><div value="'+i+'" class="product-items-select"><img src="css/img/product_unselect.png"   class="img-select"/></div><div class="shopcart-product-img"></div><div calss="shopcart-product-msg"><div class="shopcart-production-text">' + shopcartmsgjson[i].cpmc + '</div><div class="px-13">￥' + shopcartmsgjson[i].je + '</div><div class="change-buy-num"><div value="'+shopcartmsgjson[i].ctid+","+shopcartmsgjson[i].sl+'" class="shopcart-buy-num-sub"></div><div class="shopcart-buy-num-show">'+shopcartmsgjson[i].sl+'</div><div value="'+shopcartmsgjson[i].ctid+","+shopcartmsgjson[i].sl+'" class="shopcart-buy-num-add"></div></div></div></div></div>';
		}
		console.log(shopcartmsgjson.length+","+str);
		$(".shop-cart-content-have-order").empty();
		$(".shop-cart-content-have-order").append(str);

	} else {
       console.log("没数据");
	}
}
/**
 * 判断数组中是否存在此位置
 * 
 */
 
function contains(position){
	
	for(var i=0;i<shopcartpositlist.length;i++){
		console.log("position:"+position+"shopcartpositlist[i]"+shopcartpositlist[i]);
		if(shopcartpositlist[i]==position){
			return i;
		}
	}
}
function changebuynum(ctid,sl){
	    var token = plus.storage.getItem("token");
		var sessid = plus.storage.getItem("sessid");
		var url = "http://app.teambuy.com.cn/apnc/m/tmord/a/editcart";
		$.post(url, {
				acctoken: token,
				"sessid": sessid,
				"ctid":ctid,
				"tmsl":sl
			},
			function(result) {
				console.log('changenum:' + JSON.stringify(result));
				if(result.ret=='1'){
					loadshopcartmsg();
				}
			}, "json");
}
function jisuanallprice(){//shopcartmsgjson
	var allprice=0;
	for(var i=0,i<=shopcartpositlist.length;i++){
		if(shopcartpositlist[i]!=-2){
			allprice+=shopcartmsgjson[shopcartpositlist[i]].je;
		}
	}
	$('.heji-price').text('￥'+allprice);
	console.log('allprice'+allPrice);
}
