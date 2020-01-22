// 继承
const Controller = require("../controller");
const Api = require("../Api/apiController");
const ApiArr = new Api();

class ApiController extends Controller {
    constructor() {
        super(); //必须初始化父类的参数
        this.RouterAmdfunctionName = [
            ["get", "/api", "api", "api接口"],

        ]
    }
    api(req, res) {
        req.session.result = ApiArr.RouterAmdfunctionName;
        res.render("admin/api", req.session);
    }


}
module.exports = ApiController;