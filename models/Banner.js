const mongoose = require("mongoose");

let bannerSchema = mongoose.Schema({
    image: {
        type: Array,
        default: []
    }
})

module.exports = mongoModel["bannerImg"] = mongoose.model("bannerImg", bannerSchema)