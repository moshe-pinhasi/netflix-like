<template>
  <div class="movie-preview">
    <img :src="imageSrc" />
  </div>
</template>

<script>
import {getImagePath} from '@/utils/imageUtils'

export default {
  name: 'MoviePreview',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageSrc() {
      return getImagePath(this.movie.poster_path)
    }
  },
}
</script>

<style scoped lang="scss">
.movie-preview {
  cursor: pointer;

  > img {
    border-radius: 3px;

    @include respond(tab-port) {
      width: 160px;
    }

    @include respond(phone) {
      width: 120px;
    }
  }
}
</style>
