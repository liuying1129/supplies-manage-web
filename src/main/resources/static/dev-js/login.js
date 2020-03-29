	//设立"严格模式"的目的
    //1、消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
    //2、消除代码运行的一些不安全之处，保证代码运行的安全；
	//3、提高编译器效率，增加运行速度；
	//4、为未来新版本的Javascript做好铺垫
    "use strict";

if(!window.localStorage){
	alert("浏览器不支持localStorage");
}

/*//点击更换验证码实现--kaptcha.jpg请求,由KaptchaServlet生成验证码
var kaptchaImg = document.querySelector('img[alt="验证码"]');
kaptchaImg.onclick = function() {
	kaptchaImg.setAttribute("src","kaptcha.jpg?" + Math.floor(Math.random()*100));
}*/

var btnLogin = document.getElementById("btnLogin");
btnLogin.onclick = function() {
		
	$.ajax({
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'login',
		//serialize()方法将表单内容序列化为字符串(标准 URL编码表示的文本字符串)。操作对象是代表表单元素集合的 jQuery对象。必须给input加name属性
		data : $("#slick-login").serialize(),
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		dataType : 'json',
		success : function(data) {						
						
			if(data.success){
				window.location.href=data.response.msg;
			}else{
				alert(data.response.errorMsg);
			}
		},
		error : function(xhr, textStatus, errorThrown) {
			
			console.log("ajax请求失败,请求:login,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});
};