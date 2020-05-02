<template>
  <div :id="containerId"></div>
</template>
<script>
export default {
  props: {
    data: Array
  },
  data() {
    return {
      containerId: Math.random()
        .toString(36)
        .substr(2),
      chart: null
    };
  },
  watch: {
    data(val) {
      //重绘图表
      this.processData(val);
      this.chart.changeData(val);
    }
  },
  mounted() {
    this.initChart();
    this.renderChart(this.data);
  },
  methods: {
    initChart:function(){
        this.chart= new G2.Chart({
        container: this.containerId,
        forceFit: true,
        height: 350,
        padding: 'auto'
      });
    },
    processData:function(rawData){
      const ds=new DataSet();
      const dv=ds.createView().source(rawData);
      dv.transform({
        type:'map',
        callback(row){
          row.visitTime = new Date(row.visitTime).getTime() - 8 * 60 * 60 * 1000;
          return row;
        }
      })
      return dv;
    },
    renderChart:function (rawData) {
      let dv=this.processData(rawData);
      this.chart.source(dv);
      this.chart.scale({
        visitTime:{
          type:'timeCat',
          mask:'MM-DD HH:mm',
          tickCount:rawData.length
        }
      })
      this.chart.tooltip({
        crosshairs: {
          type: "line"
        }
      });

      this.chart
        .line()
        .position("visitTime*pv")
        .shape("smooth")
        .color('blue')
        

      this.chart
        .line()
        .position("visitTime*uv")
        .shape("smooth")
        .color('red')
      this.chart.render();
    }
  }
};
</script>


<style scoped lang="less">
.g2-guide-html {
  width: 100px;
  height: 80px;
  vertical-align: middle;
  text-align: center;
  line-height: 0.2;
}
</style>