function h_pay(price, orderno) {
	var pingpp = require('pingpp')('sk_test_ibbTe5jLGCi5rzfH4OqPW9KC');
	pingpp.charges.create({
		subject: "",
		body: "",
		amount: price,
		order_no: "orderno",
		channel: "alipay",
		currency: "cny",
		client_ip: "http://app.teambuy.com.cn/apnc/m/tmord/a/createpaybych",
		app: {
			id: "app_3LuYhhseDkzIG7or"
		}
	}, function(err, charge) {
		console.log(result);
		console.log(err);
	});
}

/*function pingPay(price, order) {
	var url = "http://app.teambuy.com.cn/apnc/m/tmord/a/createpaybych"
	var charge = {
		
		"order_no": order,
		 "app":{"id": "app_3LuYhhseDkzIG7orn"},
		"channel": "alipay",
		"amount": price,
		"client_ip": url,
		"currency": "cny",
		"subject": "",
		"body": ""
	};
	pingpp.createPayment(charge, function(result, err) {
      console.log(JSON.stringify(result));
      console.log(err);
	});
}*/
/*function pingpay(price, order) {
	var url = "http://app.teambuy.com.cn/apnc/m/tmord/a/createpaybych";
	var token = plus.storage.getItem("token");
	 console.log(order);
		var sessid = plus.storage.getItem("sessid");
		$.post(url, {
			"acctoken": token,
			"sessid": sessid,
			"ordno": order,
			"paym": "alipay"
		}, function(result) {
             JSON.stringify(result);
		}, "json");
}*/