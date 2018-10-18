<template>
  <div id="app-dashboard-eventmanagement">
    <div class="container-fluid">
      <div class="row p-3">
        <div class="col">
          <h3 class="font-weight-bold">
            Event management
          </h3>
        </div>
      </div>
      <div class="row p-3">
        <div class="col-12">
          <form @submit.prevent="submit" novalidate>
            <h5 class="font-weight-bold mb-3 border-bottom pb-3">
              Create Event
            </h5>
            <div class="row">
              <div class="col-lg-8">
                 <label for="event-title">Event Title</label>
                 <input type="text" class="form-control" id="event-title" v-model="eventTitle">
              </div>
              <div class="col-lg-8">
                 <label for="event-content">Event Content</label>
                 <textarea class="col-12" rows="15" id="event-content" v-model="eventContent"></textarea>
              </div>
              <div class="col-lg-4"></div>
              <div class="col-lg-4">
                 <label for="event-start-date">Start Date</label>
                 <datetime format="yyyy-MM-dd" class="form-control" id="event-start-date" v-model="eventStartDate"></datetime>
              </div>
              <div class="col-lg-4">
                 <label for="event-end-date">End Date</label>
                 <datetime format="yyyy-MM-dd" class="form-control" id="event-end-date" v-model="eventEndDate"></datetime>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-3">
                <button type="submit" class="btn btn-block mt-4">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row p-3">
        <div class="col-12">
          <h5 class="font-weight-bold mb-3 border-bottom pb-3">
            Event List
          </h5>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-lg-12">
          <table class="table table-responsive table-borderless">
            <thead>
              <tr>
                <th>Row</th>
                <th scope="col">Title</th>
                <th scope="col">Create Date</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Comment Count</th>
              </tr>
            </thead>
            <tbody>
              <tr :key="index" v-for="(event, index) in events" v-if="events">
                <td>
                  {{ events.length - index }}
                </td>
                <td>
                  <router-link :to="{ name: 'DashboardEventManagementEdit', params: { id: event.idevent }}">{{ event.title }}</router-link>
                </td>
                <td>
                  {{ event.createdate ? event.createdate.slice(0, 10) : '' }}
                </td>
                <td>
                  {{ event.startdate ? event.startdate.slice(0, 10) : '' }}
                </td>
                <td>
                  {{ event.enddate ? event.enddate.slice(0, 10) : '' }}
                </td>
                <td>
                  <router-link :to="{ name: 'DashboardEventManagementComments', params: { id: event.idevent }}">
                    {{ event.comment_count }}
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- loading start -->
    <loading :active.sync="isLoading" :is-full-page="true">
    </loading>
    <!-- loading end -->
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay'
import { Datetime } from 'vue-datetime'
import {mapState, mapActions} from 'vuex'
export default {
  name: 'DashboardEventManagement',
  data () {
    return {
      eventTitle: '',
      eventContent: '',
      eventStartDate: '',
      eventEndDate: '',
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      events: ({events}) => events.events,
      eventResponseData: ({events}) => events.responseData
    })
  },
  methods: {
    ...mapActions([
      'getEvents',
      'createEvent'
    ]),
    submit () {
      if (!this.eventTitle) {
        this.$awn.alert('Please enter event title')
        return
      }

      if (!this.eventContent) {
        this.$awn.alert('Please enter event content')
        return
      }

      if (!this.eventStartDate) {
        this.$awn.alert('Please enter start date')
        return
      }

      if (!this.eventEndDate) {
        this.$awn.alert('Please enter end date')
        return
      }

      if (this.eventStartDate >= this.eventEndDate) {
        this.$awn.alert('Please enter valid event date')
        return
      }

      this.isLoading = true

      this.createEvent({
        title: this.eventTitle,
        content: this.eventContent,
        startdate: this.eventStartDate,
        enddate: this.eventEndDate
      }).then(() => {
        this.isLoading = false

        if (!this.eventResponseData) {
          this.$awn.alert('Error fetching response data')
          return
        }

        if (this.eventResponseData.result) {
          this.$awn.success('Successfully created event')
          this.getEvents()
          this.eventTitle = ''
          this.eventContent = ''
          this.eventStartDate = ''
          this.eventEndDate = ''
        } else {
          this.$awn.alert(this.depositResponseData.message)
        }
      })
    }
  },
  components: {
    Loading,
    datetime: Datetime
  },
  created () {
    this.isLoading = true
    this.getEvents().then(() => {
      this.isLoading = false
    })
  }
}
</script>
