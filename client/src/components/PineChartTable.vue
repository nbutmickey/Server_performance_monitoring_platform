<template>
  <div style="height:355px">
    <a-table
      :columns="columns"
      :dataSource="data"
      :loading="loading"
      :pagination="pagination"
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
          title: this.title,
          dataIndex: "type"
        },
        {
          title: "数量",
          dataIndex: "count",
          align: "center"
        }
      ],
      pagination: false,
      size: "middle",
      loading: false
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>