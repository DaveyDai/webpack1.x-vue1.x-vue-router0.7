var Vue = require('vue')
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');

//实例化vue模块 
Vue.use(VueRouter);
Vue.use(VueResource);
var routerMap = require('./router/router');//路由配置
var app = Vue.extend({});
var router = new VueRouter();
routerMap(router);
//启动
router.start(app, "#afui");


















































window.changeLocalStorage = function(key,item,callback){
	var commodity = {id:Number(item.id),name:item.name,unit:item.unit,price:item.price,point:item.point,num:1};//构建商品
	var shopCart = JSON.parse(localStorage.getItem("shopCart"))||[];
	var hasShop = false,commodNum = 0;
	for(var ii = 0,shopLength = shopCart.length;ii < shopLength;ii++){
		if(shopCart[ii].id == commodity.id){
			hasShop = true;
			key?shopCart[ii].num++:shopCart[ii].num--;
		}
		commodNum += shopCart[ii].num;
		if(shopCart[ii].num === 0){  //移除数量为0的商品
			shopCart.splice(ii,1);
			shopLength--;
		}
	}
	if(!hasShop && key){
		shopCart.push(commodity);
		commodNum++;
	}
	localStorage.setItem("shopCart",JSON.stringify(shopCart));
	var choiceElem = document.getElementById("choiceCommodityNum");
	choiceElem.innerText = commodNum;
	choiceElem.style.display = commodNum > 0?"block":"none";
	if(typeof callback === "function")callback();
}

//购物车显示重拾
var comCart = JSON.parse(localStorage.getItem("shopCart"))||[],commNum = 0;
for(var comIt=0,comLen=comCart.length;comIt<comLen;comIt++){
	commNum += comCart[comIt].num;
}
var choiceElem = document.getElementById("choiceCommodityNum");
choiceElem.innerText = commNum;
choiceElem.style.display = commNum > 0?"block":"none";
