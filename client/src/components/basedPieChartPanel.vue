<template>
  <div style="width:50%;padding-left:8px;paddig-right:8px;">
    <div class="content-box">
      <timeDimension :title="title" v-on:changeTimeDimension="changeTimeDimension">
        <span class="box-panel-change-show">
          <a-radio-group defaultValue="pine" size="small" class="type-radio" @change="changeShow">
            <a-radio-button value="pine">饼图</a-radio-button>
            <a-radio-button value="table">表格</a-radio-button>
          </a-radio-group>
        </span>
      </timeDimension>
      <div class="container">
         <div v-if="data.length!==0">
          <basedChart :data="data" v-show="isPine" :isPine="isPine"></basedChart>
          <displayTable :data="data" v-show="!isPine"></displayTable>
        </div>
        <a-empty v-else description="暂无数据哦，换一个时间维度试一试！"></a-empty>
      </div>
    </div>
  </div>
</template>

<script>
import timeDimension from "@/components/timeDimension"
import basedChart from "@/components/chart/basedChart"
import displayTable from "@/components/table/displayTable"
export default {
  props: {
    title: String,
    data: Array,
    showTimeDimension: Boolean
  },
  components: {
    timeDimension,
    basedChart,
    displayTable
  },
  data() {
    return {
      containerId: Math.random()
        .toString(36)
        .substr(2),
      chart: null,
      isPine: true
    };
  },
  methods: {
    changeShow: function() {
      this.isPine = !this.isPine;
    },
    changeTimeDimension: function(value) {
      this.$emit("changeTimeDimension", value);
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
    .box-panel-change-show {
      .type-radio{
          .ant-radio-button-wrapper {
            margin-right: 5px;
          }
          .ant-radio-button-wrapper:first-child{
            border-radius: 0 !important;
          }
          .ant-radio-button-wrapper:last-child{
            border-radius: 0 !important;
          }
      }
      margin-left: 30px;
    }
  }
  .container {
    height: 358px;
    padding: 8px 5px 0;
    .ant-empty{
      margin-top: 100px;
    }
  }
}
</style>f