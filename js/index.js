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
		    console.log('分类');
		    getcatfromdatabase();
			loadcategory();
			break;
		case '2':
			break;
		case '3':
			break;
	}
}

function loadcategory() {
	var url = "http://app.teambuy.com.cn/apnc/m/temai/a/gettmlb";
	$.post(url, {}, function(result) {
		putResultTodb(result);
		console.log("ttt:"+JSON.stringify(result));
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
			console.log("delete success!"+JSON.stringify(result));
			for(var i=0;i<results.data.length;i++){
			tx.executeSql(insert_sql, [results.data[i].lbid,results.data[i].cpsl,results.data[i].cup,results.data[i].icon,results.data[i].lbname,results.data[i].spsl], function(tx, result) {
                   //Sconsole.log("ycy"+JSON.stringify(result));
				});
              }
			
		},function(tx,result){
			console.log("shanchu:"+JSON.stringify(result));
		})

	});

}
/*
 *从数据库获取分类然后显示出来
 * //$("#table-product-list ").empty();
 * $("#table-product-list").append(result);
 * */
function getcatfromdatabase(){
	console.log("从数据库获取分类然后显示出来");
	var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
	var left_sql="select _id,_lbname from tm_category where _cup=0";
	db.transaction(function(tx){
		tx.executeSql(left_sql,[],function(tx,reslut){
			showleftview(reslut);
		},function(tx,result){
			console.log("category:"+JSON.stringify(result));
		});
	});
	
}
function showleftview(data){//results.rows.item(i).name
  var ht='';
 // console.log("分类的长度："+data.rows.length);
   for(var i=0;i<data.rows.length;i++){//<div class="category-left-menu-item">女装</div>
		ht+='<div class="category-left-menu-item">'+data.rows.item(i)._lbname +'</div>';
	}
	$("#left-menu").empty();
	$("#left-menu").append(ht);
}
