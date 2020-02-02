//获取cookie值
function getCookie(key) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(key + "=");
        if (c_start != -1) {
            c_start = c_start + key.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
    }
}



//获取appID
function getAppID() {
    if (window._appID) {
        return _appID;
    }
}


//PV统计
function PV_Collect() {
    var location = window.location;
    var oldURL = location.href;
    var oldHash = location.hash;
    //每隔100ms监测一下location.hash是否发生变化
    setInterval(function () {
        var newURL = location.href;
        var newHash = location.hash;
        if (newHash != oldHash || newURL != oldURL) {
            oldURL = newURL;
            oldHash = newHash;
            //上传数据
            let { url, referrer, ua } = BaseInfo_Collection(location.href, window.document.referrer);
            let pvInfo = {
                clientID: getCookie("userID"),
                appID: getAppID(),
                visitTime: Date.now(),
                os: OSInfo_Collection(),
                bs: BrowserInfo_Collection(),
                screen: ScreenInfo_Collection(),
                isPC:isPC(),
                pageURL: url,
                referrer,
                ua
            }
            uploadData("pv", pvInfo);
        }
    }, 100)

}

function UV_Collect() {
    let uvInfo = {
        clientID: getCookie("userID"),
        appID: getAppID(),
        visitTime: Date.now(),
        os: OSInfo_Collection(),
        bs: BrowserInfo_Collection(),
        screen: ScreenInfo_Collection(),
        isPC:isPC()
    }
    uploadData("uv", uvInfo);
}


//拦截所有请求
function apiInfo_Collection() {
    var start, end;
    function onLoadStart(data) {
        start = data.timeStamp;
    }
    function onLoadEnd(data) {
        end = data.timeStamp;
        let apiInfo = {
            clientID: getCookie("userID"),
            appID: getAppID(),
            visitTime: Date.now(),
            pageURL: location.href,
            ua: navigator.userAgent,
            statusCode: data.target.status,
            apiURL: data.target.responseURL,
            duration: end - start,
            os: OSInfo_Collection(),
            bs: BrowserInfo_Collection(),
            screen: ScreenInfo_Collection(),
            
        }
        uploadData("api", apiInfo);
    }
    (function (xhr) {
        // Capture request before any network activity occurs:
        var send = xhr.send;
        xhr.send = function (data) {
            this.addEventListener('loadstart', onLoadStart);
            this.addEventListener('loadend', onLoadEnd);
            //this.addEventListener('error', onError);
            return send.apply(this, arguments);
        };
    })(XMLHttpRequest.prototype);

}



//获取浏览器信息
function BrowserInfo_Collection() {
    let agent = navigator.userAgent.toLowerCase();
    //判断IE11浏览器
    let isIE11 = agent.indexOf('trident') > -1 && agent.indexOf("rv:11.0") > -1;
    if (isIE11) {
        return "IE 11";
    }

    if (agent.indexOf("msie") > 0) {
        //判断IE<11的版本
        let reIE = new RegExp("msie (\\d+\\.\\d+);");
        reIE.test(agent);
        let IEVersion = parseFloat(RegExp["$s1"]);
        if (IEVersion == 7) {
            return "IE 7";
        } else if (IEVersion == 8) {
            return "IE 8";
        } else if (IEVersion == 9) {
            return "IE 9";
        } else if (IEVersion == 10) {
            return "IE 10";
        } else {
            return "IE 6";
        }

    } else if (agent.indexOf("edge") > 0 && agent.indexOf("safari") > 0 && agent.indexOf("chrome") > 0) {
        return "Edge";
    } else if (agent.indexOf("firefox") > 0) {
        return "FireFox";
    } else if (agent.indexOf("chrome") > 0) {
        return "Chrome";
    } else if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
        return "Safari";
    }
}

function isPC() {
    let userAgentInfo = navigator.userAgent;
    let agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    let flag = true;
    for (let i = 0; i < agents.length; i++) {
        if (userAgentInfo.indexOf(agents[i]) > 0) { flag = false; break; }
    }
    return flag;
}


