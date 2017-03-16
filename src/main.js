var Vue = require('vue')
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
window.iscrollUtils = require("./js/plugins/iscroll/scripts/iscrollUtils.js");
require("./js/plugins/layer/layer.js");
require('./css/common.css');
require('./css/memberHome.css');
require('./css/shopdetails.css');
var configuration = {
	"global": {
		"serverPath": "http://wx.szgulu.com/vipyun/public",//http://112.74.18.249:88/vipyun/public/index.php",
		"imgPath":"http://112.74.18.249:88/vipyun/public/static/upload/",
		"shopid":sessionStorage.getItem("shopid")
	}
};
window.configuration = configuration;
if(!configuration.global.shopid)layerUtils.iAlert("获取商店ID失败");

//实例化vue模块 
Vue.use(VueRouter);
Vue.use(VueResource);
var routerMap = require('./router/router');//路由配置
var app = Vue.extend({});
var router = new VueRouter();
routerMap(router);
//启动
router.start(app, "#afui");
//微信自动登陆
var code = sessionStorage.getItem("code");
if(code&&!sessionStorage.getItem("token")){
	Vue.http.post(configuration.global.serverPath + "/api/wxpay/wxLogin", {shopid:configuration.global.shopid,code:code}, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, emulateJSON: true }).then(function(response) {
		var results = response.data;
		if(results.code === 200) {
			sessionStorage.setItem("token",results.data.token);
			sessionStorage.setItem("openid",results.data.openid);
		} else {
//			layerUtils.iAlert(results.message || "请求服务器失败");
		}
	}, function(response) {
//		alert(JSON.stringify(response));
//		layerUtils.iAlert("连接服务器失败，请联系管理员");
	});	
}


Vue.http.post(configuration.global.serverPath + "/api/tabbar/getTabbar", { shopid: configuration.global.shopid }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, emulateJSON: true }).then(function(response) {
	var results = response.data;
	if(results.code === 200) {
		for(var i=0,dataLength = results.data.length;i<dataLength;i++){
			$("#footer .clearfix li:eq("+i+") span").html(results.data[i].module_name).css({
				"background":"url(" + configuration.global.imgPath + results.data[i].image + ") no-repeat center",
				"background-size":"1.56rem 1.4rem"
			});
		}
	} else {
		layerUtils.iAlert(results.message || "请求服务器失败");
	}
}, function(response) {
	layerUtils.iAlert("连接服务器失败，请联系管理员");
});
$("#footer .clearfix li").on("touchstart",function(){
	$(this).css("background-color","#999");
});
$("#footer .clearfix li").on("touchend",function(){
	$(this).css("background-color","#fff");
});
//购物车状态全局管理
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
