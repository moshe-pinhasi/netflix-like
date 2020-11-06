<template>
  <div class="home">
    <div v-if="loading" 
      class="main-loader u-flex u-flex-center-vertical u-flex-center-horaizental">
      <AppLoader/>
    </div>

    <div v-else>
      <section class="category u-margin-bottom-medium">
        <h1 class="header-primary header-primary--main">Top Picks</h1>
        <MovieList :movies="topRated" @toggle-liked="toggleLiked" :user-likes="user && user.likes" />
      </section>

      <section class="category u-margin-bottom-medium">
        <h1 class="header-primary header-primary--main">Trending Now</h1>
        <MovieList :movies="popular" @toggle-liked="toggleLiked" :user-likes="user && user.likes" />
      </section>

      <section class="category u-margin-bottom-medium">
        <h1 class="header-primary header-primary--main">Becuase you watched Fight Club</h1>
        <MovieList :movies="similar" @toggle-liked="toggleLiked" :user-likes="user && user.likes" />
      </section>

      <section class="category u-margin-bottom-medium">
        <h1 class="header-primary header-primary--main">New Releases</h1>
        <MovieList :movies="upcoming" @toggle-liked="toggleLiked" :user-likes="user && user.likes" />
      </section>
    </div>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue'
import AppLoader from '@/components/AppLoader'
export default {
  name: 'Home',
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
    const filterBy = {categories: ['popular', 'similar', 'upcoming', 'top_rated']}
    await this.$store.dispatch({type: 'moviesModule/fetchMovies', filterBy}),
    this.loading = false
  },
  computed: {
    popular() {
      return this.$store.getters['moviesModule/listByCategory']('popular')
    },
    similar() {
      return this.$store.getters['moviesModule/listByCategory']('similar')
    },
    upcoming() {
      return this.$store.getters['moviesModule/listByCategory']('upcoming')
    },
    topRated() {
      return this.$store.getters['moviesModule/listByCategory']('top_rated')
    },
    user() {
      return this.$store.getters['userModule/user']
    },
  },

  methods: {
    toggleLiked(movie) {
      if (!this.user) {
        console.error('no user!');
        return
      }

      this.$store.dispatch({type: 'userModule/toggleMovieLiked', movieId: movie.id})
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
