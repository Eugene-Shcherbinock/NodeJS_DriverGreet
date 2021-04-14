const mongoose = require("mongoose")

class ClearDatabaseCommand extends require("../base").BaseCommand {

    #mongoose

    constructor(app, mongoose) {
        super(app);
        this.#mongoose = mongoose
    }

    executeAsync() {
        return new Promise((resolve, reject) => {
            console.log("Removing database...")
            this.#mongoose.connection.dropDatabase().then(value => {
                resolve("Database removed!")
            }).catch(error => reject(error))
        })
    }

}

module.exports = { ClearDatabaseCommand }