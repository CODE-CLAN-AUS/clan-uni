<template>
  <video controls :src="src" class="video-player"></video>
</template>

<script>
export default {
  props: ['src'],
}
</script>

<style lang="scss" scoped>
.video-player {
  width: 100%;
}
</style>