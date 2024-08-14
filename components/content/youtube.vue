<template>
  <div class="video-container">
    <iframe :src="formattedSrc" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
})

const formattedSrc = computed(() => {
  let videoId: string = ''
  const url = new URL(props.src)

  // Handle different YouTube URL formats
  if (url.hostname.includes('youtu.be')) {
    videoId = url.pathname.slice(1) || ''
  } else if (url.hostname.includes('youtube.com') || url.hostname.includes('m.youtube.com')) {
    videoId = url.searchParams.get('v') || ''
  }

  if (!videoId) {
    videoId = url.pathname.split('/').pop() || ''
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`
})
</script>

<style scoped>
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  /* 16:9 Aspect Ratio */
  height: 0;
  margin-bottom: 24px;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
