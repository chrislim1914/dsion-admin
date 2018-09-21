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
          <form @submit.prevent="submitDeposit">
            <h5 class="font-weight-bold mb-3 border-bottom pb-3">
              Create Deposit
            </h5>
            <div class="form-group">
               <label for="eth-address">ETH Address</label>
               <input type="text" class="form-control" id="eth-address" v-model="ethAddress">
            </div>
            <div class="form-group">
               <label for="eth-count">ETH Count</label>
               <input type="number" class="form-control" id="eth-count" v-model="ethCount">
            </div>
            <div class="form-group">
               <label for="sales-status">Sale Status</label>
               <select class="form-control" id="sale-status" v-model="saleStatusId">
                <option v-for="(sale, key) in sales" :key="key" :value="sale.idsale_status">{{ sale.name }}</option>
              </select>
            </div>
            <button type="submit" class="btn col-2">Submit</button>
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
      <div class="row">
        <div class="col-6">
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <input type="text" class="form-control" id="search-user-email" v-model="searchUserEmail" placeholder="User Email">
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <input type="text" class="form-control" id="search-eth-address" v-model="searchEthAddress" placeholder="ETH Address">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="row">
            <div class="col">
              <div class="form-group">
                <input type="date" class="form-control" id="search-created-at" placeholder="Created At">
              </div>
            </div>
            <div class="col">
              <button type="button" class="btn btn-block">Search</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-2">
          <a href="#!" class="btn btn-light btn-block">View all</a>
        </div>
        <div class="col-2">
          <a href="#!" class="btn btn-light btn-block">Private</a>
        </div>
        <div class="col-2">
          <a href="#!" class="btn btn-light btn-block">Free 1</a>
        </div>
        <div class="col-2">
          <a href="#!" class="btn btn-light btn-block">Free 2</a>
        </div>
        <div class="col-2">
          <a href="#!" class="btn btn-light btn-block">Public</a>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-6">
          <h4 class="font-weight-bold">
            Deposit amount: <span class="text-danger">NNNNN</span> ETH
          </h4>
        </div>
        <div class="col-6">
          <h4 class="font-weight-bold">
            Total deposit amount: <span class="text-danger">NNNNN</span> ETH
          </h4>
        </div>
        <div class="col-6">
          <h4 class="font-weight-bold">
            Withdrawal amount: <span class="text-danger">NNNNN</span> ETH
          </h4>
        </div>
        <div class="col-6">
          <h4 class="font-weight-bold">
            Total withdrawal amount: <span class="text-danger">NNNNN</span> ETH
          </h4>
        </div>
        <div class="col-6">
          <h4 class="font-weight-bold">
            Pending: <span class="text-danger">NNNNN</span> ETH
          </h4>
        </div>
        <div class="col-6">
          <h4 class="font-weight-bold">
            Total balance by period: <span class="text-danger">NNNNN</span> ETH
          </h4>
        </div>
        <div class="col-12">
          <div class="dropdown-divider"></div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <h4 class="font-weight-bold">
            Day deposit: <span class="text-danger">NNNNN</span> ETH
          </h4>
        </div>
        <div class="col-6">
          <h4 class="font-weight-bold">
            Confirm ETH: <span class="text-danger">NNNNN</span> ETH
          </h4>
        </div>
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
import {mapState, mapActions} from 'vuex'
export default {
  name: 'DashboardDepositManagement',
  data () {
    return {
      ethAddress: '',
      ethCount: '',
      saleStatusId: '',
      searchUserEmail: '',
      searchEthAddress: '',
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

      this.isLoading = true

      this.createDeposit({
        eth_address: this.ethAddress,
        eth_count: this.ethCount,
        idsale_status: this.saleStatusId
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
    }
  },
  components: {
    Loading
  },
  computed: {
    ...mapState({
      sales: ({sales}) => sales.sale,
      depositResponseData: ({deposit}) => deposit.responseData,
      deposits: ({deposit}) => deposit.deposit
    })
  },
  created () {
    this.fetchActiveSale()
    this.getDeposits()
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
