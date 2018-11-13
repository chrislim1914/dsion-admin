/**
 * Ico settings store module
 */
import axios from 'axios'
import {
  ico
} from '@/api'

/**
 * @const state
 * @type {object}
 */
const state = {
  generatedPromoCode: {},
  generatedpromoCodesList: {},
  promoCategories: {},
  responseData: {}
}

/**
 * @const actions
 * @type {object}
 */
const actions = {
  /**
      * Request promo code
      * @param  context
      * @param  payload
      * @return {Promise}
      */
  requestPromoCode: async (context) => {
    try {
      var resp = await axios.get(ico.generatePromoCode)
      context.commit('setPromoCode', resp.data)
      context.commit('updateResponseMessage', resp.data)
    } catch (error) {
      context.commit('updateResponseMessage', 'General Error')
    }
  },
  requestAllPromoCode: async (context) => {
    try {
      var resp = await axios.get(ico.retrievePromoCode)
      if (resp.data.result) {
        context.commit('setGeneratedPromoCodesList', resp.data.data)
      }
      context.commit('updateResponseMessage', resp.data.message)
    } catch (error) {
      context.commit('updateResponseMessage', 'General Error')
    }
  },
  requestPromoCategory: async (context) => {
    try {
      var resp = await axios.get(ico.retrievePromoCategory)
      context.commit('setPromoCategory', resp.data)
    } catch (error) {
      context.commit('updateResponseMessage', 'General Error')
    }
  },
  createPromotionCategory: async (context, payload) => {
    try {
      var resp = await axios.post(ico.createPromoCategory, payload)
      context.commit('updateResponseMessage', resp.data)
    } catch (error) {
      context.commit('updateResponseMessage', 'General Error')
    }
  },
  createPromotionCode: async (context, payload) => {
    try {
      var resp = await axios.post(ico.createPromotionCode, payload)
      context.commit('updateResponseMessage', resp.data)
    } catch (error) {
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
     * Set promo code state
     * @param state
     * @param data
     */
  setPromoCode: (state, data) => {
    state.generatedPromoCode = data
  },

  /**
     * Set promo code list state
     * @param state
     * @param data
     */
  setGeneratedPromoCodesList: (state, data) => {
    state.generatedpromoCodesList = data
  },

  /**
     * Set promo category state
     * @param state
     * @param data
     */
  setPromoCategory: (state, data) => {
    state.promoCategories = data
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
