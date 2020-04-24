<template>
  <div>
    <showPanel :todayData="todayData" :isCompare="isCompare"></showPanel>
    <div style="margin-left:-8px;display: flex;flex-direction: row;flex-wrap: wrap">
      <lineChartPanel
        :title="pvAnduvTitle"
        :data="pvAndUvData"
        v-on:changeTimeDimension="getPvAndUvData"
      ></lineChartPanel>
      <topPageListPanel
        :title="topPageTitle"
        :data="topPageData"
        v-on:changeTimeDimension="getTopPageData"
      ></topPageListPanel>
    </div>
    <chinaMapPanel
      :title="geoTitle"
      :data="geoData"
      :showTimeDimension="showTimeDimension"
      v-on:changeTimeDimension="getGeoData"
    ></chinaMapPanel>
    <div style="margin-left:-8px;display: flex;flex-direction: row;flex-wrap: wrap">
      <pineChartPanel
        :title="bsTitle"
        :data="bsdata"
        :showTimeDimension="showTimeDimension"
        v-on:changeTimeDimension="getBsData"
      ></pineChartPanel>
      <basedPieChartPanel
        :title="osTitle"
        :data="osdata"
        :showTimeDimension="showTimeDimension"
        v-on:changeTimeDimension="getOsData"
      ></basedPieChartPanel>
    </div>
    <div style="margin-left:-8px;display: flex;flex-direction: row;flex-wrap: wrap">
      <basedPieChartPanel
        :title="isPcTitle"
        :data="ispcdata"
        :showTimeDimension="showTimeDimension"
        v-on:changeTimeDimension="getisPcData"
      ></basedPieChartPanel>
      <pineChartPanel
        :title="screenTitle"
        :data="screendata"
        :showTimeDimension="showTimeDimension"
        v-on:changeTimeDimension="getScreenData"
      ></pineChartPanel>
    </div>
  </div>
</template>

<script>
import showPanel from "@/components/showPanel";
import pineChartPanel from "@/components/pineChartPanel";
import chinaMapPanel from "@/components/chinaMapPanel";
import lineChartPanel from "@/components/lineChartPanel";
import basedPieChartPanel from "@/components/basedPieChartPanel";
import topPageListPanel from "@/components/topPageListPanel";
import { EventBus } from "@/common/js/eventBus"
export default {
  components: {
    showPanel,
    pineChartPanel,
    chinaMapPanel,
    lineChartPanel,
    basedPieChartPanel,
    topPageListPanel
  },
  data() {
    return {
      todayData: [],
      isCompare: true,
      showTimeDimension: true,
      pvAnduvTitle: "PV & UV",
      geoTitle: "地理位置",
      osTitle: "操作系统",
      bsTitle: "浏览器",
      isPcTitle: "客户端",
      screenTitle: "屏幕类型",
      topPageTitle: "访问量TOP8页面",
      topPageData: [],
      pvAndUvData: [],
      geoData: [],
      ispcdata: [],
      screendata: [],
      bsdata: [],
      osdata: []
    };
  },
  async created() {
    this.getTodayData();
    this.getPvAndUvData(5);
    this.getTopPageData(5);
    this.getGeoData(5);
    this.getBsData(5);
    this.getOsData(5);
    this.getisPcData(5);
    this.getScreenData(5);
  },
  mounted () {
    EventBus.$on("updateInfo",()=>{
      this.getTodayData();
    })
  },
  methods: {
    getTodayData: async function() {
      let {success,result}=await this.$get('/info/todayGeneral');
      if(success){
        result.forEach(item => {
        if(item.yesterday===0){
          item.rate=(item.today-item.yesterday).toFixed(2);
        }else{
          item.rate = ((item.today - item.yesterday) / item.yesterday).toFixed(2);
        }
        switch (item.title) {
          case "pv":
            item.title = "PV";
            item.unit = false;
            break;
          case "uv":
            item.title = "UV";
            item.unit = false;
            break;
          case "load":
            item.title = "完全加载耗时";
            item.unit = true;
            break;
          case "api":
            item.title = "API成功次数";
            item.unit = false;
            break;
          default:
            break;
        }
      });  
      this.todayData=result;
      }
    },
    getPvAndUvData:async function(dimensionType){
      let {success,result}=await this.$get('/info/pvAndUvNumByDivider',{dimensionType:dimensionType});
      if (success) {
        this.pvAndUvData = result;
      }
    },
    getTopPageData: async function(dimensionType) {
      let {success,result}=await this.$get('/info/pageTop',{dimensionType:dimensionType});
      if (success) {
        this.topPageData = result;
      }
    },
    getGeoData: async function(dimensionType) {
      let {success,result}=await this.$get('/info/pvAndUvNumByGeo',{dimensionType:dimensionType});
      if (success) {
        this.geoData=result;
      }
    },
    getOsData: async function(dimensionType) {
       let {success,result}=await this.$get('/info/clientInfo',{dimensionType:dimensionType,groupType:1});
      if (success) {
        this.osdata=result;
      }
    },
    getBsData: async function(dimensionType) {
      let {success,result}=await this.$get('/info/clientInfo',{dimensionType:dimensionType,groupType:0});
      if (success) {
        this.bsdata=result;
      }
    },
    getisPcData: async function(dimensionType) {
      let {success,result}=await this.$get('/info/clientInfo',{dimensionType:dimensionType,groupType:3});
      if (success) {
        this.ispcdata=result.map((item)=>{
          item.type?item.type="PC":item.type="移动端";
          return item;
        });
        //console.log(this.ispcdata);
      }
    },
    getScreenData: async function(dimensionType) {
      let {success,result}=await this.$get('/info/clientInfo',{dimensionType:dimensionType,groupType:2});
      if (success) {
        this.screendata=result;
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>