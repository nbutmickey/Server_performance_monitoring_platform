<template>
  <div style="width:100%;">
    <div class="content-box">
      <div class="title">
        <span class="box-panel-title-small">{{title}}</span>
        <span class="box-panel-time-dimension">
          <a-popover placement="right" class="radio-gap">
            <template slot="content">
              <a-radio-group defaultValue="0" size="small" @change="changeTimeDimension">
                <a-radio-button value="0">30分钟</a-radio-button>
                <a-radio-button value="1">60分钟</a-radio-button>
                <a-radio-button value="2">12小时</a-radio-button>
                <a-radio-button value="3">24小时</a-radio-button>
                <a-radio-button value="4">最近3天</a-radio-button>
                <a-radio-button value="5">最近7天</a-radio-button>
              </a-radio-group>
            </template>
            <a-icon type="clock-circle" />
          </a-popover>
        </span>
      </div>
      <div class="container">
        <div :id="containerId"></div>
      </div>
    </div>
  </div>
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
    console.log(this.data);
  },
  methods: {
    changeTimeDimension: function(e) {
        this.$emit("changeTimeDimension",e.target.value);
    },
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
            retains: ["time"]
          })
          .transform({
            type: "map",
            callback(row) {
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
              row.time = new Date(row.time).getTime() - 8 * 60 * 60 * 1000;
              return row;
            }
          });
        //console.log(this.userData.length);
        this.chart
          .source(dv)
          .scale({
            time: {
              type: "timeCat",
              mask: "MM-DD HH:mm:ss",
              tickCount: data.length
            }
          })

        this.chart
          .interval()
          .position("time*duration")
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