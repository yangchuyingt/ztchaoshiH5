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
	var username = $('.usercount').val();
	username = reversestr(username);
	$.post(url, {
		'username': username
	}, function(result) {
		JSON.stringify("注册:" + result);
		if (result.ret == '1') {
			postrigist();
		} else if (result.ret == '-1') {
			mui.confirm(result.data.errmsg, '', new Array() {
				'确定'
			})；
		}
	});
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

function postrigist() {
	var url = "http://app.teambuy.com.cn/apnc/m/user/a/sendyzm";
	var username = plus.storage.getItem("username");
	if (username == null) {
		mui.toast("请输入手机号码");
		return;
	}
	username = reversestr(username);

	console.log("发送验证码的手机号：" + username);
	$.post(url, {

		"mobile": username
	}, function(result) {
		if (result.ret == '1') {
			mui.openWindow({
				url: "setPassword.html",
				id: 'setPassword',
				extras: {
					"revertusername": username,
				}
			})
		} else {
			mui.toast("请先登录，再修改密码");
		}
	}, "json");
}