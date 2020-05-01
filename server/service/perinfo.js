let Performance = require("../db/model/Performance");
let time = require("../utils/time");
let performanceDao = require("../dao/performanceDao");
const savePerformance = function (data) {
  let perTemp = new Performance({
    clientID: data.clientID,
    appID: data.appID,
    visitTime: data.visitTime,
    pageUrl: data.pageurl,
    domain: data.domain,
    referrer: data.referrer,
    navType: data.navType,
    ip: data.ip,
    province: data.province,
    bs: data.bs,
    os: data.os,
    isp: data.isp,
    performanceDetail: {
      redirect: data.performanceDetail.redirect,
      dns: data.performanceDetail.dns,
      tcp: data.performanceDetail.tcp,
      ssl: data.performanceDetail.ssl,
      ttfb: data.performanceDetail.ttfb,
      trans: data.performanceDetail.trans,
      dom: data.performanceDetail.dom,
      resource: data.performanceDetail.resource,
      firstByte: data.performanceDetail.firstByte,
      dnsCache: data.performanceDetail.dnsCache,
      fpt: data.performanceDetail.fpt,
      tti: data.performanceDetail.tti,
      ready: data.performanceDetail.ready,
      load: data.performanceDetail.load,
    }
  })
  return new Promise((resolve, reject) => {
    perTemp.save((err) => {
      try {
        resolve(true);
      } catch (error) {
        reject(false);
      }
    })
  })
}

const deleteAllPerByAppID = function (appID) {
  return new Promise((resolve, reject) => {
    Performance.deleteMany({ appID: appID },(err) => {
      try {
        resolve(true);
      } catch (error) {
        reject(false);
      }
    })
  });
}
const deleteAllPerByTime=function(sTime){
  return new Promise((resolve,reject)=>{
    Performance.deleteMany({visitTime:{$lt: sTime}},(err)=>{
          try {
              resolve(true);
          } catch (error) {
              reject(false);
          }
      })
  })
}


const getPerToday = async function (appID) {
  try {
    let { yesTime, toTime, nowTime } = time.getToadyTimeDivider();
    let result = await performanceDao.getPerTodayByTime(appID, toTime, nowTime);
    let res = [];
    if (result.length !== 0) {
      Object.keys(result[0]).forEach((key) => {
        res.push({ title: key, today: result[0][key] });
      })
    }
    return res;
  } catch (error) {
    throw "数据异常"
  }

}

const getKeyPerTimeByDivider = async function (appID, sTime, eTime, divider) {
  try {
    return await performanceDao.getKeyPerTimeByDivider(appID, sTime, eTime, divider);
  } catch (error) {
    throw error;
  }
}

const getIntervalTimeByDivider = async function (appID, sTime, eTime, divider) {
  try {
    return await performanceDao.getIntervalTimeByDivider(appID, sTime, eTime, divider);
  } catch (error) {
    throw error;
  }
}

const getWaterfallByTime = async function (appID, sTime, eTime) {
  try {
    let result = await performanceDao.getWaterFallLoadingByTime(appID, sTime, eTime);
    if (result.length !== 0) {
      let total = 0;
      Object.keys(result[0]).forEach((key) => {
        total += result[0][key];
      })
      result[0].total = total;
      return result;
    }
    return result;
  } catch (error) {
    throw error
  }
}

const getWaterfallByPage = async function (appID, sTime, eTime, page) {
  try {
    let result = await performanceDao.getWaterFallLoadingByTime(appID, sTime, eTime, page);
    if (result.length !== 0) {
      let total = 0;
      Object.keys(result[0]).forEach((key) => {
        total += result[0][key];
      })
      result[0].total = total;
      return result;
    }
    return result;
  } catch (error) {
    throw error
  }
}

const getPageListPer = async function (appID, sTime, eTime) {
  try {
    return await performanceDao.getPageListKeyPerByTime(appID, sTime, eTime);
  } catch (error) {
    throw error;
  }
}

const getApdex = async function (appID, sTime, eTime, page) {
  try {
    /*总体样本数量*/
    let total = await Performance.countDocuments(
      {
        visitTime: {
          $gte: sTime,
          $lt: eTime
        },
        appID: appID,
        pageUrl: page,
      }
    ).exec();

    /*满意样本数量*/
    let satisfied = await Performance.countDocuments(
      {
        visitTime: {
          $gte: sTime,
          $lt: eTime
        },
        appID: appID,
        pageUrl: page,
        "performanceDetail.ready": {
          $lt: 2000
        }
      }
    ).exec();

    /*容忍样本数量*/
    let tolerating = await Performance.countDocuments(
      {
        visitTime: {
          $gte: sTime,
          $lt: eTime
        },
        appID: appID,
        pageUrl: page,
        "performanceDetail.ready": {
          $gte: 2000,
          $lt: 8000
        }
      }
    ).exec();

    /*失望样本数量*/
    let disappointed = await Performance.countDocuments(
      {
        visitTime: {
          $gte: sTime,
          $lt: eTime
        },
        appID: appID,
        pageUrl: page,
        "performanceDetail.ready": {
          $gte: 8000
        }
      }
    ).exec();
    let apdex = (satisfied + tolerating / 2) / total;
    return {
      satisfied,
      tolerating,
      disappointed,
      total,
      apdex: Number(apdex)
    }
  } catch (error) {
    throw "数据异常"
  }
}

module.exports = {
  deleteAllPerByTime,
  getPerToday,
  getWaterfallByTime,
  savePerformance,
  getKeyPerTimeByDivider,
  getIntervalTimeByDivider,
  getPageListPer,
  getWaterfallByPage,
  getApdex,
  deleteAllPerByAppID
}
