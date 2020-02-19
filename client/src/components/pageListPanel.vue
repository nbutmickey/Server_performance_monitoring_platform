<template>
  <div style="width:100%;">
    <div class="content-box">
      <timeDimension :title="title" v-on:changeTimeDimension="changeTimeDimension"></timeDimension>
      <div class="container">
        <a-table :columns="columns" :dataSource="data" :size="size" :pagination="pagination">
          <span slot="action" slot-scope="record">
            <a-button type="link" @click="showModal(record)">区间段耗时</a-button>
          </span>
        </a-table>
        <!-- <a-empty v-else description="暂无数据哦，换一个时间维度试一试！"></a-empty> -->
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
        <intervalTimePanel :showTimeDimension="showTimeDimension"  v-show="showIntervalTime" :showTitle="showTitle" v-on:changeTimeDimension="changeTimeDimension" :data="intervalDataByPage" :rowKey="record => record.type"></intervalTimePanel>
      </a-modal>
    </div>
  </div>
</template>

<script>
import keyPerPanel from "@/components/keyPerPanel";
import intervalTimePanel from "@/components/intervalTimePanel";
import timeDimension from "@/components/timeDimension"
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
    customRender:(text, record, index)=>{return text+' ms'},
    align: "center"
  },
  {
    title: "首屏耗时",
    dataIndex: "ready",
    key: "ready",
    customRender:(text, record, index)=>{return text+' ms'},
    align: "center"
  },
  {
    title: "可交互耗时",
    dataIndex: "tti",
    key: "tti",
    customRender:(text, record, index)=>{return text+' ms'},
    align: "center"
  },
  {
    title: "完全加载耗时",
    key: "load",
    dataIndex: "load",
    customRender:(text, record, index)=>{return text+' ms'},
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
    intervalTimePanel,
    timeDimension
  },
  data() {
    return {
      columns,
      visible: false,
      modalWidth: "80%",
      modalTitle: "",
      showKeyPer: false,
      showIntervalTime: false,
      keyPerPanelWidth: "100%",
      showTimeDimension:false,
      showTitle:false,
      dimensionType:0,
      size: "small",
      pagination: {
        size: "small",
        pageSize: 6
      },
      intervalDataByPage:[]
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
    changeTimeDimension: function(value) {
        this.dimensionType=value;
        this.$emit("changeTimeDimension",value);
    },
    showModal: function(record) {
      this.getInterValDataByPage(record.pageURL);
      this.modalTitle = `页面${record.pageURL}区间段耗时`;
      this.showIntervalTime = true;
      this.visible = true;
    },
    handleOk: function() {
      this.visible = false;
    },
    async getInterValDataByPage(pageURL){
      alert(this.dimensionType)
      let res = await this.axios.get(
        `/data/interValDataByPage?dimensionType=${this.dimensionType}&pageURL=${pageURL}`
      );
      let { success, result } = res.data;
      if (success) {
        this.intervalDataByPage = result;
      }
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