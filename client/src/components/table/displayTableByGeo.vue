<template>
    <div style="width:49%;height:450px;display:inline-block">
          <a-table
            :columns="columns"
            :dataSource="data"
            :loading="loading"
            :pagination="pagination"
            size="middle"
            :rowKey="(record,index) => index "
          ></a-table>
    </div>
</template>

<script>
export default {
  props: {
    data: Array
  },
  data() {
    return {
      columns: [
        {
          title: "省市区",
          dataIndex: "province"
        },
        {
          title: "pv",
          dataIndex: "pv",
          width:150
        },
        {
          title: "uv",
          dataIndex: "uv",
          width:150
        }
      ],
      pagination:{
        pageSize:6
      },
      loading: false
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>