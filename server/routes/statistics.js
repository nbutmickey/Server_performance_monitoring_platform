var express = require('express');
var router = express.Router();
let pvinfo = require("../service/pvinfo");
let uvinfo = require("../service/uvinfo");
let time = require("../utils/time");
let validateBody = require("../utils/validateParams");

router.get("/pageTop", validateBody.validate, async function (req, res, next) {
    let type= req.query.type;
    let appID=req.query.appID;
    let { sTime, eTime } = time.computeTimeDivider(type);
    let result = await pvinfo.getPageTop(appID, sTime, eTime);
    res.json({
        success: true,
        note: "数据返回成功",
        data: result
    })

});

router.get("/pvAndUvNum", validateBody.validate,async function (req, res, next) {
    let type= req.query.type;
    let appID=req.query.appID;
    let { sTime, eTime } = time.computeTimeDivider(type);
    console.log(sTime);
    console.log(eTime);
    let pvArr = await pvinfo.getPVNum(appID, sTime, eTime);
    let uvArr = await uvinfo.getUvNum(appID, sTime, eTime);
    let result=await pvinfo.getPvNumByDivider(appID, sTime, eTime);
    console.log(result);
    let data = {
        pv: pvArr.length === 0 ? 0 : pvArr[0].count,
        uv: uvArr.length === 0 ? 0 : uvArr[0].count
    }
    res.json({
        success: true,
        note: "数据返回成功",
        data
    })

});
module.exports = router;