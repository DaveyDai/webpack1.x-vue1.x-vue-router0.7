<template>
	<div id="orderSuccess" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="order-ok-img"><img src="../../images/shop_success@2x.png"/><div>恭喜您，下单成功</div></div>
				<div class="order-cz-back">
					<div class="look-order" v-link="{name:'orderAll'}" >查看订单</div><div class="shop-home-page" v-link="{name : 'home'}" >店铺主页</div>
				</div>
			</article>				
		</section>
	</div>
</template>
<style type="text/css">
	#orderSuccess{
		background-color: #fff;
		text-align: center;
	}
	.order-ok-img{
		position: relative;
		width: 100%;
		height: 11.666666666666666rem;
		font-size: 1.2rem;
		color: #C94E3F;
	}
	.order-ok-img > img{
		width: 4.933333333333334rem;
		height: 4.933333333333334rem;
		margin-top: 3.933333333333333rem;
	}
	.order-ok-img > div{
		margin-top: 1.6rem;
	}
	.order-cz-back{
		font-size: 1rem;
		margin-top: 2rem;
	}
	.order-cz-back > div{
		display: inline-block;
		width: auto;
		height: 2.6666666666666665rem;
		line-height: 2.6666666666666665rem;
		border-radius:10px;
		border:1px solid #d0d0d0;
	}
	.order-cz-back .look-order{
		background-color: #efefef;
		margin: 0 0.5666666666666667rem 0 2.033333333333333rem;
		padding: 0 2.6666666666666665rem;
	}
	.order-cz-back .shop-home-page{
		background-color: #C94E3F;
		margin: 0 2.033333333333333rem 0 0.5666666666666667rem;
		padding: 0 2.6666666666666665rem;
	}
</style>
<script type="text/javascript">
    export default {
        ready: function () {
	      	console.log("下单成功");
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height();//页面内容高度
            $("#orderSuccess").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
        }
    }
</script>
