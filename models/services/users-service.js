const httpError = require("../../common/errors/http-errors")

const {UsersDatabaseModel} = require("../database/users/users-model")
const {UserResponse, UsersResponse} = require("../entities/api/responses/users-response")

class UsersService extends require("./base-service").BaseService {

    #model = new UsersDatabaseModel()

    constructor(usersModel = new UsersDatabaseModel()) {
        super();
        this.#model = usersModel
    }

    fetchUsers() {
        return new Promise((resolve, reject) => {
            this.#model.fetchAll()
                .then(users => {
                    resolve(new UsersResponse(users || []))
                })
                .catch(error => reject(this._errorConverter.convert(error)))
        })
    }

    fetchUserById(id) {
        return new Promise((resolve, reject) => {
            this.#model.fetchById(id)
                .then(user => {
                    if (user) {
                        resolve(new UserResponse(user))
                    }
                    reject(new httpError.NotFoundError(`User with id: ${id} not found!`))
                })
                .catch(error => reject(this._errorConverter.convert(error)))
        })
    }

}

module.exports = { UsersService }