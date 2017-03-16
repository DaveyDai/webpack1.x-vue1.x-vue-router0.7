// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend创建的组件构造函数，也可以是一个组件选项对象。
module.exports = function(router) {
	// 路由表
	router.map({
		'/home/home': {
			name: 'home', //首页
			title:"左岸阳光首页",
			isLogin:false,
			component: function(resolve) {
				require(['../components/home/home.vue'], resolve)
			}
		},
		'/home/aboutOur': {
			name: 'aboutOur', //关于我们
			component: function(resolve) {
				require(['../components/home/aboutOur.vue'], resolve)
			}
		},
		'/home/bulletinBoard':{
			name:'bulletinBoard',//公告栏
			component:function(resolve){
				require(['../components/home/bulletinBoard.vue'],resolve)
			}
		},		
		'/life/lifeHome': {
			name: 'lifeHome', //生活服务
			component: function(resolve) {
				require(['../components/life/lifeHome.vue'], resolve)
			}
		},
		'/shopping/shoppingHome': {
			name: 'shoppingHome', //购物车
			component: function(resolve) {
				require(['../components/shopping/shoppingHome.vue'], resolve)
			}
		},
		'/life/shopdetails': {
			name: 'shopdetails', //商品详情
			component: function(resolve) {
				require(['../components/life/shopdetails.vue'], resolve)
			}
		},
		'/shopping/orderSuccess': {
			name: 'orderSuccess', //下单成功
			component: function(resolve) {
				require(['../components/shopping/orderSuccess.vue'], resolve)
			}
		},
		'/shopping/orderPay':{
			name:'orderPay',//支付方式
			title:"支付方式",
			isLogin:true,
			showBottom:true,
			component:function(resolve){
				require(['../components/shopping/orderPay.vue'],resolve)
			}
		}
	});
	//默认/重定向到home页
	router.redirect({'/': "/home/home"});
	router.afterEach(function(transition) {
		console.log('成功浏览到: ' + transition.to.name);
		sessionStorage.setItem("pageCode", transition.to.name || "");
		sessionStorage.setItem("prePageCode", transition.from.name || sessionStorage.getItem("prePageCode") || "");
		document.getElementById("footer").style.display = transition.to.showBottom?"none":"block";
	});
	router.beforeEach(function(transition) {
		console.log("开始路由---全局钩子开始：" + transition.to.name);
		if(transition.to.isLogin && !sessionStorage.getItem("token")){
			sessionStorage.setItem("toLoginPageCode",transition.to.name);
			transition.redirect({name:"login"});
		}else{
			transition.next();
		}
	});

}