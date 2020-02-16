let APIInfo = require("../db/model/API");
exports.getAPISuccessCountByTime=async function(appID,sTime,eTime){
    try {
        return await APIInfo.countDocuments({ appID: appID, visitTime: { $gte: sTime, $lt:eTime }, statusCode: { $gte: 200, $lt: 400 } });
    } catch (error) {
        console.log(error);
        throw error;
    }
}
exports.getAPISuccessDurationByTime=async function(appID,sTime,eTime){
    try {
        return  await APIInfo.aggregate([
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
    }catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getAPIFailedCountByTime=async function(appID,sTime,eTime){
    try {
        return await APIInfo.countDocuments({ appID: appID, visitTime: { $gte: sTime, $lt:eTime }, statusCode: { $gte: 400, $lt: 600 } });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.getAPITotalCountByTime=async function(appID,sTime,eTime){
    try {
        return await APIInfo.countDocuments({ appID: appID, visitTime: { $gte: sTime, $lt:eTime } });
    } catch (error) {
        console.log(error);
        throw error;
    }
}