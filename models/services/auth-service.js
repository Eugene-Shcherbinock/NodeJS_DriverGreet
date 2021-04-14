
const encryptionUtils = require("../../secure/encryption-utils")

const httpError = require("../../common/errors/http-errors")

const {Constants} = require("../../common/constants")
const {UsersDatabaseModel} = require("../database/users/users-model")
const {LocalAuthenticationResponse} = require("../entities/api/responses/auth-responses")
const {UserResponse} = require("../entities/api/responses/users-response")

class AuthService extends require("./base-service").BaseService {

    #model //= new UsersDatabaseModel()

    constructor(usersModel = new UsersDatabaseModel()) {
        super();
        this.#model = usersModel
    }

    registerUser(userBody) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.#model.validate(userBody)

                if (await this.#model.isAlreadyExists(userBody)) {
                    reject(new httpError.ResourceAlreadyExists(
                        `User with this email or phone number is already exists!`
                    ))
                }

                userBody.password = await encryptionUtils.bcrypt.generateSaltAndHash(userBody.password)

                let createdUserRecord = await this.#model.create(userBody)
                const accessToken = await encryptionUtils.jwt.sign(this.#getJwtPayloadFromUser(createdUserRecord))

                createdUserRecord = await this.#model.save(createdUserRecord)
                resolve(new LocalAuthenticationResponse(accessToken, new UserResponse(createdUserRecord)))
            } catch (error) {
                reject(this._errorConverter.convert(error))
            }
        })
    }

    loginUser(userBody) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.#model.validate(userBody, UsersDatabaseModel.ValidationFieldsFor.login)

                const existingUser = await this.#model.fetchByEmail(userBody.email)
                if (!existingUser) {
                    reject(new httpError.NotFoundError(`User with email: ${userBody.email} doesn't exist!`))
                }

                const isPasswordCorrect = await encryptionUtils.bcrypt.compare(
                    userBody.password,
                    existingUser.password
                )

                if (!isPasswordCorrect) {
                    reject(new httpError.BadRequestError(`Wrong password!`))
                }

                const accessToken = await encryptionUtils.jwt.sign(this.#getJwtPayloadFromUser(existingUser))
                resolve(new LocalAuthenticationResponse(accessToken, new UserResponse(existingUser)))
            } catch (error) {
                reject(this._errorConverter.convert(error))
            }
        })
    }

    checkAccessToken(headers) {
        return new Promise(async (resolve, reject) => {
            try {
                const authorizationHeader = headers.authorization
                if (!authorizationHeader) {
                    reject(new httpError.AuthorizationRequiredError(`"Authorization" header required!"`))
                }

                const [headerName, headerToken] = authorizationHeader.split(" ")
                if (headerName !== Constants.headers.authorization.bearer || !headerToken) {
                    reject(new httpError.AuthorizationRequiredError(`"Authorization" header is invalid!`))
                }

                const decoded = await encryptionUtils.jwt.decode(headerToken)
                if (!decoded) {
                    reject(new httpError.AuthorizationRequiredError(`Access token is expired!`))
                }
                resolve(decoded.user)
            } catch (error) {
                reject(error)
            }
        })
    }

    #getJwtPayloadFromUser(user) {
        return {
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                phone: user.phone
            }
        }
    }

}

module.exports = {AuthService}