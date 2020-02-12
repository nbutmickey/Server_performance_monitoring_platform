<template>
  <div>
    <showPanel :todayData="todayData" :isCompare="isCompare"></showPanel>
    <chinaMapPanel :title="geo" :showTimeDimension="showTimeDimension"></chinaMapPanel>
    <div style="margin-left:-8px;display: flex;flex-direction: row;flex-wrap: wrap">
      <pineChartPanel :title="bs" :data="bsdata" :showTimeDimension="showTimeDimension"></pineChartPanel>
      <pineChartPanel :title="os" :data="osdata" :showTimeDimension="showTimeDimension"></pineChartPanel>
    </div>
    <div style="margin-left:-8px;display: flex;flex-direction: row;flex-wrap: wrap">
      <pineChartPanel :title="ispc" :data="ispcdata" :showTimeDimension="showTimeDimension"></pineChartPanel>
      <pineChartPanel :title="screen" :data="screendata" :showTimeDimension="showTimeDimension"></pineChartPanel>
    </div>
  </div>
</template>

<script>
import showPanel from "@/components/showPanel";
import pineChartPanel from "@/components/pineChartPanel";
import chinaMapPanel from '@/components/chinaMapPanel'
export default {
  components: {
    showPanel,
    pineChartPanel,
    chinaMapPanel
  },
  data() {
    return {
      todayData: [],
      isCompare: true,
      showTimeDimension:true,
      geo:"地理位置",
      os: "操作系统",
      bs: "浏览器",
      ispc: "客户端",
      screen: "屏幕类型",
      ispcdata: [
        { type: "PC端", count: 123 },
        { type: "移动端", count: 514 }
      ],
      screendata: [
        { type: "1300*728", count: 23 },
        { type: "1902*1080", count: 14 },
        { type: "440*780", count: 34 },
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
        { type: "Safari", count: 334 },
        { type: "IE", count: 12 }
      ]
    };
  },
  async created() {
    this.todayData = await this.getTodayData();
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
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>