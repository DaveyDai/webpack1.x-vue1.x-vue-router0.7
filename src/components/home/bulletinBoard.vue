<template>
	<div id="bulletinBoard" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="boardHeard" v-on:mousedown="backPage()" ><img src="../../images/life_previous_pages_arrow@2x.png"/><span>左岸阳光</span></div>
				<div class="board-conter">
					<p class="board-conter-c">{{getNotice.text}}</p>
					<p class="board-conter-t">{{getNotice.time}}</p>
				</div>
				<div class="hotel-page">
					<div class="hotel-page-b">
						<img src="../../images/life_previous_pages_arrow@2x.png"/>
						<span class="hotel-page-back">已到首页</span>							
					</div>
					<span class="hotel-pages-th">1/1</span>
					<div class="hotel-page-n">
						<span class="hotel-page-next">已到尾页</span>
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
		height: 3rem;
		line-height: 3rem;
		font-size: 1.4rem;
		border-bottom: 1px solid #ccc;
	}
	.boardHeard img{
		width: 0.7rem;
		height: 1.25rem;
		margin-left: 0.5rem;
	}
	.boardHeard span{
		margin-left: 35%;
	}
	.board-conter{
		width: 100%;
		height: auto;
		background-color: #fff;
	}
	.board-conter .board-conter-c{
		padding: 1.6rem;
		font-size: 1.2rem;
		color: #393939;
	}
	.board-conter .board-conter-t{
		text-align: right;
		padding: 0.5rem 1.6rem;
		font-size: 1.1rem;
		color: #999;
	}
</style>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		getNotice:{
        			text:"优雅 休闲 浪漫的主题 特色 开启您的DIY生活空间"
        		}
        	}
        },    	
        ready: function () {
	      	console.log("加载首页...");
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height();//页面内容高度
            $("#messageboard").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
        },
        methods: {
            backPage: function () {
                if (window.history && window.history.pushState) {
                    window.history.back();
                }
          	},
			getNotice:function(){
		         this.$http.post(configuration.global.serverPath + "/api/Tabbar/getNotice",{shopid:configuration.global.shopid},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		 this.getNotice = results.data;
		         	}else{
		         		layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });
		    }          
        }
    }
</script>
