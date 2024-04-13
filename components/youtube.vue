<template>
  <LazyYoutubeVideo v-if="embedUrl" :playerOptions="{ rel: 0 }" :src="embedUrl"></LazyYoutubeVideo>
</template>

<script>
import Vue from 'vue'
import 'vue-lazy-youtube-video/dist/style.css'
import LazyYoutubeVideo from 'vue-lazy-youtube-video/dist/vue-lazy-youtube-video.esm'

export default Vue.extend({
  components: {
    LazyYoutubeVideo,
  },
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  computed: {
    embedUrl() {
      if (!this.src) {
        return null
      }
      
      var match = this.src.match(/^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)

      if (match && match[1]) {
        var embedUrl = "https://www.youtube.com/embed/" + match[1]
        return embedUrl
      } else {
        return null
      }
    }
  }
})
</script>