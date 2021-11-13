package fr.osallek.osamodeditor.common.exception;

public class AdvisorNotFoundException extends RuntimeException {

    public AdvisorNotFoundException() {
    }

    public AdvisorNotFoundException(String message) {
        super(message);
    }

    public AdvisorNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public AdvisorNotFoundException(Throwable cause) {
        super(cause);
    }

    public AdvisorNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
