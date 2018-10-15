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
        <button class="btn btn-light btn-block" :class="{ active: !filterKycStatus}"  @click="filterByKycStatus('')">
          View all
        </button>
      </div>
      <div class="col-md-2 mb-2 mb-md-0">
        <button class="btn btn-light btn-block" :class="{ active: filterKycStatus === 'Approved' }" @click="filterByKycStatus('Approved')">
          KYC Approved
        </button>
      </div>
      <div class="col-md-2 mb-2 mb-md-0">
        <button class="btn btn-light btn-block" :class="{ active: filterKycStatus === 'Rejected' }" @click="filterByKycStatus('Rejected')">
          KYC Rejected
        </button>
      </div>
      <div class="col-md-2 mb-2 mb-md-0">
        <button class="btn btn-light btn-block" :class="{ active: filterKycStatus === 'Pending' }" @click="filterByKycStatus('Pending')">
          KYC Pending
        </button>
      </div>
    </div>
    <!-- filter by kyc status end -->
    <!-- search by deposit start -->
    <div class="row mt-3">
      <div class="col-md-3 mb-2 mb-md-0">
        <select class="form-control bg-white select-no-arrow" v-model="searchModeDeposit" disabled>
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
          <button type="button" class="btn btn-block" @click="searchByDeposit(1)">Search</button>
        </div>
    </div>
    <!-- search by deposit end -->
    <!-- search by date start -->
    <div class="row mt-3">
      <div class="col-md-3 mb-2 mb-md-0">
        <select class="form-control" v-model="searchModeDate">
            <option value="usercreateddate">User created date</option>
            <option value="kycapplicationdate">KYC application date</option>
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
          <button type="button" class="btn btn-block" @click="searchByDate(1)">Search</button>
        </div>
    </div>
    <!-- search by date end -->
    <!-- export start -->
    <div class="row mt-4">
      <div class="col-md-3 mb-2 mb-md-0">
        <button type="button" class="btn btn-block" id="save-kyc-info" @click="exportKycInfo">
          Save KYC information
        </button>
      </div>
      <div class="col-md-3 mb-2 mb-md-0">
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
            <th>Row</th>
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
          <tr v-for="(member, key) in members.data" :key="key">
            <td>
              <input type="checkbox">
            </td>
            <td>
              {{ members.total - (((members.current_page -1) * members.per_page) + key ) }}
            </td>
            <td>{{ member.created_date }}</td>
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
    <!-- pagination start -->
    <div class="row mt-5">
        <uib-pagination
          v-if="members"
          :total-items="parseInt(members.total)"
          :items-per-page="parseInt(members.per_page)"
          v-model="pagination"
          @change="getMembersData"
          :max-size="10"
          :boundary-links="true"
          :force-ellipses="true"
          class="mx-auto"
        />
    </div>
    <!-- pagination end -->
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
import {memberApi} from '@/api'
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  name: 'DashboardMembershipManagement',
  data () {
    return {
      searchModeDeposit: 'depositamount',
      searchRange: 'above',
      searchEth: '',
      searchModeDate: 'usercreateddate',
      searchStartDate: '',
      searchEndDate: '',
      searchId: '',
      filterKycStatus: '',
      action: '',
      pagination: { currentPage: 1 },
      isLoading: false
    }
  },
  methods: {
    ...mapActions([
      'getMembers',
      'searchMembersByDeposit',
      'searchMembersByDate'
    ]),
    getMembersData () {
      if (this.action === 'searchMembersByDeposit') {
        this.searchByDeposit()
        return
      }

      if (this.action === 'searchMembersByDate') {
        this.searchByDate()
        return
      }

      this.isLoading = true

      this.getMembers({kycStatus: this.filterKycStatus, page: this.pagination.currentPage}).then(() => {
        this.action = 'getMembers'
        this.isLoading = false
      })
    },
    searchByDeposit (page = null) {
      this.isLoading = true

      if (page) {
        this.pagination.currentPage = page
      }

      if (!this.searchEth) {
        this.getMembers({kycStatus: this.filterKycStatus}).then(() => {
          this.action = 'getMembers'
          this.isLoading = false
        })

        return
      }

      this.searchMembersByDeposit({
        eth: this.searchEth,
        range: this.searchRange,
        modeDeposit: this.searchModeDeposit,
        kycStatus: this.filterKycStatus,
        page: this.pagination.currentPage
      }).then(() => {
        this.action = 'searchMembersByDeposit'
        this.isLoading = false
      })
    },
    searchByDate (page = null) {
      this.isLoading = true

      if (page) {
        this.pagination.currentPage = page
      }

      if (!this.searchStartDate && !this.searchEndDate && !this.searchId) {
        this.getMembers({kycStatus: this.filterKycStatus}).then(() => {
          this.action = 'getMembers'
          this.isLoading = false
        })

        return
      }

      this.searchMembersByDate({
        startDate: this.searchStartDate.slice(0, 10),
        endDate: this.searchEndDate.slice(0, 10),
        email: this.searchId,
        modeDate: this.searchModeDate,
        kycStatus: this.filterKycStatus,
        page: this.pagination.currentPage
      }).then(() => {
        this.action = 'searchMembersByDate'
        this.isLoading = false
      })
    },
    filterByKycStatus (status) {
      this.filterKycStatus = status
      this.pagination.currentPage = 1
      this.getMembersData()
    },
    exportMembers () {
      window.open(memberApi.exportMembers + this.memberIds.join('-'), '_blank')
    },
    exportKycInfo () {
      window.open(memberApi.exportKycInfo + this.memberIds.join('-'), '_blank')
    }
  },
  components: {
    Loading,
    datetime: Datetime
  },
  computed: {
    ...mapState({
      members: ({members}) => members.members,
      memberIds: ({members}) => members.memberIds,
      membersResponseData: ({members}) => members.responseData
    })
  },
  created () {
    this.isLoading = true
    this.getMembers({kycStatus: this.filterKycStatus}).then(() => {
      this.isLoading = false
      this.action = 'getMembers'
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
