const localAuthRouter = require("./auth/local-auth-router")
const usersRouter = require("./users/users-router")

const apiRoute = "/api/v1"
const apiRouter = require("express").Router({ mergeParams: true })

localAuthRouter.injectIn(apiRouter)
usersRouter.injectIn(apiRouter)

module.exports.injectIn = (app) => {
    app.use(apiRoute, apiRouter)

    app.use((err, req, res, next) => {
        const appProvider = require("../../providers/app-provider").appProvider
        appProvider.errorHandler.handle(err, res)
    })
}