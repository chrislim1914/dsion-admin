<template>
  <div id="app-dashboard-icomanagement">
    <div class="container pb-5">
      <div class="row p-3">
        <div class="col-12">
          <h3 class="font-weight-bold">
            ICO Settings
          </h3>
        </div>
      </div>
      <div class="row">
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
      <div class="row mt-3">
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
      <div class="row mt-3">
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
      <div class="row mt-3">
        <div class="col-5">
          <h6>
            bonus
          </h6>
        </div>
        <div class="col">
          <input type="number" class="form-control text-right" id="bonus" placeholder="%">
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-5">
          <h6>
            referral bonus
          </h6>
        </div>
        <div class="col">
          <input type="number" class="form-control text-right" id="referral_bonus" placeholder="%">
        </div>
      </div>
      <div class="row mt-5 justify-content-center">
        <div class="col-6">
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
                <th scope="col">Title</th>
                <th scope="col">Media</th>
                <th scope="col">Registration date</th>
                <th scope="col">Link</th>
              </tr>
            </thead>
            <tbody>
              <tr :key="index" v-for="(article, index) in articlesList">
                <td class="text-primary">
                  <input class="form-check-input" type="checkbox" :value="article.idnews" id="defaultCheck1" v-model="selectedArticles">
                </td>
                <td class="text-muted">{{ article.title }}</td>
                <td class="text-muted">{{ article.image }}</td>
                <td class="text-muted">{{ article.created_at }}</td>
                <td class="text-muted">{{ article.link }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-3">
          <a href="#!" class="btn btn-light btn-block" @click="unpublishArticle">
            Delete
          </a>
        </div>
        <div class="col-3">
          <a href="#!" class="btn btn-light btn-block" @click="publishArticle">
            New registration
          </a>
        </div>
      </div>
      <form class="mt-4">
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Title</label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-control-sm" id="title" v-model="article.title">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Media</label>
          <div class="col-sm-10">
            <input type="file" class="form-control-file border" id="media" ref="media" accept="image/*">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Link</label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-control-sm" id="link" v-model="article.link">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Contents</label>
          <div class="col-sm-10">
            <textarea class="form-control" id="contents" rows="10" v-model="article.content"></textarea>
          </div>
        </div>
      </form>
    </div>

    <loading :active.sync="isLoading" :is-full-page="true"></loading>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.min.css'
import {
  mapActions,
  mapState
} from 'vuex'
export default {
  name: 'DashboardIcoManagement',
  components: {
    Loading
  },
  data () {
    return {
      article: {
        title: '',
        content: '',
        image: '',
        link: ''
      },
      selectedArticles: [],
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      'articleResponse': ({articles}) => articles.responseData,
      'articlesList': ({articles}) => articles.articlesList
    })
  },
  methods: {
    ...mapActions([
      'requestArticle',
      'createArticle',
      'deleteArticle'
    ]),
    publishArticle () {
      this.isLoading = true

      const formData = new FormData()

      this.article.image = this.$refs.media.files[0]

      formData.append('title', this.article.title)
      formData.append('content', this.article.content)
      formData.append('image', this.article.image)
      formData.append('link', this.article.link)

      this.createArticle(formData).then(() => {
        this.isLoading = false
        if (this.articleResponse.message === 'article created') {
          this.requestArticle().then(() => {
            this.article.title = ''
            this.article.media = ''
            this.article.content = ''
            this.article.link = ''
            this.$awn.success('Article published successfully.')
          })
        } else {
          this.$awn.alert('Failed to publish article.')
        }
      })
    },
    unpublishArticle () {
      this.isLoading = true
      this.deleteArticle({
        idnews: this.selectedArticles
      }).then(() => {
        this.isLoading = false
        if (this.articleResponse.message === 'news deleted') {
          this.requestArticle()
          this.$awn.success('Article deleted successfully.')
        } else {
          this.$awn.alert('Article failed to delete.')
        }
      })
    }
  },
  created () {
    this.requestArticle()
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
