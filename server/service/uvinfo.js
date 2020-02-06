let UvInfo = require("../db/model/UV");
let time = require("../utils/time");
const updateOneUv = (clientID, appID, os, screen, bs, isPC) => {
    return new Promise((resolve, reject) => {
        UvInfo.updateOne({ clientID: clientID, appID: appID }, { os: os, screen: screen, bs: bs, isPC: isPC }, (err) => {
            try {
                resolve(true);
            } catch (error) {
                reject(false);
            }
        })
    })
}

const findUvByClientID = (clientID) => {
    return new Promise((resolve, reject) => {
        UvInfo.findOne({ clientID: clientID }, (err, result) => {
            try {
                if (result !== null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (error) {
                reject(error);
            }
        })
    });
}

const findUvByIP = (ipaddress) => {
    return new Promise((resolve, reject) => {
        UvInfo.findOne({ ipAddr: ipaddress }, (err, result) => {
            try {
                if (result !== null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (error) {
                reject(error);
            }
        });
    })
}

const deleteAllUvByID = (appID, ipaddr) => {
    return new Promise((resolve, reject) => {
        UvInfo.deleteMany({ appID: appID, ipAddr: ipaddr }, (err) => {
            try {
                resolve(true);
            } catch (error) {
                reject(false);
            }
        })
    });
}
/*根据应用ID（appID）删除所有UV数据*/
const deleteAllUvByAppID = (appID) => {
    return new Promise((resolve, reject) => {
        UvInfo.deleteMany({ appID: appID }, (err) => {
            try {
                resolve(true);
            } catch (error) {
                reject(false);
            }
        })
    });
}

/*存储UV数据*/
const saveUv = (clientID, appID, IPInfo) => {
    let uvTemp = new UvInfo({
        clientID: clientID,
        appID: appID,
        ipAddr: IPInfo.ip,
        country: IPInfo.country,
        province: IPInfo.province,
        city: IPInfo.city,
        isp: IPInfo.isp,
        os: '未知',
        screen: '未知',
        bs: '未知',
        isPC: true,
        visitTime: time.getNowTimeString()
    });
    return new Promise((resolve, reject) => {
        uvTemp.save((err) => {
            try {
                //console.log("存储uv数据成功");
                resolve(true);
            } catch (error) {
                reject(false)
                //console.log("存储uv数据发生错误");
            }
        })
    })
}

/*获取UV数量（总数）*/
const getUvNum = async function (appID, sTime, eTime) {
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
    ])
}

/*获取各时间段的UV数量*/
const getUvNumByDivider = async function (appID, sTime, eTime,divider) {
    return await UvInfo.aggregate([
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
                count: {
                    $sum: 1
                }
            },
        },
        {
            $project: {
                _id: 0,
                count: "$count",
                visitTime: {
                    $add: [new Date(0), "$_id"]
                }
            }
        },
        {
            $sort: {
                visitTime: 1
            }

        }
    ])
}

/*根据地理位置获取UV数量*/
const getUvNumByGeo = async function (appID, sTime, eTime) {
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
            $sort:{
                count:-1
            }
        }
    ])
}
/*获取客户端浏览器类型数量占比*/
const getBsInfo = async function (appID, sTime, eTime) {
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
                _id: "$bs",
                count: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0,
                bs: "$_id",
                count: "$count"
            }
        },
        {
            $sort: {
                count:1
            }
        }
    ])
}

/*获取客户端操作系统类型数量占比*/
const getOsInfo = async function (appID, sTime, eTime) {
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
                _id: "$os",
                count: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0,
                os: "$_id",
                count: "$count"
            }
        },
        {
            $sort: {
                count: 1
            }
        }
    ])
}
/*获取终端屏幕分辨率数量的占比*/
const getScreenInfo = async function (appID, sTime, eTime) {
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
                _id: "$screen",
                count: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0,
                screen: "$_id",
                count: "$count"
            }
        },
        {
            $sort: {
                count: 1
            }
        }
    ])
}

/*获取终端是否为PC的占比*/
const getIsPCInfo = async function (appID, sTime, eTime) {
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
                _id: "$isPC",
                count: {
                    $sum: 1
                }
            }
        },
        {
            $project: {
                _id: 0,
                isPC: "$_id",
                count: "$count"
            }
        },
        {
            $sort: {
                count: 1
            }
        }
    ])
}


module.exports = { saveUv, getScreenInfo, getIsPCInfo, getOsInfo, getBsInfo, getUvNumByGeo, getUvNumByDivider, getUvNum, findUvByIP, deleteAllUvByID, updateOneUv, findUvByClientID, deleteAllUvByAppID }