// 继承
const adminController = require("./adminController");
const Category = require("../../models/Category");

class categoryController extends adminController {
    constructor() {
        super(); //必须初始化父类的参数
        this.RouterAmdfunctionName = [
            ["get", "/category", "category", "分类功能"],
            ["get", "/category/add", "add", "分类添加功能"],
            ["post", "/category/add", "addPost", "分类添加功能"],
            ["get", "/category/del", "del", "分类删除功能"],
        ]
    }
    category(req, res) {
        Category.find({ isShow: true }).then(function(result) {
            req.session.result = result;
            res.render("admin/category", req.session);
        })
    }
    add(req, res) {
        res.render("admin/addCategory", req.session);
    }
    addPost(req, res) {
        let { categoryName } = req.body;
        Category.insertMany({ categoryName }, function(err, result) {
            if (err) {
                res.render("admin/error", { err: "数据添加失败", url: "/admin/category", date: 3000 });
            }
            res.redirect("/admin/category");
        })
    }
    del(req, res) {
        Category.findOne({ _id: req.query._id }, function(err, result) {
            if (err) {
                res.render("admin/error", { err: "数据查找失败", url: "/admin/category", date: 3000 });
            }
            result.isShow = false;
            result.save();
            res.redirect("/admin/category")
        })
    }
}

module.exports = categoryController;