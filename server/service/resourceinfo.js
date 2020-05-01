let Resource = require("../db/model/Resource");
let ResourceDao = require("../dao/resourceDao");
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

const deleteAllResByTime=function(sTime){
    return new Promise((resolve,reject)=>{
        Resource.deleteMany({visitTime:{$lt: sTime}},(err)=>{
            try {
                resolve(true);
            } catch (error) {
                reject(false);
            }
        })
    })
  }

const getResDetailByType=async (appID,sTime,eTime,type)=>{
    try {
        return await ResourceDao.getResDetailByType(appID,sTime,eTime,type);
    } catch (error) {
        throw error;
    }
}

const getResDetailByURL=async (appID,url)=>{
    
    try {
        return await ResourceDao.getResDetailByUrl(appID,url);
    } catch (error) {
        throw error;
    }
}

const getResInfo=async (appID)=>{
    try {
        let countInfo = await ResourceDao.getResCount(appID);
        let fileSizeInfo=await ResourceDao.getResFileSize(appID);
        let durationInfo=await ResourceDao.getResDuration(appID);
        let result={};
        result.fileSize=fileSizeInfo;
        result.resDuration=durationInfo;
        result.resNum=countInfo;
        return result;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getResDetailByType, 
    getResDetailByURL,
    getResInfo,
    saveResource,
    deleteAllresByAppID,
    deleteAllResByTime
 };