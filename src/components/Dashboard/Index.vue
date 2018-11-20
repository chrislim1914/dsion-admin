<template>
  <div id="app-dashboard">
    <!-- topbar start -->
    <dashboard-topbar :links="links"></dashboard-topbar>
    <!-- topbar end -->
   <div class="container-fluid mt-4 pt-4 pt-lg-0">
     <div class="row">
       <!-- sidebar start -->
       <dashboard-sidebar :links="links"></dashboard-sidebar>
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
  data () {
    return {
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
        {
          title: 'ICO Management',
          path_name: 'IcoManagement',
          link: '/dashboard/ico-management'
        },
        {
          title: 'Promotion Management',
          path_name: 'PromotionManagement',
          link: '/dashboard/promotion-management'
        },
        {
          title: 'Notice Management',
          path_name: 'NoticeManagement',
          link: '/dashboard/notice-management'
        },
        {
          title: 'Dsion Airdrop',
          path_name: 'DsionAirdrop',
          link: '/dashboard/dsion-airdrop'
        }
      ]
    }
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
