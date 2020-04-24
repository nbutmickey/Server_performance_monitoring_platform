<template>
  <div class="box">
      <div class="head">
        <div class="title">{{title}}</div>
        <div class="unit">单位：{{unit}}</div>
      </div>
      <div class="content" :id="containerId"></div>
  </div>
</template>

<script>
export default {
  props:{
    title:String,
    unit:String,
    data:Array
  },
  data(){
    return {
      containerId: Math.random()
        .toString(36)
        .substr(2),
      chart: null
    }
  },
  watch: {
    data(val) {
      //重绘图表
        this.chart.changeData(val);
    }
  },
  mounted () {
      this.initChart();
      this.renderChart();
  },
  methods: {
    //初始化图表
    initChart: function() {
      this.chart=new G2.Chart({
        container: this.containerId,
        forceFit: true,
        height: 200,
        padding: ["auto",30,"auto","auto"]
      });
    },
    renderChart:function(){
      this.chart.source(this.data);
      this.chart.coord('rect').transpose(); 
      this.chart.axis("type",{
        line:false,
        tickLine:false
      });
      this.chart.axis("value",{
        label:false,
        line:false,
        title:false,
        grid:false
      })
      this.chart.legend(false);
      this.chart.tooltip(false);
      this.chart.interval()
      .position('type*value')
      .color("type")
      .label('value', {
        style: {
            fill: '#8d8d8d'
         },
         offset: 5,
         formatter: (value) => {
              value=parseInt(value);
              return (value + '').replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        }  
      });
      this.chart.render();
    }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.box{
  width: 33.3%;
  padding: 0 25px 10px 0;
  .head{
        display: flex;
        justify-content: space-between;
        padding-bottom: 5px;
        border-bottom: 1px solid #e3e8ef;
        .ant-empty{
          margin: 10px 8px !important;
        }
        .title{
          font-weight: 700;
          font-size: 14px;
        }
        .unit{
          color: #9ea7b4;
          font-size: 12px;
        }
  }
  .content{
    padding:10px 60px 0 0;
    &-item{
     display: flex;
     justify-content:space-between;
     .type-name{
      font-weight: 500;
      font-size: 18px;
      color:#9ea7b4;
     }
     .type-value{
       font-weight: 500;
     }
    }
  }
}
</style>