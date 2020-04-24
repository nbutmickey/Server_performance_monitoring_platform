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
        containerId: Math.random().toString(36).substr(2),
        chart:null
    };
  },
  mounted() {
    this.initChart();
    let dv=this.processData(this.data);
    this.renderChart(dv);
  },
  methods: {
    initChart:function(){
        this.chart = new G2.Chart({
            container: this.containerId,
            forceFit: true,
            height: 360,
            padding:'auto'
        })
    },
    processData:function(rawData){
        const ds=new DataSet();
        const dv=ds.createView().source(rawData);
        return dv;
    },
    renderChart:function(dv){
        this.chart.source(dv);
        this.chart.scale('visitTime',{
            type:'timeCat',
            mask:'MM-DD HH:mm',
            tickInterval:500
        });
        this.chart.scale('failDuration',{
          alias:'失败耗时',
        })
        this.chart.scale('failed',{
          alias:'失败数',
        })
        this.chart.line().position("visitTime*failDuration").shape("smooth").color("#00BFFF");
        this.chart.axis('visitTime',{
          line:{
            lineWidth:1,
            stroke:'#DC143C'
          }
        });
        this.chart.axis('failed',{
          line:{
            lineWidth:1,
            stroke:'#DC143C'
          }
        });
        this.chart.axis('failDuration',{
          line:{
            lineWidth:1,
            stroke:'#DC143C'
          }
        });
        this.chart.interval().color('#DC143C').position('visitTime*failed');
        this.chart.render();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>