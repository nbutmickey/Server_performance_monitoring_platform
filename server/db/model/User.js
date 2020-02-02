var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userInfo = new Schema({
    username: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    create_time:Date
})

// 创建一个model
var UserInfo = mongoose.model("userInfo", userInfo);

module.exports = UserInfo;