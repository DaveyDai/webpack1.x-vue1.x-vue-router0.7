<template>
	<div id="callPasswd" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="pass-input pass-name">
					<span>用户名：</span><input type="text" name="username" v-model="backPwdParam.username" placeholder="请输入您的用户名" />
				</div>
				<div class="pass-input">
					<span>邮箱：</span><input type="email" name="mail" v-model="backPwdParam.mail" placeholder="请输入您的找回密码邮箱" />
					<p id="checkEmail">*邮箱格式不正确</p>
				</div>
				<div class="pass-go"><span class="pass-goto" v-on:click="sendCode()" >发送验证码</span><span class="pass-back" v-link="{name:'login'}" >返回登录窗口</span></div>
			</article>		
			<div class="hotel-copyright">Copyright @ 左岸阳光 版权所有</div>
		</section>
	</div>	
</template>
<style>
	#callPasswd article{
		background-color: #fff;
	}
	.pass-input{
		width: 84%;
		height: auto;
		border-bottom: 1px solid #ccc;
		margin: 0 8%;
		padding-top: 1rem;
		padding-bottom: 5px;
	}
	.pass-input > span{
	    font-size: 1.1333333333333333rem;
	    color: #333;
	    display: inline-block;
	    width: 25%;
	    text-align: right;		
	}
	.pass-input > input{
		margin-left: 6%;
		width: 68%;
		height: 2.5rem;
		font-size: 1rem;
		color: #999;
		border: 0;
	}
	#callPasswd #checkEmail{
		display: none;
		color: red;
	}
	.pass-go{
	    width: 84%;
	    height: 2.7rem;
	    line-height: 2.7rem;
	    margin: 2.5rem 8%;
	    font-size: 1rem;		
	}
	.pass-go span{
	    display: inline-block;
	    width: 46%;
	    text-align: center;	
	    border-radius: 10px;	
	}
	.pass-go span.pass-goto{
		background-color: #E74C3C;
		color: #fff;
	}
	.pass-go span.pass-back{
		margin-left: 1.3333333333333333rem;
		background-color: #efefef;
		border: 1px solid #D0D0D0;
	}
</style>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		backPwdParam:{
        			shopid:configuration.global.shopid,
        			mail:"",
        			username:""
        		}
        	}
        },    	
        ready: function () {
        	
        },
        methods: {
        	isEnNumeric:function(strValue){
        		// 判断是否为英文、数字、字母或_
				var pattern = /^[_0-9a-zA-Z]+$/;  
				return pattern.test(strValue);        		
        	},         	
            sendCode:function(){
        		if(this.checkParam()){
			        this.$http.post(configuration.global.serverPath + "/api/login/sendMail",this.backPwdParam,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
			         	var results = response.data;
		                if(results.code === 200){
		                	layerUtils.iAlert("已发送验证码至您的邮箱，请查看邮件继续设置新密码",function(){
		                		this.$router.go({name:"resetPassd",query:{username:this.backPwdParam.username}});
		                	}.bind(this));
		                }else if(results.code === -1){
		                    layerUtils.iAlert(results.message);
		                }else{
		                	layerUtils.iAlert(results.message);
		                }
			        },function (response) {
			        	alert(JSON.stringify(response.data));
			        });         			
        		}
        	},
		    checkParam:function(){
				if(!this.backPwdParam.username || !this.isEnNumeric(this.backPwdParam.username)){
					layerUtils.iAlert("请输入用户名");
					return false;
				}
				if(!this.isEmail(this.backPwdParam.mail)){
					document.getElementById("checkEmail").style.display = "block";
					return false;
				}
			    return true;
		    },
		    emailChange:function(){
		    	document.getElementById("checkEmail").style.display = this.isEmail(this.backPwdParam.mail)?"none":"block";
		    },
		    isEmail:function(strValue){
		    	if(!strValue||strValue.replace(/\s/g,"").length === 0){
		    		return false;
		    	}
			    var pattern = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			    return pattern.test(strValue);		    	
		    }
        }
    }
</script>
