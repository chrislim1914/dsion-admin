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
  kyc: null,
  kycIds: null,
  kycStatusCount: [],
  responseData: null
}

/**
 * @const actions
 * @type {object}
 */
const actions = {
  /**
   * Get kyc
   * @param  context
   * @param payload
   * @return {Promise}
   */
  getKyc: async (context, payload) => {
    try {
      var resp = await axios.get(kycApi.getKyc, {params: payload})

      if (resp.data.data) {
        context.commit('setKyc', resp.data.data)
        context.commit('setKycIds', resp.data.ids)
      } else {
        context.commit('setKyc', null)
        context.commit('setKycIds', null)
      }
    } catch (error) {
      context.commit('setKyc', null)
      context.commit('setKycIds', null)
    }
  },

  /**
    * Search kyc by deposit
    * @param  context
    * @param payload
    * @return {Promise}
    */
  searchKycByDeposit: async (context, payload) => {
    try {
      var resp = await axios.get(kycApi.searchKycByDeposit, {params: payload})

      if (resp.data.data) {
        context.commit('setKyc', resp.data.data)
        context.commit('setKycIds', resp.data.ids)
      } else {
        context.commit('setKyc', null)
        context.commit('setKycIds', null)
      }
    } catch (error) {
      context.commit('setKyc', null)
      context.commit('setKycIds', null)
    }
  },

  /**
    * Search kyc by date
    * @param  context
    * @param payload
    * @return {Promise}
    */
  searchKycByDate: async (context, payload) => {
    try {
      var resp = await axios.get(kycApi.searchKycByDate, {params: payload})

      if (resp.data.data) {
        context.commit('setKyc', resp.data.data)
        context.commit('setKycIds', resp.data.ids)
      } else {
        context.commit('setKyc', null)
        context.commit('setKycIds', null)
      }
    } catch (error) {
      context.commit('setKyc', null)
      context.commit('setKycIds', null)
    }
  },

  /**
   * Search kyc by info
   * @param context
   * @param payload
   * @return {Promise}
   */
  searchKycByInfo: async (context, payload) => {
    try {
      var resp = await axios.get(kycApi.searchKycByInfo, {params: payload})

      if (resp.data.data) {
        context.commit('setKyc', resp.data.data)
        context.commit('setKycIds', resp.data.ids)
      } else {
        context.commit('setKyc', null)
        context.commit('setKycIds', null)
      }
    } catch (error) {
      context.commit('setKyc', null)
      context.commit('setKycIds', null)
    }
  },

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
  },

  /**
   * Update kyc status
   * @param context
   * @param payload
   */
  updateKycStatus: async (context, payload) => {
    try {
      var resp = await axios.post(kycApi.updateKycStatus, payload)
      if (resp) {
        context.commit('setResponseData', resp.data)
      }
    } catch (error) {
      context.commit('setResponseData', resp.data)
    }
  },

  /**
   * Delete kyc
   * @param context
   * @param payload
   */
  deleteKyc: async (context, payload) => {
    try {
      var resp = await axios.post(kycApi.deleteKyc, payload)
      if (resp) {
        context.commit('setResponseData', resp.data)
      }
    } catch (error) {
      context.commit('setResponseData', resp.data)
    }
  },

  /**
    * Export kyc
    * @param  context
    * @param payload
    * @return {Promise}
    */
  exportKyc: async (context, payload) => {
    try {
      var resp = await axios.post(
        kycApi.exportKyc,
        payload,
        {responseType: 'blob'}
      )

      if (resp.data) {
        context.commit('setResponseData', resp.data)
      }
    } catch (error) {
      context.commit('setResponseData', null)
    }
  },

  /**
    * Export kyc info
    * @param  context
    * @param payload
    * @return {Promise}
    */
  exportKycInfo: async (context, payload) => {
    try {
      var resp = await axios.post(
        kycApi.exportKycInfo,
        payload,
        {responseType: 'blob'}
      )

      if (resp.data) {
        context.commit('setResponseData', resp.data)
      }
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
   * Set kyc state
   * @param state
   * @param data
   */
  setKyc: (state, data) => {
    state.kyc = data
  },

  /**
   * Set kyc ids state
   * @param state
   * @param data
   */
  setKycIds: (state, data) => {
    state.kycIds = data
  },

  /**
   * Set kcy status count state
   * @param state
   * @param data
   */
  setKycStatusCount: (state, data) => {
    state.kycStatusCount = data
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
