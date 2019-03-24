//vuex中最核心管理组件共享状态数据的对象的模块
import Vue from 'vue'
import Vuex from 'vuex'

import msite from './modules/msite/msite'
import user from './modules/user/user'
import shop from './modules/shop/shop'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    msite,
    user,
    shop
  }
})

