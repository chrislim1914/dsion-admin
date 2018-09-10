<template>
  <div id="app-dashboard-depositmanagement">
    <div class="container">
      <div class="row p-3">
        <div class="col">
          <h5 class="font-weight-bold">
            Deposit management
          </h5>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <input type="text" class="form-control" id="deposit-amount" placeholder="deposit amount/amount of withdrawal">
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <input type="text" class="form-control" id="above-below" placeholder="above / below">
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="row">
            <div class="col">
              <div class="form-group">
                <input type="date" class="form-control" id="start-date" placeholder="start date">
              </div>
            </div>~
            <div class="col">
              <div class="form-group">
                <input type="date" class="form-control" id="end-date" placeholder="end date">
              </div>
            </div>
            <div class="col">
              <a href="#!" class="btn btn-block btn-light">Search</a>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-2">
          <a href="#!" class="btn btn-light btn-block">View all</a>
        </div>
        <div class="col-2">
          <a href="#!" class="btn btn-light btn-block">Private</a>
        </div>
        <div class="col-2">
          <a href="#!" class="btn btn-light btn-block">Free 1</a>
        </div>
        <div class="col-2">
          <a href="#!" class="btn btn-light btn-block">Free 2</a>
        </div>
        <div class="col-2">
          <a href="#!" class="btn btn-light btn-block">Public</a>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-6">
          <h4 class="font-weight-bold">
            Deposit amount: <span class="text-danger">NNNNN</span> ETH
          </h4>
        </div>
        <div class="col-6">
          <h4 class="font-weight-bold">
            Total deposit amount: <span class="text-danger">NNNNN</span> ETH
          </h4>
        </div>
        <div class="col-6">
          <h4 class="font-weight-bold">
            Withdrawal amount: <span class="text-danger">NNNNN</span> ETH
          </h4>
        </div>
        <div class="col-6">
          <h4 class="font-weight-bold">
            Total withdrawal amount: <span class="text-danger">NNNNN</span> ETH
          </h4>
        </div>
        <div class="col-6">
          <h4 class="font-weight-bold">
            Pending: <span class="text-danger">NNNNN</span> ETH
          </h4>
        </div>
        <div class="col-6">
          <h4 class="font-weight-bold">
            Total balance by period: <span class="text-danger">NNNNN</span> ETH
          </h4>
        </div>
        <div class="col-12">
          <div class="dropdown-divider"></div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <h4 class="font-weight-bold">
            Day deposit: <span class="text-danger">NNNNN</span> ETH
          </h4>
        </div>
        <div class="col-6">
          <h4 class="font-weight-bold">
            Confirm ETH: <span class="text-danger">NNNNN</span> ETH
          </h4>
        </div>
        <div class="col-12">
          <table class="table table-borderless">
            <thead>
              <tr>
                <th scope="col">TxHash</th>
                <th scope="col">Block</th>
                <th scope="col">Age</th>
                <th scope="col">From</th>
                <th scope="col"></th>
                <th scope="col">To</th>
                <th scope="col">Value</th>
                <th scope="col" class="text-muted">[TxFee]</th>
              </tr>
            </thead>
            <tbody>
              <tr :key="index" v-for="index in 10">
                <td class="text-primary">
                  <router-link to="/">
                    0xffd0c6bde2f41d78
                  </router-link>
                </td>
                <td>
                  <small class="font-italic text-muted">
                    (pending)
                  </small>
                </td>
                <td>
                  <small class="font-italic text-muted">
                    10 secs ago
                  </small>
                </td>
                <td class="text-primary">
                  <router-link to="/">
                    0xffd0c6bde2f41d78
                  </router-link>
                </td>
                <td class="text-center">
                  <h6 class="font-italic bg-success rounded text-white p-1">
                    <small>IN</small>
                  </h6>
                </td>
                <td class="text-muted">0xe530441f4f73bdb</td>
                <td class="text-muted">0 Ether</td>
                <td class="text-muted">(pending)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardDepositManagement'
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
