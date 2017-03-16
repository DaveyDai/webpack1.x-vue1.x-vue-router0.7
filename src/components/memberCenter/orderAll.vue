<template>
	<div id="orderAll" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="clearfix">
					<div class="orderbgstyle p_re" v-for="item in orderList" >
						<!--<a href="javascript:void(0);"  >-->
							<div class="orderidzt" v-on:click="orderDetail(item)">
								<span><font class="color666">房间号：</font>{{item.room_id}}</span>
								<span><font class="color666">消费额：</font>{{item.total}}元  </span>
								<span><font class="color666">订单号：</font>{{item.id}}</span>
								<span><font class="color666">下单时间：</font>{{item.create_time}}</span>
								<span style="margin-bottom: 15px;color: #e74c3c;"><font class="color666">订单状态：</font>{{item.pay_type == 0 || item.pay_type == 1?"待处理":item.pay_status == 0?"未支付":"已支付"}}<div v-on:click.stop="payOrders(item)" class="payforOrder" v-if="item.pay_type != 0 && item.pay_type != 1 && item.pay_status == 0" >立即支付</div></span>
							</div>
						<!--</a>-->
						<div class="rerespan recordtopspa"><span class="re1">名称</span><span class="re2">单价</span><span class="re3">数量</span></div>
						<div class="clear rerespan" v-for="orderItem in item.order" ><span class="re1">{{orderItem.product_name}}</span><span class="re2">{{orderItem.price}}</span><span class="re3">{{orderItem.num+orderItem.unit}}</span></div>
						<div class="clear rerespan" v-if="item.order.length==0" ><span class="re1">{{item.product_name}}</span><span class="re2">{{item.price}}</span><span class="re3">{{item.num+item.unit}}</span></div>
						<!--<div class="clear disnone order11more"><span><img width="20" src="/weixin/Public/img/order11.jpg"></span></div>-->
					</div>
				</div>
				<div class="hotel-page">
					<div class="hotel-page-b" v-on:mousedown="getOrderList('back')" >
						<img src="../../images/life_previous_pages_arrow@2x.png"/>
						<span class="hotel-page-back">{{pageList.pageNo==1&&"已到首页"||"上一页"}}</span>							
					</div>
					<span class="hotel-pages-th">{{pageList.pageNo}}/{{pageList.pageAll}}</span>
					<div class="hotel-page-n" v-on:mousedown="getOrderList('next')" >
						<span class="hotel-page-next">{{pageList.pageNo==pageList.pageAll&&"已到尾页"||"下一页"}}</span>
						<img src="../../images/life_next_pages_arrow@2x.png"/>
					</div>
				</div>					
				<div class="hotel-copyright">Copyright @ 左岸阳光 版权所有</div>
			</article>	
		</section>
	</div>
</template>
<style>
	#orderAll .recordtopspa{
		background-color: #FAFAFA;
		color: #333;
		border: 1px solid #e5e5e5;
		overflow: hidden;
		padding: 5px 3px;
		box-shadow:0 0;
	}
	#orderAll .clear{
		box-shadow:0 0;
		overflow: hidden;
		padding: 8px 5px;
		border-bottom: 1px solid #e5e5e5;
	}
	#orderAll .orderbgstyle{
		border-bottom:0;
		margin-top: 20px;
		background-color: #fff;
		padding: 0;
	}
	#orderAll .payforOrder{
	    display: inline-block;
	    border: 1px solid #e74c3c;
	    padding: 0 10px;
	    color: #e74c3c;
	    border-radius: 15px;
	    position: absolute;
	    right: 20px;		
	}
			
</style>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		orderList:[],
        		pageList:{
        			pageNo:1,
        			pageAll:0
        		}         		
        	}
        },    	
        ready: function () {
	      	console.log("加载首页...");
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height();//页面内容高度
            $("#orderAll").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
            sessionStorage.removeItem("orderDetail");
            this.getOrderList();
        },
        methods: {
		    getOrderList:function(page){
		    	var pageNo = Number(this.pageList.pageNo),pageAll = Number(this.pageList.pageAll);
		    	pageNo = page?page == "next"?pageNo == pageAll?pageNo:pageNo+1:pageNo > 1?pageNo-1:1:1;//点击分页按钮  获取查询页数
		    	var orderParam = {
		    		shopid:configuration.global.shopid,
		    		token:sessionStorage.getItem("token"),
		    		page:pageNo
		    	}
		        this.$http.post(configuration.global.serverPath + "/api/order/getOrder",orderParam,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.orderList = results.data.data;
		         		this.pageList.pageAll = Math.ceil(results.data.count/10);
		         		this.pageList.pageNo = pageNo;
		         	}else{
		         		layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });			    		
		    },
		    orderDetail:function(item){
		    	sessionStorage.setItem("orderDetail",JSON.stringify(item));
		    	this.$router.go({name:"orderDetail"});
		    },
		    payOrders:function(item){
		    	sessionStorage.setItem("payOrder",JSON.stringify({order:item.id,money:item.total}));
		    	sessionStorage.setItem("payItem",JSON.stringify(item));
		    	this.$router.go({name:"orderPay"});
		    }
        }
    }
</script>
