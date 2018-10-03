/**
 * Filters
 */
import {baseURL} from '../config'

/**
* @description get asset url based on the provided link
*/
export function assetUrl (link) {
  if (!link) {
    return ''
  }
  return baseURL + '/' + link
}
