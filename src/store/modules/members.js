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
   * Export members
   */
  exportMembers: async (context) => {
    try {
      var formData = new FormData()
      formData.append('modeStatus', 0)
      var resp = await axios.post(member.exportMembers, formData, {headers: { 'Content-Type': 'multipart/form-data' }, responseType: 'blob'})
      if (resp) {
        const url = window.URL.createObjectURL(new Blob([resp.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'members-' + new Date().toISOString().slice(0, 10) + '.xls')
        document.body.appendChild(link)
        link.click()
        context.commit('setResponseData', {is_success: true})
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
