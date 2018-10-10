<template>
<div id="app-delete-kyc-modal">
  <modal name="delete-kyc-modal" :adaptive="true" height="auto" @before-open="beforeOpen">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Delete KYC</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Are you going to delete KYC?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn px-5" @click="confirmDeleteMembers">Yes</button>
        <button type="button" class="btn px-5 mx-2" @click="closeModal">No</button>
      </div>
    </div>
  </modal>
</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'DeleteKycModal',
  data () {
    return {
      memberIds: [],
      isLoading: false
    }
  },
  methods: {
    ...mapActions([
      'deleteMembers'
    ]),
    closeModal () {
      this.$modal.hide('delete-kyc-modal')
    },
    beforeOpen (e) {
      this.memberIds = e.params.memberIds
    },
    confirmDeleteMembers () {
      this.isLoading = true
      this.deleteMembers({idkyc: this.memberIds}).then(() => {
        if (this.membersResponseData.result) {
          this.$awn.success('Successfully deleted KYC')
        } else {
          this.$awn.alert('Error deleting KYC')
        }
        this.closeModal()
        this.isLoading = false
        location.reload()
      })
    }
  },
  computed: {
    ...mapState({
      membersResponseData: ({members}) => members.responseData
    })
  }
}
</script>

<style lang='scss'>
</style>
