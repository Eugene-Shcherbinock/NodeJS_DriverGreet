class BaseCommand {
    _app

    constructor(app) {
        this._app = app
    }

    executeAsync() {
        return Promise.reject(new Error(`${this} should implement this method`))
    }

}

module.exports = { BaseCommand }