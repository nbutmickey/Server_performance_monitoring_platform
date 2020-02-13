<template>
  <div style="width:50%;padding-left:8px;padding-right:8px">
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
        <a-table :columns="columns" :dataSource="data" size="small" :pagination="pagination"></a-table>
      </div>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title:"#",
    dataIndex:"key",
    key:"key"
    
  },  
  {
    title: "页面URL",
    dataIndex: "pageURL",
    key: "pageURL",
    //align: "center"
  },
  {
    title: "pv",
    dataIndex: "pv",
    key: "pv",
    align: "center"
  },
  {
    title: "uv",
    dataIndex: "uv",
    key: "uv",
    align: "center"
  }
];

export default {
  props: {
    title: String,
    data:Array
  },
  data() {
    return {
      columns,
      pagination:false
  }
  },
  methods: {
      changeTimeDimension: function(e) {
        this.$emit("changeTimeDimension",e.target.value);
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