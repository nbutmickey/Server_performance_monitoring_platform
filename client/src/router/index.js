import Vue from 'vue'
import Router from 'vue-router'
import dashBoard from '@/pages/dashBoard'
import general from '@/pages/subpages/general'
import page from '@/pages/subpages/Page'
import api from '@/pages/subpages/api'
import performance from '@/pages/subpages/performance'
import resource from '@/pages/subpages/resource'
import userAction from '@/pages/subpages/userAction'
import application from '@/pages/subpages/application'
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
      path:'/application',
      component:application
    },
    {
      path:'/setting',
      component:()=>import('@/pages/subpages/setting')
    },
    {
      path: '/dashboard',
      redirect:'/general',
      component: dashBoard,
      children:[  
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

