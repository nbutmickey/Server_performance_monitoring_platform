<template>
  <div style="width:50%;padding-left:8px;paddig-right:8px;">
    <div class="content-box">
      <timeDimension :title="title" v-on:changeTimeDimension="changeTimeDimension"></timeDimension>
      <div class="container">
        <waterfallChart :data="data" v-if="data.length!==0"></waterfallChart>
        <a-empty v-else description="暂无数据哦，换一个时间维度试一试！"></a-empty>
      </div>
    </div>
  </div>
</template>

<script>
import timeDimension from "@/components/timeDimension"
import waterfallChart from "@/components/chart/waterfallChart"
export default {
  props: {
    title: String,
    data: Array
  },
  components: {
    waterfallChart,
    timeDimension
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
  .container {
      width: 100%;
  }
}
</style>