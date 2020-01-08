// function timestampToTime(timestamp) {
//    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
//    var Y = date.getFullYear() + '-';
//    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
//    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
//    var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
//    var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
//    var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
//     return Y+M+D+h+m+s;                  
// }

//关键性能指标统计
function performance_Collect(){
    let time=window.performance.timing||window.msPerformance.timing||window.webkitPerformance.timing;
    let performanceIndex={
    // DNS解析耗时 
        dns:time.domainLookupEnd-time.domainLookupStart,
    // TCP连接耗时
        tcp:time.connectEnd-time.connectStart,
    //SSL安全连接耗时（需要判断是否为https协议）to do....
        ssl:time.connectEnd-time.secureConnectionStart,
    //首字节时间(Time to First Byte)
        ttfb:time.responseStart-time.requestStart,    
    //数据传输耗时    
        trans:time.responseEnd-time.responseStart,
    //DOM解析耗时
        dom:time.domInteractive-time.responseEnd,
    //资源加载耗时
        resource:time.loadEventStart-time.domContentLoadedEventEnd,        
    //首包时间
        firstByte:time.responseStart-time.domainLookupStart,
    //白屏时间
        fpt:time.responseEnd-time.fetchStart,
    //首次可交互时间
        tti:time.domInteractive-time.fetchStart,
    //DOM Ready时间
        ready:time.domContentLoadedEventEnd-time.fetchStart,
    //页面完全加载时间
        load:time.loadEventEnd-time.fetchStart
    }
    return performanceIndex;
}

//UV统计
function UV_Collect(){
    let IP=req.headers['x-forwarded-for']||req.ip||req.socket.remoteAddress||req.connection.socket.remoteAddress||req.connection.remoteAddress||'';
    if(IP.split(',').length>0){
      IP=IP.split(',')[0];
    }
    return IP;
}


//PV统计
function PV_Collect(){
    let location=window.location;
    oldURL=location.href;
    oldHash=location.hash;
    console.log(oldURL);
    console.log(document.referrer);
    //每隔100ms监测一下location.hash是否发生变化
    // setInterval(function(){
    //     let newURL=location.href;
    //     let newHash=location.hash;
    //     if(newHash!=oldHash){
    //         oldURL=newURL;
    //         oldHash=newHash;
    //         //上传数据
    //         //TODO.......
    //     }
    // },100)

}


//拦截所有请求
function hookAjax() {
    XMLHttpRequest.prototype.nativeOpen=XMLHttpRequest.prototype.open;
    let customizeOpen=function (method,url,async,user,password) {
        this.nativeOpen(method,url,async,user,password);
    }
    XMLHttpRequest.prototype.open=customizeOpen;
}

