<template>
  <div>
    <showPanel :todayData="todayData" :isCompare="isCompare"></showPanel>
    <div style="margin-left:-8px;display: flex;flex-direction: row;flex-wrap: wrap">
      <waterfallLoadingPanel :title="waterfallLoadingTitle"></waterfallLoadingPanel>
      <keyPerPanel :title="keyPerTitle"></keyPerPanel>
    </div>
    <pageListPanel :title="pageListTitle"></pageListPanel>
    <intervalTimePanel :title="intervalTimeTitle"></intervalTimePanel>
  </div>
</template>

<script>
import showPanel from "@/components/showPanel";
import keyPerPanel from "@/components/keyPerPanel"
import intervalTimePanel from "@/components/intervalTimePanel"
import pageListPanel from "@/components/pageListPanel"
import waterfallLoadingPanel from "@/components/waterfallLoadingPanel"
export default {
  components: {
    showPanel,
    keyPerPanel,
    intervalTimePanel,
    pageListPanel,
    waterfallLoadingPanel
  },
  data() {
    return {
      msg: "performance",
      todayData: [],
      isCompare:false,
      pageListTitle:"页面列表",
      keyPerTitle:"关键性能指标",
      intervalTimeTitle:"区间段耗时",
      waterfallLoadingTitle:"页面加载瀑布图"
    };
  },
  async created() {
    this.todayData = await this.getTodayData();
  },
  methods: {
    getTodayData: async function() {0
      let res = await this.axios.get("/data/per");
      let { success, result } = res.data;
      result.forEach(item => {
        switch (item.title) {
          case 'fpt':
            item.title="白屏耗时";
            item.unit=true;
            break;
          case 'tti':
            item.title="首次可交互耗时";
            item.unit=true;
            break;
          case 'ready':
            item.title="首屏耗时";
            item.unit=true;
            break;
          case 'load':
            item.title="完全加载耗时";
            item.unit=true;
            break;  
          default:
            break;
        }
      });
      //console.log(result);
      return result;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>