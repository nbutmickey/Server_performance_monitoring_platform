var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UvInfo = new Schema({
    clientID: {
        type: String,
        required: true
    },
    appID: {
        type: String,
        required: true
    },
    ipAddr: {
        type: String,
        required: true
    },
    country:String,
    province:String,
    city: String,
    isp:  String,
    os:String,
    osBit:Number,
    screen:String,
    visitTime: {
        type: Date,
        required: true
    },
    
});

const updateOneUvInfo=(clientID,appID,os,osBit,screen)=>{
    return new Promise((resolve,reject)=>{
        UvInfo.updateOne({clientID:clientID,appID:appID},{os:os,osBit:osBit,screen:screen},(err)=>{
            if(err){
                reject(false);
            }
            resolve(true);
        })
    })
}

const findUvByIP=(ipaddress)=>{
    return new Promise((resolve,reject)=>{
        UvInfo.findOne({ ipAddr: ipaddress }, (err, result) => {
            if (err) {
                reject(err);
            }
            if (result !== null) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    })
}

const deleteAllUvInfo=(appID,ipaddr)=>{
    return new Promise((resolve,reject)=>{
        UvInfo.deleteMany({appID:appID,ipAddr:ipaddr},(err)=>{
            if(err){
                reject(false);
            }
                resolve(true);
        })
    });
}

const saveUvInfo = (uvinfo) => {
    return new Promise((resolve, reject) => {
        uvinfo.save((err) => {
            if (err) {
                reject(false)
            }
            resolve(true);
        })
    })
}

// 创建一个model
var UvInfo = mongoose.model("uvInfo", UvInfo);

module.exports = { UvInfo,saveUvInfo,findUvByIP,deleteAllUvInfo,updateOneUvInfo};