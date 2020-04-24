<template>
  <p style="font-weight:700">最近更新：<span style="color:red">{{lastUpdateTime}}</span></p>
</template>

<script>
import { EventBus } from "@/common/js/eventBus"
export default {
  data() {
    return {
      lastUpdateTime:""
    }
  },
  mounted () {
    let that=this;
    setInterval(() => {
      setTimeout(()=>{
        that.lastUpdateTime=that.getNowTime();
        EventBus.$emit("updateInfo");
      },0)
    }, 1000*60*3);
  },
  created() {
    this.lastUpdateTime=this.getNowTime();
  },
  methods:{
      getNowTime(){
          let date=new Date();
          let HH=date.getHours();
          let mm=date.getMinutes();
          let ss=date.getSeconds();
          return  `${HH>10?HH:'0'+HH}:${mm>10?mm:'0'+mm}` 
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>