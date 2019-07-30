import Vue from 'vue'
import router from './router'
import App from './App'

import './style/reset.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
