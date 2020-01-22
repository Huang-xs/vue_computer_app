// 继承
const Controller = require("../controller");


class MainController extends Controller {
    constructor() {
        super(); //必须初始化父类的参数
        this.RouterAmdfunctionName = [
            ["get", "/", "login", "登录Api"],
            ["get", "/index", "index", "登录Api"],
            ["get", "/register", "register", "登录Api"],
        ]
    }
    login(req, res) {
        res.render("main/login", req.session);
    }
    index(req, res) {
        res.render("main/index", req.session);
    }
    register(req,res){
        res.render("main/register",req.session)
    }
}
module.exports = MainController;