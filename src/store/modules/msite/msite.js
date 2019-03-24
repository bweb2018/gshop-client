//msite状态模块
import {RESULT_ADDRESS,RESULT_CATEGORYS,RESULT_SHOPS} from '../../mutations-types'
import {reqAddress,reqCategorys,reqShops} from '../../../Api'
const getters = {

}
const actions = {
  async getAddRess ({commit,state}) {
    const {longitude,latitude} = state
    const result = await reqAddress(longitude,latitude)
    const addRess = result.data
    if(result.code === 0){
      commit(RESULT_ADDRESS,{addRess})
    }
  },
  async getCategorys ({commit}) {
    const result = await reqCategorys()
    const categorys = result.data
    if(result.code === 0){
      commit(RESULT_CATEGORYS,{categorys})
    }
  },
  async getShops ({commit,state}) {
    const {longitude,latitude} = state
    const result = await reqShops(longitude,latitude)
    const shops = result.data
    if(result.code === 0){
      commit(RESULT_SHOPS,{shops})
    }
  }
}
const mutations = {
  [RESULT_ADDRESS] (state,{addRess}) {
    state.addRess = addRess
  },
  [RESULT_CATEGORYS] (state,{categorys}) {
    state.categorys = categorys
  },
  [RESULT_SHOPS] (state,{shops}) {
    state.shops = shops
  }
}
const state = {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  addRess: {},
  categorys: [],
  shops: [],
}
export default {
  state,
  mutations,
  actions,
  getters
}
