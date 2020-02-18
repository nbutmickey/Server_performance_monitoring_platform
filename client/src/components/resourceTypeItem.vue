<template>
  <div class="box">
      <div class="title">{{data.title}}</div>
      <div class="content">
          <div class="content-item" v-for="(item,index) in data.content" :key="index">
              <span class="type-icon"></span>
              <span class="type-name">{{item.type}}</span>
              <span class="type-value">{{item.value}}</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props:{
    data:Object
  },
  data() {
    return {
     
    }
  },
  created() {},
  async mounted() {
   
}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.box{
  width: 33.3%;
  padding: 0 25px 10px 0;
  .title{
        padding-bottom: 5px;
        font-weight: 700;
        font-size: 14px;
        border-bottom: 1px solid #e3e8ef
  }
}
</style>