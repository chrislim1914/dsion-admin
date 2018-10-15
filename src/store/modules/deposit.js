/**
* Deposit store module
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
  deposits: null,
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
  },

  /**
  * Get deposits
  * @param  context
  * @param payload
  * @return {Promise}
  */
  getDeposits: async (context, payload) => {
    try {
      var resp = await axios.get(deposit.getDeposits, {params: payload})

      if (resp.data.result) {
        context.commit('setDeposits', resp.data.data)
      } else {
        context.commit('setDeposits', null)
      }
    } catch (error) {
      context.commit('setDeposits', null)
    }
  },

  /**
  * Search deposits
  * @param  context
  * @param payload
  * @return {Promise}
  */
  searchDeposits: async (context, payload) => {
    try {
      var resp = await axios.get(deposit.searchDeposits, {params: payload})

      if (resp.data.result) {
        context.commit('setDeposits', resp.data.data)
      } else {
        context.commit('setDeposits', null)
      }
    } catch (error) {
      context.commit('setDeposits', null)
    }
  },

  /**
  * Delete deposits
  * @param  context
  * @param  payload
  * @return {Promise}
  */
  deleteDeposits: async (context, payload) => {
    try {
      var resp = await axios.post(deposit.deleteDeposits, payload)
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
     * Set deposits state
     * @param state
     * @param data
     */
  setDeposits: (state, data) => {
    state.deposits = data
  },

  /**
     * Set response data state
     * @param state
     * @param data
     */
  setResponseData: (state, data) => {
    state.responseData = data
  }
}

export default {state, actions, mutations}
