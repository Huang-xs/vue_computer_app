const formidable = require("formidable");
const fs = require("fs");
const sd = require("silly-datetime");
const path = require("path");

exports.init = function(req, callback) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./uploads"; //设置上传图片地址
    form.parse(req, function(err, fields, files) {
        if (err) {
            callback(err, null);
            return;
        }
        console.log(files);

        //判断如果没有图片直接输出数据
        if (!("picture" in files)) {
            callback(null, fields);
            return;
        }


        // 图片名称:时间戳+随机数+后缀名
        let tt = sd.format(new Date(), "YYYYMMDDHHmmss");
        let rr = parseInt(Math.random() * 89999 + 10000);
        let ext = path.extname(files.picture.name);

        // 获取旧路径
        let oldPath = __dirname + '/../' + files.picture.path;
        // 获取新路径
        let newPath = __dirname + "/../uploads/" + tt + rr + ext;

        // 修改文件名称
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                callback(err, null);
                return;
            }
            // 添加数据到data
            fields.picture = "/uploads/" + tt + rr + ext;
            callback(null, fields);
        })

    })
}