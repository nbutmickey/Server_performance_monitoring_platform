let Resource = require("../db/model/Resource");

exports.getResDetailByType = async function (appID, sTime, eTime, type) {
    try {
        let matchConfig = type === 'all' ? {
            $match: {
                "detail.InitiatorType": {
                    "$regex":new RegExp(`([\w\W]*)`,`gi`)
                }
            }
        } : {
            $match: {
                "detail.InitiatorType": type
            }
        }

        return await Resource.aggregate([
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
                $project: {
                    detail: 1,
                    visitTime: 1
                }
            },
            {
                $unwind: "$detail"
            },
            matchConfig,
            {
                $project: {
                    _id: 0,
                    visitTime: "$visitTime",
                    url: "$detail.Url",
                    initiatorType: "$detail.InitiatorType",
                    fileSize: "$detail.FileSize",
                    duration: "$detail.Duration"
                }
            }
        ])
    } catch (error) {
        throw error;
    }
}

exports.getResDetailByUrl = async function (appID, url) {
    try {
        return await Resource.aggregate([
            {
                $match: {
                    appID: appID
                }
            },
            {
                $project: {
                    detail: 1,
                    visitTime: 1
                }
            },
            {
                $unwind: "$detail"
            },
            {
                $match: {
                    "detail.Url": {
                        "$regex":new RegExp(`${url}.*`,`gi`)
                    }
                }
            },
            {
                $project: {
                    url: "$detail.Url",
                    visitTime: "$visitTime",
                    initiatorType: "$detail.InitiatorType",
                    fileSize: "$detail.FileSize",
                    duration: "$detail.Duration"
                }
            }
        ])
    } catch (error) {
        throw error;
    }
}


exports.getAllResDetail = async function (appID, sTime, eTime) {
    try {
        return await Resource.aggregate([
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
                $project: {
                    detail: 1,
                    visitTime: 1
                }
            },
            {
                $unwind: "$detail"
            },
            {
                $project: {
                    url: "$detail.Url",
                    visitTime: "$visitTime",
                    initiatorType: "$detail.InitiatorType",
                    fileSize: "$detail.FileSize",
                    duration: "$detail.Duration"
                }
            }
        ])
    } catch (error) {
        throw error;
    }
}





exports.getResDuration = async function (appID) {
    try {
        return await Resource.aggregate([
            {
                $match: {
                    appID: appID
                },

            },
            {
                $project: {
                    detail: 1     //从文档中提取出需要操作的字段
                }
            },
            {
                $unwind: "$detail" //将数组集合中的每一个值拆分成独立的文档
            },
            {
                $group: {
                    _id: "$detail.InitiatorType",
                    duration: {
                        $avg: "$detail.Duration"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    type:"$_id",
                    value:"$duration"
                }
            },
            {
                $sort:{
                    value:-1
                }
            },
            {
                $limit:5
            }
        ])
    } catch (error) {
        throw error;
    }
}

exports.getResCount = async function (appID) {
    try {
        return await Resource.aggregate([
            {
                $match: {
                    appID: appID
                },

            },
            {
                $project: {
                    detail: 1     //从文档中提取出需要操作的字段
                }
            },
            {
                $unwind: "$detail" //将数组集合中的每一个值拆分成独立的文档
            },
            {
                $group: {
                    _id: "$detail.InitiatorType",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    type:"$_id",
                    value:"$count"
                }
            },
            {
                $sort:{
                    value:-1
                }
            },
            {
                $limit:5
            }
        ])
    } catch (error) {
        throw error;
    }
}

exports.getResFileSize = async function (appID) {
    try {
        return await Resource.aggregate([
            {
                $match: {
                    appID: appID
                },
            },
            {
                $project: {
                    detail: 1     //从文档中提取出需要操作的字段
                }
            },
            {
                $unwind: "$detail" //将数组集合中的每一个值拆分成独立的文档
            },
            {
                $group: {
                    _id: "$detail.InitiatorType",
                    fileSize: {
                        $avg: "$detail.FileSize"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    type:"$_id",
                    value:"$fileSize"
                }
            },
            {
                $sort:{
                    value:-1
                }
            },
            {
                $limit:5
            }
        ])
    } catch (error) {
        throw error;
    }
}