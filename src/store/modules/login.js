import * as types from '../types'
import * as api from '../../http/api'

const state = {
  userInfo: {},
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
  
}

export default {
  state,
  actions,
  getters,
  mutations
};