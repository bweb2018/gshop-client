
import Vue from 'vue'
import {Button} from 'mint-ui';

// 按需引入部分组件
// import { Cell, Checklist } from 'minu-ui'
import App from './App'
import router from './router'
import Header from './components/Header/Header.vue'
import store from './store'
import Star from './components/Star/Star.vue'
import './mork/morkServer'
import CartControl from './components/CartControl/CartControl.vue'


  Vue.config.productionTip = false
  Vue.component('Header',Header )
  Vue.component('Star',Star )
  Vue.component(Button.name, Button)
  Vue.component('CartControl',CartControl)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
