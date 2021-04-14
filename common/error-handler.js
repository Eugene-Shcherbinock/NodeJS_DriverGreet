const { AppError } = require("./errors/base-error")
const { InternalServerError } = require("./errors/http-errors")
const { ResponseStatuses } = require("./constants")

class AppErrorConverter {

    convert(error) {
        if (error instanceof AppError) {
            return error
        }
        return new InternalServerError(error.message)
    }

}

class AppErrorHandler {

    isCanHandle(error) {
        return error instanceof AppError
    }

    handle(error, response) {
        if (this.isCanHandle(error)) {
            response.status(error.statusCode).json({ error: error })
            return
        }
        const internalError = new InternalServerError(error.message)
        response.status(internalError.statusCode).json({ error: internalError })
    }

}

module.exports = { AppErrorConverter, AppErrorHandler }