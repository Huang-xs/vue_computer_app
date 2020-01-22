const mongoose = require("mongoose");

let categorySchema = mongoose.Schema({
    categoryName: String,
    isShow: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoModel["categoryInfo"] = mongoose.model("categoryInfo", categorySchema)