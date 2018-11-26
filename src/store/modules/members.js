/**
 * Members store module
 */
import axios from 'axios'
import {
  memberApi
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
      var resp = await axios.get(memberApi.getMembers, {params: payload})

      if (resp.data.data) {
        context.commit('setMembers', resp.data.data)
        context.commit('setMemberIds', resp.data.ids)
      } else {
        context.commit('setMembers', null)
        context.commit('setMemberIds', null)
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
      var resp = await axios.get(memberApi.searchMembersByDeposit, {params: payload})

      if (resp.data.data) {
        context.commit('setMembers', resp.data.data)
        context.commit('setMemberIds', resp.data.ids)
      } else {
        context.commit('setMembers', null)
        context.commit('setMemberIds', null)
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
      var resp = await axios.get(memberApi.searchMembersByDate, {params: payload})

      if (resp.data.data) {
        context.commit('setMembers', resp.data.data)
        context.commit('setMemberIds', resp.data.ids)
      } else {
        context.commit('setMembers', null)
        context.commit('setMemberIds', null)
      }
    } catch (error) {
      context.commit('setMembers', null)
      context.commit('setMemberIds', null)
    }
  },

  /**
    * Export members
    * @param  context
    * @param payload
    * @return {Promise}
    */
  exportMembers: async (context, payload) => {
    try {
      var resp = await axios.post(
        memberApi.exportMembers,
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
    * Export members info
    * @param  context
    * @param payload
    * @return {Promise}
    */
  exportMembersInfo: async (context, payload) => {
    try {
      var resp = await axios.post(
        memberApi.exportMembersInfo,
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
