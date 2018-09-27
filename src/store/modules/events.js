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
  events: null
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

      if (resp.data.data) {
        context.commit('setEvents', resp.data.data)
      }
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
     * Set events state
     * @param state
     * @param data
     */
  setEvents: (state, data) => {
    state.events = data
  }
}

export default {state, actions, mutations}
