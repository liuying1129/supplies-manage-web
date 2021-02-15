	//设立"严格模式"的目的
    //1、消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
    //2、消除代码运行的一些不安全之处，保证代码运行的安全；
	//3、提高编译器效率，增加运行速度；
	//4、为未来新版本的Javascript做好铺垫
    "use strict";
    
function audit(unid,ifAudit){
	
	if(ifAudit===1)return;//表示已审核
	
	if(!window.confirm('审核后生成库存,确认吗?'))return;

	$.ajax({
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'api/audit?unid='+unid,
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		dataType : 'json',
		success : function(data) {			
			
			if(!data.success){
				alert('操作失败!');
			}
			location.reload();//刷新页面
		},
		error : function(xhr, textStatus, errorThrown) {
			
			console.log("ajax请求失败,请求:audit,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});
}

window.onunload = function(){
	//保存用户的选择//该方法对IE无效
	//var f = document.getElementById('frmQuery');
	//localStorage.setItem("check_date", f['checkDate'].value);//检查日期
	//localStorage.setItem("printtimes", f['printtimes'].value);//打印状态
	
	//保存用户的选择begin
	//入库日期
	var radiosRkrq = document.getElementsByName("rkrq");
    for (var i = 0; i < radiosRkrq.length; i++) {
        if(radiosRkrq[i].checked){
        	localStorage.setItem("rkrq", radiosRkrq[i].value);
        }
    }    
	//保存用户的选择end
};

function queryReceiptList(rkrqRadioValue){
	
	$.ajax({
		//默认值: true。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
		async : true,
		//默认值:"GET".请求方式 ("POST"或 "GET")，注意：其它 HTTP请求方法，如 PUT和 DELETE也可以使用，但仅部分浏览器支持
		type : 'POST',
		//默认值: "application/x-www-form-urlencoded"。发送信息至服务器时内容编码类型
		//默认值适合大多数情况。如果你明确指定$.ajax()的 content-type,那么它必定会发送给服务器（即使没有数据要发送）
		//contentType : "application/x-www-form-urlencoded",//application/json
		url : 'api/queryReceiptList?rkrq='+rkrqRadioValue,
		//预期服务器返回的数据类型。如果不指定，jQuery将自动根据 HTTP包 MIME信息来智能判断
		dataType : 'json',
		success : function(data) {			
			
			$('#receiptList').bootstrapTable('load', data.response);
			
			$('#receiptList').bootstrapTable({
				
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
			        field: 'Memo',
			        title: '备注'
			    }, {
			        field: 'Create_Date_Time',
			        title: '创建时间'
			    }, {
			        field: 'Audit_Date',
			        formatter: function formatter(value, row, index, field) {
			        	
			        	var ifAudit=1;//审核状态,0-未审核,1-已审核
			        	if(typeof row.Audit_Date == 'undefined') ifAudit=0;
			        	
			        	return "<img src='../images/audit.png' alt='审核' class='hvr-grow' onclick='audit("+row.Unid+","+ifAudit+")' title='入库审核' />";
			        }
			    }, {
			        field: 'Auditer',
			        title: '审核者'
			    }, {
			        field: 'Audit_Date',
			        title: '审核时间'
			    }, {
			        field: 'Unid',
			        title: 'Unid'
			    }]
			});						
		},
		error : function(xhr, textStatus, errorThrown) {
			
			console.log("ajax请求失败,请求:queryReceiptList,状态码:"+xhr.status +",状态说明:"+ textStatus+",xhr readyState:"+xhr.readyState);
		}
	});
}
    
$(document).ready(function() {
	
	//登录校验
	if(loginCheck() == false){return;}
	
	//读取用户的选择begin	
	//入库日期
	var radiosRkrq = document.getElementsByName("rkrq");
    for (var i = 0; i < radiosRkrq.length; i++) {
    	radiosRkrq[i].checked = false;
        if (radiosRkrq[i].value == localStorage.getItem("rkrq")) {
        	radiosRkrq[i].checked = true;
        }
    }
    //读取用户的选择end
    
    var int_rkrq = 0;
    for (var i = 0; i < radiosRkrq.length; i++) {
        if(radiosRkrq[i].checked){
        	int_rkrq = radiosRkrq[i].value;
        }
    }
    
    queryReceiptList(int_rkrq);
});    