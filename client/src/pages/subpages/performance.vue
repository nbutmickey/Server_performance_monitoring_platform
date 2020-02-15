<template>
  <div>
    <showPanel :todayData="todayData" :isCompare="isCompare"></showPanel>
    <div style="margin-left:-8px;display: flex;flex-direction: row;flex-wrap: wrap">
      <waterfallLoadingPanel :title="waterfallLoadingTitle" :data="waterfallLoadingData" v-on:changeTimeDimension="getWaterfallLoadingData"></waterfallLoadingPanel>
      <keyPerPanel :title="keyPerTitle" :data="keyPerData" v-on:changeTimeDimension="getkeyPerData"></keyPerPanel>
    </div>
    <pageListPanel :title="pageListTitle" :data="pageListData" v-on:changeTimeDimension="getPageListData"></pageListPanel>
    <intervalTimePanel :showTimeDimension="showTimeDimension" :title="intervalTimeTitle" :data="intervalData" v-on:changeTimeDimension="getIntervalData" :showTitle="showTitle"></intervalTimePanel>
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
      waterfallLoadingData:[],
      keyPerData:[],
      pageListData:[],
      intervalData:[],
      showTitle:true,
      isCompare:false,
      showTimeDimension:true,
      pageListTitle:"页面列表",
      keyPerTitle:"关键性能指标",
      intervalTimeTitle:"区间段耗时",
      waterfallLoadingTitle:"页面加载瀑布图"
    };
  },
  async created() {
    this.todayData = await this.getTodayData();
    await this.getWaterfallLoadingData(0);
    await this.getIntervalData(0);
    await this.getkeyPerData(0);
    await this.getPageListData(0);
  },
  methods: {
    getTodayData: async function() {
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
    },
    getWaterfallLoadingData:async function(dimensionType){
      let res = await this.axios.get(
        `/data/waterfallLoading?dimensionType=${dimensionType}`
      );
      //console.log(res);
      let { success, result } = res.data;
      //console.log(result);
      if (success) {
        this.waterfallLoadingData = result;
      }
    },
    getkeyPerData:async function(dimensionType){
       let res = await this.axios.get(
        `/data/keyPer?dimensionType=${dimensionType}`
      );
      //console.log(res);
      let { success, result } = res.data;
      //console.log(result);
      if (success) {
        console.log("keyPer"+result);
        this.keyPerData = result;
      }
    },
    getPageListData:async function (dimensionType) {
      let res = await this.axios.get(
        `/data/pageList?dimensionType=${dimensionType}`
      );
      //console.log(res);
      let { success, result } = res.data;
      //console.log(result);
      if (success) {
        //console.log(result);
        this.pageListData = result;
      }
    },
    getIntervalData:async function(dimensionType){
      let res = await this.axios.get(
        `/data/intervalTime?dimensionType=${dimensionType}`
      );
      //console.log(res);
      let { success, result } = res.data;
      //console.log(result);
      if (success) {
        //console.log(result);
        this.intervalData = result;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>