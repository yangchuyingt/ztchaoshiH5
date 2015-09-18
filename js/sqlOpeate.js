function getdbversion() {
	return "14";
}



function createdatabase() {
	var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
	var sql1 = "CREATE TABLE IF NOT EXISTS PRODUCT_LIST(_id integer primary key AUTOINCREMENT,_bests varchar(10),_buynums varchar(10),_buytimes varchar(10),_collects varchar(10),_content varchar(40),_cpdl varchar(10),_cpxl varchar(10),_dfen varchar(10),_dj0 varchar(10),_dj1 varchar(10),_edate varchar(10),_jldw varchar(10),_kcsl varchar(10),_mid varchar(10),_ok varchar(10),_picurl varchar(40),_rebate varchar(10),_sdate varchar(10),_sells varchar(10),_shopid varchar(10),_tbmoney varchar(10),_title varchar(40),_tmdj varchar(10),_tmlb varchar(10),_tmurl varchar(10),_tmword varchar(10),_xh varchar(10),_zkl varchar(10))";
	var address_sql = "CREATE TABLE IF NOT EXISTS ADDRESS_MSG(_id integer primary key AUTOINCREMENT,_address varchar(50),_carea  varchar(5), _city varchar(10), _isdef varchar(3),_province varchar(5),_sendid varchar(5),_tel varchar(20),_truename varchaar(10),_username varchar(15),_zipcode varchar(10))";
	var provice_sql = "CREATE TABLE t_province (id integer primary key AUTOINCREMENT,proname varchar(20) ,proremark varchar(20) )";
	var city_sql = "CREATE TABLE t_city ( id integer primary key AUTOINCREMENT,  cityname varchar(30),  proid int(5) , citycode varchar(20) )";
	var zone_sql = "CREATE TABLE t_zone (   id integer primary key AUTOINCREMENT,  zonename varchar(30),  cityid int(5),  zt tinyint(1) ,  username varchar(20) ,  dateandtime, truename varchar(20),  mobile varchar(20) )"
	//var tm_category_sql='create table tm_category( _id integer primary key AUTOINCREMENT,  _cpsl varchar(5),  _cup varchar(5), _icon varchar(20), _lbname varchar(20),_spsl varchar(20))';
	var tm_category_sql="CREATE TABLE IF NOT EXISTS tm_category( _id integer primary key AUTOINCREMENT,  _cpsl varchar(5),  _cup varchar(5), _icon varchar(20), _lbname varchar(20),_spsl varchar(20))";
	db.transaction(function(tx) {
		tx.executeSql(tm_category_sql);
		tx.executeSql(sql1);
		tx.executeSql(address_sql);
		tx.executeSql(provice_sql);
		tx.executeSql(city_sql);
		tx.executeSql(zone_sql);
		
		handleFiles();
		//insertzonemsg();
		insertprovicemsg();
		insertcitymsg();
		//setTimeout(function(){
			
	//	},2000);
		
	}, function(tx, error) {
		console.log(JSON.stringify("no1:"+error));

	},function (tx,error){
		console.log("no2:"+JSON.stringify(error));
	});

	console.log("数据库表创建成功");
}

