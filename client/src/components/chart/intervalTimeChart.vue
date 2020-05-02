<template>
  <div :id="containerId"></div>
</template>

<script>
export default {
  props: {
    title: String,
    data:Array
  },
  data() {
    return {
      chart: null,
      containerId:Math.random()
        .toString(36)
        .substr(2),
    };
  },
  created() {},
  watch:{
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
    renderChart:function (data) {
          //数据展开
        const dv = new DataSet()
          .createView()
          .source(data)
          .transform({
            type: "fold",
            fields: ["redirect", "dns", "tcp", "ssl","ttfb","trans","dom","resource"],
            key: "type",
            value: "duration",
            retains: ["visitTime"]
          })
          .transform({
            type: "map",
            callback(row) {
              row.duration=parseInt(row.duration);
              switch (row.type) {
                case "redirect":
                  row.type = "重定向";
                  break;
                case "dns":
                  row.type = "DNS解析";
                  break;
                case "tcp":
                  row.type = "TCP连接";
                  break;
                case "ssl":
                  row.type = "SSL连接";
                  break;
                case "ttfb":
                  row.type = "请求响应";
                  break;
                case "trans":
                  row.type = "数据传输";
                  break;
                case "dom":
                  row.type = "DOM解析";
                  break;
                case "resource":
                 row.type = "资源加载";
                  break;
                default:
                  break;
              }  
              row.visitTimes = new Date(row.visitTime).getTime() - 8 * 60 * 60 * 1000;
              return row;
            }
          });
        //console.log(this.userData.length);
        this.chart
          .source(dv)
          .scale({
            visitTime: {
              type: "timeCat",
              mask: "MM-DD HH:mm:ss",
              tickCount: data.length
            }
          })

        this.chart
          .interval()
          .position("visitTime*duration")
          .color("type")
          .tooltip("type*duration", (type, duration) => {
            return {
              type,
              duration
            };
          })
          .adjust([
            {
              type: "dodge",
              marginRatio: 1 / 32
            }
          ]);
        this.chart.render();
    },
    initChart:function () {
      this.chart= new G2.Chart({
      container: this.containerId,
      forceFit: true,
      height: 350,
      padding: ["auto", 10, "auto", "auto"]
      });
      this.chart
        .tooltip({
          itemTpl: '<li data-index={index}><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>{type}: {duration} ms</li>'
        })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>