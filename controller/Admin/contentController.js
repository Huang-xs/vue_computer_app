// 继承
const adminController = require("./adminController");
const Category = require("../../models/Category");
const Content = require("../../models/Content");
const upload = require("../../function/upload");
const fs = require("fs");

class contentController extends adminController {
    constructor() {
        super(); //必须初始化父类的参数
        this.RouterAmdfunctionName = [
            ["get", "/content", "index", "内容功能"],
            ["get", "/content/add", "add", "添加功能"],
            ["post", "/content/add", "addPost", "内容添加功能"],
            ["get", "/content/del", "del", "内容删除功能"],
            ["post", "/content/upload", "upload", "上传图片功能"],
            ["get", "/content/edit", "edit", "编辑功能"],
            ["post", "/content/edit", "editPost", "编辑功能"],
            ["post", "/content/uploadDel", "uploadDel", "删除图片功能"],
        ]
    }
    index(req, res) {
        Category.find({ isShow: true }).then(function(result) {
            req.session.category = result;
            return Content.find().populate("category");
        }).then(function(data) {
            req.session.result = data;
            res.render("admin/content", req.session)
        })
    }
    add(req, res) {
        res.render("admin/addContent", req.session)
    }

    addPost(req, res) {

        Content.insertMany(req.body, function(err, result) {
            if (err) {
                res.render("admin/error", { err: "内容插入失败", url: "/admin/content", date: 3000 });
                return;
            }
            res.redirect("/admin/content")
        })
    }
    del(req, res) {
        let id = req.query.id;
        Content.find().then(function(result) {
            var a = result.map((val, index) => {
                if (index == id) {
                    val.isDel = true;
                    val.save();
                }
            })

            res.redirect("/admin/content")


        })

    }
    upload(req, res) {
        upload.init(req, function(err, data) {
            if (err) {
                res.json({ code: "404", msg: "图片上传失败" });
                return;

            } else {
                res.json(data)
            }
        })
    }
    uploadDel(req, res) {
        fs.unlink(__dirname + "/../../" + req.body.url, function(err) {
            if (err) {
                res.send("0");
                return;
            }
            res.send("1");
        })

    }

    edit(req, res) {
        var _id = req.query._id;
        Content.findOne({ _id }, function(err, result) {
            req.session.result = result;
            res.render("admin/contentEdit", req.session);
        })

    }

    editPost(req, res) {
        let { _id, ...data } = req.body;

        Content.updateOne({ _id }, data, function(err, result) {
            if (err) {
                res.render("admin/error", { err: "内容数据更新失败", url: "/admin/content", date: 3000 });
                return;
            } else {
                res.redirect("/admin/content");
            }
        })
    }
}
module.exports = contentController;