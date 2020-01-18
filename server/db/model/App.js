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
    createTime: {
        type: Date,
    }
})

// 创建一个model
var AppInfo = mongoose.model("AppInfo", AppInfo);

//对model进行操作
const saveApp = function (appInfo) {
    return new Promise((resolve, reject) => {
        appInfo.save((err) => {
            if (err) {
                console.log(err);
                reject(false);
            }
            resolve(true);
        })
    });
}

const deleteApp = function (appID) {
    return new Promise((resolve, reject) => {
        AppInfo.deleteOne({ appID: appID }, (err) => {
            if (err) {
                reject(err);
            }
            resolve(true);
        })
    })
}

const findApp = function (domain, username) {
    return new Promise((resolve, reject) => {
        AppInfo.findOne({ monitoringDomain: domain, userName: username }, (err, result) => {
            if (err) {
                reject(err);
            }
            if (result !== null) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    })
}

const findAppByAppID=function (appID) {
    return new Promise((resolve, reject) => {
        AppInfo.findOne({appID: appID }, (err, result) => {
            if (err) {
                reject(err);
            }
            if (result !== null) {
                resolve(true);
            } else {
                resolve(false);
            }
        })
    })
}


module.exports = { AppInfo, saveApp, findApp, deleteApp ,findAppByAppID };