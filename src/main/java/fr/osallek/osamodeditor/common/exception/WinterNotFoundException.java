package fr.osallek.osamodeditor.common.exception;

public class WinterNotFoundException extends RuntimeException {

    public WinterNotFoundException() {
    }

    public WinterNotFoundException(String message) {
        super(message);
    }

    public WinterNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public WinterNotFoundException(Throwable cause) {
        super(cause);
    }

    public WinterNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
