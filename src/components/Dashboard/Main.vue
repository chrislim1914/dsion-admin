<template>
  <div id="app-dashboard">
    <div class="container bg-light p-4">
      <div class="row">
        <div class="col-12">
          <h5 class="font-weight-bold">
            Membership
          </h5>
        </div>
      </div>
      <div class="row">
        <div class="col-2">
          <select class="custom-select">
            <option selected>Date of application</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="col-2">
          <select class="custom-select">
            <option selected>No entry/approval</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="col-2">
          <input type="text" class="form-control" id="start" aria-describedby="start" placeholder="placeholder">
        </div>
        <div class="col-1">
          <h4 class="text-center">-</h4>
        </div>
        <div class="col-2">
          <input type="text" class="form-control" id="start" aria-describedby="start" placeholder="placeholder">
        </div>
        <div class="col-3">
          <a href="#!" class="btn btn-block" id="search">
            Search
          </a>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-6">
          <div class="row">
            <div class="col-5">
              <a href="#!" class="btn" id="save-kyc-info">
                Save KYC information
              </a>
            </div>
            <div class="col-5">
              <a href="#!" class="btn" id="save-excel">
                Id information save excel
              </a>
            </div>
          </div>
        </div>
        <div class="col-6 text-right">
          <div class="row justify-content-end">
            <div class="col-5">
              <input type="text" class="form-control" id="start" aria-describedby="start" placeholder="id placeholder">
            </div>
            <div class="col-4">
              <a href="#!" class="btn btn-block" id="search">
                search
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <table class="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">full id</th>
              <th scope="col">mobile phone number</th>
              <th scope="col">enter eth address</th>
              <th scope="col">scheduled deposit amount</th>
              <th scope="col">deposit kyc status</th>
              <th scope="col">charge manager refund</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="index" v-for="index in 10">
              <td>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="autoSizingCheck2">
                </div>
              </td>
              <td>2018-08-02</td>
              <td>dsion</td>
              <td>22857428</td>
              <td>left blank</td>
              <td>50ETH</td>
              <td>50ETH</td>
              <td>approved</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardMain'
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
