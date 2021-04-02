class CannotConnectToDatabaseError extends Error {

    constructor(url = "") {
        super(`Cannot connect to database with URL: ${url}`);
    }

}

module.exports = { CannotConnectToDatabaseError }