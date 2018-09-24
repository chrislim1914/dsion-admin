<template>
  <div id="app-dashboard">
    <div class="container" v-if="dashboard">
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
        <!-- <div class="col">
          <a href="#!" class="btn btn-light btn-block">View all</a>
        </div>
        <div class="col">
          <a href="#!" class="btn btn-light btn-block">Private</a>
        </div>
        <div class="col">
          <a href="#!" class="btn btn-light btn-block">Free 1</a>
        </div>
        <div class="col">
          <a href="#!" class="btn btn-light btn-block">Free 2</a>
        </div>
        <div class="col">
          <a href="#!" class="btn btn-light btn-block">Public</a>
        </div> -->
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
      <!-- <div class="row col-8 mt-5">
        <div class="col-6">
          <h4 class="font-weight-bold">
            Day deposit: NNNN ETH
          </h4>
        </div>
        <div class="col-6">
          <h4 class="font-weight-bold">
            Confirm ETH: NNNN ETH
          </h4>
        </div>
      </div> -->
      <!-- <div class="row mt-4">
        <div class="col-12">
          <table class="table table-borderless">
            <thead>
              <tr>
                <th scope="col">TxHash</th>
                <th scope="col">Block</th>
                <th scope="col">Age</th>
                <th scope="col">From</th>
                <th scope="col"></th>
                <th scope="col">To</th>
                <th scope="col">Value</th>
                <th scope="col" class="text-muted">[TxFee]</th>
              </tr>
            </thead>
            <tbody>
              <tr :key="index" v-for="index in 10">
                <td class="text-primary">
                  <router-link to="/">
                    0xffd0c6bde2f41d78
                  </router-link>
                </td>
                <td>
                  <small class="font-italic text-muted">
                    (pending)
                  </small>
                </td>
                <td>
                  <small class="font-italic text-muted">
                    10 secs ago
                  </small>
                </td>
                <td class="text-primary">
                  <router-link to="/">
                    0xffd0c6bde2f41d78
                  </router-link>
                </td>
                <td class="text-center">
                  <h6 class="font-italic bg-success rounded text-white p-1">
                    <small>IN</small>
                  </h6>
                </td>
                <td class="text-muted">0xe530441f4f73bdb</td>
                <td class="text-muted">0 Ether</td>
                <td class="text-muted">(pending)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'DashboardMain',
  computed: {
    ...mapState({
      dashboard: ({dashboard}) => dashboard.dashboard,
      sales: ({sales}) => sales.sale
    })
  },
  methods: {
    ...mapActions([
      'getDashboard'
    ])
  },
  created () {
    this.getDashboard()
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
