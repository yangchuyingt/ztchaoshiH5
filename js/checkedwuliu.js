function showwuliuordermsg(){ 
	   //var oedermsgobj;
	  //  var childorder;
	  console.log("order1:"+ordermsgobj.data[0].ordnox+",order2"+childorder);
	if(ordermsgobj.data.length>0&&childorder.length>0){
		for(var i=0;i<ordermsgobj.data.length;i++){
			console.log("order1:"+ordermsgobj.data[i].ordnox+",order2"+childorder);
			if(ordermsgobj.data[i].ordnox==childorder){
				console.log("执行力");
				window.open("http://app.teambuy.com.cn/webc/m/tmlog/id/"+ordermsgobj.data[i].logid);
				break;
			}
		}
	}
}
