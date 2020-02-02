var express = require('express');
var router = express.Router();
let createID = require("../utils/createID");
let appinfo = require("../service/appinfo");

//新建应用
router.post('/newApp', async function (req, res) {
  let appID=createID.createAppID();
  let result = await appinfo.findApp(req.body.monitoringDomain, req.body.userName);
  if (result) {
    res.json({
      succes: false,
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
router.post("/delApp",async function (req, res, next) {
  let result=await appinfo.deleteApp(req.body.appID);
  if(result){
    res.json({
      success:true,
      note:"应用删除成功！"
    })
  }else{
    res.json({
      success:false,
      note:"内部出现了错误！"
    })
  }
})

module.exports = router;
