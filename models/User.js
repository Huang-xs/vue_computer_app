const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    username: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoModel["UserInfo"] = mongoose.model("UserInfo", userSchema)