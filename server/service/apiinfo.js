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
        let result=[];
        let yesTotal=await APIDao.getAPITotalCountByTime(appID,yesTime,toTime);
        let todayTotal=await APIDao.getAPITotalCountByTime(appID,toTime,nowTime);
        result.push({title:"apiTotal",today:todayTotal,yesterday:yesTotal});
        let yesSuccessTotal=await APIDao.getAPISuccessCountByTime(appID,yesTime,toTime);
        let todaySuccessTotal=await APIDao.getAPISuccessCountByTime(appID,toTime,nowTime);
        result.push({title:"apiSuccess",today:todaySuccessTotal,yesterday:yesSuccessTotal});
        let yesFailedTotal=await APIDao.getAPIFailedCountByTime(appID,yesTime,toTime);
        let todayFailedTotal=await APIDao.getAPIFailedCountByTime(appID,toTime,nowTime);
        result.push({title:"apiFailed",today:todayFailedTotal,yesterday:yesFailedTotal});
        let yesSuccessDuration=await APIDao.getAPISuccessDurationByTime(appID,yesTime,toTime);
        let todaySuccessDuration=await APIDao.getAPISuccessDurationByTime(appID,toTime,nowTime);
        result.push({title:"apiDuration",today:todaySuccessDuration.length===0?0:todaySuccessDuration[0].duration,yesterday:yesSuccessDuration.length===0?0:yesSuccessDuration[0].duration});
        return result;
    } catch (error) {
        throw error;
    }
}
const getFailAPITop = async function (appID, sTime, eTime) {
    try {
        return await APIInfo.aggregate([
            {
                $match: {
                    visitTime: {
                        $gte: sTime,
                        $lt: eTime
                    },
                    appID: appID,
                    statusCode: {
                        $gte: 400,
                        $lt: 600
                    }
                }
            },
            {
                $group: {
                    _id: "$apiURL",
                    apiList: {
                        $push: "$apiURL"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    apiURL: "$_id",
                    duration: {
                        $avg: "$duration"
                    },
                    count: {
                        $size: "$apiList"
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
        ])
    } catch (error) {
        throw "数据异常"
    }
    
}
const getSuccessAPIByDivider = async function (appID, sTime, eTime, divider) {
   try {
    return await PvInfo.aggregate([
        {
            $match: {
                visitTime: {
                    $gte: sTime,
                    $lt: eTime
                },
                appID: appID,
                statusCode: {
                    $gte: 200,
                    $lt: 400
                }
            }
        },
        {
            $group: {
                _id: {
                    $subtract: [
                        {
                            $subtract: ["$visitTime", new Date(0)]
                        },
                        {
                            $mod: [
                                {
                                    $subtract: ["$visitTime", new Date(0)]
                                },
                                divider
                            ]
                        }]
                },
                apiList: {
                    $push: "$apiURL"
                }
            },
        },
        {
            $project: {
                _id: 0,
                count: {
                    $size: "$apiList"
                },
                visitTime: {
                    $add: [new Date(0), "$_id"]
                }
            },
        },
        {
            $sort: {
                visitTime: 1
            }

        }
    ])
   } catch (error) {
       throw "数据异常"
   }
}
const getFailAPIByDivider = async function (appID, sTime, eTime, divider) {
    try {
        return await PvInfo.aggregate([
            {
                $match: {
                    visitTime: {
                        $gte: sTime,
                        $lt: eTime
                    },
                    appID: appID,
                    statusCode: {
                        $gte: 400,
                        $lt: 600
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $subtract: [
                            {
                                $subtract: ["$visitTime", new Date(0)]
                            },
                            {
                                $mod: [
                                    {
                                        $subtract: ["$visitTime", new Date(0)]
                                    },
                                    divider
                                ]
                            }]
                    },
                    apiList: {
                        $push: "$apiURL"
                    }
                },
            },
            {
                $project: {
                    _id: 0,
                    count: {
                        $size: "$apiList"
                    },
                    visitTime: {
                        $add: [new Date(0), "$_id"]
                    }
                },
            },
            {
                $sort: {
                    visitTime: 1
                }
    
            }
        ])
    } catch (error) {
        throw "数据异常"
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

module.exports = { saveApi, getAPIToday, getFailAPITop, getSuccessAPIByDivider, getFailAPIByDivider, getAPIInfoByGroupType, deleteAllApiByAppID }