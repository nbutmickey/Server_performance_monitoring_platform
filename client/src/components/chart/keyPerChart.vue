<template>
  <div :id="containerId"></div>
</template>

<script>
export default {
  props: {
    data:Array
  },
  data() {
    return {
      chart: null,
      containerId:Math.random()
        .toString(36)
        .substr(2)
    };
  },
  watch: {
    data(val){
      this.chart.clear();
      this.renderChart(val);
    }
  },
  mounted() {
    this.initChart();
    this.renderChart(this.data);
  },
  methods: {
    initChart:function(){
      this.chart = new G2.Chart({
        container: this.containerId,
        forceFit: true,
        height: 350,
        padding: ["auto", 10, "auto", "auto"]
      });
      this.chart
          .tooltip({
            itemTpl: '<li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>{type}: {duration} ms</li>'
          })
      },
    renderChart:function(data){
      //数据展开
      const dv = new DataSet()
        .createView()
        .source(data)
        .transform({
          type: "fold",
          fields: ["fpt", "ready", "tti", "load"],
          key: "type",
          value: "duration",
          retains: ["time"]
        })
        .transform({
          type: "map",
          callback(row) {
            switch (row.type) {
              case "fpt":
                row.type = "白屏耗时";
                break;
              case "ready":
                row.type = "首屏耗时";
                break;
              case "tti":
                row.type = "可交互耗时";
                break;
              case "load":
                row.type = "完全加载耗时";
                break;
              default:
                break;
            }
            row.time = new Date(row.time).getTime() - 8 * 60 * 60 * 1000;
            return row;
          }
        });

        
      //有待改进  
      this.chart
        .source(dv)
        .scale({
          time: {
            type: "timeCat",
            alias: "时间",
            mask: "MM-DD HH:mm:ss",
            tickCount:data.length
          }
        })

      this.chart
        .interval()
        .position("time*duration")
        .color("type")
        .tooltip("type*duration",(type,duration)=>{return {type,duration}})
        .adjust([
          {
            type: "dodge",
            marginRatio: 1 / 32
          }
        ]);
      this.chart.render();
      }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>