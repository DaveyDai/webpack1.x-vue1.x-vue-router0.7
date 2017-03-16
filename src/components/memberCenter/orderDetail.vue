<template>
	<div id="orderDetail" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="bgstyle clearfix structure Recordweb" style="padding:0;margin:-1px;">
					<div class="Recordname">
						<div class="rerespan recordtopspa"><span class="re1">名称</span><span class="re2">单价</span><span class="re3">数量</span></div>
						<div class="clear ">
							<div class="rerespan"><span class="re1">{{orderDetail.product_name}}</span><span class="re2">{{orderDetail.price}}</span><span class="re3">{{orderDetail.num+orderDetail.unit}}</span></div>
						</div>
					</div>
				</div>
				<div class="bgstyle clearfix structure martop5 new_obrdrinf" style="padding:0;margin:5px -1px -1px -1px;">
					<ul>
						<li><span class="color666 norder_left">订单编号：</span><span class="norder_right">{{orderDetail.id}}</span></li>
						<li><span class="color666 norder_left">下单时间：</span><span class="norder_right">{{orderDetail.create_time}}</span></li>
						<li><span class="color666 norder_left">店内房号：</span><span class="norder_right">{{orderDetail.room_id}}</span></li>
						<li><span class="color666 norder_left">订单状态：</span><span class="norder_right" style="color:#FF4B42;">{{orderStatus()}}</span></li>
						<div class="clear orderpay"></div>
						<li><span class="color666 norder_left">消费情况：</span><span class="norder_right">消费额{{orderDetail.total}}元 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总计金额{{orderDetail.total}}元</span></li>
					</ul>
				</div>
				<div class="disnone p_re express_ajax"></div>
				<div class="hotel-copyright">Copyright @ 左岸阳光 版权所有</div>
			</article>	
		</section>
		<div class="detail-evaluate">
			<p v-on:mousedown="goMess()" >我要评价</p>
		</div>		
	</div>
</template>
<style>
	#orderDetail .recordtopspa{
		background-color: #EFEFEF;
		color: #333;
	}
	#orderDetail .re1{
		text-align: center;
	}
	.detail-evaluate{
		position: fixed;
		left: 0;
		bottom:3.26rem;
		background-color: #fff;
		width: 100%;
		height: 2.2rem;
		text-align: center;
	}
	.detail-evaluate p{
		display: inline-block;
		color: #fff;
		background-color: #E74C3C;
		font-size: 0.8666666666666667rem;
	    padding: 0 0.5rem;
	    border-radius: 26px;
	    margin-top: 0.3333333333333333rem;			
	}	
</style>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		orderDetail:{}
        	}
        },    	
        ready: function () {
	      	console.log("加载首页...");
            this.orderDetail = JSON.parse(sessionStorage.getItem("orderDetail"));
        },
        methods: {
        	orderStatus:function(){
        		return this.orderDetail.pay_type == 0 || this.orderDetail.pay_type == 1?"待处理":this.orderDetail.pay_status == 0?"未支付":"已支付";
        	},
        	goMess:function(){
        		this.$router.go({name:"messageboard"});
        	}
        }
    }
</script>
