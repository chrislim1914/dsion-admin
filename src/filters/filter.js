/**
 * Filters
 */
import {baseURL} from '../config'

/**
* @description get asset url based on the provided link
*/
export function assetUrl (link) {
  return baseURL + '/' + link
}
