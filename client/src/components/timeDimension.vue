<template>
  <div class="title">
        <span class="box-panel-title-small" v-if="title">{{title}}</span>
        <span class="box-panel-time-dimension">
          <span>{{timeDimension}}</span>
          <a-popover placement="left" class="radio-gap">
            <template slot="content">
              <a-radio-group defaultValue="0" size="small" @change="timeDimensionChange">
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
        <slot></slot>
      </div>
</template>

<script>
export default {
  props:{
      title:String
  },
  data() {
    return {
        timeDimension:'30分钟'
    };
  },
  created() {},
  methods: {
      timeDimensionChange:function(e){
          switch (parseInt(e.target.value)) {
              case 0:
                  this.timeDimension="30分钟";
                  break;
              case 1:
                  this.timeDimension="60分钟";
                  break;
              case 2:
                  this.timeDimension="12小时";
                  break;
              case 3:
                  this.timeDimension="24小时";
                  break;    
              case 4:
                  this.timeDimension="最近3天";
                  break;
              case 5:
                  this.timeDimension="最近7天";
                  break;        
              default:
                  break;
          }
           console.log("timeDimension Componets"+e.target.value);
           this.$emit("changeTimeDimension",e.target.value);
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.title {
    //position: relative;
    height: 30px;
    color: #314659;
    .box-panel-title-small {
      font-weight: 700;
      font-size: 14px;
    }
    .box-panel-time-dimension {
      float: right;
      font-size: 14px;
    }
  }
</style>