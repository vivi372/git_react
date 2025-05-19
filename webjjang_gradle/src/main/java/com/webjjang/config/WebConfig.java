package com.webjjang.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**") // 모든 경로에 대해
		.allowedOrigins("http://localhost:3000") // React 주소 허용
		.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
		.allowCredentials(true);
	}
}
