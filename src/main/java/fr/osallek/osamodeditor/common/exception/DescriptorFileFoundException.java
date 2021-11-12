package fr.osallek.osamodeditor.common.exception;

public class DescriptorFileFoundException extends RuntimeException {

    public DescriptorFileFoundException() {
    }

    public DescriptorFileFoundException(String message) {
        super(message);
    }

    public DescriptorFileFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public DescriptorFileFoundException(Throwable cause) {
        super(cause);
    }

    public DescriptorFileFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
