<template>
  <video controls :src="videoSrc" class="video-player"></video>
</template>

<script>
export default {
  props: ['videoSrc'],
}
</script>

<style lang="scss" scoped>
.video-player {
  width: 100%;
}
</style>