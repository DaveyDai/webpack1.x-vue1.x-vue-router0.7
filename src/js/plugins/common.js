(function(){
	window.iAjaxPost = function(murl, mdata, success, errCallback) {
			var options = {
				type: "POST",
				timeout: 30000,
				url: murl,
				dataType: "json",
				data: mdata||"",
				success: function(e) {
					if(e.status===403){
						window.location.href = "/kaka-supplier/supplier/login.html";
						return;
					}
					console.log(e)
					typeof success === "function"? success(e) : function() {};
				},
				error: function(xhr, type, errorThrown) {
					if(typeof errCallback === "function")errCallback(xhr, type, errorThrown);
				}
			}
			$.ajax(options);
		}
})();
