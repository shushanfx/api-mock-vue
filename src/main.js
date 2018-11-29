import Vue from 'vue'
import iview from 'iview'
import 'iview/dist/styles/iview.css'

import App from './App.vue'
import * as router from './router'
import store from './store'

Vue.use(iview)

Vue.config.productionTip = false;
store.dispatch('initRoute');

new Vue({
  router: router.default,
  store,
  render: h => h(App)
}).$mount('#app')
