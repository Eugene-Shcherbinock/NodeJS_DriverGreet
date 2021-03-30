class SetupServerCommand extends require("../base").BaseCommand {

    #serverConfigs

    constructor(app, configs = { host: '', port: '' }) {
        super(app);
        this.#serverConfigs = configs
    }

    execute() {
        this._app.listen(this.#serverConfigs.port, this.#serverConfigs.host, () => {
            console.log(`Server started. Server URL: ${this.#serverConfigs.host}:${this.#serverConfigs.port}`)
        })
    }

}

module.exports = { SetupServerCommand }