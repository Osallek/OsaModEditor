package fr.osallek.osamodeditor.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.ResourceUtils;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("http://localhost:3000");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/editor/**", "/editor/", "/editor")
                .addResourceLocations(ResourceUtils.CLASSPATH_URL_PREFIX + "/editor/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) {
                        try {
                            location = location.createRelative(resourcePath);

                            return location.exists() && location.isReadable() ? location : new ClassPathResource("/editor/index.html");
                        } catch (Exception e) {
                            return new ClassPathResource("/editor/index.html");
                        }
                    }
                });
    }
}
