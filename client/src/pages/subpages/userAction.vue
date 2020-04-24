<template>
  <div class="container">
     <div class="sideBar">
       <h4>按用户访问路径排行</h4>
       <div class="list">
         <div class="item" :class="{active:index===mark}" @click="changeItem(index)" v-for="(item,index) in visitorsInfo" :key="index">
           <span class="left">用户 {{item.clientID}}</span>
           <span class="right">
             详情
             <a-icon type="right" />
           </span>
         </div>
       </div>
     </div>
     <div class="content">
       <div class="infoPanel">
         <h4>用户基本信息</h4>
         <a-row>
          <a-col :span="6" style="padding:0 4px">
            <a-card title="用户IP">
              <p>{{baseInfo.ip}}</p>
            </a-card>
          </a-col>
          <a-col :span="6" style="padding:0 4px">
            <a-card title="操作系统" >
              <p>{{baseInfo.os}}</p>
            </a-card>
          </a-col>
          <a-col :span="6" style="padding:0 4px">
            <a-card title="浏览器" >
              <p>{{baseInfo.bs}}</p>
            </a-card>
          </a-col>
          <a-col :span="6" style="padding:0 4px">
            <a-card title="分辨率" >
              <p>{{baseInfo.screen}}</p>
            </a-card>
          </a-col>
        </a-row>
        <a-row style="padding:4px 0">
          <a-col :span="6" style="padding:0 4px">
            <a-card title="国家">
              <p>{{baseInfo.country}}</p>
            </a-card>
          </a-col>
          <a-col :span="6" style="padding:0 4px">
            <a-card title="省份" >
              <p>{{baseInfo.province}}</p>
            </a-card>
          </a-col>
          <a-col :span="6" style="padding:0 4px">
            <a-card title="城市" >
              <p>{{baseInfo.city}}</p>
            </a-card>
          </a-col>
          <a-col :span="6" style="padding:0 4px">
            <a-card title="服务提供商" >
              <p>{{baseInfo.isp}}</p>
            </a-card>
          </a-col>
        </a-row>
       </div>
       <div class="pathPanel">
         <h4>关键路径记录</h4>
         <div class="pathLine">
           <a-timeline>
            <a-timeline-item v-for="(item,index) in userPath" :key="index">
              <a-icon v-if="index==userPath.length-1" slot="dot"  type="check-circle"/>
              <p>{{item.url}}</p>
              <p style="color:rgba(0,0,0,.45)">访问时间：{{formatTime(item.time)}} <span v-if="index!==0" style="display:disply-block;margin-left:20px">间隔：{{item.duration}}</span></p>
            </a-timeline-item>
          </a-timeline>
         </div>
       </div>
     </div>
  </div>
</template>

<script>
// import "../common/style/main.less"
import { formatDate } from "@/common/js/utils"
export default {
  data() {
    return {
      mark: 0,
      baseInfo:{},
      userPath:[],
      visitorsInfo:[]
    };
  },
  async created () {
    await this.getVisitorList();
    this.baseInfo=this.visitorsInfo[0].baseInfo;
    await this.getVisitorPath(this.visitorsInfo[0].clientID);
  },
  methods: {
    formatTime(time){
     return formatDate(time);
    },
    changeItem(index){
      this.mark=index;
      this.baseInfo=this.visitorsInfo[index].baseInfo;
      this.getVisitorPath(this.visitorsInfo[index].clientID);
    },
    async getVisitorList(){
      let {success,result}=await this.$get('info/userAction');
      if(success){
        this.visitorsInfo=result;
      } 
    },
    async getVisitorPath(clientID){
      let {success,result}=await this.$get('info/getPath',{clientID:clientID});
      if(success){
        if(result.length!==0){
          let newResult=[];
          newResult.push({url:result[0].url,time:result[0].time});
          for(let i=0;i<result.length-1;i++){
            newResult.push({url:result[i+1].url,time:result[i+1].time,duration:(new Date(result[i+1].time).getTime()-new Date(result[i].time).getTime())/1000+'s'})
          }
          this.userPath=newResult;
        }else{
          this.userPath=result;
        }
      } 
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .active{
          background-color:#1da57a !important;
  }  
  .container{
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background-color: #ffffff;
    .sideBar{
      width: 30%;
      height:580px;
      padding: 24px 8px;
      border-right: 1px solid rgb(230, 235, 239);
      overflow: auto;
      .list{
        .item{
          display: flex;
          justify-content: space-between;
          height: 40px;
          margin: 4px 0;
          padding: 8px;
          border-radius: 2px;
          background-color: #f6fafe;
          cursor: pointer;
        }
      }
    }
    .content{
      width: 70%;
      height: 580px;
      padding: 24px 16px;
      overflow: auto;
      .pathPanel{
        .pathLine{
          padding: 8px;
          .ant-timeline-item{
            padding: 0 0 !important;
          }
        }
      }
    }
  }
</style>