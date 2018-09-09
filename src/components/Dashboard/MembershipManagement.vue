<template>
    <div id="app-dashboard-membershipmanagement">
      <div class="container p-4">
        <div class="row">
          <div class="col-12">
            <h5 class="font-weight-bold">
              Membership
            </h5>
          </div>
        </div>

        <!-- start first filter -->
        <div class="row">
          <div class="col">
            <a href="#!" class="btn btn-light btn-block">View all</a>
          </div>
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
        <!-- end first filter -->

        <!-- start second filter -->
        <div class="row mt-3">
          <div class="col">
            <a href="#!" class="btn btn-light btn-block">View all</a>
          </div>
          <div class="col">
            <a href="#!" class="btn btn-light btn-block">KYC Approved</a>
          </div>
          <div class="col">
            <a href="#!" class="btn btn-light btn-block">KYC in progress</a>
          </div>
          <div class="col">
            <a href="#!" class="btn btn-light btn-block">KYC not entered</a>
          </div>
          <div class="col">
            <a href="#!" class="btn btn-light btn-block">KYC rejection</a>
          </div>
        </div>
        <!-- end second filter -->

        <!-- start third filter -->
        <div class="row mt-3">
          <div class="col">
            <input type="number" class="form-control" id="estimated-amount" placeholder="Estimated amount">
          </div>
          <div class="col">
            <input type="number" class="form-control" id="above-below" placeholder="Above / below">
          </div>
          <div class="col">
            <input type="number" class="form-control" id="eth" placeholder="ETH">
          </div>
          <div class="col">
            <a href="#!" class="btn btn-light btn-block">Search</a>
          </div>
        </div>
        <!-- end third filter -->

        <!-- start fourth filter -->
        <div class="row mt-3">
          <div class="col-3">
            <select class="form-control" id="date-of-application">
              <option>Date of application</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div class="col-2">
            <input type="text" class="form-control" id="start-date" placeholder="Start date">
          </div>
          <div class="col-1 align-self-center">
            <h6>~</h6>
          </div>
          <div class="col-2">
            <input type="text" class="form-control" id="end-date" placeholder="End date">
          </div>
          <div class="col-2">
            <input type="text" class="form-control" id="id-search" placeholder="ID search">
          </div>
          <div class="col-2">
            <a href="#!" class="btn btn-light btn-block">Search</a>
          </div>
        </div>
        <!-- end fourth filter -->

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
                  Save list to excel
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
  name: 'DashboardMembershipManagement'
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
