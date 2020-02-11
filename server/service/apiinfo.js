let APIInfo = require("../db/model/API");
let time = require("../utils/time");
let dao = require("../utils/dao");
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
        let yesTotal = await APIInfo.countDocuments({ appID: appID, visitTime: { $gte: yesTime, $lt: toTime } }).exec();
        let todayTotal = await APIInfo.countDocuments({ appID: appID, visitTime: { $gte: yesTime, $lt: nowTime } }).exec();
        let yesSuccessTotal = await APIInfo.countDocuments({ appID: appID, visitTime: { $gte: yesTime, $lt: toTime }, statusCode: { $gte: 200, $lt: 400 } }).exec();
        let todaySuccessTotal = await APIInfo.countDocuments({ appID: appID, visitTime: { $gte: yesTime, $lt: nowTime }, statusCode: { $gte: 200, $lt: 400 } }).exec();
        let yesFailTotal = await APIInfo.countDocuments({ appID: appID, visitTime: { $gte: yesTime, $lt: toTime }, statusCode: { $gte: 400, $lt: 600 } }).exec();
        let todayFailTotal = await APIInfo.countDocuments({ appID: appID, visitTime: { $gte: yesTime, $lt: toTime }, statusCode: { $gte: 400, $lt: 600 } }).exec();
        let yesDuration = await dao.getAPISuccessDuration(APIInfo, appID, yesTime, toTime);
        let todayDuration = await dao.getAPISuccessDuration(APIInfo, appID, toTime, nowTime);
        return {
            total: {
                yesTotal,
                todayTotal
            },
            successTotal: {
                yesSuccessTotal,
                todaySuccessTotal
            },
            failTotal: {
                yesFailTotal,
                todayFailTotal
            },
            duration: {
                yesDuration,
                todayDuration,
            }
        }
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