//获取基本信息（用户页面url、用户源、当前访问文档的title、当前域名）
function BaseInfo_Collection(absURL, refURL) {
    var tempAbsURL = sessionStorage.getItem("absURL");
    var tempRefURL = sessionStorage.getItem("refURL");
    if (tempAbsURL === null && tempRefURL === null) {
        tempAbsURL = absURL;
        sessionStorage.setItem("absURL", absURL);
        tempRefURL = refURL;
        sessionStorage.setItem("refURL", refURL);
    } else if (absURL !== tempAbsURL) {
        sessionStorage.setItem("refURL", tempRefURL);
        tempRefURL = tempAbsURL;
        sessionStorage.setItem("absURL", absURL);
        tempAbsURL = absURL;
    }
    //console.log({url:tempAbsURL,referrer:tempRefURL,domain:document.domain});
    return { url: tempAbsURL, referrer: tempRefURL, domain: document.domain, ua: navigator.userAgent }
}

//获取屏幕分辨率
function ScreenInfo_Collection() {
    return window.screen.width + "*" + window.screen.height;
}


//获取操作系统类型
function OSInfo_Collection() {
    let userAgent = navigator.userAgent.toLowerCase();
    let win = (navigator.platform == 'Win32') || (navigator.platform == 'Win64') || (navigator.platform == 'wow64');
    let mac = (navigator.platform == 'Mac68K') || (navigator.platform == 'MacPPC') || (navigator.platform == 'Macintosh');
    if (mac) {
        return "MAC OS";
    }
    let unix = (navigator.platform == 'X11') && !win && !mac;
    if (unix) return "UNIX";
    let linux = (String(navigator.userAgent).indexOf("Linux") > -1);
    let android = navigator.userAgent.toLowerCase().match(/android/i) == "android";
    let ipad = userAgent.toLowerCase().indexOf("ipad") > -1;
    let iphone = userAgent.toLowerCase().indexOf("iphone") > -1;
    if (linux) {
        if (android) {
            return "Android";
        } else
            return "LINUX";
    } else if (iphone) {
        return "ios";
    } else if (ipad) {
        return "iPadOS"
    }
    if (win) {
        let win2000 = userAgent.indexOf("windows nt 5.0") > -1 || userAgent.indexOf("windows 2000") > -1;
        let winXP = userAgent.indexOf("windows nt 5.1") > -1 || userAgent.indexOf("windows xp") > -1;
        let win2003 = userAgent.indexOf("windows nt 5.2") > -1 || userAgent.indexOf("windows 2003") > -1;
        let winVista = userAgent.indexOf("windows nt 6.0") > -1 || userAgent.indexOf("windows vista") > -1;
        let win7 = userAgent.indexOf("windows nt 6.1") > -1 || userAgent.indexOf("windows 7") > -1;
        let win8 = userAgent.indexOf("windows nt 6.2") > -1 || userAgent.indexOf("windows 8") > -1;
        let win10 = userAgent.indexOf("windows nt 10.0") > -1 || userAgent.indexOf("windows 10") > -1;
        if (win2000) {
            return "Windows 2000";
        } else if (winXP) {
            return "Windows XP";
        } else if (win2003) {
            return "Windows 2003";
        } else if (winVista) {
            return "Windows Vista";
        } else if (win7) {
            return "Windows 7";
        } else if (win8) {
            return "Windows 8";
        } else if (win10) {
            return "Windows 10"
        } else {
            return "未知操作系统";
        }
    }
}

