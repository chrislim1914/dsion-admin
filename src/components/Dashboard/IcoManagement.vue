<template>
  <div id="app-dashboard-icomanagement">
    <div class="container mb-5">
      <div class="row">
        <div class="col-12">
          <h3 class="font-weight-bold">
            ICO Settings
          </h3>
        </div>
      </div>
      <div class="row col-7">
        <div class="col">
          <a href="#!" class="btn btn-light btn-block">Private</a>
        </div>
        <div class="col">
          <a href="#!" class="btn btn-light btn-block">Free 1</a>
        </div>
        <div class="col">
          <a href="#!" class="btn btn-light btn-block">Free 2</a>
        </div>
        <div class="col">
          <a href="#!" class="btn btn-light btn-block">Public</a>
        </div>
      </div>
      <div class="row col-8 mt-3">
        <div class="col">
          <h6>
            Start time
          </h6>
        </div>
        <div class="col">
          <input type="number" class="form-control text-center" id="start_year" placeholder="YYYY">
        </div>
        <div class="col">
          <input type="number" class="form-control text-center" id="start_month" placeholder="MM">
        </div>
        <div class="col">
          <input type="number" class="form-control text-center" id="start_date" placeholder="DD">
        </div>
        <div class="col">
          <input type="number" class="form-control text-center" id="start_hour" placeholder="HH">
        </div>
      </div>
      <div class="row col-8 mt-3">
        <div class="col">
          <h6>
            End time
          </h6>
        </div>
        <div class="col">
          <input type="number" class="form-control text-center" id="end_year" placeholder="YYYY">
        </div>
        <div class="col">
          <input type="number" class="form-control text-center" id="end_month" placeholder="MM">
        </div>
        <div class="col">
          <input type="number" class="form-control text-center" id="end_date" placeholder="DD">
        </div>
        <div class="col">
          <input type="number" class="form-control text-center" id="end_hour" placeholder="HH">
        </div>
      </div>
      <div class="row col-4 mt-3">
        <div class="col-5">
          <h6>
            bonus
          </h6>
        </div>
        <div class="col">
          <input type="number" class="form-control text-right" id="bonus" placeholder="%">
        </div>
      </div>
      <div class="row col-4 mt-3">
        <div class="col-5">
          <h6>
            referral bonus
          </h6>
        </div>
        <div class="col">
          <input type="number" class="form-control text-right" id="referral_bonus" placeholder="%">
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12">
          <a href="#!" class="btn btn-light btn-block">Save</a>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <h3 class="font-weight-bold">
            Video settings
          </h3>
        </div>
        <div class="col-10">
          <input type="text" class="form-control form-control-sm" id="video_url" placeholder="www.youtube.com/watch?v=FMKlliUYyB8">
        </div>
        <div class="col-2">
          <a href="#!" class="btn btn-light btn-block">Save</a>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <h3 class="font-weight-bold">
            Article Management
          </h3>
        </div>
        <div class="col-12">
          <table class="table text-center">
            <thead>
              <tr>
                <th scope="col">
                  <input type="checkbox" checked disabled>
                </th>
                <th scope="col">title</th>
                <th scope="col">media</th>
                <th scope="col">registration date</th>
                <th scope="col">link</th>
              </tr>
            </thead>
            <tbody>
              <tr :key="index" v-for="index in 10">
                <td class="text-primary">
                  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                </td>
                <td class="text-muted">article title</td>
                <td class="text-muted">article media</td>
                <td class="text-muted">2018-08-07</td>
                <td class="text-muted">http://www.naver.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <a href="#!" class="btn btn-light">
            delete
          </a>
        </div>
        <div class="col d-flex justify-content-end">
          <a href="#!" class="btn btn-light">
            new registration
          </a>
        </div>
      </div>
      <form class="mt-4">
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">title</label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-control-sm" id="title">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">media</label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-control-sm" id="media">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">link</label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-control-sm" id="link" placeholder="https://charityblockchain.io/">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">contents</label>
          <div class="col-sm-10">
            <textarea class="form-control" id="contents" rows="10"></textarea>
          </div>
        </div>
      </form>
      <div class="row mt-5">
        <div class="col-12">
          <h4 class="font-weight-bold">
            Promotion Key Generation
          </h4>
        </div>
        <div class="col-8">
          <input type="text" class="form-control form-control-sm" id="media" placeholder="www.youtube.com/watch?v=FMKlliUYyB8">
        </div>
        <div class="col-2">
          <a href="#!" class="btn btn-light btn-block">produce</a>
        </div>
        <div class="col-2">
          <a href="#!" class="btn btn-light btn-block">copy</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardIcoManagement',
  data () {
    return {

    }
  }
}
</script>

<style lang='scss'>
  * {
    margin: 0;
    padding: 0;
  }

  .debugger {
    border: 2px solid red;
  }
</style>
