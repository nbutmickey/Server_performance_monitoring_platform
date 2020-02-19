<template>
    <div :id="containerId"></div>
</template>

<script>
export default {
  props: {
    title: String,
    data: Array
  },
  data() {
    return {
        containerId: Math.random().toString(36).substr(2),
        chart:null
    };
  },
  watch: {
    
  },
  mounted() {
    this.initChart();
    let dv=this.processData(this.data);
    this.renderChart(dv);
  },
  methods: {
    changeTimeDimension: function(e) {
      this.$emit("changeTimeDimension", e.target.value);
    },
    initChart:function(){
        this.chart = new G2.Chart({
            container: this.containerId,
            forceFit: true,
            height: 360,
            padding:['auto','auto','auto','auto']
        })
    },
    processData:function(rawData){
        const ds=new DataSet();
        const dv=ds.createView().source(rawData);
        return dv;
    },
    renderChart:function(dv){
        this.chart.source(dv);
        this.chart.scale('time',{
            type:'timeCat',
            mask:'HH:mm',
            //tickCount:46,
             tickInterval:500
        });
        this.chart.scale('successDuration',{
          alias:'成功耗时',
        })
        this.chart.scale('success',{
          alias:'成功数',
        })
        this.chart.line().position("time*successDuration").shape("smooth").color("#F4A460");
        this.chart.axis('time',{
          line:{
            lineWidth:1,
            stroke:'#1E90FF'
          }
        });
        this.chart.axis('success',{
          line:{
            lineWidth:1,
            stroke:'#1E90FF'
          }
        });
        this.chart.axis('successDuration',{
          line:{
            lineWidth:1,
            stroke:'#1E90FF'
          }
        });
        this.chart.interval().position('time*success');
        this.chart.render();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>