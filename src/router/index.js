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
import MemberProfile from '@/components/Dashboard/MemberProfile'
import DepositManagement from '@/components/Dashboard/DepositManagement'
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
          path: 'deposit-management',
          name: 'DashboardDepositManagement',
          component: DepositManagement
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
