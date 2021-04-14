const express = require("express")

const {UsersService} = require("../../../models/services/users-service")
const {AuthService} = require("../../../models/services/auth-service")

const usersRoute = "/users"
const usersRouter = express.Router({ mergeParams: true })

const usersService = new UsersService()
const authenticationService = new AuthService()
const appErrorHandler = require("../../../providers/app-provider").appProvider.errorHandler

usersRouter.get("/", (req, res) => {
    authenticationService.checkAccessToken(req.headers)
        .then(decoded => usersService.fetchUsers())
        .then(usersResponse => {
            res.status(usersResponse.statusCode).json(usersResponse.data)
        })
        .catch(error => {
            appErrorHandler.handle(error, res)
        })
})

usersRouter.get("/me", (req, res) => {
    authenticationService.checkAccessToken(req.headers)
        .then(decoded => {
            req.url = `/${decoded.id}`
            usersRouter.handle(req, res)
        })
        .catch(error => {
            appErrorHandler.handle(error, res)
        })
})

usersRouter.get("/:userId", (req, res) => {
    const userId = req.params.userId
    usersService.fetchUserById(userId)
        .then(userResponse => {
            res.status(userResponse.statusCode).json(userResponse.data)
        })
        .catch(error => {
            appErrorHandler.handle(error, res)
        })
})

module.exports.injectIn = (app) => {
    app.use(usersRoute, usersRouter)
}