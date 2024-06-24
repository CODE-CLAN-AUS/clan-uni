<template>
  <a-card v-if="!isDetailView" :bordered="false" class="card breadcrumbs">
    <template #title>
      <a-breadcrumb>
        <a-breadcrumb-item>
          <NuxtLink to="/"> <HomeOutlined /></NuxtLink>
        </a-breadcrumb-item>
        <a-breadcrumb-item v-for="(crumb, index) in breadCrumbs" :key="crumb._path">
          <NuxtLink v-if="index !== breadCrumbs.length - 1" :to="crumb._path">
            {{ crumb.title }}
          </NuxtLink>
          {{ index === breadCrumbs.length - 1 ? crumb.title : null }}
          <template #overlay v-if="crumb.children">
            <a-menu>
              <a-menu-item v-for="item in crumb.children" :key="item._path">
                <NuxtLink :to="item._path">{{ item.title }}</NuxtLink>
              </a-menu-item>
            </a-menu>
          </template>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </template>
  </a-card>
</template>

<script setup>
import { computed } from "vue";
import { subpathToTitle } from "~/src/helpers/blogPostHelper";
import { useUiOptions } from "~/stores/uiOptions";

const uiOptions = useUiOptions();

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  treeData: {
    type: Array,
    required: true,
  },
  pageTitle: {
    type: String,
    required: false,
  },
});

const breadCrumbs = computed(() => {
  const names = props.path ? props.path.slice(1).split("/") : [];
  const levels = [];
  let ref = props.treeData;
  let nextRef;

  if (!ref || ref.length === 0) {
    return [];
  }

  for (let i = 0; i < names.length; i++) {
    levels.push({});

    for (let j = 0; ref && j < ref.length; j++) {
      if (ref[j].title === names[i]) {
        levels[levels.length - 1].title = ref[j].title;
        levels[levels.length - 1]._path = ref[j]._path;
        if (!ref[j].children) {
          ref[j].children = [];
        }
        nextRef = ref[j].children;
      } else {
        const { title, _path } = ref[j];
        if (levels[levels.length - 1].children) {
          levels[levels.length - 1].children.push({ title, _path });
        } else {
          levels[levels.length - 1].children = [{ title, _path }];
        }
      }
    }

    if (nextRef && nextRef.length) {
      ref = nextRef;
    } else {
      levels[levels.length - 1] = {
        title: props.pageTitle
          ? props.pageTitle
          : names.length
          ? names[names.length - 1]
          : "",
        _path: props.path,
      };
    }
  }

  return levels;
});

const isDetailView = computed(() => uiOptions.isDetailView);
</script>
