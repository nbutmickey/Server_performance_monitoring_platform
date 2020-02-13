<template>
  <div style="width:50%;padding-left:8px;paddig-right:8px;">
    <div class="content-box">
      <div class="title">
        <span class="box-panel-title-small">{{title}}</span>
        <span class="box-panel-time-dimension">
          <a-popover placement="right" class="radio-gap">
            <template slot="content">
              <a-radio-group defaultValue="0" size="small" >
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
    title: String
  },
  data() {
    return {
      chart: null,
      containerId:Math.random()
        .toString(36)
        .substr(2),
      userData: [
        {
          time: "2020-02-10T09:00:00.000Z",
          fpt: 120,
          ready: 343,
          tti: 3345,
          load: 4456
        },
        {
          time: "2020-02-11T09:01:00.000Z",
          fpt: 123,
          ready: 353,
          tti: 2345,
          load: 3456
        },
        {
          time: "2020-02-11T09:02:00.000Z",
          fpt: 122,
          ready: 343,
          tti: 1345,
          load: 2456
        },
        {
          time: "2020-02-11T09:03:00.000Z",
          fpt: 121,
          ready: 143,
          tti: 845,
          load: 1456
        },
        {
          time: "2020-02-11T09:04:03.000Z",
          fpt: 225,
          ready: 243,
          tti: 4345,
          load: 5456
        },
        {
          time: "2020-02-11T09:04:02.000Z",
          fpt: 325,
          ready: 343,
          tti: 2345,
          load: 2456
        },
         {
          time: "2020-02-11T09:04:56.000Z",
          fpt: 225,
          ready: 243,
          tti: 4345,
          load: 5456
        },
        {
          time: "2020-02-11T09:04:34.000Z",
          fpt: 325,
          ready: 343,
          tti: 2345,
          load: 2456
        }
      ]
    };
  },
  created() {},
  mounted() {
    const chart = new G2.Chart({
      container: this.containerId,
      forceFit: true,
      height: 350,
      padding: ["auto", 10, "auto", "auto"]
    });
    //数据展开
    const dv = new DataSet()
      .createView()
      .source(this.userData)
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
          row.time = new Date(row.time).getTime() - 8 * 60 * 60 * 1000;
          return row;
        }
      });
    //console.log(this.userData.length);
    chart
      .source(dv.rows)
      .scale({
        time: {
          type: "timeCat",
          alias: "时间",
          mask: "MM-DD HH:mm:ss",
          tickCount: this.userData.length
        }
      })
      // .tooltip({
      //   showTitle: true,
      //   itemTpl: "<li>{type} : {duration}</li>"
      // });

    chart
      .legend({
        itemFormatter: field => {
          switch (field) {
            case "fpt":
              field = "白屏耗时";
              break;
            case "ready":
              field = "首屏耗时";
              break;
            case "tti":
              field = "可交互耗时";
              break;
            case "load":
              field = "完全加载耗时";
              break;
            default:
              break;
          }
          // 这里的field是字段名
          return field;
        }
      })
      .interval()
      .position("time*duration")
      .color("type")
      .tooltip("type*duration", (type, duration) => {
        let name = "";
        switch (type) {
          case "fpt":
            name = "白屏耗时";
            break;
          case "ready":
            name = "首屏耗时";
            break;
          case "tti":
            name = "可交互耗时";
            break;
          case "load":
            name = "完全加载耗时";
            break;
          default:
            break;
        }
        return {
          name: name,
          value: duration + " ms"
        };
      })
      .adjust([
        {
          type: "dodge",
          marginRatio: 1 / 32
        }
      ]);
    chart.render();
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