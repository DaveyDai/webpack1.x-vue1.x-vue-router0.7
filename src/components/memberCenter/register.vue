<template>
	<div id="register" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="pass-input pass-name">
					<span>用户名<em>*</em></span><input type="text" name="userName" id="userName" v-model="regParam.username" placeholder="请输入您的用户名" maxlength="20" />
				</div>
				<div class="pass-input">
					<span>密码<em>*</em></span><input type="password" name="pwd" v-model="regParam.password" placeholder="请设置登录密码" maxlength="20" />
				</div>
				<div class="pass-input r-passwd">
					<span>重输密码<em>*</em></span><input type="password" name="pwdr" id="pwdr" v-on:blur="checkPwd()" placeholder="请再一次输入密码" maxlength="20" />
					<p id="checkPwdS">*两次密码输入的不一致</p>
				</div>
				<div class="pass-input">
					<span>邮箱</span><input type="email" name="email" v-model="regParam.email" placeholder="请输入邮箱" maxlength="30" />
				</div>
				<div class="pass-input">
					<span>姓名</span><input type="text" name="nickname" v-model="regParam.nickname" placeholder="请输入姓名" maxlength="20"/>
				</div>
				<div class="pass-input">
					<span>电话</span><input type="tel" name="phone" v-model="regParam.phone" placeholder="请输入电话" maxlength="11"/>
				</div>
				<div class="pass-input">
					<span>地址</span><input type="text" name="address" v-model="regParam.address" placeholder="请输入地址" maxlength="50"/>
				</div>
				<div class="pass-input">
					<span>QQ号</span><input type="tel" name="qq" v-model="regParam.qq" placeholder="请输入QQ号" maxlength="13"/>
				</div>
				<div class="register-btn">
					<div class="register-go" v-on:mousedown="goRegister()" >注册</div>
				</div>
				<div class="hotel-copyright">Copyright @ 左岸阳光 版权所有</div>
			</article>		
		</section>
	</div>	
</template>
<style>
	#register article{
		background-color: #fff;
	}
	.isShow{
		display: none;
	}
	.pass-input{
		width: 84%;
		height: 4rem;
		border-bottom: 1px solid #ccc;
		margin: 0 8%;
		padding-top: 1.5rem;
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
		height: 2rem;
		font-size: 1rem;
		color: #999;
		border: 0;
	}
	.pass-input em{
		color: red;
	}
	.r-passwd{
		padding-top: 0;
		height: auto;
	}
	.r-passwd > span{
		margin-top: 1.5rem;
		padding-bottom: 5px;
	}
	.r-passwd > input{
		margin-top: 1.5rem;
	}
	.r-passwd p{
		display: none;
		color: red;
	}
	.register-btn{
		height: 8rem;
		background-color: #fff;
		padding-top: 2rem;
	}
	.register-go{
		margin: 0 10% 4rem 10%;
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
        		regParam:{
        			shopid:configuration.global.shopid,
        			username:"",
        			password:"",
        			email:"",
        			nickname:"",
        			phone:"",
        			address:"",
        			qq:""
        		},
        		isShow:false
        	}
        },    	
        ready: function () {
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height();//页面内容高度
            $("#register").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
        },
        methods: {
        	isEnNumeric:function(strValue){
        		// 判断是否为英文、数字、字母或_
				var pattern = /^[_0-9a-zA-Z]+$/;  
				return pattern.test(strValue);        		
        	},
        	checkPwd:function(){
        		document.getElementById("checkPwdS").style.display = this.regParam.password === document.getElementById("pwdr").value?"none":"block";
        		return this.regParam.password === document.getElementById("pwdr").value;
        	},
        	goRegister:function(){
        		if(this.checkReg()){
			        this.$http.post(configuration.global.serverPath + "/api/login/register",this.regParam,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
			         	var results = response.data;
		                if(results.code === 200){
		                	sessionStorage.setItem("token",results.data.token);
		                	layerUtils.iAlert("注册成功",function(){
		                		this.$router.go({name:sessionStorage.getItem("toLoginPageCode")});
		                	}.bind(this));
		                }else if(results.code === -1){
		                    layerUtils.iAlert(results.data);
		                }else{
		                	layerUtils.iAlert(results.data);
		                }
			        },function (response) {
			        	alert(JSON.stringify(response.data));
			        });         			
        		}
        	},
        	checkReg:function(){
        		if(!this.regParam.username || !this.isEnNumeric(this.regParam.username)){
        			layerUtils.iAlert("用户名输入不正确!");
        			return false;
        		}
        		if(!this.regParam.password || !this.regParam.password.replace(/\s/g,"")){
        			layerUtils.iAlert("请设置密码!");
        			return false;
        		}
        		if(!this.checkPwd()){
        			return false;
        		}
        		return true;        		
        	}
        }
    }
</script>
