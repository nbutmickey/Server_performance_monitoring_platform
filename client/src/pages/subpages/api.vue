<template>
  <div>
    <showPanel :todayData="todayData" :isCompare="isCompare"></showPanel>
    <div style="margin-left:-8px;display: flex;flex-direction: row;flex-wrap: wrap">
      <allApiURLPanel
        :title="allApiURLTitle"
        :data="allApiURLData"
        v-on:changeTimeDimension="getAllApiURLData"
      ></allApiURLPanel>
      <failApiURLPanel
        :title="failApiURLTitle"
        :data="failApiURLData"
        v-on:changeTimeDimension="getFailApiURLData"
      ></failApiURLPanel>
    </div>
    <apiRequestPanel></apiRequestPanel>
  </div>
</template>

<script>
import showPanel from "@/components/showPanel";
import apiRequestPanel from "@/components/apiRequestPanel";
import allApiURLPanel from "@/components/allApiURLPanel";
import failApiURLPanel from "@/components/failApiURLPanel";
import { EventBus } from "@/common/js/eventBus"
export default {
  components: {
    showPanel,
    apiRequestPanel,
    allApiURLPanel,
    failApiURLPanel
  },
  data() {
    return {
      allApiURLTitle: "所有URL",
      failApiURLTitle: "失败URL",
      allApiURLData: [],
      failApiURLData: [],
      todayData: [],
      isCompare: true
    };
  },
  async created() {
    this.getTodayData();
    this.getFailApiURLData(5);
    this.getAllApiURLData(5);
  },
  mounted () {
    EventBus.$on("updateInfo",()=>{
      this.getTodayData();
    })
  },
  methods: {
    getTodayData: async function() {
      let { success, result } = await this.$get("/info/todayAPI");
      result.forEach(item => {
        if (item.yesterday === 0) {
          item.rate = 0;
        } else {
          item.rate = ((item.today - item.yesterday) / item.yesterday).toFixed(2);
        }
        switch (item.title) {
          case "apiTotal":
            item.title = "API总数";
            item.unit = false;
            break;
          case "apiSuccess":
            item.title = "API成功次数";
            item.unit = false;
            break;
          case "apiFailed":
            item.title = "API失败次数";
            item.unit = false;
            break;
          case "apiDuration":
            item.title = "API成功耗时";
            item.unit = true;
            break;
          default:
            break;
        }
      });
      this.todayData = result;
    },
    getFailApiURLData: async function(dimensionType) {
    let {success,result}=await this.$get('/info/getAllFailAPI',{dimensionType:dimensionType});
      if (success) {
        this.failApiURLData = result;
      }
    },
    getAllApiURLData: async function(dimensionType) {
      let {success,result}=await this.$get('/info/getAllAPI',{dimensionType:dimensionType});
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