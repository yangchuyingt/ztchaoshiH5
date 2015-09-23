function showtitlenme {
	switch (pagestatus) {
		case 0:
		  $('.me-header-title').text()="待付款"；
			break;
		case 1:
		  $('.me-header-title').text()="待收货"；
			break;
		case 2:
		 $('.me-header-title').text()="待评价"；
			break;
		case 3:
		 $('.me-header-title').text()="售后"；
			break;
	}
}