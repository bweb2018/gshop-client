//商家模块
import {RESULT_GOODS,RESULT_INFO,RESULT_RATINGS,RESULT_ADDITION,RESULT_SUBTRACTION,DEL_CART_FOOT} from '../../mutations-types'
import {reqGoods,reqInfo,reqRatings} from '../../../Api'
import Vue from 'vue'
const state = {
  goods: [],
  info: {},
  ratings: [],
  shopCartFoot: []
}
const mutations = {
  [RESULT_GOODS] (state,goods) {
    state.goods = goods
  },
  [RESULT_INFO] (state,info) {
    state.info = info
  },
  [RESULT_RATINGS] (state,ratings) {
    state.ratings = ratings
  },
  [RESULT_ADDITION] (state,food) {
    if(!food.count){
      Vue.set(food,'count',1)
      state.shopCartFoot.push(food)
    }else {
      food.count ++
    }

  },
  [RESULT_SUBTRACTION] (state,food) {
    if(food.count > 0){
      food.count--
    }
    if(food.count === 0){
      state.shopCartFoot.splice(state.shopCartFoot.indexOf(food),1)

    }

  },
  [DEL_CART_FOOT] (state) {
    // if(state.shopCartFoot){
    //   state.shopCartFoot.forEach(food => {food.count = 0
    //     if(food.count === 0){
    //       state.shopCartFoot = []

      state.shopCartFoot.forEach(foot => foot.count = 0)
      state.shopCartFoot.splice(0,state.shopCartFoot.length)



      // })
    // }

  }
}
const actions = {
  async getGoods ({commit},fn) {
    const result = await reqGoods()
    if(result.code === 0){
      const goods = result.data
      commit(RESULT_GOODS,goods)
      typeof fn === 'function' && fn()
    }


  },
  async getInfo ({commit}) {
    const result = await reqInfo()
    const info = result.data
    commit(RESULT_INFO,info)
  },
  async getRatings ({commit},fn) {
    const result = await reqRatings()
    const ratings = result.data
    commit(RESULT_RATINGS,ratings)
    typeof fn === 'function' && fn()
  },
  update_food_count ({commit,state},{food,isAdd}) {
    console.log(isAdd);
    if(isAdd){

      commit(RESULT_ADDITION,food)
    } else {
      commit(RESULT_SUBTRACTION,food)
    }


  },
  delCartFoot ({commit,state}) {
    commit(DEL_CART_FOOT)
  }

}
const getters = {
  totalCount (state) {
    return state.shopCartFoot.reduce((pre,foot) => pre + foot.count,0)
  },
  totalPrice (state) {
    return state.shopCartFoot.reduce((pre,foot) => pre + (foot.count * foot.price),0)
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
