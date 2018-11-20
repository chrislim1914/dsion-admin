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
            <input type="file" ref="phoneNumberList">
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
export default {
  name: 'DashboardDsionAirdrop',
  data () {
    return {
      airdropAmount: '',
      isLoading: false
    }
  },
  components: {
    Loading
  },
  methods: {
    submit () {
      if (!this.airdropAmount) {
        this.$awn.alert('Please enter airdrop amount')
        return
      }

      if (this.$refs.phoneNumberList.files.length === 0) {
        this.$awn.alert('Please import excel file')
        return
      }
      // TODO: Interate send airdrop api
      alert('Send function will be added soon.')
    }
  }
}
</script>
