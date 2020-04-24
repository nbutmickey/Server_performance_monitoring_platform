var express = require('express');
var router = express.Router();
let pvinfo = require("../service/pvinfo");
let apiinfo = require("../service/apiinfo");
let uvinfo = require("../service/uvinfo");
let perinfo = require("../service/perinfo");
let resinfo = require("../service/resourceinfo")
let time = require("../utils/time");
let groupCalc = require("../utils/groupType")
let middleware = require("../utils/middleware");


router.post("/apdex", async function (req, res, next) {
    try {
        let { dimensionType, appID, page } = req.body;
        let { sTime, eTime } = time.computeTimeDivider(dimensionType);
        let data = await perinfo.getApdex(appID, sTime, eTime, page);
        res.json({
            success: true,
            note: "数据返回成功",
            data
        })
    } catch (error) {
        res.json({
            success: false,
            note: error
        })
    }
})



router.get("/getAPIInfoByGroupType", async function (req, res, next) {
    try {
        let { dimensionType, appID } = req.query;
        let { sTime, eTime } = time.computeTimeDivider(dimensionType);
        let groupType = groupCalc.computeGroupType(req.query.groupType);
        let data = await apiinfo.getAPIInfoByGroupType(appID, sTime, eTime, groupType);
        res.json({
            success: true,
            note: "数据返回成功",
            data
        })
    } catch (error) {
        res.json({
            success: false,
            note: error
        })
    }

})




//start
/*返回今日概况信息*/
router.get("/todayGeneral", async function (req, res, next) {
    try {
        let result = await pvinfo.getTodayGeneral(req.query.appID);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            note: "数据发生异常"
        })
    }

})



router.get("/todayAPI", async function (req, res, next) {
    try {
        let result = await apiinfo.getAPIToday(req.query.appID);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            note: "数据发生异常"
        })
    }

})


/*请求页面相关数据*/
router.get("/pageTop", middleware.validate, async function (req, res, next) {
    try {
        let appID = req.query.appID;
        let { sTime, eTime } = time.computeTimeDivider(req.query.dimensionType);
        let result = await pvinfo.getPageTop(appID, sTime, eTime);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            note: "数据异常"
        })
    }
});

router.get("/pvAndUvNumByDivider", async function (req, res, next) {
    try {
        let appID = req.query.appID;
        let { sTime, eTime, divider } = time.computeTimeDivider(req.query.dimensionType);
        let result = await pvinfo.getPvAndUvNumByDivider(appID, sTime, eTime, divider);
        console.log(result);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            note: error
        })
    }
})

/*根据地理位置查询pv和uv*/
router.get("/pvAndUvNumByGeo", async function (req, res, next) {
    try {
        let appID = req.query.appID;
        let { sTime, eTime } = time.computeTimeDivider(req.query.dimensionType);
        let result = await pvinfo.getPvAndUvNumByGeo(appID, sTime, eTime);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            note: "数据返回异常"
        })
    }
})

router.get("/clientInfo", async function (req, res, next) {
    try {
        let appID = req.query.appID;
        let groupType = groupCalc.computeGroupType(req.query.groupType);
        let { sTime, eTime } = time.computeTimeDivider(req.query.dimensionType);
        let result =await  uvinfo.getClietnInfo(appID, sTime, eTime, groupType);
        console.log(result);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            note: "数据返回异常"
        })
    }
});

/*性能相关*/
router.get("/todayPerformance", async function (req, res, next) {
    try {
        let result = await perinfo.getPerToday(req.query.appID);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            note: "数据发生异常"
        })
    }

})

//获取网站所有页面加载瀑布图数据
router.get("/waterfallLoadTime", async function (req, res, next) {
    try {
        let { dimensionType, appID } = req.query;
        let { sTime, eTime } = time.computeTimeDivider(dimensionType);
        let result = await perinfo.getWaterfallByTime(appID, sTime, eTime);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            note: "数据返回异常"
        })
    }
})

//获取某个页面加载瀑布图数据
router.post("/waterfallLoadTime", async function (req, res, next) {
    try {
        let { dimensionType, appID, page } = req.body;
        //console.log(req.body);
        let { sTime, eTime } = time.computeTimeDivider(dimensionType);
        let result = await perinfo.getWaterfallByPage(appID, sTime, eTime, page);
        console.log(result);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            note: "数据返回异常"
        })
    }
})

