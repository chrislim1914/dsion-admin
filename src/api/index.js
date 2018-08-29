/**
 * api routes
 */

import {
  apiURL
} from '@/config.js'

export const user = {
  signin: apiURL + '/login',
  logout: apiURL + '/auth/logout'
}
