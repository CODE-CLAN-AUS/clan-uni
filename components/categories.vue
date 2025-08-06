<template>
  <a-card title="Courses" :bordered="true" class="card">
    <a-tree
      v-model:selectedKeys="selectedKeys"
      v-model:expandedKeys="expandedKeys"
      show-line
      show-icon
      defaultExpandAll
      autoExpandParent
      :tree-data="coursesTree"
    >
      <template #icon="{ key }">
        <NuxtLink v-if="key && isLeaf(key)" :to="key"> 
          <FileOutlined />
        </NuxtLink>
      </template>
      <template #title="{ dataRef }">
        <NuxtLink v-if="dataRef && !dataRef?.children?.length" :to="dataRef.key"> {{
          subpathToTitle(dataRef.title)
        }}</NuxtLink>
        <span v-else>
          {{ subpathToTitle(dataRef.title) }}
        </span>
      </template>
      <template #switcherIcon="{ dataRef, defaultIcon }">
        <component :is="defaultIcon" />
      </template>
    </a-tree>
  </a-card>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { subpathToTitle } from "../composables/useArticle";
import { useContentData } from "../stores/contentData";

const contentData = useContentData();
const coursesTree = contentData.coursesTree;
const selectedKeys = ref([]);
const expandedKeys = ref([]);

const props = defineProps({
  coursesTree: Array,
  filesArray: Array,
});

const route = useRoute();

const isLeaf = (key: string) => {
  return props.filesArray && props.filesArray.find((file) => file === key);
};

const selectProperNode = (subPath, treeData) => {
  expandedKeys.value = [];
  for (let i = 0; i < treeData.length; i++) {
    const node = treeData[i];

    if (node.key === subPath) {
      selectedKeys.value = [node.key];
      if (canNodeExpand(node)) {
        expandNode(node);
      }
      return true;
    } else if (node.children && node.children.length) {
      const result = selectProperNode(subPath, node.children);
      if (result) {
        if (canNodeExpand(node)) {
          expandNode(node);
        }
        return true;
      }
    }
  }

  return false;
};

const canNodeExpand = (node) => {
  return (
    node.children &&
    node.children.length &&
    !expandedKeys.value.includes(node.key)
  );
};

const expandNode = (node) => {
  expandedKeys.value = [...expandedKeys.value, node.key];
};

onMounted(() => {
  selectProperNode(route.path, coursesTree);
});

watch(
  () => route.path,
  (newPath) => {
    const fullPath = newPath;

    if (fullPath !== "/") {
      selectProperNode(fullPath.slice(5), coursesTree);
    } else {
      selectedKeys.value = [];
      expandedKeys.value = [];
    }
  }
);
</script>
