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
  deposits: null,
  wallet: null,
  dsionWallet: null,
  responseData: null
}

/**
 * @const actions
 * @type {object}
 */
const actions = {
  /**
   * Get bitberry deposits
   * @param context
   * @param payload
   * @return {Promise}
   */
  getBitberryDeposits: async (context, payload) => {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' +
        bitberryApiToken
      let isGetMore = payload.isGetMore
      delete payload.isGetMore

      if (!isGetMore) {
        delete payload.cursor_id
      }

      let resp = await axios.get(bitberryApi.getDeposits, {params: payload})

      if (isGetMore) {
        context.commit('addDepositItems', resp.data)
      } else {
        context.commit('setDeposits', resp.data)
      }
    } catch (error) {
      context.commit('setDeposits', null)
    }
  },
  /**
   * Get bitberry wallet
   * @param context
   * @param payload
   * @return {Promise}
   */
  getBitberryWallet: async (context, payload) => {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' +
        bitberryApiToken
      let resp = await axios.get(bitberryApi.getWallet, {params: payload})
      context.commit('setWallet', resp.data)
    } catch (error) {
      context.commit('setWallet', null)
    }
  },

  /**
   * Get dsion wallet
   * @param context
   * @return {Promise}
   */
  getDsionWallet: async (context) => {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' +
        bitberryApiToken
      let resp = await axios.get(bitberryApi.getDsionWallet)
      context.commit('setDsionWallet', resp.data)
    } catch (error) {
      context.commit('setDsionWallet', null)
    }
  },

  /**
   * Send bitberry airdrop
   * @param context
   * @param payload
   * @return {Promise}
   */
  sendBitberryAirdrop: async (context, payload) => {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' +
        bitberryApiToken
      let resp = await axios.post(bitberryApi.sendAirdrop, payload)
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
   * Set deposits
   * @param state
   * @param payload
   */
  setDeposits: (state, payload) => {
    state.deposits = payload
  },

  /**
   * Add deposit items
   * @param state
   * @param payload
   * @return
   */
  addDepositItems: (state, payload) => {
    state.deposits.items = state.deposits.items.concat(payload.items)
  },

  /**
   * Set wallet
   * @param state
   * @param payload
   * @return
   */
  setWallet: (state, payload) => {
    state.wallet = payload
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
