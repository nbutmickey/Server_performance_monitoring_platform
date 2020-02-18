<template>
  <div style="width:50%;padding-left:8px;paddig-right:8px;">
    <div class="content-box">
         <timeDimension :title="title" v-on:changeTimeDimension="changeTimeDimension">
            <span class="box-panel-change-show">
              <a-radio-group defaultValue="pine" class="type-radio" size="small" @change="changeShow">
                <a-radio-button value="pine">饼图</a-radio-button>
                <a-radio-button value="table">表格</a-radio-button>
              </a-radio-group>
          </span>
        </timeDimension>
      <div class="container">
        <pineChart v-if="data.length!==0" :isPine="isPine" :data="data"></pineChart>
        <a-empty v-else></a-empty>
      </div>
    </div>
  </div>
</template>

<script>
import timeDimension from "@/components/timeDimension"
import pineChart from "@/components/pineChart"
export default {
  props: {
    title: String,
    data: Array,
    showTimeDimension: Boolean
  },
  components: {
     timeDimension,
     pineChart
  },
  data() {
    return {
      containerId: Math.random()
        .toString(36)
        .substr(2),
      chart: null,
      isPine: true,
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
  },
  methods: {
    changeShow: function() {
      this.isPine = !this.isPine;
    },
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
  }
}
</style>