<template>
    <div class="content-box">
      <!-- <div class="title">
        <span class="box-panel-title-small">{{title}}</span>
        <span class="box-panel-time-dimension">
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
      </div> -->
        <div :id="containerId"></div>
    </div>
</template>

<script>
export default {
  props: {
    title: String,
    // data: Array
  },
  data() {
    return {
        containerId: Math.random().toString(36).substr(2),
        data:[
            {time:'2020-02-18T09:06:00.000Z',success:123,fail:30,successDuration:1234,failDuration:899,request:124},
            {time:'2020-02-18T09:07:00.000Z',success:175,fail:30,successDuration:1234,failDuration:899,request:183},
            {time:'2020-02-18T09:08:00.000Z',success:143,fail:30,successDuration:1234,failDuration:899,request:152},
            {time:'2020-02-18T09:09:00.000Z',success:155,fail:30,successDuration:1234,failDuration:899,request:163},
            {time:'2020-02-18T09:10:00.000Z',success:163,fail:30,successDuration:1234,failDuration:899,request:172},
            {time:'2020-02-18T09:11:00.000Z',success:175,fail:30,successDuration:1234,failDuration:899,request:183},
            {time:'2020-02-18T09:12:00.000Z',success:123,fail:30,successDuration:1234,failDuration:899,request:126},
            {time:'2020-02-18T09:13:00.000Z',success:145,fail:30,successDuration:1234,failDuration:899,request:223},
            {time:'2020-02-18T09:14:00.000Z',success:423,fail:30,successDuration:1234,failDuration:899,request:512},
            {time:'2020-02-18T09:15:00.000Z',success:625,fail:30,successDuration:1234,failDuration:899,request:723},
            {time:'2020-02-18T09:16:00.000Z',success:623,fail:30,successDuration:1234,failDuration:899,request:712},
            {time:'2020-02-18T09:17:00.000Z',success:725,fail:30,successDuration:1234,failDuration:899,request:823},
            {time:'2020-02-18T09:18:00.000Z',success:223,fail:30,successDuration:1234,failDuration:899,request:312},
            {time:'2020-02-18T09:19:00.000Z',success:825,fail:30,successDuration:1234,failDuration:899,request:923},
            {time:'2020-02-18T09:20:00.000Z',success:423,fail:30,successDuration:1234,failDuration:899,request:512},
            {time:'2020-02-18T09:21:00.000Z',success:925,fail:30,successDuration:1234,failDuration:899,request:1023},
            {time:'2020-02-18T09:22:00.000Z',success:623,fail:30,successDuration:1234,failDuration:899,request:712},
            {time:'2020-02-18T09:23:00.000Z',success:725,fail:30,successDuration:1234,failDuration:899,request:823},
            {time:'2020-02-18T09:24:00.000Z',success:223,fail:30,successDuration:1234,failDuration:899,request:312},
            {time:'2020-02-18T09:25:00.000Z',success:825,fail:30,successDuration:1234,failDuration:899,request:923},
            {time:'2020-02-18T09:26:00.000Z',success:423,fail:30,successDuration:1234,failDuration:899,request:512},
            {time:'2020-02-18T09:27:00.000Z',success:925,fail:30,successDuration:1234,failDuration:899,request:1023},
            {time:'2020-02-18T09:28:00.000Z',success:223,fail:30,successDuration:1234,failDuration:899,request:312},
            {time:'2020-02-18T09:29:00.000Z',success:825,fail:30,successDuration:1234,failDuration:899,request:923},
            {time:'2020-02-18T09:30:00.000Z',success:423,fail:30,successDuration:1234,failDuration:899,request:512},
            {time:'2020-02-18T09:31:00.000Z',success:925,fail:30,successDuration:1234,failDuration:899,request:1023},
            {time:'2020-02-18T09:32:00.000Z',success:623,fail:30,successDuration:1234,failDuration:899,request:712},
            {time:'2020-02-18T09:33:00.000Z',success:725,fail:30,successDuration:1234,failDuration:899,request:823},
            {time:'2020-02-18T09:34:00.000Z',success:223,fail:30,successDuration:1234,failDuration:899,request:312},
            {time:'2020-02-18T09:35:00.000Z',success:825,fail:30,successDuration:1234,failDuration:899,request:923},
            {time:'2020-02-18T09:36:00.000Z',success:423,fail:30,successDuration:1234,failDuration:899,request:512},
            {time:'2020-02-18T09:37:00.000Z',success:925,fail:30,successDuration:1234,failDuration:899,request:1023},
            {time:'2020-02-18T09:39:00.000Z',success:825,fail:30,successDuration:1234,failDuration:899,request:923},
            {time:'2020-02-18T09:40:00.000Z',success:423,fail:30,successDuration:1234,failDuration:899,request:512},
            {time:'2020-02-18T09:41:00.000Z',success:925,fail:30,successDuration:1234,failDuration:899,request:1023},
            {time:'2020-02-18T09:42:00.000Z',success:623,fail:30,successDuration:1234,failDuration:899,request:712},
            {time:'2020-02-18T09:43:00.000Z',success:725,fail:30,successDuration:1234,failDuration:899,request:823},
            {time:'2020-02-18T09:44:00.000Z',success:223,fail:30,successDuration:1234,failDuration:899,request:312},
            {time:'2020-02-18T09:45:00.000Z',success:825,fail:30,successDuration:1234,failDuration:899,request:923},
            {time:'2020-02-18T09:46:00.000Z',success:423,fail:30,successDuration:1234,failDuration:899,request:512},
            {time:'2020-02-18T09:47:00.000Z',success:925,fail:30,successDuration:1234,failDuration:899,request:1023},
        ],
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
        const dv=ds.createView().source(rawData).transform({
            type:'map',
            callback(row){
                row.successRate=((row.success/row.request).toFixed(2))*100+'%';
                row.failRate=((row.fail/row.request).toFixed(2))*100+'%';
                return row;
           }
        }
        );
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
        this.chart.scale('successRate',{
          alias:'成功比例',
        })
        this.chart.scale('request',{
          alias:'请求总数',
        })
        this.chart.line().position("time*successRate").shape("smooth").color("#2FC25B");
        this.chart.axis('time',{
          line:{
            lineWidth:1,
            stroke:'#0000CD'
          }
        });
        this.chart.axis('request',{
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
        this.chart.interval().color('#4169E1').position('time*request');
        this.chart.render();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.content-box {
  width:100%;
  //margin-bottom: 16px;
  background: #fff;
  ///padding: 0 16px 0 16px;
  border-radius: 4px;
  //box-shadow: 0 0 4px rgba(82, 94, 102, 0.15);
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
}
</style>f