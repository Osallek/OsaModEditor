package fr.osallek.osamodeditor.common.exception;

public class ProvinceNotFoundException extends RuntimeException {

    public ProvinceNotFoundException() {
    }

    public ProvinceNotFoundException(String message) {
        super(message);
    }

    public ProvinceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ProvinceNotFoundException(Throwable cause) {
        super(cause);
    }

    public ProvinceNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
