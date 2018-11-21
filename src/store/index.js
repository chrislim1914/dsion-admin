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
import members from './modules/members'
import events from './modules/events'
import kyc from './modules/kyc'
import notice from './modules/notice'
import airdrop from './modules/airdrop'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    users,
    ico,
    articles,
    sales,
    deposit,
    dashboard,
    members,
    events,
    kyc,
    notice,
    airdrop
  }
})
