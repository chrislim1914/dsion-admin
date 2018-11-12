<template>
  <div id="app-dashboard-promotionmanagement">
    <div class="container-fluid">
      <div class="row py-3">
        <div class="col-12">
          <h3 class="font-weight-bold">
            Promotion Management
          </h3>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h4 class="font-weight-bold">
            Create promotion category
          </h4>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
         <div class="form-group row">
            <label for="description" class="col-lg-2 col-form-label">Description:</label>
            <div class="col-lg-10">
              <input type="text" class="form-control" id="description" v-model="promotion.description">
            </div>
          </div>
        </div>
        <div class="col-lg">
          <div class="form-group row">
            <label for="bonus" class="col-lg-3 col-form-label">Bonus:</label>
            <div class="col-lg-9">
              <input type="text" class="form-control" id="bonus" v-model="promotion.bonus">
            </div>
          </div>
        </div>
        <div class="col-lg">
          <a class="btn btn-light btn-block" @click="savePromotionCategory">Save</a>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="dropdown-divider"></div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <h4 class="font-weight-bold">
            Create promotion key
          </h4>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group row">
            <label for="user" class="col-lg-2 col-form-label">User:</label>
            <div class="col-lg-10">
              <input type="email" class="form-control" id="user" v-model="promotion.user" required>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="form-group row">
            <label for="category" class="col-lg-3 col-form-label">Category:</label>
            <div class="col-lg-9">
              <select class="form-control" id="category" v-model="promotion.category">
                <option :value="promoCategory.idpromotioncategory" :key="index" v-for="(promoCategory, index) in promoCategories">{{ promoCategory.description }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group row">
            <label for="sale-status" class="col-lg-4 col-form-label">Sale status:</label>
            <div class="col-lg-8">
              <input type="text" class="form-control" id="sale-status" v-model="promotion.saleStatus" disabled>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group row">
            <label for="start-date" class="col-lg-4 col-form-label">Start date:</label>
            <div class="col-lg-8">
              <input type="date" class="form-control" id="start-date" :min="moment().format('YYYY-MM-DD')" v-model="promotion.startDate" required>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group row">
            <label for="expiration-date" class="col-lg-5 col-form-label">Expiration date:</label>
            <div class="col-lg-7">
              <input type="date" class="form-control" id="expiration-date" :min="moment().add(1, 'days').format('YYYY-MM-DD')" v-model="promotion.expirationDate" required>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-5 mb-2 mb-lg-0">
          <input type="text" class="form-control form-control-sm" id="promo-code" v-model="promotion.promoCode" disabled>
        </div>
        <div class="col-lg-2 mb-2 mb-lg-0">
          <a class="btn btn-light btn-block" @click.prevent="producePromoCode">Produce</a>
        </div>
        <div class="col-lg-2 mb-2 mb-lg-0">
          <a href="#!" class="btn btn-light btn-block" v-clipboard:copy="promotion.promoCode" v-clipboard:success="successCopy" v-clipboard:error="errorCopy">Copy</a>
        </div>
        <div class="col">
          <a class="btn btn-light btn-block" @click="savePromotionCode">Save</a>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12">
          <table class="table table-responsive text-center w-100">
            <thead>
              <tr>
                <th scope="col" style="width:40%">Promotion key</th>
                <th scope="col" style="width:20%">Creation date</th>
                <th scope="col" style="width:20%">Admin</th>
                <th scope="col" style="width:20%">Service status</th>
                <th scope="col" style="width:20%">User</th>
              </tr>
            </thead>
            <tbody>
              <tr :key="index" v-for="(code, index) in generatedpromoCodesList">
                <td class="text-muted">{{ code.promocode }}</td>
                <td class="text-muted">{{ code.codecreatedate }}</td>
                <td class="text-muted">{{ code.adminuser }}</td>
                <td class="text-muted">{{ code.isuse }}</td>
                <td class="text-muted">{{ code.user }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <loading :active.sync="isLoading" :is-full-page="true"></loading>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import {
  mapActions,
  mapState,
  mapGetters
} from 'vuex'
export default {
  name: 'DashboardPromotionManagement',
  components: {
    Loading
  },
  data () {
    return {
      promotion: {
        user: '',
        category: '',
        saleStatus: '',
        startDate: '',
        expirationDate: '',
        promoCode: 'Click produce to generate promo code.',
        description: '',
        bonus: ''
      },
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      'icoResponse': ({ico}) => ico.responseData,
      'generatedPromoCode': ({ico}) => ico.generatedPromoCode,
      'generatedpromoCodesList': ({ico}) => ico.generatedpromoCodesList,
      'promoCategories': ({ico}) => ico.promoCategories,
      'salesResponse': ({sales}) => sales.responseData
    }),
    ...mapGetters([
      'activeSale'
    ])
  },
  methods: {
    ...mapActions([
      'requestPromoCode',
      'requestPromoCategory',
      'requestAllPromoCode',
      'createPromotionCategory',
      'createPromotionCode',
      'fetchActiveSale'
    ]),
    producePromoCode () {
      this.isLoading = true
      this.requestPromoCode().then(() => {
        this.isLoading = false
        if (this.generatedPromoCode.promocode !== undefined) {
          this.promotion.promoCode = this.generatedPromoCode.promocode
          this.$awn.info('Promo code generated.')
        } else {
          this.$awn.alert('Problem in generating promotion code.')
        }
      })
    },
    savePromotionCategory () {
      this.isLoading = true
      this.createPromotionCategory({
        description: this.promotion.description,
        bonus: this.promotion.bonus
      }).then(() => {
        this.isLoading = false
        if (this.icoResponse.message === 'New Promotional Category created!') {
          this.requestPromoCategory()
          this.promotion.description = ''
          this.promotion.bonus = ''
          this.$awn.success('Promotion category created.')
        } else {
          this.$awn.alert('Failed to create promotion category.')
        }
      })
    },
    savePromotionCode () {
      if (this.promotion.promoCode !== 'Click produce to generate promo code.' && this.promotion.promoCode !== undefined) {
        if (this.promotion.user !== '' && this.promotion.user !== undefined) {
          if (this.promotion.category !== '' && this.promotion.category !== undefined) {
            if (this.promotion.startDate !== '' && this.promotion.expirationDate !== '') {
              this.isLoading = true
              this.createPromotionCode({
                promocode: this.promotion.promoCode,
                idpromotioncategory: this.promotion.category,
                idsalestatus: this.activeSale[0].idsale_status,
                email: this.promotion.user,
                adminuser: this.$session.get('admin').iduser,
                startdate: this.promotion.startDate,
                expiredate: this.promotion.expirationDate
              }).then(() => {
                this.isLoading = false
                if (this.icoResponse.message === 'Promo Code Created!') {
                  this.promotion.user = ''
                  this.promotion.category = ''
                  this.promotion.promoCode = 'Click produce to generate promo code.'
                  this.promotion.startDate = ''
                  this.promotion.expirationDate = ''
                  this.requestAllPromoCode()
                  this.$awn.success('Promotion code saved.')
                } else {
                  this.$awn.alert('Failed to create promo code.')
                }
              })
            } else {
              this.$awn.alert('Please select the starting and expiration date of the promo.')
            }
          } else {
            this.$awn.alert('Please select a promo category.')
          }
        } else {
          this.$awn.alert('Please provide a user to receive the promo.')
        }
      } else {
        this.$awn.warning('Please produce a key first.')
      }
    },
    successCopy () {
      this.$awn.info('Promo code copied.')
    },
    errorCopy () {
      this.$awn.alert('Unable to copy promo code.')
    }
  },
  created () {
    this.isLoading = true
    this.requestAllPromoCode().then(() => {
      if (this.icoResponse.message === 'Failed to load Promo Code!') {
        this.$awn.warning('Failed to load promo code.')
      }
      this.requestPromoCategory().then(() => {
        this.fetchActiveSale().then(() => {
          this.isLoading = false
          this.promotion.saleStatus = this.activeSale[0].name
        })
      })
    })
  }
}
</script>
