import Vue from 'vue'
import Router from 'vue-router'
import dashBoard from '@/pages/dashBoard'
import general from '@/pages/subpages/general'
import page from '@/pages/subpages/Page'
import api from '@/pages/subpages/api'
import performance from '@/pages/subpages/performance'
import resource from '@/pages/subpages/resource'
import userAction from '@/pages/subpages/userAction'
import home from '@/pages/subpages/home'
import login from "@/pages/login"

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/login',
      component:login
    },
    {
      path: '/dashboard',
      redirect:'/home',
      component: dashBoard,
      children:[
        {
          path:'/home',
          component:home
        },
        {
          path:'/general',
          component:general
        },
        {
          path:'/page',
          component:page
        },
        {
          path:'/performance',
          component:performance
        },
        {
          path:'/api',
          component:api
        },
        {
          path:'/resource',
          component:resource
        },
        {
          path:'/userAction',
          component:userAction
        }
      ]
  }
  ]
})
