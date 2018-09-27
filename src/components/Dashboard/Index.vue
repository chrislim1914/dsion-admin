<template>
  <div id="app-dashboard" class="container-fluid mt-4">
    <div class="row">
      <!-- sidebar start -->
      <dashboard-sidebar></dashboard-sidebar>
      <!-- sidebar end -->
      <!-- content start -->
      <div id="content" class="col-12 ml-sm-auto col-lg-10 pr-0">
        <router-view></router-view>
      </div>
      <!-- content end -->
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar'
export default {
  name: 'Dashboard',
  components: {
    'dashboard-sidebar': Sidebar
  },
  created () {
    if (!this.$session.exists()) {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang='scss'>
  @import 'scss/pages/dashboard.scss';
</style>
