<template>
  <div style="width:100%;">
    <div class="content-box">
      <div class="title">
        <span class="box-panel-title-small">{{title}}</span>
        <span class="box-panel-time-dimension">
          <a-popover placement="right" class="radio-gap">
            <template slot="content">
              <a-radio-group defaultValue="0" size="small" @change="changeTimeDimension">
                <a-radio-button value="0">30分钟</a-radio-button>
                <a-radio-button value="1">60分钟</a-radio-button>
                <a-radio-button value="2">12小时</a-radio-button>
                <a-radio-button value="3">24小时</a-radio-button>
                <a-radio-button value="4">最近3天</a-radio-button>
                <a-radio-button value="5">最近7天</a-radio-button>
              </a-radio-group>
            </template>
            <a-icon type="clock-circle" />
          </a-popover>
        </span>
      </div>
      <div class="container">
        <a-table :columns="columns" :dataSource="data" :size="size" :pagination="pagination">
          <span slot="action" slot-scope="record">
            <a-button type="link" @click="showModal(record)">区间段耗时</a-button>
          </span>
        </a-table>
      </div>
      <!-- 对话弹出框 -->
      <a-modal
        :title="modalTitle"
        style="top:50px"
        v-model="visible"
        :footer="null"
        :width="modalWidth"
        @ok="handleOk"
      >
        <keyPerPanel v-show="showKeyPer" :width="keyPerPanelWidth"></keyPerPanel>
        <intervalTimePanel v-show="showIntervalTime"></intervalTimePanel>
      </a-modal>
    </div>
  </div>
</template>

<script>
import keyPerPanel from "@/components/keyPerPanel";
import intervalTimePanel from "@/components/intervalTimePanel";
const columns = [
  {
    title: "页面URL",
    dataIndex: "pageURL",
    key: "pageURL"
  },
  {
    title: "白屏耗时",
    dataIndex: "fpt",
    key: "fpt",
    align: "center"
  },
  {
    title: "首屏耗时",
    dataIndex: "ready",
    key: "ready",
    align: "center"
  },
  {
    title: "可交互耗时",
    dataIndex: "tti",
    key: "tti",
    align: "center"
  },
  {
    title: "完全加载耗时",
    key: "load",
    dataIndex: "load",
    align: "center"
  },
  {
    title: "各时间段耗时详情",
    key: "action",
    align: "center",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  props: {
    title: String,
    data:Array
  },
  components: {
    keyPerPanel,
    intervalTimePanel
  },
  data() {
    return {
      visible: false,
      modalWidth: "80%",
      modalTitle: "",
      showKeyPer: false,
      showIntervalTime: false,
      keyPerPanelWidth: "100%",
      columns,
      size: "small",
      pagination: {
        size: "small",
        pageSize: 6
      }
    };
  },
  watch: {
    data(val){
      this.data=val;
    }
  },
  created() {},
  mounted() {},
  methods: {
    changeTimeDimension: function(e) {
        this.$emit("changeTimeDimension",e.target.value);
    },
    showModal: function(record) {
      this.modalTitle = `页面${record.pageURL}区间段耗时`;
      this.showIntervalTime = true;
      this.visible = true;
    },
    handleOk: function() {
      this.visible = false;
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
      display: flex;
      flex-direction: row;
    }
  }
}
</style>