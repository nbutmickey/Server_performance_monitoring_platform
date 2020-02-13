<template>
  <div style="width:50%;padding-left:8px;paddig-right:8px;">
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
      containerId: Math.random()
        .toString(36)
        .substr(2),
      userData: [
        {
          time: "2020-02-10T09:06:00.000Z",
          redirect: 120,
          dns: 343,
          tcp: 3345,
          ssl: 4456,
          ttfb: 321,
          trans: 1234,
          dom: 3123,
          resource: 1211
        }
      ]
    };
  },
  created() {},
  mounted() {
    const { Util, Shape, Global } = G2;
    function getRectPath(points) {
      const path = [];
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        if (point) {
          const action = i === 0 ? "M" : "L";
          path.push([action, point.x, point.y]);
        }
      }
      const first = points[0];
      path.push(["L", first.x, first.y]);
      path.push(["z"]);
      return path;
    }

    function getFillAttrs(cfg) {
      const defaultAttrs = Global.shape.interval;
      const attrs = Util.mix({}, defaultAttrs, cfg.style, {
        fill: cfg.color,
        stroke: cfg.color,
        fillOpacity: cfg.opacity
      });
      return attrs;
    }

    Shape.registerShape("interval", "waterfall", {
      draw(cfg, container) {
        const attrs = getFillAttrs(cfg);
        let rectPath = getRectPath(cfg.points);
        rectPath = this.parsePath(rectPath);
        const interval = container.addShape("path", {
          attrs: Util.mix(attrs, {
            path: rectPath
          })
        });

        if (cfg.nextPoints) {
          let linkPath = [
            ["M", cfg.points[2].x, cfg.points[2].y],
            ["L", cfg.nextPoints[0].x, cfg.nextPoints[0].y]
          ];

          if (cfg.nextPoints[0].y === 0) {
            linkPath[1] = ["L", cfg.nextPoints[1].x, cfg.nextPoints[1].y];
          }
          linkPath = this.parsePath(linkPath);
          container.addShape("path", {
            attrs: {
              path: linkPath,
              stroke: "#8c8c8c",
              lineDash: [4, 2]
            }
          });
        }

        return interval;
      }
    });
    //数据需要做个转化
    const data = [
      { type: "重定向", money: 300 },
      { type: "DNS解析", money: 900 },
      { type: "TCP连接", money: 200 },
      { type: "SSL建立", money: 300 },
      { type: "请求响应", money: 1200 },
      { type: "数据传输", money: 1000 },
      { type: "DOM解析", money: 2000 },
      { type: "资源加载", money: 200 },
      { type: "总耗时", money: 6100 }
    ];

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (i > 0 && i < data.length - 1) {
        if (Util.isArray(data[i - 1].money)) {
          item.money = [
            data[i - 1].money[1],
            item.money + data[i - 1].money[1]
          ];
        } else {
          item.money = [data[i - 1].money, item.money + data[i - 1].money];
        }
      }
    }

    const chart = new G2.Chart({
      container: this.containerId,
      forceFit: true,
      height: 350,
      padding: [20, 20, 60, "auto"]
    });
    chart.source(data);
    // 自定义图例
    chart.legend({
      custom: true,
      clickable: false,
      items: [
        {
          value: "各阶段耗时",
          marker: { symbol: "square", fill: "#1890FF", radius: 5 }
        },
        {
          value: "总耗时",
          marker: { symbol: "square", fill: "#8c8c8c", radius: 5 }
        }
      ]
    });

    //坐标轴逆转
    chart.coord().transpose();

    chart
      .interval()
      .position("type*money")
      .color("type", type => {
        if (type === "总耗时") {
          return "#8c8c8c";
        }
      })
      .tooltip("type*money", (type, money) => {
        if (Util.isArray(money)) {
          return {
            name: "平均耗时",
            value: (money[1] - money[0])+'ms'
          };
        }
        // return {
        //   name: "生活费",
        //   value: money
        // };
      })
      .shape("waterfall");

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