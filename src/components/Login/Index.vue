<template>
  <div id="app-login">
    <div class="container">
      <div class="row mt-5 justify-content-center">
        <div class="col-md-5 text-center py-5 border bg-dark">
          <img src="~images/dsion.png" alt="Dsion logo">
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <form class="col-md-5" @submit.prevent="login">
          <div class="form-group">
            <input type="text" class="form-control" id="user_id" v-model="userId" aria-describedby="text" placeholder="Please enter your ID">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="password" v-model="password" aria-describedby="password" placeholder="Please enter your PW">
          </div>
          <button type="submit" class="btn btn-block">Login</button>
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
  name: 'Login',
  components: {
    Loading
  },
  data () {
    return {
      userId: '',
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
      'loginUser',
      'fetchUserInfo'
    ]),
    login () {
      this.isLoading = true

      this.loginUser({
        iduser: this.userId,
        password: this.password
      }).then(() => {
        this.isLoading = false
        if (this.responseData.result) {
          this.isLoading = true
          const tokenHolder = this.responseData.token
          this.fetchUserInfo({
            token: tokenHolder
          }).then(() => {
            this.isLoading = false
            this.$session.start()
            this.$session.set('jwt', tokenHolder)
            this.$session.set('admin', this.responseData)
            this.$router.push({ name: 'DashboardMain' })
          })
        } else {
          this.$awn.alert('Invalid user id or password')
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
  @import 'scss/pages/login.scss';
</style>
