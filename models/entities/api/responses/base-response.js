class BaseResponse {

    constructor(statusCode) {
        this.data = {}
        this.statusCode = statusCode
    }

}

module.exports = { BaseResponse }