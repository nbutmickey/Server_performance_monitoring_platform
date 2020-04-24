let Performance=require("../db/model/Performance");
exports.getPerLoadTimeByTime=async function(appID,sTime,eTime){
    try {
        return await Performance.aggregate([
            {
                $match:{
                    appID:appID,
                    visitTime:{
                        $gte:sTime,
                        $lt:eTime
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    load: {
                        $avg: "$performanceDetail.load"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    load: 1
                }
            }
        ]);
    } catch (error) {
        throw error;
    }
}
exports.getPerTodayByTime=async function(appID,sTime,eTime){
    try {
        return await Performance.aggregate([
            {
                $match:{
                    appID:appID,
                    visitTime:{
                        $gte:sTime,
                        $lt:eTime
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    fpt:{
                        $avg:"$performanceDetail.fpt" 
                    },
                    ready:{
                        $avg:"$performanceDetail.ready"
                    },
                    tti:{
                        $avg:"$performanceDetail.tti"
                    },
                    load: {
                        $avg: "$performanceDetail.load"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    fpt:1,
                    ready:1,
                    tti:1,
                    load: 1
                }
            }
        ])
    } catch (error) {
        throw error
    }
}
exports.getWaterFallLoadingByTime=async function(appID,sTime,eTime,page){
    try {
        let config=page?{
            $match: {
                visitTime: {
                  $gte: sTime,
                  $lt: eTime,
                },
                pageUrl:page,
                appID: appID
              }
        }:{
            $match: {
                visitTime: {
                  $gte: sTime,
                  $lt: eTime,
                },
                appID: appID
              }
        }
        return await Performance.aggregate([
            config,
            {
                $group: {
                    _id: null,
                    redirect:{
                        $avg:"$performanceDetail.redirect" 
                    },
                    dns:{
                        $avg:"$performanceDetail.dns"
                    },
                    tcp:{
                        $avg:"$performanceDetail.tcp"
                    },
                    ssl: {
                        $avg: "$performanceDetail.ssl"
                    },
                    ttfb:{
                        $avg:"$performanceDetail.ttfb" 
                    },
                    trans:{
                        $avg:"$performanceDetail.trans"
                    },
                    dom:{
                        $avg:"$performanceDetail.dom"
                    },
                    resource: {
                        $avg: "$performanceDetail.resource"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    redirect:1,
                    dns:1,
                    tcp:1,
                    ssl:1,
                    ttfb:1,
                    trans: 1,
                    dom:1,
                    resource:1
                }
            }
        ])
    } catch (error) {
        throw error;
    }
}

exports.getKeyPerTimeByDivider=async function(appID,sTime,eTime,divider,page){
    try {
        let config=page?{
            $match: {
                visitTime: {
                  $gte: sTime,
                  $lt: eTime,
                },
                pageURL:page,
                appID: appID
              }
        }:{
            $match: {
                visitTime: {
                  $gte: sTime,
                  $lt: eTime,
                },
                appID: appID
              }
        }
        return await Performance.aggregate([
          config,
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
        throw error
      }
}

exports.getIntervalTimeByDivider=async function(appID,sTime,eTime,divider,page){
    try {
        let config=page?{
            $match: {
                visitTime: {
                  $gte: sTime,
                  $lt: eTime,
                },
                pageURL:page,
                appID: appID
              }
        }:{
            $match: {
                visitTime: {
                  $gte: sTime,
                  $lt: eTime,
                },
                appID: appID
              }
        }
        return await Performance.aggregate([
          config,
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
              ssl:{
                $avg: "$performanceDetail.ssl"
              },
              ttfb:{
                $avg: "$performanceDetail.ttfb"
              },
              trans:{
                $avg: "$performanceDetail.trans"
              },
              dom:{
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
              ttfb:1,
              trans:1,
              dom:1,
              resource:1,
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
        throw error
      }
}

exports.getPageListKeyPerByTime=async function(appID,sTime,eTime){
    try {
        return await Performance.aggregate([
            {
                $match:{
                    appID:appID,
                    visitTime:{
                        $gte:sTime,
                        $lt:eTime
                    }
                }
            },
            {
                $group: {
                    _id: "$pageUrl",
                    fpt:{
                        $avg:"$performanceDetail.fpt" 
                    },
                    ready:{
                        $avg:"$performanceDetail.ready"
                    },
                    tti:{
                        $avg:"$performanceDetail.tti"
                    },
                    load: {
                        $avg: "$performanceDetail.load"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    pageUrl:"$_id",
                    fpt:1,
                    ready:1,
                    tti:1,
                    load: 1
                }
            }
        ])
    } catch (error) {
        throw error;
    }
}

exports.getFullyLoadPerByGroupType=async function(appID,sTime,eTime,groupType){
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
        throw error;
      }
} 