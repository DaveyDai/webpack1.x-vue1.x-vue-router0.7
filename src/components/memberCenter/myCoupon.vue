<template>
	<div id="myCoupon" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="myReser-title">
					<div class="myReser-explant"><span class="myRescon-explant-me">优惠券</span><span>我的优惠券</span></div>
				</div>
				<div class="mycoupon-conter">
					<li>
						<div class="mycoupon-tr coupon-center">
							<div class="mycoupon-td">
								<p class="mycoupon-td-p1"><em>¥</em>30</p>
								<p class="mycoupon-td-p2">抵用券</p>
							</div>
							<div class="mycoupon-td1">
								<p class="mycoupon-td1-p1">左岸阳光豪华标间30元抵用券</p>
								<p class="mycoupon-td1-p2">满300元可用</p>
							</div>
						</div>
						<div class="mycoupon-tr coupon-time">有效期至：2017年2月22日</div>
					</li>
					<li>
						<div class="mycoupon-tr coupon-center">
							<div class="mycoupon-td">
								<p class="mycoupon-td-p1"><em>¥</em>30</p>
								<p class="mycoupon-td-p2">抵用券</p>
							</div>
							<div class="mycoupon-td1">
								<p class="mycoupon-td1-p1">左岸阳光豪华标间30元抵用券</p>
								<p class="mycoupon-td1-p2">满300元可用</p>
							</div>
						</div>
						<div class="mycoupon-tr coupon-time">有效期至：2017年2月22日</div>
					</li>
					<li>
						<div class="mycoupon-tr coupon-center">
							<div class="mycoupon-td">
								<p class="mycoupon-td-p1"><em>¥</em>30</p>
								<p class="mycoupon-td-p2">抵用券</p>
							</div>
							<div class="mycoupon-td1">
								<p class="mycoupon-td1-p1">左岸阳光豪华标间30元抵用券</p>
								<p class="mycoupon-td1-p2">满300元可用</p>
							</div>
						</div>
						<div class="mycoupon-tr coupon-time">有效期至：2017年2月22日</div>
					</li>
				</div>
				<div class="myReser-conter-no" style="display: none;">
					<div class="myRescon-no">商家未发布优惠券，留言给商家看看有木有</div><div class="myRescon-gotor">发布留言</div>
				</div>			
			</article>	
		</section>
	</div>
</template>
<style>
	.myReser-title{
		width: 100%;
		height: 3.3333333333333335rem;
		text-align: center;
		background-color: #FFFFFF;
		border-bottom: 1px solid #E5E5E5;
	}
	.myReser-title .myReser-explant{
		position: relative;
		top: 0.6666666666666666rem;
		left: 30%;
		width: 40%;
		height: 2rem;
		line-height: 2rem;
		font-size: 0.7333333333333333rem;
		border: 2px solid #ff5102;
		border-radius: 30px;
	}
	.myReser-title .myReser-explant > span{
		display: inline-block;
		width: 50%;
		padding: 0 0.3333333333333333rem;
	}
	.myReser-title .myReser-explant .myRescon-explant-me{
		position: relative;
		top: -2px;
		left: -1px;
		background-color: #ff5102;
		color: #fff;
		border-top-left-radius:1rem;
		border-bottom-left-radius:1rem;
		height: 1.9333333333333333rem;
	}
	.mycoupon-conter li{
		display: table;
		margin: 0.6666666666666666rem 7% 0 7%;
		background: url(../../images/member_coupon_image@2x.png) no-repeat;
		width: 86%;
		height: 6.066666666666666rem;
		background-size: 100%;
	}
	.mycoupon-conter li .mycoupon-td{
		display: table-cell;
		width: 30%;
		text-align: center;
		vertical-align: middle;
		color: #05ceae;
	}
	.mycoupon-conter li .mycoupon-td-p1{
		font-size: 1.8666666666666667rem;
	}
	.mycoupon-conter li .mycoupon-td-p1 > em{
		font-size: 0.8333333333333334rem;
		padding-right: 0.3333333333333333rem;
	}
	.mycoupon-conter li .mycoupon-td-p2{
		font-size: 0.7333333333333333rem;
		margin-top: -1rem;
	}
	.mycoupon-conter li .mycoupon-td1{
	    display: table-cell;
	    text-align: left;
	    vertical-align: middle;
	    padding-left: 1.0666666666666667rem;
	    padding-top: 0.3333333333333333rem;	    
	}
	.mycoupon-conter li .mycoupon-td1-p1{
	    font-size: 0.8rem;
	}
	.mycoupon-conter li .mycoupon-td1-p2{
	    color: #999;
    	font-size: 0.6666666666666666rem;
	}
	.mycoupon-conter li .coupon-center{
		height: 4rem;
	}
	.mycoupon-conter li .coupon-time{
		height: 2.066666666666667rem;
		line-height: 2.066666666666667rem;
	    font-size: 0.7333333333333333rem;
	    color: #999;
	    padding-left: 0.8333333333333334rem;		
	}
	.myReser-conter-no{
		width: 100%;
		height: 50rem;
		text-align: center;
		font-size: 0.9333333333333333rem;
		background-color: #fff;
	}
	.myReser-conter-no .myRescon-no{
		padding-top: 18%;
	}
	.myReser-conter-no .myRescon-gotor{
		position: relative;
		left: 35%;
		margin-top:0.3333333333333333rem ;
		width: 30%;
		border:1px solid red;
		color: red;
		border-radius: 5px;
		padding: 0.4rem 0;
	}
</style>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        	}
        },    	
        ready: function () {
	      	console.log("加载首页...");
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height();//页面内容高度
            $("#myCoupon").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
        },
        methods: {
            backPage: function () {
            	layerUtils.iAlert("正在开发，敬请期待...");
//              if (window.history && window.history.pushState) {
//                  window.history.back();
//              }
           }
        }
    }
</script>
