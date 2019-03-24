//用户信息模块
import {SAVE_USER} from '../../mutations-types'
const state = {
  user: {}
}
const mutations = {
  [SAVE_USER] (state,user) {
    state.user = user
  }
}
const actions = {
  saveUser ({commit},user) {
    commit(SAVE_USER,user)
  }
}
const getters = {

}
export default {
  state,
  mutations,
  actions,
  getters
}
