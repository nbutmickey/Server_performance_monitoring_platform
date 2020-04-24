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
import { EventBus } from "@/common/js/eventBus"
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
    await this.getTodayData();
    await this.getWaterfallLoadingData(5);
    await this.getkeyPerData(5);
    await this.getIntervalData(5);
    await this.getPageListData(5);
  },
  mounted () {
    EventBus.$on("updateInfo",()=>{
      this.getTodayData();
    })
  },
  methods: {
    getTodayData: async function() {
      let {success,result}=await this.$get('/info/todayPerformance');
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
     this.todayData=result;
    },
    getWaterfallLoadingData:async function(dimensionType){
     let {success,result}=await this.$get('/info/waterfallLoadTime',{dimensionType:dimensionType});
      if (success) {
        this.waterfallLoadingData = result;
      }
    },
    getkeyPerData:async function(dimensionType){
      let {success,result}=await this.$get('/info/keyPerByDivider',{dimensionType:dimensionType});
      if (success) {
        this.keyPerData = result;
      }
    },
    getPageListData:async function (dimensionType) {
      let {success,result}=await this.$get('/info/pageListPer',{dimensionType:dimensionType});
      if (success) {
        this.pageListData = result;
      }
    },
    getIntervalData:async function(dimensionType){
      let {success,result}=await this.$get('/info/intervalTimeByDivider',{dimensionType:dimensionType});
      if (success) {
        this.intervalData = result;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>