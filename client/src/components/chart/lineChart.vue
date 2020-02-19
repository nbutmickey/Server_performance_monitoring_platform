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
      this.data=val;
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
        console.log(this.data);
        this.chart= new G2.Chart({
        container: this.containerId,
        forceFit: true,
        height: 350,
        padding: 'auto'
      });
    },
    processData:function(rawData){
      const ds=new DataSet();
      const dv=ds.createView().source(rawData)
      return dv;
    },
    renderChart:function (rawData) {
      let dv=this.processData(rawData);
      this.chart.source(dv);
      this.chart.scale({
        time:{
          type:'timeCat',
          mask:'HH:mm',
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
        .position("time*pv")
        .shape("smooth")
        .color('blue')
        

      this.chart
        .line()
        .position("time*uv")
        .shape("smooth")
        .color('red')

    //   this.chart
    //     .point()
    //     .position("time*pv")
    //     .size(3)
    //     .color()
    //     .shape("circle")
    //     .style({
    //       stroke: "#fff",
    //       lineWidth: 1
    //     });

        // this.chart
        // .point()
        // .position("time*pv*uv")
        // .size(3)
        // .color()
        // .shape("circle")
        // .style({
        //   stroke: "#fff",
        //   lineWidth: 1
        // });
      this.chart.render();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.g2-guide-html {
  width: 100px;
  height: 80px;
  vertical-align: middle;
  text-align: center;
  line-height: 0.2;
}
</style>f