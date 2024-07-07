<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import { useContentData } from "~/stores/contentData";
import { useUiOptions } from "~/stores/uiOptions";
import { useRoute } from "vue-router";

const contentData = useContentData();
const uiOptions = useUiOptions();
const route = useRoute();

const { data } = await useAsyncData(async () => await queryContent().find());
const viewMode = route.query.view;

contentData.set(data.value);
uiOptions.setIsDetailView(viewMode === "course");
</script>
