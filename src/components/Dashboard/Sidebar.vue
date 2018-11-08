<template>
  <nav class="col-auto d-none d-lg-block sidebar px-0">
    <div class="sidebar-sticky bg-light">
      <ul class="nav flex-column bg-dark">
        <li class="list-group-item bg-transparent border-0 py-5 d-inline-block text-center">
          <img src="~images/dsion.png" alt="Dsion logo" class="img-fluid">
        </li>
      </ul>
      <ul class="nav flex-column mt-4">
        <li class="nav-item my-2" :key="index" v-for="(link, index) in links">
          <router-link class="btn-block px-3" :class="{'active font-weight-bold': hasRoute(link.link), 'text-dark': !hasRoute(link.link)}" :to="{ name: 'Dashboard' + link.path_name  }">
            {{ link.title }}
          </router-link>
        </li>
        <li class="nav-item my-2">
          <a href="#" class="btn-block px-3" @click="logout">
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
  props: ['links'],
  data () {
    return {
      isLoading: false
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
