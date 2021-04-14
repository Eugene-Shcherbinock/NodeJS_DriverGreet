const { ResponseStatuses } = require("../../../../common/constants")

class LocalAuthenticationResponse extends require("./base-response").BaseResponse {

    constructor(token, userResponse) {
        super(ResponseStatuses.ok);

        this.data = {}
        this.data.user = userResponse.data
        this.data.accessToken = token
    }

}

module.exports = { LocalAuthenticationResponse }