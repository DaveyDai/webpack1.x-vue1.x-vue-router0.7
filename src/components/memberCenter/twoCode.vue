<template>
	<div id="twoCode" style="position: relative;">
		<section class="main fixed">
			<article class="content">
				<div class="two-code">
					<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhAQMAAAAEfUA5AAAABlBMVEX///8AAABVwtN+AAAA9ElEQVRYhe2XuxGEMAxE10NASAmUQmlHaZRCCYQEDDrJFtgccA2sN/HnOdqxVjZQVfWqQZJG9LI2O3y5k9I5DkrRRTrasqGlnTmTNuMxdW+lp4MsrU8q1TqqNNeRebXhrcpY6JGxatqfBCahp5y+iIVq2wWKOpKpX2ipp0rpVTrGSSU6o6WTG3EnGzipOoNGBJ9J32buHrLYKNAeGSup4/SXjGWjSdZ6tiCWKpJvDhk9+69dIQS9QlpQK1jpHAf/09m5qcwcOlr+6YI799OPCGl6llxFS7Wgjkfag1c0NA7Wcfwrp5P2VmUs9JKxN6/IaFXVo74355BB7lG22gAAAABJRU5ErkJggg==">
					<div>请出示给工作人员扫一扫哦！</div>
				</div>
			</article>	
		</section>
	</div>
</template>
<style>
	.two-code{
	    background-color: #fff;
	    margin: 10px;
	    padding: 10px 6%;
	    text-align: center;
	    font-size: 1rem;
	    font-weight: 600;
	    color: #333;		
	}
	.two-code > img{
		width: 100%;
	}
</style>
<script type="text/javascript">
    export default {
        data: function(){
        	return {
        	}
        },    	
        ready: function () {
	      	console.log("加载首页...");
        },
        methods: {
            backPage: function () {
            	layerUtils.iAlert("正在开发，敬请期待...");
//              if (window.history && window.history.pushState) {
//                  window.history.back();
//              }
           }
        }
    }
</script>
