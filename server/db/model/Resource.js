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

const saveResource = (resource) => {
    return new Promise((resolve, reject) => {
        resource.save((err) => {
            if (err) {
                reject(false)
            }
            resolve(true);
        })
    })
}

var Resource = mongoose.model("resource", resource);

module.exports = { Resource,saveResource};