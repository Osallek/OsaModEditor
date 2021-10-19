package fr.osallek.osamodeditor.common;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.apache.commons.lang3.tuple.Pair;

import java.io.IOException;
import java.util.Map;

public class PairDeserializer extends StdDeserializer<Pair<?, ?>> {

    public static final PairDeserializer INSTANCE = new PairDeserializer();

    protected PairDeserializer() {
        super(Pair.class);
    }

    @Override
    public Pair<?, ?> deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        Map<?, ?> map = p.readValueAs(Map.class);

        return Pair.of(map.get("key"), map.get("value"));
    }
}
