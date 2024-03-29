package com.yklis.suppliesmanageweb.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.alibaba.fastjson.JSON;
import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.yklis.suppliesmanage.entity.ReceiptEntity;
import com.yklis.suppliesmanage.inf.SuppliesManageService;

@RestController
@RequestMapping("/") 
public class HomeController {
	
    private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired//XML配置方式
	//@com.alibaba.dubbo.config.annotation.Reference//注解配置方式
	private SuppliesManageService suppliesManageService;
	
	@Autowired
	private DefaultKaptcha defaultKaptcha;
	
	
    //该请求默认跳转到欢迎页。用该Ctroller重定向
    //@RequestMapping("/")
    //public String abc(HttpServletRequest request) {
    	
    //	return "index";
    //}
	
	/**
	 * 耗材入库界面列表，默认展示未审核的入库单
	 * 
	 */ 
    @RequestMapping("static/api/queryNoAuditReceiptList")
    public String queryNoAuditReceiptList() {
    	
    	return suppliesManageService.queryNoAuditReceiptList();
    }
    
    @RequestMapping("static/api/deleteReceipt")
    public String deleteReceipt(HttpServletRequest request,HttpServletResponse response) {
    	
    	String unid = request.getParameter("unid");
    	    	    	 
    	return suppliesManageService.deleteReceipt(unid);
    }
    
