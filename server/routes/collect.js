var express = require('express');
var router = express.Router();
let createID = require("../utils/createID");
let perinfo = require("../service/perinfo");
let uvinfo = require("../service/uvinfo");
let pvinfo = require("../service/pvinfo");
let resourceinfo = require("../service/resourceinfo");
let apiinfo = require("../service/apiinfo");
let appinfo = require("../service/appinfo");
let ipSearch = require("../utils/ipSearch");

router.get('/clientID', async function (req, res, next) {
  let appID = req.query.appID;
  let clientID = req.query.clientID;
  //console.log(clientID);
  let result = await appinfo.findAppByAppID(appID);
  if (result) {
    //获取IP地址
    let tempIP = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress || req.connection.socket.remoteAddress || req.connection.remoteAddress || '';
    //console.log(tempIP);
    let IP = tempIP.split(":")[tempIP.split(":").length - 1]
    //查询IP地址对应的地理信息
    let IPInfo = await ipSearch("112.123.33.86");//需修改成IP
    //根据clientID查找是否该访问者曾经访问过，若访问过，则不生成ID，直接返回，若未访问过，则需要生成ID返回。
    let visitResult = await uvinfo.findUvByClientID(clientID);
    //console.log(visitResult);
    if (!visitResult && clientID == undefined) {
      //生成用户ID，作为身份证明
      let clientID = createID.createClientID();
      //存储访问用户信息
      let success = await uvinfo.saveUv(clientID, appID, IPInfo);
      //console.log(success);
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
//13731950807

//处理用户上传收集数据信息
router.get('/upload', async function (req, res, next) {
  let { type, dataJson } = req.query;
  let data = JSON.parse(dataJson);
  switch (type) {
    case 'per':
      await perinfo.savePerformance(data);
      break;
    case 'uv':
      console.log(data);
      await uvinfo.updateOneUv(data.clientID, data.appID, data.os, data.screen, data.bs,data.isPC);
      break;
    case 'pv':
      console.log(data);
      await pvinfo.savePv(data);
      //await pvinfo.deleteAllPvByAppID(data.appID);
      break;
    case 'api':
      //console.log(data);
      await apiinfo.saveApi(data);
      break;
    case 'res':
      //console.log(data);
      await resourceinfo.saveResource(data);
      //await resourceinfo.deleteAllresByAppID(data.appID);
      break;
    default:
      break;
  }
  res.status(200).end();
})


//获取资源详情数据
router.post("/resourceUpload", async function (req, res) {
  await resourceinfo.saveResource(req.body);
  res.status(200).end();
})

module.exports = router;