//传输模块(Ajax实现)
function transport_Collection() {
    let xmlHttp;
    if(window.XMLHttpRequest){
        xmlHttp=new XMLHttpRequest();
        //console.log("support");
    }else{
        //IE6,IE5浏览器
        xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlHttp.open("POST","http://127.0.0.1:3000/",true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    let performanceIndex=performance_Collect();
    xmlHttp.send("performnce="+JSON.stringify(performanceIndex));
}

//传输模块（Image实现）
// function imgReport() {
//     let data={
//         creationTime:11,
//         count:1
//     }
//     let url='http://127.0.0.1:3000/imgReport/';
//     let image=document.createElement("img");
//     //let items=[];
//     items=JSON.stringify(data);
//     //let name='img_'+(+new Date());
//     image.onload=image.onerror=function(){
//         console.log("收到请求");
//     }
//     // let newUrl = url + (url.indexOf('?') < 0 ? '?' : '&') + items.join('&');
//     image.src = url+'?'+'creationTime=11&count=1';
// }

//获取浏览器信息
function BrowserInfo_Collection() {
    let agent=navigator.userAgent.toLowerCase();
    //判断IE11浏览器
    let isIE11 = agent.indexOf('trident') > -1 && agent.indexOf("rv:11.0") > -1;
    if(isIE11){
        return "IE 11";
    }

    if(agent.indexOf("msie")>0){
        //判断IE<11的版本
        let reIE=new RegExp("msie (\\d+\\.\\d+);");
        reIE.test(agent);
        let IEVersion=parseFloat(RegExp["$s1"]);
        if(IEVersion==7){
            return "IE 7";
        }else if(IEVersion==8){
            return "IE 8";
        }else if(IEVersion==9){
            return "IE 9";
        }else if(IEVersion==10){
            return "IE 10";
        }else{
            return "IE 6";
        }
        
    }else if(agent.indexOf("edge")>0&&agent.indexOf("safari")>0&&agent.indexOf("chrome")>0){
        return "Edge";
    }else if(agent.indexOf("firefox")>0){
        return "FireFox";
    }else if(agent.indexOf("chrome")>0){
        return "Chrome";
    }else if(agent.indexOf("safari")>0&&agent.indexOf("chrome")<0)
    {
        return "Safari";
    }
}

//获取基本信息（用户页面url、用户源、当前访问文档的title、当前域名）
function BaseInfo_Collection(document) {
    if(document){
        //域名
        let domain=document.domain;
        //url
        let url=document.URL;
        //源地址（入口地址）
        let referrer=document.referrer;    
    }
}

//获取屏幕分辨率
function ScreenInfo_Collection(){
    return window.screen.width+"*"+window.screen.height;
}


//获取操作系统类型
function OSInfo_Collection(){
    let userAgent=navigator.userAgent.toLowerCase();
    let win=(navigator.platform=='Win32')||(navigator.platform=='Win64')||(navigator.platform=='wow64');
    let mac=(navigator.platform=='Mac68K')||(navigator.platform=='MacPPC')||(navigator.platform=='Macintosh');
    if(mac) {
        //console.log(mac);
        return "MAC";
    }
    let unix=(navigator.platform=='X11')&&!win&&!mac;
    if(unix) return "UNIX";
    let linux= (String(navigator.platform).indexOf("Linux") > -1); 
    let android=userAgent.toLowerCase().match(/android/i)=="android";
    if(linux){
        if (android) {
            return "Android";
        }else
            return "LINUX";
    }
    if(win){
        let win2000=userAgent.indexOf("windows nt 5.0")>-1||userAgent.indexOf("windows 2000")>-1;
        let winXP=userAgent.indexOf("windows nt 5.1")>-1||userAgent.indexOf("windows xp")>-1;
        let win2003=userAgent.indexOf("windows nt 5.2")>-1||userAgent.indexOf("windows 2003")>-1;
        let winVista=userAgent.indexOf("windows nt 6.0")>-1||userAgent.indexOf("windows vista")>-1;
        let win7=userAgent.indexOf("windows nt 6.1")>-1||userAgent.indexOf("windows 7")>-1;
        let win8=userAgent.indexOf("windows nt 6.2")>-1||userAgent.indexOf("windows 8")>-1;
        let win10=userAgent.indexOf("windows nt 10.0")>-1||userAgent.indexOf("windows 10")>-1;
        if(win2000){
            return "Windows 2000";
        }else if(winXP){
            return "Windows XP";
        }else if(win2003){
            return "Windows 2003";
        }else if(winVista){
            return "Windows Vista";
        }else if(win7){
            return "Windows 7";
        }else if(win8){
            return "Windows 8";
        }else if(win10){
            return "Windows 10"
        }else {
            return "未知操作系统";
        }
    }
}

//获取操作系统位数
function OSbit_Collection() {
    let agent=navigator.userAgent.toLowerCase();
    if(agent.indexOf("win32")>=0||agent.indexOf("wow32")>=0){
        return 32;
    }else if(agent.indexOf("win64")>=0||agent.indexOf("wow32")>=0){
        return 64;
    }else 
        return 64;
}



(function(){
    
    console.log(BrowserInfo_Collection());
    console.log(ScreenInfo_Collection());
    console.log(OSInfo_Collection());
    console.log(OSbit_Collection());
    PV_Collect();
    //imgReport()
    //console.log(GeoLocatin_Collection());
    //console.log(performanceInde);
    // setInterval(function () {
    //     transport_Collection();
    // },3000)

})()