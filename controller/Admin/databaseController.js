const adminController = require("./adminController");
const Template = require("../../models/Template");
const Navbar = require("../../models/Navbar");

class databaseController extends adminController {
    constructor() {
        super();
        this.RouterAmdfunctionName = [
            ["get", "/database", "database", "添加数据"],
            ["post", "/database/add", "add", "添加数据操作"],
            ["post", "/database/edit", "editPost", "修改数据操作"],
            ["post", "/database/del", "delPost", "修改数据操作"],
        ]
    }

    database(req, res) {
        Navbar.findOne({}).populate("navbar.fields.datatype").then(function(result) {
            let { fields } = result.navbar.find(val => val._id == req.query._id);
            req.session.result = fields;
            req.session._id = req.query._id;

            return Template["Fieldtype"].find();
        }).then((data) => {
            req.session.fieldtype = data;

            res.render("admin/database", req.session);
        })
    }

    add(req, res) {
        let { _id, ...input } = req.body;

        Navbar.findOne().then(function(data) {
            let index = data.navbar.findIndex(value => value._id == _id);
            
            if(input.rule){
                if(input.rule.indexOf(":") == -1){
                    input.rule = input.rule.split(",")
                }else{
                    input.rule = input.rule.split(",").map((val)=>{
                        var sql = val.split(":");
                        return{"v":sql[0],"t":sql[1]}
                    })
                }
                
            }
            // input.rule =input.rule?JSON.parse(input.rule):"";
            console.log("add==>",input);
            
            data.navbar[index].fields.push(input);
            data.save(function() {
                res.json({ code: 200 })
            })
        })
    }

    editPost(req, res) {
        let { _id, fieldsId, ...input } = req.body;
        Navbar.findOne().then(function(data) {
            let navbarIndex = data.navbar.findIndex(val => val._id == _id);
            let fieldsIndex = data.navbar[navbarIndex].fields.findIndex(val => val._id == fieldsId);
            // input.rule =input.rule?JSON.parse(input.rule):"";
            if(input.rule){
                if(input.rule.indexOf(":")==-1){
                    input.rule = input.rule.split(",")
                }else{
                    input.rule = input.rule.split(",").map((val)=>{
                        let sql = val.split(":");
                        return{"v":sql[0],"t":sql[1]}
                    })
                }
                console.log("editPost==>",input.rule);
                
            }

            for (var k in input) {
                data.navbar[navbarIndex].fields[fieldsIndex][k] = input[k]
            }
            data.save(function() {
                res.json({ code: 200 });
            })
        })
    }

    delPost(req, res) {
        console.log(req.body);
        let { navbarId, fieldsId } = req.body;
        Navbar.findOne({}).then((data) => {
            let navbarIndex = data.navbar.findIndex(val => val._id == navbarId);
            let fieldsIndex = data.navbar[navbarIndex].fields.findIndex(v => v._id == fieldsId);
            data.navbar[navbarIndex].fields.splice(fieldsIndex, 1);
            data.save(function() {
                res.json({ code: 200 });
            })
        })
    }
}

module.exports = databaseController;