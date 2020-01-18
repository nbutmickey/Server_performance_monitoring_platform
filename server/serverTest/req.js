let request=require("request");
request.get("http://ip.taobao.com/service/getIpInfo.php?ip=120.34.169.50", function(err, response, body){
    console.log(JSON.parse(response.body));
    let {code,data}=JSON.parse(response.body);
    if(code===0){
        return {
            country:data.country,
            province:data.region,
            city:data.city,
            isp:data.isp
        }
    }
});