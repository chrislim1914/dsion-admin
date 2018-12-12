<template>
  <div id="app-dashboard-dsion-airdrop">
    <!-- .container-fluid start -->
    <div class="container-fluid">
      <div class="row p-3">
        <div class="col">
          <h3 class="font-weight-bold mb-3 border-bottom pb-3">
            Dsion Airdrop
          </h3>
        </div>
      </div>
      <!-- balance start -->
      <div class="row p-3">
        <div class="col-lg-3">
          <h4 class="font-weight-bold">Balance</h4>
        </div>
        <div class="col-lg-3">
          <h4 class="font-weight-bold text-danger" v-if="wallet">
            {{ wallet.balance }} DSN
          </h4>
          <h5 v-else>
            0
          </h5>
        </div>
      </div>
      <!--balance end -->
      <!-- airdrop form start -->
      <form @submit.prevent="submit">
          <div class="row p-3">
            <div class="col-lg-3">
              <h5>Phone number list</h5>
              <small class="text-danger">* Phone numbers limit is 200.</small><br>
              <small class="text-danger">* Please clear formatting before importing excel file.</small>
            </div>
            <div class="col-lg-3">
              <input type="file"
                ref="phoneNumberList"
                accept="application/vnd.ms-excel,
                application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              >
            </div>
          </div>
          <div class="row p-3">
            <div class="col-lg-3">
              <h5>Airdrop amount</h5>
            </div>
            <div class="col-lg-3">
              <input type="number" class="form-control" v-model="airdropAmount">
            </div>
          </div>
          <div class="row p-3">
            <div class="col-lg-3">
              <button type="submit" class="btn btn-block">Send</button>
            </div>
          </div>
        </form>
      <!-- airdrop form end -->
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
import {mapActions, mapState} from 'vuex'
export default {
  name: 'DashboardDsionAirdrop',
  data () {
    return {
      airdropAmount: '',
      phoneNumberList: '',
      filterCategory: 'all',
      filterStartAt: '',
      filterEndAt: '',
      params: {count: 50, isGetMore: false},
      isLoading: false
    }
  },
  components: {
    Loading,
    datetime: Datetime
  },
  methods: {
    ...mapActions([
      'getDsionWallet',
      'getDsionEntries',
      'importAirdrop'
    ]),
    getEntries () {
      this.isLoading = true
      this.isGetMore = false
      this.getDsionEntries(this.params).then(() => {
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
    submit () {
      this.phoneNumberList = this.$refs.phoneNumberList

      if (this.phoneNumberList.files.length === 0) {
        this.$awn.alert('Please import excel file.')
        return
      }

      if (!this.airdropAmount) {
        this.$awn.alert('Please enter airdrop amount.')
        return
      }

      this.isLoading = true

      const formData = new FormData()
      formData.append('phoneList', this.phoneNumberList.files[0])
      formData.append('amount', this.airdropAmount)

      this.importAirdrop(formData).then(() => {
        if (!this.responseData || !this.responseData.hasOwnProperty('result')) {
          this.$awn.alert('Dsion airdrop failed to send.')
          this.isLoading = false
          return
        }

        if (!this.responseData.result) {
          this.$awn.alert('Error: ' + this.responseData.message)
          this.isLoading = false
          return
        }

        this.$awn.success('Dsion airdrop successfully sent!')
        this.phoneNumberList.value = ''
        this.airdropAmount = ''
        this.isLoading = false
      })
    }
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
      wallet: ({bitberry}) => bitberry.dsionWallet,
      entries: ({bitberry}) => bitberry.dsionEntries,
      responseData: ({airdrop}) => airdrop.responseData
    })
  },
  created () {
    this.isLoading = true

    Promise.all([
      this.getDsionWallet(),
      this.getDsionEntries(this.params)
    ]).then(() => {
      this.isLoading = false
    })
  }
}
</script>
