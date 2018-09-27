<template>
    <div id="app-dashboard-membershipmanagement">
      <div class="container-fluid">
        <div class="row p-3">
          <div class="col-12">
            <h5 class="font-weight-bold">
              Membership
            </h5>
          </div>
        </div>

        <!-- start first filter -->
        <div class="row">
          <div class="col">
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
          </div>
        </div>
        <!-- end first filter -->

        <!-- start second filter -->
        <div class="row mt-3">
          <div class="col">
            <a href="#!" class="btn btn-light btn-block">View all</a>
          </div>
          <div class="col">
            <a href="#!" class="btn btn-light btn-block">KYC Approved</a>
          </div>
          <div class="col">
            <a href="#!" class="btn btn-light btn-block">KYC in progress</a>
          </div>
          <div class="col">
            <a href="#!" class="btn btn-light btn-block">KYC not entered</a>
          </div>
          <div class="col">
            <a href="#!" class="btn btn-light btn-block">KYC rejection</a>
          </div>
        </div>
        <!-- end second filter -->

        <!-- start third filter -->
        <div class="row mt-3">
          <div class="col">
            <select class="form-control">
              <option>Estimate Deposit</option>
              <option>Deposit Amount</option>
            </select>
          </div>
          <div class="col">
            <input type="number" class="form-control" id="above-below" min="1" placeholder="Above / below">
          </div>
          <div class="col">
            <input type="number" class="form-control" id="eth" min="1" placeholder="ETH">
          </div>
          <div class="col">
            <a href="#!" class="btn btn-light btn-block">Search</a>
          </div>
        </div>
        <!-- end third filter -->

        <!-- start fourth filter -->
        <div class="row mt-3">
          <div class="col-3">
            <select class="form-control" id="date-of-application">
              <option class="user-created">User created date</option>
              <option class="user-created">KYC updated date</option>
            </select>
          </div>
          <div class="col-2">
            <input type="text" class="form-control" id="start-date" placeholder="Start date">
          </div>
          <div class="col-1 text-center align-self-center">
            <h6>~</h6>
          </div>
          <div class="col-2">
            <input type="text" class="form-control" id="end-date" placeholder="End date">
          </div>
          <div class="col-2">
            <input type="text" class="form-control" id="id-search" placeholder="ID search">
          </div>
          <div class="col-2">
            <a href="#!" class="btn btn-light btn-block">Search</a>
          </div>
        </div>
        <!-- end fourth filter -->

        <div class="row mt-4">
          <div class="col-6">
            <div class="row">
              <div class="col-5">
                <a href="#!" class="btn" id="save-kyc-info">
                  Save KYC information
                </a>
              </div>
              <div class="col-5">
                <button type="button" class="btn" id="save-excel" @click="exportMembers">
                  Save list to excel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-4" v-if="members">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">All</th>
                <th scope="col">Registration date</th>
                <th scope="col">ID</th>
                <th scope="col">Mobile number</th>
                <th scope="col">ETH Address</th>
                <th scope="col">Deposit amount</th>
                <th scope="col">KYC</th>
                <th scope="col">Refund process status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(member, key) in members" :key="key">
                <td>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="autoSizingCheck2">
                  </div>
                </td>
                <td>{{ member.created_date }}</td>
                <td>{{ member.email }}</td>
                <td>{{ member.phone }}</td>
                <td>{{ member.eth_address }}</td>
                <td>{{ member.deposit_amount }}</td>
                <td>{{ member.kyc_status }}</td>
                <td>{{ member.refund }}</td>
              </tr>
            </tbody>
          </table>
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
  name: 'DashboardMembershipManagement',
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    ...mapActions([
      'getMembers',
      'exportMembers'
    ])
  },
  components: {
    Loading
  },
  computed: {
    ...mapState({
      members: ({members}) => members.members
    })
  },
  created () {
    this.isLoading = true
    this.getMembers().then(() => {
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
