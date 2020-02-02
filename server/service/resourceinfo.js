let Resource = require("../db/model/Resource");

const saveResource = (resourceInfo) => {
    let resInfo = new Resource({
        clientID: resourceInfo.clientID,
        appID: resourceInfo.appID,
        visitTime: resourceInfo.visitTime,
        detail: resourceInfo.detail
    })
    return new Promise((resolve, reject) => {
        resInfo.save((err) => {
            try {
                resolve(true);
            } catch (error) {
                reject(false);
            }
        })
    })
}


const deleteAllresByAppID=(appID)=>{
    return new Promise((resolve,reject)=>{
        Resource.deleteMany({appID:appID},(err)=>{
            try {
                resolve(true);
            } catch (error) {
                reject(false);
            }
        });
    });
}

module.exports = { saveResource,deleteAllresByAppID };