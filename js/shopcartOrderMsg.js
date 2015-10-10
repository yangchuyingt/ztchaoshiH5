function showpayordermsg(){//var allorder var positionlist;
	var str='';
	for(var i=0;i<positionlist.length;i++){
		if(positionlist[i]!=-2){
			str+='<div class="shop-cart-content-have-order-item"><div class="divide-line-without-margin"></div><div class="shopcart-shopname">'+allorder[positionlist[i]].shopname+'</div><div class="divide-line-without-margin"></div><div class="product-items"><div class="shopcart-product-img"></div><div calss="shopcart-product-msg"><div class="shopcart-production-text">'+allorder[positionlist[i]].cpmc+'</div><div class="production-msg">产品信息：'+""+'</div><div class="price-shuliang">￥'+allorder[positionlist[i]].dj+'&nbsp x '+allorder[positionlist[i]].sl+'</div></div></div></div>'
		}
	}
	$('.product-items').empty();
	$('.product-items').append(str);
}
