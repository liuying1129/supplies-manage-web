package com.yklis.suppliesmanageweb.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yklis.suppliesmanage.inf.SuppliesManageService;

@RestController
@RequestMapping("/") 
public class HomeController {
	
    private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired//XML配置方式
	//@com.alibaba.dubbo.config.annotation.Reference//注解配置方式
	private SuppliesManageService suppliesManageService;

	
    //该请求默认跳转到欢迎页。用该Ctroller重定向
    //@RequestMapping("/")
    //public String abc(HttpServletRequest request) {
    	
    //	return "index";
    //}
	
	/**
	 * 耗材入库界面列表，默认展示未审核的入库单
	 * 
	 */ 
    @RequestMapping("static/queryNoAuditReceiptList")
    public String queryNoAuditReceiptList() {
    	
    	return suppliesManageService.queryNoAuditReceiptList();
    }
    
    @RequestMapping("static/deleteReceipt")
    public String deleteReceipt(HttpServletRequest request,HttpServletResponse response) {
    	
    	String unid = request.getParameter("unid");
    	    	    	 
    	return suppliesManageService.deleteReceipt(unid);
    }   
}
