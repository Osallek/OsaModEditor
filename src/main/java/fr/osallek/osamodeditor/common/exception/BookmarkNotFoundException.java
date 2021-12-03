package fr.osallek.osamodeditor.common.exception;

public class BookmarkNotFoundException extends RuntimeException {

    public BookmarkNotFoundException() {
    }

    public BookmarkNotFoundException(String message) {
        super(message);
    }

    public BookmarkNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public BookmarkNotFoundException(Throwable cause) {
        super(cause);
    }

    public BookmarkNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
