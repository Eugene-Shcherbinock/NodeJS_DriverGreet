class CannotConnectToDatabaseError extends require("./base-error").AppError {

    constructor(url = "") {
        super(`Cannot connect to database by URL: ${url}`, 500, true);
    }

}

module.exports = { CannotConnectToDatabaseError }