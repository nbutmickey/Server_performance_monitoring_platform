<template>
  <header class="header">
    <router-link to="/" class="title">服务器性能监控平台 V1.0</router-link>
    <div class="nav">
      <router-link to="/general">今日概况</router-link>
      <router-link to="/page">页面</router-link>
      <router-link to="/performance">性能</router-link>
      <router-link to="/api">API</router-link>
      <router-link to="/resource">资源</router-link>
      <router-link to="/userAction">行为</router-link>
    </div>
    <div class="user">
      <a-dropdown>
        <a-button>Mickey</a-button>
        <a-menu slot="overlay">
          <a-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">个人信息</a>
          </a-menu-item>
          <a-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">我的配置</a>
          </a-menu-item>
          <a-menu-item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">退出登录</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </header>
</template>

<script>
// import "../common/style/main.less"
export default {
  data() {
    return {
      msg: "PageAnalysis",
      placement:''
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header {
  width:100%;
  position: fixed;
  top:0;
  z-index:99;
  line-height: 46px;
  border-bottom: 1px solid #e8e8e8;
  background-color: #1da57a;
  .title {
    display: inline-block;
    color: #e8e8e8;
    font-size: 18px;
    padding: 0 20px;
  }
  .nav {
    display: inline-block;
    margin-left: 20%;
    a {
      color: #e8e8e8;
      font-size: 15px;
      padding: 0 10px;
      margin: 0 10px;
      border: 1px solid #e8e8e8;
      border-radius: 15px;
      text-decoration: none;
    }
  }
  .user{
      display: inline-block;
      position: absolute;
      right: 16px;
  }
}
</style>