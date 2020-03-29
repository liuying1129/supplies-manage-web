package com.yklis.suppliesmanageweb.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.alibaba.fastjson.JSON;
import com.yklis.suppliesmanage.entity.ReceiptEntity;
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
    
    @RequestMapping("static/saveReceipt")
    public String saveReceipt(HttpServletRequest request,HttpServletResponse response) {
    	  	
    	String unid = request.getParameter("unid");
    	String sjunid = request.getParameter("sjunid");
    	String vendor = request.getParameter("vendor");
    	String djh = request.getParameter("djh");
    	String ph = request.getParameter("ph");
    	String yxq = request.getParameter("yxq");
    	String sl = request.getParameter("sl");
    	String dw = request.getParameter("dw");
    	String rkrq = request.getParameter("rkrq");
    	String memo = request.getParameter("memo");
    	
    	DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    	
    	ReceiptEntity receiptEntity = new ReceiptEntity();
    	receiptEntity.setSjunid(Integer.parseInt(sjunid));
    	receiptEntity.setVendor(vendor);
    	receiptEntity.setDjh(djh);
    	receiptEntity.setPh(ph);
    	receiptEntity.setMemo(memo);
    	
    	LocalDate dateYxq = null;
    	try {
    		dateYxq = LocalDate.parse(yxq,dateTimeFormatter);
        	receiptEntity.setYxq(dateYxq);
    	} catch (DateTimeParseException e) {
        	receiptEntity.setYxq(null);
    	}
    	
    	receiptEntity.setSl(Integer.parseInt(sl));
    	receiptEntity.setDw(dw);
    	
    	LocalDate dateRkrq = null;
    	try {
    		dateRkrq = LocalDate.parse(rkrq,dateTimeFormatter);
        	receiptEntity.setRkrq(dateRkrq);
    	} catch (DateTimeParseException e) {
        	receiptEntity.setRkrq(null);
    	}
    	    	    	 
    	if((unid==null)||("".equals(unid))){
    		
    		return suppliesManageService.insertReceipt(receiptEntity);
    	}else {
        	receiptEntity.setUnid(Integer.parseInt(unid));
    		return suppliesManageService.updateReceipt(receiptEntity);
    	}
    }
    
    @RequestMapping("static/loadSJ_JBXX")
    public String loadSJ_JBXX(HttpServletRequest request,HttpServletResponse response) {
    	    	    	    	 
    	return suppliesManageService.loadSJ_JBXX();
    }
    
    @RequestMapping("static/loadSJ_Pack")
    public String loadSJ_Pack(HttpServletRequest request,HttpServletResponse response) {
    	    	    	    	 
    	String sjunid = request.getParameter("sjunid");
    	
    	return suppliesManageService.loadSJ_Pack(sjunid);
    }
    
    @RequestMapping("static/queryReceiptList")
    public String queryReceiptList(HttpServletRequest request,HttpServletResponse response) {
    	    	    	    	     	
    	String rkrqRadioValue = request.getParameter("rkrq");
    	
    	return suppliesManageService.queryReceiptList(rkrqRadioValue);
    }
    
    @RequestMapping("static/audit")
    public String audit(HttpServletRequest request,HttpServletResponse response) {
    	    	    	    	     	
    	String unid = request.getParameter("unid");
    	return suppliesManageService.audit(unid);
    }
    
    @RequestMapping("static/queryInventoryList")
    public String queryInventoryList(HttpServletRequest request,HttpServletResponse response) {
    	    	    	    	     	
    	return suppliesManageService.queryInventoryList();
    }
    
    @RequestMapping("static/outputInventory")
    public String outputInventory(HttpServletRequest request,HttpServletResponse response) {
    	    	    	    	     	
    	String unid = request.getParameter("unid");
    	String rlr = request.getParameter("rlr");
        int sl = 0;
        try{
        	sl = Integer.parseInt(request.getParameter("sl"));
        }catch(Exception e){
        	
            logger.error("出库数量转换为整数失败");
            
            Map<String, Object> mapResponse = new HashMap<>();
            mapResponse.put("errorCode", -123);
            mapResponse.put("errorMsg", "出库数量转换为整数失败!");
            
            Map<String, Object> map = new HashMap<>();
            map.put("success", false);
            map.put("response", mapResponse);
            
            return JSON.toJSONString(map);
        }
    	String dw = request.getParameter("dw");
    	String ckrq = request.getParameter("ckrq");
    	String memo = request.getParameter("memo");
    	    	
    	return suppliesManageService.outputInventory(unid, rlr, sl, dw, ckrq, memo);
    }
    
    @RequestMapping("static/queryOutputList")
    public String queryOutputList(HttpServletRequest request,HttpServletResponse response) {
    	    	    	    	     	
    	return suppliesManageService.queryOutputList();
    }
    
    @RequestMapping(value = "static/querySqsydw")
    public String querySqsydw() {
                
    	return suppliesManageService.querySqsydw();
    }
    
    @RequestMapping(value = "static/login" )
    public String login(HttpServletRequest request,
            HttpServletResponse response,
            //如required设置为true,则地址栏中访问http://localhost:8080/YkLis/login时,因校验不通过,页面报错
            @RequestParam(value = "account",required = false) String account,
            @RequestParam(value = "password",required = false) String password,
            @CookieValue(value = "suppliesmanageweb.request",required = false) String cookieRequest) {
    	    	    	    	
    	//获取生成的验证码
    	//String verifyCodeExpected = (String)request.getSession().getAttribute(com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY);
          
        //获取用户输入的验证码
    	//String verifyCodeActual = request.getParameter("captcha");
    	
    	//验证码校验
        /*if(verifyCodeActual == null ||!verifyCodeActual.equals(verifyCodeExpected)) {
        	
            Map<String, Object> modelMap = new HashMap<>();
            modelMap.put("msg", "验证码错误");
            
            return new ModelAndView("login", modelMap);
        }*/        
        		
    	if(!suppliesManageService.login(account, password)) {
    		
            Map<String, Object> mapResponse = new HashMap<>();
            mapResponse.put("errorCode", -123);
            mapResponse.put("errorMsg", "用户或密码错误!");
            
            Map<String, Object> map = new HashMap<>();
            map.put("success", false);
            map.put("response", mapResponse);
            
            return JSON.toJSONString(map);
        }
    	
		//登录成功,创建会话
		//true:若存在会话则返回该会话,否则新建一个会话
		//false:若存在会话则返回该会话,否则返回NULL
		HttpSession session = request.getSession(true);//参数默认值:true
        //该session值用于header.jsp中显示
        session.setAttribute("suppliesmanageweb.account", account);
        //该session值用于标识是否成功登录
        session.setAttribute("suppliesmanageweb.isLogin", true);
		
        logger.info("cookieRequest的值:"+cookieRequest);
        
        if("".equals(cookieRequest)||(null==cookieRequest)){
            
            Map<String, Object> mapResponse = new HashMap<>();
            mapResponse.put("id", -1);
            mapResponse.put("msg", "../index.html");
            
            Map<String, Object> map = new HashMap<>();
            map.put("success", true);
            map.put("response", mapResponse);
            
            return JSON.toJSONString(map);
        }else{
            
            Cookie cookie2 = new Cookie("suppliesmanageweb.request",null);
            cookie2.setMaxAge(0);
            response.addCookie(cookie2);
            
            logger.info("suppliesmanageweb.request值："+cookieRequest);
            String str1 = cookieRequest;//.replace("/static", "");// .replace(request.getContextPath()+"/","");
                        
            Map<String, Object> mapResponse = new HashMap<>();
            mapResponse.put("id", -1);
            mapResponse.put("msg", str1);
            
            Map<String, Object> map = new HashMap<>();
            map.put("success", true);
            map.put("response", mapResponse);
            
            return JSON.toJSONString(map);
        }    	
    }
    
    @RequestMapping("static/querySessionAccount")
    public String querySessionAccount(HttpServletRequest request) {
        
        String s2 = null;
        
        HttpSession session = request.getSession(false);
        if(null!=session){
            s2 = (String) session.getAttribute("suppliesmanageweb.account");
        }                
        
        return s2;
    }
    
    @RequestMapping("static/logout")
    public void logout(HttpServletRequest request,HttpServletResponse response) {
    	
        HttpSession session = request.getSession(false);//参数默认值:true
        if(null!=session){
            session.invalidate();
        }

        Cookie cookie2 = new Cookie("suppliesmanageweb.request",null);
        cookie2.setMaxAge(0);
        response.addCookie(cookie2);
    	
        try {
			response.sendRedirect("/index.html");
		} catch (IOException e) {
			
            logger.error("方法logout的response.sendRedirect失败:"+e.toString());
		}
    }
}
