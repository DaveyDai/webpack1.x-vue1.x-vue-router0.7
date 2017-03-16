<template>
	<div id="signPage" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="sign-table">
					<div class="sign-tr sign-expalnt"><div class="sign-td">签到日期</div><div class="sign-td">备注</div></div>
					<div class="sign-tr" v-for="item in signList" ><div class="sign-td">{{item.sign_time}}</div><div class="sign-td">已签到</div></div>
				</div>
				<div class="hotel-page">
					<div class="hotel-page-b" v-on:mousedown="getSign('back')" >
						<img src="../../images/life_previous_pages_arrow@2x.png"/>
						<span class="hotel-page-back">{{pageList.pageNo==1&&"已到首页"||"上一页"}}</span>							
					</div>
					<span class="hotel-pages-th">{{pageList.pageNo}}/{{pageList.pageAll}}</span>
					<div class="hotel-page-n" v-on:mousedown="getSign('next')" >
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
	.sign-table{
		display: table;
		width: 100%;
		height: auto;
		background-color: #fff;
	}
	.sign-table .sign-tr{
		display: table-row;
		width: 100%;
		height: 2.2rem;
	}
	.sign-table .sign-td{
		display: table-cell;
		width: 50%;
		font-size: 0.8666666666666667rem;
		text-align: center;
		vertical-align: middle;
		border: 1px solid #E5E5E5;
	}
	.sign-expalnt{
		background-color: #F9F9F9;
		font-size: 1rem;
		height: 2.6666666666666665rem!important;
	}
</style>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		signList:[],
        		pageList:{
        			pageNo:1,
        			pageAll:0
        		}        		
        	}
        },    	
        ready: function () {
	      	console.log("加载首页...");
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height();//页面内容高度
            $("#signPage").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
            this.getSign();
        },
        methods: {
		    getSign:function(page){
		    	var pageNo = Number(this.pageList.pageNo),pageAll = Number(this.pageList.pageAll);
		    	pageNo = page?page == "next"?pageNo == pageAll?pageNo:pageNo+1:pageNo > 1?pageNo-1:1:1;//点击分页按钮  获取查询页数
		        this.$http.post(configuration.global.serverPath + "/api/Personal/mySignIn",{token:sessionStorage.getItem("token"),page:pageNo},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.signList = results.data.data;
		         		this.pageList.pageAll = Math.ceil(results.data.count/10);
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
