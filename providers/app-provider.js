const configs = require("../secure/config")

const { SetupMongoCommand } = require("../common/commands/mongo/setup-mongo")
const { SetupParsersCommand } = require("../common/commands/express/setup-parsers")
const { SetupServerCommand } = require("../common/commands/express/setup-server")

class ApplicationProvider {
    #app
    #mongoose

    #databaseConfigs
    #serverConfigs

    start(app, mongoose, envMode, callback) {
        this.#app = app
        this.#mongoose = mongoose

        this.#databaseConfigs = configs.databaseConfig[envMode] || configs.databaseConfig.development
        this.#serverConfigs = configs.serverConfig[envMode] || configs.serverConfig.development

        this.#startDependencies(this.#serverConfigs, this.#databaseConfigs)
            .then(commandsExecutionResult => {
                callback(null, commandsExecutionResult.join("\n"))
            })
            .catch(error => {
                callback(error, null)
            })
    }

    get app() {
        return this.#app
    }

    get mongoose() {
        return this.#mongoose
    }

    get serverConfigs() {
        return this.#serverConfigs
    }

    get databaseConfigs() {
        return this.#databaseConfigs
    }

    #startDependencies(serverConfigs, databaseConfigs) {
        const startupCommands = [
            new SetupMongoCommand(this.#app, this.#mongoose, databaseConfigs),
            new SetupParsersCommand(this.#app),
            new SetupServerCommand(this.#app, serverConfigs)
        ]

        const startupCommandsPromises = startupCommands.map(command => command.executeAsync())
        return Promise.all(startupCommandsPromises)
    }

}

module.exports.appProvider = new ApplicationProvider()