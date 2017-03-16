<template>
	<div id="shoppingHome" style="position: relative;">
		<section class="main fixed" id="has_shopping">
			<article class="content">
				<div class="shoping-commoditys">
					<li v-for="item in shopOrder.order" >
						<div class="commodity-information comm-li-info">
							<div class="information-name">{{item.name}}</div>
							<div class="information-pice"><span class="infor-p-span">¥ {{item.price}}元/{{item.unit}}</span><span class="infor-j-span">积分    {{item.point}}</span></div>
						</div>
						<div class="commodity-choice comm-li-info">
							<div class="commodity-change-j" v-on:mousedown="redCommodity(item,$event)" >一</div>
							<div class="commodity-change-input">{{item.num}}</div>
							<div class="commodity-change-z" v-on:mousedown="addCommodity(item,$event)" >+</div>		
							<div class="commodity-change-1 c-red1">-1</div>
							<div class="commodity-change-1 c-add1">+1</div>							
						</div>
					</li>
				</div>
				<div class="order-details">
					<div class="o-details-n"><span>订单详情</span><img class="orders-hide-img" src="../../images/shop_down_arrow@2x.png"/></div>
					<div class="o-details-c">
						<div class="o-details-pice">总计:<span>  {{shopOrder.money}}</span> 元</div>
						<div class="o-details-pice">积分:<span>  {{shopOrder.point}}</span> 积分</div>
					</div>
				</div>
				<div class="pice-mode">
					<div class="pice-mode-n o-details-n"><span>付款方式</span><img class="orders-hide-img" src="../../images/shop_down_arrow@2x.png"/></div>
					<div class="pice-mode-choice"><span v-for="(index,item) in payType" v-bind:class="{active:index==0}" v-on:mousedown="changePay(index,$event)" >{{item}}</span></div>
				</div>
				<div class="pice-mode order-mode" style="display: none;">
					<div class="pice-mode-n o-details-n"><span>订单类型</span><img class="orders-hide-img" src="../../images/shop_down_arrow@2x.png"/></div>
					<div class="pice-mode-choice"><span class="active">店内消费</span><span>外送业务</span><span>店内自取</span></div>
				</div>
				<div class="order-information">
					<div class="o-room-infor"><span>房间号*</span><input type="tel" placeholder="在此输入房间号*" maxlength="8" v-model="shopOrder.room_id" /></div>
					<div class="o-room-infor"><span>称呼</span><input type="text" placeholder="在此输入称呼" maxlength="20" v-model="shopOrder.name" /></div>
					<div class="o-room-infor"><span>电话</span><input type="tel" placeholder="在此输入电话" maxlength="11" v-model="shopOrder.phone" /></div>
					<div class="o-room-beizhu"><span>备注说明</span><div><textarea name="" rows="" cols="" placeholder="在此输入备注，如。。。。。" v-model="shopOrder.remark" ></textarea></div></div>
				</div>
				<div class="hotel-copyright">Copyright @ 左岸阳光 版权所有</div>
			</article>
			<!--<div style="position: relative;">--> 
			<div class="pice-pay" id="pice-pay">
				<div class="pice-order-all">总计：<span>{{shopDown.comNum}}</span>件</div>
				<div class="pice-pay-all">合计：<span>{{shopOrder.money}}</span>元</div>
				<div class="pice-pay-s" v-on:mousedown="orderNew()" >确认下单</div>
			</div>	
			<!--</div>-->
		</section>
		<div id="no_shopping" style="display: none;">
			<div class="no-shopping">
				<p>您的购物车还是空空如也，赶紧行动哦！！您可以</p>
				<div v-on:mousedown="goShop()" >点击此处开始选购下单</div>
			</div>			
			<div class="hotel-copyright">Copyright @ 左岸阳光 版权所有</div>
		</div>
	</div>
