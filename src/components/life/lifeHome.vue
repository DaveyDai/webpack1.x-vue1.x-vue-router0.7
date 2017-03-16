<template>
	<div id="lifeHome" style="position: relative;">
		<header class="header">
			<div class="life-navigationBar">
				<div class="navB-content" v-for="(index, item) in categoryList" v-bind:class="{active:index===0}" v-on:mousedown="categoryChoice(item,$event)" >{{item.name}}</div>
			</div>	
			<div class="screen-hotel">
				<a class="screen-input" href="javascript:void(0);" v-on:click="screenExplant()" >
					<img src="../../images/life_search@2x.png" />
					<span>请输入商家或商家名称</span>
				</a>
				<input class="hotel-screen-input" type="text" name="screen" id="screenInput" value="" v-on:blur="screenInput(true)" v-model="screenValue" />
				<a class="screen-th-hotel" href="javascript:void(0);" v-on:mousedown="getProduct(false,true)" >搜索</a>
			</div>			
		</header>		
		<section class="main fixed">
			<article class="content">
				<div class="hotel-list">
					<ul id="productAll">
						<li v-for="item in productList" v-on:mousedown="shopDetails(item)" v-bind:id="item.id" >
							<div class="hotel-lists hotel-list-img"><img v-bind:src="item.image" /></div>
							<div class="hotel-lists hotel-list-content">
								<div class="hotel-content-name">{{item.name}}</div>
								<div class="hotel-content-pay">¥ {{item.price}}元  / {{item.unit}}</div>
								<div class="hotel-content-integral">积分         {{item.point}}</div>
							</div>
							<div class="hotel-lists hotel-list-change">
								<!--<div class="hotel-change-hot">热销</div>-->
								<div class="hotel-change-hot" v-if="item.is_hot==1" >火爆</div>
								<div class="commodity-change-j" v-on:mousedown.stop="redCommodity(item,$event)" v-bind:style="{display:!!item.num&&'block'||'none'}" >一</div>
								<div class="commodity-change-input commodityNum" v-bind:style="{display:!!item.num&&'block'||'none'}" >{{item.num}}</div>
								<div class="commodity-change-z" v-on:mousedown.stop="addCommodity(item,$event)" >+</div>
								<div class="commodity-change-1 c-red1">-1</div>
								<div class="commodity-change-1 c-add1">+1</div>
							</div>
						</li>
					</ul>
					<div class="hotel-page">
						<div class="hotel-page-b" v-on:mousedown="getProduct('back')" >
							<img src="../../images/life_previous_pages_arrow@2x.png"/>
							<span class="hotel-page-back">{{pageList.pageNo==1&&"已到首页"||"上一页"}}</span>							
						</div>
						<span class="hotel-pages-th">{{pageList.pageNo}}/{{pageList.pageAll}}</span>
						<div class="hotel-page-n" v-on:mousedown="getProduct('next')" >
							<span class="hotel-page-next">{{pageList.pageNo==pageList.pageAll&&"已到尾页"||"下一页"}}</span>
							<img src="../../images/life_next_pages_arrow@2x.png"/>
						</div>
					
					</div>
				</div>
				<div class="hotel-copyright">Copyright @ 左岸阳光 版权所有</div>
			</article>
		</section>
	</div>
