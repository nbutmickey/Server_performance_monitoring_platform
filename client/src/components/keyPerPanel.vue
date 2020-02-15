<template>
  <div style="width:50%;padding-left:8px;paddig-right:8px;">
    <div class="content-box">
      <timeDimension :title="title" v-on:changeTimeDimension="changeTimeDimension"></timeDimension>
      <div class="container">
        <div :id="containerId"></div>
      </div>
    </div>
  </div>
</template>

<script>
import timeDimension from "@/components/timeDimension"
export default {
  props: {
    title: String,
    data:Array
  },
  components: {
    timeDimension
  },
  data() {
    return {
      chart: null,
      containerId:Math.random()
        .toString(36)
        .substr(2)
    };
  },
  created() {},
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
    changeTimeDimension: function(value) {
        this.$emit("changeTimeDimension",value);
    },
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
.content-box {
  margin-bottom: 16px;
  background: #fff;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(82, 94, 102, 0.15);
  .title {
    height: 30px;
    color: #314659;
    .box-panel-title-small {
      font-weight: 700;
      font-size: 14px;
    }
    .box-panel-time-dimension {
      margin-left: 20px;
      font-size: 14px;
    }
    .container {
      width: 100%;
      display: flex;
      flex-direction: row;
    }
  }
}
</style>