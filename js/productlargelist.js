function loadadvproduct(){
	var url="http://app.teambuy.com.cn/apnc/m/temai/a/gettemai";
	var tmids=adv[2];
	tmids=tmids.split("|");
	$.post(url,{
		'tmid':tmids[1]
	},function(result){
		console.log("tmid:"+JSON.stringify(result));
		if(result.ret=='1'){
			addview(result.data);
		}
	},"json");
	
}
function addview(data){
	var htm="";
	for(var i=0;i<data.length;i++){
		 htm+='<div value="'+data[i].tmid+'"class="product-item"><div class="product-imgs"></div><div class="product-name">'+data[i].title+'</div><div class="price-line"><div class="now-price">￥'+data[i].tmdj+'</div><div class="before-price">￥'+data[i].dj0+'</div><div class="pro-discount">7.4折</div></div><div class="product-sells"><div class="product-sells-text">销量'+data[i].sells+'</div><div class="pro-brand">品牌</div></div></div>';
	}
	console.log('htm:'+htm);
	$('.product-introduce').empty();
	$('.product-introduce').append(htm);
	var imgs=$(".product-introduce .product-imgs");
	var items;
	for(var i=0;i<data.length;i++){
		$(".product-introduce").find(imgs[i]).css('background-image', "url(" + data[i].picurl + ")");
	}
	}
