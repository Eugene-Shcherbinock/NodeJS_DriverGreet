const express = require("express")
const mongoose = require("mongoose")

const { appProvider } = require("./providers/app-provider")

const app = express()
appProvider.start(app, mongoose, process.env.NODE_ENV, (error, result) => {
    if (error) {
        console.error(error)
        process.exit(1)
    }
    console.log(result)
    console.log("Application started!")
})