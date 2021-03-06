var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var APIInfo = new Schema({
    appID: {
        type: String,
        required: true
    },
    clientID:{
        type:String,
        required:true
    },
    visitTime:{type:Date,required:true},
    pageURL:String,
    ua:String,
    apiURL:String,
    statusCode:Number,
    duration:Number,
    province:String,
    isp:String,
    ip:String,
    os:String,
    bs:String,
    screen:String,
    methods:String
})

// 创建一个model
var APIInfo = mongoose.model("APIInfo", APIInfo);
module.exports = APIInfo;