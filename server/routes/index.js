var express = require('express');
var router = express.Router();
const { createAppID } = require("../utils/createID");
let  {AppInfo,findApp,saveApp,deleteApp} = require("../db/model/App");

//新建应用
router.post('/newApp', async function (req, res) {
  let appInfo = new AppInfo({
    appName: req.body.appName,
    userName: req.body.userName,
    monitoringDomain: req.body.monitoringDomain,
    createTime: Date.now(),
    appID: createAppID(),
  });
  let result = await findApp(appInfo.monitoringDomain, appInfo.userName);
  if (result) {
    res.json({
      succes: false,
      note: "该域已被您监测过!"
    })
  } else {
    let doc = await saveApp(appInfo);
    if (!doc) {
      res.json({
        success: false,
        note: "内部出现了错误！"
      })
    } else {
      res.json({
        success: true,
        note: "新建应用成功！",
        appID: appInfo.appID,
        appName: appInfo.appName
      })
    }
  }
})

// 删除应用信息
router.post("/delApp",async function (req, res, next) {
  let appID=req.body.appID;
  let result=await deleteApp(appID);
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
