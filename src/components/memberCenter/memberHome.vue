<template>
	<div id="memberHome" style="position: relative;">
		<div class="newmenber">
			<div class="nmtop clearfix">
				<div class="nlogo fl"><img src="../../images/member_self_image@2x.png" alt="商家logo"></div>
				<div class="newsmem">
					<div class="newsnamebox"><span class="newsmemname"><a href="javascript:void(0);"></a></span><span class="nboxvip">{{personInfo.nickname && '昵称： '||''}}{{personInfo.nickname||'未设置昵称'}}</span><span class="nboxvip"><a href="javascript:void(0);" style="color:white;"></a></span></div>
					<div class="newsmembox">
						<ul>
							<li>
								<div class="box">
									<a href="javascript:void(0);">
										<div class="nmuen1">{{personInfo.point}}</div>
										<div class="nmuen2">积分</div>
									</a>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="clearfix nmemlist">
				<ul>
					<li>
						<div class="bgstyle nsignin noshadow" v-on:click="signShow()" >
							<div class="nmemlist1"><img src="../../images/member_sign_in@2x.png" /></div>
							<div class="nmemlist2">每日签到</div>
						</div>
					</li>
					<li v-link="{name:'orderAll'}" >
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_order@2x.png" /></div>
							<div class="nmemlist2">全部订单</div>
						</div>
					</li>
					<li v-link="{name:'personInfo'}" >
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_personal_data@2x.png" /></div>
							<div class="nmemlist2">个人资料</div>
						</div>
					</li>
					<li v-link="{name:'memberPoints'}" >
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_card@2x.png" /></div>
							<div class="nmemlist2">会员积分卡</div>
						</div>
					</li>
					<li v-link="{name:'myReservation'}" >
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_reserve_record@2x.png" /></div>
							<div class="nmemlist2">预订记录</div>
						</div>
					</li>
					<li v-link="{name:'myReserve'}" >
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_reserve@2x.png" /></div>
							<div class="nmemlist2">我要预订</div>
						</div>
					</li>
					<li>
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_guagua_card@2x.png" /></div>
							<div class="nmemlist2">刮刮卡</div>
						</div>
					</li>
					<li>
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_discount_coupon@2x.png" /></div>
							<div class="nmemlist2">优惠券</div>
						</div>
					</li>
					<li>
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_value_card@2x.png" /></div>
							<div class="nmemlist2">储值卡专区</div>
						</div>
					</li>
					<li>
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_big_plate@2x.png" /></div>
							<div class="nmemlist2">大转盘</div>
						</div>
					</li>
					<li>
						<div class="bgstyle noshadow">
							<div class="nmemlist1"><img src="../../images/member_mine_number@2x.png" /></div>
							<div class="nmemlist2">我的排号</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="clear clearfix logoutbox" v-on:mousedown="outLogin()" >
				<a href="javascript:void(0);">退出登录 </a>
			</div>
			<div class="hotel-copyright">Copyright @ 左岸阳光 版权所有</div>
		</div>
		<div id="signTake" class="nsigninbox">
			<div class="pos_title clearfix clear"><span class="pos_hide radius5 fl" v-on:click="signHide()" >取消</span></div>
			<div class=""><span class="ndayin"><a v-on:click="signCheck()" class="radius5" href="javascript:void(0);">点击这里签到哦</a></span><span class="ndayin"><a v-link="{name:'signPage'}" class="radius5" href="javascript:void(0);">查看签到记录</a></span></div>
		</div>		
	</div>
</template>
<style>
	.bgstyle{
		margin: -1px!important;
		box-shadow: 0 0 1px #777 inset;
	}
	#memberHome .hotel-copyright{
		margin-bottom: 50px;
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
        	var scrollerConHeight = $(window).height() - $("#afui #footer").height();//页面内容高度
            $("#memberHome .newmenber").css("overflow-y", "auto").css("overflow-x","hidden").css("height", scrollerConHeight + "px");
            this.getPersonInfo();
        },
        methods: {
			signShow:function(){
		    	$("#memberHome #signTake").show().animate({bottom:0},300);				
			},
			signHide:function(){
				$("#memberHome #signTake").animate({bottom:"-200px"},300,"linear",function(){
					$(this).hide();
				});
			},
		    signCheck:function(){
		        this.$http.post(configuration.global.serverPath + "/api/Personal/signIn",{token:sessionStorage.getItem("token")},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		layerUtils.iAlert("签到成功");
						$("#memberHome #signTake").animate({bottom:"-200px"},300,"linear",function(){
							$(this).hide();
						});		         		
		         	}else{
		         		layerUtils.iAlert(results.message||"请求服务器失败");
		         	}
		        }, function (response) {
		        	layerUtils.iAlert("连接服务器失败，请联系管理员");
		        });			    		
		    },			
		    outLogin:function(){
		    	sessionStorage.setItem("toLoginPageCode",sessionStorage.getItem("pageCode"));
		    	sessionStorage.removeItem("token");
		    	this.$router.go({name:"login"});
		    },
		    getPersonInfo:function(){
		        this.$http.post(configuration.global.serverPath + "/api/Personal/getPersonalData",{shopid:configuration.global.shopid,token:sessionStorage.getItem("token")},{headers: {'Content-Type': 'application/x-www-form-urlencoded'},emulateJSON:true}).then(function (response) {
		         	var results = response.data;
		         	if(results.code === 200){
		         		this.personInfo = results.data;
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
