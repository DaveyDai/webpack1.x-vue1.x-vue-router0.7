<template>
	<div id="myReserve" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="bgstyle clearfix"> 请您按照如下要求填写，以便我们留位。 </div>
				<div class="bgstyle clear customer">
					<dl class="Handler"><dt>预约时间</dt>
						<dd id="reserve_time" >
							<select class="radius5" id="y2" name="y2" v-model="reserveTime.month" >
								<option value="1">1月</option>
								<option value="2">2月</option>
								<option value="3">3月</option>
								<option value="4">4月</option>
								<option value="5">5月</option>
								<option value="6">6月</option>
								<option value="7">7月</option>
								<option value="8">8月</option>
								<option value="9">9月</option>
								<option value="10">10月</option>
								<option value="11">11月</option>
								<option value="12">12月</option>
							</select>
							<select class="radius5" id="r2" name="r2" v-model="reserveTime.time" >
								<option value="1">1日</option>
								<option value="2">2日</option>
								<option value="3">3日</option>
								<option value="4">4日</option>
								<option value="5">5日</option>
								<option value="6">6日</option>
								<option value="7">7日</option>
								<option value="8">8日</option>
								<option value="9">9日</option>
								<option value="10">10日</option>
								<option value="11">11日</option>
								<option value="12">12日</option>
								<option value="13">13日</option>
								<option value="14">14日</option>
								<option value="15">15日</option>
								<option value="16">16日</option>
								<option value="17">17日</option>
								<option value="18">18日</option>
								<option value="19">19日</option>
								<option value="20">20日</option>
								<option value="21">21日</option>
								<option value="22">22日</option>
								<option value="23">23日</option>
								<option value="24">24日</option>
								<option value="25">25日</option>
								<option value="26">26日</option>
								<option value="27">27日</option>
								<option value="28">28日</option>
								<option value="29">29日</option>
								<option value="30">30日</option>
								<option value="31">31日</option>
							</select>
							<select class="radius5" id="d2" name="d2" v-model="reserveTime.minutes" >
								<option value="0">0点</option>
								<option value="1">1点</option>
								<option value="2">2点</option>
								<option value="3">3点</option>
								<option value="4">4点</option>
								<option value="5">5点</option>
								<option value="6">6点</option>
								<option value="7">7点</option>
								<option value="8">8点</option>
								<option value="9">9点</option>
								<option value="10">10点</option>
								<option value="11">11点</option>
								<option value="12">12点</option>
								<option value="13">13点</option>
								<option value="14">14点</option>
								<option value="15">15点</option>
								<option value="16">16点</option>
								<option value="17">17点</option>
								<option value="18">18点</option>
								<option value="19">19点</option>
								<option value="20">20点</option>
								<option value="21">21点</option>
								<option value="22">22点</option>
								<option value="23">23点</option>
								<option value="24">24点</option>
							</select>
							<select class="radius5" id="d" name="d" v-model="reserveTime.dd" >
								<option value="00">整</option>
								<option value="30">半</option>
							</select>
						</dd>
					</dl>
					<dl><dt>预约人数</dt>
						<dd><input v-model="reserveList.number" class="radius5 inputRes" type="tel" placeholder="填写人数，请直接填写数字。(必填)" maxlength="6"></dd>
						<p id="numberC" >*此选项为必填项</p>
					</dl>
					<dl class="situation"><dt>预订类型</dt>
						<dd id="resType">
							<span v-for="item in reserveType" ><input name="bx" type="radio" v-bind:checked="$index==0?'checked':''" v-bind:value="item.id" ><em>{{item.name}}</em></span> 
						</dd>
					</dl>
					<dl><dt>您的手机号</dt>
						<dd><input v-model="reserveList.phone" class="radius5 inputRes" type="tel" name="tel" value="" maxlength="11" datatype="Require" placeholder="请留下您的电话，以便我们联系您。(必填)"></dd>
						<p id="phoneC" >*此选项为必填项</p>
					</dl>
					<dl><dt>您的姓名</dt>
						<dd><input v-model="reserveList.name" class="radius5 inputRes" type="text" name="xm" value="" maxlength="10" datatype="Require" placeholder="在这里输入您的姓名/称呼(必填)"></dd>
						<p id="nameC" >*此选项为必填项</p>
					</dl>
					<dl class="Handler"><dt>您的性别</dt>
						<dd id="sex"><input type="radio" checked="checked" value="0" name="xb">先生 <input type="radio" value="1" name="xb"> 女士 </dd>
					</dl>
					<dl class="beizhushuom"><dt>备注说明</dt>
						<dd><textarea v-model="reserveList.note" class="cartextarea radius5" placeholder="填写您的备注信息，尽量控制在100字以内。" maxlength="100"></textarea></dd>
					</dl>
				</div>
				<div class="bgstyle account"><div class="account-btn" v-on:mousedown="putReserve()" >确认提交</div></div>
				<div class="hotel-copyright">Copyright @ 左岸阳光 版权所有</div>
			</article>	
		</section>
	</div>
