<template>
<div id="app-dashboard-bitberry-deposit-management">
  <!-- .container-fluid start -->
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
        <h5 class="font-weight-bold text-danger" v-else>
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
    <div class="row mt-4 table-responsive" v-if="entries">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Event Type</th>
            <th scope="col">Category</th>
            <th scope="col">Status</th>
            <th scope="col">Currency Code</th>
            <th scope="col">Amount</th>
            <th scope="col">Description</th>
            <th scope="col">Created At</th>
            <th scope="col">From User ID</th>
            <th scope="col">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, key) in entries.items" :key="key">
            <td>{{ entry.id }}</td>
            <td>{{ entry.event_type }}</td>
            <td>{{ entry.category }}</td>
            <td>{{ entry.status }}</td>
            <td>{{ entry.currency_code }}</td>
            <td>{{ entry.amount }}</td>
            <td>{{ entry.description }}</td>
            <td>{{ moment(entry.created_at).format('YYYY-MM-DD') }}</td>
            <td>{{ entry.from_user_id }}</td>
            <td>{{ entry.phone_number }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- bitberry deposits table end -->
    <!-- get more start -->
    <div class="row mt-2">
      <div class="col-lg-2 mx-auto">
        <button type="button" class="btn btn-block" @click="getMoreEntries">
          Get more
        </button>
      </div>
    </div>
    <!-- get more end -->
  </div>
  <!-- .container-fluid end -->
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
      'getEthWallet',
      'getEthEntries',
      'sendEthAirdrop'
    ]),
    getEntries () {
      this.isLoading = true
      this.isGetMore = false
      this.getEthEntries(this.params).then(() => {
        this.isLoading = false
      })
    },
    filterEntries () {
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

      this.getEntries()
    },
    getMoreEntries () {
      if (!this.entries.items.length) {
        return
      }
      this.params.cursor_id = this.entries.items[this.entries.items.length - 1].id
      this.params.isGetMore = true
      this.getEntries()
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

      this.sendEthAirdrop({
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
      this.filterEntries()
    },
    filterStartAt () {
      this.filterEntries()
    },
    filterEndAt () {
      this.filterEntries()
    }
  },
  computed: {
    ...mapState({
      wallet: ({bitberry}) => bitberry.ethWallet,
      entries: ({bitberry}) => bitberry.ethEntries,
      responseData: ({bitberry}) => bitberry.responseData
    })
  },
  created () {
    this.isLoading = true

    Promise.all([
      this.getEthWallet(),
      this.getEthEntries(this.params)
    ]).then(() => {
      this.isLoading = false
    })
  }
}
</script>
