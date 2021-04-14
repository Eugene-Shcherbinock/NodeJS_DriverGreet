const { AppErrorConverter } = require("../../common/error-handler")

class BaseService {

    _errorConverter

    constructor(errorConverter = new AppErrorConverter()) {
        this._errorConverter = errorConverter
    }

}

module.exports = { BaseService }