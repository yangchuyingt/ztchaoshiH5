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
function getmainpageadata(){//从主页过来的时候走这个函数
	var url="http://app.teambuy.com.cn/apnc/m/temai/a/gettemai";
	console.log("meizou:"+tmid);
	$.post(url,{
		'tmid':tmid
	},function(result){
		console.log("tmid:"+JSON.stringify(result));
		if(result.ret=='1'){
			//addview(result.data);
			categoryProductshow(result.data, 0);
		}
	},"json");
}
function getdatafromnet() {//从分类过来的走这个函数
	console.log('cpdl:'+cup+'cpxl:'+lbid);
	var url = "http://app.teambuy.com.cn/apnc/m/temai/a/gettemai";
	$.post(url, {
		'cpdl':cup,
		'cpxl': lbid
		
	}, function(result) {
		console.log("加载分类：" + JSON.stringify(result));
		if (result.ret == '1') {
			categoryProductshow(result.data, 0);
		}
	}, "json");
}

function categoryProductshow(data, page) {
	var res = '';
	var title2;
	console.log("data:"+JSON.stringify(data));
	//console.log("datalength:"+data[0].tmid);
	for (var i = 0; i < data.length; i++) {
		//console.log("data[i+1]:"+JSON.stringify(data[i+1]));
		if(data[i+1]==undefined){
			res += '<tr>' + '<td   value="' + data[i].tmid + '"' + '>' + '<div  id="product-item' + (page * 10 + i) + '"' + 'class="td-product-item">' + '<div id="product-img-item' + (page * 10 + i) + '"' + 'class="td-product-item-img"></div>' + '<div class="td-product-item-title">' + data[i].title + '</div>' + '<div class="td-product-item-price">' + '<div class="td-product-item-nowprice">￥' + data[i].tmdj + '</div>' + '<div class="td-product-item-beforprice">￥' + data[i].dj0 + '</div>' + '</div>' + '</div>' + '</td>' + '<td value="' + data[0].tmid + '"' + '>' + '<div id="product-item' + (page * 10 + i + 1) + '"' + 'class="td-product-item">' + '<div id="product-img-item' + (page * 10 + i + 1) + '"' + 'class="td-product-item-img"></div>' + '<div class="td-product-item-title">' + data[0].title + '</div>' + '<div class="td-product-item-price">' + '<div class="td-product-item-nowprice">' + "￥" + data[0].tmdj + '</div>' + '<div class="td-product-item-beforprice">' + "￥" + data[0].dj0 + '</div>' + '</div>' + '</div>' + '</td>' + '</tr>'
		}else{
			res += '<tr>' + '<td   value="' + data[i].tmid + '"' + '>' + '<div  id="product-item' + (page * 10 + i) + '"' + 'class="td-product-item">' + '<div id="product-img-item' + (page * 10 + i) + '"' + 'class="td-product-item-img"></div>' + '<div class="td-product-item-title">' + data[i].title + '</div>' + '<div class="td-product-item-price">' + '<div class="td-product-item-nowprice">￥' + data[i].tmdj + '</div>' + '<div class="td-product-item-beforprice">￥' + data[i].dj0 + '</div>' + '</div>' + '</div>' + '</td>' + '<td value="' + data[i + 1].tmid + '"' + '>' + '<div id="product-item' + (page * 10 + i + 1) + '"' + 'class="td-product-item">' + '<div id="product-img-item' + (page * 10 + i + 1) + '"' + 'class="td-product-item-img"></div>' + '<div class="td-product-item-title">' + data[i + 1].title + '</div>' + '<div class="td-product-item-price">' + '<div class="td-product-item-nowprice">' + "￥" + data[i + 1].tmdj + '</div>' + '<div class="td-product-item-beforprice">' + "￥" + data[i + 1].dj0 + '</div>' + '</div>' + '</div>' + '</td>' + '</tr>'

		}
			   i++;
	}
	$("#table-product-list ").empty();
	$("#table-product-list").append(res);
	for (var i = 0; i < data.length; i++) {
		$("#product-img-item" + (page * 10 + i)).css("background-image", "url(" + data[i].picurl + ")");
	}
	if(data.length%2==1){
		$("#product-img-item" + data.length).css("background-image", "url(" + data[0].picurl + ")");
	}
}