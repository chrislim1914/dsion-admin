import Vue from 'vue'
import Vuex from 'vuex'

/**
 * modules import
 */
import users from './modules/users'
import ico from './modules/ico'
import articles from './modules/article'
import sales from './modules/sales'
import deposit from './modules/deposit'
import dashboard from './modules/dashboard'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    users,
    ico,
    articles,
    sales,
    deposit,
    dashboard
  }
})
