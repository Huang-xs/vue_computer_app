const mongoose = require("mongoose");

let productSchema = mongoose.Schema({
    degitalNum: Number,
    image: String,
    title: String,
    descrition: String,
    nowPrice: String,
    stockNum: String,
    praiseNum: String,
    Proportion: String,
    isGift: {
        type: Boolean,
        default: false
    },
    isSeckill: {
        type: Boolean,
        default: false
    },
    isTai: {
        type: Boolean,
        default: true
    },
    degital: {
        type: Object,
        default: {},
    }
})

module.exports = mongoModel["productList"] = mongoose.model("productList", productSchema)