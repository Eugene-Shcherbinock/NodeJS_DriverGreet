const bodyParsers = require("body-parser")

class SetupParsersCommand extends require("../base").BaseCommand {

    #parsers

    constructor(app, parsers = [bodyParsers.json, bodyParsers.urlencoded({ extended: true })]) {
        super(app);
        this.#parsers = parsers
    }

    executeAsync() {
        return new Promise((resolve, reject) => {
            for (const parser of this.#parsers) {
                this._app.use(parser)
            }
            resolve("Parsers are injected to the app!")
        })
        // this.#parsers.forEach((parser) => this._app.use(parser))
    }

}

module.exports = { SetupParsersCommand }