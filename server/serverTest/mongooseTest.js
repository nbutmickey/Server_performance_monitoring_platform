let PvInfo = require("../db/model/PV");
let UvInfo = require("../db/model/UV");


PvInfo.aggregate([
        {
            $match: {
                visitTime: {
                    $gte:"2020-02-04T07:18:19.382+00:00",
                    $lt: "2020-02-05T07:18:19.382+00:00"
                },
                appID:"kol9l-k5dvol2z-b4cad0ad-k5dvol2z"
            }
        },
        {
            $group: {
                _id: {$hour:"$visitTime"},
                count:{$sum:1}    
            }
        }
    ]).exec(function(res){console.log(res);})
//console.log(result);