</template>
<script type="text/javascript">
    require("./shoppingHome.css");
    export default {
        data: function(){
        	return {
        		shopOrder:{
        			shopid:configuration.global.shopid,
        			order:[],   //订单数组
        			token:sessionStorage.getItem("token")||"",
        			type:0,     //订单类型(0:店内消费，1：外送业务，2：店内自取)
        			pay_type:0, //付款方式（0：货到付款，1：余额支付，2：店内消费，3：微信支付）
        			room_id:"",  //房间号
        			name:"",
        			phone:"",
        			remark:"",
        			money:0,  //总价
        			point:0  //总积分
        		},
        		shopDown:{
        			comNum:0
        		},
        		payType:["货到付款","店内消费","余额支付","微信支付"]
        	}
        },    	
        ready: function () {
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height() - $("#shoppingHome #pice-pay").height();//页面内容高度
            $("#shoppingHome article").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
			this.initShopping();
        },
        methods: {
            backPage:function() {
            	layerUtils.iAlert("正在开发，敬请期待...");
                if (window.history && window.history.pushState)window.history.back();
           	},
		    redCommodity:function(item,event){
		    	$(event.target).siblings(".c-red1").show().animate({opacity: 0.1,marginBottom:"35px"}, 500, 'linear',function(){
					$(event.target).siblings(".c-red1").css({"opacity": "1","margin-bottom": "0"});
					$(event.target).siblings(".c-red1").hide();		    		
		    	});
				changeLocalStorage(false,item,this.initShopping);
		    },
		    addCommodity:function(item,event){
		    	$(event.target).siblings(".c-add1").show().animate({opacity: 0.1,marginBottom:"35px"}, 500, 'linear',function(){
					$(event.target).siblings(".c-add1").css({"opacity": "1","margin-bottom": "0"});
					$(event.target).siblings(".c-add1").hide();		    		
		    	});
		    	//修改购物车状态
		    	changeLocalStorage(true,item,this.initShopping);
		    },
		    initShopping:function(){
	            var shopCart = JSON.parse(localStorage.getItem("shopCart"))||[];
	            document.getElementById("has_shopping").style.display = shopCart.length === 0?"none":"block";
	            document.getElementById("no_shopping").style.display = shopCart.length === 0?"block":"none";
	            this.shopOrder.money = this.shopOrder.point = this.shopDown.comNum = 0;
	            if(shopCart.length === 0)return false;
	            this.shopOrder.order = shopCart;
	            for(var i = 0,shopLeng = shopCart.length;i < shopLeng;i++){
	            	this.shopOrder.money += Number(shopCart[i].price)*shopCart[i].num;
	            	this.shopOrder.point += Number(shopCart[i].point)*shopCart[i].num;
	            	this.shopDown.comNum += shopCart[i].num;
	            }	
		    },
		    goShop:function(){
		    	this.$router.go({name:"lifeHome"});
		    },
		    changePay:function(index,event){
		    	this.shopOrder.pay_type = index;
		    	$(event.target).addClass("active").siblings().removeClass("active");
		    },
		    orderNew:function(){
		    	if(this.checkShop()){
			        this.$http.post(configuration.global.serverPath + "/api/order/order",this.shopOrder,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
			         	var results = response.data;
			         	if(results.code === 200){
			         		sessionStorage.setItem("payOrder",JSON.stringify({order:results.data.order,money:this.shopOrder.money}));
					      	sessionStorage.setItem("shopCart",localStorage.getItem("shopCart"));
					      	document.getElementById("choiceCommodityNum").style.display = "none";
					      	localStorage.removeItem("shopCart");			         		
			         		this.$router.go({name:this.shopOrder.pay_type == 3&&"orderPay"||"orderSuccess"});
			         	}else{
			         		layerUtils.iAlert(results.message||"请求服务器失败");
			         	}
			        }, function (response) {
			        	layerUtils.iAlert("连接服务器失败，请联系管理员");
			        });			    		
		    	}
		    },
		    checkShop:function(){
		    	if(this.shopDown.comNum === 0){
		    		layerUtils.iAlert("当前无下单商品");
		    		return false;
		    	}
		    	if(this.shopOrder.room_id.length === 0){
		    		layerUtils.iAlert("请输入房间号");
		    		return false;
		    	}
		    	return true;
		    }
        }
    }
</script>
