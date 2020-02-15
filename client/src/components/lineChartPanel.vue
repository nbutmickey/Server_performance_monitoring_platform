<template>
  <div style="width:50%;padding-left:8px">
    <div class="content-box">
       <timeDimension :title="title" v-on:changeTimeDimension="changeTimeDimension"></timeDimension>
      <div class="container">
        <div :id="containerId"></div>
      </div>
    </div>
  </div>
</template>

<script>
import timeDimension from "@/components/timeDimension"
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
  components: {
    timeDimension
  },
  watch:{
    data(val){
      this.data=val;
      //重绘图表
      this.processData(val);
      if(this.dimentionType==4||this.dimentionType==5){
          this.chart.scale({
          time:{
            type:'timeCat',
            mask:'MM-DD',
            tickCount:val.length
          }
        })
      }else {

        this.chart.scale({
        time:{
          type:'timeCat',
          mask:'HH:mm',
          tickCount:val.length
        }
      })
      }
      this.chart.changeData(val);
    }
  },
  created() {
  },
  mounted() {
    this.initChart();
    this.renderChart(this.data);

  },
  methods: {
    changeTimeDimension: function(value) {
      this.dimentionType=value;
      this.$emit("changeTimeDimension",value);
    },
    initChart:function(){
        this.chart= new G2.Chart({
        container: this.containerId,
        forceFit: true,
        height: 300,
        padding: [10, 30, 30,30 ]
      });
    },
    processData:function(rawData){
      const ds=new DataSet();
      // console.log(rawData);
      const dv=ds.createView().source(rawData)
      // console.log(dv);
      return dv;
    },
    renderChart:function (rawData) {
      let dv=this.processData(rawData);
      //console.log(rawData.length);
      this.chart.source(dv);
      this.chart.scale({
        time:{
          type:'timeCat',
          mask:'HH:mm',
          tickCount:rawData.length
        }
      })
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