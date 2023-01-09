package fr.osallek.osamodeditor.config;

import fr.osallek.osamodeditor.common.Constants;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.util.ResourceUtils;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.File;
import java.util.concurrent.TimeUnit;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final Environment environment;

    public WebConfig(Environment environment) {
        this.environment = environment;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        if (!this.environment.acceptsProfiles(Profiles.of("dev"))) {
            registry.addMapping("/**").allowedOrigins("http://localhost:3000");
        }
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        ClassPathResource index = new ClassPathResource("/editor/index.html");
        PathResourceResolver pathResourceResolver = new PathResourceResolver();

        registry.addResourceHandler("/", "/index.html")
                .addResourceLocations(ResourceUtils.CLASSPATH_URL_PREFIX + "/editor/")
                .setCacheControl(CacheControl.maxAge(1, TimeUnit.MINUTES))
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) {
                        return index;
                    }
                });

        registry.addResourceHandler("/favicon.ico", "/robots.txt", "manisfest.json")
                .addResourceLocations(ResourceUtils.CLASSPATH_URL_PREFIX + "/editor/")
                .setCacheControl(CacheControl.maxAge(1, TimeUnit.MINUTES))
                .resourceChain(true)
                .addResolver(pathResourceResolver);

        registry.addResourceHandler("/static/**")
                .addResourceLocations(ResourceUtils.CLASSPATH_URL_PREFIX + "/editor/static/")
                .setCacheControl(CacheControl.maxAge(1, TimeUnit.MINUTES))
                .setOptimizeLocations(true)
                .resourceChain(true)
                .addResolver(pathResourceResolver);

        registry.addResourceHandler("/image/**")
                .addResourceLocations("file:/" + Constants.EDITOR_DOCUMENTS_FOLDER.toAbsolutePath() + File.separator)
                .resourceChain(false)
                .addResolver(pathResourceResolver);

        registry.addResourceHandler("/**")
                .addResourceLocations(ResourceUtils.CLASSPATH_URL_PREFIX + "/editor/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) {
                        try {
                            location = location.createRelative(resourcePath);

                            return location.exists() && location.isReadable() ? location : index;
                        } catch (Exception e) {
                            return index;
                        }
                    }
                });
    }
}
