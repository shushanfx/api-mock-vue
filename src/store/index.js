import Vue from 'vue'
import Vuex from 'vuex'

import RouterStore from './module/router';
import UserStore from './module/user';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    RouterStore,
    UserStore
  }
})
