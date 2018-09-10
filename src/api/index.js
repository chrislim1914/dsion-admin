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

export const ico = {
  generatePromoCode: apiURL + '/admin/PromoCode/codeonly',
  retrievePromoCode: apiURL + '/admin/PromoCode/Display',
  retrievePromoCategory: apiURL + '/admin/PromotionCategory',
  createPromoCategory: apiURL + '/admin/PromotionCategory/create',
  createPromotionCode: apiURL + '/admin/PromoCode/create'
}

export const article = {
  retrieveArticles: apiURL + '/admin/news',
  postArticle: apiURL + '/admin/news/create',
  removeArticle: apiURL + '/admin/news/delete'
}
