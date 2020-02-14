<template>
  <div style="width:50%;padding-left:8px">
    <div class="content-box">
      <div class="title">
        <span class="box-panel-title-small">{{title}}</span>
        <span class="box-panel-time-dimension">
          <a-popover placement="right" class="radio-gap">
            <template slot="content">
              <a-radio-group defaultValue="0" size="small"  @change="changeTimeDimension">
                <a-radio-button value="0" >30分钟</a-radio-button>
                <a-radio-button value="1" >60分钟</a-radio-button>
                <a-radio-button value="2" >12小时</a-radio-button>
                <a-radio-button value="3" >24小时</a-radio-button>
                <a-radio-button value="4" >最近3天</a-radio-button>
                <a-radio-button value="5" >最近7天</a-radio-button>
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
const that=this;
export default {
  props: {
    data:Array,  
    title: String
  },
  data() {
    return {
      chart: null,
      containerId: Math.random()
        .toString(36)
        .substr(2),
      dimentionType:0
    }
  },
  watch:{
    data(val){
      this.data=val;
      //重绘图表
      this.chart.changeData(val);
    }
  },
  created() {
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    changeTimeDimension: function(e) {
      this.$emit("changeTimeDimension",e.target.value);
    },
    renderChart:function () {
      this.chart= new G2.Chart({
      container: this.containerId,
      forceFit: true,
      height: 300,
      padding: [10, 30, 30,30 ]
    });
      this.chart.source(this.data);
      this.chart.scale("value", {
        min: 0
      });
      this.chart.scale({
        time: {
          type: "timeCat",
          mask: "HH:mm",
          tickCount: this.data.length
        }
      });
      this.chart.tooltip({
        crosshairs: {
          type: "line"
        }
      });
      this.chart
        .line()
        .position("time*value")
        .shape("smooth")
        .color(this.title==="PV数据"?"#1890ff":"#2FC25B");
      this.chart
        .point()
        .position("time*value")
        .size(3)
        .color(this.title==="PV数据"?"#1890ff":"#2FC25B")
        .shape("circle")
        .style({
          stroke: "#fff",
          lineWidth: 1
        });
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