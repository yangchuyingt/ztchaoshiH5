function checkusername(pagenameid) {
	var user = $("#username").val();
	var password = $("#password").val();
	var regEx = !!user.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
	if (user) {
		//mui.toast("用户名不能为空");
	}
	if (!regEx) {
		console.log("错误");
		mui.toast("用户名有误！");
	} else {
		login(user, password, pagenameid);
		//console.log("pagenameid:"+pagenameid);
	}
}

function login(user, password, pagenameid) {
	var url = "http://app.teambuy.com.cn/apnc/m/user/a/login";
	//	var url="http://www.iteambuy.com/ipc/m/user/a/login";
	var username = reversestr(user);
	//console.log(username);
	//var ww=faultylabs.MD5(password);
	var ww = hex_md5(password);
	//console.log("password:" + ww);
	var psw = convertsmall(ww);
	//console.log(password);
	//console.log("加密后" + psw);
	$.post(url, {
		"username": username,
		"password": psw
	}, function(result) {
		//console.log(JSON.stringify(result));
		if (result.ret == "0") {
			mui.toast("密码错误!");
		} else if (result.ret == "1") {
			//console.log("fanhui:"+JSON.stringify(result));
		    plus.storage.setItem('avatar',result.data.avatar);
			plus.storage.setItem("username", result.data.mobile);
			//console.log("resluttoken:"+result.sessid);
			plus.storage.setItem("token", result.data.acctoken);
			plus.storage.setItem("sessid",result.sessid);
			//console.log("pagenameid:"+pagenameid);
			var page;
			console.log("pagenameid:"+pagenameid);
			if(pagenameid=='index'){
				
				page=plus.webview.getLaunchWebview();
			}else{
				
			page= plus.webview.getWebviewById(pagenameid);
			}
			mui.fire(page, 'finishlogin', {
			});
			
		//	console.log("pagenameid:"+pagenameid);
			//console.log("token:"+result.sessid);
			mui.back();
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