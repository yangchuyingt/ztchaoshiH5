/*
 *
 *获取单个产品的图片信息，以及产品参数
 * id：产品的id
 * */
function getproductimg(id,pic) {
		var url = "http://app.teambuy.com.cn/apnc/m/temai/a/gettminfo";
		console.log("tmid:"+id);
		$.post(url, {
			"tmid": id,
		}, function(result) {
			console.log("jj:"+JSON.stringify(result));
			if(result.ret=='1'){
					console.log("结果："+result.data.photos);
			var picturls = result.data.photos.split("||");
			var pics=new Array(picturls.length+1);
			pics=picturls;
			pics[picturls.length]=pic;
			//console.log(picturls.length);
			setimgviews(pics);
			setproductparamters(result.data.param);
           $("#product-paramters").append(result.data.param);
          // console.log(JSON.stringify(result.data.param));
			}else{
				mui.toast(result.data);
			}
		}, "json");

	}
function setproductparamters(param){
	$('.productmsg').empty();
	$(".productmsg").append(param);
}
	/*
	 *给产品详情界面加载轮播图
	 *
	 * */

function setimgviews(picturls) {
	var result = "";
	for (var i = 0; i < picturls.length; i++) {
		if (picturls[i]) {


			result += '<div id ="product-img' + i + '"' + ' class="product-img-show-inner mui-slider-item"></div>'
		} //console.log(picturls[i]);
	}
	$("#top-slider-group").append(result);
	//console.log(result);
	for (var i = 0; i < picturls.length; i++) {
		if (picturls[i]) {
			$("#product-img" + i).css("background-image", "url(" + picturls[i].split("|")[0] + ")");
			//console.log(picturls[i].split("|")[0]);
		}
	}
	var gallery = mui('.mui-slider');
	gallery.slider({
		interval: 0 //自动轮播周期，若为0则不自动播放，默认为0；
	});
}
/*
 
 * 从服务器获取单个商品的信息
 * */
function getaproductmsg(tmid){
	
	var url="http://app.teambuy.com.cn/apnc/m/temai/a/getatemai";
	$.post(url,{
"tmid":tmid},function(result){
	  productresult=result;
	  console.log("product:"+JSON.stringify(result));
	  saveproductmsg(result);
      showproductmsg(result);
      getproductimg(tmid,result.data.picurl);
     
     
},"json");
	
}
/*
 *获取产品的尺码信息；
 * 
 * */
function getproductchima(tmid){
	var url="http://app.teambuy.com.cn/apnc/m/temai/a/gettmcima"
	$.post(url,{
		"tmid":tmid
	},function(result){
		haveloadsize=true
		console.log('尺码信息：'+JSON.stringify(result));
		if(result.ret=="0"){
			havesize=false;
		}else if(result.ret=='1'){
			handsizemsg(result.data);
			//$("#size-masage").append(result.data.content);
		}
	},"json")
}
/**
 * <div class="product-size" >粉红白皮</div>
 *  处理尺码信息
 * */
function handsizemsg(data){
	var sizemsg='';
	for(var i=0;i<data.length;i++){
		sizemsg+='<div value="'+data[i].tmcid+'"class="product-size-unselect" >'+data[i].chima+'</div>';
	}
	$(".show-content").empty();
	$(".show-content").append(sizemsg);
}
function showproductmsg(result){
	$("#before-price").text("原价: ￥"+result.data.dj0);
	$("#now-price").text("新品特惠：￥"+result.data.tmdj);
	$("#product-name").text(result.data.title);
	//$("#product-paramters").text(result.data.)
}
function gotoorderpostpage(tmid){
	mui.openWindow({
					url: 'postorder.html',
					id: 'postorder',
					styles: {},
					extras: {
						"tmid": tmid,
						"productsize":selectedsize
					},
				});
}
function addtoshopcart(tmid){
	var url="http://app.teambuy.com.cn/apnc/m/tmord/a/addcart";
	var token = plus.storage.getItem("token");
	var sessid = plus.storage.getItem("sessid");
	console.log('tmid:'+tmid);
	$.post(url,{
		'acctoken': token,
		"sessid": sessid,
		'tmid':tmid,
		 tmsl:1,
		 "cmid":selectedsize,
		 'btimes':'0',
		 'bnums':'0'
	},function(result){
		console.log('加入购物车：'+JSON.stringify(result));
		console.log(result.ret);
		if(result.ret=='-2'){
			gotologn();
		}else if(result.ret=='1'){
			//弹出toast
			plus.nativeUI.alert("加入购物车成功");
		}
	},'json');
}
function gotologn(){
	loginpage.show();
}
