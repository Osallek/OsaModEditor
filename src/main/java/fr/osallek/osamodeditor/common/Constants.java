package fr.osallek.osamodeditor.common;

import fr.osallek.eu4parser.common.Eu4Utils;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.io.FileUtils;

import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

public final class Constants {

    private Constants() throws IOException {
        FileUtils.forceMkdir(EDITOR_DOCUMENTS_FOLDER.toFile());
    }

    public static final Path EDITOR_DOCUMENTS_FOLDER = Eu4Utils.OSALLEK_DOCUMENTS_FOLDER.resolve("OsaModEditor");

    public static <T, R> List<R> nullIfEmpty(List<T> collection, Function<T, R> tFunction) {
        return nullIfEmpty(collection, tFunction, false);
    }

    public static <T, R> List<R> nullIfEmpty(List<T> collection, Function<T, R> tFunction, boolean filterNull) {
        return CollectionUtils.isEmpty(collection) ? null : filterNull ? collection.stream()
                                                                                   .filter(Objects::nonNull)
                                                                                   .map(tFunction)
                                                                                   .filter(Objects::nonNull)
                                                                                   .collect(Collectors.toList())
                                                                       : collection.stream().map(tFunction).collect(Collectors.toList());
    }

    public static String cleanModifierName(String s) {
        if (s.startsWith("tech_")) {
            s = s.substring(5);
        }

        return s;
    }

    public static List<String> modifierToLocalisationKeys(String s) {
        List<String> keys = new ArrayList<>();
        s = cleanModifierName(s);

        keys.add("modifier_" + s);
        keys.add(("modifier_" + s).toLowerCase());
        keys.add(("modifier_" + s).toUpperCase());
        keys.add(s);
        keys.add(s.toLowerCase());
        keys.add(s.toUpperCase());
        keys.add("idea_" + s);
        keys.add(("idea_" + s).toLowerCase());
        keys.add(("idea_" + s).toUpperCase());

        if (s.endsWith("_modifier") || s.endsWith("_MODIFIER")) {
            s = s.substring(0, s.length() - 9);
            keys.add("modifier_" + s);
            keys.add(("modifier_" + s).toLowerCase());
            keys.add(("modifier_" + s).toUpperCase());
            keys.add(s);
            keys.add(s.toLowerCase());
            keys.add(s.toUpperCase());
            keys.add("idea_" + s);
            keys.add(("idea_" + s).toLowerCase());
            keys.add(("idea_" + s).toUpperCase());
        }

        if (s.endsWith("_modifer") || s.endsWith("_MODIFER")) {
            s = s.substring(0, s.length() - 8);
            keys.add("modifier_" + s);
            keys.add(("modifier_" + s).toLowerCase());
            keys.add(("modifier_" + s).toUpperCase());
            keys.add(s);
            keys.add(s.toLowerCase());
            keys.add(s.toUpperCase());
            keys.add("idea_" + s);
            keys.add(("idea_" + s).toLowerCase());
            keys.add(("idea_" + s).toUpperCase());
        }

        if (s.startsWith("num_") || s.startsWith("NUM_")) {
            s = s.substring(4);
            keys.add("modifier_" + s);
            keys.add(("modifier_" + s).toLowerCase());
            keys.add(("modifier_" + s).toUpperCase());
            keys.add(s);
            keys.add(s.toLowerCase());
            keys.add(s.toUpperCase());
            keys.add("idea_" + s);
            keys.add(("idea_" + s).toLowerCase());
            keys.add(("idea_" + s).toUpperCase());
        }

        if (s.startsWith("global_") || s.startsWith("GLOBAL_")) {
            s = s.substring(7);
            keys.add("modifier_" + s);
            keys.add(("modifier_" + s).toLowerCase());
            keys.add(("modifier_" + s).toUpperCase());
            keys.add(s);
            keys.add(s.toLowerCase());
            keys.add(s.toUpperCase());
            keys.add("idea_" + s);
            keys.add(("idea_" + s).toLowerCase());
            keys.add(("idea_" + s).toUpperCase());
        }

        if (s.endsWith("_speed") || s.endsWith("_SPEED")) {
            s = s.substring(0, s.length() - 6);
            keys.add("modifier_" + s);
            keys.add(("modifier_" + s).toLowerCase());
            keys.add(("modifier_" + s).toUpperCase());
            keys.add(s);
            keys.add(s.toLowerCase());
            keys.add(s.toUpperCase());
            keys.add("idea_" + s);
            keys.add(("idea_" + s).toLowerCase());
            keys.add(("idea_" + s).toUpperCase());
        }

        return keys;
    }
}
