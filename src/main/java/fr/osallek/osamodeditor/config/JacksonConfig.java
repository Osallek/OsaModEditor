package fr.osallek.osamodeditor.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.key.LocalDateKeyDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.key.LocalDateTimeKeyDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import fr.osallek.osamodeditor.common.PairDeserializer;
import fr.osallek.osamodeditor.common.PairSerializer;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.annotation.Order;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Order
@Configuration
public class JacksonConfig {

    @Bean
    @Primary
    public ObjectMapper customJacksonConfig() {
        Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder();
        SimpleModule simpleModule = new SimpleModule();
        simpleModule.addSerializer(new LocalDateTimeSerializer(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS")));
        simpleModule.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS")));
        simpleModule.addSerializer(new LocalDateSerializer(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        simpleModule.addDeserializer(LocalDate.class, new LocalDateDeserializer(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        simpleModule.addKeyDeserializer(LocalDate.class, LocalDateKeyDeserializer.INSTANCE);
        simpleModule.addKeyDeserializer(LocalDateTime.class, LocalDateTimeKeyDeserializer.INSTANCE);
        simpleModule.addSerializer(ImmutablePair.class, PairSerializer.INSTANCE);
        simpleModule.addDeserializer(Pair.class, PairDeserializer.INSTANCE);

        return builder.createXmlMapper(false)
                      .serializationInclusion(JsonInclude.Include.NON_NULL)
                      .modules(simpleModule)
                      .featuresToEnable(MapperFeature.ACCEPT_CASE_INSENSITIVE_ENUMS, MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES,
                                        DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
                      .build();
    }
}
