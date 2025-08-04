<template>
  <NuxtLayout>
    <main v-if="isIndex">
      <blog-post v-if="page" :article="page" no-author no-header class="blog-post" />
    </main>
    <main v-else>
      <breadcrumbs :path="currentPath" :treeData="treeData" :pageTitle="isArticle ? page.title : null" />
      <blog-post v-if="isArticle" :article="page" :path="page && page._path" class="blog-post" />
      <template v-else>
        <blog-post v-for="post in articles" :key="post._id" :article="post" :path="post && post._path" class="blog-post"
          preview />
      </template>
    </main>
  </NuxtLayout>
</template>

<script setup>
import { useContentData } from "../stores/contentData";

const route = useRoute();
const { treeData, filesArray } = useContentData();
const { data: content } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})
const  page  = content;

const currentPath = route.path;
const isIndex = currentPath === "/";
const isArticle = filesArray.includes(currentPath);
const articles = isArticle
  ? []
  : (await useAsyncData(async () => await queryContent(currentPath).find()))?.data
    ?.value ?? [];

const pageValue = page.value;
const pageTitle = pageValue && pageValue.title ? pageValue.title : "";
const trimedTitle = isIndex
  ? "CLAN UNI"
  : pageTitle
    ? `${pageTitle} | Clan Uni`
    : "CLAN UNI";
const description = (pageValue && pageValue.description) ?? "Caln Uni";
const trimedDescription =
  description.length > 155 ? description.slice(0, 155) + "…" : description;

useSeoMeta({
  title: trimedTitle,
  description,
  ogTitle: pageTitle,
  ogDescription: trimedDescription,
});
</script>
