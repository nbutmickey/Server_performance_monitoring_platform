var express = require('express');
var router = express.Router();
let { findAppByAppID } = require("../db/model/App");
let { createClientID } = require("../utils/createID");
let { UvInfo, saveUvInfo, findUvByIP ,deleteAllUvInfo,updateOneUvInfo} = require("../db/model/UV");
let {Performance,savePerformance}=require("../db/model/Performance");
let {Resource,saveResource}=require("../db/model/Resource");
let {PvInfo, savePvInfo}=require("../db/model/PV");
let ipSearch = require("../utils/ipSearch");

router.get('/clientID', async function (req, res, next) {
  let appID = req.query.appID;
  let result = await findAppByAppID(appID);
  if (result) {
    //获取IP地址
    let tempIP = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress || req.connection.socket.remoteAddress || req.connection.remoteAddress || '';
    let IP = tempIP.split(":")[tempIP.split(":").length - 1]
    //查询IP地址对应的地理信息
    let IPInfo = await ipSearch("58.242.67.176");

    //根据IP查找是否该访问者曾经访问过，若访问过，则不生成ID，直接返回，若未访问过，则需要生成ID返回。
    let visitResult = await findUvByIP("58.242.67.176");
    //console.log(visitResult);
    if (!visitResult) {
      //生成用户ID，作为身份证明
      let clientID = createClientID();
      let uvInfo = new UvInfo({
        clientID: clientID,
        appID: appID,
        ipAddr: "58.242.67.176",
        country: IPInfo.country,
        province: IPInfo.province,
        city: IPInfo.city,
        isp: IPInfo.isp,
        os:'',
        osBit:64,
        screen:'',
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
13731950807

//处理用户上传收集数据信息
router.get('/imgReport',async function (req, res, next) {
  let {type,dataJson}=req.query;
  let data=JSON.parse(dataJson);
  if (type === "performance") {
    let perInfo=new Performance({
      clientID:data.clientID,
      appID:data.appID,
      visitTime:data.visitTime,
      pageUrl:data.pageurl,
      domain:data.domain,
      referrer:data.referrer,
      navType:data.navType,
      performanceDetail:{
        dns:data.performanceDetail.dns,
        tcp:data.performanceDetail.tcp,
        ssl:data.performanceDetail.ssl,
        ttfb:data.performanceDetail.ttfb,
        trans:data.performanceDetail.trans,
        dom:data.performanceDetail.dom,
        resource:data.performanceDetail.resource, 
        firstByte:data.performanceDetail.firstByte,
        fpt:data.performanceDetail.fpt,
        tti:data.performanceDetail.tti,
        ready:data.performanceDetail.ready,
        load:data.performanceDetail.load,
      }
    })
    let result=await savePerformance(perInfo);
    if(result){
      console.log("性能信息存储成功");
    }
  }else if (type === "uv") {
    //console.log(data);
    let result=await updateOneUvInfo(data.clientID,data.appID,data.os,data.osBit,data.screen);
    if(result){
      console.log("更新信息成功");
    }
    //开发用于删除所有用户的访问信息
    // let result=await deleteAllUvInfo(data.appID,"58.242.67.171");
    // if(result)
    // {
    //   console.log("删除全部信息成功");
    // }
  }else if (type === "pv") {
    let pvInfo=new PvInfo({
      clientID:data.clientID,
      appID:data.appID,
      visitTime:data.visitTime,
      pageURL:data.pageURL,
      referrer:data.referrer
    })
    let result=await savePvInfo(pvInfo);
    if(result){
      console.log("PV 信息存储成功");
    }
  } 
  res.status(200).end();
})


//获取资源详情数据
router.post("/resourceUpload",async function(req,res){
  let resourceInfo=req.body;
  //console.log(resourceInfo);
  let resInfo=new Resource({
    clientID:resourceInfo.clientID,
    appID:resourceInfo.appID,
    visitTime:resourceInfo.visitTime,
    detail:resourceInfo.detail
  })
  let result=await saveResource(resInfo);
  if(result){
    console.log("资源信息数据存储成功");
    res.json({success:true})
  }
  
})

module.exports = router;