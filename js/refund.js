function showrefundmsg(){
	$(".refund-content-text").text(refundobj.cpmc);
	$(".refund-price").text("￥"+refundobj.refje);
}
/***
 * *生成mess参数；
 * 并提交到服务器；
 *
 */
function buildmessmsg(appendmsg){
	var messlist='';
	for(var i=0;i<selectArray.length;i++){
		if(selectArray[i].length>=0){
			messlist+=selectArray[i]+'|';
		}
	}
	messslist=messlist+appendmsg;
	if(messslist.length<=0){
		mui.toast("只是提交一项原因");
		return;
	}
	var token = plus.storage.getItem("token");
	var sessid = plus.storage.getItem("sessid");
	var url="http://app.teambuy.com.cn/apnc/m/tmord/a/ordrefund";
	var ordernos=orderno.split(',');
	$.post(url,{
		"acctoken": token,
		"sessid": sessid,
		"ordno":ordernos[0],
		"mess":messslist,
		"onox":ordernos[1]
	},function(result){
		console.log("删除订单返回的结果："+JSON.stringify(result));
		if(result.ret=='1'){
			mui.toast("订单删除成功！");
			var mainpage = plus.webview.getLaunchWebview();
			elements.setAttribute("class", "order-button1-unvisiable");
			mui.fire(mainpage, "refreshmyOrder", {});
			var allorderdealSubpage=plus.webview.getWebviewById("allorderdeal-sub");
			mui.fire(allorderdealSubpage,"changeBottombg",{});
			mui.back();
		}else{
			mui.toast("未知错误");
		}
	},"json");
}
