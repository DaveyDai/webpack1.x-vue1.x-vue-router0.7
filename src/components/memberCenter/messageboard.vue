<template>
	<div id="messageboard" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="ly_top">
					<div class="ly_toptitle">留言板/ Message Board</div>
				</div>
				<div class="p_re nlyb_top clearfix overflow">
					<div class="nlyb_br"></div>
					<div class="nlyb_warp">
						<ul id="lyb">
							<li class="nlyb_bgstyle p_re" v-for="item in messageList" >
								<div class="nlyb_radius"></div>
								<div class="nlyb_box clearfix"><span class="nlyb_name">{{item.name||'匿名'}}</span><span class="nlyb_time">{{item.create_time}}</span><span v-bind:class="'nlyb_star_'+item.count" class="nlyb_star"></span></div>
								<div class="nlyb_con">{{item.text}}</div>
								<div class="nlyb_admin p_re" v-for="messItem in item.message" >
									<div class="nlyb_adthree"></div>
									<em>{{messItem.name||'匿名'}}</em>回复：<span class="nlyb_empty">{{messItem.text}}</span>
								</div>
								<div class="mess-reinput" v-on:click="messageInput(item.id)" >回复</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="hotel-page">
					<div class="hotel-page-b" v-on:mousedown="getMessage('back')" >
						<img src="../../images/life_previous_pages_arrow@2x.png"/>
						<span class="hotel-page-back">{{pageList.pageNo==1&&"已到首页"||"上一页"}}</span>							
					</div>
					<span class="hotel-pages-th">{{pageList.pageNo}}/{{pageList.pageAll}}</span>
					<div class="hotel-page-n" v-on:mousedown="getMessage('next')" >
						<span class="hotel-page-next">{{pageList.pageNo==pageList.pageAll&&"已到尾页"||"下一页"}}</span>
						<img src="../../images/life_next_pages_arrow@2x.png"/>
					</div>
				</div>				
				<div class="hotel-copyright">Copyright @ 左岸阳光 版权所有</div>
			</article>	
		</section>
		<div class="ly_header"><span id="ly_showalert" v-on:click="messageInput()" ><a href="javascript:void(0);">发表留言</a></span></div>
	</div>
</template>
<style>
	#messageboard .hotel-copyright{
		margin-top: 3rem;
	}
	#messageboard .hotel-page{
		margin-top: 2rem;
	}
	#messageboard .nlyb_admin em{
		color: #039cf9;
		padding-right: 10px;
	}
	#messageboard .mess-reinput{
	    width: 3.8rem;
	    height: 1.7rem;
	    line-height: 1.7rem;
	    text-align: center;
	    background-color: #63cd52;
	    border-radius: 9px;
	    color: #fff;
	    font-size: 0.9rem;
	    margin-left: 80%;		
	}
</style>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		messageList:[],
        		pageList:{
        			pageNo:1,
        			pageAll:0
        		}         		
        	}
        },    	
        ready: function () {
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height() - $("#messageboard .ly_header").height();//页面内容高度
            $("#messageboard section").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
            this.getMessage();
        },
        methods: {
		    getMessage:function(page){
		    	var pageNo = Number(this.pageList.pageNo),pageAll = Number(this.pageList.pageAll);
		    	pageNo = page?page == "next"?pageNo == pageAll?pageNo:pageNo+1:pageNo > 1?pageNo-1:1:1;//点击分页按钮  获取查询页数		    	
		        this.$http.post(configuration.global.serverPath + "/api/Personal/getMessage",{page:pageNo,token:sessionStorage.getItem("token"),shopid:configuration.global.shopid},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.messageList = results.data.data;
		         		this.pageList.pageAll = Math.ceil(results.data.count/10);
		         		this.pageList.pageNo = pageNo;		         		
		         	}else{
		         		layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });			    		
		    },
		    messageInput:function(id){
		    	sessionStorage.setItem("messtypeid",id||"");
		    	this.$router.go({name:"messageInput"});
		    }
        }
    }
</script>
