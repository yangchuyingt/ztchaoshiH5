function convertsmall(data) {
	var str = "";
	for (var i = 0; i < data.length; i++) {
		if (data[i] >= 65 && data[i] <= 106) {
			str += (data[i] + 32);
		} else {
			str += data[i];
		}

	}
	//console.log(str);
	return str;
}

function postchangepassword(password, yanzhenma,usercount) {
	var ww = hex_md5(password);
	var psw = convertsmall(ww);
	var url = "http://app.teambuy.com.cn/apnc/m/my/a/chpwd";
	var username;
	if(usercount==''||usercount==undefined){
		 username = plus.storage.getItem("username");
		if(username==''||username==undefined){
		   plus.nativeUI.alert("用户名为空");
		   return;
		}
	   username=reversestr(username);
	   
	}else{
		username=usercount;
	}
	
	var token = plus.storage.getItem("token");
	var sessid = plus.storage.getItem("sessid");
	$.post(url, {
//		"acctoken": token,
//		"sessid": sessid,
		"username": username,
		"password": psw,
		"mobyzm": yanzhenma
	}, function(result) {
		console.log("用户名："+username+",密码："+psw);
		console.log("result:"+JSON.stringify(result));
		if (result.ret == "1") {
			mui.confirm("修改密码",
				"修改密码成功",
				new Array("确定"),
				function()
				{
					mui.back();
				})
		}
	}, "json")
}
//function postfogetpassword(usercount,password, yanzhenma){
//	var ww = hex_md5(password);
//	var psw = convertsmall(ww);
//	var url = "http://app.teambuy.com.cn/apnc/m/my/a/chpwd";
//	 username=reversestr(usercount);
//	$.post(url, {
//		"username": username,
//		"password": psw,
//		"mobyzm": yanzhenma
//	}, function(result) {
//		console.log("用户名："+username+",密码："+psw);
//		console.log("result:"+JSON.stringify(result));
//		if (result.ret == "1") {
//			mui.confirm("修改密码",
//				"修改密码成功",
//				new Array("确定"),
//				function()
//				{
//					mui.back();
//				})
//		}
//	}, "json")
//}


 /*
  *计时器
  * */
function timedCount() {
	//document.getElementById('txt').value=c
	//Sconsole.log("c:"+c);
	$(".get-yanzhenma-button").text(c + "s后再次获取");
	c--;
	if (c >= 0) {
		t = setTimeout("timedCount()", 1000);
	} else {
       $(".get-yanzhenma-button").text("获取验证码");
       canclick=true;
	}

}
function getyzm(){
	var url="http://app.teambuy.com.cn/apnc/m/user/a/sendyzm";
	if(username=="changepassword"){
		 username = plus.storage.getItem("username");
		
	}
	if(username==null){
		mui.toast("请先登录，再修改密码");
		return;
	}
	 username=reversestr(username);
	var token = plus.storage.getItem("token");
	var sessid = plus.storage.getItem("sessid");
	console.log("发送验证码的手机号："+username);
	$.post(url,{
//		"acctoken": token,
//		"sessid": sessid,
		"mobile":username
	},function(result){
		if(result.ret=='1'){
			mui.toast("验证码已发送请注意查收");
		}else{
			console.log("验证码请求结果："+JSON.stringify(result));
			mui.toast("请先登录，再修改密码");
		}
	},"json");
}

//反转字符串
function reversestr(str) {
	var strs = "";
	var length = str.length;
	for (var i = length - 1; i >= 0; i--) {
		strs += str[i];
	}
	//console.log("rever:" + strs);
	return strs;
}