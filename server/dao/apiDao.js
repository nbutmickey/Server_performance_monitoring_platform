let APIInfo = require("../db/model/API");
exports.getAPISuccessCountByTime=async function(appID,sTime,eTime){
    try {
        return await APIInfo.countDocuments({ appID: appID, visitTime: { $gte: sTime, $lt:eTime }, statusCode: { $gte: 200, $lt: 400 } });
    } catch (error) {
        console.log(error);
        throw error;
    }
}
exports.getAPISuccessDurationByTime=async function(appID,sTime,eTime){
    try {
        return  await APIInfo.aggregate([
            {
                $match: {
                    visitTime: {
                        $gte: sTime,
                        $lt: eTime
                    },
                    statusCode: { $gte: 200, $lt: 400 },
                    appID: appID
                }
            },
            {
                $group: {
                    _id: null,
                    duration: {
                        $avg: "$duration"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    duration: 1
                }
            }
        ]);
    }catch (error) {
        console.log(error);
        throw error;
    }
}
exports.getAPIFailedCountByTime=async function(appID,sTime,eTime){
    try {
        return await APIInfo.countDocuments({ appID: appID, visitTime: { $gte: sTime, $lt:eTime }, statusCode: { $gte: 400, $lt: 600 } });
    } catch (error) {
        console.log(error);
        throw error;
    }
}
exports.getAPITotalCountByTime=async function(appID,sTime,eTime){
    try {
        return await APIInfo.countDocuments({ appID: appID, visitTime: { $gte: sTime, $lt:eTime } });
    } catch (error) {
        console.log(error);
        throw error;
    }
}
exports.getAllRequestFailedAPIByTime=async function(appID,sTime,eTime){
    try {
        return await APIInfo.aggregate([
            {
                $match: {
                    visitTime: {
                        $gte: sTime,
                        $lt: eTime
                    },
                    statusCode:{
                        $gte: 400,
                        $lt: 600
                    },
                    appID: appID
                }
            },
            {
                $group: {
                    _id: "$apiURL",
                    failedCount:{$sum:1},
                    failedDuration: {
                        $avg: "$duration"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    apiURL:"$_id",
                    duration: "$failedDuration",
                    fail:"$failedCount"
                }
            }
        ])
    } catch (error) {
        throw error;
    }
}
exports.getAllRequestAPIByTime=async function(appID,sTime,eTime){
    try {
        return await APIInfo.aggregate([
            {
                $match: {
                    visitTime: {
                        $gte: sTime,
                        $lt: eTime
                    },
                    appID: appID
                }
            },
            {
                $group: {
                    _id: "$apiURL",
                    allCount:{$sum:1},
                    reqDuration: {
                        $avg: "$duration"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    apiURL:"$_id",
                    request: "$allCount",
                    duration:"$reqDuration"
                }
            }
        ])
    } catch (error) {
        throw error;
    }
}
exports.getAllAPICountDividerByTime=async function(appID,sTime,eTime,divider){
    try {
        
        return await APIInfo.aggregate([
           {
                $match: {
                    visitTime: {
                      $gte: sTime,
                      $lt: eTime,
                    },
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
              count:{
                  $sum:1
                }
            }
          },
          {
            $project: {
              _id: 0,
              allCount:"$count",
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
exports.getSuccessAPICountDividerByTime=async function(appID,sTime,eTime,divider){
    try {
        
        return await APIInfo.aggregate([
           {
                $match: {
                    visitTime: {
                      $gte: sTime,
                      $lt: eTime,
                    },
                    statusCode:{
                      $gte: 200,
                      $lt: 400
                    },
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
              count:{
                  $sum:1
                }
            }
          },
          {
            $project: {
              _id: 0,
              success:"$count",
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
exports.getFailedAPICountDividerByTime=async function(appID,sTime,eTime,divider){
    try {
        return await APIInfo.aggregate([
           {
                $match: {
                    visitTime: {
                      $gte: sTime,
                      $lt: eTime,
                    },
                    statusCode:{
                      $gte: 400,
                      $lt: 600
                    },
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
              count:{
                  $sum:1
                }
            }
          },
          {
            $project: {
              _id: 0,
              fail:"$count",
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
exports.getSuccessAPIDurationDividerByTime=async function(appID,sTime,eTime,divider){
    try {
        return await APIInfo.aggregate([
           {
                $match: {
                    visitTime: {
                      $gte: sTime,
                      $lt: eTime,
                    },
                    statusCode:{
                      $gte: 200,
                      $lt: 400
                    },
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
              success:{
                  $sum:1
              },
              successDuration:{
                  $avg:"$duration"
              }
            }
          },
          {
            $project: {
              _id: 0,
              success:1,
              successDuration:1,
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
exports.getFailedAPIDurationDividerByTime=async function(appID,sTime,eTime,divider){
    try {
        
        return await APIInfo.aggregate([
           {
                $match: {
                    visitTime: {
                      $gte: sTime,
                      $lt: eTime,
                    },
                    statusCode:{
                      $gte: 400,
                      $lt: 600
                    },
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
              failed:{$sum:1},
              failDuration:{
                  $avg:"$duration"
              }
            }
          },
          {
            $project: {
              _id: 0,
              failed:1,
              failDuration:1,
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