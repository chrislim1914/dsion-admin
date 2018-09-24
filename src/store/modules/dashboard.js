/**
 * Dashboard store module
 */
import axios from 'axios'
import {
  dashboard
} from '@/api'

/**
 * @const state
 * @type {object}
 */
const state = {
  dashboard: null
}

/**
 * @const actions
 * @type {object}
 */
const actions = {
  /**
      * Get dashboard
      * @param  context
      * @return {Promise}
      */
  getDashboard: async (context) => {
    try {
      var resp = await axios.get(dashboard.getDashboard)
      context.commit('setDashboard', resp.data)
    } catch (error) {
      context.commit('setDashboard', null)
    }
  }
}

/**
 * @const mutations
 * @type {object}
 */
const mutations = {
  /**
     * Set dashboard state
     * @param state
     * @param data
     */
  setDashboard: (state, data) => {
    state.dashboard = data
  }
}

export default {state, actions, mutations}
