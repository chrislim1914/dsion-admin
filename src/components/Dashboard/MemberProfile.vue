<template>
  <div id="app-dashboard-memberprofile">
    <div class="container-fluid pb-5">
      <div class="row p-3">
        <div class="col-12">
          <h3 class="font-weight-bold">
            Membership
          </h3>
        </div>
      </div>
      <form>
        <!-- start first row -->
        <div class="row">
          <div class="col-6">
            <div class="form-group row">
              <label for="userid" class="col-sm-5 col-form-label">ID:</label>
              <div class="col-sm-7">
                <input type="text" class="form-control" id="userid" placeholder="user id">
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group row">
              <label for="responsible" class="col-sm-5 col-form-label">Responsible:</label>
              <div class="col-sm-7">
                <select class="form-control" id="responsible">
                  <option>Admin</option>
                  <option>Default</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <!-- end first row -->

        <!-- start second row -->
        <div class="row">
          <div class="col-6">
            <div class="form-group row">
              <label for="whatis" class="col-sm-5 col-form-label">What is:</label>
              <div class="col-sm-7">
                <input type="date" class="form-control" id="whatis">
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group row">
              <label for="kyc-application" class="col-sm-5 col-form-label">KYC Application:</label>
              <div class="col-sm-7">
                <input type="date" class="form-control" id="kyc-application">
              </div>
            </div>
          </div>
        </div>
        <!-- end second row -->

        <!-- start third row -->
        <div class="row">
          <div class="col-6">
            <div class="form-group row">
              <label for="cellphone" class="col-sm-5 col-form-label">Cellphone:</label>
              <div class="col-sm-7">
                <input type="number" class="form-control" id="cellphone">
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group row">
              <label for="kyc-progress" class="col-sm-5 col-form-label">KYC Progress:</label>
              <div class="col-sm-7">
                <input type="date" class="form-control" id="kyc-progress" placeholder="Extreme">
              </div>
            </div>
          </div>
        </div>
        <!-- end third row -->

        <!-- start fourth row -->
        <div class="row">
          <div class="col-6 invisible">

          </div>
          <div class="col-6">
            <div class="form-group row">
              <label for="refund-processing" class="col-sm-5 col-form-label">Refund Processing:</label>
              <div class="col-sm-7">
                <select class="form-control" id="refund-processing">
                  <option value="">Unpaid</option>
                  <option value="">In Progress</option>
                  <option value="">Complete</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <!-- end fourth row -->

        <!-- start fifth row -->
        <div class="row">
          <div class="col-10">
            <div class="form-group row">
              <label for="wallet-address" class="col-sm-2 col-form-label">Wallet Address:</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="wallet-address" v-model="wallet">
              </div>
            </div>
          </div>
          <div class="col-2">
            <a class="btn btn-light btn-sm btn-block" v-clipboard:copy="wallet" v-clipboard:success="onCopy" v-clipboard:error="onError">Copy</a>
          </div>
        </div>
        <!-- end fifth row -->

        <!-- start sixth row -->
        <div class="row">
          <div class="col-6">
            <div class="form-group row">
              <label for="estimated-amount" class="col-sm-5 col-form-label">Estimated amount:</label>
              <div class="col-sm-7">
                <input type="text" class="form-control" id="estimated-amount">
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group row">
              <label for="deposit-amount" class="col-sm-5 col-form-label">Deposit amount:</label>
              <div class="col-sm-7">
                <input type="text" class="form-control" id="deposit-amount">
              </div>
            </div>
          </div>
        </div>
        <!-- end sixth row -->

        <!-- start seventh row -->
        <div class="row">
          <div class="col-6">
            <div class="form-group row">
              <label for="participation-ico" class="col-sm-5 col-form-label">Participation ICO:</label>
              <div class="col-sm-7">
                <input type="text" class="form-control" id="participation-ico">
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group row">
              <label for="promotion" class="col-sm-5 col-form-label">Promotion:</label>
              <div class="col-sm-7">
                <input type="text" class="form-control" id="promotion">
              </div>
            </div>
          </div>
        </div>
        <!-- end seventh row -->

        <!-- start eight row -->
        <div class="row">
          <div class="col-6">
            <div class="form-group row">
              <label for="payment-token" class="col-sm-5 col-form-label">Payment token:</label>
              <div class="col-sm-7">
                <input type="text" class="form-control" id="payment-token">
              </div>
            </div>
          </div>
          <div class="col-6 invisible">

          </div>
        </div>
        <!-- end eight row -->

        <!-- start nineth row -->
        <div class="row">
          <div class="col-6">
            <div class="form-group row">
              <label for="bonus" class="col-sm-5 col-form-label">Bonus:</label>
              <div class="col-sm-7">
                <input type="text" class="form-control" id="bonus">
              </div>
            </div>
          </div>
          <div class="col-6 invisible">

          </div>
        </div>
        <!-- end nineth row -->

        <!-- start tenth row -->
        <div class="row">
          <div class="col-6">
            <div class="form-group row">
              <label for="total" class="col-sm-5 col-form-label">Total:</label>
              <div class="col-sm-7">
                <input type="text" class="form-control" id="total">
              </div>
            </div>
          </div>
          <div class="col-6 invisible">

          </div>
        </div>
        <!-- end tenth row -->

        <!-- start eleventh row -->
        <div class="row mt-5">
          <div class="col-6">
            <div class="form-group row">
              <label for="recommendation-count" class="col-sm-5 col-form-label">Recommendation count:</label>
              <div class="col-sm-7">
                <input type="text" class="form-control" id="recommendation-count">
              </div>
            </div>
          </div>
          <div class="col-6 invisible">

          </div>
        </div>
        <!-- end eleventh row -->

        <!-- start twelfth row -->
        <div class="row">
          <div class="col-6">
            <div class="form-group row">
              <label for="referral-bonus" class="col-sm-5 col-form-label">Bonus:</label>
              <div class="col-sm-7">
                <input type="text" class="form-control" id="referral-bonus">
              </div>
            </div>
          </div>
          <div class="col-6 invisible">

          </div>
        </div>
        <!-- end twelfth row -->

        <!-- start thirteenth row -->
        <div class="row">
          <div class="col-12">
            <div class="form-group row">
              <label for="memo" class="col-sm-2 col-form-label">Memo:</label>
              <div class="col-sm-10">
                <textarea class="form-control" id="memo" rows="12"></textarea>
              </div>
            </div>
          </div>
        </div>
        <!-- end thirteenth row -->

        <div class="row justify-content-center">
          <div class="col-3 text-right">
            <a class="btn btn-sm btn-block btn-light" @click="onCancel">Cancel</a>
          </div>
          <div class="col-3 text-left">
            <a class="btn btn-sm btn-block btn-light" @click="onSave">Save</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardMemberProfile',
  data () {
    return {
      userid: this.$route.query.userid,
      wallet: ''
    }
  },
  methods: {
    onCopy () {
      this.$awn.info('Wallet address copied.')
    },
    onError () {
      this.$awn.alert('Wallet address unable to copy.')
    },
    onCancel () {
      this.$modal.show('dialog', {
        title: 'Confirmation!',
        text: 'Do you want to cancel?',
        buttons: [
          {
            title: 'Yes',
            handler: () => { alert('Cancel') }
          },
          {
            title: 'Close'
          }
        ]
      })
    },
    onSave () {
      //
    }
  }
}
</script>
