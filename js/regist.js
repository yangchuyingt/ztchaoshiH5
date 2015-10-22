/*
 *计时器
 * */
function timedCount() {
	//document.getElementById('txt').value=c
	//Sconsole.log("c:"+c);
	$(".getyzm").text(c + "s");
	c--;
	if (c >= 0) {
		t = setTimeout("timedCount()", 1000);
	} else {
		$(".getyzm").text("获取验证码");
		canclick = true;
	}

}

function getyzm() {
	var url = "http://app.teambuy.com.cn/apnc/m/user/a/checkusername";
	username = $('#usercount').val();
	var regEx = !!username.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
	console.log('username:' + username);
	if (!regEx) {
		canclick = true;
		mui.confirm("用户名有误", '',
			new Array('确定'), function() {})

		return;
	}

	username = reversestr(username);
	console.log("revertusername:" + username);
	$.post(url, {
		'username': username
	}, function(result) {
		console.log("注册：" + JSON.stringify(result));
		if (result.ret == '1') {
			timedCount();
			postrigist();
		} else if (result.ret == '0') {
			mui.confirm(result.data.errmsg, '',
				new Array('确定'), function() {})
		}
	}, "json");
}

function reversestr(str) {
		var strs = "";
		var length = str.length;
		for (var i = length - 1; i >= 0; i--) {
			strs += str[i];
		}
		//console.log("rever:" + strs);
		return strs;
	}
	/**
	 *发送验证码
	 * */

function postrigist() {
	var url = "http://app.teambuy.com.cn/apnc/m/user/a/sendyzm";
	//var username = plus.storage.getItem("username");
	if (username == null) {
		mui.toast("请输入手机号码");
		return;
	}
	

	console.log("发送验证码的手机号：" + username);
	$.post(url, {

		"mobile": username
	}, function(result) {
		if (result.ret == '1') {

		} else {
			mui.toast("请先登录，再修改密码");
		}
	}, "json");
}

function checkyzm() {
	var url = "http://app.teambuy.com.cn/apnc/m/user/a/veryzm";
	yzm = $('#input-getyzm').val();
	if (yzm == "" || yzm == undefined) {
		mui.confirm("请先填写验证码", '',
			new Array('确定'), function() {});
		return;
	}
	var username=$('#usercount').val();
	username = reversestr(username);
	console.log("yyy:"+username);
	$.post(url, {
		'mobile': username,
		"yzm": yzm

	}, function(result) {
		console.log("验证码" + JSON.stringify(result));
		if (result.ret == "1") {

			mui.openWindow({
				url: "setPassword.html",
				id: 'setPassword',
				extras: {
					"revertusername": username,
					"yzm": yzm
				}
			})
			mui.back();
		} else {
//			mui.openWindow({
//				url: "setPassword.html",
//				id: 'setPassword',
//				extras: {
//					"revertusername": username,
//					"yzm": yzm
//				}
//			})
//			mui.back();

		}
	}, "json");
}

function postpassword() {
	console.log('heh');
	var password1 = $('#password1').val();
	var password2 = $('#password2').val();
	console.log("password1:" + password1 + ",password2:" + password2);
	if (password1 != password2) {
		mui.confirm("密码不一致", '',
			new Array('确定'), function() {});
		return;
	}
	var psw = hex_md5(password1);
	//console.log("password:" + ww);
	psw = convertsmall(psw);
	console.log("username:"+username);
	var url = "http://app.teambuy.com.cn/apnc/m/user/a/register";
	$.post(url, {
		'username': username,
		'password': psw,
		'mobyzm': yzm
	}, function(result) {
		console.log('result:'+result);
		if (result.ret == '1') {
			mui.back();
		} else {
			mui.confirm(result.data.errmsg, '',
				new Array('确定'), function(){});

		}
	}, "json");
}

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