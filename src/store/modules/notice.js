/**
 * Notice store module
 */
import axios from 'axios'
import {
  noticeApi
} from '@/api'

/**
 * @const state
 * @type {object}
 */
const state = {
  notices: null
}

/**
 * @const actions
 * @type {object}
 */
const actions = {
  /**
  * Get notices
  * @param context
  * @param payload
  * @return {Promise}
  */
  getNotices: async (context, payload) => {
    try {
      var resp = await axios.get(noticeApi.getNotices, {params: {isPaginate: 1, page: payload.page}})
      context.commit('setNotices', resp.data)
    } catch (error) {
      context.commit('setEvents', null)
    }
  }
}

/**
 * @const mutations
 * @type {object}
 */
const mutations = {
  /**
     * Set notices state
     * @param state
     * @param data
     */
  setNotices: (state, data) => {
    state.notices = data
  }
}

export default {state, actions, mutations}
