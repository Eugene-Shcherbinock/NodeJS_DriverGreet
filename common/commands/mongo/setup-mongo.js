const { databaseErrors } = require("../../errors/database-errors")

class SetupMongoCommand extends require("../base").BaseCommand {
    #mongoose
    #configs

    constructor(app, mongoose, configs) {
        super(app);
        this.#mongoose = mongoose
        this.#configs = configs
    }

    executeAsync() {
        return new Promise((resolve, reject) => {
            console.log("Connecting to database...")
            this.#mongoose.connect(this.#configs.url, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
                if (error) {
                    reject(new databaseErrors.CannotConnectToDatabaseError(this.#configs.url))
                }
                resolve(`Connected to database successfully! URL: ${this.#configs.url}`)
            })
        })
    }

}

module.exports = { SetupMongoCommand }