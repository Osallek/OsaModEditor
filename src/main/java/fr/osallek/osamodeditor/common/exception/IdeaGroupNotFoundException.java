package fr.osallek.osamodeditor.common.exception;

public class IdeaGroupNotFoundException extends RuntimeException {

    public IdeaGroupNotFoundException() {
    }

    public IdeaGroupNotFoundException(String message) {
        super(message);
    }

    public IdeaGroupNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public IdeaGroupNotFoundException(Throwable cause) {
        super(cause);
    }

    public IdeaGroupNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
