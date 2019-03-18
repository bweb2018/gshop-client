
//创建路由器并注册路由的模块
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter) //声明

import MSite from '../pages/MSite/MSite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'
//创建路由器并配置路由
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/msite',
      component: MSite,
      meta: {isShow: true}
    },
    {
      path: '/search',
      component: Search,
      meta: {isShow: true}
    },
    {
      path: '/order',
      component: Order,
      meta: {isShow: true}
    },
    {
      path: '/profile',
      component: Profile,
      meta: {isShow: true}
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: MSite
    }

  ]
})

