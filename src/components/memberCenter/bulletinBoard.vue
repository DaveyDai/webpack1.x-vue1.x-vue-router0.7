<template>
	<div id="bulletinBoard" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="boardHeard"><img src="../../images/life_previous_pages_arrow@2x.png"/><span>左岸阳光</span></div>
				<div class="board-conter">
					<p class="board-conter-c">左岸阳光 版权所有左岸阳光 版权所有左岸阳光 版权所有左岸阳光 版权所有左岸阳光 版权所有</p>
					<p class="board-conter-t">2017年2月22日15:32:27</p>
				</div>
				<div class="hotel-page">
					<div class="hotel-page-b">
						<img src="../../images/life_previous_pages_arrow@2x.png"/>
						<span class="hotel-page-back">上一页</span>							
					</div>
					<span class="hotel-pages-th">1/1</span>
					<div class="hotel-page-n">
						<span class="hotel-page-next">上一页</span>
						<img src="../../images/life_next_pages_arrow@2x.png"/>
					</div>
				</div>				
				<div class="hotel-copyright">Copyright @ 左岸阳光 版权所有</div>
			</article>	
		</section>
	</div>
</template>
<style>
	.boardHeard{
		width: 100%;
		height: 75px;
		line-height: 75px;
		font-size: 28px;
		border-bottom: 1px solid #ccc;
	}
	.boardHeard img{
		width: 14px;
		height: 25px;
		margin-left: 10px;
	}
	.boardHeard span{
		margin-left: 37%;
	}
	.board-conter{
		width: 100%;
		height: auto;
		background-color: #fff;
	}
	.board-conter .board-conter-c{
		padding: 32px;
		font-size: 24px;
		color: #393939;
	}
	.board-conter .board-conter-t{
		text-align: right;
		padding: 10px 32px;
		font-size: 22px;
		color: #999;
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
        	var scrollerConHeight = $(window).height() - $("#afui #footer footer").height();//页面内容高度
            $("#messageboard").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
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
