<template>
  <video controls :src="src" class="video-player"></video>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.video-player {
  width: 100%;
}
</style>
