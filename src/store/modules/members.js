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
 * @const getters
 * @type {object}
 */
const getters = {
  /**
    * Filter members
    * @param state
    * @param kycStatus
    */
  filterMembers: (state) => (kycStatus) => {
    if (!kycStatus) {
      return state.members
    }

    return state.members.filter(member => member.status === kycStatus)
  }
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
    * Search members by date
    * @param  context
    * @return {Promise}
    */
  searchMembersByDate: async (context, payload) => {
    try {
      var resp = await axios.post(member.searchMembersByDate, payload)

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
  },

  /**
   * Export kyc info
   * @param context
   * @param payload
   */
  exportKycInfo: async (context, payload) => {
    try {
      var resp = await axios.post(member.exportKycInfo, payload)
      if (resp) {
        context.commit('setResponseData', {data: resp.data, is_success: true})
      }
    } catch (error) {
      context.commit('setResponseData', {is_success: false})
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
     * Set response data state
     * @param state
     * @param data
     */
  setResponseData: (state, data) => {
    state.responseData = data
  }
}

export default {state, getters, actions, mutations}
