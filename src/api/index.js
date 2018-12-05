/**
 * api routes
 */

import { apiURL, bitberryApiUrl } from '@/config.js'

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

export const memberApi = {
  getMembers: apiURL + '/admin/member/list',
  searchMembersByDeposit: apiURL + '/admin/member/sbdepo',
  searchMembersByDate: apiURL + '/admin/member/sbdate',
  exportMembers: apiURL + '/admin/member/export',
  exportMembersInfo: apiURL + '/admin/member/export/kycInfo'
}

export const eventApi = {
  getEvents: apiURL + '/admin/Event',
  getEvent: apiURL + '/admin/Event/',
  getComments: apiURL + '/admin/Commentlist/',
  exportComments: apiURL + '/admin/comment/export',
  createEvent: apiURL + '/admin/Event/create',
  updateEvent: apiURL + '/admin/Event/update'
}

export const kycApi = {
  getKyc: apiURL + '/admin/Kyc/All',
  searchKycByDeposit: apiURL + '/admin/kyc/sbdepo',
  searchKycByDate: apiURL + '/admin/kyc/sbdate',
  searchKycByInfo: apiURL + '/admin/kyc/sbi',
  exportKyc: apiURL + '/admin/kyc/export',
  exportKycInfo: apiURL + '/admin/kyc/export/kycInfo',
  kycStatusCount: apiURL + '/admin/kycStatusCount',
  updateKycStatus: apiURL + '/admin/Kyc/Update',
  deleteKyc: apiURL + '/admin/Kyc/delete'
}

export const noticeApi = {
  getNotices: apiURL + '/notice/application',
  exportNotice: apiURL + '/notice/export'
}

export const airdropApi = {
  importAirdrop: apiURL + '/airdrop/import'
}

export const bitberryApi = {
  getDeposits: bitberryApiUrl + '/partner_api/v1/wallets/rzg25vn8gk/entries'
}
