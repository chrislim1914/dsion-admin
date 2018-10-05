<template>
<div id="app-dashboard-membershipmanagement">
  <div class="container-fluid px-0">
    <div class="row p-3">
      <div class="col-12">
        <h3 class="font-weight-bold">
          KYC Management
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
          <button type="button" class="btn btn-block" @click="searchByDeposit">Search</button>
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
          <button type="button" class="btn btn-block" @click="searchByDate">Search</button>
        </div>
    </div>
    <!-- search by date end -->
    <!-- search by info start -->
    <div class="row mt-3">
      <div class="col-md-3 mb-2 mb-md-0">
        <input type="text" class="form-control" id="search-email" v-model="searchEmail" placeholder="Email">
      </div>
      <div class="col-md-3 mb-2 mb-md-0">
        <input type="text" class="form-control" id="search-first-name" v-model="searchFirstName" placeholder="First Name">
      </div>
      <div class="col-md-3 mb-2 mb-md-0">
        <input type="text" class="form-control" id="search-last-name" v-model="searchLastName" placeholder="Last Name">
      </div>
      <div class="col-md-3 mb-2 mb-md-0">
        <button type="button" class="btn btn-block" @click="searchByInfo">Search</button>
      </div>
    </div>
    <!-- search by info end -->
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
    <div class="row">
      <div class="col-12 mt-2">
          <div class="dropdown-divider"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 mb-2 mb-md-0">
        <button type="button" class="btn btn-block" :disabled="!kycIds.length" @click="updateKycStatusData('Approved')">
          Approve
        </button>
      </div>
      <div class="col-md-2 mb-2 mb-md-0">
        <button type="button" class="btn btn-block" :disabled="!kycIds.length" @click="updateKycStatusData('Rejected')">
          Reject
        </button>
      </div>
      <div class="col-md-2 mb-2 mb-md-0">
        <button type="button" class="btn btn-block" :disabled="!kycIds.length" @click="updateKycStatusData('Pending')">
          Pending
        </button>
      </div>
    </div>
    <!-- export end -->
    <!-- kyc table start -->
    <div class="row mt-4 table-responsive" v-if="members">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="text-center">All</th>
            <th scope="col" class="text-center">Email</th>
            <th scope="col" class="text-center">First Name</th>
            <th scope="col" class="text-center">Last Name</th>
            <th scope="col" class="text-center">Nationality</th>
            <th scope="col" class="text-center">Contact Number</th>
            <th scope="col" class="text-center">Doc Type</th>
            <th scope="col" class="text-center">Doc Front</th>
            <th scope="col" class="text-center">Doc Back</th>
            <th scope="col" class="text-center">Selfie</th>
            <th scope="col" class="text-center">Status</th>
            <th scope="col" class="text-center">Eth Address</th>
            <th scope="col" class="text-center">Deposit Amount</th>
            <th scope="col" class="text-center">Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member, key) in members.data" :key="key">
            <td>
              <input type="checkbox" v-model="kycIds" :value="member.idkyc">
            </td>
            <td class="kyc-table-data">{{ member.email }}</td>
            <td class="kyc-table-data">{{ member.first_name }}</td>
            <td class="kyc-table-data">{{ member.last_name }}</td>
            <td class="kyc-table-data">{{ member.nationality }}</td>
            <td class="kyc-table-data">{{ member.contactnumber }}</td>
            <td class="kyc-table-data">{{ member.doctype }}</td>
            <td class="kyc-table-data">
              <a :href="member.docfront | assetUrl" target="_blank">
                <progressive-img class="kyc-img" :src="member.docfront | assetUrl" alt="Doc Front Image" />
              </a>
            </td>
            <td class="kyc-table-data">
              <a :href="member.docback | assetUrl" target="_blank">
                <progressive-img class="kyc-img" :src="member.docback | assetUrl" alt="Doc Back Image" />
              </a>
            </td>
            <td class="kyc-table-data">
              <a :href="member.selfie | assetUrl" target="_blank">
                <progressive-img class="kyc-img" :src="member.selfie | assetUrl" alt="SelfieImage" />
              </a>
            </td>
            <td class="kyc-table-data">{{ member.status }}</td>
            <td class="kyc-table-data">{{ member.eth_address }}</td>
            <td class="kyc-table-data">{{ member.deposit_amount }}</td>
            <td class="kyc-table-data">{{ member.created_date }}</td>
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
  <!-- kyc table end -->
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
  mapActions
} from 'vuex'
export default {
  name: 'DashboardKycManagement',
  data () {
    return {
      searchModeDeposit: 'depositamount',
      searchRange: 'above',
      searchEth: '',
      searchModeDate: 'usercreateddate',
      searchStartDate: '',
      searchEndDate: '',
      searchId: '',
      searchEmail: '',
      searchFirstName: '',
      searchLastName: '',
      filterKycStatus: '',
      kycIds: [],
      action: '',
      pagination: { currentPage: 1 },
      isLoading: false
    }
  },
  methods: {
    ...mapActions([
      'getMembers',
      'searchMembersByDeposit',
      'searchMembersByDate',
      'searchMembersByInfo',
      'updateKycStatus'
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

      if (this.action === 'searchMembersByInfo') {
        this.searchByInfo()
        return
      }

      this.isLoading = true

      this.getMembers({kycStatus: this.filterKycStatus, page: this.pagination.currentPage}).then(() => {
        this.action = 'getMembers'
        this.isLoading = false
      })
    },
    searchByDeposit () {
      this.isLoading = true

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
    searchByDate () {
      this.isLoading = true

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
    searchByInfo () {
      this.isLoading = true

      if (!this.searchEmail && !this.searchFirstName && !this.searchLastName) {
        this.getMembers({kycStatus: this.filterKycStatus}).then(() => {
          this.action = 'getMembers'
          this.isLoading = false
        })

        return
      }

      this.searchMembersByInfo({
        email: this.searchEmail,
        firstName: this.searchFirstName,
        lastName: this.searchLastName,
        kycStatus: this.filterKycStatus,
        page: this.pagination.currentPage
      }).then(() => {
        this.action = 'searchMembersByInfo'
        this.isLoading = false
      })
    },
    filterByKycStatus (status) {
      this.filterKycStatus = status
      this.pagination.currentPage = 1
      this.getMembersData()
    },
    exportMembers () {
      window.open(member.exportMembers + this.memberIds.join('-'), '_blank')
    },
    exportKycInfo () {
      window.open(member.exportKycInfo + this.memberIds.join('-'), '_blank')
    },
    updateKycStatusData (status) {
      this.isLoading = true
      this.updateKycStatus({
        status: status,
        idkyclist: this.kycIds
      }).then(() => {
        if (this.membersResponseData.result) {
          this.$awn.success('Successfully updated kyc status')
          this.kycIds = []
          this.getMembers({kycStatus: this.filterKycStatus}).then(() => {
            this.isLoading = false
          })
        } else {
          this.$awn.alert('Error updating kyc status')
        }
      })
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
