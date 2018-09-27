/**
 * Members store module
 */
import axios from 'axios'
import {
  member
} from '@/api'

/**
 * @const state
 * @type {object}
 */
const state = {
  members: null,
  responseData: null
}

/**
 * @const actions
 * @type {object}
 */
const actions = {
  /**
      * Get members
      * @param  context
      * @return {Promise}
      */
  getMembers: async (context) => {
    try {
      var resp = await axios.get(member.getMembers)

      if (resp.data.result) {
        context.commit('setMembers', resp.data.data)
      }
    } catch (error) {
      context.commit('setMembers', null)
    }
  },

  /**
    * Search members by deposit
    * @param  context
    * @return {Promise}
    */
  searchMembersByDeposit: async (context, payload) => {
    try {
      var resp = await axios.post(member.searchMembersByDeposit, payload)

      if (resp.data.data) {
        context.commit('setMembers', resp.data.data)
      }
    } catch (error) {
      context.commit('setMembers', null)
    }
  },

  /**
   * Export members
   * @param context
   * @param payload
   */
  exportMembers: async (context, payload) => {
    try {
      var resp = await axios.post(member.exportMembers, payload)
      if (resp) {
        context.commit('setResponseData', {data: resp.data, is_success: true})
      }
    } catch (error) {
      context.commit('setResponseData', {is_success: false})
    }
  }
}

/**
 * @const mutations
 * @type {object}
 */
const mutations = {
  /**
     * Set members state
     * @param state
     * @param data
     */
  setMembers: (state, data) => {
    state.members = data
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
