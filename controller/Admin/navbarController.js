const adminController = require("../Admin/adminController");
const Navbar = require("../../models/Navbar");
const tree = require("../../function/tree");
const treeJson = require("../../function/treeJson");

class navbarController extends adminController {
    constructor() {
        super();
        this.RouterAmdfunctionName = [
            ["get", "/navbar", "index", "导航功能"],
            ["get", "/navbar/add", "add", "跳转导航添加功能"],
            ["post", "/navbar/add", "addPost", "导航添加功能"],
            ["get", "/navbar/edit", "edit", "导航修改功能"],
            ["post", "/navbar/edit", "editPost", "导航修改提交"],
            ["get", "/navbar/del", "del", "导航删除"],
        ]
    }

    index(req, res) {
        Navbar.findOne({}, function(err, result) {
            req.session.result = tree(result.navbar);
            res.render("admin/navbar", req.session)
        })
    }

    add(req, res) {
        Navbar.findOne({}, function(err, result) {
            req.session.levels = tree(result.navbar);
            res.render("admin/addNavbar", req.session)
        })
    }

    addPost(req, res) {
        let bodyObj = req.body;

        Navbar.findOne({}, function(err, result) {
            //给请求回来的数据添加id   
            bodyObj.id = result.count || 1;

            result.count += 1; //给导航条数增加1

            result.navbar.push(bodyObj); // 将添加好id的导航对象添加到数据库的数组中
            result.save(function() {
                res.redirect("/admin/navbar");
            });
        })

        // Navbar.insertMany(req.body, function(err, result) {
        //     if (err) {
        //         res.render("admin/error", { err: "数据插入失败", url: "/admin/navbar", date: 3000 })
        //         return;
        //     }
        //     res.redirect("/admin/navbar");
        // })
    }
    edit(req, res) {

        Navbar.findOne({}).then(function(result) {
            req.session.levels = tree(result.navbar);
            return result.navbar.find(value => value._id == req.query._id)
        }).then(function(data) {
            req.session.result = data;

            res.render("admin/navbarEdit", req.session);
        }).catch(err => {
            throw Error(err);
        })
    }
    editPost(req, res) {

        let { _id, ...input } = req.body;

        Navbar.findOne({}).then(data => {
            let objIndex = data.navbar.findIndex(val => val._id == _id)
            for (let i in input) {
                data.navbar[objIndex][i] = input[i];
            }
            data.save(function() {
                res.redirect("/admin/navbar");
            })
        })
    }

    del(req, res) {
        let _id = req.query._id;
        Navbar.findOne({}, (err, result) => {
            let index = result.navbar.findIndex(val => val._id == _id);
            result.navbar[index].isShow = false;
            result.save(function() {
                res.redirect("/admin/navbar");
            })
        })
    }
}

module.exports = navbarController;