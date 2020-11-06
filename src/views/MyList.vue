<template>
  <div class="my-list">
    <h1 class="header-primary header-primary--main">My List</h1>

    <div v-if="loading" 
      class="main-loader u-flex u-flex-center-vertical u-flex-center-horaizental">
      <AppLoader />
    </div>

    <h1 v-else-if="!loading && myList.length === 0">no movie to display</h1>
    <MovieList v-else 
      :movies="myList" 
      scroll-direction="bottom" 
      @toggle-liked="toggleLiked"
      :user-likes="user.likes" />
  </div>
</template>

<script>
import MovieList from '@/components/MovieList'
import AppLoader from '@/components/AppLoader'
export default {
  name: 'MyList',
  components: {
    MovieList,
    AppLoader
  },
  data() {
    return {
      loading: false
    }
  },
  async created() {
    this.loading = true
    const filterBy = {ids: this.user.likes || null}
    await this.$store.dispatch({type: 'moviesModule/fetchMyList', filterBy}),
    this.loading = false
  },
  computed: {
    user() {
      return this.$store.getters['userModule/user']
    },
    myList() {
      return this.$store.getters['moviesModule/myList']
    },
  },
  methods: {
    toggleLiked(movie) {
      this.$store.dispatch({type: 'userModule/toggleMovieLiked', movieId: movie.id})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>