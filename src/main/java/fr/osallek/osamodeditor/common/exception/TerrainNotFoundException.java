package fr.osallek.osamodeditor.common.exception;

public class TerrainNotFoundException extends RuntimeException {

    public TerrainNotFoundException() {
    }

    public TerrainNotFoundException(String message) {
        super(message);
    }

    public TerrainNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public TerrainNotFoundException(Throwable cause) {
        super(cause);
    }

    public TerrainNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
