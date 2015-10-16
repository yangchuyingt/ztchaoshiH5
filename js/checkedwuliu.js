function showwuliuordermsg(){ 
	   //var oedermsgobj;
	  //  var childorder;
	  console.log("order1:"+ordermsgobj+",order2"+childorder);
	if(ordermsgobj.length>0&&childorder.length>0){
		for(var i=0;i<ordermsgobj.length;i++){
			console.log("order1:"+ordermsgobj[i].ordnox+",order2"+childorder);
			if(ordermsgobj[i].ordnox==childorder){
				console.log("执行力");
				window.open("http://app.teambuy.com.cn/webc/m/tmlog/id/"+orderobj[i].logid);
				break;
			}
		}
	}
}
