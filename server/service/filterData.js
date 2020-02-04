exports.filterPerData = (data)=>{
    let {redirect,dns,tcp,ssl,ttfb,trans,dom,resource,firstByte, dnsCache,fpt,tti,ready,load}=data.performanceDetail;
    //设置阈值
    if(redirect<0||dns<0||tcp<0||ttfb<0||ssl<0||trans<0||dom<0||resource<0||firstByte<0||dnsCache<0||fpt<0||tti<0||ready<0||load<0){
        return false;
    //关联指标检测    
    }else if(fpt>ready||ready>load){
        return false;   
    }else {
        return data;
    }
}
exports.filterResData=(data)=>{
    data.detail.forEach((item)=>{
        item.Duration=parseInt(item.Duration);
      });
    return data;
}

exports.filterApiData=(data)=>{
    data.duration=parseInt(data.duration);
    return data;
}