function insertcitymsg() {

	var city_insert = "INSERT INTO `t_city` VALUES (1, '北京市', 1, '010');INSERT INTO `t_city` VALUES (2, '天津市', 2, '022');INSERT INTO `t_city` VALUES (3, '上海市', 9, '021');INSERT INTO `t_city` VALUES (4, '重庆市', 27, '023');INSERT INTO `t_city` VALUES (5, '邯郸市', 3, '0310');INSERT INTO `t_city` VALUES (6, '石家庄市', 3, '0311');INSERT INTO `t_city` VALUES (7, '保定市', 3, '0312');INSERT INTO `t_city` VALUES (8, '张家口市', 3, '0313');INSERT INTO `t_city` VALUES (9, '承德市', 3, '0314');INSERT INTO `t_city` VALUES (10, '唐山市', 3, '0315');INSERT INTO `t_city` VALUES (11, '廊坊市', 3, '0316');INSERT INTO `t_city` VALUES (12, '沧州市', 3, '0317');INSERT INTO `t_city` VALUES (13, '衡水市', 3, '0318');INSERT INTO `t_city` VALUES (14, '邢台市', 3, '0319');INSERT INTO `t_city` VALUES (15, '秦皇岛市', 3, '0335');INSERT INTO `t_city` VALUES (16, '朔州市', 4, '0349');INSERT INTO `t_city` VALUES (17, '忻州市', 4, '0350');INSERT INTO `t_city` VALUES (18, '太原市', 4, '0351');INSERT INTO `t_city` VALUES (19, '大同市', 4, '0352');INSERT INTO `t_city` VALUES (20, '阳泉市', 4, '0353');INSERT INTO `t_city` VALUES (21, '晋中市', 4, '0354');INSERT INTO `t_city` VALUES (22, '长治市', 4, '0355');INSERT INTO `t_city` VALUES (23, '晋城市', 4, '0356');INSERT INTO `t_city` VALUES (24, '临汾市', 4, '0357');INSERT INTO `t_city` VALUES (25, '吕梁市', 4, '0358');INSERT INTO `t_city` VALUES (26, '运城市', 4, '0359');INSERT INTO `t_city` VALUES (27, '沈阳市', 6, '024');INSERT INTO `t_city` VALUES (28, '铁岭市', 6, '0410');INSERT INTO `t_city` VALUES (29, '大连市', 6, '0411');INSERT INTO `t_city` VALUES (30, '鞍山市', 6, '0412');INSERT INTO `t_city` VALUES (31, '抚顺市', 6, '0413');INSERT INTO `t_city` VALUES (32, '本溪市', 6, '0414');INSERT INTO `t_city` VALUES (33, '丹东市', 6, '0415');INSERT INTO `t_city` VALUES (34, '锦州市', 6, '0416');INSERT INTO `t_city` VALUES (35, '营口市', 6, '0417');INSERT INTO `t_city` VALUES (36, '阜新市', 6, '0418');INSERT INTO `t_city` VALUES (37, '辽阳市', 6, '0419');INSERT INTO `t_city` VALUES (38, '朝阳市', 6, '0421');INSERT INTO `t_city` VALUES (39, '盘锦市', 6, '0427');INSERT INTO `t_city` VALUES (40, '葫芦岛市', 6, '0429');INSERT INTO `t_city` VALUES (41, '长春市', 7, '0431');INSERT INTO `t_city` VALUES (42, '吉林市', 7, '0432');INSERT INTO `t_city` VALUES (43, '延边朝鲜族自治州', 7, '0433');INSERT INTO `t_city` VALUES (44, '四平市', 7, '0434');INSERT INTO `t_city` VALUES (45, '通化市', 7, '0435');INSERT INTO `t_city` VALUES (46, '白城市', 7, '0436');INSERT INTO `t_city` VALUES (47, '辽源市', 7, '0437');INSERT INTO `t_city` VALUES (48, '松原市', 7, '0438');INSERT INTO `t_city` VALUES (49, '白山市', 7, '0439');INSERT INTO `t_city` VALUES (50, '哈尔滨市', 8, '0451');INSERT INTO `t_city` VALUES (51, '齐齐哈尔市', 8, '0471');INSERT INTO `t_city` VALUES (52, '鸡西市', 8, '0467');INSERT INTO `t_city` VALUES (53, '牡丹江市', 8, '0453');INSERT INTO `t_city` VALUES (54, '七台河市', 8, '0453');INSERT INTO `t_city` VALUES (55, '佳木斯市', 8, '0454');INSERT INTO `t_city` VALUES (56, '鹤岗市', 8, '0468');INSERT INTO `t_city` VALUES (57, '双鸭山市', 8, '0469');INSERT INTO `t_city` VALUES (58, '绥化市', 8, '0455');INSERT INTO `t_city` VALUES (59, '黑河市', 8, '0456');INSERT INTO `t_city` VALUES (60, '大兴安岭地区', 8, '0457');INSERT INTO `t_city` VALUES (61, '伊春市', 8, '0458');INSERT INTO `t_city` VALUES (62, '大庆市', 8, '0459');INSERT INTO `t_city` VALUES (63, '南京市', 10, '025');INSERT INTO `t_city` VALUES (64, '无锡市', 10, '0510');INSERT INTO `t_city` VALUES (65, '镇江市', 10, '0511');INSERT INTO `t_city` VALUES (66, '苏州市', 10, '0512');INSERT INTO `t_city` VALUES (67, '南通市', 10, '0513');INSERT INTO `t_city` VALUES (68, '扬州市', 10, '0514');INSERT INTO `t_city` VALUES (69, '盐城市', 10, '0515');INSERT INTO `t_city` VALUES (70, '徐州市', 10, '0516');INSERT INTO `t_city` VALUES (71, '淮安市', 10, '0517');INSERT INTO `t_city` VALUES (72, '连云港市', 10, '0518');INSERT INTO `t_city` VALUES (73, '常州市', 10, '0519');INSERT INTO `t_city` VALUES (74, '泰州市', 10, '0523');INSERT INTO `t_city` VALUES (75, '宿迁市', 10, '0527');INSERT INTO `t_city` VALUES (76, '舟山市', 11, '0580');INSERT INTO `t_city` VALUES (77, '衢州市', 11, '0570');INSERT INTO `t_city` VALUES (78, '杭州市', 11, '0571');INSERT INTO `t_city` VALUES (79, '湖州市', 11, '0572');INSERT INTO `t_city` VALUES (80, '嘉兴市', 11, '0573');INSERT INTO `t_city` VALUES (81, '宁波市', 11, '0574');INSERT INTO `t_city` VALUES (82, '绍兴市', 11, '0575');INSERT INTO `t_city` VALUES (83, '温州市', 11, '0577');INSERT INTO `t_city` VALUES (84, '丽水市', 11, '0578');INSERT INTO `t_city` VALUES (85, '金华市', 11, '0579');INSERT INTO `t_city` VALUES (86, '台州市', 11, '0576');INSERT INTO `t_city` VALUES (87, '合肥市', 12, '0551');INSERT INTO `t_city` VALUES (88, '芜湖市', 12, '0553');INSERT INTO `t_city` VALUES (89, '蚌埠市', 12, '0552');INSERT INTO `t_city` VALUES (90, '淮南市', 12, '0554');INSERT INTO `t_city` VALUES (91, '马鞍山市', 12, '0555');INSERT INTO `t_city` VALUES (92, '淮北市', 12, '0561');INSERT INTO `t_city` VALUES (93, '铜陵市', 12, '0562');INSERT INTO `t_city` VALUES (94, '安庆市', 12, '0556');INSERT INTO `t_city` VALUES (95, '黄山市', 12, '0559');INSERT INTO `t_city` VALUES (96, '滁州市', 12, '0550');INSERT INTO `t_city` VALUES (97, '阜阳市', 12, '0558');INSERT INTO `t_city` VALUES (98, '宿州市', 12, '0557');INSERT INTO `t_city` VALUES (99, '巢湖市', 12, '0565');INSERT INTO `t_city` VALUES (100, '六安市', 12, '0564');INSERT INTO `t_city` VALUES (101, '亳州市', 12, '0558');INSERT INTO `t_city` VALUES (102, '池州市', 12, '0566');INSERT INTO `t_city` VALUES (103, '宣城市', 12, '0563');INSERT INTO `t_city` VALUES (104, '福州市', 13, '0591');INSERT INTO `t_city` VALUES (105, '厦门市', 13, '0592');INSERT INTO `t_city` VALUES (106, '宁德市', 13, '0593');INSERT INTO `t_city` VALUES (107, '莆田市', 13, '0594');INSERT INTO `t_city` VALUES (108, '泉州市', 13, '0595');INSERT INTO `t_city` VALUES (109, '漳州市', 13, '0596');INSERT INTO `t_city` VALUES (110, '龙岩市', 13, '0597');INSERT INTO `t_city` VALUES (111, '三明市', 13, '0598');INSERT INTO `t_city` VALUES (112, '南平市', 13, '0599');INSERT INTO `t_city` VALUES (113, '鹰潭市', 14, '0701');INSERT INTO `t_city` VALUES (114, '新余市', 14, '0790');INSERT INTO `t_city` VALUES (115, '南昌市', 14, '0791');INSERT INTO `t_city` VALUES (116, '九江市', 14, '0792');INSERT INTO `t_city` VALUES (117, '上饶市', 14, '0793');INSERT INTO `t_city` VALUES (118, '抚州市', 14, '0794');INSERT INTO `t_city` VALUES (119, '宜春市', 14, '0795');INSERT INTO `t_city` VALUES (120, '吉安市', 14, '0796');INSERT INTO `t_city` VALUES (121, '赣州市', 14, '0797');INSERT INTO `t_city` VALUES (122, '景德镇市', 14, '0798');INSERT INTO `t_city` VALUES (123, '萍乡市', 14, '0799');INSERT INTO `t_city` VALUES (124, '菏泽市', 15, '0530');INSERT INTO `t_city` VALUES (125, '济南市', 15, '0531');INSERT INTO `t_city` VALUES (126, '青岛市', 15, '0532');INSERT INTO `t_city` VALUES (127, '淄博市', 15, '0533');INSERT INTO `t_city` VALUES (128, '德州市', 15, '0534');INSERT INTO `t_city` VALUES (129, '烟台市', 15, '0535');INSERT INTO `t_city` VALUES (130, '潍坊市', 15, '0536');INSERT INTO `t_city` VALUES (131, '济宁市', 15, '0537');INSERT INTO `t_city` VALUES (132, '泰安市', 15, '0538');INSERT INTO `t_city` VALUES (133, '临沂市', 15, '0539');INSERT INTO `t_city` VALUES (134, '滨州市', 15, '0543');INSERT INTO `t_city` VALUES (135, '东营市', 15, '0546');INSERT INTO `t_city` VALUES (136, '威海市', 15, '0631');INSERT INTO `t_city` VALUES (137, '枣庄市', 15, '0632');INSERT INTO `t_city` VALUES (138, '日照市', 15, '0633');INSERT INTO `t_city` VALUES (139, '莱芜市', 15, '0634');INSERT INTO `t_city` VALUES (140, '聊城市', 15, '0635');INSERT INTO `t_city` VALUES (141, '商丘市', 16, '0370');INSERT INTO `t_city` VALUES (142, '郑州市', 16, '0371');INSERT INTO `t_city` VALUES (143, '安阳市', 16, '0372');INSERT INTO `t_city` VALUES (144, '新乡市', 16, '0373');INSERT INTO `t_city` VALUES (145, '许昌市', 16, '0374');INSERT INTO `t_city` VALUES (146, '平顶山市', 16, '0375');INSERT INTO `t_city` VALUES (147, '信阳市', 16, '0376');INSERT INTO `t_city` VALUES (148, '南阳市', 16, '0377');INSERT INTO `t_city` VALUES (149, '开封市', 16, '0378');INSERT INTO `t_city` VALUES (150, '洛阳市', 16, '0379');INSERT INTO `t_city` VALUES (151, '济源市', 16, '0391');INSERT INTO `t_city` VALUES (152, '焦作市', 16, '0391');INSERT INTO `t_city` VALUES (153, '鹤壁市', 16, '0392');INSERT INTO `t_city` VALUES (154, '濮阳市', 16, '0393');INSERT INTO `t_city` VALUES (155, '周口市', 16, '0394');INSERT INTO `t_city` VALUES (156, '漯河市', 16, '0395');INSERT INTO `t_city` VALUES (157, '驻马店市', 16, '0396');INSERT INTO `t_city` VALUES (158, '三门峡市', 16, '0398');INSERT INTO `t_city` VALUES (159, '武汉市', 17, '027');INSERT INTO `t_city` VALUES (160, '襄樊市', 17, '0710');INSERT INTO `t_city` VALUES (161, '鄂州市', 17, '0711');INSERT INTO `t_city` VALUES (162, '孝感市', 17, '0712');INSERT INTO `t_city` VALUES (163, '黄冈市', 17, '0713');INSERT INTO `t_city` VALUES (164, '黄石市', 17, '0714');INSERT INTO `t_city` VALUES (165, '咸宁市', 17, '0715');INSERT INTO `t_city` VALUES (166, '荆州市', 17, '0716');INSERT INTO `t_city` VALUES (167, '宜昌市', 17, '0717');INSERT INTO `t_city` VALUES (168, '恩施土家族苗族自治州', 17, '0718');INSERT INTO `t_city` VALUES (169, '神农架林区', 17, '0719');INSERT INTO `t_city` VALUES (170, '十堰市', 17, '0719');INSERT INTO `t_city` VALUES (171, '随州市', 17, '0722');INSERT INTO `t_city` VALUES (172, '荆门市', 17, '0724');INSERT INTO `t_city` VALUES (173, '仙桃市', 17, '0728');INSERT INTO `t_city` VALUES (174, '天门市', 17, '0728');INSERT INTO `t_city` VALUES (175, '潜江市', 17, '0728');INSERT INTO `t_city` VALUES (176, '岳阳市', 18, '0730');INSERT INTO `t_city` VALUES (177, '长沙市', 18, '0731');INSERT INTO `t_city` VALUES (178, '湘潭市', 18, '0732');INSERT INTO `t_city` VALUES (179, '株洲市', 18, '0733');INSERT INTO `t_city` VALUES (180, '衡阳市', 18, '0734');INSERT INTO `t_city` VALUES (181, '郴州市', 18, '0735');INSERT INTO `t_city` VALUES (182, '常德市', 18, '0736');INSERT INTO `t_city` VALUES (183, '益阳市', 18, '0737');INSERT INTO `t_city` VALUES (184, '娄底市', 18, '0738');INSERT INTO `t_city` VALUES (185, '邵阳市', 18, '0739');INSERT INTO `t_city` VALUES (186, '湘西土家族苗族自治州', 18, '0743');INSERT INTO `t_city` VALUES (187, '张家界市', 18, '0744');INSERT INTO `t_city` VALUES (188, '怀化市', 18, '0745');INSERT INTO `t_city` VALUES (189, '永州市', 18, '0746');INSERT INTO `t_city` VALUES (190, '广州市', 19, '020');INSERT INTO `t_city` VALUES (191, '汕尾市', 19, '0660');INSERT INTO `t_city` VALUES (192, '阳江市', 19, '0662');INSERT INTO `t_city` VALUES (193, '揭阳市', 19, '0663');INSERT INTO `t_city` VALUES (194, '茂名市', 19, '0668');INSERT INTO `t_city` VALUES (195, '惠州市', 19, '0752');INSERT INTO `t_city` VALUES (196, '江门市', 19, '0750');INSERT INTO `t_city` VALUES (197, '韶关市', 19, '0751');INSERT INTO `t_city` VALUES (198, '梅州市', 19, '0753');INSERT INTO `t_city` VALUES (199, '汕头市', 19, '0754');INSERT INTO `t_city` VALUES (200, '深圳市', 19, '0755');INSERT INTO `t_city` VALUES (201, '珠海市', 19, '0756');INSERT INTO `t_city` VALUES (202, '佛山市', 19, '0757');INSERT INTO `t_city` VALUES (203, '肇庆市', 19, '0758');INSERT INTO `t_city` VALUES (204, '湛江市', 19, '0759');INSERT INTO `t_city` VALUES (205, '中山市', 19, '0760');INSERT INTO `t_city` VALUES (206, '河源市', 19, '0762');INSERT INTO `t_city` VALUES (207, '清远市', 19, '0763');INSERT INTO `t_city` VALUES (208, '云浮市', 19, '0766');INSERT INTO `t_city` VALUES (209, '潮州市', 19, '0768');INSERT INTO `t_city` VALUES (210, '东莞市', 19, '0769');INSERT INTO `t_city` VALUES (211, '兰州市', 22, '0931');INSERT INTO `t_city` VALUES (212, '金昌市', 22, '0935');INSERT INTO `t_city` VALUES (213, '白银市', 22, '0943');INSERT INTO `t_city` VALUES (214, '天水市', 22, '0938');INSERT INTO `t_city` VALUES (215, '嘉峪关市', 22, '0937');INSERT INTO `t_city` VALUES (216, '武威市', 22, '0935');INSERT INTO `t_city` VALUES (217, '张掖市', 22, '0936');INSERT INTO `t_city` VALUES (218, '平凉市', 22, '0933');INSERT INTO `t_city` VALUES (219, '酒泉市', 22, '0937');INSERT INTO `t_city` VALUES (220, '庆阳市', 22, '0944');INSERT INTO `t_city` VALUES (221, '定西市', 22, '0932');INSERT INTO `t_city` VALUES (222, '陇南市', 22, '0939');INSERT INTO `t_city` VALUES (223, '临夏回族自治州', 22, '0930');INSERT INTO `t_city` VALUES (224, '甘南藏族自治州', 22, '0941');INSERT INTO `t_city` VALUES (225, '成都市', 28, '028');INSERT INTO `t_city` VALUES (226, '攀枝花市', 28, '0812');INSERT INTO `t_city` VALUES (227, '自贡市', 28, '0813');INSERT INTO `t_city` VALUES (228, '绵阳市', 28, '0816');INSERT INTO `t_city` VALUES (229, '南充市', 28, '0817');INSERT INTO `t_city` VALUES (230, '达州市', 28, '0818');INSERT INTO `t_city` VALUES (231, '遂宁市', 28, '0825');INSERT INTO `t_city` VALUES (232, '广安市', 28, '0826');INSERT INTO `t_city` VALUES (233, '巴中市', 28, '0827');INSERT INTO `t_city` VALUES (234, '泸州市', 28, '0830');INSERT INTO `t_city` VALUES (235, '宜宾市', 28, '0831');INSERT INTO `t_city` VALUES (236, '资阳市', 28, '0832');INSERT INTO `t_city` VALUES (237, '内江市', 28, '0832');INSERT INTO `t_city` VALUES (238, '乐山市', 28, '0833');INSERT INTO `t_city` VALUES (239, '眉山市', 28, '028');INSERT INTO `t_city` VALUES (240, '凉山彝族自治州', 28, '0834');INSERT INTO `t_city` VALUES (241, '雅安市', 28, '0835');INSERT INTO `t_city` VALUES (242, '甘孜藏族自治州', 28, '0836');INSERT INTO `t_city` VALUES (243, '阿坝藏族羌族自治州', 28, '0837');INSERT INTO `t_city` VALUES (244, '德阳市', 28, '0838');INSERT INTO `t_city` VALUES (245, '广元市', 28, '0839');INSERT INTO `t_city` VALUES (246, '贵阳市', 29, '0851');INSERT INTO `t_city` VALUES (247, '遵义市', 29, '0852');INSERT INTO `t_city` VALUES (248, '安顺市', 29, '0853');INSERT INTO `t_city` VALUES (249, '黔南布依族苗族自治州', 29, '0854');INSERT INTO `t_city` VALUES (250, '黔东南苗族侗族自治州', 29, '0855');INSERT INTO `t_city` VALUES (251, '铜仁地区', 29, '0856');INSERT INTO `t_city` VALUES (252, '毕节地区', 29, '0857');INSERT INTO `t_city` VALUES (253, '六盘水市', 29, '0858');INSERT INTO `t_city` VALUES (254, '黔西南布依族苗族自治州', 29, '0859');INSERT INTO `t_city` VALUES (255, '海口市', 20, '0898');INSERT INTO `t_city` VALUES (256, '三亚市', 20, '0898');INSERT INTO `t_city` VALUES (257, '五指山市', 20, '0898');INSERT INTO `t_city` VALUES (258, '琼海市', 20, '0898');INSERT INTO `t_city` VALUES (259, '儋州市', 20, '0890');INSERT INTO `t_city` VALUES (260, '文昌市', 20, '0898');INSERT INTO `t_city` VALUES (261, '万宁市', 20, '0898');INSERT INTO `t_city` VALUES (262, '东方市', 20, '0898');INSERT INTO `t_city` VALUES (263, '澄迈县', 20, '0898');INSERT INTO `t_city` VALUES (264, '定安县', 20, '0898');INSERT INTO `t_city` VALUES (265, '屯昌县', 20, '0898');INSERT INTO `t_city` VALUES (266, '临高县', 20, '0898');INSERT INTO `t_city` VALUES (267, '白沙黎族自治县', 20, '0898');INSERT INTO `t_city` VALUES (268, '昌江黎族自治县', 20, '0898');INSERT INTO `t_city` VALUES (269, '乐东黎族自治县', 20, '0898');INSERT INTO `t_city` VALUES (270, '陵水黎族自治县', 20, '0898');INSERT INTO `t_city` VALUES (271, '保亭黎族苗族自治县', 20, '0898');INSERT INTO `t_city` VALUES (272, '琼中黎族苗族自治县', 20, '0898');INSERT INTO `t_city` VALUES (273, '西双版纳傣族自治州', 30, '0691');INSERT INTO `t_city` VALUES (274, '德宏傣族景颇族自治州', 30, '0692');INSERT INTO `t_city` VALUES (275, '昭通市', 30, '0870');INSERT INTO `t_city` VALUES (276, '昆明市', 30, '0871');INSERT INTO `t_city` VALUES (277, '大理白族自治州', 30, '0872');INSERT INTO `t_city` VALUES (278, '红河哈尼族彝族自治州', 30, '0873');INSERT INTO `t_city` VALUES (279, '曲靖市', 30, '0874');INSERT INTO `t_city` VALUES (280, '保山市', 30, '0875');INSERT INTO `t_city` VALUES (281, '文山壮族苗族自治州', 30, '0876');INSERT INTO `t_city` VALUES (282, '玉溪市', 30, '0877');INSERT INTO `t_city` VALUES (283, '楚雄彝族自治州', 30, '0878');INSERT INTO `t_city` VALUES (284, '普洱市', 30, '0879');INSERT INTO `t_city` VALUES (285, '临沧市', 30, '0883');INSERT INTO `t_city` VALUES (286, '怒江傈傈族自治州', 30, '0886');INSERT INTO `t_city` VALUES (287, '迪庆藏族自治州', 30, '0887');INSERT INTO `t_city` VALUES (288, '丽江市', 30, '0888');INSERT INTO `t_city` VALUES (289, '海北藏族自治州', 25, '0970');INSERT INTO `t_city` VALUES (290, '西宁市', 25, '0971');INSERT INTO `t_city` VALUES (291, '海东地区', 25, '0972');INSERT INTO `t_city` VALUES (292, '黄南藏族自治州', 25, '0973');INSERT INTO `t_city` VALUES (293, '海南藏族自治州', 25, '0974');INSERT INTO `t_city` VALUES (294, '果洛藏族自治州', 25, '0975');INSERT INTO `t_city` VALUES (295, '玉树藏族自治州', 25, '0976');INSERT INTO `t_city` VALUES (296, '海西蒙古族藏族自治州', 25, '0977');INSERT INTO `t_city` VALUES (297, '西安市', 23, '029');INSERT INTO `t_city` VALUES (298, '咸阳市', 23, '029');INSERT INTO `t_city` VALUES (299, '延安市', 23, '0911');INSERT INTO `t_city` VALUES (300, '榆林市', 23, '0912');INSERT INTO `t_city` VALUES (301, '渭南市', 23, '0913');INSERT INTO `t_city` VALUES (302, '商洛市', 23, '0914');INSERT INTO `t_city` VALUES (303, '安康市', 23, '0915');INSERT INTO `t_city` VALUES (304, '汉中市', 23, '0916');INSERT INTO `t_city` VALUES (305, '宝鸡市', 23, '0917');INSERT INTO `t_city` VALUES (306, '铜川市', 23, '0919');INSERT INTO `t_city` VALUES (307, '防城港市', 21, '0770');INSERT INTO `t_city` VALUES (308, '南宁市', 21, '0771');INSERT INTO `t_city` VALUES (309, '崇左市', 21, '0771');INSERT INTO `t_city` VALUES (310, '来宾市', 21, '0772');INSERT INTO `t_city` VALUES (311, '柳州市', 21, '0772');INSERT INTO `t_city` VALUES (312, '桂林市', 21, '0773');INSERT INTO `t_city` VALUES (313, '梧州市', 21, '0774');INSERT INTO `t_city` VALUES (314, '贺州市', 21, '0774');INSERT INTO `t_city` VALUES (315, '贵港市', 21, '0775');INSERT INTO `t_city` VALUES (316, '玉林市', 21, '0775');INSERT INTO `t_city` VALUES (317, '百色市', 21, '0776');INSERT INTO `t_city` VALUES (318, '钦州市', 21, '0777');INSERT INTO `t_city` VALUES (319, '河池市', 21, '0778');INSERT INTO `t_city` VALUES (320, '北海市', 21, '0779');INSERT INTO `t_city` VALUES (321, '拉萨市', 31, '0891');INSERT INTO `t_city` VALUES (322, '日喀则地区', 31, '0892');INSERT INTO `t_city` VALUES (323, '山南地区', 31, '0893');INSERT INTO `t_city` VALUES (324, '林芝地区', 31, '0894');INSERT INTO `t_city` VALUES (325, '昌都地区', 31, '0895');INSERT INTO `t_city` VALUES (326, '那曲地区', 31, '0896');INSERT INTO `t_city` VALUES (327, '阿里地区', 31, '0897');INSERT INTO `t_city` VALUES (328, '银川市', 26, '0951');INSERT INTO `t_city` VALUES (329, '石嘴山市', 26, '0952');INSERT INTO `t_city` VALUES (330, '吴忠市', 26, '0953');INSERT INTO `t_city` VALUES (331, '固原市', 26, '0954');INSERT INTO `t_city` VALUES (332, '中卫市', 26, '0955');INSERT INTO `t_city` VALUES (333, '塔城地区', 24, '0901');INSERT INTO `t_city` VALUES (334, '哈密地区', 24, '0902');INSERT INTO `t_city` VALUES (335, '和田地区', 24, '0903');INSERT INTO `t_city` VALUES (336, '阿勒泰地区', 24, '0906');INSERT INTO `t_city` VALUES (337, '克孜勒苏柯尔克孜自治州', 24, '0908');INSERT INTO `t_city` VALUES (338, '博尔塔拉蒙古自治州', 24, '0909');INSERT INTO `t_city` VALUES (339, '克拉玛依市', 24, '0990');INSERT INTO `t_city` VALUES (340, '乌鲁木齐市', 24, '0991');INSERT INTO `t_city` VALUES (341, '石河子市', 24, '0993');INSERT INTO `t_city` VALUES (342, '昌吉回族自治州', 24, '0994');INSERT INTO `t_city` VALUES (343, '五家渠市', 24, '0994');INSERT INTO `t_city` VALUES (344, '吐鲁番地区', 24, '0995');INSERT INTO `t_city` VALUES (345, '巴音郭楞蒙古自治州', 24, '0996');INSERT INTO `t_city` VALUES (346, '阿克苏地区', 24, '0997');INSERT INTO `t_city` VALUES (347, '阿拉尔市', 24, '0997');INSERT INTO `t_city` VALUES (348, '喀什地区', 24, '0998');INSERT INTO `t_city` VALUES (349, '图木舒克市', 24, '0998');INSERT INTO `t_city` VALUES (350, '伊犁哈萨克自治州', 24, '0999');INSERT INTO `t_city` VALUES (351, '呼伦贝尔市', 5, '0470');INSERT INTO `t_city` VALUES (352, '呼和浩特市', 5, '0471');INSERT INTO `t_city` VALUES (353, '包头市', 5, '0472');INSERT INTO `t_city` VALUES (354, '乌海市', 5, '0473');INSERT INTO `t_city` VALUES (355, '乌兰察布市', 5, '0474');INSERT INTO `t_city` VALUES (356, '通辽市', 5, '0475');INSERT INTO `t_city` VALUES (357, '赤峰市', 5, '0476');INSERT INTO `t_city` VALUES (358, '鄂尔多斯市', 5, '0477');INSERT INTO `t_city` VALUES (359, '巴彦淖尔市', 5, '0478');INSERT INTO `t_city` VALUES (360, '锡林郭勒盟', 5, '0479');INSERT INTO `t_city` VALUES (361, '兴安盟', 5, '0482');INSERT INTO `t_city` VALUES (362, '阿拉善盟', 5, '0483');INSERT INTO `t_city` VALUES (363, '台北市', 32, '008862');INSERT INTO `t_city` VALUES (364, '高雄市', 32, '008867');INSERT INTO `t_city` VALUES (365, '基隆市', 32, '008862');INSERT INTO `t_city` VALUES (366, '台中市', 32, '008864');INSERT INTO `t_city` VALUES (367, '台南市', 32, '008866');INSERT INTO `t_city` VALUES (368, '新竹市', 32, '008863');INSERT INTO `t_city` VALUES (369, '嘉义市', 32, '008865');INSERT INTO `t_city` VALUES (370, '澳门特别行政区', 33, '00853');INSERT INTO `t_city` VALUES (371, '香港特别行政区', 34, '00852')";
	var strs = city_insert.split(";");
	var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
	db.transaction(function(tx) {
		for (var i = 0; i < strs.length; i++) {
			//console.log(i);
			tx.executeSql(strs[i], [], function(tx, reslut) {
				//console.log(JSON.stringify(reslut));
			});
		};
	});
}

