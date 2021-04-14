const { ResponseStatuses } = require("../../../../common/constants")

class UserResponse extends require("./base-response").BaseResponse {

    constructor(userObject, statusCode = ResponseStatuses.ok) {
        super(statusCode);

        this.data = {}
        this.data.id = userObject._id
        this.data.email = userObject.email
        this.data.phone = userObject.phone
        this.data.username = userObject.username
    }

}

class UsersResponse extends require("./base-response").BaseResponse {

    constructor(usersObjects, statusCode = ResponseStatuses.ok) {
        super(statusCode);
        this.data = usersObjects.map(userObject => new UserResponse(userObject, ResponseStatuses.ok).data)
    }

}

module.exports = { UserResponse, UsersResponse }