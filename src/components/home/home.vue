<template>
	<div id="home" style="position: relative;">
		<section class="main fixed">
			<header class="header">
				<div class="hx_banner" id="wrapper_index_head">
					<ul class="ban_list" id="scroller_index_head">
						<li v-for="item in homeBannerList" ><a v-bind:href=item.url ><img v-bind:src=item.image ></a></li>
						<!--<li><a><img src="../../images/home_banner@2x.png" style="width: 750px; height: 11rem;" /></a></li>-->
					</ul>
					<div class="num-list">
						<div class="num_list" id="tag_index_head">
							<span v-for="item in homeBannerList"></span>
						</div>						
					</div>
				</div>							
			</header>				
			<article class="content">
				<div class="c-hotel-tall">
					<img src="../../images/home_notice@2x.png"/>
					<span>{{getNotice.text}}</span>
				</div>
				<div class="c-hotel-centent">
					<div class="c-h-in c-h-img">
						<img src="../../images/home_shop_image@2x.png"/>
					</div>
					<div class="c-h-in c-h-cent">
						<div class="c-h-name">
							<span>{{storeInfo.name}}</span>
							<img src="../../images/home_right_arrow@2x.png"/>
						</div>
						<div class="c-h-yysj">
							<span>营业时间:</span>
							<span class="c-h-time">{{storeInfo.open_time+'-'+storeInfo.end_time}}</span>
						</div>
						<div class="c-h-phone">
							<span>联系电话:</span>
							<span><a href="tel:0755">{{storeInfo.phone}}</a></span>
						</div>
					</div>
					<div class="c-h-in c-h-sfyy">
						<div class="c-h-yyz active"><span>营业中</span></div>
						<div class="c-h-wyy"><span>未营业</span></div>
					</div>
				</div>
				<div class="c-hotel-modular">
					<ul>
						<li v-for="homeItem in homeMenuList" v-on:mousedown="gotoModel(homeItem)" ><div class="c-mod-img"><img v-bind:src="homeMenuLogo(homeItem.image)" /></div><div class="c-mod-ct"><div class="c-mod-name">{{homeItem.module_name}}</div><div class="c-mod-sm">{{homeItem.subtitle}}</div></div></li>
					</ul>
				</div>
				<div class="c-h-zwf"></div>
				<div class="c-hotel-hot">
					<img src="../../images/home_hot_product@2x.png"/>
					<span class="c-hot-name">热门商品</span>
					<span class="c-hot-sm">(＜--左右滑动--＞)</span>
				</div>
				<div class="c-hot-hotel">
					<div class="hot-h" v-for="hotItem in hotProductList" v-on:mousedown="shopDetails(hotItem)" >
						<div class="hot-h-img"><img src="../../images/home_hot_image2@2x.png"/></div>
						<div class="hot-h-name">{{hotItem.name}}</div>
						<div class="hot-h-price">¥ {{hotItem.price}}/{{hotItem.unit}}</div>
					</div>
				</div>
				<div class="hotel-copyright">Copyright @ 左岸阳光 版权所有</div>
			</article>				
		</section>
		<div class="moveright moveright_p" style="display: none;">
			<div class="mrwarp">
				<div class=""><strong>更多功能</strong></div>
				<div class="mrtype rightswiper">
					<ul class="swiper-wrapper">
						<li class="swiper-slide">
							<a href="javascript:void(0)">酒店团购</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">特色客房展示</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">代客叫车服务</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">代客洗衣服务</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">蛋糕</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">周边旅行</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">鲜花</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">特色送餐服务</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">代客洗车服务</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">娱乐指南</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">文具</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)">便客服务</a>
						</li>
						<li class="swiper-slide">
							<a href="javascript:void(0)" title="关于我们">关于我们</a>
						</li>
					</ul>
				</div>
			</div>
		</div>		
	</div>