function insertprovicemsg() {
	var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
	var provice_insert = "INSERT INTO `t_province` VALUES (1, '北京市', '直辖市');INSERT INTO `t_province` VALUES (2, '天津市', '直辖市');INSERT INTO `t_province` VALUES (3, '河北省', '省份');INSERT INTO `t_province` VALUES (4, '山西省', '省份');INSERT INTO `t_province` VALUES (5, '内蒙古自治区', '自治区');INSERT INTO `t_province` VALUES (6, '辽宁省', '省份');INSERT INTO `t_province` VALUES (7, '吉林省', '省份');INSERT INTO `t_province` VALUES (8, '黑龙江省', '省份');INSERT INTO `t_province` VALUES (9, '上海市', '直辖市');INSERT INTO `t_province` VALUES (10, '江苏省', '省份');INSERT INTO `t_province` VALUES (11, '浙江省', '省份');INSERT INTO `t_province` VALUES (12, '安徽省', '省份');INSERT INTO `t_province` VALUES (13, '福建省', '省份');INSERT INTO `t_province` VALUES (14, '江西省', '省份');INSERT INTO `t_province` VALUES (15, '山东省', '省份');INSERT INTO `t_province` VALUES (16, '河南省', '省份');INSERT INTO `t_province` VALUES (17, '湖北省', '省份');INSERT INTO `t_province` VALUES (18, '湖南省', '省份');INSERT INTO `t_province` VALUES (19, '广东省', '省份');INSERT INTO `t_province` VALUES (20, '海南省', '省份');INSERT INTO `t_province` VALUES (21, '广西壮族自治区', '自治区');INSERT INTO `t_province` VALUES (22, '甘肃省', '省份');INSERT INTO `t_province` VALUES (23, '陕西省', '省份');INSERT INTO `t_province` VALUES (24, '新 疆维吾尔自治区', '自治区');INSERT INTO `t_province` VALUES (25, '青海省', '省份');INSERT INTO `t_province` VALUES (26, '宁夏回族自治区', '自治区');INSERT INTO `t_province` VALUES (27, '重庆市', '直辖市');INSERT INTO `t_province` VALUES (28, '四川省', '省份');INSERT INTO `t_province` VALUES (29, '贵州省', '省份');INSERT INTO `t_province` VALUES (30, '云南省', '省份');INSERT INTO `t_province` VALUES (31, '西藏自治区', '自治区');INSERT INTO `t_province` VALUES (32, '台湾省', '省份');INSERT INTO `t_province` VALUES (33, '澳门特别行政区', '特别行政区');INSERT INTO `t_province` VALUES (34, '香港特别行政区', '特别行政区')";
	var strs = provice_insert.split(";");
	db.transaction(function(tx) {
		for (var i = 0; i < strs.length; i++) {
			//console.log(i);
			tx.executeSql(strs[i], [], function(tx, reslut) {
				//console.log(JSON.stringify(reslut));
			});

		};
	});

}



