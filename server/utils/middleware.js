let ipSearch = require("./ipSearch");
exports.validate=function (req,res,next) {
    let type= req.query.dimensionType;
    if(type>5||type<0){
        req.query.dimensionType=0;
    }
    next();
}

exports.setIPInfo=async function (req,res,next) {
    let tempIP = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress || req.connection.socket.remoteAddress || req.connection.remoteAddress || '';
    let IP = tempIP.split(":")[tempIP.split(":").length - 1]
    //查询IP地址对应的地理信息
    let IPInfo = await ipSearch(IP);//需修改成IP;
    
    //以下代码需要优化;
    let tempData=JSON.parse(req.query.dataJson)
    tempData.ip=IPInfo.ip;
    tempData.province=IPInfo.province;
    tempData.isp=IPInfo.isp;
    req.query.dataJson=tempData;
    next();
}