	//设立"严格模式"的目的
    //1、消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
    //2、消除代码运行的一些不安全之处，保证代码运行的安全；
	//3、提高编译器效率，增加运行速度；
	//4、为未来新版本的Javascript做好铺垫
    "use strict";
    
function logout(){
		
	$.ajax({
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'logout',
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		dataType : 'json',
		success : function(data) {},
		error : function(xhr, textStatus, errorThrown) {
			
			console.log("ajax请求失败,请求:logout,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});
}

$(document).ready(function() {
	
	//collapse的show事件	
	$('#navbar').on('show.bs.collapse', function () {
		
		//获取iframe的父窗口:window.parent.document
		//本地调试js时,Chrome报错【Blocked a frame with origin "null" from accessing a cross-origin frame】,IE不报错
		//Chrome报错的原因:Chrome认为其跨域不安全
		//391(55+8*42):下拉菜单个数为8的高度,307(55+6*42):下拉菜单个数为6的高度
		window.parent.document.getElementById("headerIframe").setAttribute("height","307");
	})
	
	//collapse的hide事件	
	$('#navbar').on('hide.bs.collapse', function () {
		
		window.parent.document.getElementById("headerIframe").setAttribute("height","55");
	})
	
	//dropdown的show事件	
	$('#dropdownAccount').on('show.bs.dropdown', function () {
		window.parent.document.getElementById("headerIframe").setAttribute("height","139");
	})
	
	//dropdown的hide事件	
	$('#dropdownAccount').on('hide.bs.dropdown', function () {
		window.parent.document.getElementById("headerIframe").setAttribute("height","55");
	})
	
	$.ajax({
		
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'querySqsydw',
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		//dataType : 'json',
		success : function(data) {
			
		    //判断变量为有效的字符串
		    //先要确定该变量存在，否则后面的判断会发生错误，还要确定该变量是string数据类型的，
		    //然而，如果该变量是一个String对象，而不是一个直接量，typeof将返回一个'object'数据类型而不是'string'，
		    //这就是为什么要使用valueOf方法，它对所有的javascript对象都可用，不管对象是什么，
		    //都返回其基本值：对于Number，String和布尔类型，返回其原始值；对于函数，是函数文本，
		    //因此，如果该变量是一个String对象，valueOf返回一个字符串直接量，如果该变量已经是一个字符串直接量，
		    //对其应用valueOf方法会临时性地将它封装成一个String对象，这意味着，valueOf仍然将返回一个字符串直接量，
		    //最终，只用测量该字符串长度是否大于0了
			if((typeof data!='undefined')&&(typeof data.valueOf()=='string')&&(data.length>0)){
								
				document.getElementById("hrefSCSYDW").innerHTML = data;
			}else{
				document.getElementById("hrefSCSYDW").innerHTML = "未授权";
			}
		},
		error : function(xhr, textStatus, errorThrown) {
			console.log("ajax请求失败,请求:querySqsydw,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});
	
	//读取session中suppliesmanageweb.account的值
	$.ajax({
		
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'querySessionAccount',
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		//dataType : 'json',
		success : function(data) {
			
		    //判断变量为有效的字符串
		    //先要确定该变量存在，否则后面的判断会发生错误，还要确定该变量是string数据类型的，
		    //然而，如果该变量是一个String对象，而不是一个直接量，typeof将返回一个'object'数据类型而不是'string'，
		    //这就是为什么要使用valueOf方法，它对所有的javascript对象都可用，不管对象是什么，
		    //都返回其基本值：对于Number，String和布尔类型，返回其原始值；对于函数，是函数文本，
		    //因此，如果该变量是一个String对象，valueOf返回一个字符串直接量，如果该变量已经是一个字符串直接量，
		    //对其应用valueOf方法会临时性地将它封装成一个String对象，这意味着，valueOf仍然将返回一个字符串直接量，
		    //最终，只用测量该字符串长度是否大于0了
			if((typeof data!='undefined')&&(typeof data.valueOf()=='string')&&(data.length>0)){
								
				//存在帐号cookie的情况下,显示帐号信息
				document.getElementById("hrefAccount").innerHTML = data+' <span class="caret"></span>';
				document.getElementById("hrefAccount").setAttribute("href","#");//#表示当前页,且不会刷新页面。#后面跟任意字符效果一样 
				document.getElementById("hrefAccount").setAttribute("class","dropdown-toggle");
				document.getElementById("hrefAccount").setAttribute("data-toggle","dropdown");
				document.getElementById("hrefAccount").setAttribute("role","button");
				document.getElementById("hrefAccount").setAttribute("aria-haspopup","true");
				document.getElementById("hrefAccount").setAttribute("aria-expanded","false");
				$('#hrefAccount').parent('li').attr('class', 'dropdown');
				//<a>href、onclick属性同时存在,onclick执行完成后再进行href跳转--正是我所需要的效果:)
				$('#hrefAccount').parent('li').append('<ul class="dropdown-menu"><li><a href="../index.html" onclick="logout()">注销</a></li><li role="separator" class="divider"></li><li><a href="modifyPwd.html">修改密码</a></li></ul>');
			}else{
				document.getElementById("hrefAccount").innerHTML = "登录";
				document.getElementById("hrefAccount").setAttribute("href","login.html");
				document.getElementById("hrefAccount").removeAttribute("class");
				document.getElementById("hrefAccount").removeAttribute("data-toggle");
				document.getElementById("hrefAccount").removeAttribute("role");
				document.getElementById("hrefAccount").removeAttribute("aria-haspopup");
				document.getElementById("hrefAccount").removeAttribute("aria-expanded");
				$('#hrefAccount').parent('li').removeAttr('class');
				$('#hrefAccount').parent('li').children('ul').remove();
			}
		},
		error : function(xhr, textStatus, errorThrown) {
			console.log("ajax请求失败,请求:querySessionAccount,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});
	
	//读取WebSocket服务端-新结果提醒的URL
	$.ajax({
		
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'queryWebSocketNewValueUrl',
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		//dataType : 'json',
		success : function(data) {
			
		    //判断变量为有效的字符串
		    //先要确定该变量存在，否则后面的判断会发生错误，还要确定该变量是string数据类型的，
		    //然而，如果该变量是一个String对象，而不是一个直接量，typeof将返回一个'object'数据类型而不是'string'，
		    //这就是为什么要使用valueOf方法，它对所有的javascript对象都可用，不管对象是什么，
		    //都返回其基本值：对于Number，String和布尔类型，返回其原始值；对于函数，是函数文本，
		    //因此，如果该变量是一个String对象，valueOf返回一个字符串直接量，如果该变量已经是一个字符串直接量，
		    //对其应用valueOf方法会临时性地将它封装成一个String对象，这意味着，valueOf仍然将返回一个字符串直接量，
		    //最终，只用测量该字符串长度是否大于0了
			if((typeof data!='undefined')&&(typeof data.valueOf()=='string')&&(data.length>0)){
				
	        	//localStorage.setItem("ScheduleWebSocketAddr", data);
				//WebSocket begin
				//判断浏览器是否支持WebSocket
				if (!!window.WebSocket && window.WebSocket.prototype.send){
				    var wsNewValue = new WebSocket(data+"/websocket/receiptAuditNum");
				}else{
					alert("浏览器不支持WebSocket");
				}
				 
				//连接发生错误的回调方法
				wsNewValue.onerror = function(){
					alert('WebSocket onerror事件');
				};
				  
				//连接成功建立的回调方法
				wsNewValue.onopen = function(event){
				    console.log("WebSocket onopen事件")
				}

				//接收到消息的回调方法
				wsNewValue.onmessage = function(event){
					
					document.querySelector("span[class='badge']").innerHTML = event.data === "0" ? "" : event.data;						
				}
				  
				//连接关闭的回调方法
				wsNewValue.onclose = function(){
					console.log('WebSocket onclose事件');
				}
				  
				//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
				window.onbeforeunload = function(){
					wsNewValue.close();
				}			  			  
				//WebSocket end
			}
		},
		error : function(xhr, textStatus, errorThrown) {
			console.log("ajax请求失败,请求:queryWebSocketNewValueUrl,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});
});