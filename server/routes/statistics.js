var express = require('express');
var router = express.Router();
let pvinfo = require("../service/pvinfo");
let uvinfo = require("../service/uvinfo");
let perinfo = require("../service/perinfo");
let time = require("../utils/time");
let middleware = require("../utils/middleware");

router.get("/pageTop", middleware.validate, async function (req, res, next) {
    let type = req.query.type;
    let appID = req.query.appID;
    let { sTime, eTime } = time.computeTimeDivider(type);
    let result = await pvinfo.getPageTop(appID, sTime, eTime);
    res.json({
        success: true,
        note: "数据返回成功",
        data: result
    })

});

router.get("/pvAndUvNum", middleware.validate, async function (req, res, next) {
    let type = req.query.type;
    let appID = req.query.appID;
    let { sTime, eTime } = time.computeTimeDivider(type);
    // console.log(sTime);
    // console.log(eTime);
    let pvArr = await pvinfo.getPVNum(appID, sTime, eTime);
    let uvArr = await uvinfo.getUvNum(appID, sTime, eTime);
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

router.get("/pvAndUvNumByDivider", async function (req, res, next) {
    let type = req.query.type;
    let appID = req.query.appID;
    let { sTime, eTime, divider } = time.computeTimeDivider(type);
    let pvResult = await pvinfo.getPvNumByDivider(appID, sTime, eTime, divider);
    let uvResult = await uvinfo.getUvNumByDivider(appID, sTime, eTime, divider);
    let totalpv = 0, totaluv = 0;
    pvResult.forEach((item) => {
        totalpv += item.count;
    })
    uvResult.forEach((item) => {
        totaluv += item.count;
    })
    res.json({
        success: true,
        note: "数据返回成功",
        data: {
            pvResult,
            uvResult,
            totalpv,
            totaluv
        }
    })
})

router.get("/pvAndUvNumByGeo", async function (req, res, next) {
    let type = req.query.type;
    let appID = req.query.appID;
    let { sTime, eTime } = time.computeTimeDivider(type);
    let uvResult = await uvinfo.getUvNumByGeo(appID, sTime, eTime);
    let pvResult = await pvinfo.getPvNumByGeo(appID, sTime, eTime);
    let totalPv = 0, totalUv = 0;
    pvResult.forEach((item) => {
        totalPv += item.count;
    })
    uvResult.forEach((item) => {
        totalUv += item.count;
    })
    res.json({
        success: true,
        note: "数据返回成功",
        data: {
            pvResult,
            uvResult,
            totalPv,
            totalUv
        }
    })
})

router.get("/browserInfo", async function (req, res, next) {
    let type = req.query.type;
    let appID = req.query.appID;
    let { sTime, eTime } = time.computeTimeDivider(type);
    let bsResult = await uvinfo.getBsInfo(appID, sTime, eTime);
    let totalBs = 0;
    bsResult.forEach((item) => {
        totalBs += item.count;
    })
    res.json({
        success: true,
        note: "数据返回成功",
        data: {
            bsResult,
            totalBs
        }
    })
})

router.get("/osInfo", async function (req, res, next) {
    let type = req.query.type;
    let appID = req.query.appID;
    let { sTime, eTime } = time.computeTimeDivider(type);
    let osResult = await uvinfo.getOsInfo(appID, sTime, eTime);
    let totalOs = 0;
    osResult.forEach((item) => {
        totalOs += item.count;
    })
    res.json({
        success: true,
        note: "数据返回成功",
        data: {
            osResult,
            totalOs
        }
    })
})

router.get("/screenInfo", async function (req, res, next) {
    let type = req.query.type;
    let appID = req.query.appID;
    let { sTime, eTime } = time.computeTimeDivider(type);
    let screenResult = await uvinfo.getScreenInfo(appID, sTime, eTime);
    let totalScreen = 0;
    screenResult.forEach((item) => {
        totalScreen += item.count;
    })
    res.json({
        success: true,
        note: "数据返回成功",
        data: {
            screenResult,
            totalScreen
        }
    })
})

router.get("/isPCInfo", async function (req, res, next) {
    let type = req.query.type;
    let appID = req.query.appID;
    let { sTime, eTime } = time.computeTimeDivider(type);
    let isPCResult = await uvinfo.getIsPCInfo(appID, sTime, eTime);
    let total = 0;
    isPCResult.forEach((item) => {
        total += item.count;
    })
    res.json({
        success: true,
        note: "数据返回成功",
        data: {
            isPCResult,
            total
        }
    })
})

router.get("/keyPerToday", async function (req, res, next) {
    let type = req.query.type;
    let appID = req.query.appID;
    let { sTime, eTime } = time.computeTimeDivider(type);
    let result = await perinfo.getKeyPerToday(appID, sTime, eTime);
    //console.log(result);
    if (result[0]) {
        res.json({
            success: true,
            note: "数据返回成功",
            data: result[0]
        })
    } else {
        res.json({
            success: false,
            note: "暂无数据",
        })
    }
})

router.post("/keyPerDividerByPage", async function (req, res, next) {
    let { type, appID, page } = req.body;
    let { sTime, eTime, divider } = time.computeTimeDivider(type);
    let result = await perinfo.getKeyPerDividerByPage(appID, sTime, eTime, page, divider);
    if (result) {
        res.json({
            success: true,
            note: "数据返回成功",
            data: result
        })
    } else {
        res.json({
            success: false,
            note: "暂无数据",
        })
    }
})

router.post("/loadPerDividerByPage", async function (req, res, next) {
    let { type, appID, page } = req.body;
    let { sTime, eTime, divider } = time.computeTimeDivider(type);
    let result = await perinfo.getLoadPerDividerByPage(appID, sTime, eTime, page, divider);
    if (result) {
        res.json({
            success: true,
            note: "数据返回成功",
            data: result
        })
    } else {
        res.json({
            success: false,
            note: "暂无数据",
        })
    }
})

router.post("/waterfallDividerByPage", async function (req, res, next) {
    let { type, appID, page } = req.body;
    let { sTime, eTime, divider } = time.computeTimeDivider(type);
    let result = await perinfo.getWaterfallDividerByPage(appID, sTime, eTime, page, divider);
    if (result) {
        res.json({
            success: true,
            note: "数据返回成功",
            data: result
        })
    } else {
        res.json({
            success: false,
            note: "暂无数据",
        })
    }
})

router.get("/fullyLoadPer", async function (req, res, next) {
    let type=req.query.type;
    let appID=req.query.appID;
    let groupType=req.query.groupType;
    let { sTime, eTime } = time.computeTimeDivider(type);
    let result = await perinfo.getFullyLoadPer(appID, sTime, eTime, groupType);
    if (result) {
        res.json({
            success: true,
            note: "数据返回成功",
            data: result
        })
    } else {
        res.json({
            success: false,
            note: "暂无数据",
        })
    }
})

router.post("/apdex", async function (req, res, next) {
    let { type, appID, page } = req.body;
    let { sTime, eTime } = time.computeTimeDivider(type);
    let result = await perinfo.getApdex(appID, sTime, eTime, page);
    //console.log(result);
    if (result) {
        res.json({
            success: true,
            note: "数据返回成功",
            data: result
        })
    } else {
        res.json({
            success: false,
            note: "暂无数据",
        })
    }
})

module.exports = router;
