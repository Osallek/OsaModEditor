package fr.osallek.osamodeditor.common.exception;

public class MonsoonNotFoundException extends RuntimeException {

    public MonsoonNotFoundException() {
    }

    public MonsoonNotFoundException(String message) {
        super(message);
    }

    public MonsoonNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public MonsoonNotFoundException(Throwable cause) {
        super(cause);
    }

    public MonsoonNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
