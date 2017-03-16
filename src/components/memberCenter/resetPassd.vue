<template>
	<div id="resetPassd" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="pass-input pass-name">
					<span>用户名</span><input type="text" v-model="resetParam.username" placeholder="请输入您的用户名"/>
				</div>
				<div class="pass-input pass-name">
					<span>验证码</span><input type="tel" v-model="resetParam.sms" placeholder="请输入邮箱收到的验证码" />
				</div>
				<div class="pass-input">
					<span>新密码</span><input type="password" v-model="resetParam.password" placeholder="请设置登录密码" />
				</div>
				<div class="pass-input">
					<span>重输密码</span><input type="password" id="pwdAgin" v-on:blur="chanePwd()" placeholder="请再一次输入密码" />
					<p id="checkPwdr">*两次密码输入的不一致</p>
				</div>
				<div class="resetPassd-go" v-on:click="setPwd()" >提交</div>
			</article>		
			<div class="hotel-copyright">Copyright @ 左岸阳光 版权所有</div>
		</section>
	</div>	
</template>
<style>
	#resetPassd article{
		background-color: #fff;
	}
	#resetPassd #checkPwdr{
		display: none;
		color: red;
	}
	.pass-input{
		width: 84%;
		border-bottom: 1px solid #ccc;
		margin: 0 8%;
		padding-top: 2rem;
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
	.resetPassd-go{
		margin: 2rem 10% 4rem 10%;
		width: 80%;
		height: 2.6666666666666665rem;
		line-height: 2.6666666666666665rem;
		background-color: #E74C3C;
		text-align: center;
		font-size: 1rem;
		color: #fff;
		border-radius: 10px;
	}	
</style>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		resetParam:{
        			shopid:configuration.global.shopid,
        			username:"",
        			sms:"",
        			password:""
        		}
        	}
        },    	
        ready: function () {
        	this.resetParam.username = this.$route.query.username||"";
        },
        methods: {
        	isEnNumeric:function(strValue){
        		// 判断是否为英文、数字、字母或_
				var pattern = /^[_0-9a-zA-Z]+$/;  
				return pattern.test(strValue);        		
        	},        	
            setPwd:function(){
        		if(this.checkParam()){
			        this.$http.post(configuration.global.serverPath + "/api/login/retrievePassword",this.resetParam,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
			         	var results = response.data;
		                if(results.code === 200){
		                	layerUtils.iAlert("重置密码成功,请重新登录",function(){
		                		this.$router.go({name:"login"});
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
        	chanePwd:function(){
        		document.getElementById("checkPwdr").style.display = this.resetParam.password === document.getElementById("pwdAgin").value?"none":"block";
        		return this.resetParam.password === document.getElementById("pwdAgin").value;
        	},
		    checkParam:function(){
				if(!this.resetParam.username || !this.isEnNumeric(this.resetParam.username)){
					layerUtils.iAlert("请输入正确的用户名");
					return false;
				}
				if(!this.resetParam.sms || this.resetParam.sms.replace(/\s/g,"").length === 0){
					layerUtils.iAlert("请输入验证码");
					return false;
				}
				if(!this.resetParam.password || this.resetParam.password.replace(/\s/g,"").length === 0){
					layerUtils.iAlert("请输入新密码");
					return false;
				}
				if(!this.chanePwd()){
					return false;
				}
			    return true;
		    }
        }
    }
</script>
