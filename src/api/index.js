/**
 * api routes
 */

import {
  apiURL
} from '@/config.js'

export const user = {
  login: apiURL + '/admin/login',
  logout: apiURL + '/auth/logout'
}
