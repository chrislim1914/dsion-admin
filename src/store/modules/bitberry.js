/**
 * Bitberry store module
 */
import axios from 'axios'
import { bitberryApi } from '@/api'
import { bitberryApiToken } from '@/config'

/**
 * @const state
 * @type {object}
 */
const state = {
  ethEntries: null,
  ethWallet: null,
  dsionWallet: null,
  responseData: null
}

/**
 * @const actions
 * @type {object}
 */
const actions = {
  /**
   * Get eth entries
   * @param context
   * @param payload
   * @return {Promise}
   */
  getEthEntries: async (context, payload) => {
    try {
      let isGetMore = payload.isGetMore
      delete payload.isGetMore

      if (!isGetMore) {
        delete payload.cursor_id
      }

      let resp = await axios.get(
        bitberryApi.getEthEntries,
        {
          params: payload,
          headers: {'Authorization': 'Bearer ' + bitberryApiToken}
        }
      )

      if (isGetMore) {
        context.commit('addEthEntriesItem', resp.data)
      } else {
        context.commit('setEthEntries', resp.data)
      }
    } catch (error) {
      context.commit('setEthEntries', null)
    }
  },
  /**
   * Get eth wallet
   * @param context
   * @return {Promise}
   */
  getEthWallet: async (context) => {
    try {
      let resp = await axios.get(
        bitberryApi.getEthWallet,
        {
          headers: {'Authorization': 'Bearer ' + bitberryApiToken}
        }
      )
      context.commit('setEthWallet', resp.data)
    } catch (error) {
      context.commit('setEthWallet', null)
    }
  },

  /**
   * Get dsion wallet
   * @param context
   * @return {Promise}
   */
  getDsionWallet: async (context) => {
    try {
      let resp = await axios.get(
        bitberryApi.getDsionWallet,
        {
          headers: {'Authorization': 'Bearer ' + bitberryApiToken}
        }
      )
      context.commit('setDsionWallet', resp.data)
    } catch (error) {
      context.commit('setDsionWallet', null)
    }
  },

  /**
   * Send eth airdrop
   * @param context
   * @param payload
   * @return {Promise}
   */
  sendEthAirdrop: async (context, payload) => {
    try {
      let resp = await axios.post(
        bitberryApi.sendEthAirdrop,
        payload,
        {
          headers: {'Authorization': 'Bearer ' + bitberryApiToken}
        }
      )
      context.commit('setResponseData', resp.data)
    } catch (e) {
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
   * Set eth entries
   * @param state
   * @param payload
   */
  setEthEntries: (state, payload) => {
    state.ethEntries = payload
  },

  /**
   * Add eth entries item
   * @param state
   * @param payload
   * @return
   */
  addEthEntriesItem: (state, payload) => {
    state.ethEntries.items = state.ethEntries.items.concat(payload.items)
  },

  /**
   * Set eth wallet
   * @param state
   * @param payload
   * @return
   */
  setEthWallet: (state, payload) => {
    state.ethWallet = payload
  },

  /**
   * Set dsion wallet
   * @param state
   * @param payload
   * @return
   */
  setDsionWallet: (state, payload) => {
    state.dsionWallet = payload
  },

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
