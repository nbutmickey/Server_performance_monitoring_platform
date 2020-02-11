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

/*根据客户端指定参数获取信息*/
const getClietnInfo=async function(appID,sTime,eTime,groupType){
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
                    property: "$_id",
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
        throw "数据异常"
    }

}

module.exports = { saveUv, getClietnInfo, getUvNum, findUvByIP, deleteAllUvByID, updateOneUv, findUvByClientID, deleteAllUvByAppID }