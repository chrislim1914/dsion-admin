/**
 * Events store module
 */
import axios from 'axios'
import {
  eventApi
} from '@/api'

/**
 * @const state
 * @type {object}
 */
const state = {
  event: null,
  events: null,
  comments: null,
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
      var resp = await axios.get(eventApi.getEvents)

      if (resp.data.result) {
        context.commit('setEvents', resp.data.data)
      }
    } catch (error) {
      context.commit('setEvents', null)
    }
  },

  /**
  * Get comments
  * @param  context
  * @param payload``
  * @return {Promise}
  */
  getComments: async (context, payload) => {
    try {
      var resp = await axios.get(eventApi.getComments + payload.eventId, {params: {page: payload.page}})

      if (resp.data.data && resp.data.data.length) {
        context.commit('setComments', resp.data)
      } else {
        context.commit('setComments', null)
      }
    } catch (error) {
      context.commit('setComments', null)
    }
  },

  /**
  * Get event
  * @param  context
  * @param eventId
  * @return {Promise}
  */
  getEvent: async (context, eventId) => {
    try {
      var resp = await axios.get(eventApi.getEvent + eventId)

      if (resp.data.result) {
        context.commit('setEvent', resp.data)
      }
    } catch (error) {
      context.commit('setEvent', null)
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
      var resp = await axios.post(eventApi.createEvent, payload)
      context.commit('setResponseData', resp.data)
    } catch (error) {
      context.commit('setResponseData', null)
    }
  },

  /**
  * Update event
  * @param  context
  * @param  payload
  * @return {Promise}
  */
  updateEvent: async (context, payload) => {
    try {
      var resp = await axios.post(eventApi.updateEvent, payload)
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
     * Set event state
     * @param state
     * @param data
     */
  setEvent: (state, data) => {
    state.event = data
  },

  /**
     * Set comments state
     * @param state
     * @param data
     */
  setComments: (state, data) => {
    state.comments = data
  },

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
