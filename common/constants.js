const Constants = {
    validationRegex: {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        phone: /^[0-9]{10,}$/
    },
    headers: {
        authorization: {
            bearer: "Bearer"
        }
    }
}

const ResponseStatuses = {
    ok: 200,
    created: 201,
    badRequest: 400,
    authorizationRequired: 401,
    forbidden: 403,
    notFound: 404,
    alreadyExists: 409,
    internalServer: 500
}

module.exports = { Constants, ResponseStatuses }