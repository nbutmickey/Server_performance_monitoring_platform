var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var BaseData = new Schema({

});

var BaseData = mongoose.model("BaseData", BaseData);
module.exports = { BaseData }