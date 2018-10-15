<template>
  <div id="app-dashboard-depositmanagement">
    <div class="container-fluid">
      <div class="row p-3">
        <div class="col">
          <h3 class="font-weight-bold">
            Deposit management
          </h3>
        </div>
      </div>
      <div class="row p-3">
        <div class="col-12">
          <form @submit.prevent="submit" novalidate>
            <h5 class="font-weight-bold mb-3 border-bottom pb-3">
              Create Deposit
            </h5>
            <div class="row">
              <div class="col-lg-3">
                 <label for="eth-address">ETH Address</label>
                 <input type="text" class="form-control" id="eth-address" v-model="ethAddress">
              </div>
              <div class="col-lg-3">
                 <label for="eth-count">ETH Count</label>
                 <input type="number" class="form-control" id="eth-count" v-model="ethCount">
              </div>
              <div class="col-lg-3">
                <label for="sales-status">Sale Status</label>
                <select class="form-control" id="sale-status" v-model="saleStatusId">
                <option v-for="(sale, key) in sales" :key="key" :value="sale.idsale_status">{{ sale.name }}</option>
                </select>
              </div>
              <div class="col-lg-3">
                <label for="create-date">Create Date</label>
                <input type="text" class="form-control" id="create-date" v-model="createDate">
                <!-- <label for="sales-status">Create Date</label>
                <datetime type="datetime" format="yyyy-MM-dd HH:mm:ss" class="form-control" v-model="createDate"></datetime> -->
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3">
                <button type="submit" class="btn btn-block mt-4">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row p-3">
        <div class="col-12">
          <h5 class="font-weight-bold mb-3 border-bottom pb-3">
            Deposit List
          </h5>
        </div>
      </div>
      <div class="row p-3">
        <div class="col-lg-3">
          <label for="user-email">User Email</label>
          <input type="text" class="form-control" id="user-email" v-model="searchUserEmail">
        </div>
        <div class="col-lg-3">
          <label for="search-eth-address">ETH Address</label>
          <input type="text" class="form-control" id="search-eth-address" v-model="searchEthAddress" placeholder="ETH Address">
        </div>
        <div class="col-lg-3">
          <label for="search-created-at">Created At</label>
          <datetime format="yyyy-MM-dd" class="form-control" id="search-created-at" v-model="searchCreatedAt"></datetime>
        </div>
        <div class="col-lg-3">
            <br>
            <button type="button" class="btn btn-md btn-block mt-2" @click="searchDepositsData(1)">Search</button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-2">
          <button class="btn btn-light btn-block" :class="{ active: !filterSaleStatus}"  @click="filterSaleStatus = ''">
            View all
          </button>
        </div>
        <div class="col-2" v-for="(sale, key) in sales" :key="key">
          <button class="btn btn-light btn-block" :class="{ active: filterSaleStatus == sale.idsale_status }" @click="filterBySaleStatus(sale.idsale_status)">
            {{ sale.name }}
          </button>
        </div>
      </div>
      <div class="row mt-4" v-if="dashboard">
        <div class="col-lg-6">
          <h4 class="font-weight-bold">
            Total deposit amount: <span class="text-danger">{{ dashboard.total_deposit }}</span> ETH
          </h4>
        </div>
        <div class="col-lg-6">
          <h4 class="font-weight-bold">
            Total withdrawal amount: <span class="text-danger">{{ dashboard.total_withdraw }}</span> ETH
          </h4>
        </div>
        <div class="col-lg-6">
          <h4 class="font-weight-bold">
            Currently holding amount: <span class="text-danger">{{ dashboard.current_holding }}</span> ETH
          </h4>
        </div>
        <div class="col-lg-6">
          <h4 class="font-weight-bold">
            Day deposit: <span class="text-danger">{{ dashboard.todays_deposit }}</span> ETH
          </h4>
        </div>
        <div class="col-12">
          <div class="dropdown-divider"></div>
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          <button class="btn btn-block my-3" @click="showDeleteDepositModal" :disabled="!depositIds.length">
            Delete
          </button>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12" v-if="deposits">
          <table class="table table-borderless">
            <thead>
              <tr>
                <th scope="col">All</th>
                <th>Row</th>
                <th scope="col">KYC ETH Address</th>
                <th scope="col">Email</th>
                <th scope="col">Deposit ETH Count</th>
                <th scope="col">Deposit Sale Status</th>
                <th scope="col">Deposit Total</th>
                <th scope="col">Deposit Created</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(deposit, index) in deposits.data" :key="index">
                <td>
                  <input type="checkbox" v-model="depositIds" :value="deposit.iddeposit">
                </td>
                <td>
                  {{ deposits.total - (((deposits.current_page -1) * deposits.per_page) + index ) }}
                </td>
                <td class="text-primary">
                  {{ deposit.eth_address }}
                </td>
                <td class="text-primary">
                  {{ deposit.email }}
                </td>
                <td>
                  {{ deposit.eth_count }}
                </td>
                <td>
                  {{ deposit.sale_status }}
                </td>
                <td>
                  {{ parseFloat(deposit.total) }}
                </td>
                <td>
                  {{ deposit.created_date }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- pagination start -->
      <div class="row mt-5">
          <uib-pagination
            v-if="deposits"
            :total-items="parseInt(deposits.total)"
            :items-per-page="parseInt(deposits.per_page)"
            v-model="pagination"
            @change="loadDepositsData"
            :max-size="10"
            :boundary-links="true"
            :force-ellipses="true"
            class="mx-auto"
          />
      </div>
      <!-- pagination end -->
    </div>
    <!-- loading start -->
    <loading :active.sync="isLoading" :is-full-page="true">
    </loading>
    <!-- loading end -->
    <!-- delete deposit modal start -->
    <delete-deposit-modal />
    <!-- delete deposit modal end -->
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import { Datetime } from 'vue-datetime'
import {mapState, mapActions} from 'vuex'
import DeleteDepositModal from '@/components/Globals/DeleteDepositModal'
export default {
  name: 'DashboardDepositManagement',
  data () {
    return {
      ethAddress: '',
      ethCount: '',
      saleStatusId: '',
      createDate: '',
      searchUserEmail: '',
      searchEthAddress: '',
      searchCreatedAt: '',
      filterSaleStatus: '',
      depositIds: [],
      action: '',
      pagination: { currentPage: 1 },
      isLoading: false
    }
  },
  methods: {
    ...mapActions([
      'fetchActiveSale',
      'createDeposit',
      'getDeposits',
      'searchDeposits',
      'getDashboard'
    ]),
    getDepositsData () {
      this.isLoading = true
      this.getDeposits({
        saleStatus: this.filterSaleStatus,
        page: this.pagination.currentPage
      }).then(() => {
        this.action = 'getDeposits'
        this.isLoading = false
      })
    },
    searchDepositsData (page = null) {
      this.isLoading = true

      if (page) {
        this.pagination.currentPage = page
      }

      if (!this.searchUserEmail && !this.searchEthAddress && !this.searchCreatedAt) {
        this.getDepositsData()
        return
      }
      this.action = 'searchDeposits'
      this.searchDeposits({
        email: this.searchUserEmail,
        ethAddress: this.searchEthAddress,
        createdDate: this.searchCreatedAt.slice(0, 10),
        saleStatus: this.filterSaleStatus,
        page: this.pagination.currentPage
      }).then(() => {
        this.isLoading = false
      })
    },
    loadDepositsData () {
      if (this.action === 'searchDeposits') {
        this.searchDepositsData()
        return
      }

      this.getDepositsData()
    },
    filterBySaleStatus (status) {
      this.filterSaleStatus = status
      this.pagination.currentPage = 1
      this.loadDepositsData()
    },
    showDeleteDepositModal () {
      this.$modal.show('delete-deposit-modal', {depositIds: this.depositIds})
    },
    submit () {
      if (!this.ethAddress) {
        this.$awn.alert('Please enter eth address')
        return
      }

      if (!this.ethCount) {
        this.$awn.alert('Please enter eth count')
        return
      }

      if (this.ethCount === '0') {
        this.$awn.alert('Eth count must not be equal to 0')
        return
      }

      if (!this.saleStatusId) {
        this.$awn.alert('Please select sales status')
        return
      }

      if (!this.createDate) {
        this.$awn.alert('Please enter create date')
        return
      }

      if (!this.moment(this.createDate, 'YYYY-MM-DD kk:mm', true).isValid()) {
        this.$awn.alert('Please enter valid create date')
        return
      }

      this.isLoading = true

      this.createDeposit({
        eth_address: this.ethAddress,
        eth_count: this.ethCount,
        idsale_status: this.saleStatusId,
        created_at: this.createDate
      }).then(() => {
        this.isLoading = false

        if (!this.depositResponseData) {
          this.$awn.alert('Error fetching response data')
          return
        }

        if (this.depositResponseData.result) {
          this.$awn.success('Successfully created deposit')
          this.getDepositsData()
          this.ethAddress = ''
          this.ethCount = ''
          this.saleStatusId = ''
        } else {
          this.$awn.alert(this.depositResponseData.message)
        }
      })
    }
  },
  components: {
    Loading,
    datetime: Datetime,
    'delete-deposit-modal': DeleteDepositModal
  },
  computed: {
    ...mapState({
      sales: ({sales}) => sales.sale,
      deposits: ({deposit}) => deposit.deposits,
      depositResponseData: ({deposit}) => deposit.responseData,
      dashboard: ({dashboard}) => dashboard.dashboard
    })
  },
  created () {
    this.createDate = this.moment().format('YYYY-MM-DD kk:mm')
    this.isLoading = true
    this.fetchActiveSale().then(() => {
      this.getDeposits().then(() => {
        this.getDashboard().then(() => {
          this.isLoading = false
        })
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
