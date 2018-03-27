import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import * as getters from './getters.js'
import * as actions from './actions'

import mutations from './mutations'
import state from './state'
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  getters,
  mutations,
  actions,
  state,
  strict: debug
})