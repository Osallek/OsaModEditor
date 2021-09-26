package fr.osallek.osamodeditor.common.exception;

public class TradeCompanyNotFoundException extends RuntimeException {

    public TradeCompanyNotFoundException() {
    }

    public TradeCompanyNotFoundException(String message) {
        super(message);
    }

    public TradeCompanyNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public TradeCompanyNotFoundException(Throwable cause) {
        super(cause);
    }

    public TradeCompanyNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
