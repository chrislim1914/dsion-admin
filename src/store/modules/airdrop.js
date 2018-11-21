/**
 * Airdrop store module
 */
import axios from 'axios'
import { airdropApi } from '@/api'

/**
 * @const state
 * @type {object}
 */
const state = {
  responseData: null
}

/**
 * @const actions
 * @type {object}
 */
const actions = {
  /**
   * Import airdrop
   * @param context
   * @param payload
   * @return {Promise}
   */
  importAirdrop: async (context, payload) => {
    try {
      var resp = await axios.post(airdropApi.importAirdrop, payload)
      context.commit('setResponseData', resp.data)
    } catch (error) {
      context.commit('setResponseData', 'General Error')
    }
  }
}

/**
 * @const mutations
 * @type {object}
 */
const mutations = {
  /**
     * Set response data
     * @param state
     * @param payload
     */
  setResponseData: (state, payload) => {
    state.responseData = payload
  }
}

export default {state, actions, mutations}
