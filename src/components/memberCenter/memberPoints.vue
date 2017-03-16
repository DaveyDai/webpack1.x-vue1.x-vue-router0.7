<template>
	<div id="memberPoints" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="bgstyle">
					<div class="vipcard" v-bind:style="styleObject()">
						<div class="vipnumber" v-if="!!messInfo.image" ></div>
					</div>
				</div>
				<div class="vipcard2">
					<ul>
						<li class="bgstyle vipmm">
							<a href="javascript:void(0);" v-on:mousedown="goChange()" > 积分：<em> {{messInfo.point}} </em>分 点击此处可以查看您的积分明细</a>
						</li>
						<li class="bgstyle vippr"></li>
						<!--<li class="bgstyle vippr">会员卡使用注意事项：<br>{{messInfo.note}}</li>-->
					</ul>
				</div>
				<div class="hotel-copyright">Copyright @ 左岸阳光 版权所有</div>
			</article>	
		</section>
	</div>
</template>
<style>
	#memberPoints .vipnumber{
	    position: absolute;
	    right: 25px;
	    font-size: 1.2rem;
	    font-weight: bold;
	    top: 13rem;		
	}
</style>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		messInfo:{}
        	}
        },    	
        ready: function () {
        	this.getPoints();
        },
        methods: {
		    getPoints:function(page){
		        this.$http.post(configuration.global.serverPath + "/api/Personal/getMemeber",{token:sessionStorage.getItem("token")},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.messInfo = results.data;
		         		$("#memberPoints .vippr").html("会员卡使用注意事项：<br>"+this.messInfo.note);
		         	}else{
		         		layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });			    		
		    },
		    goChange:function(){
		    	this.$router.go({name:"pointsChange"});
		    },
		    styleObject:function(){
		    	var imgage = this.messInfo.image||'src/images/member_membership_card@2x.png';
		    	return 'background:url(' + imgage + ') no-repeat #fff center';
		    }
        }
    }
</script>
