import Vue from 'vue'
import Router from 'vue-router'

/**
 * @desc login import
 */
import Login from '@/components/Login/Index'

/**
 * @desc dashboard import
 */
import Dashboard from '@/components/Dashboard/Index'
import DashboardMain from '@/components/Dashboard/Main'
import MembershipManagement from '@/components/Dashboard/MembershipManagement'
import KycManagement from '@/components/Dashboard/KycManagement'
import MemberProfile from '@/components/Dashboard/MemberProfile'
import DepositManagement from '@/components/Dashboard/DepositManagement'
import EventManagement from '@/components/Dashboard/EventManagement'
import EventManagementEdit from '@/components/Dashboard/EventManagementEdit'
import EventManagementComments from '@/components/Dashboard/EventManagementComments'
// import TokenManagement from '@/components/Dashboard/TokenManagement'
import IcoManagement from '@/components/Dashboard/IcoManagement'
import PromotionManagement from '@/components/Dashboard/PromotionManagement'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
          name: 'DashboardMain',
          component: DashboardMain
        },
        {
          path: 'membership-management',
          name: 'DashboardMembershipManagement',
          component: MembershipManagement
        },
        {
          path: 'membership-management/view',
          name: 'DashboardMemberProfile',
          props: true,
          component: MemberProfile
        },
        {
          path: 'kyc-management',
          name: 'DashboardKycManagement',
          component: KycManagement
        },
        {
          path: 'deposit-management',
          name: 'DashboardDepositManagement',
          component: DepositManagement
        },
        {
          path: 'event-management',
          name: 'DashboardEventManagement',
          component: EventManagement
        },
        {
          path: 'event-management/edit/:id',
          name: 'DashboardEventManagementEdit',
          component: EventManagementEdit,
          props: true
        },
        {
          path: 'event-management/comments/event/:id',
          name: 'DashboardEventManagementComments',
          component: EventManagementComments,
          props: true
        },
        // {
        //   path: 'token-management',
        //   name: 'DashboardTokenManagement',
        //   component: TokenManagement
        // },
        {
          path: 'ico-management',
          name: 'DashboardIcoManagement',
          component: IcoManagement
        },
        {
          path: 'promotion-management',
          name: 'DashboardPromotionManagement',
          component: PromotionManagement
        }
      ]
    }
  ]
})
