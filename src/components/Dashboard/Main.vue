<template>
  <div id="app-dashboard">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <table class="table text-center">
            <thead>
              <tr>
                <th scope="col">Total deposit</th>
                <th scope="col">Deposit amount</th>
                <th scope="col">Currently</th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-danger">
                <td>
                  <h3 class="font-weight-bold">25,252 ETH</h3>
                </td>
                <td>
                  <h3 class="font-weight-bold">20,151 ETH</h3>
                </td>
                <td>
                  <h3 class="font-weight-bold">18.451 ETH</h3>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
      <div class="row col-8 mt-4">
        <div class="col-6">
          <h5 class="font-weight-bold">
            Subscribers: 82
          </h5>
        </div>
        <div class="col-6">
          <h5 class="font-weight-bold">
            Deposit applicant: 55
          </h5>
        </div>
        <div class="col-6">
          <h5 class="font-weight-bold">
            Application fee: 1,559
          </h5>
        </div>
        <div class="col-6">
          <h5 class="font-weight-bold">
            KYC applicants: 49
          </h5>
        </div>
        <div class="col-6">
          <h5 class="font-weight-bold">
            Deposit amount: 1.25
          </h5>
        </div>
        <div class="col-6">
          <h5 class="font-weight-bold">
            KYC in progress: N people<br/>
            KYC approved: N people
          </h5>
        </div>
      </div>
      <div class="row col-8 mt-5">
        <div class="col-6">
          <h4 class="font-weight-bold">
            Day deposit: NNNN ETH
          </h4>
        </div>
        <div class="col-6">
          <h4 class="font-weight-bold">
            Confirm ETH: NNNN ETH
          </h4>
        </div>
      </div>
      <div class="row mt-4">
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
                <th scope="col">TxFee</th>
              </tr>
            </thead>
            <tbody>
              <tr :key="index" v-for="index in 10">
                <td class="text-primary">0xffd0c6bde2f41d78</td>
                <td class="text-muted">(pending)</td>
                <td class="text-muted">10 secs ago</td>
                <td class="text-primary">0x8b9ef17d32880a</td>
                <td class="border p-3 bg-success text-white">
                  <h6>IN</h6>
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
