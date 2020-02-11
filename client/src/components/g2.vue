<template>
  <div id="c1"></div>
</template>

<script>
export default {
  data() {
    return {
      msg: "api",
      chart: null,
      data: []
    };
  },
  created() {},
  async mounted() {
    let res = await this.axios.get("/api/data");
    if(res.data.success){
    let result=res.data.result;
    console.log(result);
     const chart = new G2.Chart({
      container: c1,
      width: 450,
      height: 300
    });
    chart
      .source(result)
      .interval()
      .position("genre*sold")
      .color("genre");
    this.chart = chart;
    this.chart.render();
  }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>