export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
        this.message = message;
        this.statusCode = statusCode;

        Error.captureStackTrace(this);
    }
}
