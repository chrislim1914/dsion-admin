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
  * @return {Promise}
  */
  getDeposits: async (context) => {
    try {
      var resp = await axios.get(deposit.getDeposits)

      if (resp.data.result) {
        context.commit('setDeposits', resp.data.data)
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
      var resp = await axios.post(deposit.searchDeposits, payload)

      if (resp.data.result) {
        context.commit('setDeposits', resp.data.data)
      } else {
        context.commit('setDeposits', null)
      }
    } catch (error) {
      context.commit('setDeposits', null)
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
     * @param status
     */
  setResponseData: (state, status) => {
    state.responseData = status
  }
}

export default {state, actions, mutations}
