function showordermsg(){
	$(".order-product-name").text(ordermsg.cpmc);
	$("#allprice").text("总价："+ordermsg.oje);
	$('#buy-number').text("数量："+ordermsg.osl);
	$(".buy-time").text("购买时间："+ordermsg.dateandtime);
	$('.order-product-img').css('background-image',"url(" + ordermsg.cppic + ")");
}
function postmyevalute(evalute){
	var url="http://app.teambuy.com.cn/apnc/m/tmord/a/ordreccom";
	var token = plus.storage.getItem("token");
	var sessid = plus.storage.getItem("sessid");
	console.log(token+","+sessid+","+bigorder+","+shopid+","+ordermsg.cpmid+","+ordermsg.cpmc+","+ordermsg.cpmc+","+rate+","+evalute+","+ordermsg.ordnox);
	$.post(url,{
		"acctoken": token,
		"sessid": sessid,
		"ordno":bigorder,
		"shopid":shopid,
		"cpid":ordermsg.cpmid,
		"cpmc":ordermsg.cpmc,
		"level":"2",
		"dfen":rate,
		"memo":evalute,
		"onox":ordermsg.ordnox
	},function(result){
		console.log('result:'+JSON.stringify(result));
		if(result.ret=="1"){
			var mainpage = plus.webview.getLaunchWebview();
			mui.fire(mainpage, "refreshmyOrder", {});
			mui.back();
		}else if(result.ret=="0"){
			plus.nativeUI.alert(result.data.errmsg);
		}else if(result.ret=="-2"){
			mui.openWindow({
				url: 'login.html',
				id: 'login',
				styles: {},
				extras: {
				}
				
			})
		}
		
	},'json');
}
