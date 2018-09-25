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
  members: null
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
  }
}

export default {state, actions, mutations}
