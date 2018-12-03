<template>
  <div id="app-dashboard-event-management-comments">
    <div class="container-fluid px-0">
      <div class="row p-3">
        <div class="col">
          <h3 class="font-weight-bold">
            Event management
          </h3>
        </div>
      </div>
      <div class="row p-3 border-bottom">
        <div class="col-12">
          <h5 class="font-weight-bold">
            {{ eventTitle }} - Comments
          </h5>
        </div>
      </div>
      <div class="row p-3">
        <div class="col-lg-3 my-3 mb-lg-0">
          <button type="button" class="btn btn-block" @click="exportComments">
            Save Comments
          </button>
        </div>
      </div>
      <div class="row mt-3" v-if="comments">
        <div class="col-lg-12">
          <table class="table table-responsive table-borderless">
            <thead>
              <tr>
                <th>Row</th>
                <th scope="col">Email</th>
                <th scope="col">Content</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Created At</th>
              </tr>
            </thead>
            <tbody>
              <tr :key="index" v-for="(comment, index) in comments.data">
                <td>
                  {{ comments.total - (((comments.current_page -1) * comments.per_page) + index ) }}
                </td>
                <td>
                  {{ comment.email }}
                </td>
                <td style="width: 65%;">
                  {{ comment.content }}
                </td>
                <td>
                  {{ comment.phone_number }}
                </td>
                <td>
                  {{ comment.created_at }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row mt-3" v-else>
          <div class="col-12">
            <h2 class="text-center text-danger">Comments not found</h2>
          </div>
      </div>
      <!-- pagination start -->
      <div class="row mt-5">
          <uib-pagination
            v-if="comments"
            :total-items="parseInt(comments.total)"
            :items-per-page="parseInt(comments.per_page)"
            v-model="pagination"
            @change="getCommentsData"
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
import {eventApi} from '@/api'
export default {
  name: 'DashboardEventManagement',
  data () {
    return {
      eventTitle: '',
      isLoading: false,
      pagination: { currentPage: 1 }
    }
  },
  computed: {
    ...mapState({
      event: ({events}) => events.event,
      comments: ({events}) => events.comments
    })
  },
  methods: {
    ...mapActions([
      'getEvent',
      'getComments'
    ]),
    getCommentsData () {
      this.isLoading = true
      this.getComments({
        eventId: this.id,
        page: this.pagination.currentPage
      }).then(() => {
        this.isLoading = false
      })
    },
    exportComments () {
      window.open(eventApi.exportComments, '_blank')
    }
  },
  props: ['id'],
  components: {
    Loading
  },
  created () {
    this.isLoading = true
    this.getEvent(this.id).then(() => {
      this.eventTitle = this.event.event.title
      this.getCommentsData()
    })
  }
}
</script>
