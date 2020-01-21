let request=require("request")
function  getIPInfo(ipaddr) {
    return new Promise((resolve,reject)=>{
        request.get("http://ip.taobao.com/service/getIpInfo.php?ip="+ipaddr, function(err, response){
               let {code,data}=JSON.parse(response.body);
               if(code===0){
                   resolve({
                    country:data.country,
                    province:data.region,
                    city:data.city,
                    isp:data.isp
                }); 
               }else{
                   reject(false);
               }
           }); 
    })
}
module.exports=getIPInfo;
