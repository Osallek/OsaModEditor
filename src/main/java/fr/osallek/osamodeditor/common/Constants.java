package fr.osallek.osamodeditor.common;

import fr.osallek.eu4parser.common.Eu4Utils;
import org.apache.commons.io.FileUtils;

import java.io.IOException;
import java.nio.file.Path;

public final class Constants {

    private Constants() throws IOException {
        FileUtils.forceMkdir(EDITOR_DOCUMENTS_FOLDER.toFile());
    }

    public static final Path EDITOR_DOCUMENTS_FOLDER = Eu4Utils.OSALLEK_DOCUMENTS_FOLDER.toPath().resolve("OsaModEditor");
}