//性能指数据统计
function performance_Collect() {
    let time = performance.timing || msPerformance.timing || webkitPerformance.timing;
    let loadTime = time.loadEventEnd - time.navigationStart;
    if (loadTime <= 0) {
        //若未加载完，则延迟200ms后继续该函数进行数据的收集，直到成功。
        setTimeout(function () {
            performance_Collect();
        }, 200);
        return;
    }
    let performanceIndex = {
        // 以下是区间段耗时

        redirect: time.redirectEnd - time.redirectStart,
        // DNS解析耗时 
        dns: time.domainLookupEnd - time.domainLookupStart,
        // TCP连接耗时
        tcp: time.connectEnd - time.connectStart,
        //SSL安全连接耗时（需要判断是否为https协议）to do....
        ssl: time.connectEnd - time.secureConnectionStart,
        //首字节时间(Time to First Byte)=>可表征后端整体响应耗时
        ttfb: time.responseStart - time.requestStart,
        //数据传输耗时    
        trans: time.responseEnd - time.responseStart,
        //DOM解析耗时
        dom: time.domInteractive - time.responseEnd,
        //资源加载耗时
        resource: time.loadEventStart - time.domContentLoadedEventEnd,

        // 以下是关键性能指标

        //首包时间(首字节时间)
        firstByte: time.responseStart - time.domainLookupStart,
        //DNS缓存时间
        dnsCache: time.domainLookupStart - time.fetchStart,
        //白屏时间
        fpt: time.responseEnd - time.fetchStart,
        //首次可交互时间
        tti: time.domInteractive - time.fetchStart,
        //DOM Ready时间，即html完全加载时间
        ready: time.domComplete - time.fetchStart,
        //页面完全加载时间
        load: time.loadEventEnd - time.fetchStart,
    }
    let { url, domain, referrer } = BaseInfo_Collection(location.href, window.document.referrer);
    let performanceInfo = {
        clientID: getCookie("userID"),
        appID: getAppID(),
        visitTime: Date.now(),
        pageurl: url,
        domain,
        referrer,
        //进入页面的类型    
        navType: function () {
            let t = "";
            switch (performance.navigation.type) {
                case 0:
                    t = "NAVIGATE";
                    break;
                case 1:
                    t = "RELOAD";
                    break;
                case 2:
                    t = "BACK_FORWARD";
                    break;
                case 255:
                    t = "RESERVED"
            }
            return t;
        }(),
        performanceDetail: performanceIndex
    }
    uploadData("per", performanceInfo);
}

//资源加载详情信息获取(只获取首页)
function resources_Collect() {
    let resourceList = [];
    let perfResEntries = window.performance.getEntriesByType("resource");
    if (perfResEntries) {
        perfResEntries.forEach(function (item) {
            //需过滤掉脚本文件的请求和上传todo....
            let reqAppID = /[http|https]*?:\/\/192.168.31.88:3000\/collect\/clientID\/\?appID=[a-z0-9]{5}-[a-z0-9]{8}-[a-z0-9]{8}-[a-z0-9]{7}/;
            let collectJS = /[http|https]*?:\/\/192.168.31.88:3000\/static\/javascripts\/collection\.js/;
            let uploadJS = /[http|https]*?:\/\/192.168.31.88:3000\/collect\/imgReport\?./;
            let resUploadJS = /[http|https]*?:\/\/192.168.31.88:3000\/collect\/resourceUpload/;
            if (!reqAppID.test(item.name) && !collectJS.test(item.name) && !uploadJS.test(item.name) && !resUploadJS.test(item.name)) {
                resourceList.push({
                    Url: item.name,
                    InitiatorType: item.initiatorType,
                    Duration: item.duration,
                    FileSize: item.transferSize
                })
            }
        })
    }
    //console.log(Object.prototype.toString.call(res));
    let res = {
        clientID: getCookie("userID"),
        appID: getAppID(),
        visitTime: Date.now(),
        detail: resourceList,
    }
    uploadData("res", res);
    //return res;
}
//传输模块(Ajax实现)
// function uploadResDataByAjax() {
//     let xmlHttp;
//     if (window.XMLHttpRequest) {
//         xmlHttp = new XMLHttpRequest();
//     } else {
//         //IE6,IE5浏览器
//         xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     xmlHttp.open("POST", "http://192.168.31.88:3000/collect/resourceUpload", true);
//     xmlHttp.setRequestHeader("Content-Type", "application/json");
//     let resources = Resources_Collect();
//     xmlHttp.send(JSON.stringify(resources));
// }

//传输模块（Image实现）
function uploadData(type, data) {
    let url = 'http://192.168.31.88:3000/collect/upload';
    let image = new Image();
    let UpLoadData = JSON.stringify(data);
    image.src = url + '?' + 'type=' + type + '&dataJson=' + encodeURIComponent(UpLoadData);
    image.onload = image.onerror = function () {
        console.log("数据上传完成！");
    }
}


(function () {
    window.addEventListener("load", function () {
        performance_Collect();
    })
    window.addEventListener("load", function () {
        resources_Collect();
    })
    apiInfo_Collection();
    UV_Collect();
    PV_Collect();
})()