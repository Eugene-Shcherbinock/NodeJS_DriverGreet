const { ResponseStatuses } = require("../constants")

class HttpError extends require("./base-error").AppError {

    constructor(message, code) {
        super(message, code, true);
    }

}

class InternalServerError extends HttpError {

    constructor(message = "Internal Server Error") {
        super(message, ResponseStatuses.internalServer);
    }

}

class BadRequestError extends HttpError {

    constructor(message = "Bad Request") {
        super(message, ResponseStatuses.badRequest);
    }

}

class AuthorizationRequiredError extends HttpError {

    constructor(message = "Authorization required!") {
        super(message, ResponseStatuses.authorizationRequired);
    }

}

class NotFoundError extends HttpError {

    constructor(message = "Not Found") {
        super(message, ResponseStatuses.notFound);
    }

}

class ResourceAlreadyExists extends HttpError {

    constructor(message = "Resource already exists") {
        super(message, ResponseStatuses.badRequest);
    }

}

module.exports = {
    HttpError, InternalServerError, BadRequestError,
    AuthorizationRequiredError, NotFoundError, ResourceAlreadyExists
}