function errorHandler() {
		console.log('An error occured:');
	}
/*
 *向数据库插入地区信息；
 * */

function handleFiles() {
	var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
	plus.io.requestFileSystem(plus.io.PRIVATE_WWW, function(fs) {
		//console.log("Welcome to Filesystem! It's showtime:");
		fs.root.getFile('zone.txt', {
			create: false
		}, function(fileEntry) {
		//	console.log("hdfsk");
			fileEntry.file(function(file) {

				var reader = new plus.io.FileReader();
				reader.onloadend = function(event) {
					var insertsql = event.target.result;
					var strs = insertsql.split(";");
					db.transaction(function(tx) {
						for (var i = 0; i < strs.length; i++) {
							//console.log(i);
							tx.executeSql(strs[i], [], function(tx, reslut) {
								//console.log(JSON.stringify(reslut));
							});

						};
					});
				};
				reader.readAsText(file, 'utf-8');
				//console.log(JSON.stringify(file));
			}, errorHandler);
		
		}, errorHandler);
	});
}

function initFS(fs) {
	alert("Welcome to Filesystem! It's showtime:");
	fs.root.getFile('zone.txt', {}, function(fileEntry) {
		fileEntry.file(function(file) {
			var reader = new FileReader();
			reader.onloadend = function(e) {
				console.log("yyy:" + this.result);
			};
			//reader.readAsText(file);
		}, errorHandler);
	}, errorHandler);
}




