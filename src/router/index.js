
//创建路由器并注册路由的模块
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter) //声明

import MSite from '../pages/MSite/MSite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
//创建路由器并配置路由
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/msite',
      component: MSite
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/',
      component: MSite
    }
  ]
})

