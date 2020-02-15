<template>
  <div>
    <showPanel :todayData="todayData" :isCompare="isCompare"></showPanel>
    <div style="margin-left:-8px;display: flex;flex-direction: row;flex-wrap: wrap">
     <allApiURLPanel :title="allApiURLTitle" :data="allApiURLData" v-on:changeTimeDimension="getAllApiURLData"></allApiURLPanel>
     <failApiURLPanel :title="failApiURLTitle" :data="failApiURLData" v-on:changeTimeDimension="getFailApiURLData"></failApiURLPanel>
    </div>
    <apiRequestPanel></apiRequestPanel>
  </div>
</template>

<script>
import showPanel from "@/components/showPanel";
import apiRequestPanel from "@/components/apiRequestPanel"
import allApiURLPanel from "@/components/allApiURLPanel"
import failApiURLPanel from "@/components/failApiURLPanel"
export default {
  components: {
    showPanel,
    apiRequestPanel,
    allApiURLPanel,
    failApiURLPanel
  },
  data() {
    return {
      allApiURLTitle:"所有URL",
      failApiURLTitle:"失败URL",
      allApiURLData:[],
      failApiURLData:[],
      todayData: [],
      isCompare:true
    };
  },
  async created() {
    this.todayData = await this.getTodayData();
    this.getFailApiURLData(0);
    this.getAllApiURLData(0);
  },
  methods: {
    getTodayData: async function() {
      let res = await this.axios.get("/data/api");
      let { success, result } = res.data;
      result.forEach(item => {
        item.rate = ((item.today - item.yesterday) / item.yesterday).toFixed(2);
        switch (item.title) {
          case 'apiTotal':
            item.title="API总数";
            item.unit=false;
            break;
          case 'apiSuccess':
            item.title="API成功次数";
            item.unit=false;
            break;
          case 'apiFailed':
            item.title="API失败次数";
            item.unit=false;
            break;
          case 'apiDuration':
            item.title="API成功耗时";
            item.unit=true;
            break;  
          default:
            break;
        }
      });
      //console.log(result);
      return result;
    },
    getFailApiURLData:async function (dimensionType) {
    
      let res = await this.axios.get(
        `/data/failApiURL?dimensionType=${dimensionType}`
      );
      let { success, result } = res.data;
      if (success) {
        console.log(this.failApiURLData);
        this.failApiURLData = result;
      }
    },
    getAllApiURLData:async function(dimensionType){
      //console.log("触发");
      let res = await this.axios.get(
        `/data/allApiURL?dimensionType=${dimensionType}`
      );
      //console.log(res);
      let { success, result } = res.data;
      //console.log(result);
      if (success) {
        this.allApiURLData = result;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>