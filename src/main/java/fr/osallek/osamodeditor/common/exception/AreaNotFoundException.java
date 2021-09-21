package fr.osallek.osamodeditor.common.exception;

public class AreaNotFoundException extends RuntimeException {

    public AreaNotFoundException() {
    }

    public AreaNotFoundException(String message) {
        super(message);
    }

    public AreaNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public AreaNotFoundException(Throwable cause) {
        super(cause);
    }

    public AreaNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
