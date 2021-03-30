const { serverConfig } = require("../../../secure/config")

const { MultiCommand } = require("../multi")
const { SetupParsersCommand } = require("../express/setup-parsers")
const { SetupServerCommand } = require("../express/setup-server")

class DefaultServerSetupCommand extends require("../base").BaseCommand {

    #multiCommand

    constructor(app, configs = serverConfig.development) {
        super(app);

        this.#multiCommand = new MultiCommand(app, [
            new SetupParsersCommand(app),
            new SetupServerCommand(app, configs)
        ])
    }

    execute() {
        this.#multiCommand.execute()
    }

}

module.exports = { DefaultServerSetupCommand }