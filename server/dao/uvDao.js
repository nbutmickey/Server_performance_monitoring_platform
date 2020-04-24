let UVInfo = require("../db/model/UV");
exports.getUVCountByTime=async function(appID,sTime,eTime){
    try {
        return await UVInfo.countDocuments({ appID: appID, visitTime: { $gte: sTime, $lt: eTime } });
    } catch (error) {
        throw error;
    }
}

exports.getVisitorList=async function(appID){
    try {
        return await UVInfo.aggregate([
            {
                $match: {
                    appID: appID
                }
            },
            {
                $project: {
                    _id: 0,
                    clientID: "$clientID",
                    province:"$province",
                    baseInfo:{
                        ip: "$ipAddr",
                        country:"$country",
                        province: "$province",
                        city:"$city",
                        os:"$os",
                        bs:"$bs",
                        isp:"$isp",
                        screen:"$screen"
                    }
                }
            }])
    } catch (error) {
        throw error;
    }
}

exports.getClientInfoBuGroupType=async function(appID,sTime,eTime,groupType){
    try {
        return await UVInfo.aggregate([
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