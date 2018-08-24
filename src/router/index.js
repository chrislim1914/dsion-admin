import Vue from 'vue'
import Router from 'vue-router'

/**
 * @desc signin import
 */
import Signin from '@/components/Signin/Index'

/**
 * @desc dashboard import
 */
import Dashboard from '@/components/Dashboard/Index'
import DashboardMain from '@/components/Dashboard/Main'
import MembershipManagement from '@/components/Dashboard/MembershipManagement'
import MemberProfile from '@/components/Dashboard/MemberProfile'
import DepositManagement from '@/components/Dashboard/DepositManagement'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
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
        }
      ]
    }
  ]
})
