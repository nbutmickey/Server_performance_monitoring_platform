let PvInfo = require("../db/model/PV");
let UvInfo = require("../db/model/UV");

exports.getAPISuccessDuration=async function (model,appID,sTime,eTime) {
    try {
       return  await model.aggregate([
            {
                $match: {
                    visitTime: {
                        $gte: sTime,
                        $lt: eTime
                    },
                    statusCode: { $gte: 200, $lt: 400 },
                    appID: appID
                }
            },
            {
                $group: {
                    _id: null,
                    duration: {
                        $avg: "$duration"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    duration: 1
                }
            }
        ]);
    } catch (error) {
        throw "数据异常"
    }
}

exports.getKeyPerTodayDao = async function (model, appID,sTime, eTime) {
    try {
        return await model.aggregate([
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
                    _id: null,
                    fpt: {
                        $avg: "$performanceDetail.fpt"
                    },
                    ready: {
                        $avg: "$performanceDetail.ready"
                    },
                    tti: {
                        $avg: "$performanceDetail.tti"
                    },
                    load: {
                        $avg: "$performanceDetail.load"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    fpt: 1,
                    ready: 1,
                    tti: 1,
                    load: 1
                }
            }
        ])
    } catch (error) {
        throw "数据异常"
    }
}

exports.getPVAndUVByGeoDao = async function (model, appID, sTime, eTime) {
    try {
        return await model.aggregate([
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
                    _id: "$province",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    province: "$_id",
                    count: "$count"
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ])
    } catch (error) {
        throw "数据异常"
    }
}

exports.getPVAndUVByDividerDao = async function (model, appID, sTime, eTime, divider) {
    try {
        return await model.aggregate([
            {
                $match: {
                    visitTime: {
                        $gte: sTime,
                        $lt: eTime
                    },
                    appID: appID
                },
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
                    pageList: {
                        $push: "$pageURL"
                    }
                },
            },
            {
                $project: {
                    _id: 0,
                    count: {
                        $size: "$pageList"
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