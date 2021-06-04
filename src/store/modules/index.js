import * as types from '../types'
import * as api from '../../http/api'

const state = {
  isCollapse: false,
};

const mutations = {
  [types.INDEX_COLLAPSE](state, status) {
    state.isCollapse = !status
  }
};

const getters = {
};

const actions = {
}

export default {
  state,
  actions,
  getters,
  mutations
};