<template>
  <div :id="containerId"></div>
</template>

<script>
export default {
  props: {
    data: Array,
    isPine: Boolean
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
      this.data = val;
      let dv = this.processData(val);
      this.chart.changeData(dv);
    },
    isPine(val) {
      if (val) {
        this.chart.forceFit();
      }
    }
  },
  mounted() {
    this.initChart();
    this.renderPineChart(this.data);
  },
  methods: {
    //数据处理
    processData: function(rawData) {
      const ds = new DataSet();
      const dv = ds
        .createView()
        .source(rawData)
        .transform({
          type: "percent",
          field: "count",
          dimension: "type",
          as: "percent"
        });
      return dv;
    },
    //初始化图表
    initChart: function() {
      this.chart = new G2.Chart({
        container: this.containerId,
        forceFit: true,
        height: 350,
        padding: [0, 30, 0, "auto"]
      });
    },
    renderPineChart: function(rawData) {
      //数据处理
      let dv = this.processData(rawData);

      //装载数据并绘制图表
      this.chart.source(dv);
      this.chart.coord("theta", {
        radius: 0.8
      });
      this.chart.tooltip({ showTitle: false }).legend({
        position: "right-bottom",
        offsetX: -50
      });
      this.chart
        .intervalStack()
        .position("count")
        .color("type")
        .label("percent", {
          formatter: (val, item) => {
            return (
              item.point.type +
              ": " +
              (item.point.percent * 100).toFixed(0) +
              "%"
            );
          }
        })
        .style({
          lineWidth: 1,
          stroke: "#fff"
        });
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