var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AppInfo = new Schema({
    appID: {
        type: String,
        required: true
    },
    appName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    monitoringDomain: {
        type: String
    },
    createTime:Date,
    
})

// 创建一个model
var AppInfo = mongoose.model("AppInfo", AppInfo);
module.exports = AppInfo;