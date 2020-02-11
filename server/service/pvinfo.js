let PvInfo = require("../db/model/PV");
let UvInfo = require("../db/model/UV");
let time = require("../utils/time");
let dao=require("../utils/dao")
/*存储PV数据*/
const savePv = function (pvdata) {
    try {
        let pvTemp = new PvInfo({
            clientID: pvdata.clientID,
            appID: pvdata.appID,
            visitTime: pvdata.visitTime,
            pageURL: pvdata.pageURL,
            referrer: pvdata.referrer,
            ip: pvdata.ip,
            province: pvdata.province,
            ua: pvdata.ua,
            os: pvdata.os,
            bs: pvdata.bs,
            screen: pvdata.screen,
            isPC: pvdata.isPC
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
    } catch (error) {
        throw "插入数据异常"
    }   
}
/*根据appID删除所有PV信息*/
const deleteAllPvByAppID = function (appID) {
    return new Promise((resolve, reject) => {
        PvInfo.deleteMany({ appID: appID }, (err) => {
            try {
                resolve(true)
            } catch (error) {
                reject(false)
            }
        })
    })
}

/*获取当日PV和UV量*/
const getPVAndUVNumToday = async function (appID) {
    try {
        let { yesTime, toTime, nowTime } = time.getToadyTimeDivider();
        let yesPV = await PvInfo.countDocuments({ appID: appID, visitTime: { $gte: yesTime, $lt: toTime } }).exec();
        let todayPV = await PvInfo.countDocuments({ appID: appID, visitTime: { $gte: toTime, $lt: nowTime } }).exec();
        let yesUV = await UvInfo.countDocuments({ appID: appID, visitTime: { $gte: yesTime, $lt: toTime } }).exec();
        let todayUV = await UvInfo.countDocuments({ appID: appID, visitTime: { $gte: toTime, $lt: nowTime } }).exec();
        return {
            pv: {
                yesPV,
                todayPV
            },
            uv: {
                yesUV,
                todayUV
            }
        }
    } catch (error) {
        throw "数据异常"
    }
}

/*获取各时间段的PV*/
const getPvAndUvNumByDivider = async function (appID, sTime, eTime, divider) {
    try {
        let UvResult=await dao.getPVAndUVByDividerDao(UvInfo,appID,sTime,eTime,divider);
        let PvResult=await dao.getPVAndUVByDividerDao(PvInfo,appID,sTime,eTime,divider);
        return {
            PvResult,
            UvResult
        }
    } catch (error) {
        throw error
    }
    
}

/*获取TOP页面数据*/
const getPageTop = async function (appID, sTime, eTime) {
    try {
        return await PvInfo.aggregate([
            {
                $match: {
                    visitTime: {
                        $gte: sTime,
                        $lt: eTime
                    },
                    appID: appID
                }
            },
            {
                $group: {
                    _id: "$pageURL",
                    pageList: {
                        $push: "$pageURL"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    page: "$_id",
                    count: {
                        $size: "$pageList"
                    }
                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            {
                $limit: 8
            }
        ]);
    } catch (error) {
        throw "数据异常"   
    }
}

/*根据地理位置获取PV数量*/
const getPvAndUvNumByGeo = async function (appID, sTime, eTime) {
    try {
        let UvResult=await dao.getPVAndUVByGeoDao(UvInfo,appID,sTime,eTime);
        let PvResult=await dao.getPVAndUVByGeoDao(PvInfo,appID,sTime,eTime);
        return {
            PvResult,
            UvResult
        }
    } catch (error) {
        throw error        
    }
}

module.exports = { savePv, getPvAndUvNumByGeo, deleteAllPvByAppID, getPageTop, getPVAndUVNumToday, getPvAndUvNumByDivider };