/**
 * Kyc store module
 */
import axios from 'axios'
import {
  kycApi
} from '@/api'

/**
 * @const state
 * @type {object}
 */
const state = {
  kycStatusCount: []
}

/**
 * @const actions
 * @type {object}
 */
const actions = {
  /**
      * Get kyc status
      * @param  context
      * @return {Promise}
      */
  getKycStatusCount: async (context) => {
    try {
      var resp = await axios.get(kycApi.kycStatusCount)

      if (resp.data) {
        context.commit('setKycStatusCount', resp.data)
      } else {
        context.commit('setKycStatusCount', null)
      }
    } catch (error) {
      context.commit('setKycStatusCount', null)
    }
  }
}

/**
 * @const mutations
 * @type {object}
 */
const mutations = {
  /**
     * Set kcy status count state
     * @param state
     * @param data
     */
  setKycStatusCount: (state, data) => {
    state.kycStatusCount = data
  }
}

export default {state, actions, mutations}
