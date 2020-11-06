<template>
  <div class="movie-details">
    <header class="u-margin-top-small u-margin-bottom-medium">
      <Icon name="fa-chevron-left" />
      <button @click="onBack" class="btn btn-link btn-primary-color">Back</button>
    </header>

    <div v-if="loading" 
      class="main-loader u-flex u-flex-center-vertical u-flex-center-horaizental">
      <AppLoader/>
    </div>
    <h1 v-else-if="!loading && !movie">no movie to display</h1>
    <div v-else class="movie-details-card u-flex">
      <img :src="imageSrc" :alt="movie.title + ' poster'"/>
      <div class="card-content u-flex u-flex-column">
        <div class="card-content-body">
          <h3 class="card-title u-margin-bottom-small">{{movie.title}}</h3>
          <p class="card-subtitle u-margin-bottom-small"><small>RELEASE DATE: {{movie.release_date}}</small></p>
          <p class="card-subtitle u-margin-bottom-small"><small>RATING: {{movie.vote_average}}</small></p>
          <p class="card-desc">{{movie.overview}}</p>
        </div>
        <footer>
          <ul class="actions-container u-flex">
            <li class="card-action" v-if="liked" @click="toggleLiked">Remove from my list</li>
            <li class="card-action" v-else  @click="toggleLiked">Add to my list</li>
            <li class="card-action"><Icon tag="far" name="fa-thumbs-up" /></li>
            <li class="card-action"><Icon tag="far" name="fa-thumbs-down" /></li>
          </ul>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import AppLoader from '@/components/AppLoader'
import Icon from '@/components/Icon'
import movieService from '@/services/movieService'
import {getImagePath} from '@/utils/imageUtils'

export default {
  name: 'MovieDetails',
  components: {
    AppLoader,
    Icon
  },
  data() {
    return {
      loading: false
    }
  },
  async created() {
    this.loading = true
    await this.$store.dispatch({type: 'moviesModule/fetchSelectedMovie', id: `${this.$route.params.id}`})
    this.loading = false
  },
  computed: {
    movie() {
      return this.$store.getters['moviesModule/selectedMovie']
    },
    imageSrc() {
      return getImagePath(this.movie.poster_path)
    },
    user() {
      return this.$store.getters['userModule/user']
    },
    liked() {
      return this.user && this.user.likes.find(id => id === this.movie.id) 
    }  
  },
  methods: {
    onBack() {
      this.$router.go(-1)
    },
    toggleLiked() {
      if (!this.user) {
        return
      }

      this.$store.dispatch({type: 'userModule/toggleMovieLiked', movieId: this.movie.id})
    }
  }
}
</script>

<style lang="scss">
.fa-chevron-left {
  font-size: 1.6rem;
  margin: 0 3px 0 0;
}
</style>

<style lang="scss" scoped>
.movie-details {
  color: $color-white;
  height: 100%;

  .main-loader {
    height: 100%;
  }

  .movie-details-card {
    @include respond(phone) {
      flex-direction: column;;
    }

    .card-content {
      max-width: 720px;
      padding: 0 15px;
    }

    .card-content-body {
      flex: 1;
    }

    .card-title {
      font-size: 5rem;
      font-family: $font-primary;
    }

    .card-subtitle {
      font-size: 1.5rem;
      font-family: $font-primary;
    }

    .card-desc {
      font-size: 1.5rem;
      font-family: $font-primary;
    }

    .actions-container {
      li {
        cursor: pointer;
        font-size: 2rem;
        margin-right: 20px;
      }
    }
  } 
}
</style>