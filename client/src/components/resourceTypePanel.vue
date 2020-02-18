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
      resData:{
         fileSize:{
            title:"各类型资源文件大小",
            content:[
             {type:'CSS',value:51},
             {type:'XHR',value:41},
             {type:'JS',value:31},
             {type:'IMG',value:12},
             {type:'Other',value:21},
         ]
         },
         resDuration:{
           title:"各类型资源平均耗时",
            content:[
             {type:'css',value:51},
             {type:'xhr',value:41},
             {type:'js',value:31},
             {type:'img',value:12},
             {type:'other',value:21},
         ]
         },
         resNum:{
           title:"各类型资源请求数目",
            content:[
             {type:'css',value:51},
             {type:'xhr',value:41},
             {type:'js',value:31},
             {type:'img',value:12},
             {type:'other',value:21},
         ]
         }
     }
    }
  },
  components: {
    resourceTypeItem  
  },
  created() {},
  async mounted() { },
  methods: {
    getResTypeInfo:async function(){
      let {success,result}=await this.axios.get('/data/resTypeInfo');
      
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