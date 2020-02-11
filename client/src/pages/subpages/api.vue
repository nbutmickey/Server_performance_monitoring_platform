<template>
  <div>
    <showPanel :todayData="todayData" :isCompare="isCompare"></showPanel>
  </div>
</template>

<script>
import showPanel from "@/components/showPanel";
export default {
  components: {
    showPanel
  },
  data() {
    return {
      msg: "api",
      todayData: [],
      isCompare:true
    };
  },
  async created() {
    this.todayData = await this.getTodayData();
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>