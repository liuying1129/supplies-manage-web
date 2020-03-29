package com.yklis.suppliesmanageweb.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


/**
 * 未登录的情况下，强制进入登录页面
 * @author ying07.liu
 *
 */

@Component
//不需要@WebFilter,Springboot自动将该类配置为Filter
//@WebFilter(urlPatterns = "/*")
public class LoginFilter implements Filter {
    
    //配置容器起动时候加载log4j配置文件
    //只要将log4j.properties放在classes下，tomcat启动的时候会自动加载log4j的配置信息，
    //在程式代码不再需要使用PropertyConfigurator.configure("log4j.properties")来加载，
    //如果用了它反而会出现上面的错误--Could not read configuration file [log4jj.properties]
    //PropertyConfigurator.configure("log4jj.properties");
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {    	
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain) throws IOException, ServletException {

        HttpServletRequest req= (HttpServletRequest)request;
        HttpServletResponse res = (HttpServletResponse)response;                  

    	logger.info("LoginFilter的doFilter方法1:"+req.getRequestURI());

    	//静态资源文件
    	//req.getRequestURI()示例:/static/login.html、/animate.min.css、/jquery/jquery-3.2.1.min.js、/dev-js/login.js
        if ((req.getRequestURI().indexOf("/bootstrap/") >= 0) 
          ||(req.getRequestURI().indexOf("/bootstrap-table/") >= 0)
          ||(req.getRequestURI().indexOf("/dayjs/") >= 0)
          ||(req.getRequestURI().indexOf("/dev-css/") >= 0)
          ||(req.getRequestURI().indexOf("/dev-js/") >= 0)
          ||(req.getRequestURI().indexOf("/hover-css/") >= 0)
          ||(req.getRequestURI().indexOf("/images/") >= 0)
          ||(req.getRequestURI().indexOf("/jquery/") >= 0)
          ||(req.getRequestURI().indexOf("/My97DatePicker/") >= 0)
          ||(req.getRequestURI().indexOf("/select2/") >= 0)
          ||("/animate.min.css".equals(req.getRequestURI()))){
            //chain.doFilter表示放过去，不做处理
            chain.doFilter(request, response);
            return;
        }
        
        if (("/static/login.html".equals(req.getRequestURI()))
          ||("/".equals(req.getRequestURI()))
          ||("/index.html".equals(req.getRequestURI()))
          ||("/static/header.html".equals(req.getRequestURI()))
          ||("/static/querySqsydw".equals(req.getRequestURI()))
          ||("/static/querySessionAccount".equals(req.getRequestURI()))
          ||("/static/login".equals(req.getRequestURI()))){
            //chain.doFilter表示放过去，不做处理
            chain.doFilter(request, response);
            return;
        }
                      
        //suppliesmanageweb.isLogin为true,表示已经成功登录的情况
        HttpServletRequest httpRequest = (HttpServletRequest)request;
        HttpSession session = httpRequest.getSession(false);//参数默认值:true
        if(null!=session){
            
            Object o2 = session.getAttribute("suppliesmanageweb.isLogin");
            if(null != o2) {
                
                boolean b2 = (boolean) o2;
                        
                if(b2) {                
                    chain.doFilter(request, response);
                    return;
                }                
            }
        }
        
    	logger.info("LoginFilter的doFilter方法2:"+req.getRequestURI());
    	
        //记录请求地址,以便登录成功后可以跳转到相应的页面
        Cookie cookie3 = new Cookie("suppliesmanageweb.request",req.getRequestURI());
        res.addCookie(cookie3);
        
        res.sendRedirect("/static/login.html");
    }

    @Override
    public void destroy() {
    }
}
