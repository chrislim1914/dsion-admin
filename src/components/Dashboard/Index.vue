<template>
  <div id="app-dashboard" class="container-fluid mt-4">
    <div class="wrapper">

      <!-- sidebar -->
      <dashboard-sidebar></dashboard-sidebar>

      <div id="content" class="col-12 ml-sm-auto col-lg-10 px-4">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import Sidebar from './Sidebar'
export default {
  name: 'Dashboard',
  components: {
    'dashboard-sidebar': Sidebar
  }
}
</script>

<style lang='scss'>
  @import 'scss/pages/dashboard.scss';
</style>
