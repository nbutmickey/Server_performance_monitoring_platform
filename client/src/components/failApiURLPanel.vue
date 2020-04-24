<template>
  <div style="width:50%;padding-left:8px;">
    <div class="content-box">
      <timeDimension :title="title" v-on:changeTimeDimension="changeTimeDimension"></timeDimension>
      <div class="container">
        <a-table :columns="columns" :dataSource="data" size="small" :pagination="pagination" :rowKey="(record,index)=> index">
          <div :title="record.apiURL" :style="{maxWidth: '350px',whiteSpace: 'nowrap',textOverflow: 'ellipsis',overflow: 'hidden', wordWrap: 'break-word', wordBreak: 'break-all' }" slot="preCondition" slot-scope="text, record">{{record.apiURL}}</div>
        </a-table>
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
    scopedSlots: { customRender: 'preCondition' }
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
    customRender:(text, record, index)=>{return parseInt(text)+' ms'},
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
      changeTimeDimension: function(val) {
        this.$emit("changeTimeDimension",val);
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
  box-shadow: 0 0 4px rgba(82, 94, 102, 0.15)
}
</style>