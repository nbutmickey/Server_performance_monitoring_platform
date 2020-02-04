let str="http://192.168.31.88:3000/collect/clientID/?appID=kol9l-k5dvol2z-b4cad0ad-k5dvol2z";
let reg=/[http|https]*?:\/\/192.168.31.88:3000\/collect\/clientID\/\?appID=[a-z0-9]{5}-[a-z0-9]{8}-[a-z0-9]{8}-[a-z0-9]{7}/;

let str2="kol9l-k5dvol2z-b4cad0ad-k5dvol2";
let reg2=/[a-z0-9]{5}-[a-z0-9]{8}-[a-z0-9]{8}-[a-z0-9]{7}/

let str3="http://192.168.31.88:3000/collect/imgReport?type=performance&dataJson=%7B%22clientID%22%3A%221dvqlmugs-jih79%22%2C%22appID%22%3A%22kol9l-k5dvol2z-b4cad0ad-k5dvol2z%22%2C%22visitTime%22%3A1580369411629%2C%22pageurl%22%3A%22http%3A%2F%2F192.168.31.88%3A8080%2F%23%2Fdashboard%22%2C%22domain%22%3A%22192.168.31.88%22%2C%22referrer%22%3A%22%22%2C%22performanceDetail%22%3A%7B%22dns%22%3A0%2C%22tcp%22%3A0%2C%22ssl%22%3A1580369409445%2C%22ttfb%22%3A1%2C%22trans%22%3A14%2C%22dom%22%3A994%2C%22resource%22%3A951%2C%22firstByte%22%3A15%2C%22fpt%22%3A29%2C%22tti%22%3A1023%2C%22ready%22%3A1023%2C%22load%22%3A1980%2C%22navType%22%3A%22RELOAD%22%7D%7D"
let reg3=/[http|https]*?:\/\/192.168.31.88:3000\/collect\/imgReport\?./
// console.log(reg3.test(str3));

let str4="http://www.mickey.com:8080/home/Smyhome.html"
let reg4=/(\w+):\/\/([^:/]+)(:\d*)?([^# ]*)/
let arr=str4.match(reg4);
for (var i = 0; i < arr.length ; i++) {
    console.log(arr[i]);
}
// let str5="mickey 2020";
// let reg5=/(mickey|mini)/
// console.log(str5.match(reg5)); //结果可以匹配出mickey

// let str1="123456789.";
// let reg1=/(123456789.)/
// console.log(str1.match(reg1)); //只会匹配"0-9"这个字符串，若想匹配0-9的数字，则可利用[0-9]来实现

// let str6="?|.*a|e|s|?v";
// let reg6=/[?*|a]/;
// console.log(str6.match(reg6));