<template>
  <div style="width:50%;padding-left:8px;">
    <div class="content-box">
       <timeDimension :title="title" v-on:changeTimeDimension="changeTimeDimension"></timeDimension>
      <div class="container">
         <a-table v-if="data.length!==0" :columns="columns" :dataSource="data" size="small" :pagination="pagination" :rowKey="record => record.type"></a-table>
         <a-empty v-else description="暂无数据哦，换一个时间维度试一试！"></a-empty>
      </div>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title:"#",
    customRender:(text, record, index)=>{return index+1},
  },  
  {
    title: "页面URL",
    dataIndex: "pageURL",
    key: "pageURL",
    //align: "center"
  },
  {
    title: "pv",
    dataIndex: "pv",
    key: "pv",
    align: "center"
  },
  {
    title: "uv",
    dataIndex: "uv",
    key: "uv",
    align: "center"
  }
];
import timeDimension from "@/components/timeDimension"
export default {
  props: {
    title: String,
    data:Array
  },
  components: {
    timeDimension
  },
  data() {
    return {
      columns,
      pagination:false
  }
  },
  methods: {
      changeTimeDimension: function(value) {
        this.$emit("changeTimeDimension",value);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.content-box {
  margin-bottom: 16px;
  background: #fff;
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(82, 94, 102, 0.15);
  height: 405px;
    .container {
      .ant-empty{
      margin-top: 100px;
    }
    }
}
</style>