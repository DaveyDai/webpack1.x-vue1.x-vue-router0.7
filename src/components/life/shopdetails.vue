<template>
	<div id="shopdetails" style="position: relative;">
		<header class="header">
			<div id="moreheader">
				<div class="moreheaderbox conheader">
					<span class="conprev ch1"><font v-on:mousedown="backPage()" ><img style="width: 0.5rem;height: 1rem;margin:-0.1rem 0.3rem 0 0;" src="../../images/life_previous_pages_arrow@2x.png">上一页</font></span><span id="contracted"></span>
					<span class="conprev ch3" v-link="{name : 'shoppingHome'}" ><a href="javascript:void(0);">购物车 <img style="width: 0.5rem;height: 1rem;margin:-0.1rem 0.3rem 0 0;" src="../../images/life_next_pages_arrow@2x.png"></a></span>
				</div>					
			</div>
			<div class="dcon_fix"><span><em class="d_prem"><font id="pp_pr" data-cost="398.00" style="font-size:22px;padding-left:0.6rem;">￥<font class="pp_pr11" style="font-weight: bold;color: #DE6C12;">{{shopDetail.price}}</font><font style="font-weight: normal!important;color:#888;font-size:12px;display:inline-block;">元/{{shopDetail.unit}}</font></font></em></span>
				<span class="plustext fr p_re lgadd">
					<button type="button" class="lgplus" v-on:mousedown="redCommodity()" >-</button>
					<input  v-model="shopDetail.num" id="shopNum" type="tel" class="addtext" maxlength="3" readonly="readonly">
					<button type="button" class="lgminus" v-on:mousedown="addCommodity($event)" >+</button></span>
			</div>	
		</header>
		<section class="main fixed">
			<div class="moveleft">
				<div class="clearfix goodssbox" style="margin-top:100px;">
					<div class="bgstyle goodsinfos p_re dcon_bg" style="padding:0;margin-top:10px;">
						<div class="goodspr dcon_h1" style="padding:0;">
							<div>
								<div class="p_re">
									<h1>{{shopDetail.name}}</h1>
								</div>
								<div class="clear TiduListWarp clearfix disnone"></div>
								<div class="pp_div dcon_ppcon" style="padding-left: 5px;"></div>
							</div>
						</div>
					</div>
					<div class="imagetext clear dcon_bg ">
						<div class="bgstyle textcontent dcon_bg" style="padding:0;margin-top:10px;">
							<div class="dcon_title">商品详情</div>
							<div class="dcon_detailed">
								<p><img alt="" src="../../images/1111.jpg"></p>
								<p><img alt="" src="../../images/1111.jpg"></p>
								<p style="margin-top: 5px;">非常舒适非常舒适非常舒适非常舒适非常舒适非常舒适非常舒适非常舒适</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="hotel-copyright">Copyright @ 左岸阳光 版权所有</div>
		</section>
	</div>
</template>
<style>
	.pp_list {
		float: left!important;
	}
	.pp_div {
		text-align: left;
	}
	.ppTTname {
		padding: 10px 0 0px 0;
		font-size: 14px;
		font-weight: bold;
		display: block;
	}
	.pp_warp {
		padding: 0 0 5px 0;
	}
	.taoright .pp_name {
		border-radius: 3px;
		margin-right: 3px;
	}
	.ch3{
		position: absolute;
		right: 0.8rem;
	}
	.ch1{
		position: absolute;
		left: 0.8rem;
	}
	.pp_name {
		font-weight: bold;
	}
	.dcon_fix .fr{
		margin: 0;
	    position: absolute;
	    right: 0.5rem;
	    top: 0.8rem;			
	}
	.dcon_h1,.imagetext{
		background-color: #fff;
	}
	.dcon_detailed p{
		font-size: 0.86rem;
		color: #333;
	}
</style>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		shopDetail:{}
        	}
        },    	
        ready: function () {
	      	console.log("加载首页...");
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height() - $("#afui #shopdetails header").height();//页面内容高度
            $("#shopdetails section").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
            var shopCart = JSON.parse(localStorage.getItem("shopCart"));
            this.shopDetail = shopCart && shopCart.length > 0?this.initNum(shopCart,JSON.parse(this.$route.query.shopDetail)):JSON.parse(this.$route.query.shopDetail);//回显选购商品
            this.shopDetail.num = this.shopDetail.num||0;
        },
        methods: {
            backPage: function () {
                if (window.history && window.history.pushState)window.history.back();
            },
		    redCommodity:function(){
		    	var inputElement = document.getElementById("shopNum");
		    	inputElement.value = Number(inputElement.value) > 0?Number(inputElement.value)-1:0;
				changeLocalStorage(false,this.shopDetail);
		    },
		    addCommodity:function(){
		    	var inputElement = document.getElementById("shopNum");
		    	inputElement.value = Number(inputElement.value) + 1;
		    	changeLocalStorage(true,this.shopDetail);
		    },
		    initNum:function(shopCart,shopDetail){
	    		for(var i=shopCart.length;i--;){
	    			if(shopDetail.id == shopCart[i].id)shopDetail.num = shopCart[i].num;
	    		}		    		
		    	return shopDetail;
		    }		    
        }
    }
</script>
