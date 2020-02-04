let PvInfo = require("../db/model/PV");
let time = require("../utils/time");

const savePv = function (pvdata) {
    let pvTemp = new PvInfo({
        clientID: pvdata.clientID,
        appID: pvdata.appID,
        visitTime: pvdata.visitTime,
        pageURL: pvdata.pageURL,
        referrer: pvdata.referrer,
        ua: pvdata.ua,
        os: pvdata.os,
        bs: pvdata.bs,
        screen: pvdata.screen,
        isPC: pvdata.isPC
    })
    return new Promise((resolve, reject) => {
        pvTemp.save((err) => {
            try {
                resolve(true);
            } catch (error) {
                reject(false);
            }
        })
    });
}

const deleteAllPvByAppID = function (appID) {
    return new Promise((resolve, reject) => {
        PvInfo.deleteMany({ appID: appID }, (err) => {
            try {
                resolve(true)
            } catch (error) {
                reject(false)
            }
        })
    })
}
/*获取PV量*/
const getPVNum = async function (appID, sTime, eTime) {
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
                _id: null,
                count: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0,
                count: "$count"
            }
        }
    ]);
}

const getPvNumByDivider = async function (appID, sTime, eTime) {
    return await PvInfo.aggregate([
        {
            $match: {
                visitTime: {
                    $gte: sTime,
                    $lt: eTime
                },
                appID: appID
            },
        }, {
            $group: {
                _id: {
                    $subtract: [{
                        $subtract: ["$visitTime", new Date(0)]
                    },
                    {
                        $mod: [{
                            $subtract: ["$visitTime", new Date(0)]
                        },
                        1000 * 60 * 60
                        ]
                    }]
                },
                pageList: {
                    $push: "$pageURL"
                }
            },
        }, {
            $project: {
                _id: 0,
                pv: {
                    $size: "$pageList"
                },
                visitTime: {
                    $add: [new Date(0), "$_id"]
                }
            },
        }, {
            $sort: {
                visitTime: 1
            }

        }
    ])
}

/*获取TOP页面数据*/
const getPageTop = async function (appID, sTime, eTime) {

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
                pageList: {
                    $push: "$pageURL"
                }
            }
        },
        {
            $project: {
                _id: 0,
                page: "$_id",
                count: {
                    $size: "$pageList"
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
    //返回的是一个Promsie
}

module.exports = { savePv, deleteAllPvByAppID, getPageTop, getPVNum, getPvNumByDivider };