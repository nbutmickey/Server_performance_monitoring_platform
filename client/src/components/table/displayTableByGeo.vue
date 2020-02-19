<template>
    <div style="height:335px;width:49%;display:inline-block">
          <a-table
            :columns="columns"
            :dataSource="data"
            :loading="loading"
            :scroll="{ y: 320 }"
            :pagination="pagination"
            size="middle"
            :rowKey="record => record.type"
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
      pagination:false,
      loading: false
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>