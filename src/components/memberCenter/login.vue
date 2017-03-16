<template>
	<div id="login" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="login-menberName">
					<img src="../../images/login_in_member@2x.png"/><input type="text" v-model="loginParam.username" placeholder="手机号/账号/用户名" maxlength="30"/>
				</div>
				<div class="login-menberName login-possd">
					<img src="../../images/login_in_password@2x.png"/><input type="password" v-model="loginParam.password" placeholder="登录密码" maxlength="20"/>
				</div>
				<div class="login-explant">
					<span class="login-time">登录有效期</span>
					<span class="login-time-n">
						<select class="login-time-select">
							<option value="0">仅当次有效</option>
							<option value="1">保存1天</option>
							<option value="7">保存7天</option>
							<option value="365">永久保存</option>
						</select>					
					</span>
				</div>
				<div class="login-now" v-on:click="login()" >登录</div>
				<div class="login-other">
					<a href="javascript:void(0)" class="login-o-get" v-link="{name:'register'}" >快速注册</a>
					<a href="javascript:void(0)" class="login-o-forget" v-link="{name:'callPasswd'}" >忘记密码？</a>
				</div>
			</article>	
			<div class="hotel-copyright">Copyright @ 左岸阳光 版权所有</div>
		</section>
	</div>
</template>
<style>
	#login .content{
		background-color: #fff;
	}
	.login-menberName{
		position: relative;
		top: 2.533333333333333rem;
		width: 80%;
		line-height: 2.2666666666666666rem;
		margin: 0 10%;
		border-bottom: 1px solid #ccc;
	}
	.login-menberName img{
		width: 1.2rem;
		height: 1.2333333333333334rem;
		margin: 0 0.8rem 0.5rem 0.5rem;
	}
	.login-menberName input{
		font-size: 1.2rem;
		color: #999;
		border: 0;
		width: 80%;
		height: 2rem;
		margin-bottom: 5px;
	}
	.login-possd{
		margin-top: 2.3333333333333335rem;
	}
	.login-possd img{
		height: 1.4666666666666666rem;
	}		
	.login-explant{
		position: relative;
		top:4.666666666666667rem ;
		width: 80%;
		margin: 0 10%;
	}
	.login-explant .login-time{
		font-size: 1rem;
		color: #333;
	}
	.login-explant .login-time-n{
		margin-left: 1.0666666666666667rem;
		font-size: 1rem;
		color: #000;
		font-weight: bold;
		border-bottom: 1px solid #ccc;
		padding: 0 0 0.5rem 0.4rem;
		display: inline-block;
		width: 61%;
	}
	.login-now{
		margin: 6rem 10% 0 10%;
		width: 80%;
		height: 2.6666666666666665rem;
		line-height: 2.6666666666666665rem;
		background-color: #E74C3C;
		text-align: center;
		font-size: 1rem;
		color: #fff;
		border-radius: 10px;
	}
	.login-other{
		margin-top: 1rem;
		width: auto;
		height: 3rem;
		line-height: 3rem;
		font-size: 1.2rem;
	}
	.login-other .login-o-get{
		text-decoration: underline;
		margin-left: 1.2rem;
		color: #0b83dc;
	}
	.login-other .login-o-forget{
		position: absolute;
		right: 1.2rem;
		text-decoration: underline;
		color: #0b83dc;
	}
	.login-time-select{
	    border: 0;
  		appearance:none;
  		-moz-appearance:none;
  		-webkit-appearance:none;
    	font-size: 1.2rem;
    	font-weight: bold;
    	width: 100%;
    	background-color: #fff;
	}
</style>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		loginParam:{
        			shopid:configuration.global.shopid,
        			username:"",
        			password:""
        		}
        	}
        },    	
        ready: function(){
        	
        },
        methods: {
        	isEnNumeric:function(strValue){
        		// 判断是否为英文、数字、字母或_
				var pattern = /^[_0-9a-zA-Z]+$/;  
				return pattern.test(strValue);        		
        	},        	
        	login:function(){
        		if(this.checkParam()){
			        this.$http.post(configuration.global.serverPath + "/api/login/login",this.loginParam,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
			         	var results = response.data;
		                if(results.code === 200){
		                	sessionStorage.setItem("token",results.data.token);
		                	this.$router.go({name:sessionStorage.getItem("toLoginPageCode")});
		                }else if(results.code === -1){
		                    layerUtils.iAlert(results.data);
		                }else{
		                	layerUtils.iAlert(results.message);
		                }
			        },function (response) {
			        	alert(JSON.stringify(response.data));
			        });         			
        		}else{
        			layerUtils.iAlert("请输入正确的用户名密码");
        		}
        	},
		    checkParam:function(){
		    	return (!!this.loginParam.username && this.isEnNumeric(this.loginParam.username)) && (this.loginParam.password && this.loginParam.password.replace(/\s/g,"").length > 0);
		    }
        }
    }
</script>
