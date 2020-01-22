const mongoose = require("mongoose");

let navbarSchema = mongoose.Schema({
    navbar: [{
        id: Number,
        name: String,
        database: String,
        url: String,
        icon: String,
        picture: String,
        isTemplate: {
            type: Boolean,
            default: false
        },
        isShow: {
            type: Boolean,
            default: true
        },
        pid: { //父级id
            type: Number,
            default: 0
        },
        isShow: {
            type: Boolean,
            default: true
        },
        fields: [{
                englishName: String,
                chineseName: String,
                datatype: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Fieldtype" //首字母必须大写
                },
                defaulttype: String,
                rule: Array,
                checking: String,
                isShow: {
                    type: Boolean,
                    default: true
                }
            }

        ]
    }],
    count: {
        type: Number,
        default: 1
    }
})

module.exports = mongoModel["NavbarInfo"] = mongoose.model("NavbarInfo", navbarSchema)