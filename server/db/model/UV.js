var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UvInfo = new Schema({
    clientID: {
        type: String,
        required: true
    },
    appID: {
        type: String,
        required: true
    },
    ipAddr: {
        type: String,
        required: true
    },
    country: String,
    province: String,
    city: String,
    isp: String,
    os: String,
    screen: String,
    isPC:Boolean,
    bs: String,
    visitTime: {
        type: Date,
        required: true
    },

});

// 创建一个model
var UvInfo = mongoose.model("uvInfo", UvInfo);
module.exports = UvInfo;