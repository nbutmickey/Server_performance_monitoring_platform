var express = require('express');
var router = express.Router();
const multer=require("multer");
const upfile=multer({dest:'public/resume/'});
const path=require("path");
let middleware = require("../utils/middleware");
let createID = require("../utils/createID");
let perinfo = require("../service/perinfo");
let uvinfo = require("../service/uvinfo");
let pvinfo = require("../service/pvinfo");
let resourceinfo = require("../service/resourceinfo");
let apiinfo = require("../service/apiinfo");
let appinfo = require("../service/appinfo");
let ipSearch = require("../utils/ipSearch");
let filter=require("../service/filterData");

router.get('/clientID', async function (req, res, next) {
  let appID = req.query.appID;
  let clientID = req.query.clientID;
  //console.log(clientID);
  let result = await appinfo.findAppByAppID(appID);
  //console.log(result);
  if (result) {
    //获取IP地址
    let tempIP = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress || req.connection.socket.remoteAddress || req.connection.remoteAddress || '';
    //console.log(tempIP);
    let IP = tempIP.split(":")[tempIP.split(":").length - 1]
    //查询IP地址对应的地理信息
    let IPInfo = await ipSearch("27.128.241.0");//需修改成IP
    //根据clientID查找是否该访问者曾经访问过，若访问过，则不生成ID，直接返回，若未访问过，则需要生成ID返回。
    let visitResult = await uvinfo.findUvByClientID(clientID);
    //console.log(visitResult);
    if (!visitResult && typeof lientID ==="undefined") {
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

//处理用户上传收集数据信息
router.get('/upload',middleware.setIPInfo, async function (req, res, next) {
  let { type, dataJson } = req.query;
  switch (type) {
    case 'per':
      let perData=filter.filterPerData(dataJson);
      if(perData){
        await perinfo.savePerformance(dataJson);
      }
      //await perinfo.deleteAllPerByAppID(data.appID);
      break;
    case 'uv':
      await uvinfo.updateOneUv(dataJson.clientID, dataJson.appID, dataJson.os, dataJson.screen, dataJson.bs,dataJson.isPC);
      //await uvinfo.deleteAllUvByAppID(data.appID)
      break;
    case 'pv':
      await pvinfo.savePv(dataJson);
      //await pvinfo.deleteAllPvByAppID(data.appID);
      break;
    case 'api':
      let apiData=filter.filterApiData(dataJson);
      //await apiinfo.deleteAllApiByAppID(data.appID);
      await apiinfo.saveApi(apiData);
      break;
    default:
      break;
  }
  res.status(200).end();
})

router.post("/upload",async function (req,res,next) {
  let dataJson=JSON.parse(req.body.dataJson);
  let resData=filter.filterResData(dataJson);
  await resourceinfo.saveResource(resData);
  res.status(200).end();
});


//获取资源详情数据
router.post("/fileUpload",upfile.single('resume'),function (req, res) {
  res.json({message:"ok"});
})


router.get("/downloadFile/f2017f87941fbbab4e4e96a9acbfb299",function (req,res,next) {
  let file=path.join(__dirname,'../public/resume/'+'f2017f87941fbbab4e4e96a9acbfb299');
  console.log(file);
  res.download(file);
})


module.exports = router; 