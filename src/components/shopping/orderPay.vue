<template>
	<div id="orderPay" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="c-order-commd">
					<ul>
						<li v-for="item in orderPayList">
							<div class="order-c-img"><img src="../../images/shop_header_default_image@2x.png"/></div>
							<div class="order-c-cont"><div class="order-cont-pace">¥ {{item.price}}</div><div class="order-cont-name">{{item.product_name||item.name}}</div></div>
							<div class="order-num">数量:  {{item.num+item.unit}}</div>
							<!--<div class="commodity-choice comm-li-info">
								<div class="commodity-change-j">一</div>
								<div class="commodity-change-input">1</div>
								<div class="commodity-change-z">+</div>							
							</div>-->
						</li>
					</ul>
					<div class="order-pay-money">共计: <span> ¥ {{payOrder.money}}</span></div>
				</div>
				<div class="pay-modes">
					<div class="p-mode-t"><img src="../../images/shop_paid_image@2x.png"/><span>请选择支付方式</span></div>
					<div class="p-mode-c">
						<div class="p-mode-img"><img src="../../images/shop_paid_weixin_image@2x.png"/></div>
						<div class="p-mode-n"><p class="mode-name-t">微信支付</p><p class="mode-n-ex">推荐微信客户端用户使用</p></div>
						<div class="pay-choices"><span class="active"></span></div>
					</div>
					<div class="p-mode-c p-mode-last" style="display: none;">
						<div class="p-mode-img"><img src="../../images/shop_paid_wallet_image@2x.png"/></div>
						<div class="p-mode-n"><p class="mode-name-t">钱包支付</p><p class="mode-n-ex">安全急速支付</p></div>
						<div class="pay-choices"><span></span></div>
					</div>
				</div>
				<div class="pay-buttom" v-on:mousedown="paywxMoney()" >立即支付</div>
			</article>				
		</section>
	</div>	
</template>
<script type="text/javascript">
   	require("./orderPay.css");
    export default {
        data: function(){
        	return {
        		payMoneyUrl:configuration.global.serverPath + "/api/wxpay/wxpayJSAPI",// 微信统一下单
        		orderPayList:[],
        		payOrder:JSON.parse(sessionStorage.getItem("payOrder"))
        	}
        },    	
        ready: function () {
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height();//页面内容高度
            $("#orderPay").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
            this.orderPayList = sessionStorage.getItem("prePageCode") == "shoppingHome"?JSON.parse(sessionStorage.getItem("shopCart")):this.payInit();
        },
        methods: {
        	paywxMoney:function(){
				var paywxParam = {
					shopid:configuration.global.shopid,
        			token:sessionStorage.getItem("token"),
        			orderid:this.payOrder.order,
        			openid:sessionStorage.getItem("openid")||"",
        			code:sessionStorage.getItem("code")
    			}
				if(!paywxParam.code){
					layerUtils.iAlert("微信支付请从微信公众号中打开");
					return;
				}
		        this.$http.post(this.payMoneyUrl,paywxParam,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
	                if(results.code === 200){
	                	onBridgeReady(JSON.parse(results.data),this);
	                }else{
	                    layerUtils.iAlert("支付失败");
	                }
		        },function (response) {
		        	alert(JSON.stringify(response.data));
		        });       		
        	},
        	payInit:function(){
        		var payItem = JSON.parse(sessionStorage.getItem("payItem"));
        		return payItem.order.length === 0?[payItem]:payItem.order;
        	}
        }
    }
    function onBridgeReady(results,v){
    	WeixinJSBridge.invoke('getBrandWCPayRequest',results,
    		function(res){
    			if(res.err_msg == "get_brand_wcpay_request:ok") {
    				sessionStorage.removeItem("shopCart");
    				v.$router.go({name:"orderSuccess"});    				
    			}else{
    				layerUtils.iAlert("支付失败");
    			}
    			// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
    		}
    	);    	
    }
</script>
