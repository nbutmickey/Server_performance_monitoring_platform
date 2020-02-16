<template>
  <div style="width:50%;padding-left:8px;">
    <div class="content-box">
      <timeDimension :title="title" v-on:changeTimeDimension="changeTimeDimension"></timeDimension>
      <div class="container">
        <a-table :columns="columns" :dataSource="data" size="small" :pagination="pagination" :rowKey="record => record.type"></a-table>
      </div>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title:"#",
    dataIndex:"key",
    key:"key",
    customRender:(text, record, index)=>{return index+1},
  },  
  {
    title: "API",
    dataIndex: "apiURL",
    key: "apiURL",
    //align: "center"
  },
  {
    title: "失败次数",
    dataIndex: "fail",
    key: "fail",
    align: "center"
  },
  {
    title: "失败耗时",
    dataIndex: "duration",
    key: "duration",
    customRender:(text, record, index)=>{return text+' ms'},
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
      pagination:{
          pageSize:8
      },
  }
  },
  watch: {
    data(val){
        this.data=val;
    }  
  },
  methods: {
      changeTimeDimension: function(e) {
        this.$emit("changeTimeDimension",e.target.value);
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
  height: 450px;
  box-shadow: 0 0 4px rgba(82, 94, 102, 0.15);
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
    .container {
      width: 100%;
      display: flex;
      flex-direction: row;
    }
  }
}
</style>