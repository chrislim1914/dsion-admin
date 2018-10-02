<template>
<div id="app-dashboard-membershipmanagement">
  <div class="container-fluid">
    <div class="row p-3">
      <div class="col-12">
        <h3 class="font-weight-bold">
          Membership Management
        </h3>
      </div>
    </div>
    <!-- filter by kyc status start -->
    <div class="row mt-3">
      <div class="col-md-2 mb-2 mb-md-0">
        <button class="btn btn-light btn-block" :class="{ active: !filterKycStatus}"  @click="filterKycStatus = ''">
          View all
        </button>
      </div>
      <div class="col-md-2 mb-2 mb-md-0">
        <button class="btn btn-light btn-block" :class="{ active: filterKycStatus == 'Approved' }" @click="filterKycStatus = 'Approved'">
          KYC Approved
        </button>
      </div>
      <div class="col-md-2 mb-2 mb-md-0">
        <button class="btn btn-light btn-block" :class="{ active: filterKycStatus == 'Not Entered' }" @click="filterKycStatus = 'Not Entered'">
          KYC Not Entered
        </button>
      </div>
      <div class="col-md-2 mb-2 mb-md-0">
        <button class="btn btn-light btn-block" :class="{ active: filterKycStatus == 'Pending' }" @click="filterKycStatus = 'Pending'">
          KYC Pending
        </button>
      </div>
    </div>
    <!-- filter by kyc status end -->
    <!-- search by deposit start -->
    <div class="row mt-3">
      <div class="col-md-3 mb-2 mb-md-0">
        <select class="form-control" v-model="searchModeDeposit">
              <option value="estimatedeposit">Estimate Deposit</option>
              <option value="depositamount">Deposit Amount</option>
            </select>
      </div>
      <div class="col-md-3 mb-2 mb-md-0">
        <select class="form-control" v-model="searchRange">
              <option value="above">Above</option>
              <option value="below">Below</option>
            </select>
      </div>
      <div class="col-md-3 mb-2 mb-md-0">
        <input type="number" class="form-control" id="search-eth" v-model="searchEth" min="1" placeholder="ETH">
          </div>
        <div class="col-md-3 mb-2 mb-md-0">
          <button type="button" class="btn btn-block" @click="searchByDeposit">Search</button>
        </div>
      </div>
      <!-- search by deposit end -->
      <!-- search by date start -->
      <div class="row mt-3">
        <div class="col-md-3 mb-2 mb-md-0">
          <select class="form-control" v-model="searchModeDate">
              <option value="user created date">User created date</option>
              <option value="kyc application date">KYC application date</option>
            </select>
        </div>
        <div class="col-md-2 mb-2 mb-md-0">
          <datetime format="yyyy-MM-dd" class="form-control" v-model="searchStartDate" placeholder="Start Date"></datetime>
        </div>
          <div class="col-md-1 mb-2 mb-md-0 text-center align-self-center">
            <h6>~</h6>
          </div>
          <div class="col-md-2 mb-2 mb-md-0">
            <datetime format="yyyy-MM-dd" class="form-control" v-model="searchEndDate" placeholder="End Date"></datetime>
          </div>
            <div class="col-md-2 mb-2 mb-md-0">
              <input type="text" class="form-control" v-model="searchId" placeholder="ID search">
          </div>
              <div class="col-md-2 mb-2 mb-md-0">
                <button type="button" class="btn btn-block" @click="searchByDate">Search</button>
              </div>
            </div>
            <!-- search by date end -->
            <!-- export start -->
            <div class="row mt-4">
              <div class="col-md-2 mb-2 mb-md-0">
                <button type="button" class="btn btn-block" id="save-kyc-info" @click="exportKycInfo">
                  Save KYC information
                </button>
              </div>
              <div class="col-md-2 mb-2 mb-md-0">
                <button type="button" class="btn btn-block" id="save-members" @click="exportMembers">
                  Save list to excel
                </button>
              </div>
            </div>
            <!-- export end -->
            <!-- membership table start -->
            <div class="row mt-4 table-responsive" v-if="members">
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
                  <tr v-for="(member, key) in filteredMembers" :key="key">
                    <td>
                      <input type="checkbox">
                    </td>
                    <td>{{ member.created_at }}</td>
                    <td>{{ member.email }}</td>
                    <td>{{ member.contactnumber }}</td>
                    <td>{{ member.eth_address }}</td>
                    <td>{{ member.deposit_amount }}</td>
                    <td>{{ member.status }}</td>
                    <td>{{ member.refund }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- membership table end -->
          <!-- loading start -->
          <loading :active.sync="isLoading" :is-full-page="true">
          </loading>
          <!-- loading end -->
        </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import {Datetime} from 'vue-datetime'
import {member} from '@/api'
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex'
export default {
  name: 'DashboardMembershipManagement',
  data () {
    return {
      searchModeDeposit: 'estimatedeposit',
      searchRange: 'above',
      searchEth: '',
      searchModeDate: 'user created date',
      searchStartDate: '',
      searchEndDate: '',
      searchId: '',
      filterKycStatus: '',
      isLoading: false
    }
  },
  methods: {
    ...mapActions([
      'getMembers',
      'searchMembersByDeposit',
      'searchMembersByDate'
    ]),
    searchByDeposit () {
      if (!this.searchEth) {
        this.getMembers()
        return
      }

      this.searchMembersByDeposit({
        eth: this.searchEth,
        range: this.searchRange,
        modeDeposit: this.searchModeDeposit
      })
    },
    searchByDate () {
      if (!this.searchStartDate && !this.searchEndDate && !this.searchId) {
        this.getMembers()
        return
      }

      this.searchMembersByDate({
        startDate: this.searchStartDate.slice(0, 10),
        endDate: this.searchEndDate.slice(0, 10),
        email: this.searchId,
        modeDate: this.searchModeDate
      })
    },
    exportMembers () {
      var kycIds = this.members.map(member => member.idkyc).join('-')
      window.open(member.exportMembers + kycIds, '_blank')
    },
    exportKycInfo () {
      var kycIds = this.members.map(member => member.idkyc).join('-')
      window.open(member.exportKycInfo + kycIds, '_blank')
    }
  },
  components: {
    Loading,
    datetime: Datetime
  },
  computed: {
    ...mapState({
      members: ({members}) => members.members,
      membersResponseData: ({members}) => members.responseData
    }),
    ...mapGetters([
      'filterMembers'
    ]),
    filteredMembers () {
      return this.filterMembers(this.filterKycStatus)
    }
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
