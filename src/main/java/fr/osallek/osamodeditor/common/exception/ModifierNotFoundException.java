package fr.osallek.osamodeditor.common.exception;

public class ModifierNotFoundException extends RuntimeException {

    public ModifierNotFoundException() {
    }

    public ModifierNotFoundException(String message) {
        super(message);
    }

    public ModifierNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ModifierNotFoundException(Throwable cause) {
        super(cause);
    }

    public ModifierNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
