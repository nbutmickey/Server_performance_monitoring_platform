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
    data(val){
      let dv=this.processData(val);
      this.chart.clear();
      this.renderChart(dv);
    }
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
            padding:'auto'
        })
    },
    processData:function(rawData){
        const ds=new DataSet();
        const dv=ds.createView().source(rawData);
        dv.transform({
            type:'map',
            callback(row){
              row.visitTime = new Date(row.visitTime).getTime() - 8 * 60 * 60 * 1000;
              return row;
            }
        })
        return dv;
    },
    renderChart:function(dv){
        this.chart.source(dv);
        this.chart.scale('visitTime',{
            type:'timeCat',
            mask:'MM-DD HH:mm',
        });
        this.chart.scale('successDuration',{
          alias:'成功耗时',
        })
        this.chart.scale('success',{
          alias:'成功数',
        })
        this.chart.line().position("visitTime*successDuration").shape("smooth").color("#F4A460");
        this.chart.axis('visitTime',{
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
        this.chart.interval().position('visitTime*success');
        this.chart.render();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>