/*function loadaddressmsg(){
	var url="http://appd.teambuy.com.cn/apc/m/cpord/a/getaddress";
	$.post(url,{},function(result){
		console.log(result.ret);
		if(result.ret="-2"){
			mui.openWindow({
					url: '../me/login.html',
					id: 'login'
					
				});
		}else if(result.ret="-1"){
			console.log("-1");
		}else{
			
		}
	},"json");
}*/
function loadaddressmsg(loginpage) {
	//http://app.teambuy.com.cn/apnc/m/cpord/a/getaddress
	var url = "http://app.teambuy.com.cn/apc/m/cpord/a/getaddress";
	//plus.storage.setItem("token", result.sessid);
	var token =plus.storage.getItem("token");
	var sessid=plus.storage.getItem("sessid");
	//console.log("token:"+token);
	$.post(url, {acctoken:token,"sessid":sessid}, function(result) {
		//plus.storage.setItem("token", result.sessid);
		//console.log(JSON.stringify(result));
		console.log(result.ret);
		if (result.ret == "-2") {
			mui.fire(loginpage,"logintocongress",{"pagenameid": "congsigneeaddress"});
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
			//dealAddressMsg(result);
			getaddressmsg(loginpage,true);
			//TODO
			console.log(JSON.stringify(result));
		}
	}, "json");
}
/*
 * 保存地址信息到数据库
 * */
function saveaddressmsg(result){
	var data = result.data;
	var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
    var sql="insert into ADDRESS_MSG(_id ,_address ,_carea  , _city , _isdef ,_province ,_sendid ,_tel ,_truename ,_username ,_zipcode )values(?,?,?,?,?,?,?,?,?,?,?)";
    db.transaction(function(tx) {
    	   for(var i=0;i<data.length;i++){
    	   	 tx.executeSql(sql, [data[i].uaid,data[i].address,data[i].carea,data[i].city,data[i].isdef,data[i].province,data[i].sendid,data[i].tel,data[i].truename,data[i].username,data[i].zipcode]);
    	   }
		}, function() {
			console.log("地址插入数据库成功");
		}, function(tx, error) {
			console.log("error:" + error);
		});
}
function getaddressmsg(loginpage,notnet){
	var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
	var sql="select _id,_address,_carea,_city,_isdef,_province,_sendid,_tel,_truename from ADDRESS_MSG ";
		db.transaction(function(tx) {
		tx.executeSql(sql, [], function(tx, result) { //results.rows.item(i).name
			if(result.rows.length<=0){
				if(!notnet){
					console.log('联网加载地址');
				loadaddressmsg(loginpage);
				}else{
					return ;
				}
			}else{
			  showaddressdiv(result);
			}
			
		}, function(tx, error) {
			console.log(error.message);
			//loadaddressmsg(loginpage);
		}, null);
	});
}
function showaddressdiv(results){  
	//console.log("length:"+result.rows.length);
	var str="";
	for (var i=0;i<results.rows.length;i++){
		
		 str+='<div id='+'"consigneed-address'+i+'"'+'onclick="addressselect('+results.rows.item(i)._id+','+results.rows.item(i)._sendid+')"'+'>'
		        +'<div class="user-address-show border-white">'
				+'<div class="margin-top">'+results.rows.item(i)._truename+'  '+results.rows.item(i)._tel+'</div>'
				+'<div class="margin-top">'+results.rows.item(i)._province+'-'+results.rows.item(i)._city+'-'+results.rows.item(i)._carea+'</div>'
				+'<div class="margin-top">'+results.rows.item(i)._address+'</div>'
				+'<div id='+'"defult-address'+i+'"'+'class="defult-address"></div>'
			    +'</div>'
			    +'<div id='+'"receive-time'+i+'"'+'class="signee-time border-white">所有时间</div>'
			    +'</div>'
			    
	}
	//console.log(str);
   $("#address-add").empty();
   $("#address-add").append(str);
   var isdefultaddress;
   var receiveTime;
   for(var i=0;i<results.rows.length;i++){
   	   isdefultaddress=results.rows.item(i)._isdef;
   	   if(isdefultaddress=="1"){
   	   	$("#defult-address"+i).show();
   	   }else{
   	   	$("#defult-address"+i).hide();
   	   }
   	   receiveTime=results.rows.item(i).sendid;
   	   switch(receiveTime){
   	   	case "0":
   	   	$("#receive-time"+i).text("所有时间");
   	   	break;
   	   	case "1":
   	   	 $("#receive-time"+i).text("周六周日及节假日可以收货");
   	   	break;
   	   	case "2":
   	   	 $("#receive-time"+i).text("工作日可收货");
   	   	break;
   	   }
   }
   
}
function addressselect(address_id,send_way){
	var page= plus.webview.getWebviewById("postorder");
			mui.fire(page, 'selectedaddress', {"address_id":address_id,
			"send_way":send_way
			});
			mui.back();
	console.log("您选择的地址id是:"+address_id);
}
