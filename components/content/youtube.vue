<template>
  <LazyYoutube maxWidth="100%" v-if="src" :src="src" />
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
});
</script>