</template>
<script type="text/javascript">
	require("./lifeHome.css");
    export default {
        data: function(){
        	return {
        		categoryList: [{id:"",name:"全部商品"}],
        		productList:[],
        		getStoreList:[],
        		pageList:{
        			pageNo:1,
        			pageAll:0
        		},
        		screenValue:"",
        		isScreen:false,
        		product_category:""
        	}
        },    	
        ready: function () {
	      	console.log("加载首页...");
        	var scrollerConHeight = $(window).height() - $("#afui #footer").innerHeight() - $("#lifeHome .header").innerHeight();//页面内容高度
            $("#lifeHome section").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
//      	layerUtils.iLoading(true);
        	this.getStoreInfo();
        	this.getProduct();
        },
        methods: {
			getStoreInfo:function(){
		         this.$http.post(configuration.global.serverPath + "/api/tabbar/getCategory",{shopid:configuration.global.shopid},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.categoryList = this.categoryList.concat(results.data);
		         	}else{
		         		layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });
		    },
			getProduct:function(page,isScreen){//page 分页  isScreen 搜索标识
				if(!page)this.isScreen = isScreen?this.screenValue == ""?false:true:false;//非点击分页按钮情况下 判断是否搜索商品模式
				var pageNo = Number(this.pageList.pageNo),pageAll = Number(this.pageList.pageAll);
				var getUrl = !this.isScreen?configuration.global.serverPath + "/api/Product/getProduct":configuration.global.serverPath + "/api/Product/getSearch";//是否搜索商品
				pageNo = page?page == "next"?pageNo == pageAll?pageNo:pageNo+1:pageNo > 1?pageNo-1:1:1;//点击分页按钮  获取查询页数
				var shopParam = {
					shopid:configuration.global.shopid,
					page:pageNo,
					title:!this.isScreen?"":this.screenValue,
					product_category:this.product_category
				};
		        this.$http.post(getUrl,shopParam,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		 this.pageList.pageAll = Math.ceil(results.data.count/10)||1;
		         		 this.pageList.pageNo = pageNo;
		         		 var shopCart = JSON.parse(localStorage.getItem("shopCart"));
		         		 this.productList = shopCart && shopCart.length > 0?this.initProductNum(shopCart,results.data.data):results.data.data;//回显选购商品
		         	}else{
		         		layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });
		    },
		    initProductNum:function(shopCart,shopList){
		    	for(var j=shopList.length;j--;){
		    		for(var i=shopCart.length;i--;){
		    			if(shopList[j].id == shopCart[i].id)shopList[j].num = shopCart[i].num;
		    		}		    		
		    	}
		    	return shopList;
		    },
		    redCommodity:function(item,event){
		    	var inputElement = event.target.nextElementSibling;
		    	inputElement.innerText = Number(inputElement.innerText) > 0?Number(inputElement.innerText)-1:0;
		    	$(event.target).siblings(".c-red1").show().animate({opacity: 0.1,marginBottom:"35px"}, 700, 'linear',function(){
					$(event.target).siblings(".c-red1").css({"opacity": "1","margin-bottom": "0"});
					$(event.target).siblings(".c-red1").hide();		    		
		    	});		    	
		    	if(inputElement.innerText == 0){
		    		inputElement.style.display = event.target.style.display ="none";
		    	}		    	
				changeLocalStorage(false,item);
		    },
		    addCommodity:function(item,event){
		    	var inputElement = event.target.previousElementSibling;
		    	if(inputElement.innerText == 0){
		    		inputElement.style.display = inputElement.previousElementSibling.style.display ="block";
		    	}
		    	inputElement.innerText = Number(inputElement.innerText) + 1;
		    	//+1动画
		    	$(event.target).siblings(".c-add1").show().animate({opacity: 0.1,marginBottom:"35px"}, 700, 'linear',function(){
					$(event.target).siblings(".c-add1").css({"opacity": "1","margin-bottom": "0"});
					$(event.target).siblings(".c-add1").hide();		    		
		    	});
		    	//修改购物车状态
		    	changeLocalStorage(true,item);
		    },
        	categoryChoice:function(item,event){
        		$(event.target).addClass("active").siblings().removeClass("active");
				this.product_category = item.id;
				this.getProduct();
        	},
        	screenInput:function(isShow){
        		document.getElementsByClassName("screen-input")[0].style.display = isShow && document.getElementById("screenInput").value ==""?"block":"none";
        	},
        	screenExplant:function(){
        		document.getElementsByClassName("screen-input")[0].style.display = "none";
        		document.getElementById("screenInput").focus();
        	},
		    shopDetails:function(shopItem){
		    	sessionStorage.setItem("shopItem",JSON.stringify(shopItem));
		    	this.$router.go({name:'shopdetails',query: {shopDetail:JSON.stringify(shopItem)}});
		    }        	
        }
    }
</script>
