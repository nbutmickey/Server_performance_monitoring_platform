let PvInfo = require("../db/model/PV");
let time = require("../utils/time");
let PVDao=require("../dao/pvDao");
let UVDao=require("../dao/uvDao");
let PerformanceDao=require("../dao/performanceDao");
let APIDao=require("../dao/apiDao");
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

const getTodayGeneral=async function(appID){
    try {
        let result=[];
        let { yesTime, toTime, nowTime } = time.getToadyTimeDivider();
        let todayPV=await PVDao.getPVCountByTime(appID,toTime,nowTime);
        let yesterdayPV=await PVDao.getPVCountByTime(appID,yesTime,toTime);
        result.push({title:'pv',today:todayPV,yesterday:yesterdayPV});
        let todayUV=await UVDao.getUVCountByTime(appID,toTime,nowTime);
        let yesterdayUV=await UVDao.getUVCountByTime(appID,yesTime,toTime);
        result.push({title:'uv',today:todayUV,yesterday:yesterdayUV});
        let todayLoad=await PerformanceDao.getPerLoadTimeByTime(appID,toTime,nowTime);
        let yesterdayLoad=await PerformanceDao.getPerLoadTimeByTime(appID,yesTime,toTime);
        result.push({title:'load',today:todayLoad.length===0?0:todayLoad[0].load,yesterday:yesterdayLoad.length===0?0:yesterdayLoad[0].load});
        let todayAPISuccess=await APIDao.getAPISuccessCountByTime(appID,toTime,nowTime);
        let yesterdayAPISuccess=await APIDao.getAPISuccessCountByTime(appID,yesTime,toTime);
        result.push({title:'api',today:todayAPISuccess,yesterday:yesterdayAPISuccess});
        return result;
    } catch (error) {
        throw error
    }
}

/*获取各时间段的PV*/
const getPvAndUvNumByDivider = async function (appID, sTime, eTime, divider) {
    try {
        let result=PVDao.getPvAndUvNumByDivider(appID,sTime,eTime,divider);
        return result;
    } catch (error) {
        throw error
    }
    
}

/*获取TOP页面数据*/
const getPageTop = async function (appID, sTime, eTime) {
    try {
        let result=await PVDao.getPageTop(appID,sTime,eTime);
        return result;
    } catch (error) {
        throw error;
    }
}

/*根据地理位置获取PV数量*/
const getPvAndUvNumByGeo = async function (appID, sTime, eTime) {
    try {
       return PVDao.getPVAndUVByGeo(appID,sTime,eTime);
    } catch (error) {
        throw error        
    }
}

module.exports = { savePv,getTodayGeneral, getPvAndUvNumByGeo, deleteAllPvByAppID, getPageTop,  getPvAndUvNumByDivider };