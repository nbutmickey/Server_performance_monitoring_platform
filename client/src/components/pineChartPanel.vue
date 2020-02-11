<template>
  <div style="width:50%;padding-left:8px;paddig-right:8px;">
    <div class="content-box">
      <div class="title">
        <span class="box-panel-title-small">{{title}}</span>
        <span class="box-panel-time-dimension" v-if="showTimeDimension">
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
        <span class="box-panel-change-show">
          <a-radio-group defaultValue="pine" size="small" @change="changeShow">
            <a-radio-button value="pine">饼图</a-radio-button>
            <a-radio-button value="table">表格</a-radio-button>
          </a-radio-group>
        </span>
      </div>
      <div class="cotainer">
        <div :id="containerId" v-show="isPine"></div>
        <div style="height:355px" v-show="!isPine">
          <a-table
            :columns="columns"
            :dataSource="data"
            :loading="loading"
            :pagination="pagination"
            :rowKey="record => record.type"
          ></a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    data: Array,
    showTimeDimension: Boolean
  },
  data() {
    return {
      containerId: Math.random()
        .toString(36)
        .substr(2),
      chart: null,
      isPine: true,
      columns: [
        {
          title: this.title,
          dataIndex: "type"
        },
        {
          title: "数量",
          dataIndex: "count",
          align: "center"
        }
      ],
      pagination: false,
      size: "middle",
      loading: false
    };
  },
  created() {},
  mounted() {
    this.renderPineChart(this.data);
  },
  methods: {
    changeShow: function() {
      this.isPine = !this.isPine;
    },
    renderPineChart: function(data) {
      let sum = this.data.reduce(function(total, cur) {
        return total + cur.count;
      }, 0);
      const ds = new DataSet();
      const dv = ds.createView().source(data);
      const chart = new G2.Chart({
        container: this.containerId,
        forceFit: true,
        height: 350,
        padding: [0, 30, 0, "auto"]
      });
      chart
        .source(dv)
        .tooltip(true)
        .legend({
          position: "right-bottom",
          offsetX: -50
        })
        .coord("theta", {
          radius: 0.8,
          innerRadius: 0.55
        });
      chart
        .intervalStack()
        .position("count")
        .color("type")
        .opacity(1)
        .label("count", {
          offset: -25,
          textStyle: {
            fill: "white",
            fontSize: 12,
            shadowBlur: 2,
            shadowColor: "rgba(0, 0, 0, .45)"
          },
          rotate: 0,
          autoRotate: false,
          formatter: (text, item) => {
            return String(parseInt((item.point.count / sum) * 100)) + "%";
          }
        });
      chart.guide().html({
        position: ["50%", "50%"],
        html:
          '<div class="g2-guide-html"></span><p style="font-weight:700;font-size:18px">' +
          sum +
          "</p></div>"
      });
      chart.render();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.ant-radio-group-small .ant-radio-button-wrapper {
  margin-right: 5px !important;
}
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
    .box-panel-change-show {
      float: right;
    }
  }
  .container {
    height: 358px;
    padding: 8px 5px 0;
    .g2-guide-html {
      width: 100px;
      height: 80px;
      vertical-align: middle;
      text-align: center;
      line-height: 0.2;
    }
  }
}
</style>