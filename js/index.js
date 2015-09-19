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
			break;
		case '3':
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
	//console.log("从数据库获取分类然后显示出来");
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
/*
 * 
 * 从网上获取的数据显示在左边的菜单
 * 
 */
function showleftfromnet(data){
	 var flag;
	 var ht='';
	 for(var i=0;i<data.data.length;i++){
	 	if(data.data[i].cup!='0'){
	 		continue;
	 	}
	 	if(!flag){
	 		category_big=data.data[i].lbid;
	 		flag=true;
	 	}
	 	ht+='<div value="'+data.data[i].lbid+'" class="category-left-menu-item">'+data.data[i].lbname +'</div>';
	 }
	 console.log("netht:"+ht);
	$("#left-menu").empty();
	$("#left-menu").append(ht);
}
function showleftview(data){//results.rows.item(i).name
  var ht='';
  var flag;
  //console.log("分类的长度："+data.rows.length);
   for(var i=0;i<data.rows.length;i++){//<div class="category-left-menu-item">女装</div>
      if(!flag){
      	category_big=data.rows.item(i)._id;
      	flag=true;
      }
		ht+='<div value="'+data.rows.item(i)._id+'" class="category-left-menu-item">'+data.rows.item(i)._lbname +'</div>';
	}
   // console.log("dbht:"+ht);
	$("#left-menu").empty();
	$("#left-menu").append(ht);
	getRightCatFromDb(category_big);
	
}
/*
 * 从数据库获取又不的分类；
 * 
 * 
 */
function getRightCatFromDb(cup){
	var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
	var right_sql = 'select _id,_lbname,_icon from tm_category where cup=?';
	db.transaction(function(tx){
		tx.executeSql(right_sql,[cup],function(tx,result){
			var rightHt='';
			for(var i=0;i<result.rows.length;i++){
				rightHt+='<div value="'+result.rows.item(i)._id+'" class="right-cat-item"><img class="right-catgory-img" src="'+result.rows.item(i)._icon+'"/><div class="right-catgory-text">'+result.rows.item(i)._lbname+'</div></div>';
			}
			console.log('rightht:'+rightHt);
			$("#right-catagory").empty();
	        $("#right-catagory").append(rightHt);
		},function(tx,result){
			console.log("category:"+JSON.stringify(result));
		});
	});
	
}
  
