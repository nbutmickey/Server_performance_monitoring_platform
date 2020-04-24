let APIInfo = require("../db/model/API");
let time = require("../utils/time");
let APIDao = require("../dao/apiDao");
const saveApi = function (apiinfo) {
    let api = new APIInfo({
        clientID: apiinfo.clientID,
        appID: apiinfo.appID,
        visitTime: apiinfo.visitTime,
        pageURL: apiinfo.pageURL,
        ua: apiinfo.ua,
        statusCode: apiinfo.statusCode,
        apiURL: apiinfo.apiURL,
        duration: apiinfo.duration,
        ip: apiinfo.ip,
        province: apiinfo.province,
        isp: apiinfo.isp,
        os: apiinfo.os,
        bs: apiinfo.bs,
        screen: apiinfo.screen,
        methods: apiinfo.methods
    })
    return new Promise((resolve, reject) => {
        api.save((err) => {
            try {
                resolve(true);
            } catch (error) {
                reject(false);
            }
        });
    })
}
const deleteAllApiByAppID = function (appID) {
    return new Promise((resolve, reject) => {
        APIInfo.deleteMany({ appID: appID }, (err) => {
            try {
                resolve(true);
            } catch (error) {
                reject(false);
            }
        });
    });
}


const getAPIToday = async function (appID) {
    try {
        let { yesTime, toTime, nowTime } = time.getToadyTimeDivider();
        let result = [];
        let yesTotal = await APIDao.getAPITotalCountByTime(appID, yesTime, toTime);
        let todayTotal = await APIDao.getAPITotalCountByTime(appID, toTime, nowTime);
        result.push({ title: "apiTotal", today: todayTotal, yesterday: yesTotal });
        let yesSuccessTotal = await APIDao.getAPISuccessCountByTime(appID, yesTime, toTime);
        let todaySuccessTotal = await APIDao.getAPISuccessCountByTime(appID, toTime, nowTime);
        result.push({ title: "apiSuccess", today: todaySuccessTotal, yesterday: yesSuccessTotal });
        let yesFailedTotal = await APIDao.getAPIFailedCountByTime(appID, yesTime, toTime);
        let todayFailedTotal = await APIDao.getAPIFailedCountByTime(appID, toTime, nowTime);
        result.push({ title: "apiFailed", today: todayFailedTotal, yesterday: yesFailedTotal });
        let yesSuccessDuration = await APIDao.getAPISuccessDurationByTime(appID, yesTime, toTime);
        let todaySuccessDuration = await APIDao.getAPISuccessDurationByTime(appID, toTime, nowTime);
        result.push({ title: "apiDuration", today: todaySuccessDuration.length === 0 ? 0 : todaySuccessDuration[0].duration, yesterday: yesSuccessDuration.length === 0 ? 0 : yesSuccessDuration[0].duration });
        return result;
    } catch (error) {
        throw error;
    }
}
const getAllRequestAPIByTime = async function (appID, sTime, eTime) {
    try {
        return await APIDao.getAllRequestAPIByTime(appID, sTime, eTime);
    } catch (error) {
        throw error;
    }
}
const getALLRequestFailedAPIByTime = async function (appID, sTime, eTime) {
    try {
        return await APIDao.getAllRequestFailedAPIByTime(appID, sTime, eTime);
    } catch (error) {
        throw error;
    }
}
const getSuccessAPIRateByTimeDivider = async function (appID, sTime, eTime, divider) {
    try {
        let allCount = await APIDao.getAllAPICountDividerByTime(appID, sTime, eTime, divider);
        let successCount = await APIDao.getSuccessAPICountDividerByTime(appID, sTime, eTime, divider);
        let result = [];
        for (let u of successCount) {
            let temp = allCount.filter(item =>  new Date(item.visitTime).getTime() === new Date(u.visitTime).getTime() )[0];
            //console.log(temp);
            result.push({ ...u, ...temp })
        }
        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
}
const getAPISuccessDurationByTimeDivider = async function (appID, sTime, eTime, divider) {
    try {
        return await APIDao.getSuccessAPIDurationDividerByTime(appID, sTime, eTime, divider);
    } catch (error) {
        throw error;
    }
}
const getAPIFailedDurationByTimeDivider = async function (appID, sTime, eTime, divider) {
    try {
        return await APIDao.getFailedAPIDurationDividerByTime(appID, sTime, eTime, divider);
    } catch (error) {
        throw error;
    }
}

const getAPIInfoByGroupType = async function (appID, sTime, eTime, groupType) {
    try {
        return await Performance.aggregate([
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
                    _id: "$" + groupType,
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    property: "$_id",
                    count: "$count"
                }
            },
            {
                $sort: {
                    count: 1
                }
            }
        ])
    } catch (error) {
        throw "数据异常"
    }
}

module.exports = { saveApi, getAPIToday, getAPIFailedDurationByTimeDivider, getAPISuccessDurationByTimeDivider, getSuccessAPIRateByTimeDivider, getAllRequestAPIByTime, getALLRequestFailedAPIByTime, getAPIInfoByGroupType, deleteAllApiByAppID }