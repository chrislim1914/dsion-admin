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
  memberIds: null,
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
      * @param payload
      * @return {Promise}
      */
  getMembers: async (context, payload) => {
    try {
      var resp = await axios.get(member.getMembers, {params: payload})

      if (resp.data.data) {
        context.commit('setMembers', resp.data.data)
        context.commit('setMemberIds', resp.data.ids)
      }
    } catch (error) {
      context.commit('setMembers', null)
      context.commit('setMemberIds', null)
    }
  },

  /**
    * Search members by deposit
    * @param  context
    * @param payload
    * @return {Promise}
    */
  searchMembersByDeposit: async (context, payload) => {
    try {
      var resp = await axios.get(member.searchMembersByDeposit, {params: payload})

      if (resp.data.data) {
        context.commit('setMembers', resp.data.data)
        context.commit('setMemberIds', resp.data.ids)
      }
    } catch (error) {
      context.commit('setMembers', null)
      context.commit('setMemberIds', null)
    }
  },

  /**
    * Search members by date
    * @param  context
    * @param payload
    * @return {Promise}
    */
  searchMembersByDate: async (context, payload) => {
    try {
      var resp = await axios.get(member.searchMembersByDate, {params: payload})

      if (resp.data.data) {
        context.commit('setMembers', resp.data.data)
        context.commit('setMemberIds', resp.data.ids)
      }
    } catch (error) {
      context.commit('setMembers', null)
      context.commit('setMemberIds', null)
    }
  },

  /**
   * Update kyc status
   * @param context
   * @param payload
   */
  updateKycStatus: async (context, payload) => {
    try {
      var resp = await axios.post(member.updateKycStatus, payload)
      if (resp) {
        context.commit('setResponseData', resp.data)
      }
    } catch (error) {
      context.commit('setResponseData', resp.data)
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
     * Set member ids state
     * @param state
     * @param data
     */
  setMemberIds: (state, data) => {
    state.memberIds = data
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
