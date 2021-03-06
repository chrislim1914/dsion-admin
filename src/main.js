// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import common from './common'
import './filters'
import VueSession from 'vue-session'
import VueClipboard from 'vue-clipboard2'
import VueAWN from 'vue-awesome-notifications'
import VModal from 'vue-js-modal'
import VueProgressiveImage from 'vue-progressive-image'
import pagination from 'vuejs-uib-pagination'
import ToggleButton from 'vue-js-toggle-button'
import moment from 'moment'
import 'vue-loading-overlay/dist/vue-loading.min.css'
import 'vue-datetime/dist/vue-datetime.css'
import 'bootstrap'

require('vue-awesome-notifications/dist/styles/style.css')

Vue.use(VueSession)
Vue.use(VueClipboard)
Vue.use(VueAWN)
Vue.use(VModal)
Vue.use(VueProgressiveImage)
Vue.use(pagination)
Vue.use(ToggleButton)

Vue.config.productionTip = false

Vue.prototype.moment = moment
Vue.prototype.common = common

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
