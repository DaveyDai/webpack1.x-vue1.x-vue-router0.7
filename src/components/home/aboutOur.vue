<template>
	<div id="aboutOur" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="bgstyle clearfix merchant">
					<div class="merchantlogo fl"><img src="../../images/member_self_image@2x.png"></div>
					<h1>左岸阳光</h1></div>
				<div class="shopings">
					<ul>
						<li class="bgstyle"><em>店铺电话：</em>
							<a href="tel:0993-2705111">0993-2705111</a>
						</li>
						<li class="bgstyle"><em>店铺地址：</em>石河子开发区北四东五路口</li>
						<li class="bgstyle"><em>服务范围：</em>新疆石河子配送距离10公里</li>
					</ul>
				</div>
				<div class="bgstyle about-conter">
					文字内容介绍<br />
					文字内容介绍文字内容介绍文字内容介绍文字内容介绍文字内容介绍文字内容介绍文字内容介绍文字内容介绍文字内容介绍文字内容介绍
					<p>左岸阳光宾馆全体员工</p> 
				</div>				
				<div class="hotel-copyright">Copyright @ 左岸阳光 版权所有</div>
			</article>	
		</section>
	</div>
</template>
<style>
	.about-conter {
	    color: #333;
	    font-size: 0.8rem;		
	}
	.about-conter p{
		text-align: right;
		margin: 3rem 0 2rem 0;
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
            $("#aboutOur").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");	      	
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
