// 继承
const adminController = require("./adminController");
const Template = require("../../models/Template");
const Navbar = require("../../models/Navbar");

class templateController extends adminController {
    constructor() {
        super(); //必须初始化父类的参数
        this.RouterAmdfunctionName = [
            ["get", "/template", "index", "模板功能"],
            ["get", "/template/add", "add", "添加功能"],
            ["post", "/template/add", "addPost", "添加功能"],
            ["get", "/template/edit", "edit", "修改功能"],
            ["post", "/template/edit", "editPost", "修改功能"],
            ["get", "/template/del", "del", "删除功能"],
            ["post", "/template/databaseList", "databaseList", "通过数据库获取数据库的名称"]
        ]
    }
    index(req, res) {
        // 将当前点击的模板的数据库名称保存到session中
        req.session.database = req.query.T ? req.query.T : req.session.database;

        Navbar.findOne().populate("navbar.fields.datatype").then(function(data) {

            // 找到该模板数据库的下标
            let index = data.navbar.findIndex(value => value.database == req.session.database);
            // 并将数据库的添加字段功能的名称保存的session中
            req.session.templateData = data.navbar[index].fields;
            return Template[req.session.database].find();
        }).then(function(data) {
            req.session.result = data;
            res.render("admin/template", req.session);
        })
    }
    add(req, res) {
        res.render("admin/templateAdd", req.session);
    }
    addPost(req, res) {
        let Model = Template[req.session.database];

        req.body.chbox = JSON.stringify(req.body.chbox);

        Model.insertMany(req.body, function(err, result) {

            if (err) {
                res.render("admin/error", { err: "数据操作失败", url: "/admin/template", date: 3000 })
            } else {
                res.redirect("/admin/template");
            }
        })
    }
    edit(req, res) {
        let Model = Template[req.session.database];
        Model.findOne({ _id: req.query._id }).then(function(data) {
            req.session.result = data;
            res.render("admin/templateEdit", req.session);
        })
    }
    editPost(req, res) {
        let { _id, ...input } = req.body;

        let Model = Template[req.session.database];

        Model.findOne({ _id }, function(err, result) {

            for (var k in input) {
                result[k] = input[k]
            }

            result.save(() => {
                res.redirect("/admin/template");
            })
        })
    }
    del(req, res) {
        let { _id } = req.query;
        let model = Template[req.session.database];
        model.deleteOne({ _id }, function(err, result) {
            if (err) {
                res.render("admin/error", { err: "数据操作失败", url: "/admin/template", date: 3000 })
            } else {
                res.redirect("/admin/template");
            }
        })
    }
    databaseList(req,res){
        Template[req.body.data].find().then((result)=>{
            res.json({code:200,message:"数据请求成功",result:result})
        })
    }
}

module.exports = templateController;