<template>
  <div id="app-dashboard">
    <div class="container-fluid" v-if="dashboard">
      <div class="row">
        <div class="col-12">
          <table class="table text-center">
            <thead>
              <tr>
                <th scope="col">Total deposit amount</th>
                <th scope="col">Total withdrawal amount</th>
                <th scope="col">Currently holding amount</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-danger">
                <td>
                  <h3 class="font-weight-bold">{{ dashboard.total_deposit}} ETH</h3>
                </td>
                <td>
                  <h3 class="font-weight-bold">{{ dashboard.total_withdraw }} ETH</h3>
                </td>
                <td>
                  <h3 class="font-weight-bold">{{ dashboard.current_holding }} ETH</h3>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row" v-if="sales">
        <div class="col" v-for="(sale, key) in sales" :key="key">
          <button class="btn btn-light btn-block">
            {{ sale.name }}
          </button>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <div class="row">
            <div class="col-6">
              <ul>
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
            <div class="col-6">
              <ul>
                <li>
                  <h6 class="font-weight-bold">Subscribers: {{ dashboard.subscribers }}</h6>
                </li>
                <li>
                  <h6 class="font-weight-bold">KYC applicants: {{ dashboard.kyc_Applicants }}</h6>
                </li>
                <li>
                  <h6 class="font-weight-bold">KYC: <span v-for="(kyc, key) in dashboard.kyc" :key="key"><span v-if="key > 0">&nbsp;|&nbsp;</span>{{ kyc.status }}&nbsp;{{kyc.countstatus}}&nbsp;people</span></h6>
                </li>
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
      dashboard: ({dashboard}) => dashboard.dashboard,
      sales: ({sales}) => sales.sale
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
