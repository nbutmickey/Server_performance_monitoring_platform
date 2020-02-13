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
        <!-- <span class="box-panel-change-show">
          <a-radio-group defaultValue="pine" size="small" @change="changeShow">
            <a-radio-button value="pine">饼图</a-radio-button>
            <a-radio-button value="table">表格</a-radio-button>
          </a-radio-group>
        </span>-->
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
          time: "2020-02-10T09:02:00.000Z",
          redirect: 120,
          dns: 343,
          tcp: 3345,
          ssl: 4456,
          ttfb:321,
          trans:234,
          dom:123,
          resource:1211
        },
        {
          time: "2020-02-10T09:08:00.000Z",
          redirect: 120,
          dns: 343,
          tcp: 3345,
          ssl: 4456,
          ttfb:321,
          trans:234,
          dom:123,
          resource:1211
        },
        {
          time: "2020-02-10T09:12:00.000Z",
          redirect: 120,
          dns: 343,
          tcp: 3345,
          ssl: 4456,
          ttfb:321,
          trans:234,
          dom:123,
          resource:1211
        },
        {
          time: "2020-02-10T09:05:00.000Z",
          redirect: 120,
          dns: 343,
          tcp: 3345,
          ssl: 4456,
          ttfb:321,
          trans:234,
          dom:123,
          resource:1211
        },
        {
          time: "2020-02-19T09:06:00.000Z",
          redirect: 120,
          dns: 343,
          tcp: 3345,
          ssl: 4456,
          ttfb:321,
          trans:234,
          dom:123,
          resource:1211
        },
        {
          time: "2020-02-10T09:13:00.000Z",
          redirect: 120,
          dns: 343,
          tcp: 3345,
          ssl: 4456,
          ttfb:321,
          trans:234,
          dom:123,
          resource:1211
        },
        {
          time: "2020-02-10T09:24:00.000Z",
          redirect: 120,
          dns: 343,
          tcp: 3345,
          ssl: 4456,
          ttfb:321,
          trans:234,
          dom:123,
          resource:1211
        },
        {
          time: "2020-02-10T09:34:00.000Z",
          redirect: 120,
          dns: 343,
          tcp: 3345,
          ssl: 4456,
          ttfb:321,
          trans:234,
          dom:123,
          resource:1211
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
        fields: ["redirect", "dns", "tcp", "ssl","ttfb","trans","dom","resource"],
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
          mask: "MM-DD HH:mm:ss",
          tickCount: this.userData.length
        }
      })

    chart
      .legend({
        itemFormatter: field => {
          switch (field) {
            case "redirect":
              field = "重定向";
              break;
            case "dns":
              field = "DNS解析";
              break;
            case "tcp":
              field = "TCP连接";
              break;
            case "ssl":
              field = "https请求";
              break;
            case "ttfb":
              field = "请求响应";
              break;
            case "trans":
              field = "数据传输";
              break;
            case "dom":
              field = "DOM解析";
              break;
            case "resource":
              field = "资源加载";
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
          case "redirect":
              name = "重定向";
              break;
            case "dns":
              name = "DNS解析";
              break;
            case "tcp":
              name = "TCP连接";
              break;
            case "ssl":
              name = "https请求";
              break;
            case "ttfb":
              name = "请求响应";
              break;
            case "trans":
              name = "数据传输";
              break;
            case "dom":
              name = "DOM解析";
              break;
            case "resource":
              name = "资源加载";
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