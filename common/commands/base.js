class BaseCommand {
    _app

    constructor(app) {
        this._app = app
    }

    execute() {
        console.error(`${this} should implement this method`)
    }

}

module.exports = { BaseCommand }