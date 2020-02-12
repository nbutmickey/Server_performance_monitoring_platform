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
        <!-- <span class="box-panel-change-show">
          <a-radio-group defaultValue="pine" size="small" @change="changeShow">
            <a-radio-button value="pine">饼图</a-radio-button>
            <a-radio-button value="table">表格</a-radio-button>
          </a-radio-group>
        </span>-->
      </div>
      <div class="container">
        <div :id="containerId"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  data() {
    return {
      chart: null,
      containerId:Math.random()
        .toString(36)
        .substr(2),
      userData: [
        {
          time: "2020-02-10T09:06:00.000Z",
          redirect: 120,
          dns: 343,
          tcp: 3345,
          ssl: 4456,
          ttfb:321,
          trans:1234,
          dom:3123,
          resource:1211
        }
      ]
    };
  },
  created() {},
  mounted() {
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