/**
 * api routes
 */

import {
  apiURL
} from '@/config.js'

export const user = {
  login: apiURL + '/admin/login',
  logout: apiURL + '/auth/admin/logout',
  getInfo: apiURL + '/auth/admin'
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

export const sales = {
  retrieveSales: apiURL + '/Sale/all'
}

export const deposit = {
  createDeposit: apiURL + '/admin/Deposit/create',
  getDeposits: apiURL + '/admin/Deposit',
  searchDeposits: apiURL + '/admin/kyc/sbdm',
  deleteDeposits: apiURL + '/admin/Deposit/multidelete'
}

export const dashboard = {
  getDashboard: apiURL + '/admin/Dashboard'
}

export const member = {
  getMembers: apiURL + '/admin/Kyc/All',
  searchMembersByDeposit: apiURL + '/admin/kyc/sbdepo',
  searchMembersByDate: apiURL + '/admin/kyc/sbdate',
  searchMembersByInfo: apiURL + '/admin/kyc/sbi',
  exportMembers: apiURL + '/admin/kyc/export?idkyc=',
  exportKycInfo: apiURL + '/admin/kyc/export/kycInfo?idkyc=',
  updateKycStatus: apiURL + '/admin/Kyc/Update',
  deleteMembers: apiURL + '/admin/Kyc/delete'
}

export const eventApi = {
  getEvents: apiURL + '/admin/Event',
  getEvent: apiURL + '/admin/Event/',
  getComments: apiURL + '/admin/Commentlist/',
  createEvent: apiURL + '/admin/Event/create',
  updateEvent: apiURL + '/admin/Event/update'
}

export const kycApi = {
  kycStatusCount: apiURL + '/admin/kycStatusCount'
}
