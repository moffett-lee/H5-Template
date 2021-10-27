var testMenu=[
    {"name": "印刷品",
      "submenu": [
            {"name": "样本","url": ""},
            {"name": "信封","url": ""}]
	},
	
    {"name": "展览品",
      "submenu": [
            {"name": "X展架","url": ""},
            {"name": "易拉宝",
              "submenu": [
                   {"name": "易拉宝1","url": ""},
				   {"name": "易拉宝2","url": ""},]},
            {"name": "L展架","url": ""},
            {"name": "海报","url": ""},
			{"name": "条幅","url": ""},
			{"name": "大型展架","url": ""},
			{"name": "其他","url": ""}]		
	},
			
    {"name": "礼品",
      "submenu": [
            {"name": "礼品1","url": ""},
            {"name": "礼品2","url": ""},
            {"name": "其他","url": ""}]
    }
];
	$(function(){
		new AccordionMenu({menuArrs:testMenu});
	});