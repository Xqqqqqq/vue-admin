import * as types from '../types'
import * as api from '../../http/api'

const state = { // state 可以修改
  isCollapse: false,
  userDetail:{
    nickname: '李妍',
    firstname:'李1',
    lastname:'妍1',
    age: '25'
  },
  momentMoney: 1000,
  count: 0
};

const mutations = {
  [types.INDEX_COLLAPSE](state, status) {
    state.isCollapse = !status
  },
  [types.INDEX_MONEYTOTAL](state, status) {
    state.momentMoney += status
  },
  [types.INDEX_ADD](state) {
    state.count +=10
  }
};

const getters = { // 计算属性，有缓存 ，getter 不能修改
  realname(state){
    return state.userDetail.firstname + state.userDetail.lastname
  },
  getMomentMoney(state){
    return (state.momentMoney / 5).toFixed(2)
  }
};

const actions = { // 可以放异步操作，如 setTimeout，请求等
  addCount({ commit }) {
    commit('INDEX_ADD')
  },
  addMomentMoney(context, args) {
    context.commit('INDEX_MONEYTOTAL', args)
  }
}

export default {
  state,
  actions,
  getters,
  mutations
};