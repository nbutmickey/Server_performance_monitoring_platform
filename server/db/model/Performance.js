var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Performance = new Schema({
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
    pageUrl: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    referrer: String,
    navType: String,
    performanceDetail: {
        dns: Number,
        tcp: Number,
        ssl: Number,
        ttfb: Number,
        trans: Number,
        dom: Number,
        resource: Number,
        firstByte: Number,
        fpt: Number,
        tti: Number,
        ready: Number,
        load: Number
    }
});

const savePerformance=function (performance) {
    return new Promise((resolve,reject)=>{
        performance.save((err)=>{
            if(err){    
            reject(false)
            }
            resolve(true)
        })
    })
}

var Performance = mongoose.model("Performance", Performance);
module.exports = { Performance,savePerformance }
