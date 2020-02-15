<template>
  <div style="width:50%;padding-left:8px;paddig-right:8px;">
    <div class="content-box">
      <timeDimension :title="title" v-on:changeTimeDimension="changeTimeDimension">
        <span class="box-panel-change-show">
          <a-radio-group defaultValue="pine" size="small" @change="changeShow">
            <a-radio-button value="pine">饼图</a-radio-button>
            <a-radio-button value="table">表格</a-radio-button>
          </a-radio-group>
        </span>
      </timeDimension>
      <div class="container">
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
import timeDimension from "@/components/timeDimension"
export default {
  props: {
    title: String,
    data: Array,
    showTimeDimension: Boolean
  },
  components: {
    timeDimension
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
      let dv=this.processData(val);
      this.chart.changeData(dv);
    }
  },
  mounted() {
    this.initChart();
    this.renderPineChart(this.data);
  },
  methods: {
    changeShow: function() {
      this.isPine = !this.isPine;
    },
    changeTimeDimension: function(value) {
      this.$emit("changeTimeDimension", value);
    },
    //数据处理
    processData:function(rawData){
       const ds = new DataSet();
       const dv = ds.createView().source(rawData).transform({
        type:'percent',
        field:'count',
        dimension:'type',
        as:'percent'
      });
      return dv;
    },
    //初始化图表
    initChart:function(){
       this.chart = new G2.Chart({
        container: this.containerId,
        forceFit: true,
        height: 350,
        padding: [0, 30, 0, "auto"]
      });
    },
    renderPineChart: function(rawData) {
      //数据处理
      let dv=this.processData(rawData);

      //装载数据并绘制图表
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
    .box-panel-change-show {
      margin-left: 30px;
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