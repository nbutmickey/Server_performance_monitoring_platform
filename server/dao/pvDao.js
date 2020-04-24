let PvInfo = require("../db/model/PV");
let utils = require("../utils/utils");
exports.getPVCountByTime = async function (appID, sTime, eTime) {
    try {
        return await PvInfo.countDocuments({ appID: appID, visitTime: { $gte: sTime, $lt: eTime } });
    } catch (error) {
        throw error;
    }
}
exports.getVisitorPath=async function(appID,clientID){
    try {
        return await PvInfo.aggregate([
            {
                $match: {
                    appID: appID,
                    clientID:clientID
                }
            },
            {
                $project: {
                    _id: 0,
                    url: "$pageURL",
                    time:"$visitTime"
                }
            }
        ])
    } catch (error) {
        throw error;
    }
}

exports.getPageTop=async function(appID,sTime,eTime){
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
                    uvList:{
                        $push:"$clientID"
                    },
                    pvList: {
                        $push: "$pageURL"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    page: "$_id",
                    pv: {
                        $size: "$pvList"
                    },
                    uv:{
                        $size: "$uvList"
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
        throw error   
    }
}
exports.getPVAndUVByDivider= async function (appID, sTime, eTime, divider) {
    try {
        let result=await PvInfo.aggregate([
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
                    pvList: {
                        $push: "$pageURL"
                    },
                    uvList:{
                        $push:"$clientID"
                    }
                },
            },
            {
                $project: {
                    _id: 0,
                    uvList:1,
                    pv: {
                        $size: "$pvList"
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
        result.forEach((item)=>{
            item.uv=utils.unique(item.uvList).length;
            delete item['uvList'];
        })

        return result;

    } catch (error) {
        throw error
    }
}

exports.getPVAndUVByGeo = async function (appID, sTime, eTime) {
    try {
       let result=await PvInfo.aggregate([
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
                    pvList:{$push:"$pageURL"},
                    uvList:{$push:"$clientID"}
                }
            },
            {
                $project: {
                    _id: 0,
                    province: "$_id",
                    pv:{
                        $size:"$pvList"
                    },
                    uvList:1
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ])
        result.forEach((item)=>{
            item.uv=utils.unique(item.uvList).length;
            delete item['uvList'];
        })
        return result;
    } catch (error) {
        throw error
    }
}
