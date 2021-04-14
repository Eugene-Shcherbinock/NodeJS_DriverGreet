const mongoose = require("mongoose")

const { validationRegex } = require("../../../common/constants").Constants

const userSchemaName = "Users"

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username required!"]
    },
    email: {
        type: String,
        required: [true, "User email required!"],
        unique: true,
        validate: {
            validator: (value) => validationRegex.email.test(value),
            message: (properties) => `${properties.value} is not valid email!`
        }
    },
    password: {
        type: String,
        required: [true, "Password required!"]
    },
    phone: {
        type: String,
        unique: true,
        sparse: true,
        validate: {
            validator: (value) => validationRegex.phone.test(value),
            message: (properties) => `${properties.value} is not valid phone number!`
        }
    }
})

module.exports.usersCollectionInfo = {
    schemaName: userSchemaName,
    Model: mongoose.model(userSchemaName, userSchema)
}