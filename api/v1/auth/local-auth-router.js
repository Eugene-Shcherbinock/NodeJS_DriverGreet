const express = require("express")

const { AuthService } = require("../../../models/services/auth-service")

const localAuthRoute = "/authentication"
const localAuthRouter = express.Router({mergeParams: true})

const authenticationService = new AuthService()
const appErrorHandler = require("../../../providers/app-provider").appProvider.errorHandler

localAuthRouter.post("/register", (req, res) => {
    authenticationService.registerUser(req.body)
        .then(authResponse => {
            res.status(authResponse.statusCode).json(authResponse.data)
        })
        .catch(error => {
            appErrorHandler.handle(error, res)
        })
})

localAuthRouter.post("/login", (req, res) => {
    authenticationService.loginUser(req.body)
        .then(authResponse => {
            res.status(authResponse.statusCode).json(authResponse.data)
        })
        .catch(error => {
            appErrorHandler.handle(error, res)
        })
})

module.exports.injectIn = (app) => {
    app.use(localAuthRoute, localAuthRouter)
}