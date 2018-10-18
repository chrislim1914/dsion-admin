<template>
  <div id="app-dashboard">
    <!-- topbar start -->
    <dashboard-topbar></dashboard-topbar>
    <!-- topbar end -->
   <div class="container-fluid mt-4 pt-4 pt-lg-0">
     <div class="row">
       <!-- sidebar start -->
       <dashboard-sidebar></dashboard-sidebar>
       <!-- sidebar end -->
       <!-- content start -->
       <div id="content" class="col-12 col-lg-11">
         <router-view></router-view>
       </div>
       <!-- content end -->
     </div>
   </div>

  </div>
</template>

<script>
import Topbar from './Topbar'
import Sidebar from './Sidebar'
export default {
  name: 'Dashboard',
  components: {
    'dashboard-topbar': Topbar,
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
