<template>
  <nav class="col-md-2 col-lg-2 d-none d-lg-block sidebar px-0">
    <div class="sidebar-sticky bg-light">
      <ul class="nav flex-column bg-dark">
        <li class="list-group-item bg-transparent border-0 py-5 d-inline-block text-center">
          <img src="~images/dsion.png" alt="Dsion logo" class="img-fluid">
        </li>
      </ul>
      <ul class="nav flex-column mt-4">
        <li class="nav-item my-2" :key="index" v-for="(link, index) in links">
          <router-link class="btn-block ml-3" :class="{'active font-weight-bold': hasRoute(link.link), 'text-dark': !hasRoute(link.link)}" :to="{ name: 'Dashboard' + link.path_name  }">
            {{ link.title }}
          </router-link>
        </li>
        <li class="nav-item my-2">
          <a href="#" class="btn-block ml-3" @click="logout">
            Logout
          </a>
        </li>
      </ul>
    </div>
    <div class="loading-parent">
          <loading :active.sync="isLoading"
          :is-full-page="true"></loading>
     </div>
  </nav>
</template>

<script>
import {jwtHeader} from '@/config'
import Loading from 'vue-loading-overlay'
import {
  mapState,
  mapActions
} from 'vuex'

export default {
  name: 'DashboardSidebar',
  components: {
    Loading
  },
  data () {
    return {
      isLoading: false,
      links: [
        {
          title: 'Dashboard',
          path_name: 'Main',
          link: '/dashboard/'
        },
        {
          title: 'Membership Management',
          path_name: 'MembershipManagement',
          link: '/dashboard/membership-management'
        },
        {
          title: 'KYC Management',
          path_name: 'KycManagement',
          link: '/dashboard/kyc-management'
        },
        {
          title: 'Deposit Management',
          path_name: 'DepositManagement',
          link: '/dashboard/deposit-management'
        },
        {
          title: 'Event Management',
          path_name: 'EventManagement',
          link: '/dashboard/event-management'
        },
        // {
        //   title: 'Token Management',
        //   path_name: 'TokenManagement',
        //   link: '/dashboard/token-management'
        // },
        {
          title: 'ICO Management',
          path_name: 'IcoManagement',
          link: '/dashboard/ico-management'
        },
        {
          title: 'Promotion Management',
          path_name: 'PromotionManagement',
          link: '/dashboard/promotion-management'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      'responseData': ({users}) => users.responseData
    })
  },
  methods: {
    ...mapActions([
      'logoutUser'
    ]),
    hasRoute: function (partial) {
      return (this.$route.fullPath === partial)
    },
    logout: function (e) {
      this.isLoading = true

      this.logoutUser({
        token: jwtHeader + this.$session.get('jwt').slice(3)
      }).then(() => {
        this.isLoading = false
        this.$session.destroy()
        this.$router.push('/')
      })

      e.preventDefault()
    }
  }
}
</script>

<style lang='scss' scoped>
.active {
  color: #3C8ADD;
}
</style>
