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
		},
		'/memberCenter/memberHome':{
			name:'memberHome',//会员中心
			title:"会员中心",
			isLogin:true,			
			component:function(resolve){
				require(['../components/memberCenter/memberHome.vue'],resolve)
			}
		},
		'/memberCenter/orderAll':{
			name:'orderAll',//全部订单
			title:"我的订单",
			isLogin:true,			
			component:function(resolve){
				require(['../components/memberCenter/orderAll.vue'],resolve)
			}
		},
		'/memberCenter/myReserve':{
			name:'myReserve',//我要预订
			component:function(resolve){
				require(['../components/memberCenter/myReserve.vue'],resolve)
			}
		},
		'/memberCenter/personInfo':{
			name:'personInfo',//个人资料
			title:"个人资料",
			isLogin:true,
			component:function(resolve){
				require(['../components/memberCenter/personInfo.vue'],resolve)
			}
		},
		'/memberCenter/orderDetail':{
			name:'orderDetail',//订单详情
			title:"订单详情",
			isLogin:true,			
			component:function(resolve){
				require(['../components/memberCenter/orderDetail.vue'],resolve)
			}
		},
		'/memberCenter/messageboard':{
			name:'messageboard',//留言板
			title:"留言板",
			isLogin:true,			
			component:function(resolve){
				require(['../components/memberCenter/messageboard.vue'],resolve)
			}
		},
		'/memberCenter/messageInput':{
			name:'messageInput',//发表留言
			title:"发表留言",
			isLogin:true,
			component:function(resolve){
				require(['../components/memberCenter/messageInput.vue'],resolve)
			}
		},
		'/memberCenter/memberPoints':{
			name:'memberPoints',//会员卡积分
			title:"会员卡积分",
			isLogin:true,			
			component:function(resolve){
				require(['../components/memberCenter/memberPoints.vue'],resolve)
			}
		},
		'/memberCenter/pointsChange':{
			name:'pointsChange',//积分变动
			title:"积分变动",
			isLogin:true,			
			component:function(resolve){
				require(['../components/memberCenter/pointsChange.vue'],resolve)
			}
		},
		'/memberCenter/twoCode':{
			name:'twoCode',//会员二维码
			component:function(resolve){
				require(['../components/memberCenter/twoCode.vue'],resolve)
			}
		},
		'/memberCenter/myReservation':{
			name:'myReservation',//预订记录
			title:"预订记录",
			isLogin:true,			
			component:function(resolve){
				require(['../components/memberCenter/myReservation.vue'],resolve)
			}
		},
		'/memberCenter/myCoupon':{
			name:'myCoupon',//优惠券
			component:function(resolve){
				require(['../components/memberCenter/myCoupon.vue'],resolve)
			}
		},
		'/memberCenter/signPage':{
			name:'signPage',//签到记录
			title:"签到记录",
			isLogin:true,			
			component:function(resolve){
				require(['../components/memberCenter/signPage.vue'],resolve)
			}
		},
		'/memberCenter/login':{
			name:'login',//登录
			component:function(resolve){
				require(['../components/memberCenter/login.vue'],resolve)
			}
		},
		'/memberCenter/register':{
			name:'register',//注册
			component:function(resolve){
				require(['../components/memberCenter/register.vue'],resolve)
			}
		},
		'/memberCenter/callPasswd':{
			name:'callPasswd',//找回密码
			component:function(resolve){
				require(['../components/memberCenter/callPasswd.vue'],resolve)
			}
		},
		'/memberCenter/resetPassd':{
			name:'resetPassd',//重新设置密码
			component:function(resolve){
				require(['../components/memberCenter/resetPassd.vue'],resolve)
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
//		var paramCode = location.search.slice(1).split("&")[0].split("=")[1];
//		sessionStorage.setItem("code", paramCode);
	});

}