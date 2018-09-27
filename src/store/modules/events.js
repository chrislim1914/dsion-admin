/**
 * Events store module
 */
import axios from 'axios'
import {
  event
} from '@/api'

/**
 * @const state
 * @type {object}
 */
const state = {
  events: null,
  responseData: null
}

/**
 * @const actions
 * @type {object}
 */
const actions = {
  /**
  * Get events
  * @param  context
  * @return {Promise}
  */
  getEvents: async (context) => {
    try {
      var resp = await axios.get(event.getEvents)

      if (resp.data.result) {
        context.commit('setEvents', resp.data.data)
      }
    } catch (error) {
      context.commit('setEvents', null)
    }
  },

  /**
  * Create event
  * @param  context
  * @param  payload
  * @return {Promise}
  */
  createEvent: async (context, payload) => {
    try {
      var resp = await axios.post(event.createEvent, payload)
      context.commit('setResponseData', resp.data)
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
     * Set events state
     * @param state
     * @param data
     */
  setEvents: (state, data) => {
    state.events = data
  },

  /**
     * Set response data state
     * @param state
     * @param status
     */
  setResponseData: (state, status) => {
    state.responseData = status
  }
}

export default {state, actions, mutations}
