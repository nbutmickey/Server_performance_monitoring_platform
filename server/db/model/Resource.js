var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var resource=new Schema({
    clientID:{
        type:String,
        required:true
    },
    appID:{
        type:String,
        required:true
    },
    visitTime:{
        type:Date,
        required:true
    },
    detail:{
        type:Array,
        required:true
    }
});

var Resource = mongoose.model("resource", resource);

module.exports = Resource;