import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'
import iView from 'iview'
import moment from 'moment'
import './assets/css/layout.less'
import './assets/css/theme.less'
import 'iview/dist/styles/iview.css';


Vue.config.productionTip = false
window.moment = moment
Vue.use(iView)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
