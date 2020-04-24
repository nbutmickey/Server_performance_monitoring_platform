<template>
  <div class="content">
        <resourceTypeItem v-if="data.resNum.length!==0" :data="data.resNum" :title="'资源请求数排行'" :unit="'次'"></resourceTypeItem>
        <a-empty v-else description="暂无数据"/>
        <resourceTypeItem v-if="data.fileSize.length!==0" :data="data.fileSize" :title="'资源文件大小排行'" :unit="'KB'"></resourceTypeItem>
        <a-empty v-else description="暂无数据"/>
        <resourceTypeItem v-if="data.resDuration.length!==0" :data="data.resDuration" :title="'资源加载耗时排行'" :unit="'ms'"></resourceTypeItem>  
        <a-empty v-else description="暂无数据"/>
  </div>
</template>

<script>
import resourceTypeItem from "@/components/resourceTypeItem"
export default {
  props: {
    data:Object
  },
  components: {
    resourceTypeItem  
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.content{
    display: flex;
    justify-content: space-between;
    background: #fff;
    box-shadow: 0 0 4px rgba(82, 94, 102, 0.15);
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 4px;
}
</style>