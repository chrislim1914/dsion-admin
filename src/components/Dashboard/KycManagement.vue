<template>
<div id="app-dashboard-kyc-management">
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
      <div class="col-lg-2 mb-2 mb-lg-0">
        <button class="btn btn-light btn-block" :class="{ active: !filterKycStatus}"  @click="filterByKycStatus('')">
          View all
        </button>
      </div>
      <div class="col-lg-2 mb-2 mb-lg-0">
        <button class="btn btn-light btn-block" :class="{ active: filterKycStatus === 'Approved' }" @click="filterByKycStatus('Approved')">
          KYC Approved
        </button>
      </div>
      <div class="col-lg-2 mb-2 mb-lg-0">
        <button class="btn btn-light btn-block" :class="{ active: filterKycStatus === 'Rejected' }" @click="filterByKycStatus('Rejected')">
          KYC Rejected
        </button>
      </div>
      <div class="col-lg-2 mb-2 mb-lg-0">
        <button class="btn btn-light btn-block" :class="{ active: filterKycStatus === 'Pending' }" @click="filterByKycStatus('Pending')">
          KYC Pending
        </button>
      </div>
    </div>
    <!-- filter by kyc status end -->
    <!-- search by deposit start -->
    <div class="row mt-3">
      <div class="col-lg-3 mb-2 mb-lg-0">
        <select class="form-control bg-white select-no-arrow" v-model="searchModeDeposit" disabled>
            <option value="depositamount">Deposit Amount</option>
        </select>
      </div>
      <div class="col-lg-3 mb-2 mb-lg-0">
        <select class="form-control" v-model="searchRange">
              <option value="above">Above</option>
              <option value="below">Below</option>
            </select>
      </div>
      <div class="col-lg-3 mb-2 mb-lg-0">
        <input type="number" class="form-control" id="search-eth" v-model="searchEth" min="1" placeholder="ETH">
          </div>
        <div class="col-lg-3 mb-2 mb-lg-0">
          <button type="button" class="btn btn-block" @click="searchByDeposit(1)">Search</button>
        </div>
    </div>
    <!-- search by deposit end -->
    <!-- search by date start -->
    <div class="row mt-3">
      <div class="col-lg-3 mb-2 mb-lg-0">
        <select class="form-control" v-model="searchModeDate">
            <option value="usercreateddate">User created date</option>
            <option value="kycapplicationdate">KYC application date</option>
        </select>
      </div>
      <div class="col-lg-2 mb-2 mb-lg-0">
        <datetime format="yyyy-MM-dd" class="form-control" v-model="searchStartDate" placeholder="Start Date"></datetime>
      </div>
        <div class="col-lg-1 mb-2 mb-lg-0 text-center align-self-center">
          <h6>~</h6>
        </div>
        <div class="col-lg-2 mb-2 mb-lg-0">
          <datetime format="yyyy-MM-dd" class="form-control" v-model="searchEndDate" placeholder="End Date"></datetime>
        </div>
          <div class="col-lg-2 mb-2 mb-lg-0">
            <input type="text" class="form-control" v-model="searchId" placeholder="ID search">
        </div>
        <div class="col-lg-2 mb-2 mb-lg-0">
          <button type="button" class="btn btn-block" @click="searchByDate(1)">Search</button>
        </div>
    </div>
    <!-- search by date end -->
    <!-- search by info start -->
    <div class="row mt-3">
      <div class="col-lg-3 mb-2 mb-lg-0">
        <input type="text" class="form-control" id="search-email" v-model="searchEmail" placeholder="Email">
      </div>
      <div class="col-lg-3 mb-2 mb-lg-0">
        <input type="text" class="form-control" id="search-first-name" v-model="searchFirstName" placeholder="First Name">
      </div>
      <div class="col-lg-3 mb-2 mb-lg-0">
        <input type="text" class="form-control" id="search-last-name" v-model="searchLastName" placeholder="Last Name">
      </div>
      <div class="col-lg-3 mb-2 mb-lg-0">
        <button type="button" class="btn btn-block" @click="searchByInfo(1)">Search</button>
      </div>
    </div>
    <!-- search by info end -->
    <!-- export start -->
    <div class="row mt-4">
      <div class="col-lg-3 mb-2 mb-lg-0">
        <button type="button" class="btn btn-block" id="save-kyc-info" @click="exportKycInfoExcel">
          Save KYC information
        </button>
      </div>
      <div class="col-lg-3 mb-2 mb-lg-0">
        <button type="button" class="btn btn-block" id="save-kyc" @click="exportKycExcel">
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
      <div class="col-lg-2 mb-2 mb-lg-0">
        <button type="button" class="btn btn-block" :disabled="!selectedKycIds.length" @click="updateKycStatusData('Approved')">
          Approve ({{ kycStatusCount.length ? kycStatusCount[0].countstatus : 0 }})
        </button>
      </div>
      <div class="col-lg-2 mb-2 mb-lg-0">
        <button type="button" class="btn btn-block" :disabled="!selectedKycIds.length" @click="updateKycStatusData('Rejected')">
          Reject ({{ kycStatusCount.length ? kycStatusCount[1].countstatus : 0 }})
        </button>
      </div>
      <div class="col-lg-2 mb-2 mb-lg-0">
        <button type="button" class="btn btn-block" :disabled="!selectedKycIds.length" @click="updateKycStatusData('Pending')">
          Pending ({{ kycStatusCount.length ? kycStatusCount[2].countstatus : 0 }})
        </button>
      </div>
      <div class="col-lg-2 mb-2 mb-lg-0">
        <button type="button" class="btn btn-block" :disabled="!selectedKycIds.length" @click="showDeleteKycModal">
          Delete
        </button>
      </div>
    </div>
    <!-- export end -->
    <!-- kyc table start -->
    <div class="row mt-4 table-responsive" v-if="kyc">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="text-center lh-35">
              <toggle-button
               :value="isSelectAll"
               :sync="true"
               :labels="{checked: 'All', unchecked: 'None'}"
               :width="60"
               @change="selectToggle(isSelectAll)" />
             </th>
              <th scope="col" class="text-center lh-35">Row</th>
              <th scope="col" class="text-center lh-35">Email</th>
              <th scope="col" class="text-center lh-35">First Name</th>
              <th scope="col" class="text-center lh-35">Last Name</th>
              <th scope="col" class="text-center lh-35">Nationality</th>
              <th scope="col" class="text-center lh-35">Contact Number</th>
              <th scope="col" class="text-center lh-35">Doc Type</th>
              <th scope="col" class="text-center lh-35">Doc Front</th>
              <th scope="col" class="text-center lh-35">Doc Back</th>
              <th scope="col" class="text-center lh-35">Selfie</th>
              <th scope="col" class="text-center lh-35">Status</th>
              <th scope="col" class="text-center lh-35">Eth Address</th>
              <th scope="col" class="text-center lh-35">Deposit Amount</th>
              <th scope="col" class="text-center lh-35">Created At</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(kycData, key) in kyc.data" :key="key">
            <td class="text-center">
              <input type="checkbox" v-model="selectedKycIds" :value="kycData.idkyc">
            </td>
            <td>
              {{ kyc.total - (((kyc.current_page -1) * kyc.per_page) + key ) }}
            </td>
            <td class="kyc-table-data">{{ kycData.email }}</td>
            <td class="kyc-table-data">{{ kycData.first_name }}</td>
            <td class="kyc-table-data">{{ kycData.last_name }}</td>
            <td class="kyc-table-data">{{ kycData.nationality }}</td>
            <td class="kyc-table-data">{{ kycData.contactnumber }}</td>
            <td class="kyc-table-data">{{ kycData.doctype }}</td>
            <td class="kyc-table-data">
              <a :href="kycData.docfront | assetUrl" target="_blank">
                <progressive-img class="kyc-img" :src="kycData.thumbFront | assetUrl" alt="Doc Front Image" />
              </a>
            </td>
            <td class="kyc-table-data">
              <a :href="kycData.docback | assetUrl" target="_blank">
                <progressive-img class="kyc-img" :src="kycData.thumbBack | assetUrl" alt="Doc Back Image" />
              </a>
            </td>
            <td class="kyc-table-data">
              <a :href="kycData.selfie | assetUrl" target="_blank">
                <progressive-img class="kyc-img" :src="kycData.thumbSelfie | assetUrl" alt="SelfieImage" />
              </a>
            </td>
            <td class="kyc-table-data">{{ kycData.status }}</td>
            <td class="kyc-table-data">{{ kycData.eth_address }}</td>
            <td class="kyc-table-data">{{ kycData.deposit_amount }}</td>
            <td class="kyc-table-data">{{ kycData.created_date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- pagination start -->
    <div class="row mt-5">
        <uib-pagination
          v-if="kyc"
          :total-items="parseInt(kyc.total)"
          :items-per-page="parseInt(kyc.per_page)"
          v-model="pagination"
          @change="getKycData"
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
  <!-- delete deposit modal start -->
  <delete-kyc-modal />
  <!-- delete deposit modal end -->
</div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import {Datetime} from 'vue-datetime'
import {
  mapState,
  mapActions
} from 'vuex'
import DeleteKycModal from '@/components/Globals/DeleteKycModal'
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
      selectedKycIds: [],
      action: '',
      pagination: { currentPage: 1 },
      isLoading: false,
      isSelectAll: false
    }
  },
  methods: {
    ...mapActions([
      'getKyc',
      'searchKycByDeposit',
      'searchKycByDate',
      'searchKycByInfo',
      'updateKycStatus',
      'getKycStatusCount',
      'exportKyc',
      'exportKycInfo'
    ]),
    selectToggle (value) {
      this.isSelectAll = !value

      if (this.isSelectAll) {
        this.selectedKycIds = this.kyc.data.map(k => k.idkyc)
      } else {
        this.selectedKycIds = []
      }
    },
    getKycData () {
      this.isSelectAll = false
      this.selectedKycIds = []

      if (this.action === 'searchKycByDeposit') {
        this.searchByDeposit()
        return
      }

      if (this.action === 'searchKycByDate') {
        this.searchByDate()
        return
      }

      if (this.action === 'searchKycByInfo') {
        this.searchByInfo()
        return
      }

      this.isLoading = true

      this.getKyc({kycStatus: this.filterKycStatus, page: this.pagination.currentPage}).then(() => {
        this.action = 'getKyc'
        this.isLoading = false
      })
    },
    searchByDeposit (page = null) {
      this.isLoading = true

      if (page) {
        this.pagination.currentPage = page
      }

      if (!this.searchEth) {
        this.getKyc({kycStatus: this.filterKycStatus}).then(() => {
          this.action = 'getKyc'
          this.isLoading = false
        })

        return
      }

      this.action = 'searchKycByDeposit'
      this.searchKycByDeposit({
        eth: this.searchEth,
        range: this.searchRange,
        modeDeposit: this.searchModeDeposit,
        kycStatus: this.filterKycStatus,
        page: this.pagination.currentPage
      }).then(() => {
        this.isLoading = false
      })
    },
    searchByDate (page = null) {
      this.isLoading = true

      if (page) {
        this.pagination.currentPage = page
      }

      if (!this.searchStartDate && !this.searchEndDate && !this.searchId) {
        this.getKyc({kycStatus: this.filterKycStatus}).then(() => {
          this.action = 'getKyc'
          this.isLoading = false
        })

        return
      }

      this.action = 'searchKycByDate'
      this.searchKycByDate({
        startDate: this.searchStartDate.slice(0, 10),
        endDate: this.searchEndDate.slice(0, 10),
        email: this.searchId,
        modeDate: this.searchModeDate,
        kycStatus: this.filterKycStatus,
        page: this.pagination.currentPage
      }).then(() => {
        this.isLoading = false
      })
    },
    searchByInfo (page = null) {
      this.isLoading = true

      if (page) {
        this.pagination.currentPage = page
      }

      if (!this.searchEmail && !this.searchFirstName && !this.searchLastName) {
        this.getKyc({kycStatus: this.filterKycStatus}).then(() => {
          this.action = 'getKyc'
          this.isLoading = false
        })

        return
      }

      this.action = 'searchKycByInfo'
      this.searchKycByInfo({
        email: this.searchEmail,
        firstName: this.searchFirstName,
        lastName: this.searchLastName,
        kycStatus: this.filterKycStatus,
        page: this.pagination.currentPage
      }).then(() => {
        this.isLoading = false
      })
    },
    filterByKycStatus (status) {
      this.filterKycStatus = status
      this.pagination.currentPage = 1
      this.getKycData()
    },
    exportKycExcel () {
      this.isLoading = true
      this.exportKyc({ids: this.kycIds}).then(() => {
        if (this.kycResponseData) {
          this.common.download(
            this.kycResponseData,
            'kyc-' + this.moment().format('YYYYMMDD') + '.xls'
          )
        }
        this.isLoading = false
      })
    },
    exportKycInfoExcel () {
      this.isLoading = true
      this.exportKycInfo({ids: this.kycIds}).then(() => {
        if (this.kycResponseData) {
          this.common.download(
            this.kycResponseData,
            'kycInfo-' + this.moment().format('YYYYMMDD') + '.xls'
          )
        }
        this.isLoading = false
      })
    },
    updateKycStatusData (status) {
      this.isLoading = true
      this.updateKycStatus({
        status: status,
        idkyclist: this.selectedKycIds
      }).then(() => {
        if (this.kycResponseData.result) {
          this.$awn.success('Successfully updated kyc status')
          this.selectedKycIds = []
          this.getKyc({kycStatus: this.filterKycStatus}).then(() => {
            this.isLoading = false
          })
        } else {
          this.$awn.alert('Error updating kyc status')
        }
      })
    },
    showDeleteKycModal () {
      this.$modal.show('delete-kyc-modal', {kycIds: this.selectedKycIds})
    }
  },
  components: {
    Loading,
    datetime: Datetime,
    'delete-kyc-modal': DeleteKycModal
  },
  computed: {
    ...mapState({
      kyc: ({kyc}) => kyc.kyc,
      kycIds: ({kyc}) => kyc.kycIds,
      kycResponseData: ({kyc}) => kyc.responseData,
      kycStatusCount: ({kyc}) => kyc.kycStatusCount
    })
  },
  created () {
    this.isLoading = true
    Promise.all([
      this.getKycStatusCount(),
      this.getKyc({kycStatus: this.filterKycStatus})
    ]).then(() => {
      this.action = 'getKyc'
      this.isLoading = false
    })
  }
}
</script>
