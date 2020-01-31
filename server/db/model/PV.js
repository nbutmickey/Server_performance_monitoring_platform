var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PvInfo = new Schema({
    clientID: {
        type: String,
        required: true
    },
    appID: {
        type: String,
        required: true
    },
    visitTime: {
        type: Date,
        required: true
    },
    pageURL: String,
    referrer: String
});

const savePvInfo = function (pvInfo) {
    return new Promise((resolve, reject) => {
        pvInfo.save((err) => {
            if (err) {
                reject(false);
            }
            resolve(true);
        })
    });

}

// 创建一个model
var PvInfo = mongoose.model("pvInfo", PvInfo);

module.exports = { PvInfo, savePvInfo };