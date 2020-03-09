	//设立"严格模式"的目的
    //1、消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
    //2、消除代码运行的一些不安全之处，保证代码运行的安全；
	//3、提高编译器效率，增加运行速度；
	//4、为未来新版本的Javascript做好铺垫
    "use strict";    

$(document).ready(function() {
	
	//collapse的show事件	
	$('#navbar').on('show.bs.collapse', function () {
		
		//获取iframe的父窗口:window.parent.document
		//本地调试js时,Chrome报错【Blocked a frame with origin "null" from accessing a cross-origin frame】,IE不报错
		//Chrome报错的原因:Chrome认为其跨域不安全
		//391:下拉菜单个数为8的高度
		window.parent.document.getElementById("headerIframe").setAttribute("height","391");
	})
	
	//collapse的hide事件	
	$('#navbar').on('hide.bs.collapse', function () {
		
		window.parent.document.getElementById("headerIframe").setAttribute("height","55");
	})
});
