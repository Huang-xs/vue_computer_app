const mongoose = require("mongoose");
const Navbar = require("./Navbar");

let schemaObj = {};
let modelObj = {};

Navbar.findOne().then(function(data) {
    let temp = data.navbar.filter(val => val.isTemplate)
        // console.log(temp);
    for (var i = 0; i < temp.length; i++) {
        let obj = {};
        for (var j = 0; j < temp[i].fields.length; j++) {
            if(temp[i].fields[j].defaulttype == "query"){
                temp[i].fields[j].englishName = {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:temp[i].fields[j].rule[0]
                }
            }else{
                    
                obj[temp[i].fields[j].englishName] = temp[i].fields[j].defaulttype;
            }
        }

        schemaObj[temp[i].database] = mongoose.Schema(obj)
        mongoModel[temp[i].database] = modelObj[temp[i].database] = mongoose.model(temp[i].database, schemaObj[temp[i].database])
    }

})

module.exports = modelObj;