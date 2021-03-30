const express = require("express")

const { DefaultServerSetupCommand } = require("./common/commands/express/default-server-setup")
const serverConfigs = require("./secure/config")

const app = express()

const config = serverConfigs[process.env.NODE_ENV] || serverConfigs.development
new DefaultServerSetupCommand(app, config).execute()

console.log("test changes CI")