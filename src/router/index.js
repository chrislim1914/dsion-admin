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
        }
      ]
    }
  ]
})
