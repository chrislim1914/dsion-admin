/**
 * Users store module
 */
import axios from 'axios'
import {
  user
} from '@/api'

/**
 * @const state
 * @type {object}
 */
const state = {
  user: {},
  responseData: {}
}

/**
 * @const actions
 * @type {object}
 */
const actions = {
  /**
      * Log in user
      * @param  context
      * @param  payload
      * @return {Promise}
      */
  loginUser: async (context, payload) => {
    try {
      var resp = await axios.post(user.login, payload)
      context.commit('updateResponseMessage', resp.data)
    } catch (error) {
      context.commit('updateResponseMessage', 'General Error')
    }
  },
  logoutUser: async (context, payload) => {
    try {
      var resp = await axios.post(
        user.logout,
        null,
        {
          headers: {'Authorization': 'Bearer ' + payload.token}
        }
      )
      context.commit('updateResponseMessage', resp.data)
    } catch (error) {
      context.commit('updateResponseMessage', 'General Error')
    }
  },
  fetchUserInfo: async (context, payload) => {
    try {
      var resp = await axios.post(
        user.getInfo,
        null,
        {
          headers: {'Authorization': 'Bearer ' + payload.token}
        }
      )
      context.commit('updateResponseMessage', resp.data)
    } catch (error) {
      console.log(error)
      context.commit('updateResponseMessage', 'General Error')
    }
  }
}

/**
 * @const mutations
 * @type {object}
 */
const mutations = {
  /**
     * Set user state
     * @param state
     * @param data
     */
  setUser: (state, data) => {
    state.user = data
  },

  /**
     * Update response message state
     * @param state
     * @param status
     */
  updateResponseMessage: (state, status) => {
    state.responseData = status
  }
}

export default {state, actions, mutations}
