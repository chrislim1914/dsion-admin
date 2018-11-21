<template>
  <div id="app-dashboard-dsion-airdrop">
    <!-- form start -->
    <form @submit.prevent="submit">
      <div class="container-fluid">
        <div class="row p-3">
          <div class="col">
            <h3 class="font-weight-bold mb-3 border-bottom pb-3">
              Dsion Airdrop
            </h3>
          </div>
        </div>
        <div class="row p-3">
          <div class="col-lg-2">
            <h5>Phone number list</h5>
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
          <div class="col-lg-2">
            <h5>Airdrop amount</h5>
          </div>
          <div class="col-lg-3">
            <input type="number" class="form-control" v-model="airdropAmount">
          </div>
        </div>
        <div class="row p-3">
          <div class="col-lg-2">
            <button type="submit" class="btn btn-block">Send</button>
          </div>
        </div>
      </div>
    </form>
    <!-- form end -->
    <!-- loading start -->
    <loading :active.sync="isLoading" :is-full-page="true">
    </loading>
    <!-- loading end -->
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import {mapActions, mapState} from 'vuex'
export default {
  name: 'DashboardDsionAirdrop',
  data () {
    return {
      airdropAmount: '',
      phoneNumberList: '',
      isLoading: false
    }
  },
  components: {
    Loading
  },
  methods: {
    ...mapActions([
      'importAirdrop'
    ]),
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
        if (this.responseData && this.responseData.result) {
          this.$awn.success('Dsion airdrop successfully sent!')
        } else {
          this.$awn.alert('Dsion airdrop failed to send.')
        }

        this.phoneNumberList.value = ''
        this.airdropAmount = ''
        this.isLoading = false
      })
    }
  },
  computed: {
    ...mapState({
      responseData: ({airdrop}) => airdrop.responseData
    })
  }
}
</script>
