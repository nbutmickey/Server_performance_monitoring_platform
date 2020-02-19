<template>
    <div :id="containerId"></div>
</template>

<script>
export default {
  props: {
    data: Array,
    isPine:Boolean
  },
  data() {
    return {
      containerId: Math.random()
        .toString(36)
        .substr(2),
      chart: null
    };
  },
  watch:{
    data(val){
            this.data=val;   
            let dv=this.processData(val);
            this.chart.changeData(dv); //向chart的changeData中传入dv（转化之后的数据）
            this.drawGuideHtml(val,true);
    },
    isPine(val){
        //跟踪是否为图表显示，然后强制其适应父容器宽度
        if(val){
            this.chart.forceFit();
        } 
    }
  },
  mounted() {
            this.initChart(); //图表初始化
            this.renderChart(this.data); //绘制图表
  },
  methods: {
    processData:function(rawData){
      const ds = new DataSet();
      const dv = ds.createView().source(rawData)
      .transform({
        type:'percent',
        field:'count',
        dimension:'type',
        as:'percent'
      })
      return dv;
    },
    renderChart:function(rawData){
      let dv=this.processData(rawData);
      this.chart
        .source(dv)
        .tooltip({
          showTitle: false
        })
        .legend({
          position: "right-bottom",
          offsetX: -50
        })
        .coord("theta", {
          radius: 0.8,
          innerRadius: 0.55
        });

      this.chart
        .intervalStack()
        .position("count")
        .color("type")
        .opacity(1)
        .label("percent", {
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
            return (item.point.percent*100).toFixed(0)+'%';
          }
        });
        this.drawGuideHtml(rawData,false);
        this.chart.render();
    },
    drawGuideHtml:function(data,repaint){
      this.chart.guide().clear();
      let sum=data.reduce((total,cur)=>{return total+cur.count;},0);
      this.chart.guide().html({
            position: ["50%", "50%"],
            html:
              '<div class="g2-guide-html"><span class="title">总计</span></span><p style="font-weight:700;font-size:18px">' +
              sum +
              "</p></div>",
      });  
      if(repaint){
        this.chart.repaint(); 
      }
    },
    initChart: function() {
      this.chart = new G2.Chart({
        container: this.containerId,
        forceFit: true,
        //width:825,
        height: 350,
        padding: [0, 30, 0, "auto"]
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .g2-guide-html {
        width: 100px;
        height: 80px;
        vertical-align: middle;
        text-align: center;
        line-height: 0.4;
       .title {
        text-align: center;
        font-size: 12px;
        color: #8c8c8c;
        font-weight: 300;
    }
  }
</style>