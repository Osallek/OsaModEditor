package fr.osallek.osamodeditor.common.exception;

public class TradeGoodNotFoundException extends RuntimeException {

    public TradeGoodNotFoundException() {
    }

    public TradeGoodNotFoundException(String message) {
        super(message);
    }

    public TradeGoodNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public TradeGoodNotFoundException(Throwable cause) {
        super(cause);
    }

    public TradeGoodNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
