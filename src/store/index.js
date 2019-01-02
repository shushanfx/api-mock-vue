import Vue from 'vue'
import Vuex from 'vuex'

import RouterStore from './module/router';
import UserStore from './module/user';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuStatus: 'open'
  },
  mutations: {
    setMenuStatus(state, status) {
      state.menuStatus = status;
    }
  },
  actions: {

  },
  getters: {
    getMenuStatus(state) {
      return state.menuStatus;
    }
  },
  modules: {
    RouterStore,
    UserStore
  }
})
