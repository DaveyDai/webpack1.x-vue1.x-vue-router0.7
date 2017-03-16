<template>
	<div id="messageInput" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="message-xin" v-if="!messParam.typeid" >
					<span class="message-img"><img src="../../images/home_shop_image@2x.png"/></span>
					<span>描述相符</span>
					<span class="mess-xinxin">
						<em class="order-xinxin" v-on:click="checkXin(1,$event)" ></em>
						<em class="order-xinxin" v-on:click="checkXin(2,$event)" ></em>
						<em class="order-xinxin" v-on:click="checkXin(3,$event)" ></em>
						<em class="order-xinxin" v-on:click="checkXin(4,$event)" ></em>
						<em class="order-xinxin" v-on:click="checkXin(5,$event)" ></em>
					</span>
					<span id="messgood" >非常好</span>
				</div>
				<div class="message-input">
					<span><img src="../../images/home_shop_image@2x.png"/></span>
					<textarea v-model="messParam.text" name="mess" rows="" cols="" placeholder="环境如何？服务是否周到？快来评价一下吧~"></textarea>
				</div>
				<div class="hotel-copyright">Copyright @ 左岸阳光 版权所有</div>
			</article>	
		</section>
		<div class="ly_header"><span id="ly_showalert" v-on:click="goMess()" ><a href="javascript:void(0);">发表评论</a></span></div>
	</div>
</template>
<style>
	.message-xin{
		width: 100%;
		height: 4.4rem;
		line-height: 4.4rem;
		background-color: #fff;
		font-size: 0.9rem;
		color: #333;
	}
	.message-xin .message-img{
		margin: 1rem 0.33rem 1rem 0.66rem;
	}
	.message-xin .message-img img{
		width: 2.4rem;
		height: 2.4rem;
	}
	.mess-xinxin{
		margin-left: 0.33rem;
	}
	.mess-xinxin .order-xinxin{
		display: inline-block;
		margin: -0.26rem 0.26rem;
		width: 1.2rem;
		height: 1.2rem;
		background: url(../../images/member_full_star_img@2x.png) no-repeat;
		background-size: 1.2rem;
	}
	.mess-xinxin em.active{
		background: url(../../images/member_empty_star_img@2x.png) no-repeat;
		background-size: 1.2rem;
	}
	#messgood{
		position: absolute;
		right: 0.8rem;
	}
	.message-input{
		margin-top: 0.67rem;
		width: 100%;
		height: 13.3rem;
		background-color: #fff;
	}
	.message-input img{
		width: 3.93rem;
		height: 3.93rem;
		margin: 0.67rem 0 0 0.667rem;
	}
	.message-input textarea{
	    position: absolute;
	    margin-left: 0.66rem;
	    margin-top: 1rem;
	    padding: 5px;
	    height: 10rem;
	    width: 70%;
	    border: 0;
	    font-size: 0.93rem;
	    color: #999;
	}
</style>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		messParam:{
        			shopid:configuration.global.shopid,
        			token:sessionStorage.getItem("token"),
        			name:"匿名",
        			count:5,
        			text:"",
        			typeid:""
        		}
        	}
        },    	
        ready: function () {
            this.getPersonInfo();
            this.messParam.typeid = sessionStorage.getItem("messtypeid")||"";
        },
        methods: {
            goMess:function () {
            	this.messParam.text = this.messParam.text || "好评!";
		        this.$http.post(configuration.global.serverPath + "/api/Personal/message",this.messParam,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.$router.go({name:"messageboard"});
		         	}else{
		         		layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });	            	
           	},
           	checkXin:function(xin,event){
           		this.messParam.count = xin;
           		$(event.target).removeClass("active").nextAll().addClass("active");
         		$(event.target).prevAll().removeClass("active");
         		$("#messgood").text(xin==1&&'差'||xin==2&&'差'||xin==3&&'一般'||xin==4&&'好'||xin==5&&'非常好');
           	},
		    getPersonInfo:function(){
		        this.$http.post(configuration.global.serverPath + "/api/Personal/getPersonalData",{shopid:configuration.global.shopid,token:sessionStorage.getItem("token")},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.messParam.name = results.data.nickname || "匿名";
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
