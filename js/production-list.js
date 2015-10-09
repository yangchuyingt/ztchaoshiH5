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
function getdatafromnet(){
	var url="http://app.teambuy.com.cn/apnc/m/temai/a/gettemai";
	$.post(url,{'cpdl':lbid},function(result){
		console.log("加载分类："+JSON.stringify(result));
	},"json");
}