let APIInfo=require("../db/model/API");
const saveApi=function (apiinfo) {
    let api=new APIInfo({
        clientID:apiinfo.clientID,
        appID:apiinfo.appID,
        visitTime:apiinfo.visitTime,
        pageURL:apiinfo.pageURL,
        ua:apiinfo.ua,
        statusCode:apiinfo.statusCode,
        apiURL:apiinfo.apiURL,
        duration:apiinfo.duration,
        os:apiinfo.os,
        bs:apiinfo.bs,
        screen:apiinfo.screen
    })
    return new Promise((resolve,reject)=>{
        api.save((err)=>{
            try {
                resolve(true);
            } catch (error) {
                reject(false);
            }
        });
    })
}

const deleteAllApiByAppID=function (appID) {
    return new Promise((resolve,reject)=>{
        APIInfo.deleteMany({appID:appID},(err)=>{
            try {
                resolve(true);
            } catch (error) {
                reject(false);
            }
        });
    });
}

module.exports={saveApi,deleteAllApiByAppID}