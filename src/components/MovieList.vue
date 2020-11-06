<template>
  <ul class="movie-list" :class="{'scroll-bottom': scrollDirection === 'bottom'}">
    <li class="list-item" v-for="m in movies" :key="m.id">
      <router-link :to="{name: 'movie-details', params: { id: m.id }}">
        <MoviePreview :movie="m" />
      </router-link>
      <span class="like" @click.stop="$emit('toggle-liked', m)">
        <Icon :tag="isLiked(m.id)" name="fa-heart" />
      </span>
    </li>
  </ul>
</template>

<script>
import MoviePreview from '@/components/MoviePreview'
import Icon from '@/components/Icon'
export default {
  name: 'MovieList',
  components: {
    MoviePreview,
    Icon
  },
  props: {
    movies: {
      type: Array,
      required: true
    },
    userLikes: {
      type: Array,
      default: () => [],
    },
    scrollDirection: {
      type: String,
      default: 'right'
    }
  },
  methods: {
    isLiked(movieId) {
      return this.userLikes && this.userLikes.find(id => id === movieId) ? 'fas' : 'far'
    }
  }
}
</script>

<style scoped lang="scss">

.movie-list {
  display: flex;
  overflow: auto;

  .list-item {
    margin: 0 5px;
    position: relative;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    .like {
      font-size: 3rem;
      position: absolute;
      bottom: 10px;
      right: 7px;
      color: $color-grey-light-2;
      opacity: 0;
      transition: opacity .3s;
      z-index: 1;
      cursor: pointer;
    }

    &:hover {
      .like {
        opacity: 1;
      }
    }

    .fas {
      color: $color-primary;
    }
  }

  &.scroll-bottom {
    width: 100%;
    flex-wrap: wrap;
    flex-direction: row;

    .list-item {
      margin: 10px;
    }
  }
}
</style>