</template>
<script type="text/javascript">
	require("./home.css");
    var myhScroller = null; // 水平滑动组件对象
    export default {
        data: function(){
        	return {
        		queryUel:configuration.global.serverPath,
        		homeBannerList: [],
        		homeMenuList: [],
        		hotProductList: [],
        		storeInfo:{},
        		getNotice:{"text":"优雅 休闲 浪漫的主题 特色 开启您的DIY生活空间"}
        	}
        },    	
        ready: function () {
	      	console.log("加载首页...");
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height();//页面内容高度
            $("#home").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
      		//layerUtils.iLoading(true);
            queryScroller(this); //初始化滑动组件
            this.getStoreInfo();
            this.getHomeMenu();
            this.getHotProduct();
        },
        methods: {
			getStoreInfo:function(){
		         this.$http.post(configuration.global.serverPath + "/api/Product/getShop",{shopid:configuration.global.shopid},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		 this.storeInfo = results.data[0];
		         	}else{
		         		layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });
		    },
			getHomeMenu:function(){
		         this.$http.post(configuration.global.serverPath + "/api/tabbar/getHomeMenu",{shopid:configuration.global.shopid},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		 this.homeMenuList = results.data;
		         	}else{
		         		layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });
		    },
		    homeMenuLogo:function(logo){
		    	return configuration.global.imgPath+logo;
		    },
			getHotProduct:function(){
		         this.$http.post(configuration.global.serverPath + "/api/Product/getHotProduct",{shopid:configuration.global.shopid},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		 this.hotProductList = results.data;
		         	}else{
		         		layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });
		    },
			getNotice:function(){
		         this.$http.post(configuration.global.serverPath + "/api/Tabbar/getNotice",{shopid:configuration.global.shopid},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		 this.getNotice = results.data;
		         	}else{
		         		layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });
		    },	
		    gotoModel:function(item){
		    	var modelId = {
		    		"9":"lifeHome",
		    		"10":"orderAll",
		    		"11":"myReserve",
		    		"13":"messageboard",
		    		"14":"aboutOur",
		    		"15":"bulletinBoard"
		    	}
		    	this.$router.go({name:modelId[item.id]});
		    },
		    shopDetails:function(shopItem){
		    	sessionStorage.setItem("shopItem",JSON.stringify(shopItem));
		    	this.$router.go({name:'shopdetails',query: {shopDetail:JSON.stringify(shopItem)}});
		    }
        }
    }
    //轮播广告
    var queryScroller = function(v) {
    	var vm = v;
    	var url = vm.queryUel + "/api/Product/getBanner";
         vm.$http.post(url,{shopid:configuration.global.shopid},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
         	var results = response.data;
         	if(results.code === 200){
         		 vm.homeBannerList = results.data;
         		 initScroller(results.data.length);
         	}else{
         		layerUtils.iAlert(results.msg||"请求服务器失败");
         	}
        }, function (response) {
        	layerUtils.iAlert("连接服务器失败，请联系管理员");
        });
    }
    var initScroller = function(item){
        var scrollOptions = {
            $wrapper: $("#home #wrapper_index_head"),
            $tabNav: $("#home #tag_index_head"), // 导航点 zepto 对象
            autoScroll: true, // 是否是自动滚动，默认 false
            autoTime: 2000, // 自动滚动的间隔时间，单位毫秒，默认 2000
            scrollEndHandler: function () {
            } 
        };
        $("#home #scroller_index_head").width($(window).width() * item);
	    setTimeout(function(){
	     	$("#home #scroller_index_head li img").css("width",$(window).width()+"px").css("height","11rem");
//	     	layerUtils.iLoading(false);
	    },50);        
        myhScroller = iscrollUtils.hScroller(scrollOptions);
    }
    window.addEventListener("popstate", function (e){
        if (myhScroller) {
            myhScroller.destroy();
            myhScroller = null;
        }
        e.stopPropagation();
    });    
</script>
