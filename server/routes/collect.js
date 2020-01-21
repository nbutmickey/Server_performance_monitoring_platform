var express = require('express');
var router = express.Router();
let { findAppByAppID } = require("../db/model/App");
let { createClientID } = require("../utils/createID");
let { UvInfo, saveUvInfo, findUvByIP } = require("../db/model/UV");
let ipSearch = require("../utils/ipSearch");

router.get('/clientID', async function (req, res, next) {
  let appID = req.query.appID;
  let result = await findAppByAppID(appID);
  if (result) {
    //获取IP地址
    let tempIP = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress || req.connection.socket.remoteAddress || req.connection.remoteAddress || '';
    let IP = tempIP.split(":")[tempIP.split(":").length - 1]
    //查询IP地址对应的地理信息
    let IPInfo = await ipSearch("58.242.67.171");

    //根据IP查找是否该访问者曾经访问过，若访问过，则不生成ID，直接返回，若未访问过，则需要生成ID返回。
    let visitResult = await findUvByIP("58.242.67.171");
    if (visitResult) {
      //生成用户ID，作为身份证明
      let clientID = createClientID();
      let uvInfo = new UvInfo({
        clientID: clientID,
        appID: appID,
        ipAddr: "58.242.67.171",
        country: IPInfo.country,
        province: IPInfo.province,
        city: IPInfo.city,
        isp: IPInfo.isp,
        visitTime: Date.now()
      });
      //存储访问用户信息
      let success = await saveUvInfo(uvInfo);
      if (success) {
        res.json({
          success: true,
          cookie: clientID,
        });
      }
    } else {
      res.json({
        success: false,
        note: "已获取clientID",
      })
    }
  }
});

//处理用户上传收集数据信息
router.get('/imgReport', function (req, res, next) {
  let {type,dataJson}=req.query;
  let data=JSON.parse(dataJson);
  if (type === "performance") {
    console.log(data);
  }
  if (type === "uv") {
    console.log(data);
  }
  if (type === "pv") {
    console.log(data);
  } 
  
  if (type === "resource") {
    console.log(data);
  }
  res.status(200).end();
})


module.exports = router;