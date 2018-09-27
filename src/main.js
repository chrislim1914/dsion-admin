// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import VueSession from 'vue-session'
import VueClipboard from 'vue-clipboard2'
import VueAWN from 'vue-awesome-notifications'
import VModal from 'vue-js-modal'
import moment from 'moment'
import 'vue-loading-overlay/dist/vue-loading.min.css'
import 'vue-datetime/dist/vue-datetime.css'
import 'bootstrap'

require('vue-awesome-notifications/dist/styles/style.css')

Vue.use(VueSession)
Vue.use(VueClipboard)
Vue.use(VueAWN)
Vue.use(VModal, { dialog: true })

Vue.config.productionTip = false
Vue.prototype.moment = moment

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
