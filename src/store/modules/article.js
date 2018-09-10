/**
 * Article store module
 */
import axios from 'axios'
import {
  article
} from '@/api'

/**
 * @const state
 * @type {object}
 */
const state = {
  articlesList: {},
  responseData: {}
}

/**
 * @const actions
 * @type {object}
 */
const actions = {
  /**
      * Request article code
      * @param  context
      * @param  payload
      * @return {Promise}
      */
  requestArticle: async (context) => {
    try {
      var resp = await axios.get(article.retrieveArticles)
      context.commit('setArticles', resp.data.data)
    } catch (error) {
      context.commit('updateResponseMessage', 'General Error')
    }
  },
  createArticle: async (context, payload) => {
    try {
      var resp = await axios.post(article.postArticle, payload)
      context.commit('updateResponseMessage', resp.data)
    } catch (error) {
      context.commit('updateResponseMessage', 'General Error')
    }
  },
  deleteArticle: async (context, payload) => {
    try {
      var resp = await axios.post(article.removeArticle, payload)
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
     * Set articles state
     * @param state
     * @param data
     */
  setArticles: (state, data) => {
    state.articlesList = data
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
