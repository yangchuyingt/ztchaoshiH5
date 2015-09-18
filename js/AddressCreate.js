function showprovicedialog() {
		mui("#show-provice").popover('toggle');
		//<li onclick="receivetime(0)" class="mui-table-view-cell mui-text-center"><a href="#">所有时间</a></li>
		var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
		var sql = "select * from  t_province";
		var html = "";
		db.transaction(function(tx) {
			//<li onclick="proviceselect(0,'广东')" class="mui-table-view-cell mui-text-center"><a href="#">广东</a></li>
			tx.executeSql(sql, [], function(tx, result) { //result.rows.item(i).name
				for (var i = 0; i < result.rows.length; i++) {
					html += '<li value="' + result.rows.item(i).id + ','  + result.rows.item(i).proname  + '" class="mui-table-view-cell mui-text-center"><a href="#">' + result.rows.item(i).proname + '</a></li>'
				}
				$("#provice-add").children("li").remove();
				$("#provice-add").append(html);
				//console.log("tt:"+$("#provice-add").html());
			});

		});
	}
	/*
	 *点击城市按钮的时候显示城市列表
	 * */

function showcitydialog() {
		mui("#show-city").popover('toggle');
		//<li onclick="receivetime(0)" class="mui-table-view-cell mui-text-center"><a href="#">所有时间</a></li>
		var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
		var sql = "select * from  t_city where  proid=?";
		var html = "";
		console.log("sd" + selectedproviceid);
		db.transaction(function(tx) {
			//<li onclick="proviceselect(0,'广东')" class="mui-table-view-cell mui-text-center"><a href="#">广东</a></li>
			tx.executeSql(sql, [selectedproviceid], function(tx, result) { //result.rows.item(i).name
				console.log("result.rows.length:" + result.rows.length);
				for (var i = 0; i < result.rows.length; i++) {
					html += '<li value="' + result.rows.item(i).id + ',' + result.rows.item(i).cityname + '" class="mui-table-view-cell mui-text-center"><a href="#">' + result.rows.item(i).cityname + '</a></li>'
				}
				console.log("city" + html);
				$("#city-add").children("li").remove();
				$("#city-add").append(html);
				//console.log("tt:"+$("#provice-add").html());
			});

		});
	}
	/*
	 *点击地区按钮的时候显示的地区列表
	 *
	 * */

function showzonedialog() {
	mui("#show-zone").popover('toggle');
	//document.getElementById('show-zone').style.display = "block";
	var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
	var sql = "select * from  t_zone where  cityid=?";
	var html = "";
	console.log("sd" + selectedproviceid);
	db.transaction(function(tx) {
		//<li onclick="proviceselect(0,'广东')" class="mui-table-view-cell mui-text-center"><a href="#">广东</a></li>
		tx.executeSql(sql, [selectedcityid], function(tx, result) { //result.rows.item(i).name
			console.log("result.rows.length:" + result.rows.length);
			for (var i = 0; i < result.rows.length; i++) {
				html += '<li value="' + result.rows.item(i).id + ',' + result.rows.item(i).zonename + '" class="mui-table-view-cell mui-text-center"><a href="#">' + result.rows.item(i).zonename + '</a></li>'
			}
			console.log("diqu" + html);
			$("#zone-add").children("li").remove();
			$("#zone-add").append(html);
			//console.log("tt:"+$("#provice-add").html());
		});

	});
}



function cityselect(id, city) {
	selectedcityid = id;
	mui("#show-city").popover('toggle');
	$("#city-selected").text(city);
}


function saveaddress() {
	var url = "http://app.teambuy.com.cn/apc/m/cpord/a/newaddress"; //新增地址
	var receiveName = $("#receivename").val();
	if (receiveName.length == 0) {
		console.log("收货人姓名不能为空");
		mui.toast("收货人姓名不能为空");
		return;
	}
	var receivenamber = $("#receivenamber").val();
	if (receivenamber.length == 0) {
		console.log("收货人电话号码不可以为空");
		mui.toast("收货人电话号码不可以为空");
		var regEx = !!receivenamber.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
		if (!regEx) {
			console.log("手机号码有误！请重新输入");
			mui.toast("手机号码有误！请重新输入");
			return;
		}
	}
	var concrateaddress = $("#concrete-address").val();
	if (concrateaddress.length == 0) {
		console.log("请输入详细的地址！");
		mui.toast("请输入详细的地址！");
		return;
	}
	var token = plus.storage.getItem("token");
    var sessid = plus.storage.getItem("sessid");
	$.post(url, {
		"acctoken": token,
		"sessid": sessid,
		"truename": receiveName,
		"tel": receivenamber,
		"address": concrateaddress,
		"province": selectedproviceid,
		"city": selectedcityid,
		"isdef": isdefaddress,
		"carea": selectedzoneid,
		"sendid": receivetime
	}, function(result) {
		console.log(JSON.stringify(result));
		if(result.ret=="1"){
			mui.back();
		}else if(result.ret=='-2'){
			loginpage.show();
		}else{
			mui.toast(result.data.errmsg);
			console.log(result.data.errmsg);
		}
	}, "json");
}

function changedefultaddress() {
	if (isdefaddress=="0") {
		document.querySelector('#setdefult-address').className='defult-image-select1';
		isdefaddress="1";
	} else {
		isdefaddress="0";
		document.querySelector('#setdefult-address').className='defult-image-select2';
	}



}