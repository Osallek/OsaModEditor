package fr.osallek.osamodeditor.config;

import fr.osallek.eu4parser.model.LauncherSettings;
import fr.osallek.osamodeditor.controller.exceptionhandler.ErrorObject;
import jakarta.annotation.PreDestroy;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.SystemUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aot.hint.annotation.RegisterReflectionForBinding;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportRuntimeHints;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;

import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Configuration
@RegisterReflectionForBinding({ErrorObject.class, LauncherSettings.class})
@ImportRuntimeHints(CustomRuntimeHints.class)
public class OsaModEditorConfig {

    private static final Logger LOGGER = LoggerFactory.getLogger(OsaModEditorConfig.class);

    private static final List<Path> TO_DELETE = new ArrayList<>();

    private final String url;

    private final Environment environment;

    public static void addPathToDelete(Path file) {
        TO_DELETE.add(file);
    }

    public OsaModEditorConfig(ServerProperties serverProperties, Environment environment) {
        this.url = "http://localhost:" + serverProperties.getPort();
        this.environment = environment;
    }

    @EventListener(classes = {ApplicationReadyEvent.class})
    public void handleApplicationReadyEvent() {
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

    @PreDestroy
    public void preDestroy() {
        TO_DELETE.forEach(path -> FileUtils.deleteQuietly(path.toFile()));
    }
}
