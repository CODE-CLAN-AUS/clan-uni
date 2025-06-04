<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import { useContentData } from "./stores/contentData";
import { useUiOptions } from "./stores/uiOptions";
import { useRoute } from "vue-router";
import type {ContentItem} from "./types/contentItem";

const contentData = useContentData();
const uiOptions = useUiOptions();
const route = useRoute();

  const { data } = await useAsyncData(() => {
    return queryCollection('content').all()
});
const viewMode = route.query.view;

contentData.set(data?.value as unknown as ContentItem[] || []);
uiOptions.setIsDetailView(viewMode === "course");
</script>
