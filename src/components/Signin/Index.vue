<template>
  <div id="app-signin">
    <div class="container">
      <div class="row mt-5 justify-content-center">
        <div class="col-5 text-center p-5 border">
          <h1 class="display-5 font-weight-bold">
            DSION TOKEN
          </h1>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <form class="col-5">
          <div class="form-group">
            <input type="email" class="form-control" id="user_id" v-model="email" aria-describedby="email" placeholder="email placeholder">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="password" v-model="password" aria-describedby="password" placeholder="password placeholder">
          </div>
          <a href="#!" class="btn btn-block" @click="signin">login</a>
        </form>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="loading-parent">
                <loading :active.sync="isLoading"
                :is-full-page="true"></loading>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.min.css'
import {
  mapState,
  mapActions
} from 'vuex'

export default {
  name: 'Signin',
  components: {
    Loading
  },
  data () {
    return {
      email: '',
      password: '',
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      'responseData': ({users}) => users.responseData
    })
  },
  methods: {
    ...mapActions([
      'signinUser'
    ]),

    signin () {
      this.isLoading = true

      this.signinUser({
        email: this.email,
        password: this.password
      }).then(() => {
        this.isLoading = false
        if (this.responseData.message === 'login ok') {
          this.$session.start()
          this.$session.set('jwt', this.responseData.token)
          this.$router.push({ name: 'DashboardMain' })
        } else {
          this.$notify({
            group: 'signin',
            title: 'Invalid login',
            text: 'Neither email or password is invalid.'
          })
        }
      })
    }
  },
  created () {
    if (this.$session.exists()) {
      this.$router.push({ name: 'DashboardMain' })
    }
  }
}
</script>

<style lang='scss'>
  @import 'scss/pages/signin.scss';
</style>
