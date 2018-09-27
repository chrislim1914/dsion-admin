<template>
  <div id="app-dashboard-tokenmanagement">
    <div class="container-fluid">
      <div class="row p-3">
        <div class="col-12">
          <h3 class="font-weight-bold">
            Bonus Amount
          </h3>
        </div>
        <div class="col-12">
          <h3 class="font-weight-bold">
            Total Bonus: <span class="text-danger">NNNNN</span> Token
          </h3>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <a href="#!" class="btn btn-light btn-block">
            View all
          </a>
        </div>
        <div class="col">
          <a href="#!" class="btn btn-light btn-block">
            Private
          </a>
        </div>
        <div class="col">
          <a href="#!" class="btn btn-light btn-block">
            Free 1
          </a>
        </div>
        <div class="col">
          <a href="#!" class="btn btn-light btn-block">
            Free 2
          </a>
        </div>
        <div class="col">
          <a href="#!" class="btn btn-light btn-block">
            Public
          </a>
        </div>
        <div class="col">
          <input type="text" class="form-control" id="idbox" placeholder="ID Search">
        </div>
        <div class="col">
          <a href="#!" class="btn btn-light btn-block">
            Search
          </a>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <table class="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">ID</th>
                <th scope="col">Contribute</th>
                <th scope="col">Participation ICO</th>
                <th scope="col">Promotion</th>
                <th scope="col">Bonus paid</th>
                <th scope="col">Remarks</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr :key="index" v-for="index in 10">
                <td class="text-muted">2018-08-02</td>
                <td class="text-muted">dsion</td>
                <td class="text-muted">{{ index }} ETH</td>
                <td class="text-muted">1st Promotion</td>
                <td class="text-muted">3000 Token</td>
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
  name: 'DashboardTokenManagement',
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
