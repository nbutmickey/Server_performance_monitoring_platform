let Resource = require("../db/model/Resource");

exports.getResDetailByType = async function (appID, sTime, eTime, type) {
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
                $match: {
                    "detail.InitiatorType":type
                }
            },
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

exports.getResDetailByUrl = async function (appID, sTime, eTime, url) {
    try {
        return await Resource.aggregate([
            {
                $match: {
                    visitTime: {
                        $gte: sTime,
                        $lt: eTime
                    },
                    appID: appID,
                    Url: url
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


exports.getResDuration = async function (appID, sTime, eTime) {
    try {
        return await Resource.aggregate([
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
            }
        ])
    } catch (error) {
        throw error;
    }
}

exports.getResCount = async function (appID, sTime, eTime) {
    try {
        return await Resource.aggregate([
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
            }
        ])
    } catch (error) {
        throw error;
    }
}

exports.getResFileSize = async function (appID, sTime, eTime) {
    try {
        return await Resource.aggregate([
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
            }
        ])
    } catch (error) {
        throw error;
    }
}