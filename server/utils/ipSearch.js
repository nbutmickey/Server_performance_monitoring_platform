let request=require("request");
function getIPInfo(ipaddr) {
    request.get("http://ip.taobao.com/service/getIpInfo.php?ip="+ipaddr, function(err, response){
        //console.log(JSON.parse(response.body));
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
}
module.exports=getIPInfo;
