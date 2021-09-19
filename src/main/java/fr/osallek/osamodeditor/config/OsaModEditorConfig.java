package fr.osallek.osamodeditor.config;

import org.apache.commons.lang3.SystemUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;

import java.io.IOException;

@Configuration
public class OsaModEditorConfig {

    private static final Logger LOGGER = LoggerFactory.getLogger(OsaModEditorConfig.class);

    private final String url;

    private final Environment environment;

    public OsaModEditorConfig(ServerProperties serverProperties, Environment environment) {
        this.url = "http://localhost:" + serverProperties.getPort() + "/editor";
        this.environment = environment;
    }

    @EventListener(classes = {ApplicationReadyEvent.class})
    public void handleContextRefreshEvent() {
        if (!this.environment.acceptsProfiles(Profiles.of("dev"))) {
            Runtime runtime = Runtime.getRuntime();

            try {
                if (SystemUtils.IS_OS_WINDOWS) {
                    runtime.exec("explorer " + this.url);
                } else if (SystemUtils.IS_OS_MAC) {
                    runtime.exec("open " + this.url);
                } else if (SystemUtils.IS_OS_LINUX) {
                    runtime.exec("xdg-open " + this.url);
                }
            } catch (IOException e) {
                LOGGER.error("An error occurred while trying to open browser: {}", e.getMessage(), e);
            }
        }
    }
}
