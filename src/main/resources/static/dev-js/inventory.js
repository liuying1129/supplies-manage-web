	//设立"严格模式"的目的
    //1、消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
    //2、消除代码运行的一些不安全之处，保证代码运行的安全；
	//3、提高编译器效率，增加运行速度；
	//4、为未来新版本的Javascript做好铺垫
    "use strict";     
    
$(document).ready(function() {
	
	$.ajax({
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'queryInventoryList',
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		dataType : 'json',
		success : function(data) {			
			
			$('#inventoryList').bootstrapTable('load', data.response);
			
			$('#inventoryList').bootstrapTable({
				
			    data: data.response,
		        columns: [{
			        field: 'Name',
			        title: '名称'
			    }, {
			        field: 'Model',
			        title: '型号'
			    }, {
			        field: 'GG',
			        title: '规格'
			    }, {
			        field: 'SCCJ',
			        title: '生产厂家'
			    }, {
			        field: 'ApprovalNo',
			        title: '批准文号'
			    }, {
			        field: 'GYS',
			        title: '供应商'
			    }, {
			        field: 'PH',
			        title: '批号'
			    }, {
			        field: 'YXQ',
			        title: '有效期'
			    }, {
			        field: 'SL',
			        title: '数量'
			    }, {
			        field: 'DW',
			        title: '单位'
			    }, {
			        field: 'SHR',
			        title: '收货人'
			    }, {
			        field: 'RKRQ',
			        title: '入库日期'
			    }, {
			        field: 'Memo',
			        title: '备注'
			    }, {
			        field: 'Create_Date_Time',
			        title: '创建时间'
			    }, {
			        field: 'Unid',
			        formatter: function formatter(value, row, index, field) {
			        				        	
			        	return "<img src='../images/outInventory.png' alt='出库' class='hvr-grow' title='出库' data-toggle='modal' data-target='#inventoryModal' data-sjunid='"+row.SJUnid+"' data-dw='"+row.DW+"' data-unid='"+value+"' />";
			        }
			    }, {
			        field: 'Unid',
			        title: 'Unid'
			    }, {
			        field: 'SJUnid',
			        title: '耗材Unid'
			    }, {
			        field: 'RKID',
			        title: 'RKID'
			    }]
			});						
		},
		error : function(xhr, textStatus, errorThrown) {
			
			console.log("ajax请求失败,请求:queryInventoryList,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});
	
	//模式窗口的shown事件
	$('#inventoryModal').on('shown.bs.modal', function (e) {
		
		var modal_relatedTarget = $(e.relatedTarget);
						
		document.getElementById("unid").innerHTML = modal_relatedTarget.data("unid");		
		document.getElementById("ckrq").value = dayjs().format("YYYY-MM-DD");
		
		var sjunid = modal_relatedTarget.data("sjunid");
		var dw = modal_relatedTarget.data("dw");
		
				
		$.ajax({
			//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
			async : true,
			//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
			type : 'POST',
			//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
			//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
			//contentType : "application/x-www-form-urlencoded",//application/json
			url : 'loadSJ_Pack?sjunid='+sjunid,
			//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
			dataType : 'json',
			success : function(data) {
				
				var sjpackSelect = $('#dw');
				sjpackSelect.empty();
					
				data.response.forEach(function(element,index){
					
					sjpackSelect.append(new Option(element.PackName));
				});
				
				$('#dw').val(dw).trigger("change");
			},
			error : function(xhr, textStatus, errorThrown) {
				console.log("ajax请求失败,请求:loadSJ_Pack,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
			}
		});
	})
});

var btnSave = document.getElementById("btnSave");
btnSave.onclick = function() {
	
	var unid = document.getElementById("unid").innerHTML;
	var rlr =document.getElementById("rlr").value;
	var sl = document.getElementById("sl").value;
	var dw = $('#dw').val();
	var ckrq = document.getElementById("ckrq").value;
	var memo =document.getElementById("memo").value;
	
	if(typeof sl == "undefined"||sl ==null||sl.length == 0){
		
		alert("数量不能为空");
		return;
	}
	if(isNaN(sl)){

		alert("请输入合法的数量!");
		return;
	}
	if(typeof dw == "undefined"||dw ==null||dw.length == 0){
		
		alert("单位不能为空");
		return;
	}
	if(typeof ckrq == "undefined"||ckrq ==null||ckrq.length == 0){
		
		alert("出库日期不能为空");
		return;
	}
	if(typeof rlr == "undefined"||rlr ==null||rlr.length == 0){
		
		alert("领料人不能为空");
		return;
	}
		
	$.ajax({
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'outputInventory?unid='+unid+'&rlr='+rlr+'&sl='+sl+'&dw='+dw+'&ckrq='+ckrq+'&memo='+memo,
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		dataType : 'json',
		success : function(data) {			
			
			if(!data.success){
				alert('操作失败!');
			}
			location.reload();//刷新页面
		},
		error : function(xhr, textStatus, errorThrown) {
			
			console.log("ajax请求失败,请求:outputInventory,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});
};