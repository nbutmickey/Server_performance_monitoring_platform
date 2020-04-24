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
        const dv=ds.createView().source(rawData).transform({
            type:'map',
            callback(row){
                row.successRate=((row.success/row.allCount).toFixed(2))*100+'%';
                return row;
           }
        }
        );
        return dv;
    },
    renderChart:function(dv){
        this.chart.source(dv);
        this.chart.scale('visitTime',{
            type:'timeCat',
            mask:'MM-DD HH:mm',
        });
        this.chart.scale('successRate',{
          alias:'成功比例',
        })
        this.chart.scale('allCount',{
          alias:'请求总数',
        })
        this.chart.line().position("visitTime*successRate").shape("smooth").color("#2FC25B");
        this.chart.axis('visitTime',{
          line:{
            lineWidth:1,
            stroke:'#0000CD'
          }
        });
        this.chart.axis('allCount',{
          line:{
            lineWidth:1,
            stroke:'#0000CD'
          }
        });
        this.chart.axis('successRate',{
          line:{
            lineWidth:1,
            stroke:'#0000CD'
          }
        });
        this.chart.interval().color('#4169E1').position('visitTime*allCount');
        this.chart.render();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>