package fr.osallek.osamodeditor.common.exception;

public class ClimateNotFoundException extends RuntimeException {

    public ClimateNotFoundException() {
    }

    public ClimateNotFoundException(String message) {
        super(message);
    }

    public ClimateNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ClimateNotFoundException(Throwable cause) {
        super(cause);
    }

    public ClimateNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
