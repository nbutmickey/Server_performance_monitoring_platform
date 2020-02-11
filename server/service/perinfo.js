let Performance = require("../db/model/Performance");
let time = require("../utils/time");
let dao = require("../utils/dao");
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
    Performance.deleteMany((err) => {
      try {
        resolve(true);
      } catch (error) {
        reject(false);
      }
    })
  });
}

const getKeyPerToday = async function (appID) {
  try {
    let { yesTime, toTime, nowTime } = time.getToadyTimeDivider();
    let resultYesterday = await dao.getKeyPerTodayDao(Performance, appID, yesTime, toTime);
    let resultToday = await dao.getKeyPerTodayDao(Performance, appID, toTime, nowTime);
    let result = {
      fpt: {},
      ready: {},
      tti: {},
      load: {}
    };
    let yesterday = resultYesterday[0];
    let today = resultToday[0];
    for (key in today) {
      result[key].duration = today[key];
      result[key].rate = ((today[key] - yesterday[key]) / yesterday[key]);
    }
    return result;
  } catch (error) {
    throw "数据异常"
  }

}

const getKeyPerDividerByPage = async function (appID, sTime, eTime, page, divider) {
  try {
    return await Performance.aggregate([
      {
        $match: {
          visitTime: {
            $gte: sTime,
            $lt: eTime,
          },
          pageUrl: page,
          appID: appID
        }
      },
      {
        $group: {
          _id: {
            $subtract: [
              {
                $subtract: ["$visitTime", new Date(0)]
              },
              {
                $mod: [
                  {
                    $subtract: ["$visitTime", new Date(0)]
                  },
                  divider
                ]
              }]
          },
          fpt: {
            $avg: "$performanceDetail.fpt"
          },
          ready: {
            $avg: "$performanceDetail.ready"
          },
          tti: {
            $avg: "$performanceDetail.tti"
          },
          load: {
            $avg: "$performanceDetail.load"
          }
        }
      },
      {
        $project: {
          _id: 0,
          fpt: 1,
          ready: 1,
          tti: 1,
          load: 1,
          visitTime: {
            $add: [new Date(0), "$_id"]
          }
        }
      },
      {
        $sort: {
          visitTime: 1
        }
      }
    ])
  } catch (error) {
    throw "数据异常"
  }

}

const getWaterfallDividerByPage = async function (appID, sTime, eTime, page, divider) {
  try {
    return await Performance.aggregate([
      {
        $match: {
          visitTime: {
            $gte: sTime,
            $lt: eTime,
          },
          pageUrl: page,
          appID: appID
        }
      },
      {
        $group: {
          _id: {
            $subtract: [
              {
                $subtract: ["$visitTime", new Date(0)]
              },
              {
                $mod: [
                  {
                    $subtract: ["$visitTime", new Date(0)]
                  },
                  divider
                ]
              }]
          },
          redirect: {
            $avg: "$performanceDetail.redirect"
          },
          dns: {
            $avg: "$performanceDetail.dns"
          },
          tcp: {
            $avg: "$performanceDetail.tcp"
          },
          ssl: {
            $avg: "$performanceDetail.ssl"
          },
          ttfb: {
            $avg: "$performanceDetail.ttfb"
          },
          trans: {
            $avg: "$performanceDetail.trans"
          },
          dom: {
            $avg: "$performanceDetail.dom"
          },
          resource: {
            $avg: "$performanceDetail.resource"
          }
        }
      },
      {
        $project: {
          _id: 0,
          redirect: 1,
          dns: 1,
          tcp: 1,
          ssl: 1,
          ttfb: 1,
          trans: 1,
          dom: 1,
          resource: 1,
          visitTime: {
            $add: [new Date(0), "$_id"]
          }
        }
      },
      {
        $sort: {
          visitTime: 1
        }
      }
    ])
  } catch (error) {
    throw "数据异常"
  }
}

const getLoadPerDividerByPage = async function (appID, sTime, eTime, page, divider) {
  try {
    return await Performance.aggregate([
      {
        $match: {
          visitTime: {
            $gte: sTime,
            $lt: eTime,
          },
          pageUrl: page,
          appID: appID
        }
      },
      {
        $group: {
          _id: {
            $subtract: [
              {
                $subtract: ["$visitTime", new Date(0)]
              },
              {
                $mod: [
                  {
                    $subtract: ["$visitTime", new Date(0)]
                  },
                  divider
                ]
              }]
          },
          dns: {
            $avg: "$performanceDetail.dns"
          },
          tcp: {
            $avg: "$performanceDetail.tcp"
          },
          ttfb: {
            $avg: "$performanceDetail.ttfb"
          },
          trans: {
            $avg: "$performanceDetail.trans"
          },
          dom: {
            $avg: "$performanceDetail.dom"
          },
          resource: {
            $avg: "$performanceDetail.resource"
          }
        }
      },
      {
        $project: {
          _id: 0,
          dns: 1,
          tcp: 1,
          ttfb: 1,
          trans: 1,
          dom: 1,
          resource: 1,
          visitTime: {
            $add: [new Date(0), "$_id"]
          }
        }
      },
      {
        $sort: {
          visitTime: 1
        }
      }
    ])
  } catch (error) {
    throw "数据异常"
  }
}

const getFullyLoadPerByGroupType = async function (appID, sTime, eTime, groupType) {
  try {
    return await Performance.aggregate([
      {
        $match: {
          visitTime: {
            $gte: sTime,
            $lt: eTime
          },
          appID: appID,
        }
      },
      {
        $group: {
          _id: "$" + groupType,
          load: {
            $avg: "$performanceDetail.load"
          }
        }
      },
      {
        $project: {
          _id: 0,
          load: 1,
          province: "$_id"
        }
      }
    ])
  } catch (error) {
    throw "数据异常"
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
  savePerformance,
  getKeyPerToday,
  getKeyPerDividerByPage,
  getWaterfallDividerByPage,
  getFullyLoadPerByGroupType,
  getApdex,
  getLoadPerDividerByPage,
  deleteAllPerByAppID
}
