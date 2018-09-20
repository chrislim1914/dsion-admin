/**
 * Sales store module
 */
import axios from 'axios'
import {
  deposit
} from '@/api'

/**
 * @const state
 * @type {object}
 */
const state = {
  deposit: {},
  responseData: null
}

/**
 * @const actions
 * @type {object}
 */
const actions = {
  /**
      * Create deposit
      * @param  context
      * @param  payload
      * @return {Promise}
      */
  createDeposit: async (context, payload) => {
    try {
      var resp = await axios.post(deposit.createDeposit, payload)
      context.commit('setResponseData', resp.data)
    } catch (error) {
      context.commit('setResponseData', null)
    }
  }
}

/**
 * @const mutations
 * @type {object}
 */
const mutations = {
  /**
     * Set deposit state
     * @param state
     * @param data
     */
  setDeposit: (state, data) => {
    state.sale = data
  },

  /**
     * Set response data state
     * @param state
     * @param status
     */
  setResponseData: (state, status) => {
    state.responseData = status
  }
}

export default {state, actions, mutations}