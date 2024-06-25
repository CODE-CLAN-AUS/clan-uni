<template>
  <NuxtLayout>
    <ClientOnly>
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
    </ClientOnly>
  </NuxtLayout>
</template>

<script setup>
import { useContentData } from "~/stores/contentData";
import { useRoute } from "#vue-router";

const { treeData, filesArray } = useContentData();
const a = useContent();
const page = a.page;
const route = useRoute();
const currentPath = route.fullPath;
const isIndex = currentPath === "/";
const isArticle = filesArray.includes(currentPath);
const articles = isArticle
  ? []
  : (await useAsyncData(() => queryContent(currentPath).find()))?.data?.value ?? [];
</script>
