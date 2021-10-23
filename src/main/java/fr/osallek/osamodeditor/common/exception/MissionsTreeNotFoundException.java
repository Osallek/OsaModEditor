package fr.osallek.osamodeditor.common.exception;

public class MissionsTreeNotFoundException extends RuntimeException {

    public MissionsTreeNotFoundException() {
    }

    public MissionsTreeNotFoundException(String message) {
        super(message);
    }

    public MissionsTreeNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public MissionsTreeNotFoundException(Throwable cause) {
        super(cause);
    }

    public MissionsTreeNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
