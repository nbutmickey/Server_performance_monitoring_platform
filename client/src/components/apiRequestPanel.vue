<template>
  <div class="content-box">
    <a-tabs defaultActiveKey="1" @change="changeTab">
      <a-tab-pane tab="成功率" key="1"><apiRequestSuccessChart></apiRequestSuccessChart></a-tab-pane>
      <a-tab-pane tab="成功耗时" key="2"><apiRequestSuccessDurationChart></apiRequestSuccessDurationChart></a-tab-pane>
      <a-tab-pane tab="失败耗时" key="3"><apiRequestFailDurationChart></apiRequestFailDurationChart></a-tab-pane>
      <timeDimension slot="tabBarExtraContent"  v-on:changeTimeDimension="getData"></timeDimension>
    </a-tabs>
  </div>
</template>

<script>
import apiRequestSuccessChart from "@/components/apiRequestSuccessChart"
import apiRequestSuccessDurationChart from "@/components/apiRequestSuccessDurationChart"
import apiRequestFailDurationChart from "@/components/apiRequestFailDurationChart"
import timeDimension from "@/components/timeDimension"
export default {
  props: {
    title: String,
    data: Array,
  },
  components: {
    apiRequestSuccessChart,
    apiRequestSuccessDurationChart,
    apiRequestFailDurationChart,
    timeDimension 
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
      changeTab(tabKey) {
        console.log(tabKey);
      },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.content-box {
  margin-bottom: 16px;
  background: #fff;
  padding: 0 16px 10px 16px;
}
</style>f