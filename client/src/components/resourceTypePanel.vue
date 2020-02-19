<template>
  <div class="content">
      <resourceTypeItem :data="resData.fileSize"></resourceTypeItem>
      <resourceTypeItem :data="resData.resDuration"></resourceTypeItem>
      <resourceTypeItem :data="resData.resNum"></resourceTypeItem>
  </div>
</template>

<script>
import resourceTypeItem from "@/components/resourceTypeItem"
export default {
  data() {
    return {
      resData:{}
    }
  },
  components: {
    resourceTypeItem  
  },
  created() {},
  async mounted() {
    this.getResTypeInfo();
   },
  methods: {
    getResTypeInfo:async function(){
      let res=await this.axios.get('/data/resTypeInfo');
      let {success,result}=res.data;
      if(success){
        this.resData=result;
      }
   }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.content{
    display: flex;
    flex-direction: row;
    background: #fff;
    box-shadow: 0 0 4px rgba(82, 94, 102, 0.15);
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 4px;
}
</style>