class MultiCommand extends require("./base").BaseCommand {

    #commands

    constructor(app, commands = []) {
        super(app);
        this.#commands = commands
    }

    execute() {
        this.#commands.forEach((command) => command.execute())
    }

}

module.exports = { MultiCommand }