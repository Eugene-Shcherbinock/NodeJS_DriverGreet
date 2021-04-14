class AppError extends Error {

    constructor(message, code, isOperational) {
        super(message);

        this.statusCode = code
        this.description = message

        // Error.captureStackTrace(this)
    }

}

module.exports = { AppError }