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
//不影响默认配置文件的读取
//@PropertySource(value = {"file:/ykschedule-cfg/jdbc.properties"})
//扫描指定包中的Mybatis接口，然后创建各自接口的动态代理类
//@MapperScan(value = {"com.yklis.schedule.dao"})
//@Import({DynamicDataSourceRegister.class})
@ImportResource(value = {"classpath:dubbo-consumer.xml"})
public class SuppliesManageWebApplication {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public static void main(String[] args) {
    	
		SpringApplication.run(SuppliesManageWebApplication.class, args);
	}

}
