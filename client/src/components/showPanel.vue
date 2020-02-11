<template>
  <div class="text-board content-box">
    <div class="text-board-item solid" v-for="(item,index) in todayData" :key="index">
      <div class="text-style text-center">
        <h5 class="text-title">{{item.title}}</h5>
        <div class="text-value">
          <span class="label">{{item.today.toLocaleString()}}</span>
          <span class="suffix" v-if="item.unit">ms</span>
          <div class="text-sub-value" v-if="isCompare">
            <span class="text-help">
              昨日
              <span style="color:#666;font-weight:700">{{item.yesterday.toLocaleString()}}</span>
            </span>
            <span class="text-help">
              相比
              <span>
                <a-icon type="caret-up" theme="filled" style="color:#52c41a" v-if="item.rate>0" />
                <a-icon type="caret-down" theme="filled" style="color:#f5222d" v-if="item.rate<0" />
                <span>
                    {{item.rate==0?'持平':Number(item.rate*100.0)+'%'}}</span>
               </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
      todayData:Array,
      isCompare:Boolean
  },
  data() {
    return {
      msg: "api"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.text-board {
  display: flex;
  direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  &-item {
    width: 25%;
    float: left;
    flex: 0 0 auto;
    .text-style {
      padding: 0 8px;
      font-size: 24px;
      .text-title {
        font-size: 12px;
        color: #9ea7b4;
      }
      .text-value {
        .label {
          font-size: 24px;
          font-weight: 700;
          color: #666;
        }
        .suffix {
          position: absolute;
          margin-top: 16px;
          margin-left: 3px;
          font-size: 12px;
          color: #999;
        }
        .text-sub-value {
          font-size: 12px;
          .text-help {
            color: #9ea7b4;
          }
        }
      }
    }
    .text-center {
      text-align: center;
    }
  }
  .solid:not(:first-child) {
    border-left: 1px solid #e3e8ef;
  }
}
.content-box {
  background: #fff;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 0 4px rgba(82, 94, 102, 0.15);
}
</style>