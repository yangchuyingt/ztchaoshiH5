function showpayordermsg(){//var allorder var positionlist;
	var str='';
	for(var i=0;i<positionlist.length;i++){
		if(positionlist[i]!=-2){
			str+='<div class="shop-cart-content-have-order-item"><div class="divide-line-without-margin"></div><div class="shopcart-shopname">'+allorder[positionlist[i]].shopname+'</div><div class="divide-line-without-margin"></div><div class="product-items"><div class="shopcart-product-img"></div><div calss="shopcart-product-msg"><div class="shopcart-production-text">'+allorder[positionlist[i]].cpmc+'</div><div class="production-msg">产品信息：'+""+'</div><div class="price-shuliang">￥'+allorder[positionlist[i]].dj+'&nbsp x '+allorder[positionlist[i]].sl+'</div></div></div></div>'
		}
	}
	$('.product-items').empty();
	$('.product-items').append(str);
	var  items= $('.product-items .shopcart-product-img');
	var j=0;
	for(var i=0;i<positionlist.length;i++){
		if(positionlist[i]!=-2){
		$('.product-items').find(items[j]).css('background-image', "url(" + allorder[j].cppic + ")");
		ctids+=allorder[j].ctid+",";
		j++;
		}
	}
	ctids=ctids.substr(0,ctids.length-1);
	console.log("items:"+items.length);
	$('#all-nums').text("共"+sl+"件");
	$('#all-price').text("￥"+allprice);
}
function gotoaddresspage2() {
		mui.openWindow({
			url: '../mainpage/congsigneeaddress.html',
			id: 'congsigneeaddress',
			styles: {
			},
		});
	}
/*
 * 从购物车下单
 * */
function posterorderfromcart(){
	       var token = plus.storage.getItem("token");
		    var sessid = plus.storage.getItem("sessid");
		    var url='http://app.teambuy.com.cn/apnc/m/tmord/a/cartorder';
		    console.log("ctids:"+ctids);
		    $.post(url,{
		      	"acctoken": token,
				"sessid": sessid,
		    	   "addrid":addressid,
		    	   lngo:"",
		    	   lato:"",
		    	   "ctid":ctids,
		    	   "ctmess":"",
		    	   "sendm":send_way,
		    	   "fapiao":""
		    },function(result){
		    	  console.log(JSON.stringify(result));
		    	  if(result.ret==1){
				var orderno =result.data.ordno;
				showpaymoneypage(paymoneypage,allprice,orderno);
				}else if(result.ret==-2){
					loginpage.show();
				}
		    },"json")
}