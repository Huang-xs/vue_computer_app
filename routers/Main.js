const express = require("express");
const router = express.Router();
const fs = require("fs");


// 实例化函数类
function NObject(classfn) {
    return new classfn();
}

fs.readdir("./controller/Main/", function(err, files) {
    for (let i = 0; i < files.length; i++) {
        const createObj = NObject(require("../controller/Main/" + files[i]));

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