package fr.osallek.osamodeditor.common;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.apache.commons.lang3.tuple.ImmutablePair;

import java.io.IOException;

public class PairSerializer extends StdSerializer<ImmutablePair> {

    public static final PairSerializer INSTANCE = new PairSerializer();

    protected PairSerializer() {
        super(ImmutablePair.class);
    }

    @Override
    public void serialize(ImmutablePair value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeStartObject();
        gen.writeObjectField("key", value.getKey());
        gen.writeObjectField("value", value.getValue());
        gen.writeEndObject();
    }
}
