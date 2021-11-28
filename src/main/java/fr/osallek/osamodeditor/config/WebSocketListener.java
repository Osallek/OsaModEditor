package fr.osallek.osamodeditor.config;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

@Configuration
public class WebSocketListener {

    private static final Logger LOGGER = LoggerFactory.getLogger(WebSocketListener.class);

    private final ApplicationContext context;

    private final Set<String> sessions = Collections.newSetFromMap(new ConcurrentHashMap<>());

    private final ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();

    private ScheduledFuture<?> future;

    public WebSocketListener(ApplicationContext context) {
        this.context = context;
    }

    @EventListener(SessionConnectEvent.class)
    public void handleWebsocketConnectListener(SessionConnectEvent event) {
        if (GenericMessage.class.equals(event.getMessage().getClass())) {
            String sessionId = (String) event.getMessage().getHeaders().get("simpSessionId");

            if (StringUtils.isNotBlank(sessionId)) {
                this.sessions.add(sessionId);

                if (this.future != null) {
                    this.future.cancel(false);
                    this.future = null;
                }
            }
        }
    }

    @EventListener(SessionDisconnectEvent.class)
    public void handleWebsocketDisconnectListener(SessionDisconnectEvent event) {
        this.sessions.remove(event.getSessionId());

        if (this.sessions.isEmpty()) {
            this.future = this.executorService.schedule(() -> {
                LOGGER.info("Stopping OsaModEditor !");
                System.exit(SpringApplication.exit(this.context, () -> 0)); //System exit, because context.close does not stop the process in other thread
            }, 3, TimeUnit.MINUTES);
        }
    }
}
