package fr.osallek.osamodeditor.common.exception;

public class LocalisationNotFoundException extends RuntimeException {

    public LocalisationNotFoundException() {
    }

    public LocalisationNotFoundException(String message) {
        super(message);
    }

    public LocalisationNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public LocalisationNotFoundException(Throwable cause) {
        super(cause);
    }

    public LocalisationNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
