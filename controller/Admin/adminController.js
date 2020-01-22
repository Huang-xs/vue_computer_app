// 继承
const Controller = require("../controller");
const user = require("../../models/User");
const md5 = require("../../function/md5");

const Navbar = require("../../models/Navbar");
const treeJson = require("../../function/treeJson");

class AdminController extends Controller {
    constructor() {
        super(); //必须初始化父类的参数
        this.RouterAmdfunctionName = [
            ["get", "/login", "login", "登录页面"],
            ["post", "/login", "loginInto", "登录页面"],
            ["use", null, "isLogin", "后台验证，判断是否为登录状态"],
            ["use", null, "common", "公共部分"],
            ["get", "/out", "out", "退出登录"],
            ["get", "/", "index", "首页模块"],
        ]
    }
    login(req, res) {
        res.render("admin/login")
    }
    loginInto(req, res) {
        let fields = md5(req.body);

        if (!fields) {
            res.render("admin/error", { err: "请输入正确用户名密码", url: "/admin/login", date: 3000 });
            return;
        }
        user.findOne({ username: fields.username }, (err, result) => {
            if (result != null && fields.password == result.password && result.isAdmin) {
                req.session.login = 1;
                req.session.username = fields.username;
                res.redirect("/admin");
            } else {
                res.render("admin/error", { err: "请输入正确用户名密码", url: "/admin/login", date: 3000 });
            }
        })
    }

    // 使用use类型，是无论为post请求还是给请求，都会经过这个路由
    isLogin(req, res, next) {
        //开发完后可删除，现在添加在这是为了方便开发，不用每一次都去登录
        // req.session.login = 1;
        // req.session.username = "admin";

        if (req.session.login == "1") {
            next();
        } else {
            res.redirect("/admin/login");
        }
    }
    common(req, res, next) {
        Navbar.findOne({}, function(err, result) {
            req.session.navbar = treeJson(result.navbar);
            next();
        })
    }
    out(req, res) {
        req.session.login = 0;
        req.session.username = null;
        res.redirect("/admin/login");
    }
    index(req, res) {
        res.render("admin/index", req.session);
    }
}
module.exports = AdminController;