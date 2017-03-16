<template>
	<div id="personInfo" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="bgstyle" style="font-size:12px;">
					<p><strong>请补充您的个人信息:</strong></p>
					<p>*补充完整以下个人信息，就可以轻松在我们这里下单操作啦！<br>*web登录名用于您在手机浏览器端或者电脑端登陆您的账号使用。</p>
				</div>
				<div class="bgstyle" style="font-size:12px;">
					<p><strong> 商家没有开启平台短信服务。暂时无法验证您的手机号。</strong></p>
				</div>
				<div class="bgstyle clear customer">
					<dl class="member-name"><dt>会员ID</dt>
						<dd>{{personInfo.id}}</dd>
					</dl>
					<dl><dt>名字</dt>
						<dd><input name="xm" v-model="personInfo.nickname" type="text" class="borderstyle radius5" maxlength="30" placeholder="请补充您的姓名/称呼"></dd>
					</dl>
					<dl><dt>电话 </dt>
						<dd><input name="tel" v-model="personInfo.phone" type="tel" class="borderstyle radius5" maxlength="11" placeholder="在这里补充您的联系电话"></dd>
					</dl>
					<dl><dt>地址 </dt>
						<dd><input name="dz" v-model="personInfo.address" type="text" class="borderstyle radius5" maxlength="50" placeholder="在这里补充您的地址"></dd>
					</dl>
					<dl><dt>Email </dt>
						<dd><input name="femailaddress" v-model="personInfo.email" type="text" class="borderstyle radius5" maxlength="30" placeholder="在这里填写您的邮箱地址"></dd>
					</dl>
					<dl><dt>QQ号 </dt>
						<dd><input name="foicq" v-model="personInfo.qq" type="tel" class="borderstyle radius5" maxlength="30" placeholder="在这里填写您的QQ号"></dd>
					</dl>
					<dl><dt>web登陆名</dt>
						<dd><input name="webloginname" v-model="personInfo.username" type="text" class="borderstyle radius5" maxlength="30" placeholder="用于web端登陆用户名" readonly="readonly"></dd>
					</dl>
					<dl><dt>登陆密码</dt>
						<dd><input class="borderstyle radius5" v-model="personInfo.password" type="password" name="passwordone" placeholder="需要修改密码请输入，不修改请留空。"></dd>
					</dl>
					<dl><dt>重复密码</dt>
						<dd><input id="checkPwd" class="borderstyle radius5" type="password" name="passwordsecond" value="" placeholder="再次输入一次刚才的密码"></dd>
						<p id="checkPwds" >*两次密码不一致</p>
					</dl>
					<dl><dt>生日</dt>
						<dd><input v-model="personInfo.birthday" class="borderstyle radius5" type="text" placeholder="格式为:yyyy-mm-dd或者yyyy/mm/dd"></dd>
						<p id="checkDeta" >*日期格式不正确</p>
					</dl>
					<!--<dl id="UdateChoose"><dt>&nbsp;生日选择</dt>
						<dd>
							<div class="">
								<label for="UdateYear" class="car_labse p_re"><div class="dk_arrowspng"></div><select name="year" style="height:33px;" class="deliverytime radius5" id="UdateYear" data-value=""><option value="0">年份选择</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option><option value="2014">2014</option><option value="2013">2013</option></select></label>
								<label for="UdateMonth" class="car_labse UdateMonthC p_re"><div class="dk_arrowspng"></div><select name="month" style="height:33px;" class="deliverytime radius5" id="UdateMonth" data-value=""><option value="0">月份选择</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select></label>
								<label for="Udateday" class="car_labse UdatedayC p_re"><div class="dk_arrowspng"></div><select name="day" style="height:33px;" class="deliverytime radius5" id="Udateday" data-value=""><option value="0">日期选择</option><option value="1">1</option><option value="2">2</option></select></label>
							</div>
						</dd>
					</dl>-->
				</div>
				<div class="bgstyle account"><div class="account-btn" v-on:mousedown="submitInfo()" >确认保存</div></div>
				<div class="hotel-copyright">Copyright @ 左岸阳光 版权所有</div>
			</article>	
		</section>
	</div>
</template>
<style>
	#personInfo{
		font-size: 14px;
	}
	#personInfo .member-name dd{
		padding: 10px 0 0 15px;
	}
	#UdateChoose select {
		font-size: 14px;
		-webkit-appearance: none;
		outline: none;
	}
	
	.car_labse {
		margin-bottom: 5px;
		box-shadow: none;
		background-image: none;
		border-color: #eee;
	}
	
	.UdateMonthC,
	.UdatedayC {
		width: 45%!important;
		float: left;
	}
	
	.UdateMonthC {
		margin-right: 5px;
	}
	
	.UserDateCheck {
		margin-top: 5px;
	}
	
	#__ErrorMessagePanel {
		display: block;
	}
	
	.borderstyle {
		border: 1px solid #fff;
		box-shadow: none;
		-webkit-appearance: none;
		outline: none;
	}
	#checkPwds,#checkDeta{
		color: red;
		padding-left: 10%;
		display: none;
	}
</style>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        		personInfo:{}
        	}
        },    	
        ready: function () {
	      	console.log("加载首页...");
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height();//页面内容高度
            $("#personInfo").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
            this.getPersonInfo();
        },
        methods: {
		    getPersonInfo:function(){
		        this.$http.post(configuration.global.serverPath + "/api/Personal/getPersonalData",{shopid:configuration.global.shopid,token:sessionStorage.getItem("token")},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.personInfo = results.data;
		         		this.personInfo.shopid = configuration.global.shopid;
		         		this.personInfo.token = sessionStorage.getItem("token");
		         		this.personInfo.password = "";
		         	}else{
		         		layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });			    		
		    },
		    submitInfo:function(){
		    	if(this.isCheck()){
			        this.$http.post(configuration.global.serverPath + "/api/Personal/modifyPersonalData",this.personInfo,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
			         	var results = response.data;
			         	if(results.code === 200){
			         		layerUtils.iAlert("修改成功",function(){
			         		   if(window.history && window.history.pushState)window.history.back();	
			         		});
			         	}else{
			         		layerUtils.iAlert(results.message||"请求服务器失败");
			         	}
			        }, function (response) {
			        	layerUtils.iAlert("连接服务器失败，请联系管理员");
			        });			    		
		    	}
		    },
		    isCheck:function(){
		    	if(this.personInfo.password && this.personInfo.password.replace(/\s/g,"")){
		    		document.getElementById("checkPwds").style.display = this.personInfo.password == document.getElementById("checkPwd").value?"none":"block";
		    		if(this.personInfo.password == document.getElementById("checkPwd").value){
		    			return true;
		    		}else{
		    			return false;
		    		}
		    	}
		    	if(this.personInfo.birthday && this.personInfo.birthday.replace(/\s/g,"") && !this.isDeta(this.personInfo.birthday)){
		    		document.getElementById("checkDeta").style.display = "block";
		    		return false;
		    	}else{
		    		document.getElementById("checkDeta").style.display = "none";
		    	}
		    	return true;
		    },
		    isDeta:function isDate(strValue){
				//判断是否是正确的日期,正确格式为:yyyy-mm-dd或者yyyy/mm/dd
				strValue = strValue.split(" ")[0];
				var r = strValue.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
				if(r==null)return false; 
				var d= new Date(r[1], r[3]-1, r[4]); 
				return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);	
			}
        }
    }
</script>
