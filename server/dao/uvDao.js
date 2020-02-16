let UVInfo = require("../db/model/UV");
exports.getUVCountByTime=async function(appID,sTime,eTime){
    try {
        return await UVInfo.countDocuments({ appID: appID, visitTime: { $gte: sTime, $lt: eTime } });
    } catch (error) {
        throw error;
    }
}

exports.getClientInfoBuGroupType=async function(appID,sTime,eTime,groupType){
    try {
        return await UvInfo.aggregate([
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
                    _id: "$"+groupType,
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    type: "$_id",
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
        throw error
    }
}