package com.brcg.coolcatgames;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class CoolcatgamesApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoolcatgamesApplication.class, args);
	}

}
