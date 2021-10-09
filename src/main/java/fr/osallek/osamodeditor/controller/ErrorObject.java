package fr.osallek.osamodeditor.controller;

public class ErrorObject<T> {

    public static ErrorObject<Void> of(ErrorCode errorCode) {
        return new ErrorObject<>(errorCode);
    }

    public static ErrorObject<Void> of(ErrorCode errorCode, String message) {
        return new ErrorObject<>(errorCode, message);
    }

    public static <T> ErrorObject<T> of(ErrorCode errorCode, String message, T meta) {
        return new ErrorObject<>(errorCode, message, meta);
    }

    public static <T> ErrorObject<T> of(ErrorCode errorCode, T meta) {
        return new ErrorObject<>(errorCode, meta);
    }

    private ErrorCode error;

    private String message;

    private T meta;

    public ErrorObject() {
    }

    public ErrorObject(ErrorCode error) {
        this.error = error;
    }

    public ErrorObject(ErrorCode error, String message) {
        this.error = error;
        this.message = message;
    }

    public ErrorObject(ErrorCode error, String message, T meta) {
        this.error = error;
        this.message = message;
        this.meta = meta;
    }

    public ErrorObject(ErrorCode error, T meta) {
        this.error = error;
        this.meta = meta;
    }

    public ErrorCode getError() {
        return error;
    }

    public void setError(ErrorCode error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getMeta() {
        return meta;
    }

    public void setMeta(T meta) {
        this.meta = meta;
    }
}
