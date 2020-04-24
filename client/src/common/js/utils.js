export function setCookie(key,value){
    let exp=new Date();
    exp.setTime(exp.getTime()+7*24*60*60*1000);
    document.cookie=key+"="+escape(value)+";expires="+exp.toGMTString();
}
export function getCookie(key){
    let arr,reg=new RegExp("(^| )"+key+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

export function formatDate(date){
    let newDate=new Date(date);
    let YY=newDate.getFullYear();
    let MM=newDate.getMonth()+1;
    MM=MM<10?'0'+MM:MM;
    let DD=newDate.getDate()+1;
    DD=DD<10?'0'+DD:DD;

    let HH=newDate.getHours();
    HH=HH<10?'0'+HH:HH;
    let mm=newDate.getMinutes();
    mm=mm<10?'0'+mm:mm;
    let ss=newDate.getSeconds();
    ss=ss<10?'0'+ss:ss;
    return `${YY}-${MM}-${DD} ${HH}:${mm}:${ss}`
}