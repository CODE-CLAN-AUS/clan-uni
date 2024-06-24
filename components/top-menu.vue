<template>
  <a-menu v-if="!hideTopMenu" mode="horizontal" class="card menu">
    <a-menu-item v-for="item in subCategories" :key="item._id" class="top-menu-link">
      <NuxtLink :to="item._path">{{ subpathToTitle(item.title) }}</NuxtLink>
    </a-menu-item>
  </a-menu>
</template>

<script setup>
import { computed } from 'vue';
import { subpathToTitle } from '~/src/helpers/blogPostHelper';
import { useUiOptions } from '~/stores/uiOptions';

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  treeData: {
    type: Array,
    required: true,
  },
});

const uiOptions = useUiOptions();

const subCategories = computed(() => {
  const names = props.path ? props.path.split('/') : [];
  let ref = props.treeData;

  for (let i = 0; i < names.length; i++) {
    for (let j = 0; ref && j < ref.length; j++) {
      if (ref[j].title === names[i]) {
        ref = ref[j].children;
        break;
      }
    }
  }

  return ref && Array.isArray(ref) ? ref : [];
});

const isDetailView = computed(() => uiOptions.isDetailView);

const hideTopMenu = computed(() => isDetailView.value || subCategories.value.length < 1);
</script>

<style lang="scss" scoped>
.top-menu-link {
  font-weight: 500;
}
</style>
