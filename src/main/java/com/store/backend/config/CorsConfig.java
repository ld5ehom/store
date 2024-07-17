package com.store.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*") // Allow all origins; you can specify particular origins if needed.
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed request methods
                .allowedHeaders("*"); // Allowed request headers
    }
}