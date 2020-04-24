<template>
  <div class="content-box">
    <a-tabs defaultActiveKey="0" @change="changeTab">
      <a-tab-pane tab="成功率" key="0">
        <apiRequestSuccessChart v-if="reqSuccessData.length!==0" :data="reqSuccessData"></apiRequestSuccessChart>
        <a-empty v-else description="暂无数据哦，换一个时间维度试一试！"></a-empty>
        </a-tab-pane>
      <a-tab-pane tab="成功耗时" key="1">
        <apiRequestSuccessDurationChart v-if="successDurationData.length!==0" :data="successDurationData"></apiRequestSuccessDurationChart>
        <a-empty v-else description="暂无数据哦，换一个时间维度试一试！"></a-empty>
      </a-tab-pane>
      <a-tab-pane tab="失败耗时" key="2">
        <apiRequestFailDurationChart v-if="failDurationData.length!==0" :data="failDurationData"></apiRequestFailDurationChart>
        <a-empty v-else description="暂无数据哦，换一个时间维度试一试！"></a-empty>
      </a-tab-pane>
      <timeDimension slot="tabBarExtraContent"  v-on:changeTimeDimension="changeTimeDimension"></timeDimension>
    </a-tabs>
  </div>
</template>

<script>
import apiRequestSuccessChart from "@/components/apiRequestSuccessChart"
import apiRequestSuccessDurationChart from "@/components/apiRequestSuccessDurationChart"
import apiRequestFailDurationChart from "@/components/apiRequestFailDurationChart"
import timeDimension from "@/components/timeDimension"
export default {
  props: {
    title: String,
    data: Array,
  },
  components: {
    apiRequestSuccessChart,
    apiRequestSuccessDurationChart,
    apiRequestFailDurationChart,
    timeDimension 
  },
  data() {
    return {
      reqSuccessData:[],
      successDurationData:[],
      failDurationData:[],
      tabKey:0,
      timeDimensionType:5
    };
  },
  mounted() {
    this.getReqSuccessData();
    this.getReqSuccessDurationData();
    this.getReqFailDurationData();
  },
  methods: {
      changeTimeDimension(value){
        this.timeDimensionType=value;
        console.log(this.tabKey);
        if(this.tabKey==0){
          this.getReqSuccessData();
        }else if(this.tabKey==1){
          this.getReqSuccessDurationData();
        }else if(this.tabKey==2){
          this.getReqFailDurationData();
        }
      },
      changeTab(tabKey) {
       this.tabKey=tabKey;
        if(tabKey==0){
          this.getReqSuccessData();
        }else if(tabKey==1){
          this.getReqSuccessDurationData();
        }else if(tabKey==2){
          this.getReqFailDurationData();
        }
      },
      async getReqSuccessData(){
        let {success,result}=await this.$get('/info/getAllSuccessAPIRate',{appID:'kol9l-k5dvol2z-b4cad0ad-k5dvol2z',dimensionType:this.timeDimensionType});
        if(success){
          this.reqSuccessData=result;
        }
      },
      async getReqSuccessDurationData(){
        let {success,result}=await this.$get('/info/getAllSuccessAPIDuration',{appID:'kol9l-k5dvol2z-b4cad0ad-k5dvol2z',dimensionType:this.timeDimensionType});
        if(success){
         this.successDurationData=result.map((item)=>{
            item.successDuration=parseInt(item.successDuration);
            return item;
          })
        }
      },
      async getReqFailDurationData(){
        let {success,result}=await this.$get('/info/getAllFailedAPIDuration',{appID:'kol9l-k5dvol2z-b4cad0ad-k5dvol2z',dimensionType:this.timeDimensionType});
        if(success){
          this.failDurationData=result.map(item=>{
            item.failDuration=parseInt(item.failDuration);
            return item;
          });
        }
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.content-box {
  margin-bottom: 16px;
  background: #fff;
  height: 435px;
  padding: 0 16px 10px 16px;
}
</style>f