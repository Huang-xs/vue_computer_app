const express = require("express");
const router = express.Router();
const fs = require("fs");

// 通过不同的路由类型来思想对数据库的增删改查，
// 但当路由特别多的时候，会出现写很多重复的代码，所以封装了下面的处理方法

// const adminController = require("../controller/Admin/adminController");

// router.get("/", adminController.index)
// router.get("/add", adminController.add)
// router.get("/edit", adminController.edit)
// router.get("/del", adminController.del)


// 实例化函数类
function NObject(classfn) {
    return new classfn();
}

// 利用fs模块读取controller中的后台控制器的方法
fs.readdir("./controller/Admin/", function(err, files) {
    for (let i = 0; i < files.length; i++) {
        const createObj = NObject(require("../controller/Admin/" + files[i]));

        // 获取每个控制器中创建的方法
        let routerName = createObj.RouterAmdfunctionName;
        for (let j = 0; j < routerName.length; j++) {
            switch (routerName[j][0]) {
                case "get":
                    router.get(routerName[j][1], createObj[routerName[j][2]])
                    break;
                case "post":
                    router.post(routerName[j][1], createObj[routerName[j][2]])
                    break;
                case "use":
                    if (routerName[j][1]) {
                        router.use(routerName[j][1], createObj[routerName[j][2]])
                    } else {
                        router.use(createObj[routerName[j][2]])
                    }
                    break;
            }
        }
    }

})
module.exports = router;