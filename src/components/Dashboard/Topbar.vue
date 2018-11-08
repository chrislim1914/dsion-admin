<template>
  <nav id="app-dashboard-topbar" class="d-lg-none navbar fixed-top navbar-dark bg-dark">
   <img src="~images/dsion.png" alt="Dsion logo" class="img-fluid">
   <button class="navbar-toggler" ref="navbarCollapse" type="button" data-toggle="collapse" data-target="#navbarsExample01" aria-controls="navbarsExample01" aria-expanded="false" aria-label="Toggle navigation">
     <span class="navbar-toggler-icon"></span>
   </button>
   <div class="collapse navbar-collapse" id="navbarsExample01">
     <ul class="navbar-nav mr-auto mt-3">
       <li class="nav-item my-2" :key="index" v-for="(link, index) in links" @click="hideCollapse">
         <router-link class="btn-block px-3" :class="{'active font-weight-bold': hasRoute(link.link), 'text-white': !hasRoute(link.link)}" :to="{ name: 'Dashboard' + link.path_name  }">
           {{ link.title }}
         </router-link>
       </li>
       <li class="nav-item my-2">
         <a href="#" class="btn-block text-white px-3" @click="logout">
           Logout
         </a>
       </li>
     </ul>
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
  name: 'DashboardTopbar',
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
    hideCollapse () {
      this.$refs.navbarCollapse.click()
    },
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
