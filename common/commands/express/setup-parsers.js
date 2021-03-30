const bodyParsers = require("body-parser")

class SetupParsersCommand extends require("../base").BaseCommand {

    #parsers

    constructor(app, parsers = [bodyParsers.json, bodyParsers.urlencoded]) {
        super(app);
        this.#parsers = parsers
    }

    execute() {
        this.#parsers.forEach((parser) => this._app.use(parser))
    }

}

module.exports = { SetupParsersCommand }