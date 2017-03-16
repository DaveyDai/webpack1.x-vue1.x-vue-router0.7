<template>
	<div id="pointsChange" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="points-tall">
					<div class="rerespan recordtopspa">
						<span class="re2 re-w1">订单号</span><span class="re2 re-w2">积分</span><span class="re1 re-w3">积分说明</span>
					</div>
					<div class="rerespan rerespanstyle" v-for="pointParam in pointList" >
						<span class="restyle re-w1">{{pointParam.order_id}}</span>
						<span class="restyle re-w2">{{pointParam.point}}</span>
						<span class="restyle1 color666 re-w3" style="font-size:13px;"><em>&nbsp;{{pointParam.create_time}}消费积分变动<font color="red">{{pointParam.type_status == 0&&'(积分暂未入账，等待店家处理)'||pointParam.type_status==1&&'(已入帐)'||"等待店家处理中..."}}</font></em></span>
					</div>
				</div>
				<div class="hotel-page">
					<div class="hotel-page-b" v-on:mousedown="getPointList('back')" >
						<img src="../../images/life_previous_pages_arrow@2x.png"/>
						<span class="hotel-page-back">{{pageList.pageNo==1&&"已到首页"||"上一页"}}</span>							
					</div>
					<span class="hotel-pages-th">{{pageList.pageNo}}/{{pageList.pageAll}}</span>
					<div class="hotel-page-n" v-on:mousedown="getPointList('next')" >
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
	.points-tall{
		padding:10px 0 0 0;
		background-color: #fff;
	}
	#pointsChange .re-w1{
		width: 45%;
	}
	#pointsChange .re-w2{
		width: 15%;
	}
	#pointsChange .re-w3{
		width: 40%;
	}
</style>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		pointList:[],
        		pageList:{
        			pageNo:1,
        			pageAll:0
        		}        		
        	}
        },    	
        ready: function () {
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height();//页面内容高度
            $("#pointsChange").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
            this.getPointList();
        },
        methods: {
		    getPointList:function(page){
		    	var pageNo = Number(this.pageList.pageNo),pageAll = Number(this.pageList.pageAll);
		    	pageNo = page?page == "next"?pageNo == pageAll?pageNo:pageNo+1:pageNo > 1?pageNo-1:1:1;//点击分页按钮  获取查询页数
		        this.$http.post(configuration.global.serverPath + "/api/Personal/getPointList",{token:sessionStorage.getItem("token"),page:pageNo},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.pointList = results.data.data;
		         		this.pageList.pageAll = Math.ceil(results.data.count/10)||1;
		         		this.pageList.pageNo = pageNo;
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
