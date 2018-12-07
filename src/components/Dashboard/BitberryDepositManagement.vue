<template>
<div id="app-dashboard-bitberry-deposit-management">
  <div class="container-fluid">
    <div class="row p-3">
      <div class="col-12">
        <h3 class="font-weight-bold">Bitberry Deposit Management</h3>
      </div>
    </div>
    <!-- balance start -->
    <div class="row p-3">
      <div class="col-lg-2">
        <h5 class="font-weight-bold">Balance</h5>
      </div>
      <div class="col-lg-3">
        <h5 class="font-weight-bold text-danger" v-if="wallet">
          {{ wallet.balance }} ETH
        </h5>
        <h5 v-else>
          0
        </h5>
      </div>
    </div>
    <!-- balance end -->
    <!-- airdrop start -->
    <div class="row p-3 mb-3">
      <div class="col-lg-2 mb-3 mb-lg-0">
        <button type="button" class="btn btn-block" @click="sendAirdrop">
          Send
        </button>
      </div>
      <div class="col-lg-3">
        <input type="number" class="form-control"
          placeholder="Amount" v-model="amount">
      </div>
      <div class="col-lg-1">
        <h5>To</h5>
      </div>
      <div class="col-lg-3">
        <input type="number" class="form-control"
          placeholder="Phone Number" v-model="phoneNumber">
      </div>
    </div>
    <!-- airdrop end -->
    <!-- category filter start -->
    <div class="row p-3">
      <div class="col-lg-2">
        <h5 class="mt-1">Category</h5>
      </div>
      <div class="col-lg-3">
        <select class="form-control" v-model="filterCategory">
          <option value="all">All</option>
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
          <option value="fee">Fee</option>
        </select>
      </div>
    </div>
    <!-- category filter end -->
    <!-- date filter start -->
    <div class="row p-3">
      <div class="col-lg-2">
        <h5 class="mt-1">Start At</h5>
      </div>
      <div class="col-lg-3">
        <datetime
          format="yyyy-MM-dd" class="form-control"
          v-model="filterStartAt" placeholder="Start At">
        </datetime>
      </div>
      <div class="col-lg-2">
        <h5 class="mt-1">End At</h5>
      </div>
      <div class="col-lg-3">
        <datetime
          format="yyyy-MM-dd" class="form-control"
          v-model="filterEndAt" placeholder="End At">
        </datetime>
      </div>
    </div>
    <!-- date filter end -->
    <!-- bitberry deposits table start -->
    <div class="row mt-4 table-responsive" v-if="deposits">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Event Type</th>
            <th scope="col">Category</th>
            <th scope="col">Status</th>
            <th scope="col">Currency Code</th>
            <th scope="col">Amount</th>
            <th scope="col">Target</th>
            <th scope="col">Created At</th>
            <th scope="col">From User ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(deposit, key) in deposits.items" :key="key">
            <td>{{ deposit.id }}</td>
            <td>{{ deposit.event_type }}</td>
            <td>{{ deposit.category }}</td>
            <td>{{ deposit.status }}</td>
            <td>{{ deposit.currency_code }}</td>
            <td>{{ deposit.amount }}</td>
            <td>{{ deposit.target }}</td>
            <td>{{ moment(deposit.created_at).format('YYYY-MM-DD') }}</td>
            <td>{{ deposit.from_user_id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row mt-2">
      <div class="col-lg-2 mx-auto">
        <button type="button" class="btn btn-block" @click="getMoreDeposits">
          Get more
        </button>
      </div>
    </div>
  </div>
  <!-- bitberry deposits table end -->
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
  mapActions
} from 'vuex'
export default {
  name: 'BitberryDepositManagement',
  data () {
    return {
      filterCategory: 'all',
      filterStartAt: '',
      filterEndAt: '',
      amount: '',
      phoneNumber: '',
      params: {count: 50, isGetMore: false},
      isLoading: false
    }
  },
  methods: {
    ...mapActions([
      'getBitberryWallet',
      'getBitberryDeposits',
      'sendBitberryAirdrop'
    ]),
    getDeposits () {
      this.isLoading = true
      this.isGetMore = false
      this.getBitberryDeposits(this.params).then(() => {
        this.isLoading = false
      })
    },
    filterDeposits () {
      if (this.filterCategory) {
        this.params.category = this.filterCategory
      }

      if (this.filterStartAt) {
        this.params.start_at = this.moment(this.filterStartAt)
          .format('YYYY-MM-DD') + 'T00:00:00+09:00'
      }

      if (this.filterEndAt) {
        this.params.end_at = this.moment(this.filterEndAt)
          .format('YYYY-MM-DD') + ' T23:59:59+09:00'
      }

      this.getDeposits()
    },
    getMoreDeposits () {
      if (!this.deposits.items.length) {
        return
      }
      this.params.cursor_id = this.deposits.items[this.deposits.items.length - 1].id
      this.params.isGetMore = true
      this.getDeposits()
    },
    sendAirdrop () {
      if (!this.amount) {
        this.$awn.alert('Please enter amount.')
        return
      }

      if (!this.phoneNumber) {
        this.$awn.alert('Please enter phone number.')
        return
      }

      this.isLoading = true

      this.sendBitberryAirdrop({
        amount: this.amount,
        phone_number: this.phoneNumber
      }).then(() => {
        if (
          !this.responseData ||
          !this.responseData.hasOwnProperty('status') ||
          !this.responseData.status === 'success'
        ) {
          this.$awn.alert('Sending failed.')
        } else {
          this.$awn.success('Successfully sent!')
        }

        this.isLoading = false
      })
    }
  },
  components: {
    Loading,
    datetime: Datetime
  },
  watch: {
    filterCategory () {
      this.filterDeposits()
    },
    filterStartAt () {
      this.filterDeposits()
    },
    filterEndAt () {
      this.filterDeposits()
    }
  },
  computed: {
    ...mapState({
      wallet: ({bitberry}) => bitberry.wallet,
      deposits: ({bitberry}) => bitberry.deposits,
      responseData: ({bitberry}) => bitberry.responseData
    })
  },
  created () {
    this.isLoading = true

    Promise.all([
      this.getBitberryWallet(),
      this.getBitberryDeposits(this.params)
    ]).then(() => {
      this.isLoading = false
    })
  }
}
</script>
