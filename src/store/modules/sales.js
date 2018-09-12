/**
 * Sales store module
 */
import axios from 'axios'
import {
  sales
} from '@/api'

/**
 * @const state
 * @type {object}
 */
const state = {
  sale: {},
  responseData: {}
}

/**
 * @const actions
 * @type {object}
 */
const actions = {
  /**
      * Log in user
      * @param  context
      * @param  payload
      * @return {Promise}
      */
  fetchActiveSale: async (context) => {
    try {
      var resp = await axios.get(sales.retrieveSales)
      context.commit('setSales', resp.data)
      context.commit('updateResponseMessage', resp.data)
    } catch (error) {
      context.commit('updateResponseMessage', 'General Error')
    }
  }
}

/**
 * @const getters
 * @type {object}
 */
const getters = {
  activeSale: state => {
    return state.sale.filter(sale => sale.status === 1)
  }
}

/**
 * @const mutations
 * @type {object}
 */
const mutations = {
  /**
     * Set sale state
     * @param state
     * @param data
     */
  setSales: (state, data) => {
    state.sale = data
  },

  /**
     * Update response message state
     * @param state
     * @param status
     */
  updateResponseMessage: (state, status) => {
    state.responseData = status
  }
}

export default {state, actions, getters, mutations}
