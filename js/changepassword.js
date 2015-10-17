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

function postchangepassword(password, yanzhenma) {
	var ww = hex_md5(password);
	var psw = convertsmall(ww);
	var url = "http://app.teambuy.com.cn/apnc/m/my/a/chpwd";
	var username = plus.storage.getItem("username");
	var token = plus.storage.getItem("token");
	var sessid = plus.storage.getItem("sessid");
	$.post(url, {
		"acctoken": token,
		"sessid": sessid,
		"username": username,
		"password": psw,
		"mobyzm": yanzhenma
	}, function(result) {
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



 /*
  *计时器
  * */
function timedCount() {
	//document.getElementById('txt').value=c
	console.log("c:"+c);
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
	var username = plus.storage.getItem("username");
	var token = plus.storage.getItem("token");
	var sessid = plus.storage.getItem("sessid");
	$.post(url,{
		"acctoken": token,
		"sessid": sessid,
		"mobile":username
	},function(result){
		if(result.ret=='1'){
			mui.toast("验证码已发送请注意查收");
		}else{
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