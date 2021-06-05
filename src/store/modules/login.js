import * as types from '../types'
import * as api from '../../http/api'

const state = {
  userInfo: {
    a: '1'
  },
};

const mutations = {
  [types.LOG_GETUSERINFO](state, status) {
    state.userInfo = Object.assign({}, status);
  },
};

const getters = {
  userInfo: state => state.userInfo,
};

const actions = {
  getUserInfo(){
    
  }
}

export default {
  state,
  actions,
  getters,
  mutations
};