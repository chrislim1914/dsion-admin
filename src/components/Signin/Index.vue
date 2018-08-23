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
            <input type="text" class="form-control" id="user_id" aria-describedby="user_id" placeholder="id placeholder">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="password" aria-describedby="password" placeholder="password placeholder">
          </div>
          <button type="submit" class="btn btn-block">login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signin'
}
</script>

<style lang='scss'>
  @import 'scss/pages/signin.scss';
</style>
