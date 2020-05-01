let AppInfo = require("../db/model/App");
let time=require("../utils/time");

//对model进行操作
const saveApp = function (appinfo, appID) {
    let appInfo = new AppInfo({
        appName: appinfo.appName,
        userName: appinfo.userName,
        monitoringDomain: appinfo.monitoringDomain,
        createTime: time.getStandardTime(),
        appID: appID,
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


// const findAppIDList =function(){
//     return new Promise((resolve,reject)=>{
//         AppInfo.findMany()
//     })
// }


const findAllAppInfoByUserName=function(userName){
    return new Promise((resolve,reject)=>{
        AppInfo.find({userName:userName},(err,result)=>{
            try {
                resolve(result);
            } catch (error) {
                reject(error);
            }
        })
    })
}

const findApp = function (domain, username) {
    return new Promise((resolve, reject) => {
        AppInfo.findOne({ monitoringDomain: domain, userName: username }, (err, result) => {
            try {
                console.log(result);
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

const findAllAPPList=async function(){
    try {
        return await AppInfo.aggregate([
            {
                $project: {
                    _id: 0,
                    appID:"$appID",
                    createTime: "$createTime"
                }
            }
        ])
    } catch (error) {
        throw error;
    }
}



module.exports = {findAllAPPList,findAllAppInfoByUserName, saveApp,findApp, deleteApp, findAppByAppID };