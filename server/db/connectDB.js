var mongoose=require("mongoose");
var DB_URL="mongodb://localhost:27017/PerformanceMonitoringPlatform";

// 连接mongoDB数据库
mongoose.connect(DB_URL,{ useNewUrlParser: true,useUnifiedTopology: true}).then(() => {
    console.log("mongodb connect successfully");
}).catch((err) => {
    console.log(err);
});

module.exports=mongoose;