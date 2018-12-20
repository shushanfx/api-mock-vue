import Vue from 'vue';

export default {
  state: {
    isShowLogin: false,
    user: {

    },
    username: 'Guest'
  },
  getters: {
    isShowLogin(state) {
      return state.isShowLogin;
    },
    getUser(state) {
      return state.user;
    },
    getUsername(state) {
      return state.username;
    }
  },
  mutations: {
    showLogin(state) {
      state.isShowLogin = true;
    },
    hideLogin(state) {
      state.isShowLogin = false;
    },
    setUser(state, user) {
      state.user = user;
      state.username = user.username || 'Guest';
    }
  },
  actions: {
    getUser({
      commit
    }) {
      Vue.http.get('/mock/cas/info.php')
        .then(res => {
          if (res && res.ok && res.body && res.body.code === -512) {
            commit('showLogin');
          } else if (res && res.ok && res.body &&
            res.body.data && res.body.data.entity &&
            res.body.code === 1) {
            commit('setUser', res.body.data.entity);
          }
        }, () => {
          commit('setUser', {});
        })
    }
  }
}
