<template>
  <div id="app-dashboard-editevent">
    <div class="container-fluid">
      <div class="row p-3">
        <div class="col">
          <h3 class="font-weight-bold">
            Event management
          </h3>
        </div>
      </div>
      <div class="row p-3">
        <div class="col-12" v-if="event">
          <form @submit.prevent="submit" novalidate>
            <h5 class="font-weight-bold mb-3 border-bottom pb-3">
              Edit Event
            </h5>
            <div class="row">
              <div class="col-lg-4">
                 <label for="event-title">Event Title</label>
                 <input type="text" class="form-control" id="event-title" v-model="eventTitle">
              </div>
              <div class="col-lg-4">
                 <label for="event-url">Event Url</label>
                 <input type="text" class="form-control" id="event-url" v-model="eventLink" required>
              </div>
              <div class="col-lg-8">
                 <label for="event-content">Event Content (KR)</label>
                 <textarea class="col-12" rows="15" id="event-content" v-model="eventContentKr"></textarea>
              </div>
              <div class="col-lg-8">
                 <label for="event-content">Event Content (EN)</label>
                 <textarea class="col-12" rows="15" id="event-content" v-model="eventContentEn"></textarea>
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
            <div class="row my-3">
              <div class="col-lg-2">
                <label for="use-comment">Use Comment</label>
              </div>
              <div class="col-lg-1 text-right lh-35">
                <toggle-button
                  :value="useComment"
                  :sync="true"
                  :labels="{checked: 'True', unchecked: 'False'}"
                  :width="65"
                  @change="selectToggle(useComment)" />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-lg-3">
                <button type="submit" class="btn btn-block">Submit</button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-12" v-else>
            <h2 class="text-center text-danger">Event not found</h2>
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
  name: 'DashboardEventManagementEdit',
  data () {
    return {
      eventTitle: '',
      eventLink: '',
      eventContentKr: '',
      eventContentEn: '',
      eventStartDate: '',
      eventEndDate: '',
      isLoading: false,
      useComment: false
    }
  },
  computed: {
    ...mapState({
      event: ({events}) => events.event,
      eventResponseData: ({events}) => events.responseData
    })
  },
  methods: {
    ...mapActions([
      'getEvent',
      'updateEvent'
    ]),
    selectToggle (value) {
      this.useComment = !value
    },
    submit () {
      if (!this.eventTitle) {
        this.$awn.alert('Please enter event title')
        return
      }

      if (!this.eventLink) {
        this.$awn.alert('Please enter event url')
        return
      }

      if (!this.eventContentKr && !this.eventContentEn) {
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

      this.updateEvent({
        idevent: this.id,
        url: this.eventLink,
        title: this.eventTitle,
        content: this.eventContentKr,
        content_en: this.eventContentEn,
        use_comment: this.useComment,
        startdate: this.eventStartDate,
        enddate: this.eventEndDate
      }).then(() => {
        this.isLoading = false

        if (!this.eventResponseData) {
          this.$awn.alert('Error fetching response data')
          return
        }

        this.$awn.success('Successfully updated an event')
      })
    }
  },
  props: ['id'],
  components: {
    Loading,
    datetime: Datetime
  },
  created () {
    this.isLoading = true
    this.getEvent(this.id).then(() => {
      if (this.event) {
        this.eventTitle = this.event.event.title
        this.eventLink = this.event.event.url
        this.eventContentKr = this.event.event.content
        this.eventContentEn = this.event.event.content_en
        this.eventStartDate = this.event.event.startdate.slice(0, 10)
        this.eventEndDate = this.event.event.enddate.slice(0, 10)
        this.useComment = this.event.event.use_comment
      }
      this.isLoading = false
    })
  }
}
</script>
