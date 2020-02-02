let PvInfo = require("../db/model/PV");

const savePv = function (pvdata) {
    let pvTemp = new PvInfo({
        clientID: pvdata.clientID,
        appID: pvdata.appID,
        visitTime: pvdata.visitTime,
        pageURL: pvdata.pageURL,
        referrer: pvdata.referrer,
        ua:pvdata.ua,
        os:pvdata.os,
        bs:pvdata.bs,
        screen:pvdata.screen,
        isPC:pvdata.isPC
    })
    return new Promise((resolve, reject) => {
        pvTemp.save((err) => {
            try {
                resolve(true);
            } catch (error) {
                reject(false);
            }
        })
    });
}

const deleteAllPvByAppID=function (appID) {
    return new Promise((resolve,reject)=>{
        PvInfo.deleteMany({appID:appID},(err)=>{
            try {
                resolve(true)
            } catch (error) {
                reject(false)
            }
        })
    })
}

module.exports = { savePv,deleteAllPvByAppID};