class SetupServerCommand extends require("../base").BaseCommand {

    #serverConfigs

    constructor(app, configs = { host: '', port: '' }) {
        super(app);
        this.#serverConfigs = configs
    }

    executeAsync() {
        return new Promise((resolve, reject) => {
            console.log("Starting the server...")
            this._app.listen(this.#serverConfigs.port, this.#serverConfigs.host, () => {
                resolve(`Server started. Server URL: ${this.#serverConfigs.host}:${this.#serverConfigs.port}`)
            })
        })
    }

}

module.exports = { SetupServerCommand }