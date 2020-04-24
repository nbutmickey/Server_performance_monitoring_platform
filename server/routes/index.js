var express = require('express');
var router = express.Router();
let createID = require("../utils/createID");
let appinfo = require("../service/appinfo");
let apiinfo=require("../service/apiinfo");
let perinfo=require("../service/perinfo");
let resinfo=require("../service/resourceinfo");
let pvinfo=require("../service/pvinfo");
let uvinfo=require("../service/uvinfo");


/*返回该用户所有应用信息*/
router.get('/getAllApplication',async function(req,res){
  let {userName}=req.query;
  let result = await appinfo.findAllAppInfoByUserName(userName);
  if(result){
    res.json({
      success:true,
      result
    })
  }else {
    res.json({
      success:false,
      note:"数据拉取失败"
    })
  }
})

//新建应用
router.post('/newApp', async function (req, res) {
  let appID=createID.createAppID();
  console.log(req.body.monitoringDomain, req.body.userName);
  let result = await appinfo.findApp(req.body.monitoringDomain, req.body.userName);
  console.log(result);
  if (result) {
    res.json({
      success: false,
      note: "该域已被您监测过!"
    })
  } else {
    let success = await appinfo.saveApp(req.body,appID);
    if (!success) {
      res.json({
        success: false,
        note: "内部出现了错误！"
      })
    } else {
      res.json({
        success: true,
        note: "新建应用成功！",
        appID:appID,
        appName: req.body.appName
      })
    }
  }
})

// 删除应用信息
router.post("/deleteApp",async function (req, res, next) {
  let appID=req.body.appID;
  try {
    let delApp=appinfo.deleteApp(appID);
    let delUv=uvinfo.deleteAllUvByAppID(appID);
    let delPv=pvinfo.deleteAllPvByAppID(appID);
    let delPer=perinfo.deleteAllPerByAppID(appID);
    let delApi=apiinfo.deleteAllApiByAppID(appID);
    let delRes=resinfo.deleteAllresByAppID(appID);
    Promise.all([delApp,delUv,delPv,delPer,delApi,delRes]).then((result)=>{
      res.json({
        success:true,
        note:"应用删除成功！"
      })
    }).catch(err=>{throw err});
  } catch (error) {
    res.json({
      success:false,
      note:"内部出现了错误！"
    })
  }
})

module.exports = router;
