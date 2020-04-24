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
      chart: null,
      containerId: Math.random()
        .toString(36)
        .substr(2)
    };
  },
  watch: {
    data(val) {
      this.chart.clear();
      this.renderChart(this.data);
    }
  },
  mounted() {
    this.initChart();
    this.renderChart(this.data);
    this.chart.forceFit();
  },
  methods: {
    renderChart: function(userData) {
      const { Util } = G2;
      const dv = new DataSet()
        .createView()
        .source(userData)
        .transform({
          type: "fold",
          fields: [
            "redirect",
            "dns",
            "tcp",
            "ssl",
            "ttfb",
            "trans",
            "dom",
            "resource",
            "total"
          ],
          key: "type",
          value: "duration"
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
              case "total":
                row.type = "总耗时";
                break;
              default:
                break;
            }
            return row;
          }
        });
      let data = dv.rows;
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (i > 0 && i < data.length - 1) {
          if (Util.isArray(data[i - 1].duration)) {
            item.duration = [
              data[i - 1].duration[1],
              item.duration + data[i - 1].duration[1]
            ];
          } else {
            item.duration = [
              data[i - 1].duration,
              item.duration + data[i - 1].duration
            ];
          }
        }
      }

      this.chart.source(dv);
      this.chart.tooltip({ showTitle: false });
      // 自定义图例
      this.chart.legend({
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
      this.chart.coord().transpose();
      this.chart
        .interval()
        .position("type*duration")
        .color("type", type => {
          if (type === "总耗时") {
            return "#8c8c8c";
          }
        })
        .tooltip("type*duration", (type, duration) => {
          if (Util.isArray(duration)) {
            return {
              name: type,
              value: duration[1] - duration[0] + " ms"
            };
          }
          return {
            name: type,
            value: duration + " ms"
          };
        })
        .shape("waterfall");

      this.chart.render();
    },
    initChart: function() {
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
          return interval;
        }
      });

      this.chart = new G2.Chart({
        container: this.containerId,
        forceFit: true,
        height: 350,
        padding: [20, 20, 60, "auto"]
      });
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