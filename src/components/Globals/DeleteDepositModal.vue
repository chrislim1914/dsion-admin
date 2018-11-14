<template>
<div id="app-delete-deposit-modal">
  <modal name="delete-deposit-modal" :adaptive="true" height="auto" @before-open="beforeOpen">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Delete Deposit</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to delete deposit?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn px-5" @click="confirmDeleteDeposit">Yes</button>
        <button type="button" class="btn px-5 mx-2" @click="closeModal">No</button>
      </div>
    </div>
  </modal>
</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'DeleteDepositModal',
  data () {
    return {
      depositIds: [],
      isLoading: false
    }
  },
  methods: {
    ...mapActions([
      'deleteDeposits'
    ]),
    closeModal () {
      this.$modal.hide('delete-deposit-modal')
    },
    beforeOpen (e) {
      this.depositIds = e.params.depositIds
    },
    confirmDeleteDeposit () {
      this.isLoading = true
      this.deleteDeposits({iddeposit: this.depositIds}).then(() => {
        if (this.depositResponseData.result) {
          this.$awn.success('Successfully deleted deposit')
        } else {
          this.$awn.alert('Error deleting deposit')
        }
        this.closeModal()
        this.isLoading = false
        location.reload()
      })
    }
  },
  computed: {
    ...mapState({
      depositResponseData: ({deposit}) => deposit.responseData
    })
  }
}
</script>
