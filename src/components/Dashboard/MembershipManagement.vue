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

    <!-- filter by sales status start -->
    <div class="row">
      <div class="col-2">
        <button class="btn btn-light btn-block" :class="{ active: !filterSaleStatus}"  @click="filterSaleStatus = ''">
          View all
        </button>
      </div>
      <div class="col-2" v-for="(sale, key) in sales" :key="key">
        <button class="btn btn-light btn-block" :class="{ active: filterSaleStatus == sale.name }" @click="filterSaleStatus = sale.name">
          {{ sale.name }}
        </button>
      </div>
    </div>
    <!-- filter by sales status end -->

    <!-- filter by kyc status start -->
    <div class="row mt-3">
      <div class="col-2">
        <button class="btn btn-light btn-block" :class="{ active: !filterKycStatus}"  @click="filterKycStatus = ''">
          View all
        </button>
      </div>
      <div class="col-2">
        <button class="btn btn-light btn-block" :class="{ active: filterKycStatus == 'Approved' }" @click="filterKycStatus = 'Approved'">
          KYC Approved
        </button>
      </div>
      <div class="col-2">
        <button class="btn btn-light btn-block" :class="{ active: filterKycStatus == 'Not Entered' }" @click="filterKycStatus = 'Not Entered'">
          KYC Not Entered
        </button>
      </div>
      <div class="col-2">
        <button class="btn btn-light btn-block" :class="{ active: filterKycStatus == 'Pending' }" @click="filterKycStatus = 'Pending'">
          KYC Pending
        </button>
      </div>
    </div>
    <!-- filter by kyc status end -->

    <!-- search by deposit start -->
    <div class="row mt-3">
      <div class="col">
        <select class="form-control" v-model="searchModeDeposit">
              <option value="estimatedeposit">Estimate Deposit</option>
              <option value="depositamount">Deposit Amount</option>
            </select>
      </div>
      <div class="col">
        <select class="form-control" v-model="searchRange">
              <option value="above">Above</option>
              <option value="below">Below</option>
            </select>
      </div>
      <div class="col">
        <input type="number" class="form-control" id="search-eth" v-model="searchEth" min="1" placeholder="ETH">
          </div>
        <div class="col">
          <a href="#!" class="btn btn-light btn-block" @click="searchByDeposit">Search</a>
        </div>
      </div>
      <!-- search by deposit end -->

      <!-- search by date start -->
      <div class="row mt-3">
        <div class="col-3">
          <select class="form-control" v-model="searchModeDate">
              <option value="user created date">User created date</option>
              <option value="kyc application date">KYC application date</option>
            </select>
        </div>
        <div class="col-2">
          <datetime format="yyyy-MM-dd" class="form-control" v-model="searchStartDate" placeholder="Start Date"></datetime>
        </div>
          <div class="col-1 text-center align-self-center">
            <h6>~</h6>
          </div>
          <div class="col-2">
            <datetime format="yyyy-MM-dd" class="form-control" v-model="searchEndDate" placeholder="End Date"></datetime>
          </div>
            <div class="col-2">
              <input type="text" class="form-control" v-model="searchId" placeholder="ID search">
          </div>
              <div class="col-2">
                <a href="#!" class="btn btn-light btn-block" @click="searchByDate">Search</a>
              </div>
            </div>
            <!-- search by date end -->

            <div class="row mt-4">
              <div class="col-6">
                <div class="row">
                  <div class="col-4">
                    <a href="#!" class="btn btn-block" id="save-kyc-info">
                  Save KYC information
                </a>
                  </div>
                  <div class="col-4">
                    <button type="button" class="btn btn-block" id="save-excel" @click="exportMembersData">
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
                  <tr v-for="(member, key) in filteredMembers" :key="key">
                    <td>
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="autoSizingCheck2">
                  </div>
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
          <!-- loading start -->
          <loading :active.sync="isLoading" :is-full-page="true">
          </loading>
          <!-- loading end -->
        </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import {Datetime} from 'vue-datetime'
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
      filterSaleStatus: '',
      filterKycStatus: '',
      isLoading: false
    }
  },
  methods: {
    ...mapActions([
      'getMembers',
      'fetchActiveSale',
      'searchMembersByDeposit',
      'searchMembersByDate',
      'exportMembers'
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
    exportMembersData () {
      this.exportMembers({
        modeStatus: 0,
        modeKyc: '',
        startDate: '',
        endDate: '',
        modeDate: '',
        email: '',
        eth: this.searchEth,
        range: this.searchRange,
        modeDeposit: this.searchModeDeposit
      }).then(() => {
        if (this.membersResponseData.is_success) {
          const url = window.URL.createObjectURL(new Blob([this.membersResponseData.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'members-' + new Date().toISOString().slice(0, 10) + '.xls')
          document.body.appendChild(link)
          link.click()
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
      sales: ({sales}) => sales.sale,
      members: ({members}) => members.members,
      membersResponseData: ({members}) => members.responseData
    }),
    ...mapGetters([
      'filterMembers'
    ]),
    filteredMembers () {
      return this.filterMembers(this.filterSaleStatus, this.filterKycStatus)
    }
  },
  created () {
    this.isLoading = true
    this.getMembers().then(() => {
      this.fetchActiveSale().then(() => {
        this.isLoading = false
      })
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
