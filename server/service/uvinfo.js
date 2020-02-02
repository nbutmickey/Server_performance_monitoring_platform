let UvInfo = require("../db/model/UV");

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


const saveUv = (clientID, appID, IPInfo) => {
    //console.log(IPInfo);
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
        visitTime: Date.now()
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

module.exports = { saveUv, findUvByIP, deleteAllUvByID, updateOneUv, findUvByClientID, deleteAllUvByAppID }