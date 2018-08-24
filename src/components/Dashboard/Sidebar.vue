<template>
  <nav class="col-md-2 d-none d-lg-block sidebar">
    <div class="sidebar-sticky bg-light">
      <ul class="nav flex-column">
        <li class="list-group-item bg-transparent border-0">
            <h6 class="font-weight-bold">
              DSION
            </h6>
          </li>
      </ul>
      <ul class="nav flex-column mt-4">
        <li class="nav-item my-2" :key="index" v-for="(link, index) in links">
          <router-link class="btn-block ml-3" :class="{'active font-weight-bold': hasRoute(link.link), 'text-dark': !hasRoute(link.link)}" :to="{ name: 'Dashboard' + link.path_name  }">
            {{ link.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'DashboardSidebar',
  data () {
    return {
      links: [
        {
          title: 'Dashboard',
          path_name: 'Main',
          link: '/dashboard'
        },
        {
          title: 'Membership Management',
          path_name: 'MembershipManagement',
          link: '/dashboard/membership-management'
        },
        {
          title: 'Despoit Management',
          path_name: 'DespoitManagement',
          link: '/dashboard/deposit-management'
        },
        {
          title: 'Token Management',
          path_name: 'TokenManagement',
          link: '/dashboard/token-management'
        },
        {
          title: 'ICO Management',
          path_name: 'ICOManagement',
          link: '/dashboard/ico-management'
        }
      ]
    }
  },
  methods: {
    hasRoute: function (partial) {
      return (this.$route.fullPath === partial)
    }
  }
}
</script>

<style lang='scss' scoped>
.active {
  color: #3C8ADD;
}
</style>
