<template>
	<div id="myReservation" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="myReser-title">
					<div class="myReser-explant"><span class="myRescon-explant-me">我的预订</span><span v-link="{name:'myReserve'}" style="position: relative;top:-1px;" >预订中心</span></div>
				</div>
				<div class="myReser-conter">
					<li v-for="item in reserveList" >
						<div class="myReser-conter-img"><img src="../../images/member_order_head_image@2x.png"/></div>
						<div class="myRescon-explant"><p class="r-explant-title">{{item.reserve_name}}</p><p>人数:  {{item.number}}</p><p>备注:  {{item.note}}</p><p>电话: {{item.phone}}</p><p>时间:  {{item.reserve_time}}</p></div>
					</li>
				</div>
				<div class="myReser-conter-no" style="display: none;">
					<div class="myRescon-no">暂无预订记录</div><div v-link="{name:'myReserve'}" class="myRescon-gotor">前往预订中心</div>
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
		font-size: 0.9rem;
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
	.myReser-conter{
		width: 100%;
		background-color: #fff;
	}
	.myReser-conter li{
		height: 7.2rem;
		border-bottom: 1px solid #E5E5E5;
	}
	.myReser-conter li > div{
		float: left;
	}
	.myReser-conter li .myReser-conter-img img{
		width: 2.933333333333333rem;
		height: 2.8666666666666667rem;
		margin: 1.1333333333333333rem 1.2rem 3.2rem 1rem;
	}
	.myReser-conter li .myRescon-explant{
		font-size: 0.8rem;
		color: #666;
		line-height: 1.2rem;
		margin-top: 0.5rem;
	}
	.myReser-conter li .r-explant-title{
		line-height: 1.5rem;
		font-size: 0.9333333333333333rem;
		color: #000;
	}
	.myReser-conter-no{
		width: 100%;
		height: 13.333333333333334rem;
		text-align: center;
		font-size: 0.9333333333333333rem;
		background-color: #fff;
	}
	.myReser-conter-no .myRescon-no{
		padding-top: 18%;
	}
	.myReser-conter-no .myRescon-gotor{
		position: relative;
		left: 30%;
		margin-top:0.3333333333333333rem ;
		width: 40%;
		border:1px solid red;
		color: red;
		border-radius: 5px;
	}	
</style>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		pageList:{
        			pageNo:1,
        			pageAll:0
        		},
        		reserveList:[]
        	}
        },    	
        ready: function () {
	      	console.log("加载首页...");
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height();//页面内容高度
            $("#myReservation").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
            this.queryReserve();
        },
        methods: {
		    queryReserve:function(page){
		    	var pageNo = Number(this.pageList.pageNo),pageAll = Number(this.pageList.pageAll);
		    	pageNo = page?page == "next"?pageNo == pageAll?pageNo:pageNo+1:pageNo > 1?pageNo-1:1:1;//点击分页按钮  获取查询页数
		        this.$http.post(configuration.global.serverPath + "/api/Personal/myReserve",{shopid:configuration.global.shopid,token:sessionStorage.getItem("token"),page:pageNo},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.reserveList = results.data.data;
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
