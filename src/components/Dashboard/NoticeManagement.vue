<template>
  <div id="app-dashboard-notice-management">
    <div class="container-fluid">
      <div class="row p-3">
        <div class="col">
          <h3 class="font-weight-bold mb-3 border-bottom pb-3">
            Notice Management
          </h3>
        </div>
      </div>
      <div class="row mt-3" v-if="notices">
        <div class="col-lg-12">
          <table class="table table-responsive table-borderless">
            <thead>
              <tr>
                <th scope="col" style="width:10%">ID</th>
                <th scope="col" style="width:15%">Name</th>
                <th scope="col" style="width:50%">Email</th>
                <th scope="col" style="width:10%">Phone</th>
                <th scope="col" style="width:10%">Created At</th>
              </tr>
            </thead>
            <tbody>
              <tr :key="index" v-for="(notice, index) in notices.data">
                <td>
                  {{ notice.idapp }}
                </td>
                <td>
                  {{ notice.name }}
                </td>
                <td>
                  {{ notice.email }}
                </td>
                <td>
                  {{ notice.phone }}
                </td>
                <td>
                  {{ notice.created_at ? notice.created_at.slice(0, 10) : '' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- pagination start -->
      <div class="row mt-5">
          <uib-pagination
            v-if="notices"
            :total-items="parseInt(notices.total)"
            :items-per-page="parseInt(notices.per_page)"
            v-model="pagination"
            @change="getNoticesData"
            :max-size="10"
            :boundary-links="true"
            :force-ellipses="true"
            class="mx-auto"
          />
      </div>
      <!-- pagination end -->
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
  name: 'DashboardNoticeManagement',
  data () {
    return {
      pagination: { currentPage: 1 },
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      notices: ({notice}) => notice.notices
    })
  },
  methods: {
    ...mapActions([
      'getNotices'
    ]),
    getNoticesData () {
      this.isLoading = true
      this.getNotices({
        page: this.pagination.currentPage
      }).then(() => {
        this.isLoading = false
      })
    }
  },
  components: {
    Loading
  },
  created () {
    this.getNoticesData()
  }
}
</script>
