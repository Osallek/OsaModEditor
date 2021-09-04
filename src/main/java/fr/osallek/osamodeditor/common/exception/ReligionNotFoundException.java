package fr.osallek.osamodeditor.common.exception;

public class ReligionNotFoundException extends RuntimeException {

    public ReligionNotFoundException() {
    }

    public ReligionNotFoundException(String message) {
        super(message);
    }

    public ReligionNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ReligionNotFoundException(Throwable cause) {
        super(cause);
    }

    public ReligionNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
