package fr.osallek.osamodeditor.common.exception;

public class GraphicalCultureNotFoundException extends RuntimeException {

    public GraphicalCultureNotFoundException() {
    }

    public GraphicalCultureNotFoundException(String message) {
        super(message);
    }

    public GraphicalCultureNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public GraphicalCultureNotFoundException(Throwable cause) {
        super(cause);
    }

    public GraphicalCultureNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
