<template>
  <div id="app-dashboard">
    <div class="container-fluid" v-if="dashboard">
      <div class="row border-top">
        <div class="col-lg-3">
          <div class="row border-bottom">
            <div class="col-12 text-center font-weight-bold py-3">
              Total deposit amount
            </div>
          </div>
          <div class="row">
            <div class="col-12 text-center py-3">
              <h3 class="text-danger font-weight-bold">{{ dashboard.total_deposit}} ETH</h3>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="row border-bottom">
            <div class="col-12 text-center font-weight-bold py-3">
              Total withdrawal amount
            </div>
          </div>
          <div class="row">
            <div class="col-12 text-center py-3">
              <h3 class="text-danger font-weight-bold">{{ dashboard.total_withdraw}} ETH</h3>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="row border-bottom">
            <div class="col-12 text-center font-weight-bold py-3">
              Currently holding amount
            </div>
          </div>
          <div class="row">
            <div class="col-12 text-center py-3">
              <h3 class="text-danger font-weight-bold">{{ dashboard.current_holding}} ETH</h3>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="row border-bottom">
            <div class="col-12 text-center font-weight-bold py-3">
              Total estimated token
            </div>
          </div>
          <div class="row">
            <div class="col-12 text-center py-3">
              <h3 class="text-danger font-weight-bold">{{ dashboard.total_estimated_token}} ETH</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <div class="row mb-5">
            <div class="col-lg-6">
              <ul class="mb-0 text-center text-lg-left">
                <li>
                  <h6 class="font-weight-bold">Total Member: {{ dashboard.total_member }}</h6>
                </li>
                <li>
                  <h6 class="font-weight-bold">Today's New Member: {{ dashboard.todays_new_member }}</h6>
                </li>
                <li>
                  <h6 class="font-weight-bold">Today's Deposit: {{ dashboard.todays_deposit }}</h6>
                </li>
              </ul>
            </div>
            <div class="col-lg-6">
              <ul class="mb-0 text-center text-lg-left">
                <li>
                  <h6 class="font-weight-bold">Subscribers: {{ dashboard.subscribers }}</h6>
                </li>
                <li>
                  <h6 class="font-weight-bold">KYC applicants: {{ dashboard.kyc_Applicants }}</h6>
                </li>
                <!-- large screen -->
                <li class="d-none d-lg-block">
                  <h6 class="font-weight-bold">KYC: <span v-for="(kyc, key) in dashboard.kyc" :key="key"><span v-if="key > 0">&nbsp;|&nbsp;</span>{{ kyc.status }}&nbsp;{{kyc.countstatus}}&nbsp;people</span></h6>
                </li>
                <!-- large screen -->
                <!-- extra small to medium screen -->
                <li class="d-lg-none">
                  <h6 class="font-weight-bold" v-for="(kyc, key) in dashboard.kyc" :key="key">KYC {{ kyc.status }}:&nbsp;{{kyc.countstatus}}&nbsp;people</h6>
                </li>
                <!-- extra small to medium screen -->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- loading start -->
    <loading :active.sync="isLoading" :is-full-page="true">
    </loading>
    <!-- loading end -->
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import {mapState, mapActions} from 'vuex'
export default {
  name: 'DashboardMain',
  computed: {
    ...mapState({
      dashboard: ({dashboard}) => dashboard.dashboard
    })
  },
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    Loading
  },
  methods: {
    ...mapActions([
      'getDashboard'
    ])
  },
  created () {
    this.isLoading = true
    this.getDashboard().then(() => {
      this.isLoading = false
    })
  }
}
</script>

<style lang='scss'>
  * {
    margin: 0;
    padding: 0;
  }

  .debugger {
    border: 2px solid red;
  }
</style>
