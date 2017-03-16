/**************************************************************
 @author daijh
 @date: 2017年2月24日
 @description 验证客户端输入数据
******************************************************************/
define(function(require, exports, module) {
	
	/**
	 * 执行正则表达式
	 * @param pattern 校验的正则表达式
	 * @param strValue 校验的值
	 * @returns {boolean}
	 */
	function executeExp(pattern, strValue)
	{
	    return pattern.test(strValue);
	}
	
	/**
	 * 判断字符串是否为空
	 * @param strValue 校验的值
	 * @returns {boolean}
	 */
	function isEmpty(strValue)
	{
		strValue = jQuery.trim(strValue);
		return strValue.length == 0;
	}

	/**
	 * 判断字符串是否非空
	 * @param strValue 校验的值
	 * @returns {boolean}
	 */
	function isNotEmpty(strValue)
	{
		return !isEmpty(strValue);
	}

	/**
	 * 判断是否是正确的日期,正确格式为:yyyy-mm-dd或者yyyy/mm/dd
	 * @param strValue 校验的值
	 * @returns {boolean}
	 */
	function isDate(strValue)
	{
		if(isEmpty(strValue))
			return false;
		var r = strValue.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
		if(r==null)
			return false; 
		var d= new Date(r[1], r[3]-1, r[4]); 
		return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);	
	}

	/**
	 * 判断是否长时间，形如 (2003-12-05 13:04:06)
	 * @param str 校验的值
	 * @returns {boolean}
	 */
	function isDateTime(str)
	{
		var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
		var r = str.match(reg); 
		if(r==null) return false; 
		var d= new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]); 
		return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]);
	}

	/**
	 * 判断字符串是否为字母或数字
	 * @param strValue 校验的值
	 * @returns {boolean}
	 */
	function isAlphaNumeric(strValue)
	{
		if(isEmpty(strValue))
			return false;
	    // 只能是 A-Z a-z 0-9 之间的字母数字 或者为空
		var pattern = /^[A-Za-z0-9]+$/;
	    return executeExp(pattern, strValue);
	}

	/**
	* 判断是否为中文、英文、字母或_
	* @param strValue 校验的值
	* @returns {boolean}
	*/
	function isCnAndEnNumeric(strValue)
	{
		var pattern = /^[_0-9a-zA-Z\u4e00-\u9fa5]+$/;  
		return executeExp(pattern, strValue);
	}

	/**
	* 判断是否为英文、数字、字母或_
	* @param strValue 校验的值
	* @returns {boolean}
	*/
	function isEnNumeric(strValue)
	{
		var pattern = /^[_0-9a-zA-Z]+$/;  
		return executeExp(pattern, strValue);
	}

	/**
	 * 判断是否为中文
	 * @param strValue 校验的值
	 * @returns {boolean}
	 */
	function isCnAndEn(strValue)
	{
		if (isEmpty(strValue))
			return false;
		
		var pattern = /^[\u4E00-\u9FA5]+$/;
		
		return executeExp(pattern, strValue);
	}

	/**
	 * /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
	 * 判断是否是正确的Email
	 * @param strValue 校验的值
	 * @returns {boolean}
	 */
	function isEmail(strValue)
	{
		if(isEmpty(strValue))
			return false;
	    var pattern = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	    return executeExp(pattern, strValue);
	}

	/**
	 * 判断是否是货币
	 * @param strValue 校验的值
	 * @returns {boolean}
	 */
	function isMoney(strValue)
	{
		if(isEmpty(strValue))
			return false;
		var pattern = /^[+-]?\d+(,\d{3})*(\.\d+)?$/;
	    return executeExp(pattern, strValue);
	}

	/**
	 * 判断是否为数字
	 * @param strValue 校验的值
	 * @returns {boolean}
	 */
	function isNumeric(strValue)
	{
		if (isEmpty(strValue))
			return false;
		var pattern = /^[0-9]*$/;
	    return executeExp(pattern, strValue);
	}

	/**
	 * 判断是否为浮点数（不带正负号）
	 * @param strValue 校验的值
	 * @returns {boolean}
	 */
	function isNumberFloat(strValue)
	{
		if (isEmpty(strValue)) 
			return false;
		var pattern = /^\d+(\.\d+)?$/;
	    return executeExp(pattern, strValue);
	}

	/**
	 * 判断是否为手机号码
	 * @param strValue 校验的值
	 * @returns {boolean}
	 */
	function isMobile(strValue)
	{
		if (isEmpty(strValue))
			return false;
		var pattern = /^(13|14|15|17|18)[0-9]{9}$/;
	    return executeExp(pattern, strValue);
	}

	/**
	 * 判断是否为固话
	 * @param strValue 校验的值
	 * @returns {boolean}
	 */
	function isTel(strValue)
	{
		if (isEmpty(strValue)) 
			return false;
		var pattern = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
	    return executeExp(pattern, strValue );
	}

	/**
	 * 判断是否为电话
	 * @param strValue 校验的值
	 * @returns {boolean}
	 */
	function isPhone(strValue)
	{
		if (isEmpty(strValue)) 
			return false;
		var pattern = /(^\(\d{3,5}\)\d{6,8}(-\d{2,8})?$)|(^\d+-\d+$)|(^(13|14|15|17|18)[0-9]{9}$)/;
	    return executeExp(pattern, strValue );
	}

	/**
	 * 判断是否为邮政编码
	 * @param strValue 校验的值
	 * @returns {boolean}
	 */
	function isPostalCode(strValue)
	{
		if (isEmpty(strValue)) 
			return false;
		var pattern = /(^\d{6}$)/;
	   	return executeExp(pattern, strValue);
	}

	/**
	 * 判断是否为合法的URL
	 * @param strValue 校验的值
	 * @returns {boolean}
	 */
	function isURL(strValue)
	{
		if (isEmpty(strValue)) 
			return false;
	    var pattern = /^(http|https|ftp):\/\/(\w+\.)+[a-z]{2,3}(\/\w+)*(\/\w+\.\w+)*(\?\w+=\w*(&\w+=\w*)*)*/;
	    return executeExp(pattern, strValue);
	}

	function strToInt(strValue)
	{
		while (strValue.length > 1 && strValue.substring(0, 1) == "0") {
			strValue = strValue.substring(1, strValue.length);
		}
		return parseInt(strValue);
	}
	
	/**
	 * 验证身份证的有效性
	 * @param strValueo 身份证ID
	 * @returns {boolean}
	 */
	function isCardID(strValue)
	{
		if(isEmpty(strValue)){
			return false;	
		}
		strValue = strValue.toUpperCase();
		var vcity = { 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
				21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",
				33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
				42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",
				51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
				63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
		//校验长度，类型,身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
		var pattern = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
		if(executeExp(pattern, strValue) === false){
			return false;
		}
		//检查省份
		var province = strValue.substr(0,2);
		if(vcity[province] == undefined){
		    return false;
		}
		//校验生日
		var len = strValue.length;
		//身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
		if(len == 15){
			var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
			var arr_data = strValue.match(re_fifteen);
			var year = strToInt('19' + arr_data[2]);
			var month = strToInt(arr_data[3]);
			var day = strToInt(arr_data[4]);
			var birthday = new Date('19'+year+'/'+month+'/'+day);
			//var birthday = new Date();
			birthday.setFullYear(year);
			birthday.setMonth(month - 1);
			birthday.setDate(day);
			var now = new Date();
			var now_year = now.getFullYear();
			//年月日是否合理
			if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day){
				//判断年份的范围（3岁到100岁之间)
				var time = now_year - year;
				if(!(time >= 3 && time <= 100)){
					return false;
				}
			}else{
				return false;
			}
		}
		//身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
		if(len == 18){
			var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
			var arr_data = strValue.match(re_eighteen);
			var year = strToInt(arr_data[2]);
			var month = strToInt(arr_data[3]);
			var day = strToInt(arr_data[4]);
			var birthday = new Date(year+'/'+month+'/'+day);
			//var birthday = new Date();
			birthday.setFullYear(year);
			birthday.setMonth(month - 1);
			birthday.setDate(day);
			var now = new Date();
			var now_year = now.getFullYear();
			//年月日是否合理
			if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day){
				//判断年份的范围（3岁到100岁之间)
				var time = now_year - year;
				if(!(time >= 3 && time <= 100)){
					return false;
				}
			}else{
				return false;
			}
		}
		//检验位的检测
		//15位转18位
		if(strValue.length == 15){
		   var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
		   var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
		   var cardTemp = 0, i;
		   strValue = strValue.substr(0, 6) + '19' + strValue.substr(6, strValue.length - 6);
		   for(i = 0; i < 17; i ++){
			   cardTemp += strValue.substr(i, 1) * arrInt[i];
		   }
		   strValue += arrCh[cardTemp % 11];
		}
		if(strValue.length == 18){
		    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
		    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
		    var cardTemp = 0, i, valnum;
		    for(i = 0; i < 17; i ++){
		    	cardTemp += parseInt(strValue.substr(i, 1)) * arrInt[i];
		    }
		    valnum = arrCh[cardTemp % 11];
		    if (!(valnum == strValue.substr(17, 1))){
		       return false;
		    }
		}
		return true;
	}

	//直接扩展在jquery上
	jQuery.fn.extend({
		checkValid:function(strDescription, strType)
		{
			var strValue = $(this).val();
			var strMsg = "";
			if(this.length > 0)
			{
				switch(strType)
				{
					case "NotEmpty":     // 不许空值
						if(isEmpty(strValue))
							strMsg = '【' + strDescription + '】 不能为空！\n';
					break;
					case "Date":         //判断是否是日期
						if(!isDate(strValue))
							strMsg = '【' + strDescription + '】 格式错误，请输入正确的日期格式！\n';
					break;
					case "AlphaNumeric": //字母数字
						if (!isAlphaNumeric(strValue))
							strMsg = '【' + strDescription + '】 格式错误，请输入字母或数字！\n';
					break;
					case "Email":        // 电子邮件
						if (!isEmail(strValue))
							strMsg = '【' + strDescription + '】 格式错误，请输入正确的邮件格式！\n';
					break;
					case "Money":        //货币
						if (!isMoney(strValue))
							strMsg = '【' + strDescription + '】 格式错误，请输入正确的货币格式！\n';
					break;
					case "Numeric":      //数字
						if (!isNumeric(strValue))
							strMsg = '【' + strDescription + '】 格式错误，请输入数字！\n';
					break;
					case "NumberFloat":  //浮点数
						if (!isNumberFloat(strValue))
							strMsg = '【' + strDescription + '】 格式错误，请输入浮点数！\n';
					break;
					case "Mobile":       // 手机号码
						if (!isMobile(strValue))
							strMsg = '【' + strDescription + '】 格式错误，请输入正确的手机号码！\n';
					break;
					case "Phone":       // 电话
						if (!isPhone(strValue))
							strMsg = '【' + strDescription + '】 格式错误，请输入正确的电话格式！\n';
					break;
					case "Tel":       // 固话
						if (!isTel(strValue))
							strMsg = '【' + strDescription + '】 格式错误，请输入正确的电话格式！\n';
					break;
					case "PostalCode":   // 邮政编码
						if (!isPostalCode(strValue))
							strMsg = '【' + strDescription + '】 格式错误，请输入6位数字！\n';
					break;
					case "URL":         //URL
						if (!isURL(strValue))
							strMsg = '【' + strDescription + '】 格式错误，请输入正确的URL格式！\n';
					break;
					case "CardID":     //身份证号
						if (!isCardID(strValue))
							strMsg = '【' + strDescription + '】 格式错误，请输入正确的身份证号码！\n';
					break;
					default:           //其他
						strMsg = '错误的 【' + strDescription + '】 类型 "' + strType + '" 不能识别！\n';
					break;
				}
			}
			else
			{
				 strMsg = '【' + strDescription + "】 对象不存在！\n";
			}
			return strMsg;
		}
	});
	
	/**
	 * 页面上公用校验是否为空的处理函数
	 * @param checkFiledEle 校验的元素
	 * @param tips 提示语
	 * @returns {boolean}
	 */
	function commonCheckEmpty(checkFiledEle, tips) 
	{
		var layerUtils = require("layerUtils"),
			checkFiledValue =  checkFiledEle.val();
		if(isEmpty(checkFiledValue)) {
			layerUtils.iTips(tips, checkFiledEle);
			return false;
		} else {
			layerUtils.iTipsClose();
			return true;
		}
	}
	
	/**
	 * 功能:判断是否为银行卡号(银行卡号Luhm校验)
	 *      Luhm校验规则：16位银行卡号（19位通用）:
		    1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
		    2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
		    3.将加法和加上校验位能被 10 整除。
	 * @param strValue 需要检验的银行卡字符串
	 * @returns {boolean}
	 */
	function isBankCode(strValue)
	{
		strValue = $.trim(strValue);
		if(!isNumeric(strValue)){
			return false;
		}
		var length = strValue.length;
		if (length < 12) {
			return false;
		}else if (length > 19 || length == 18) {
			return true;
		}
		var flag = true;
		var iRet = 0,i = 0,mark = 0,temp = 0;
		while(i < (length - 1)){
			mark += parseInt(strValue.charAt(i));
		    i ++;
		    temp = parseInt(strValue.charAt(i)) * 2;
		    i ++;
		    mark = Math.floor(temp / 10) + temp % 10;
		}
		if(mark % 10 == 0){
			flag = true;
		}else{
			flag = parseInt(strValue.charAt(length - 1)) == (10 - mark % 10);
		}
		if(!flag){
			//开头6位
			var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,63,64,65,68,69,84,87,88,90,91,92,93,94,95,96,97,98,99";
			if (strBin.indexOf(strValue.substring(0, 2)) == -1) {
				return false;
			}
			var lastNum = strValue.substr(strValue.length - 1, 1);    //取出最后一位（与luhm进行比较）
			var first15Num = strValue.substr(0, strValue.length - 1); //前15或18位
			var newArr = [];
			for ( var i = first15Num.length - 1; i > -1; i --) { //前15或18位倒序存进数组
				newArr.push(first15Num.substr(i, 1));
			}
			var arrJiShu = []; //奇数位*2的积 <9
			var arrJiShu2 = []; //奇数位*2的积 >9
			var arrOuShu = []; //偶数位数组
			for ( var j = 0; j < newArr.length; j++) {
				if ((j + 1) % 2 == 1) {//奇数位
					if (parseInt(newArr[j]) * 2 < 9)
						arrJiShu.push(parseInt(newArr[j]) * 2);
					else
						arrJiShu2.push(parseInt(newArr[j]) * 2);
				} else
					//偶数位
					arrOuShu.push(newArr[j]);
			}
			var jishu_child1 = [];//奇数位*2 >9 的分割之后的数组个位数
			var jishu_child2 = [];//奇数位*2 >9 的分割之后的数组十位数
			for ( var h = 0; h < arrJiShu2.length; h++) {
				jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
				jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
			}
			var sumJiShu = 0; //奇数位*2 < 9 的数组之和
			var sumOuShu = 0; //偶数位数组之和
			var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
			var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
			var sumTotal = 0;
			for ( var m = 0; m < arrJiShu.length; m++) {
				sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
			}
			for ( var n = 0; n < arrOuShu.length; n++) {
				sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
			}
			for ( var p = 0; p < jishu_child1.length; p++) {
				sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
				sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
			}
			//计算总和
			sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu)
					+ parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);
			//计算Luhm值
			var k = parseInt(sumTotal) % 10 == 0 ? 10
					: parseInt(sumTotal) % 10;
			var luhm = 10 - k;
			flag = (lastNum == luhm || luhm % lastNum == 0 || lastNum % luhm == 0 );
		}
		return flag;
	}
	
	/**
	 * 判断是否为QQ
	 * @param strValue 校验的值
	 * @returns {boolean}
	 */
	function isQq(strValue) 
	{
		if (isEmpty(strValue))
			return false;
		var pattern = /^[1-9]\d{4,9}$/;
		return executeExp(pattern, strValue);
	}
	
	/**
	 * 判断是否是几位小数，比如1.02、1.341、0.3143等格式
	 * @param strValue 校验的值
	 * @param posiNum 表示要校验几位，可不传，默认为2位
	 * @returns {boolean}
	 */
	function isFormatNumber(strValue, posiNum)
	{
		if (isEmpty(strValue))
			return false;
		posiNum = typeof posiNum != "undefined"? posiNum : 2;
		var pattern = new RegExp("^[0-9]+\.[0-9]{"+posiNum+"}$");;
		return pattern.test(strValue);
	}

	var validatorUtil = {
		"executeExp": executeExp,
		"isEmpty": isEmpty,
		"isNotEmpty": isNotEmpty,
		"isDate": isDate,
		"isDateTime": isDateTime,
		"isAlphaNumeric": isAlphaNumeric,
		"isCnAndEnNumeric": isCnAndEnNumeric,
		"isEnNumeric": isEnNumeric,
		"isCnAndEn": isCnAndEn,
		"isEmail": isEmail,
		"isMoney": isMoney,
		"isNumeric": isNumeric,
		"isNumberFloat": isNumberFloat,
		"isMobile": isMobile,
		"isPhone": isPhone,
		"isTel": isTel,
		"isPostalCode": isPostalCode,
		"isURL": isURL,
		"isCardID": isCardID,
		"commonCheckEmpty": commonCheckEmpty,
		"isQq": isQq,
		"isBankCode": isBankCode,
		"isFormatNumber": isFormatNumber
	};
	//暴露对外的接口
	module.exports = validatorUtil;
});