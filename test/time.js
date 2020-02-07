function getNowTime(v){
    const d=new Date(v);
    //d.setMinutes(d.getMinutes()-d.getTimezoneOffset());
    return d;
}
//console.log(Date.now());
//console.log(new Date(1580875202257));
//console.log(12072/1000)
//console.log(new Date(Date.parse(new Date())));
// console.log(new Date(1580913900000));
// console.log(new Date(new Date().getTime()+8*60*60*1000));
// console.log(new Date(new Date(new Date().toLocaleDateString()).getTime()-16*60*60*1000));
// //console.log(new Date(new Date().toLocaleDateString().getTime()+8*60*60*1000));
// console.log(new Date(Date.now()));

let moment=require("moment");
console.log(moment().format());
console.log(moment().startOf("day"));
