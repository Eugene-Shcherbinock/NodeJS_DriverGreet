const mongoose = require("mongoose")

const userSchemaName = "user"

const userSchema = mongoose.Schema({

})

module.exports.userModelInfo = {
    schemaName: userSchemaName,
    Model: mongoose.model(userSchemaName, userSchema)
}