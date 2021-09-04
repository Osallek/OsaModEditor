package fr.osallek.osamodeditor.common.exception;

public class CultureNotFoundException extends RuntimeException {

    public CultureNotFoundException() {
    }

    public CultureNotFoundException(String message) {
        super(message);
    }

    public CultureNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public CultureNotFoundException(Throwable cause) {
        super(cause);
    }

    public CultureNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
