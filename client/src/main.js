// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AntD from 'ant-design-vue'
import "ant-design-vue/dist/antd.less" //引入antd的样式文件
import G2 from "@antv/g2" 
import DataSet  from '@antv/data-set'
// import axios from 'axios' //引入axios
import '@/mock/mock.js' //引入mock
// Vue.prototype.axios=axios; //在vue中绑定属性axios

Vue.config.productionTip = false;
Vue.use(AntD); //引入antd
Vue.use(DataSet); //引入DataSet
Vue.use(G2); //引入G2

import {fetchGet,fetchPost} from "./axiosConfig"
Vue.prototype.$get=fetchGet;
Vue.prototype.$post=fetchPost;

router.beforeEach((to,from,next)=>{
  if(to.path==='/'||to.path==='/login'){
    next();
  }else{
    //console.log();
    if(localStorage.getItem("token")){
      next();
    }else {
      alert('您暂时处于未登录状态，将为您跳转到登录页面');
      next({path:'/login'});
    }
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
