package com.yklis.suppliesmanageweb;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;

/**
 * 右键启动
 * 即右键入口main函数所在的文件就能启动整个项目
 * 
 * @author liuyi
 *
 */
@SpringBootApplication
@ImportResource(locations = {"classpath:dubbo-consumer.xml","classpath:kaptchaConfig.xml"})
public class SuppliesManageWebApplication {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public static void main(String[] args) {
    	
		SpringApplication.run(SuppliesManageWebApplication.class, args);
	}

}
