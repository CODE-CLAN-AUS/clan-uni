<template>
  <NuxtLayout>
    <main v-if="isIndex">
      <!-- <top-menu path="/" :treeData="treeData" :isIndex="isIndex" /> -->
      <blog-post v-if="page" :article="page" class="blog-post" />
    </main>
    <article v-else>
      <breadcrumbs
        :path="currentPath"
        :treeData="treeData"
        :pageTitle="isArticle ? page.title : null"
      />
      <!-- <top-menu :path="currentPath" :treeData="treeData" /> -->
      <blog-post
        v-if="isArticle"
        :article="page"
        :path="page && page._path"
        class="blog-post"
      />
      <template v-else>
        <blog-post
          v-for="post in articles"
          :key="post._id"
          :article="post"
          :path="post._path"
          class="blog-post"
          preview
        />
      </template>
    </article>
  </NuxtLayout>
</template>

<script setup>
import { useContentData } from "~/stores/contentData";
import { useRoute } from "vue-router";
const { treeData, filesArray } = useContentData();
const a = useContent();
const page = a.page;
const route = useRoute();
const currentPath = route.path;
const isIndex = currentPath === "/";
const isArticle = filesArray.includes(currentPath);
console.log(currentPath);
const articles = isArticle
  ? []
  : (await useAsyncData(async () => await queryContent(currentPath).find()))?.data
      ?.value ?? [];
</script>
