package fr.osallek.osamodeditor.common.exception;

public class TradeNodeNotFoundException extends RuntimeException {

    public TradeNodeNotFoundException() {
    }

    public TradeNodeNotFoundException(String message) {
        super(message);
    }

    public TradeNodeNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public TradeNodeNotFoundException(Throwable cause) {
        super(cause);
    }

    public TradeNodeNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
