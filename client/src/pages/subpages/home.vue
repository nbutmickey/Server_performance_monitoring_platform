<template>
  <div class="application-container">
     <a-card :title="item.appName" v-for="(item,index) in arr" :key="index" :bordered="false" style="width: 300px;margin:20px 20px 0 0">
      <p>{{item.appID}}</p>
      <p>{{item.createTime}}</p>
      <p>{{item.url}}</p>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr:[
        {appName:'米奇博客',appID:'fsdfsdfsd2342423423',createTime:'2019.4.23 12:09:23',url:'http://www.mickey.com'},
        {appName:'米奇博客',appID:'fsdfsdfsd2342423423',createTime:'2019.4.23 12:09:23',url:'http://www.mickey.com'},
        {appName:'米奇博客',appID:'fsdfsdfsd2342423423',createTime:'2019.4.23 12:09:23',url:'http://www.mickey.com'},
        {appName:'米奇博客',appID:'fsdfsdfsd2342423423',createTime:'2019.4.23 12:09:23',url:'http://www.mickey.com'},
        {appName:'米奇博客',appID:'fsdfsdfsd2342423423',createTime:'2019.4.23 12:09:23',url:'http://www.mickey.com'},
        {appName:'米奇博客',appID:'fsdfsdfsd2342423423',createTime:'2019.4.23 12:09:23',url:'http://www.mickey.com'},
      ]
    };
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .application-container{
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
