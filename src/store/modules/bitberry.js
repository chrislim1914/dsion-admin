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
  ethInfo: null
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

      let resp = await axios.get(bitberryApi.getEthInfo + '/entries', {params: payload})

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
   * Get bitberry eth info
   * @param context
   * @param payload
   * @return {Promise}
   */
  getBitberryEthInfo: async (context, payload) => {
    try {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' +
        bitberryApiToken
      let resp = await axios.get(bitberryApi.getEthInfo, {params: payload})
      context.commit('setEthInfo', resp.data)
    } catch (error) {
      context.commit('setEthInfo', null)
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
   * Set eth info
   * @param state
   * @param payload
   * @return
   */
  setEthInfo: (state, payload) => {
    state.ethInfo = payload
  }
}

export default {state, actions, mutations}
