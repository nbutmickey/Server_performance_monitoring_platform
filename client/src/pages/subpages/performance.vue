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
      msg: "performance",
      todayData: [],
      isCompare:false
    };
  },
  async created() {
    this.todayData = await this.getTodayData();
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
      console.log(result);
      return result;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>