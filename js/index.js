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
	console.log("hhhhh" + currentposition);
	switch (currentposition) {
		case '0':
			break;
		case '1':
		console.log('分类');
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

function putResultTodb(result) {
	console.log("put result to db");
	//create table tm_category ( _id integer primary key AUTOINCREMENT,  _cpsl varchar(5),  _cup varchar(5), _icon varchar(20), _lbname varchar(20))';
	var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
	var deletesql = 'DELETE FROM tm_category';
	var insert_sql = 'insert into tm_category(_id ,_cpsl,_cup,_icon, _lbname,_spsl) VALUES(?,?,?,?,?,?)';
	db.transaction(function(tx) {
		tx.executeSql(deletesql, [], function(tx, result) {
			console.log("delete success!"+JSON.stringify(result));
			tx.executeSql(insert_sql, [results.data[i].lbid,results.data[i].cpsl,results.data[i].cup,results.data[i].icon,results.data[i].lbname,results.data[i].spsl], function(tx, result) {
                   console.log("ycy"+JSON.stringify(result));
				});

		},function(tx,result){
			console.log("shanchu:"+JSON.stringify(result));
		})


	});

}
//数据库部分
