const configs = require("../secure/config")

const { AppErrorHandler } = require("../common/error-handler");

const { SetupMongoCommand } = require("../common/commands/mongo/setup-mongo")
const { SetupServerCommand } = require("../common/commands/express/setup-server")
const { ClearDatabaseCommand } = require("../common/commands/mongo/clear-database")

class ApplicationProvider {
    #app
    #mongoose

    #databaseConfigs
    #serverConfigs

    #appErrorHandler

    constructor() {
        this.#appErrorHandler = new AppErrorHandler()
    }

    start(app, mongoose, envMode, callback) {
        this.#app = app
        this.#mongoose = mongoose

        this.#databaseConfigs = configs.databaseConfig[envMode] || configs.databaseConfig.development
        this.#serverConfigs = configs.serverConfig[envMode] || configs.serverConfig.development

        this.#setupParsers()
        this.#setupRouters()

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

    get errorHandler() {
        return this.#appErrorHandler
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
            new SetupServerCommand(this.#app, serverConfigs),
            // new ClearDatabaseCommand(this.#app, this.#mongoose)
        ]

        const startupCommandsPromises = startupCommands.map(command => command.executeAsync())
        return Promise.all(startupCommandsPromises)
    }

    #setupParsers() {
        const express = require("express")

        this.#app.use(express.json())
        this.#app.use(express.urlencoded({ extended: false }))
    }

    #setupRouters() {
        require("../api/v1/api-router").injectIn(this.#app)
    }

}

module.exports.appProvider = new ApplicationProvider()