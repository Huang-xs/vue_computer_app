const jwt = require("jsonwebtoken");


let userInfo = {
    name: "zhangsan",
    admin: true,
    iat: Math.floor(Date.now() / 1000) - 30
}

let key = "yaoshidailema";

const token = jwt.sign(userInfo, key);
console.log(token);

const decode = jwt.verify(token, key);
console.log(decode);