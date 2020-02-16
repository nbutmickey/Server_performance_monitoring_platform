let Performance=require("../db/model/Performance");
exports.getPerLoadTimeByTime=async function(appID,sTime,eTime){
    try {
        return await Performance.aggregate([
            {
                $match:{
                    appID:appID,
                    visitTime:{
                        $gte:sTime,
                        $lt:eTime
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    load: {
                        $avg: "$performanceDetail.load"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    load: 1
                }
            }
        ]);
    } catch (error) {
        throw error;
    }
}
exports.getPerTodayByTime=async function(appID,sTime,eTime){
    try {
        return await Performance.aggregate([
            {
                $match:{
                    appID:appID,
                    visitTime:{
                        $gte:sTime,
                        $lt:eTime
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    fpt:{
                        $avg:"$performanceDetail.fpt" 
                    },
                    ready:{
                        $avg:"$performanceDetail.ready"
                    },
                    tti:{
                        $avg:"$performanceDetail.tti"
                    },
                    load: {
                        $avg: "$performanceDetail.load"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    fpt:1,
                    ready:1,
                    tti:1,
                    load: 1
                }
            }
        ])
    } catch (error) {
        throw error
    }
}