</template>
<style>
	#myReserve{
		font-size: 14px;
	}
	#myReserve p{
		display: none;
		color: red;
		padding-left: 10%;
	}
	#myReserve .Handler dd{
		line-height: 38px;
	}
	#myReserve .Handler dt{
		height: 45px;
	}
	#myReserve .customer input{
		position: relative;
		top: 2px;
	}
	#myReserve .customer .situation dt{
		height: 60px;
		line-height: 60px;
	}
	#myReserve .customer .beizhushuom dt{
		height: 116px;
		line-height: 116px;
	}
</style>
<script type="text/javascript">
	let dataNew = new Date()
    export default {
        data: function(){
        	return {
        		reserveList:{
        			shopid:configuration.global.shopid,
        			token:sessionStorage.getItem("token"),
        			number:"",//人数
        			name:"",
        			sex:0,//男：0，女：1
        			reserve_id:"",//预订类型
        			reserve_time:"",//预订时间
        			note:"",//备注
        			phone:""//手机号码
        		},
        		reserveType:[],
        		reserveTime:{
        			month:dataNew.getMonth() + 1,
        			minutes:14,
        			time:dataNew.getDate(),
        			dd:"00"
        		}
        	}
        },    	
        ready: function () {
	      	console.log("加载首页...");
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height();//页面内容高度
            $("#myReserve").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
            this.reserveInit();
        },
        methods: {
        	reserveInit:function(){
		        this.$http.post(configuration.global.serverPath + "/api/Personal/myReserveClass",{shopid:configuration.global.shopid},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.reserveType = results.data.data;
		         	}else{
		         		layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });
        	},
        	putReserve:function(){
        		if(this.isCheck()){
			        this.$http.post(configuration.global.serverPath + "/api/Personal/reserve",this.reserveList,{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
			         	var results = response.data;
			         	if(results.code === 200){
			         		layerUtils.iAlert("预订成功",function(){
			         			this.reserveList.number = this.reserveList.name = this.reserveList.phone = this.reserveList.note = "";
			         		}.bind(this));
			         	}else{
			         		layerUtils.iAlert(results.message||"请求服务器失败");
			         	}
			        }, function (response) {
			        	layerUtils.iAlert("连接服务器失败，请联系管理员");
			        });        			
        		}
        	},
        	isCheck:function(){
        		let isCheck = true;
        		this.reserveList.reserve_time = dataNew.getFullYear() + "-" + this.reserveTime.month + "-" + this.reserveTime.time + " " + this.reserveTime.minutes + ":" + this.reserveTime.dd;
        		this.reserveList.reserve_id = this.queryInput($("#resType input"));
        		this.reserveList.sex = this.queryInput($("#sex input"));
        		if(!this.reserveList.number || !this.reserveList.number.replace(/\s/g,"").length){
        			document.getElementById("numberC").style.display = "block";
        			isCheck = false;
        		}
        		if(!this.reserveList.name || !this.reserveList.name.replace(/\s/g,"").length){
        			document.getElementById("nameC").style.display = "block";
        			isCheck = false;
        		}
        		if(!this.reserveList.phone || !this.reserveList.phone.replace(/\s/g,"").length){
        			document.getElementById("phoneC").style.display = "block";
        			isCheck = false;
        		}
        		return isCheck;
        	},
        	queryInput:function(typeElem){
        		let inputValue;
        		typeElem.each(function(){
        			if(this.checked){
        				inputValue = this.value;
        				return false;
        			}
        		});
        		return inputValue;
        	}
        }
    }
</script>
