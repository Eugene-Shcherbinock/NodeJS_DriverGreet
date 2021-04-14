const mongoose = require("mongoose")

const { usersCollectionInfo } = require("../../entities/database/user-db")
const httpError = require("../../../common/errors/http-errors")

class UsersDatabaseModel {

    static ValidationFieldsFor = {
        registration: ["username", "email", "password", "phone"],
        login: ["email", "password"]
    }

    #usersCollection = usersCollectionInfo

    constructor(usersCollectionInformation = usersCollectionInfo) {
        this.#usersCollection = usersCollectionInformation
    }

    validate(userObject, fieldsToValidate = UsersDatabaseModel.ValidationFieldsFor.registration) {
        return new Promise((resolve, reject) => {
            this.#usersCollection.Model.validate(userObject, fieldsToValidate)
                .then(result => resolve(true))
                .catch(error => {
                    if (error instanceof mongoose.Error.ValidationError) {
                        const errorMessages = Object.keys(error.errors).map(key => error.errors[key].message)
                        reject(new httpError.BadRequestError(errorMessages.join(" ")))
                    }
                    reject(new httpError.BadRequestError(error.message))
                })
        })
    }

    isAlreadyExists(userObject) {
        return new Promise(async (resolve, reject) => {
            try {
                const foundedUser = await this.#usersCollection.Model.findOne({
                    $or: [
                        { email: userObject.email },
                        { phone: userObject.phone }
                    ]
                })
                resolve(foundedUser != null)
            } catch (error) {
                reject(error)
            }
        })
    }

    create(userObject) {
        return new Promise(resolve => {
            resolve(this.#usersCollection.Model(userObject))
        })
    }

    save(userDocument) {
        return new Promise((resolve, reject) => {
            userDocument.save()
                .then(savedDocument => resolve(savedDocument))
                .catch(error => reject(error))
        })
    }

    remove(userObject) {
    }

    fetchAll() {
        return new Promise((resolve, reject) => {
            this.#usersCollection.Model.find({})
                .then(users => resolve(users))
                .catch(error => reject(error))
        })
    }

    fetchById(userId) {
        return new Promise((resolve, reject) => {
            this.#usersCollection.Model.findById(userId)
                .then(user => resolve(user))
                .catch(error => reject(error))
        })
    }

    fetchByEmail(userEmail) {
        return new Promise((resolve, reject) => {
            this.fetchWithQuery({ email: userEmail })
                .then(users => resolve(users[0]))
                .catch(error => reject(error))
        })
    }

    fetchWithQuery(query = {}) {
        return new Promise((resolve, reject) => {
            this.#usersCollection.Model.find(query)
                .then(users => resolve(users))
                .catch(error => reject(error))
        })
    }

}

module.exports = { UsersDatabaseModel }