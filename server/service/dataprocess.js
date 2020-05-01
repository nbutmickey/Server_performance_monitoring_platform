const schedule=require("node-schedule");

const apiinfo=require("../service/apiinfo");
const perinfo=require("../service/perinfo");
const resinfo=require("../service/resourceinfo");
const pvinfo=require("../service/pvinfo");
const uvinfo=require("../service/uvinfo");

const deleteData=async function(){
    let date=new Date(Date.now());
    let sTime=date.setMinutes(date.getMinutes() - date.getTimezoneOffset() - 60 * 24 * 7);
    let delapi=await apiinfo.deleteAllApiByTime(sTime);
    let delper=await perinfo.deleteAllPerByTime(sTime);
    let delres=await resinfo.deleteAllResByTime(sTime);
    let delpv=await pvinfo.deleteAllPvByTime(sTime);
    Promise.all([delapi,delper,delres,delpv]).then((result)=>{
        console.log("数据清理成功");
    },(error)=>{
        console.log("数据异常!");
    })
} 

const scheduleProcessData=()=>{
    console.log("开启定时任务");
    //每天0时0分0秒清理7天前的数据
    schedule.scheduleJob("0 0 0 * * *",()=>{
        console.log("开始清理数据");
        deleteData();
    })
}

module.exports={scheduleProcessData};