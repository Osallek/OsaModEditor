package fr.osallek.osamodeditor.common.exception;

public class ColonialRegionNotFoundException extends RuntimeException {

    public ColonialRegionNotFoundException() {
    }

    public ColonialRegionNotFoundException(String message) {
        super(message);
    }

    public ColonialRegionNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ColonialRegionNotFoundException(Throwable cause) {
        super(cause);
    }

    public ColonialRegionNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
