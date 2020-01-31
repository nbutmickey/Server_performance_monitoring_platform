let request=require("request")
function  getIPInfo(ipaddr) {
    return new Promise((resolve,reject)=>{
        request.get("http://hubing.online:8085/lookUp?ip="+ipaddr, function(err, response){
               let { success,data}=JSON.parse(response.body);
               if(success){
                   resolve({
                    country:data.country,
                    province:data.province,
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
