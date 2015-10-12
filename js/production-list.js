//function  getdatafromdb(){
//	var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
//	var selectSql="select * from PRODUCT_LIST where _tmlb=?";
//	db.transaction(function(tx) {
//			tx.executeSql(selectSql, [lbid], function(tx, result) { //results.rows.item(i).name
//				//console.log("yyy" + results.rows.item(i).zonename);
//				console.log(JSON.stringify(result));
//			}, function(tx, error) {
//				console.log(JSON.stringify(error));
//			}, null);
//		});
//	
//}
function getdatafromnet() {
	console.log('cpdl:'+lbid);
	var url = "http://app.teambuy.com.cn/apnc/m/temai/a/gettemai";
	$.post(url, {
		'cpdl': 1
		
	}, function(result) {
		console.log("加载分类：" + JSON.stringify(result));
		if (result.ret == '1') {
			categoryProductshow(result.data, 0);
		}
	}, "json");
}

function categoryproductshow(data, page) {
	var res = '';
	for (var i = 0; i < data.length; i++) {
		res += '<tr>' + '<td   value="' + data[i].tmid + '"' + '>' + '<div  id="product-item' + (page * 10 + i) + '"' + 'class="td-product-item">' + '<div id="product-img-item' + (page * 10 + i) + '"' + 'class="td-product-item-img"></div>' + '<div class="td-product-item-title">' + data[i].title + '</div>' + '<div class="td-product-item-price">' + '<div class="td-product-item-nowprice">￥' + data[i].tmdj + '</div>' + '<div class="td-product-item-beforprice">￥' + data[i].dj0 + '</div>' + '</div>' + '</div>' + '</td>' + '<td value="' + data[i + 1].tmid + '"' + '>' + '<div id="product-item' + (page * 10 + i + 1) + '"' + 'class="td-product-item">' + '<div id="product-img-item' + (page * 10 + i + 1) + '"' + 'class="td-product-item-img"></div>' + '<div class="td-product-item-title">' + data[i + 1].title + '</div>' + '<div class="td-product-item-price">' + '<div class="td-product-item-nowprice">' + "￥" + data[i + 1].tmdj + '</div>' + '<div class="td-product-item-beforprice">' + "￥" + data[i + 1].dj0 + '</div>' + '</div>' + '</div>' + '</td>' + '</tr>'
	}
	$("#table-product-list ").empty();
	$("#table-product-list").append(result);
	for (var i = 0; i < data.length; i++) {
		$("#product-img-item" + (page * 10 + i)).css("background-image", "url(" + data[i].picurl + ")");
	}
}