<template>
  <div>
    <showPanel :todayData="todayData" :isCompare="isCompare"></showPanel>
    <div style="margin-left:-8px;display: flex;flex-direction: row;flex-wrap: wrap">
      <topPageListPanel
        :title="topPageTitle"
        :data="topPageData"
        v-on:changeTimeDimension="getTopPageData"
      ></topPageListPanel>
    </div>
    <div style="margin-left:-8px;display: flex;flex-direction: row;flex-wrap: wrap">
      <lineChartPanel
        :title="pvTitle"
        v-if="pvData.length!==0"
        :data="pvData"
        v-on:changeTimeDimension="getPvData"
      ></lineChartPanel>
      <lineChartPanel
        :title="uvTitle"
        v-if="uvData.length!==0"
        :data="uvData"
        v-on:changeTimeDimension="getUvData"
      ></lineChartPanel>
    </div>
    <chinaMapPanel
      :title="geoTitle"
      v-if="geoData.length!==0"
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
      pvTitle: "PV数据",
      uvTitle: "UV数据",
      geoTitle: "地理位置",
      osTitle: "操作系统",
      bsTitle: "浏览器",
      isPcTitle: "客户端",
      screenTitle: "屏幕类型",
      topPageTitle: "访问量TOP8页面",
      topPageData: [],
      pvData: [],
      uvData: [],
      geoData: [],
      ispcdata: [
        { type: "PC", count: 123 },
        { type: "移动端", count: 514 }
      ],
      screendata: [
        { type: "1300*728", count: 23 },
        { type: "1902*1080", count: 14 },
        { type: "440*780", count: 34 }
      ],
      bsdata: [
        { type: "200", count: 23 },
        { type: "301", count: 14 },
        { type: "404", count: 34 },
        { type: "500", count: 12 }
      ],
      osdata: [
        { type: "Chrome", count: 123 },
        { type: "FireFox", count: 124 },
        { type: "Safari", count: 134 },
        { type: "IE", count: 120 },
        { type: "Edge", count: 100 }
      ]
    };
  },
  async created() {
    this.todayData = await this.getTodayData();
    this.getTopPageData(0);
    this.getPvData(0);
    this.getUvData(0);
    this.getGeoData(0);
  },
  methods: {
    getTodayData: async function() {
      let res = await this.axios.get("/data/todayGeneral");
      let { success, result } = res.data;
      result.forEach(item => {
        item.rate = ((item.today - item.yesterday) / item.yesterday).toFixed(2);
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
      return result;
    },
    getTopPageData: async function(dimensionType) {
      let res = await this.axios.get(
        `/data/pageTop?dimensionType=${dimensionType}`
      );
      let { success, result } = res.data;
      if (success) {
        result.forEach((item, index) => {
          item.key = index + 1;
        });
        this.topPageData = result;
      }
    },
    getPvData: async function(dimensionType) {
      console.log(dimensionType);
      let res = await this.axios.get(
        `/data/pvDataByDivider?dimensionType=${dimensionType}`
      );
      //console.log(res);
      let { success, result } = res.data;
      //console.log(result);
      if (success) {
        this.pvData = result;
      }
    },
    getUvData: async function(dimensionType) {
      let res = await this.axios.get(
        `/data/uvDataByDivider?dimensionType=${dimensionType}`
      );
      let { success, result } = res.data;
      if (success) {
        this.uvData = result;
      }
    },
    getGeoData: async function(dimensionType) {
      let res = await this.axios.get(
        `/data/geoDataByDivider?dimensionType=${dimensionType}`
      );
      let { success, result } = res.data;
      if (success) {
        this.geoData = result;
      }
    },
    getOsData: async function(dimensionType) {},
    getBsData: async function(dimensionType) {
      //console.log('父组件收到获取浏览器'+timeDimension);
      //this.axios.get();
    },
    getisPcData: async function(dimensionType) {},
    getScreenData: async function(dimensionType) {
      //console.log('父组件收到获取屏幕信息'+timeDimension);
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>