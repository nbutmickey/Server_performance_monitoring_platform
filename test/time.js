function getNowTime(){
    const d=new Date(Date.now());
    d.setMinutes(d.getMinutes()-d.getTimezoneOffset());
    return d.toISOString();
}
console.log(locateDate());