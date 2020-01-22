const mongoose = require("mongoose");

let contentSchema = mongoose.Schema({
    // 分类id
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categoryInfo"
    },
    // 标题
    title: {
        type: String,
        default: ""
    },
    // 地址
    address: {
        type: String,
        default: ""
    },
    // 收藏
    isCollect: {
        type: String,
        default: ""
    },
    // 简介
    description: {
        type: String,
        default: ""
    },
    // 内容
    content: {
        type: String,
        default: ""
    },
    // 缩略图
    thumbnail: {
        type: String,
        default: ""
    },
    // 多图
    imgs: {
        type: Array
    },
    // 添加时间
    addTime: {
        type: Date,
        default: new Date()
    },
    // 是否已删除
    isDel: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoModel["contentInfo"] = mongoose.model("contentInfo", contentSchema)