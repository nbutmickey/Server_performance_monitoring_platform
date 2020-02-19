<template>
  <div style="width:50%;padding-left:8px;paddig-right:8px;">
    <div class="content-box">
      <timeDimension :title="title" v-on:changeTimeDimension="changeTimeDimension"></timeDimension>
      <div class="container">
        <keyPerChart :data="data" v-if="data.length!==0"></keyPerChart>
        <a-empty v-else description="暂无数据哦，换一个时间维度试一试！"></a-empty>
      </div>
    </div>
  </div>
</template>

<script>
import timeDimension from "@/components/timeDimension"
import keyPerChart from "@/components/chart/keyPerChart"
export default {
  props: {
    title: String,
    data:Array
  },
  components: {
    timeDimension,
    keyPerChart
  },
  methods: {
    changeTimeDimension: function(value) {
        this.$emit("changeTimeDimension",value);
    }
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
    }
  }
}
</style>