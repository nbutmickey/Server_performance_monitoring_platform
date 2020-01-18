var express = require('express');
var router = express.Router();
let { findAppByAppID } = require("../db/model/App");
let { createClientID } = require("../utils/createID");
let { UVInfo ,saveUvInfo} = require("../db/model/UV");
let ipSearch = require("../utils/ipSearch");

router.get('/clientID', async function (req, res, next) {
  let appID = req.query.appID;
  let result = await findAppByAppID(appID);
  if (result) {
    //获取IP地址
    let tempIP = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress || req.connection.socket.remoteAddress || req.connection.remoteAddress || '';
    let IP = tempIP.split(":")[tempIP.split(":").length - 1]
    //查询IP地址对应的地理信息
    let IPInfo = ipSearch(IP);
    //生成用户ID，作为身份证明
    let clientID = createClientID();
    let uvInfo = new UVInfo({
      clientID: clientID,
      appID: appID,
      ipAddr: IP,
      country: IPInfo.country,
      province: IPInfo.province,
      city: IPInfo.city,
      isp: IPInfo.isp,
      visitTime: Date.now()
    });
    //存储访问用户信息
    let success=await saveUvInfo(uvInfo);
    if(success){
      res.json({
        success: true,
        cookie: clientID,
      });
    }
  }
});

//处理用户上传收集数据信息
router.get('/imgReport', function (req, res, next) {

  let jsonParams = req.query;
  console.log(jsonParams);
  res.status(200).end();
})


module.exports = router;