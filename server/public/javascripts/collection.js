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
        console.log("jiance");
        if (newHash != oldHash || newURL != oldURL) {
            oldURL = newURL;
            oldHash = newHash;
            console.log('触发');
            //上传数据
            let pvInfo = {
                clientID: getCookie("userID"),
                appID: getAppID(),
                visitTime: Date.now()
            }
            uploadData("pv", pvInfo);
            uploadData("performance", performance_Collect());
        }
    }, 100)

}

function UV_Collect() {
    let uvInfo = {
        clientID: getCookie("userID"),
        appID: getAppID(),
        visitTime: Date.now(),
        os: OSInfo_Collection(),
        osBit: OSbit_Collection(),
        screen: ScreenInfo_Collection()
    }
    uploadData("uv", uvInfo);
}


//拦截所有请求
function hookAjax() {
    XMLHttpRequest.prototype.nativeOpen = XMLHttpRequest.prototype.open;
    let customizeOpen = function (method, url, async, user, password) {
        this.nativeOpen(method, url, async, user, password);
    }
    XMLHttpRequest.prototype.open = customizeOpen;
}

//传输模块(Ajax实现)
// function transport_Collection() {
//     let xmlHttp;
//     if(window.XMLHttpRequest){
//         xmlHttp=new XMLHttpRequest();
//         //console.log("support");
//     }else{
//         //IE6,IE5浏览器
//         xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     xmlHttp.open("POST","http://127.0.0.1:3000/",true);
//     xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//     let performanceIndex=performance_Collect();
//     xmlHttp.send("performnce="+JSON.stringify(performanceIndex));
// }

//传输模块（Image实现）
function uploadData(type, data) {
    let url = 'http://192.168.31.88:3000/collect/imgReport';
    let image = new Image();
    let UpLoadData = JSON.stringify(data);
    image.src = url + '?' + 'type=' + type + '&dataJson=' + encodeURIComponent(UpLoadData);
    image.onload = image.onerror = function () {
        console.log("数据上传完成！");
    }
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

//获取基本信息（用户页面url、用户源、当前访问文档的title、当前域名）
function BaseInfo_Collection(document) {
    if (document) {
        //域名
        let domain = document.domain;
        //url(页面)
        let url = document.URL;
        //源地址（入口地址）
        let referrer = document.referrer;
        return {
            domain: domain,
            url: url,
            referrer: referrer
        }
    }
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
        return "MAC";
    }
    let unix = (navigator.platform == 'X11') && !win && !mac;
    if (unix) return "UNIX";
    let linux = (String(navigator.platform).indexOf("Linux") > -1);
    let android = userAgent.toLowerCase().match(/android/i) == "android";
    if (linux) {
        if (android) {
            return "Android";
        } else
            return "LINUX";
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

//获取操作系统位数
function OSbit_Collection() {
    let agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
        return 32;
    } else if (agent.indexOf("win64") >= 0 || agent.indexOf("wow32") >= 0) {
        return 64;
    } else
        return 64;
}

//性能指数据统计
function performance_Collect() {
    //console.log(window.performance.timing);
    let time = window.performance.timing || window.msPerformance.timing || window.webkitPerformance.timing;
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

        // DNS解析耗时 
        dns: time.domainLookupEnd - time.domainLookupStart,
        // TCP连接耗时
        tcp: time.connectEnd - time.connectStart,
        //SSL安全连接耗时（需要判断是否为https协议）to do....
        ssl: time.connectEnd - time.secureConnectionStart,
        //首字节时间(Time to First Byte)
        ttfb: time.responseStart - time.requestStart,
        //数据传输耗时    
        trans: time.responseEnd - time.responseStart,
        //DOM解析耗时
        dom: time.domInteractive - time.responseEnd,
        //资源加载耗时
        resource: time.loadEventStart - time.domContentLoadedEventEnd,

        // 以下是关键性能指标

        //首包时间
        firstByte: time.responseStart - time.domainLookupStart,
        //白屏时间
        fpt: time.responseEnd - time.fetchStart,
        //首次可交互时间
        tti: time.domInteractive - time.fetchStart,
        //DOM Ready时间，即html完全加载时间
        ready: time.domContentLoadedEventEnd - time.fetchStart,
        //页面完全加载时间
        load: time.loadEventEnd - time.fetchStart,
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
        }()
    }

    let performanceInfo = {
        clientID: getCookie("userID"),
        appID: getAppID(),
        visitTime: Date.now(),
        pageurl: BaseInfo_Collection(document).url,
        domain: BaseInfo_Collection(document).domain,
        referrer: BaseInfo_Collection(document).referrer,
        performanceDetail: performanceIndex
    }
    console.log(performanceInfo);
    return performanceInfo;

}

//资源加载详情信息获取
function Resources_Collect() {
    let resourceList = [];
    let perfResEntries = window.performance.getEntries();
    if (perfResEntries) {
        perfResEntries.forEach(function (item) {

            //需过滤掉脚本文件的请求和上传todo....
            resourceList.push({
                Url: item.name,
                EntryType: item.entryType,
                InitiatorType: item.InitiatorType,
                Duration: item.duration,
                FileSize: item.transferSize
            })
        })
    }

    let res = {
        clientID: getCookie("userID"),
        appID: getAppID(),
        visitTime: Date.now(),
        detail: resourceList,
    }

    return res;
}


(function () {
    window.addEventListener("load", function () {
        uploadData("resource", Resources_Collect());
    })
    UV_Collect();
    PV_Collect();
})()