    @RequestMapping("static/api/saveReceipt")
    public String saveReceipt(HttpServletRequest request,HttpServletResponse response) {
    	  	
    	String unid = request.getParameter("unid");
    	String sjunid = request.getParameter("sjunid");
    	//填坑:https://www.cnblogs.com/xujinlin/p/9177172.html
    	String vendor = request.getParameter("vendor");
    	try {
			vendor = URLDecoder.decode(vendor, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			logger.error("URLDecoder.decode vendor报错:"+e1.toString());
		}
    	String djh = request.getParameter("djh");
    	try {
    		djh = URLDecoder.decode(djh, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			logger.error("URLDecoder.decode djh报错:"+e1.toString());
		}
    	String ph = request.getParameter("ph");
    	try {
    		ph = URLDecoder.decode(ph, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			logger.error("URLDecoder.decode ph报错:"+e1.toString());
		}
    	String yxq = request.getParameter("yxq");
    	String sl = request.getParameter("sl");
    	String dw = request.getParameter("dw");
    	try {
    		dw = URLDecoder.decode(dw, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			logger.error("URLDecoder.decode dw报错:"+e1.toString());
		}
    	String rkrq = request.getParameter("rkrq");
    	String memo = request.getParameter("memo");
    	try {
    		memo = URLDecoder.decode(memo, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			logger.error("URLDecoder.decode memo报错:"+e1.toString());
		}
    	
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
    	receiptEntity.setShr(suppliesManageService.queryUsernameFromUserid(querySessionAccount(request)));
    	
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
    
    @RequestMapping("static/api/loadSJ_JBXX")
    public String loadSJ_JBXX(HttpServletRequest request,HttpServletResponse response) {
    	    	    	    	 
    	return suppliesManageService.loadSJ_JBXX();
    }
    
    @RequestMapping("static/api/loadSJ_Pack")
    public String loadSJ_Pack(HttpServletRequest request,HttpServletResponse response) {
    	    	    	    	 
    	String sjunid = request.getParameter("sjunid");
    	
    	return suppliesManageService.loadSJ_Pack(sjunid);
    }
    
    @RequestMapping("static/api/queryReceiptList")
    public String queryReceiptList(HttpServletRequest request,HttpServletResponse response) {
    	    	    	    	     	
    	String rkrqRadioValue = request.getParameter("rkrq");
    	
    	return suppliesManageService.queryReceiptList(rkrqRadioValue);
    }
    
    @RequestMapping("static/api/audit")
    public String audit(HttpServletRequest request,HttpServletResponse response) {
    	    	    	    	     	
    	String unid = request.getParameter("unid");
    	return suppliesManageService.audit(unid,suppliesManageService.queryUsernameFromUserid(querySessionAccount(request)));
    }
    
    @RequestMapping("static/api/queryInventoryList")
    public String queryInventoryList(HttpServletRequest request,HttpServletResponse response) {
    	    	    	    	     	
    	String hcName = request.getParameter("hcName");
    	String vendor = request.getParameter("vendor");

    	return suppliesManageService.queryInventoryList(hcName,vendor);
    }
    
    @RequestMapping("static/api/outputInventory")
    public String outputInventory(HttpServletRequest request,HttpServletResponse response) {
    	    	    	    	     	
    	String unid = request.getParameter("unid");
    	String rlr = request.getParameter("rlr");
    	try {
    		rlr = URLDecoder.decode(rlr, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			logger.error("URLDecoder.decode rlr报错:"+e1.toString());
		}
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
    	try {
    		dw = URLDecoder.decode(dw, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			logger.error("URLDecoder.decode dw报错:"+e1.toString());
		}
    	String ckrq = request.getParameter("ckrq");
    	String memo = request.getParameter("memo");
    	try {
    		memo = URLDecoder.decode(memo, "UTF-8");
		} catch (UnsupportedEncodingException e1) {
			logger.error("URLDecoder.decode memo报错:"+e1.toString());
		}
    	    	
    	return suppliesManageService.outputInventory(unid, rlr, sl, dw, ckrq, memo,suppliesManageService.queryUsernameFromUserid(querySessionAccount(request)));
    }
    
    @RequestMapping("static/api/queryOutputList")
    public String queryOutputList(HttpServletRequest request,HttpServletResponse response) {
    	   
    	String ckrqRadioValue = request.getParameter("ckrq");

    	return suppliesManageService.queryOutputList(ckrqRadioValue);
    }
    
    @RequestMapping(value = "static/api/querySqsydw")
    public String querySqsydw() {
                
    	return suppliesManageService.querySqsydw();
    }
    
    @RequestMapping(value = "static/api/login" )
    public String login(HttpServletRequest request,
            HttpServletResponse response,
            //如required设置为true,则地址栏中访问http://localhost:8080/YkLis/login时,因校验不通过,页面报错
            @RequestParam(value = "account",required = false) String account,
            @RequestParam(value = "password",required = false) String password) {
    	    	    	    	
    	//获取生成的验证码
    	String verifyCodeExpected = (String)request.getSession().getAttribute(com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY);
          
        //获取用户输入的验证码
    	String verifyCodeActual = request.getParameter("captcha");
    	
    	//验证码校验
        if(verifyCodeActual == null ||!verifyCodeActual.equals(verifyCodeExpected)) {
        	            
            Map<String, Object> mapResponse = new HashMap<>();
            mapResponse.put("errorCode", -123);
            mapResponse.put("errorMsg", "验证码错误!");
            
            Map<String, Object> map = new HashMap<>();
            map.put("success", false);
            map.put("response", mapResponse);
            
            return JSON.toJSONString(map);
        }      
        		
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
        //该session值用于:1、header.html中显示,2、判断是否成功登录
        session.setAttribute("smw.account", account);		
        
        Map<String, Object> mapResponse = new HashMap<>();
        mapResponse.put("id", -1);
        mapResponse.put("msg", "../index.html");
        
        Map<String, Object> map = new HashMap<>();
        map.put("success", true);
        map.put("response", mapResponse);
        
        return JSON.toJSONString(map);
    }
    
    @RequestMapping("static/api/logout")
    public void logout(HttpServletRequest request,HttpServletResponse response) {
    	
        HttpSession session = request.getSession(false);//参数默认值:true
        if(null!=session){
            session.invalidate();
        }

        Cookie cookie2 = new Cookie("smw.request",null);
        cookie2.setMaxAge(0);
        response.addCookie(cookie2);
    	
        /*//前后端分离改造,屏蔽该段
        try {
			response.sendRedirect("/index.html");
		} catch (IOException e) {
			
            logger.error("方法logout的response.sendRedirect失败:"+e.toString());
		}*/
    }
    
    @RequestMapping("static/api/querySessionAccount")
    public String querySessionAccount(HttpServletRequest request) {
        
        String s2 = null;
        
        HttpSession session = request.getSession(false);
        if(null!=session){
            s2 = (String) session.getAttribute("smw.account");
        }                
        
        return s2;
    }
    
	@RequestMapping("static/api/kaptcha.jpg")
	public void defaultKaptcha(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception {
				
		byte[] captchaChallengeAsJpeg = null;
		ByteArrayOutputStream jpegOutputStream = new ByteArrayOutputStream();
		try {
			// 生产验证码字符串并保存到session中
			String createText = defaultKaptcha.createText();
			httpServletRequest.getSession().setAttribute(com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY, createText);
			// 使用生产的验证码字符串返回一个BufferedImage对象并转为byte写入到byte数组中
			BufferedImage challenge = defaultKaptcha.createImage(createText);
			ImageIO.write(challenge, "jpg", jpegOutputStream);
		} catch (IllegalArgumentException e) {
			httpServletResponse.sendError(HttpServletResponse.SC_NOT_FOUND);
			return;
		}

		// 定义response输出类型为image/jpeg类型，使用response输出流输出图片的byte数组
		captchaChallengeAsJpeg = jpegOutputStream.toByteArray();
		httpServletResponse.setHeader("Cache-Control", "no-store");
		httpServletResponse.setHeader("Pragma", "no-cache");
		httpServletResponse.setDateHeader("Expires", 0);
		httpServletResponse.setContentType("image/jpeg");
		ServletOutputStream responseOutputStream = httpServletResponse.getOutputStream();
		responseOutputStream.write(captchaChallengeAsJpeg);
		responseOutputStream.flush();
		responseOutputStream.close();
	}
	
    @RequestMapping(value = "static/api/inventorySplit")
    public String inventorySplit(HttpServletRequest request) {
                
    	String unid = request.getParameter("unid");

    	return suppliesManageService.inventorySplit(unid);
    }
    
    @RequestMapping("static/api/modifyPwd")
    public String modifyPwd(HttpServletRequest request) {
    	
    	String account = querySessionAccount(request);

        String oldPwd = request.getParameter("oldPwd");
        String newPwd = request.getParameter("newPwd");
        String confirmPwd = request.getParameter("confirmPwd");
        
    	if(!suppliesManageService.login(account, oldPwd)) {
    		
            Map<String, Object> mapResponse = new HashMap<>();
            mapResponse.put("errorCode", -123);
            mapResponse.put("errorMsg", "原密码错误!");
            
            Map<String, Object> map = new HashMap<>();
            map.put("success", false);
            map.put("response", mapResponse);
            
            return JSON.toJSONString(map);
        }
        
        if(!newPwd.equals(confirmPwd)){
            
            Map<String, Object> mapResponse = new HashMap<>();
            mapResponse.put("errorCode", -123);
            mapResponse.put("errorMsg", "两次输入的新密码不一致!");
            
            Map<String, Object> map = new HashMap<>();
            map.put("success", false);
            map.put("response", mapResponse);
            
            return JSON.toJSONString(map);            
        }
                
        if(suppliesManageService.modifyPwd(account, newPwd)){
        
            Map<String, Object> mapResponse = new HashMap<>();
            mapResponse.put("id", -1);
            mapResponse.put("msg", "密码修改成功!");
            
            Map<String, Object> map = new HashMap<>();
            map.put("success", true);
            map.put("response", mapResponse);
            
            return JSON.toJSONString(map);
        }else{
            
            Map<String, Object> mapResponse = new HashMap<>();
            mapResponse.put("errorCode", -123);
            mapResponse.put("errorMsg", "密码修改失败!");
            
            Map<String, Object> map = new HashMap<>();
            map.put("success", false);
            map.put("response", mapResponse);
            
            return JSON.toJSONString(map);
        }
    }
    
    /**
     * 查询【新结果提醒】WebSocket的URL
     * @param request
     * @return
     */
    @RequestMapping("static/api/queryWebSocketNewValueUrl")
    public String queryWebSocketNewValueUrl(HttpServletRequest request) {
        
    	return suppliesManageService.queryWebSocketNewValueUrl();
    }
}