function test() {
		console.log("test 执行了");
		var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
		var testsql = "select * from t_zone";
		db.transaction(function(tx) {
			tx.executeSql(testsql, [], function(tx, result) { //results.rows.item(i).name
				console.log("yyy" + results.rows.item(i).zonename);
			}, function(tx, error) {
				console.log(JSON.stringify(error));
			}, null);
		});
	}
	/*
	 *
	 * 保存产品的信息到数据库
	 * */



function saveproductmsg(result) {
	//console.log("sql save "+result.ret);
	if (result.ret != "1") {

		return;
	}
	var data = result.data;
	//console.log(JSON.stringify(result));
	var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
	var sql;
	if (!data.length) {
		sql = "insert into PRODUCT_LIST(_id,_bests,_buynums,_buytimes,_collects,_content,_cpdl,_cpxl,_dfen,_dj0,_dj1,_edate,_jldw,_kcsl,_mid,_ok,_picurl,_rebate,_sdate,_sells,_shopid,_tbmoney,_title,_tmdj,_tmlb,_tmurl,_tmword,_xh,_zkl) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		db.transaction(function(tx) {
			tx.executeSql(sql, [data.tmid, data.bests, data.buynums,
				data.buytimes, data.collects, data.content,
				data.cpdl, data.cpxl, data.dfen, data.dj0, data.dj1,
				data.edate, data.jldw, data.kcsl, data.mid, data.ok, data.picurl,
				data.rebate, data.sdate, data.sells, data.shopid, data.tbmoney,
				data.title, data.tmdj, data.tmlb, data.tmurl, data.tmword, data.xh, data.zkl
			]);
		}, function() {
			console.log("添加成功");
		}, function(tx, error) {
			console.log("error:" + error);
		});
		return;
	}
	for (var i = 0; i < data.length; i++) {
		sql = "insert into PRODUCT_LIST(_id,_bests,_buynums,_buytimes,_collects,_content,_cpdl,_cpxl,_dfen,_dj0,_dj1,_edate,_jldw,_kcsl,_mid,_ok,_picurl,_rebate,_sdate,_sells,_shopid,_tbmoney,_title,_tmdj,_tmlb,_tmurl,_tmword,_xh,_zkl) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
		console.log(sql);
		db.transaction(function(tx) {
			tx.executeSql(sql, [data[i].tmid, data[i].bests, data[i].buynums,
				data[i].buytimes, data[i].collects, data[i].content,
				data[i].cpdl, data[i].cpxl, data[i].dfen, data[i].dj0, data[i].dj1,
				data[i].edate, data[i].jldw, data[i].kcsl, data[i].mid, data[i].ok, data[i].picurl,
				data[i].rebate, data[i].sdate, data[i].sells, data[i].shopid, data[i].tbmoney,
				data[i].title, data[i].tmdj, data[i].tmlb, data[i].tmurl, data[i].
				tmword, data[i].xh, data[i].zkl
			], function(tx, error) {
				console.log(error);
			});

		});

	}
}

function getproductmsg(tmid) {
	var db = openDatabase('teambuy', '1.0', 'Test DB', 5 * 1024 * 1024);
	db.transaction(function(tx) {
		var sql = "select * from PRODUCT_LIST where _id=? "
		tx.executeSql(sql, [tmid], function(tx, result) { //results.rows.item(i).name
			showOrderProductMsg(result);
		}, function(tx, error) {
			console.log(JSON.stringify(error));
		}, null);
	});
}