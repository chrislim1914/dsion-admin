<template>
  <div id="app-dashboard-depositmanagement">
    <div class="container">
      <div class="row p-3">
        <div class="col">
          <h3 class="font-weight-bold">
            Deposit management
          </h3>
        </div>
      </div>
      <div class="row p-3">
        <div class="col-12">
          <form @submit.prevent="submitDeposit" novalidate>
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
                <label for="sales-status">Create Date</label>
                <!-- <input type="datetime-local" class="form-control" id="create-date" v-model="createDate"> -->
                <datetime type="datetime" format="yyyy-MM-dd HH:mm:ss" class="form-control" v-model="createDate"></datetime>
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
      <div class="container">
        <div class="row">
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
              <button type="button" class="btn btn-md btn-block mt-2" @click="searchDeposit">Search</button>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-2">
            <button class="btn btn-light btn-block">
              View all
            </button>
          </div>
          <div class="col-2" v-for="(sale, key) in sales" :key="key">
            <button class="btn btn-light btn-block">
              {{ sale.name }}
            </button>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-6">
            <h4 class="font-weight-bold">
              Total deposit amount: <span class="text-danger">NNNNN</span> ETH
            </h4>
          </div>
          <div class="col-lg-6">
            <h4 class="font-weight-bold">
              Total withdrawal amount: <span class="text-danger">NNNNN</span> ETH
            </h4>
          </div>
          <div class="col-lg-6">
            <h4 class="font-weight-bold">
              Currently holding amount: <span class="text-danger">NNNNN</span> ETH
            </h4>
          </div>
          <div class="col-lg-6">
            <h4 class="font-weight-bold">
              Day deposit: <span class="text-danger">NNNNN</span> ETH
            </h4>
          </div>
          <div class="col-12">
            <div class="dropdown-divider"></div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12" v-if="deposits">
          <table class="table table-borderless">
            <thead>
              <tr>
                <th scope="col">KYC ETH Address</th>
                <th scope="col">Deposit ETH Count</th>
                <th scope="col">Deposit Sale Status</th>
                <th scope="col">Deposit Total</th>
                <th scope="col">Deposit Created</th>
              </tr>
            </thead>
            <tbody>
              <tr :key="index" v-for="(deposit, index) in deposits">
                <td class="text-primary">
                  {{ deposit.eth_address }}
                </td>
                <td>
                  {{ deposit.eth_count }}
                </td>
                <td>
                  {{ deposit.sale_status }}
                </td>
                <td>
                  {{ deposit.token }}
                </td>
                <td>
                  {{ deposit.created_at }}
                </td>
              </tr>
            </tbody>
          </table>
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
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import {mapState, mapActions} from 'vuex'
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
      isLoading: false
    }
  },
  methods: {
    ...mapActions([
      'fetchActiveSale',
      'createDeposit',
      'getDeposits'
    ]),
    submitDeposit () {
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
        this.$awn.alert('Please select create date')
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
          this.getDeposits()
          this.ethAddress = ''
          this.ethCount = ''
          this.saleStatusId = ''
        } else {
          this.$awn.alert(this.depositResponseData.message)
        }
      })
    },
    searchDeposit () {

    }
  },
  components: {
    Loading,
    datetime: Datetime
  },
  computed: {
    ...mapState({
      sales: ({sales}) => sales.sale,
      depositResponseData: ({deposit}) => deposit.responseData,
      deposits: ({deposit}) => deposit.deposits
    })
  },
  created () {
    this.createDate = this.moment().format('YYYY-MM-DDTkk:mm')
    this.isLoading = true
    this.fetchActiveSale().then(() => {
      this.getDeposits().then(() => {
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
