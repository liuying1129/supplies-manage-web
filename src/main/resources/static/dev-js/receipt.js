	//设立"严格模式"的目的
    //1、消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
    //2、消除代码运行的一些不安全之处，保证代码运行的安全；
	//3、提高编译器效率，增加运行速度；
	//4、为未来新版本的Javascript做好铺垫
    "use strict";
    
  
var global_dw;//全局变量

function deleteReceipt(unid){
	
	if(!window.confirm('确定要删除该入库记录吗?'))return;
		
	$.ajax({
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'deleteReceipt?unid='+unid,
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		dataType : 'json',
		success : function(data) {			
			
			if(!data.success){
				alert('操作失败!');
			}
		},
		error : function(xhr, textStatus, errorThrown) {
			
			console.log("ajax请求失败,请求:deleteReceipt,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});
}

function loadSJ_Pack(sjunid,dw){

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
}

$(document).ready(function() {
		
	//Select2初始化,参数是一个对象
	$('#sjunid').select2({
		dropdownParent: $("#receiptModal"),//bootstrap modal中使用必须加这句
		placeholder: '耗材唯一编号'//仅对单选类型有效,为了使占位符值出现,SELECT的第一个<option>必须是一个空白的<option>
	});
	
	//Select2初始化,参数是一个对象
	$('#dw').select2({
		dropdownParent: $("#receiptModal"),//bootstrap modal中使用必须加这句
		placeholder: '单位'//仅对单选类型有效,为了使占位符值出现,SELECT的第一个<option>必须是一个空白的<option>
	});

	$.ajax({
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'loadSJ_JBXX',
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		dataType : 'json',
		success : function(data) {
			
			var sjjbxxSelect = $('#sjunid');

			data.response.forEach(function(element,index){
				
				sjjbxxSelect.append(new Option(element.SJId+"【"+element.Name+"】"+element.Model+","+element.GG+","+element.SCCJ+","+element.ApprovalNo,element.Unid));
			});
		},
		error : function(xhr, textStatus, errorThrown) {
			console.log("ajax请求失败,请求:loadSJ_JBXX,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});

	$.ajax({
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'queryNoAuditReceiptList',
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		dataType : 'json',
		success : function(data) {			
			
			$('#noAuditReceiptList').bootstrapTable('load', data.response);
			
			$('#noAuditReceiptList').bootstrapTable({
				
			    data: data.response,
		        columns: [{
			        field: 'Name',
			        title: '名称',
			        formatter: function formatter(value, row, index, field) {
			        	
			        	return "<a href='#receiptModal' data-toggle='modal' data-title='修改' data-unid='"+row.Unid+"' data-sjunid='"+row.SJUnid+"' data-sjid='"+row.SJID+"' data-name='"+row.Name+"' data-model='"+row.Model+"' data-gg='"+row.GG+"' data-sccj='"+row.SCCJ+"' data-approvalno='"+row.ApprovalNo+"' data-vendor='"+row.Vendor+"' data-djh='"+row.DJH+"' data-ph='"+row.PH+"' data-yxq='"+row.YXQ+"' data-sl='"+row.SL+"' data-dw='"+row.DW+"' data-rkrq='"+row.RKRQ+"'>" + value + "</a>";
			        }
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
			        field: 'Vendor',
			        title: '供应商'
			    }, {
			        field: 'DJH',
			        title: '单据号'
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
			        field: 'Create_Date_Time',
			        title: '创建时间'
			    }, {
			        field: 'Unid',
			        formatter: function formatter(value, row, index, field) {
			        	
			        	//href=''则点击链接后会刷新自身页面
			        	return "<a href='' onclick='deleteReceipt("+value+")'>删除</a>";
			        }
			    }, {
			        field: 'SJUnid',
			        title: '耗材Unid'
			    }, {
			        field: 'Unid',
			        title: 'Unid'
			    }]
			});						
		},
		error : function(xhr, textStatus, errorThrown) {
			
			console.log("ajax请求失败,请求:queryNoAuditReceiptList,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});
	
	//模式窗口的shown事件
	$('#receiptModal').on('shown.bs.modal', function (e) {
		
		var modal_relatedTarget = $(e.relatedTarget);
				
		document.getElementById("receiptModalTitle").innerHTML = modal_relatedTarget.data("title");
		
		global_dw = modal_relatedTarget.data("dw");
				
		//新增时需要typeof判断
		document.getElementById("unid").innerHTML = typeof modal_relatedTarget.data("unid")=="undefined"?"":modal_relatedTarget.data("unid");		
		$('#sjunid').val(modal_relatedTarget.data("sjunid")).trigger("change");
		document.getElementById("vendor").value = typeof modal_relatedTarget.data("vendor")=="undefined"?"":modal_relatedTarget.data("vendor");
		document.getElementById("djh").value = typeof modal_relatedTarget.data("djh")=="undefined"?"":modal_relatedTarget.data("djh");
		document.getElementById("ph").value = typeof modal_relatedTarget.data("ph")=="undefined"?"":modal_relatedTarget.data("ph");
		document.getElementById("yxq").value = (typeof modal_relatedTarget.data("yxq")=="undefined")||(modal_relatedTarget.data("yxq")==="undefined")?"":modal_relatedTarget.data("yxq");
		document.getElementById("sl").value = typeof modal_relatedTarget.data("sl")=="undefined"?"":modal_relatedTarget.data("sl");
		loadSJ_Pack($('#sjunid').val(),global_dw);//加载所选试剂的唯一编号
		document.getElementById("rkrq").value = typeof modal_relatedTarget.data("rkrq")=="undefined"?"":modal_relatedTarget.data("rkrq");
	    //alert(JSON.stringify($('#myModal').data()));
	})
	
	//选择结果时触发
	$('#sjunid').on('select2:select', function (e) {
		
		loadSJ_Pack($('#sjunid').val(),global_dw);//加载所选试剂的唯一编号
	});
});

var btnSave = document.getElementById("btnSave");
btnSave.onclick = function() {
	
	var unid = document.getElementById("unid").innerHTML;
	var sjunid = $('#sjunid').val();
	var vendor =document.getElementById("vendor").value;
	var djh = document.getElementById("djh").value;
	var ph = document.getElementById("ph").value;
	var yxq = document.getElementById("yxq").value;
	var sl = document.getElementById("sl").value;
	var dw = $('#dw').val();
	var rkrq = document.getElementById("rkrq").value;
	
	if(typeof sjunid == "undefined"||sjunid ==null||sjunid.length == 0){
		
		alert("耗材不能为空");
		return;
	}
	if(isNaN(sjunid)){

		alert("请选择合法的耗材!");
		return;
	}
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
	if(typeof rkrq == "undefined"||rkrq ==null||rkrq.length == 0){
		
		alert("入库日期不能为空");
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
		url : 'saveReceipt?unid='+unid+'&sjunid='+sjunid+'&vendor='+vendor+'&djh='+djh+'&ph='+ph+'&yxq='+yxq+'&sl='+sl+'&dw='+dw+'&rkrq='+rkrq,
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		dataType : 'json',
		success : function(data) {			
			
			if(!data.success){
				alert('操作失败!');
			}
			location.reload();//刷新页面
		},
		error : function(xhr, textStatus, errorThrown) {
			
			console.log("ajax请求失败,请求:saveReceipt,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});
};