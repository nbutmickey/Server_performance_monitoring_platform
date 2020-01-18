let request=require("request");
request.get("http://ip.taobao.com/service/getIpInfo.php?ip=112.34.22.11", function(err, response, body){
    console.log(response.body);
});