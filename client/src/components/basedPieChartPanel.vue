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
  watch: {
    data(val) {
      this.data = val;
      this.chart.changeData(val);
    }
  },
  mounted() {
    this.renderPineChart();
  },
  methods: {
    changeShow: function() {
      this.isPine = !this.isPine;
    },
    changeTimeDimension: function(e) {
      this.$emit("changeTimeDimension", e.target.value);
    },
    renderPineChart: function() {
      let sum = this.data.reduce(function(total, cur) {
        return total + cur.count;
      }, 0);

      this.chart = new G2.Chart({
        container: this.containerId,
        forceFit: true,
        height: 350,
        padding: [0, 30, 0, "auto"]
      });
      //利用dataSet来扩展字段
      const ds = new DataSet();
      const dv = ds.createView().source(this.data).transform({
        type:'percent',
        field:'count',
        dimension:'type',
        as:'percent'
      });

      this.chart.source(dv);

      this.chart.coord("theta", {
        radius: 0.8
      });

      this.chart
        .tooltip({showTitle: false})
        .legend({
          position: "right-bottom",
          offsetX: -50
        });

      this.chart
        .intervalStack()
        .position("count")
        .color("type")
        .label("percent", {
          formatter: (val, item) => {
            return item.point.type + ": " + (item.point.percent*100).toFixed(0)+'%';
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
</style>f