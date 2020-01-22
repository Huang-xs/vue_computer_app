const md5 = require("md5");

module.exports = function(obj) {
    var data = true;

    for (var val in obj) {
        if (val == "username") {
            if (obj[val].length < 2 || obj[val] > 12) {
                data = false;
            }
        } else if (val == "password") {
            var reg = /^[a-zA-Z0-9]\w{5,17}$/;
            if (!reg.test(obj[val])) {
                data = false;
            }
        }
    }
    if (data) {
        obj.password = md5(obj["password"])
        return obj;
    } else {
        return false;
    }
}