let Performance = require("../db/model/Performance");

const savePerformance = function (data) {
  let perTemp = new Performance({
    clientID: data.clientID,
    appID: data.appID,
    visitTime: data.visitTime,
    pageUrl: data.pageurl,
    domain: data.domain,
    referrer: data.referrer,
    navType: data.navType,
    performanceDetail: {
      redirect:data.performanceDetail.redirect,
      dns: data.performanceDetail.dns,
      tcp: data.performanceDetail.tcp,
      ssl: data.performanceDetail.ssl,
      ttfb: data.performanceDetail.ttfb,
      trans: data.performanceDetail.trans,
      dom: data.performanceDetail.dom,
      resource: data.performanceDetail.resource,
      firstByte: data.performanceDetail.firstByte,
      dnsCache:data.performanceDetail.dnsCache,
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

const deleteAllPerByAppID=function (appID) {
  return new Promise((resolve,reject)=>{
    Performance.deleteMany((err)=>{
      try {
        resolve(true);
      } catch (error) {
        reject(false);
      }
    })
  });
} 
module.exports = { savePerformance,deleteAllPerByAppID }