//获取网站整体关键性能指标数据
router.get("/keyPerByDivider", async function (req, res, next) {
    try {
        let { dimensionType, appID } = req.query;
        let { sTime, eTime, divider } = time.computeTimeDivider(dimensionType);
        let result = await perinfo.getKeyPerTimeByDivider(appID, sTime, eTime, divider);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            note: "数据返回异常"
        })
    }
})
//获取网站区间段耗时
router.get("/intervalTimeByDivider", async function (req, res, next) {
    try {
        let { dimensionType, appID } = req.query;
        let { sTime, eTime, divider } = time.computeTimeDivider(dimensionType);
        let result = await perinfo.getIntervalTimeByDivider(appID, sTime, eTime, divider);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            note: "数据返回异常"
        })
    }
})


//获取网站页面列表
router.get("/pageListPer", async function (req, res, next) {
    try {
        let { dimensionType, appID } = req.query;
        let { sTime, eTime} = time.computeTimeDivider(dimensionType);
        let result = await perinfo.getPageListPer(appID, sTime, eTime);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            note: "数据返回异常"
        })
    }
})




/*API相关*/

//获取今天API相关信息
router.get("/todayAPI", async function (req, res, next) {
    try {
        let { appID } = req.query;
        let result = await apiinfo.getAPIToday(appID);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            note: "数据返回异常"
        })
    }

})


//获取所有失败的API信息列表
router.get("/getAllFailAPI", async function (req, res, next) {
    try {
        let { dimensionType, appID } = req.query;
        let { sTime, eTime } = time.computeTimeDivider(dimensionType);
        let result = await apiinfo.getALLRequestFailedAPIByTime(appID, sTime, eTime);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            note: "数据返回异常"
        })
    }
})

//获取所有成功的API信息列表
router.get("/getAllAPI", async function (req, res, next) {
    try {
        let { dimensionType, appID } = req.query;
        let { sTime, eTime } = time.computeTimeDivider(dimensionType);
        let result = await apiinfo.getAllRequestAPIByTime(appID, sTime, eTime);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            note: "数据返回异常"
        })
    }
})

//获取所有成功API占请求数的比列（区间段）
router.get("/getAllSuccessAPIRate", async function (req, res, next) {
    try {
        let { dimensionType, appID } = req.query;
        let { sTime, eTime, divider } = time.computeTimeDivider(dimensionType);
        let result = await apiinfo.getSuccessAPIRateByTimeDivider(appID, sTime, eTime, divider);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            note: "数据返回异常"
        })
    }
})

//获取所有成功API区间段耗时
router.get("/getAllSuccessAPIDuration", async function (req, res, next) {
    try {
        let { dimensionType, appID } = req.query;
        let { sTime, eTime, divider } = time.computeTimeDivider(dimensionType);
        let result = await apiinfo.getAPISuccessDurationByTimeDivider(appID, sTime, eTime, divider);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            note: "数据返回异常"
        })
    }
})

//获取所有失败API区间段耗时
router.get("/getAllFailedAPIDuration", async function (req, res, next) {
    try {
        let { dimensionType, appID } = req.query;
        let { sTime, eTime, divider } = time.computeTimeDivider(dimensionType);
        let result = await apiinfo.getAPIFailedDurationByTimeDivider(appID, sTime, eTime, divider);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            note: "数据返回异常"
        })
    }
})

/*资源相关*/

//资源加载情况（请求数、文件大小、加载耗时）
router.get("/resTypeInfo", async function (req, res, next) {
    try {
        let { appID,url} = req.query;
        let result= await resinfo.getResInfo(appID);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            note: "数据返回异常"
        })
    }
})

//根据URL查询资源加载情况（提供模糊查询）
router.get("/getResByURL", async function (req, res, next) {
    try {
        let { appID,url} = req.query;
        let result= await resinfo.getResDetailByURL(appID,url);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        res.json({
            success: false,
            note: "数据返回异常"
        })
    }
})

//根据资源类型、时间维度查询资源加载状况
router.get("/getResDetailByCondition", async function (req, res, next) {
    try {
        let { appID, type, timeDimension } = req.query;
        let resType=groupCalc.computeResType(type);
        let { sTime, eTime } = time.computeTimeDivider(timeDimension);
        let result=await resinfo.getResDetailByType(appID, sTime, eTime, resType);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            note: "数据返回异常"
        })
    }
})

/*用户的行为追踪*/
router.get("/userAction", async function (req, res, next) {
    try {
        let appID=req.query.appID;
        let result=await uvinfo.getVisitorList(appID);
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            note: "数据返回异常"
        })
    }
})

router.get("/getPath", async function (req, res, next) {
    try {
        let {appID,clientID}=req.query;
        let result=await pvinfo.getVisitorPath(appID,clientID);
        if(result.length!==0){
            result.sort((a,b)=>{new Date(a.time).getTime()-new Date(b.time).getTime()})
        }
        res.json({
            success: true,
            note: "数据返回成功",
            result
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            note: "数据返回异常"
        })
    }
})


module.exports = router;
