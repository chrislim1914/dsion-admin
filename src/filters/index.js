/**
 * Filter wrapper
 * @type {[type]}
 */
import Vue from 'vue'
import * as filter from './filter'

/**
 * @description loops thru imported filter,
 * access all exported filters via key and add it into Vue.filter
 */
Object.keys(filter).forEach(k => Vue.filter(k, filter[k]))
