// 继承
const Controller = require("../controller");
const md5 = require("../../function/md5");
const jwt = require("jsonwebtoken");
const banner = require("../../models/Banner");
const product = require("../../models/Product");

// 密钥
const tokenKey = "ni shi hei ke ma?";

class ApiController extends Controller {
    constructor() {
        super(); //必须初始化父类的参数
        this.RouterAmdfunctionName = [
            ["get", "/login", "login", "登录Api", true, "username=?&password=?"],
            ["get", "/register", "register", "登录Api", true, "username=?&password=?"],
            // ["use", null, "validate", "token验证",false],
            ["get", "/getData", "getData", "获取数据", true, "token=?&d=?&page=?&limit=?"],
            ["get", "/setData", "setData", "添加数据", true, "token=?&d=?&data=?"],
            ["get", "/delData", "delData", "删除数据", true, "token=?&d=?&_id=?"],
            ["get", "/editData", "editData", "修改数据", true, "token=?&d=?&page=?&data=?"],
        ]
    }
    index(req, res) {
        res.send("api模块");
    }

    /**
     * 登录功能api
     * @param {String} username 用户名
     * @param {Number} password 密码
     * @return {json} 数据
     * url=> http://127.0.0.1:3000/api/login?username=admin&password=123456
     */

    login(req, res) {
            let userinfo = md5(req.query);
            if (!userinfo) {
                res.json({ code: 201, massage: "请输入正确的信息" });
                return;
            }

            let { username, password } = userinfo;

            let token = jwt.sign(userinfo, tokenKey, { expiresIn: "1 days" });
            console.log(mongoModel);

            mongoModel["UserInfo"].findOne({ username }).then((result) => {
                console.log(result);
                if (result != null && password == result.password) {
                    res.json({ code: 200, message: "登录成功", result: { token } })
                } else {
                    res.json({ code: 201, message: "请输入正确信息" })
                }
            })

        }
        /**
         * 注册功能api
         * @param {string} username 用户名 
         * @param {string} password 密码
         * @return {json} 数据 
         * url=> http://127.0.0.1:3000/api/register?username=admin&password=123456
         */
    register(req, res) {
            let registInfo = md5(req.query);
            if (!registInfo) {
                res.json({ code: 201, message: "请输入正确信息" })
            }

            mongoModel["UserInfo"].findOne({ username: registInfo.username }).then((data) => {
                if (data) {
                    res.json({ code: 201, message: "请输入正确信息" })
                    return;
                }

                return mongoModel["UserInfo"].insertMany(registInfo)
            }).then(function(result) {
                if (result) {
                    res.json({ code: 200, message: "注册成功" });
                } else {
                    res.json({ code: 201, message: "请输入正确信息" });
                }
            }).catch((err) => {
                res.json({ code: 201, message: "请输入正确信息" });
                return;
            })
        }
        /**
         * 验证是否有token值
         * 注意:必须登录
         */
    validate(req, res, next) {
            let valToken = req.query.token;
            let database = req.query.d || ""; //获取要获取数据的数据库
            if (!database) {
                res.json({ code: 201, message: "请输入正确信息" });
                return;
            }
            console.log(valToken);
            // 判断token是否报错
            try {
                var tokendata = jwt.verify(valToken, tokenKey);

            } catch (err) {
                res.json({ code: 201, message: "请输入正确信息" });
                return
            }

            mongoModel["UserInfo"].findOne({ username: tokendata.username }).then((data) => {
                if (data && data.password == tokendata.password) {
                    next();
                } else {
                    res.json({ code: 201, message: "请输入正确信息" });
                }
            })
        }
        /**
         * 查询数据
         * @param {String} token 令牌
         * @param {String} d 数据库
         * @param {String} data 参数
         * @param {Number} page 页面
         * @param {Number} limit 数据数量
         * @return {JSON} 返回的数据
         * 
         */
        //http://127.0.0.1:3000/api/getdata?d=Fieldtype&page=0&limit=2
    getData(req, res) {

            let result = {};
            // let { token = "", d, page = 0, limit = 10, ...findData } = req.query;
            let database = req.query.d || ""; //获取要获取数据的数据库

            let page = parseInt(req.query.page) || 0;
            let limit = parseInt(req.query.limit) || 10;
            console.log(mongoModel);

            mongoModel[database]
                .find({}) //要查找的数据
                .limit(limit) //获取数据的条数
                .skip(page * limit) //游标.获取数据的位置
                .sort({ _id: -1 }) //（排序：{key:数据对象:(-1升序，1降序)）
                .then((data) => {
                    // 将获取到的数据添加到空对象中
                    result["result"] = database == "Navbar" ? data[0].navbar : data;

                    return mongoModel[database].find().countDocuments();
                }).then((num) => {
                    // 给数据设置限定的页数
                    result["page"] = Math.ceil(num / limit);
                    res.json({ code: 200, message: "获取数据成功", result })
                }).catch((err) => {
                    res.json({ code: 201, message: "请输入正确信息" });
                })
        }
        // 增
        /**
         * 添加数据  
         * @param {string} token 令牌
         * @param {string} d   数据库 
         * @param {string} data  参数 
         * @return {json}  返回数据 
         */
    setData(req, res) {
            let { d, token, ...data } = req.query;
            mongoModel[d].insertMany(data, function(err, result) {
                if (err) {
                    res.json({ code: 201, message: "请输入正确信息" });
                    return;
                }
                res.json({ code: 200, message: "数据请求成功" })
            })
        }
        // 删
        /**
         * 删除数据  
         * @param {string} token 令牌
         * @param {string} d   数据库 
         * @param {string} _id  删除数据id
         * @return {json}  返回数据 
         */
    delData(req, res) {
            let { d, _id } = req.query;
            if (d == "NavbarInfo") {
                res.json({ code: 201, message: "请输入正确信息" });
                return;
            }
            mongoModel[d].deleteOne({ _id }, (err) => {
                if (err) {
                    res.json({ code: 201, message: "请输入正确信息" });
                    return;
                }
                res.json({ code: 200, message: "数据删除成功" })
            })
        }
        // 改
        /**
         * 修改数据  
         * @param {string} token 令牌
         * @param {string} d   数据库 
         * @param {string} _id  修改数据id
         * @param {string} data  修改数据
         * @return {json}  返回数据 
         */
    editData(req, res) {
        let { d, _id, token, ...data } = req.query;

        mongoModel[d].updateOne({ _id }, data, (err, result) => {
            if (err) {
                res.json({ code: 201, message: "请输入正确信息" });
                return;
            }
            res.json({ code: 200, message: "数据修改成功", result })
        })

    }
}
module.exports = ApiController;