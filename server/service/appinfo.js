let AppInfo = require("../db/model/App");
//对model进行操作
const saveApp = function (appinfo, clientID) {
    let appInfo = new AppInfo({
        appName: appinfo.appName,
        userName: appinfo.userName,
        monitoringDomain: appinfo.monitoringDomain,
        createTime: Date.now(),
        appID: clientID,
    });
    return new Promise((resolve, reject) => {
        appInfo.save((error) => {
            try {
                resolve(true);
            } catch (error) {
                reject(false);
            }
        })
    });
}

const deleteApp = function (appID) {
    return new Promise((resolve, reject) => {
        AppInfo.deleteOne({ appID: appID }, (err) => {
            try {
                resolve(true);
            } catch (error) {
                reject(false);
            }
        })
    })
}

const findApp = function (domain, username) {
    return new Promise((resolve, reject) => {
        AppInfo.findOne({ monitoringDomain: domain, userName: username }, (err, result) => {
            try {
                if (result !== null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (error) {
                reject(error);
            }
        })
    })
}

const findAppByAppID = function (appID) {
    return new Promise((resolve, reject) => {
        AppInfo.findOne({ appID: appID }, (err, result) => {
            try {
                if (result !== null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (error) {
                reject(error);
            }
        })
    })
}

module.exports = { saveApp, findApp, deleteApp, findAppByAppID };